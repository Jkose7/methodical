import { useState, useRef, useEffect } from 'react';
import { TextArea, TextAreaHandle } from '@progress/kendo-react-inputs';
import { SvgIcon } from '@progress/kendo-react-common';
import { Fade } from '@progress/kendo-react-animation';
// Individual Icons
import { paperPlaneIcon } from '@progress/kendo-svg-icons';
import { infoCircleIcon } from '@progress/kendo-svg-icons';

// Components
import { LayoutShader } from '../../layouts/LayoutShader';
import { ChatResponseLoading } from './ChatResponseLoading';
import { ChatHeader } from './ChatHeader';
import { ChatMessage } from './ChatMessage';

import { API_URL } from '../../api/_config';

export const Chat = () => {
    const [chatPrompt, setChatPrompt] = useState<string>('')
    const [showHeader, setShowHeader] = useState<boolean>(true)
    const [chatFixed, setChatFixed] = useState<boolean>(false)
    const [isStreaming, setIsStreaming] = useState(false)
    const [messages, setMessages] = useState<Array<{ text: string, isUser: boolean }>>([])
    const messagesRef = useRef<HTMLDivElement>(null)
    const textareaRef = useRef<TextAreaHandle | null>(null)

    useEffect(() => {
        if (messagesRef.current) { messagesRef.current.scrollTop = messagesRef.current.scrollHeight }
    }, [messages])

    const sendPromptToChat = async () => {
        if (chatPrompt.trim().length < 3) return
        const userMessage = chatPrompt
        setChatFixed(true)
        setMessages(prev => [...prev, { text: userMessage, isUser: true }])
        setShowHeader(false)
        setIsStreaming(true)
        if (textareaRef.current?.element.current) textareaRef.current.element.current.style.height = 'auto'
        setChatPrompt('')

        try {
            const response = await fetch(`${API_URL}/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: userMessage })
            })
            const reader = response.body?.getReader()
            if (!reader) {
                throw new Error("Failed to get reader from response body.")
            }
            const decoder = new TextDecoder()
            let done = false

            while (!done) {
                const { value, done: doneReading } = await reader.read()
                done = doneReading
                if (value) {
                    const chunk = decoder.decode(value, { stream: true })
                    const lines = chunk.split('\n')
                    for (const line of lines) {
                        if (!line.trim()) continue
                        if (line.startsWith('data: ')) {
                            const jsonStr = line.substring('data: '.length)
                            if (jsonStr === '[DONE]') {
                                done = true
                                break
                            }
                            try {
                                const parsed = JSON.parse(jsonStr)
                                const delta = parsed?.choices?.[0]?.delta?.content
                                if (delta) {
                                    const JSON_BLOCK_REGEX = /```json([\s\S]*?)```/i
                                    const match = delta.match(JSON_BLOCK_REGEX)
                                    console.log("delta", delta)
                                    console.log(match)

                                    setMessages(prevMessages => {
                                        const lastMessage = prevMessages[prevMessages.length - 1]
                                        if (lastMessage && !lastMessage.isUser) {
                                            const updatedLastMessage = {
                                                ...lastMessage,
                                                text: lastMessage.text + delta
                                            }
                                            return [
                                                ...prevMessages.slice(0, -1),
                                                updatedLastMessage
                                            ]
                                        } else {
                                            return [
                                                ...prevMessages,
                                                { text: delta, isUser: false }
                                            ]
                                        }
                                    })
                                }
                            } catch (error) {
                                console.error('Error parsing JSON to chunk SSE:', error)
                            }
                        }
                    }
                }
            }
        } catch (error) {
            console.error('Error en el fetch streaming', error)
            setMessages(prev => [...prev, {
                text: "Error processing request. Please try again.",
                isUser: false
            }])
        } finally {
            setIsStreaming(false)
            if (textareaRef.current?.element.current) textareaRef.current.element.current.focus()
        }
    }

    return (
        <LayoutShader>
            <div className='chat-container' style={{ justifyContent: chatFixed ? 'space-between' : 'center' }}>
                {messages.length > 0 &&
                    <section className="chat-messages" ref={messagesRef}>
                        {messages.map((msg, index) => (
                            <ChatMessage key={index} message={msg.text} isUser={msg.isUser} isStreaming={isStreaming} />
                        ))}
                        {isStreaming && <ChatResponseLoading />}
                    </section>
                }
                {showHeader && <ChatHeader />}
                <Fade appear={true} transitionEnterDuration={1000}>
                    <section className='chat-textarea-container'>
                        <TextArea style={{ padding: '1rem', borderRadius: '24px' }} maxLength={1000} autoSize={true} rows={1} placeholder='I want a planning for my ecommerce website...' onChange={(event) => setChatPrompt(event.value)} value={chatPrompt} ref={textareaRef} disabled={isStreaming} />
                        <div className='chat-textarea-icons'>
                            <SvgIcon className='paper-plane-icon' icon={paperPlaneIcon} size='xxlarge' onClick={!isStreaming ? sendPromptToChat : undefined} />
                            <SvgIcon className='info-circle-icon' aria-label="Only support 1000 characteres" icon={infoCircleIcon} size='xlarge'></SvgIcon>
                        </div>
                    </section>
                </Fade>
            </div>
        </LayoutShader>
    )
}
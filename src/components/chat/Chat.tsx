import { useState, useRef, useEffect } from 'react';
import { sendPromptToChat } from '../../api/request';

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

export const Chat = () => {
    const [chatPrompt, setChatPrompt] = useState<string>('')
    const [showHeader, setShowHeader] = useState<boolean>(true)
    const [chatFixed, setChatFixed] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [structuredData, setStructuredData] = useState<any>(null);
    const [messages, setMessages] = useState<Array<{ text: string, isUser: boolean }>>([])
    const messagesRef = useRef<HTMLDivElement>(null)
    const textareaRef = useRef<TextAreaHandle | null>(null)

    useEffect(() => {
        if (messagesRef.current) { messagesRef.current.scrollTop = messagesRef.current.scrollHeight }
    }, [messages])

    const handleChatSubmit = async () => {
        if (chatPrompt.trim().length < 3) return
        const userMessage = chatPrompt
        setChatFixed(true)
        setMessages(prev => [...prev, { text: userMessage, isUser: true }])
        setChatPrompt('')
        setShowHeader(false)
        setIsLoading(true)
       

        try {
            const assistantMessage = { text: '', isUser: false }
            await sendPromptToChat(userMessage, ({ content, structured, explanation, complete }) => {
                if (content) {
                    assistantMessage.text += content;
                    updateMessages(assistantMessage);
                }
                if (explanation) {
                    assistantMessage.text = explanation;
                    updateMessages(assistantMessage);
                }
                if (structured) {
                    setStructuredData(structured);
                }
                if (complete) {
                    setIsLoading(false);
                }
            })
        } catch (error) {
            console.error("Error:", error)
            setIsLoading(false)
            setMessages(prev => [...prev, {
                text: "Error processing request. Please try again.",
                isUser: false
            }])
        }
        console.log(structuredData)
    }

    const updateMessages = (assistantMessage: { text: string, isUser: boolean }) => {
        setMessages(prev => {
            const lastMessage = prev[prev.length - 1];
            if (!lastMessage || lastMessage.isUser) {
                return [...prev, assistantMessage];
            }
            return prev.map((msg, index) =>
                index === prev.length - 1 ? { ...msg, text: assistantMessage.text } : msg
            )
        })
    }

    return (
        <LayoutShader>
            <div className='chat-container' style={{ justifyContent: chatFixed ? 'space-between' : 'center' }}>
                {messages.length > 0 &&
                    <section className="chat-messages" ref={messagesRef}>
                        {messages.map((msg, index) => (
                            <ChatMessage key={index} message={msg.text} isUser={msg.isUser} />
                        ))}
                        {isLoading && <ChatResponseLoading />}
                    </section>
                }
                {showHeader && <ChatHeader />}
                <Fade appear={true} transitionEnterDuration={1000}>
                    <section className='chat-textarea-container'>
                        <TextArea style={{ padding: '1rem', borderRadius: '24px' }} maxLength={1000} autoSize={true} rows={1} placeholder='I want a planning for my ecommerce website...' onChange={(event) => setChatPrompt(event.value)} value={chatPrompt} ref={textareaRef} disabled={isLoading} />
                        <div className='chat-textarea-icons'>
                            <SvgIcon className='paper-plane-icon' icon={paperPlaneIcon} size='xxlarge' onClick={!isLoading ? handleChatSubmit : undefined} />
                            <SvgIcon className='info-circle-icon' aria-label="Only support 1000 characteres" icon={infoCircleIcon} size='xlarge'></SvgIcon>
                        </div>
                    </section>
                </Fade>
            </div>
        </LayoutShader>
    )
}


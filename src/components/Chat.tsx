import { useState, useRef, useEffect } from 'react';
import { sendPromptToChat } from '../api/request';

import { TextArea } from '@progress/kendo-react-inputs';
import { SvgIcon, Typography } from '@progress/kendo-react-common';
// Individual Icons
import { paperPlaneIcon } from '@progress/kendo-svg-icons';
import { infoCircleIcon } from '@progress/kendo-svg-icons';
import { LayoutShader } from '../layouts/LayoutShader';

export const ChatHeader = () => {
    return (
        <div>
            <Typography.h3 fontWeight='bold'>🔮 Hi There!</Typography.h3>
            <Typography.h2 fontWeight='bold'>What Do You Want To Plan Today?</Typography.h2>
        </div>
    )
}

export const ChatMessage = ({ message, isUser = true }: { message: string, isUser?: boolean }) => {
    return (
        <section className={`chat-message ${isUser ? 'user-message' : 'bot-message'}`}>
            <Typography.p fontSize='large'>{message}</Typography.p>
        </section>
    )
}

export const Chat = () => {
    const [chatPrompt, setChatPrompt] = useState<string>('')
    const [showHeader, setShowHeader] = useState<boolean>(true)
    const [chatFixed, setChatFixed] = useState<boolean>(false)
    const [messages, setMessages] = useState<Array<{ text: string, isUser: boolean }>>([])
    const messagesRef = useRef<HTMLDivElement>(null)
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
        if (messagesRef.current) { messagesRef.current.scrollTop = messagesRef.current.scrollHeight }
    }, [messages])

    const handleChatSubmit = async () => {
        if (chatPrompt.trim() === '' || chatPrompt.trim().length < 30) return;
        const userMessage = chatPrompt
        setChatFixed(true)
        setMessages(prev => [...prev, { text: userMessage, isUser: true }])
        setChatPrompt('')
        setShowHeader(false)
        try {
            setTimeout(() => {
                setMessages(prev => [...prev, {
                    text: "Esto es una respuesta simulada. Aquí estaría la respuesta real de tu API.",
                    isUser: false
                }])
            }, 1000)
        } catch (error) {
            console.error("Error al enviar mensaje:", error)
            setMessages(prev => [...prev, {
                text: "Lo siento, hubo un error al procesar tu solicitud.",
                isUser: false
            }])
        }
        if (textareaRef.current) {
            textareaRef.current.focus()
        }
    }
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && e.shiftKey) {
            e.preventDefault()
            handleChatSubmit()
        }
    }

    return (
        <LayoutShader>
            <div className='chat-container' style={{ justifyContent: chatFixed ? 'space-between' : 'center' }}>
                {messages.length > 0 &&
                    <section className="chat-messages" ref={messagesRef}>
                        {messages.map((msg, index) => (
                            <ChatMessage key={index} message={msg.text} isUser={msg.isUser} />
                        ))}
                    </section>
                }
                {showHeader && <ChatHeader />}
                <section className='chat-textarea-container'>
                    <TextArea style={{ padding: '1rem', borderRadius: '24px' }} maxLength={1000} autoSize={true} rows={1} placeholder='I want a planning for my ecommerce website...' onChange={(event) => setChatPrompt(event.value)} value={chatPrompt} ref={textareaRef} onKeyDown={handleKeyDown} />
                    <div className='chat-textarea-icons'>
                        <SvgIcon icon={paperPlaneIcon} size='xxlarge' onClick={handleChatSubmit} />
                        <SvgIcon icon={infoCircleIcon} size='xlarge'></SvgIcon>
                    </div>
                </section>
            </div>
        </LayoutShader>
    )
}


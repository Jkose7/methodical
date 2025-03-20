import { useState, useRef, useEffect } from 'react';
//import { sendPromptToChat } from '../api/request';

import { Skeleton } from '@progress/kendo-react-indicators';
import { TextArea, TextAreaHandle } from '@progress/kendo-react-inputs';
import { SvgIcon, Typography } from '@progress/kendo-react-common';
// Individual Icons
import { paperPlaneIcon } from '@progress/kendo-svg-icons';
import { infoCircleIcon } from '@progress/kendo-svg-icons';

import { LayoutShader } from '../layouts/LayoutShader';


export const ChatResponseLoading = () => {
    return (
        <div className='chat-respose-loading'>
            <li>
                <div className='shader chat-response-loading-shader'>
                    <Skeleton shape={'text'} style={{ width: '100%' }} />
                    <Skeleton shape={'text'} style={{ width: '20%' }} />
                    <Skeleton shape={'text'} style={{ width: '60%' }} />
                </div>
            </li>
        </div>
    )
}

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
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [messages, setMessages] = useState<Array<{ text: string, isUser: boolean }>>([])
    const messagesRef = useRef<HTMLDivElement>(null)
    const textareaRef = useRef<TextAreaHandle | null>(null)

    useEffect(() => {
        if (messagesRef.current) { messagesRef.current.scrollTop = messagesRef.current.scrollHeight }
    }, [messages])

    const handleChatSubmit = async () => {
        if (chatPrompt.trim() === '' || chatPrompt.trim().length < 3) return;
        const userMessage = chatPrompt
        setChatFixed(true)
        setMessages(prev => [...prev, { text: userMessage, isUser: true }])
        setChatPrompt('')
        setShowHeader(false)
        setIsLoading(true)
        try {
            const responseTime = Math.floor(Math.random() * 15000) + 1500;
            setTimeout(() => {
                setIsLoading(false);
                setMessages(prev => [...prev, {
                    text: "Gracias por tu mensaje. He analizado tu solicitud y puedo ayudarte con un plan personalizado para tu proyecto. ¿Te gustaría más detalles sobre algún aspecto específico?",
                    isUser: false
                }])
            }, responseTime)
        } catch (error) {
            console.error("Error al enviar mensaje:", error);
            setIsLoading(false);
            setMessages(prev => [...prev, {
                text: "Lo siento, hubo un error al procesar tu solicitud. Por favor, intenta nuevamente más tarde.",
                isUser: false
            }]);
        }
        if (textareaRef.current?.element.current) {
            textareaRef.current.element.current.focus()
            textareaRef.current.element.current.style.height = 'auto'
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
                        {isLoading && <ChatResponseLoading />}
                    </section>
                }
                {showHeader && <ChatHeader />}
                <section className='chat-textarea-container'>
                    <TextArea style={{ padding: '1rem', borderRadius: '24px' }} maxLength={1000} autoSize={true} rows={1} placeholder='I want a planning for my ecommerce website...' onChange={(event) => setChatPrompt(event.value)} value={chatPrompt} ref={textareaRef} onKeyDown={handleKeyDown} disabled={isLoading} />
                    <div className='chat-textarea-icons'>
                        <SvgIcon icon={paperPlaneIcon} size='xxlarge' onClick={!isLoading ? handleChatSubmit : undefined} />
                        <SvgIcon icon={infoCircleIcon} size='xlarge'></SvgIcon>
                    </div>
                </section>
            </div>
        </LayoutShader>
    )
}


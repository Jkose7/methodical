import ReactMarkdown from 'react-markdown';
import rehypeSanitize from 'rehype-sanitize';

import { Typography } from '@progress/kendo-react-common';
export const ChatMessage = ({ message, isUser = true }: { message: string, isUser?: boolean }) => {
  const components = {
    p: (props: React.HTMLAttributes<HTMLParagraphElement>) => <Typography.p fontSize='large' {...props} />,
    h1: (props: React.HTMLAttributes<HTMLParagraphElement>) => <Typography.h1 {...props} />,
    h2: (props: React.HTMLAttributes<HTMLParagraphElement>) => <Typography.h2 {...props} />,
    h3: (props: React.HTMLAttributes<HTMLParagraphElement>) => <Typography.h3 {...props} />,
    h4: (props: React.HTMLAttributes<HTMLParagraphElement>) => <Typography.h4 {...props} />,
  }
  return (
    <section className={`chat-message ${isUser ? 'user-message' : 'bot-message'}`}>
      <ReactMarkdown rehypePlugins={[rehypeSanitize]} components={components}>
        {message}
      </ReactMarkdown>
    </section>
  )
}
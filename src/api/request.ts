import { API_URL } from './_config' 
export const sendPromptToChat = async (
  prompt: string,
  onData: (data: { content?: string, structured?: any, explanation?: string, complete?: boolean }) => void
) => {
  try {
    const response = await fetch(`${API_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    })

    if (!response.ok || !response.body) {
      throw new Error('Failed to connect to stream')
    }

    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    let partial = ''

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      const chunk = decoder.decode(value, { stream: true })
      partial += chunk

      // Split by double newlines (SSE format)
      const parts = partial.split('\n\n')
      partial = parts.pop() || ''

      for (const part of parts) {
        const [eventLine, dataLine] = part.split('\n')
        const event = eventLine.replace('event: ', '')
        const data = JSON.parse(dataLine.replace('data: ', ''))
        
        switch (event) {
          case 'chunk':
            onData({ content: data.content })
            break
          case 'structured':
            onData({ structured: data })
            break
          case 'error':
            throw new Error(data.message)
          case 'explanation':
            if (data.content) {
              onData({ explanation: data.content, complete: data.complete })
            }
            break
        }
      }
    }
  } catch (error) {
    console.error('Stream error:', error)
    throw error
  }
}
import { API_URL } from './_config';

export const sendPromptToChat = async (prompt: string) => {
  try {
    const response = await fetch(`${API_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    })
    const data = await response.json()
    if (data.error) throw new Error(data.error)
    return data
  }catch(error) {
    console.error('error fetching chat', error)
    return null
  }
}
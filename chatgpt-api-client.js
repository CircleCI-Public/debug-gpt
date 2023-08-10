class Configuration {
  constructor (config) {
    this.apiKey = config.apiKey
  }
}

class ChatGPTClient {
  static BASE_URL = 'https://api.openai.com/v1'
  static CHAT_COMPLETIONS = `${ChatGPTClient.BASE_URL}/chat/completions`
  static MODEL = 'gpt-3.5-turbo'

  static DEBUG_PROMPT = {
    role: 'system',
    content:
      'You are an expert programmer and debugger. Your job is to accept messages asking for assistance understanding error messages and return your assessment of the error.'
  }

  #configuration

  constructor (configuration) {
    this.#configuration = configuration
  }

  async getErrorCompletion (msg) {
    const response = await fetch(ChatGPTClient.CHAT_COMPLETIONS, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.#configuration.apiKey}`
      },
      method: 'POST',
      body: JSON.stringify({
        model: ChatGPTClient.MODEL,
        messages: [
          ChatGPTClient.DEBUG_PROMPT,
          {
            role: 'user',
            content: msg
          }
        ]
      })
    })

    const contents = await response.json()
    console.log(contents)
    return contents.choices[0].message.content
  }
}

export { Configuration, ChatGPTClient }

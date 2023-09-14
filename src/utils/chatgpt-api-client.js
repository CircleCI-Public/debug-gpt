class Configuration {
  constructor(config) {
    this.apiKey = config.apiKey;
  }
}

class ChatGPTClient {
  static BASE_URL = 'https://api.openai.com/v1';
  static CHAT_COMPLETIONS = `${ChatGPTClient.BASE_URL}/chat/completions`;
  static MODEL = 'gpt-3.5-turbo';

  #configuration;

  constructor(configuration) {
    this.#configuration = configuration;
  }

  async getErrorCompletion(msg, lang) {
    const response = await fetch(ChatGPTClient.CHAT_COMPLETIONS, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.#configuration.apiKey}`,
      },
      method: 'POST',
      body: JSON.stringify({
        model: ChatGPTClient.MODEL,
        messages: [
          {
            role: 'system',
            content: `You are an expert programmer and debugger. Your job is to accept messages asking for assistance understanding error messages and return a detailed ${lang} assessment of the error with possible next steps.`,
          },
          {
            role: 'user',
            content: msg,
          },
        ],
      }),
    });

    if (!response.ok) {
      return { error: true };
    }

    const contents = await response.json();
    return { content: contents.choices[0].message.content, error: false };
  }
}

export { Configuration, ChatGPTClient };

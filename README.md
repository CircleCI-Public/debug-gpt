# Debug-GPT

A Chrome extension to use LLMs to debug the web.

## Installation

The best way to get started is to build the extension locally and then load it as an unpacked extension.

Locally...

- Clone this repo
- Run `yarn install` and `yarn build`

Then, in Chrome...

- Go to `chrome://extensions`
- Make sure you have `Developer Mode` enabled
- Click `Load Unpacked` and select the `extension` directory of this repository.
- When you change the code, run `yarn build` then go back to `chrome://extensions` and click the update arrow to reload the extension.

## Usage

- In Chrome open DevTools
- Pin the `Debug-GPT` extension in the taskbar
- Click the action button for the extension
  - You should get confirmation that an extension is debugging the browser
- Watch the console and `Debug-GPT` panel for LLM explanations of what's going on in your browser.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

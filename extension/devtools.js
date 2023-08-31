chrome.devtools.panels.create(
  'Debug GPT',
  '',
  '/panel.html',
  extensionPanel => {
    let _window // Going to hold the reference to panel.html's `window`

    let data = []
    const port = chrome.runtime.connect({ name: 'devtools' })
    port.onMessage.addListener(msg => {
      // Write information to the panel, if exists.
      // If we don't have a panel reference (yet), queue the data.
      if (_window) {
        _window.onData(msg)
      } else {
        data.push(msg)
      }
    })

    extensionPanel.onShown.addListener(function tmp (panelWindow) {
      extensionPanel.onShown.removeListener(tmp) // Run once only
      _window = panelWindow

      // Release queued data
      let msg
      while ((msg = data.shift())) _window.onData(msg)

      // setup two way communication with the Service Worker
      _window.notifySW = msg => {
        port.postMessage(msg)
      }
    })
  }
)

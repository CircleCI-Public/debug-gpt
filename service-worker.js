chrome.action.onClicked.addListener(tab => {
  console.log('Adding listener...')
  if (tab.url.startsWith('http')) {
    console.log('Enabling debugger for tab')
    chrome.debugger.attach({ tabId: tab.id }, '1.2', () => {
      chrome.debugger.sendCommand({ tabId: tab.id }, 'Log.enable', {}, () => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError)
        }
      })
    })
  } else {
    console.log('Debugger can only be attached to HTTP/HTTPS pages.')
  }
})

let ports = []
chrome.runtime.onConnect.addListener(port => {
  if (port.name !== 'devtools') return
  ports.push(port)
  // Remove port when destroyed (eg when devtools instance is closed)
  port.onDisconnect.addListener(() => {
    const i = ports.indexOf(port)
    if (i !== -1) ports.splice(i, 1)
  })

  port.onMessage.addListener(msg => {
    // Received message from devtools. Do something:
    console.log('Received message from devtools page', msg)
  })
})

// send message to DevTools panel
const notifyPanel = msg => {
  ports.forEach(port => {
    port.postMessage(msg)
  })
}

chrome.debugger.onEvent.addListener((source, method, params) => {
  notifyPanel({
    time: new Date(),
    data: {
      source,
      method,
      params
    }
  })
})

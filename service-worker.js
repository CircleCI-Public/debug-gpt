chrome.action.onClicked.addListener(function (tab) {
  console.log('Adding listener...')
  if (tab.url.startsWith('http')) {
    console.log('Enabling debugger for tab')
    chrome.debugger.attach({ tabId: tab.id }, '1.2', function () {
      chrome.debugger.sendCommand(
        { tabId: tab.id },
        'Log.enable',
        {},
        function () {
          if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError)
          }
        }
      )
    })
  } else {
    console.log('Debugger can only be attached to HTTP/HTTPS pages.')
  }
})

var ports = []
chrome.runtime.onConnect.addListener(function (port) {
  if (port.name !== 'devtools') return
  ports.push(port)
  // Remove port when destroyed (eg when devtools instance is closed)
  port.onDisconnect.addListener(function () {
    var i = ports.indexOf(port)
    if (i !== -1) ports.splice(i, 1)
  })

  port.onMessage.addListener(function (msg) {
    // Received message from devtools. Do something:
    console.log('Received message from devtools page', msg)
  })
})

// send message to all DevTools
const notifyDT = msg => {
  ports.forEach(function (port) {
    port.postMessage(msg)
  })
}

chrome.debugger.onEvent.addListener(function (source, method, params) {
  console.log('chrome.debugger.onEvent')
  notifyDT({
    time: new Date(),
    data: {
      source,
      method,
      params
    }
  })
})

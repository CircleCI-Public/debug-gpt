let tabId = null

chrome.action.onClicked.addListener(tab => {
  console.log('Adding listener...')
  if (tab.url.startsWith('http')) {
    console.log('Enabling debugger for tab')
    tabId = tab.id

    chrome.debugger.attach({ tabId: tab.id }, '1.2', () => {
      chrome.debugger.sendCommand({ tabId: tab.id }, 'Log.enable', {}, () => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError)
        }
      })

      chrome.debugger.sendCommand(
        { tabId: tab.id },
        'Runtime.enable',
        {},
        () => {
          if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError)
          }
        }
      )

      chrome.debugger.sendCommand(
        { tabId: tab.id },
        'Network.enable',
        {},
        () => {
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

const paramsAccessors = {
  'Runtime.consoleAPICalled': p =>
    p.stackTrace &&
    p.stackTrace.callFrames &&
    p.stackTrace.callFrames[0].url.startsWith('http')
      ? p.args[0]?.value
      : null, // https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#event-consoleAPICalled
  'Runtime.exceptionThrown': async p => p.exceptionDetails.text, // https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#event-exceptionThrown
  'Network.webSocketFrameError': async p => p.errorMessage, // https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-webSocketFrameError
  'Network.loadingFailed': async p => {
    // https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-loadingFailed
    console.log('Network.loadingFailed', p)
    const resp = await chrome.debugger.sendCommand(
      { tabId },
      'Network.getResponseBody',
      { requestId: p.requestId }
    )
    return `Failed to load ${p.type}: ${p.errorText} ${JSON.stringify(resp)}`
  },
  'Log.entryAdded': async p => {
    // https://chromedevtools.github.io/devtools-protocol/tot/Log/#event-entryAdded
    let text = p.entry.text
    if (p.entry.networkRequestId) {
      console.log('has a networkRequestId')
      const resp = await chrome.debugger.sendCommand(
        { tabId },
        'Network.getResponseBody',
        { requestId: p.entry.networkRequestId }
      )
      text += ' - ' + JSON.stringify(resp)
    }
    return text
  }
}
const eventParser = async (method, params, callback) => {
  if (Object.keys(paramsAccessors).indexOf(method) !== -1) {
    return await paramsAccessors[method](params)
  }
  return null
}

chrome.debugger.onEvent.addListener(async (source, method, params) => {
  const eventText = await eventParser(method, params)

  if (eventText) {
    notifyPanel({
      domain: method.split('.')[0].toLowerCase(),
      time: new Date(),
      event: eventText
    })
  }
})

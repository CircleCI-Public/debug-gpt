// This is the content script that will be injected into the inspected page
// If you need to interact with the page, you can add your own code here

chrome.runtime.sendMessage({ type: "error", error: event.error.message });
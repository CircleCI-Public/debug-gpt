// Listen for error events in the page and send them to the DevTools panel
console.log("attaching error listener...")
window.addEventListener("error", function (event) {
  console.log("got an error...")
  chrome.runtime.sendMessage({ type: "error", error: event.error.message });
});
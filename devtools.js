chrome.devtools.panels.create("Error Capture", "", "panel.html", function (panel) {
  // Handle receiving messages from the content script
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.type === "error") {
      const errorDiv = document.createElement("div");
      errorDiv.classList.add("error");
      errorDiv.textContent = request.error;
      document.getElementById("error-list").appendChild(errorDiv);
    }
  });
});
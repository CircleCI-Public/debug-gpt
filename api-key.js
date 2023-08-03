// Setup handlers
const setupForm = () => {
  const form = document.getElementById("apiForm");
  form.addEventListener("submit", (event) => {
    handleSubmit(event).catch(console.error);
  });
}

// Intercept submission and save
const handleSubmit = async (event) => {
  event.preventDefault();

  const apiKey = event.target[0].value;

  // WARN: This is a really unsafe way to store the api key since it's public to the browser session.
  // We may want to find a safer way to save the API key later on.
  await chrome.storage.local.set({ apiKey });
}


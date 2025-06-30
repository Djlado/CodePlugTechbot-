const form = document.querySelector("form");
const chatContainer = document.querySelector("#chat-container");

function addMessage(sender, text) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", sender);
  messageDiv.textContent = text;
  chatContainer.appendChild(messageDiv);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

async function sendMessage(text) {
  addMessage("user", text);

  try {
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyCURz7A2o4Eb0iZa_rGxP5Rxgb5zL3oUkA", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: text }] }]
      })
    });

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn’t understand.";
    addMessage("bot", reply);
  } catch (error) {
    addMessage("bot", "An error occurred while talking to Gemini.");
    console.error(error);
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const input = form.querySelector("input");
  const text = input.value.trim();
  if (text !== "") {
    sendMessage(text);
    input.value = "";
  }
});

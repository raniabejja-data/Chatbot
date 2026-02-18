function sendMessage() {

  const input = document.getElementById("userInput");
  const message = input.value;

  if (!message.trim()) return;

  addMessage(message, "user");
  input.value = "";

  setTimeout(() => {
    const reply = generateReply(message);
    addMessage(reply, "bot");
  }, 500);
}

function generateReply(message) {

  message = message.toLowerCase();

  if (message.includes("hello") || message.includes("hi")) {
    return "Hello 😊 How can I help you?";
  }

  if (message.includes("how are you")) {
    return "I am fine thank you 💜";
  }

  if (message.includes("name")) {
    return "I am your AI assistant 🤖";
  }

  if (message.includes("help")) {
    return "Sure! Tell me what you need 💡";
  }

  return "Sorry 😢 I don’t understand. Try another question.";
}

function addMessage(text, sender) {

  const chatBox = document.getElementById("chatBox");

  const container = document.createElement("div");
  container.classList.add("message-container");

  const message = document.createElement("div");
  message.classList.add("message", sender);
  message.innerHTML = text;

  const avatar = document.createElement("img");
  avatar.classList.add("avatar");

  if (sender === "bot") {
    avatar.src = "IMG_7004.jpeg";
    container.appendChild(avatar);
    container.appendChild(message);
  } else {
    avatar.src = "IMG_7006.jpeg";
    container.appendChild(message);
    container.appendChild(avatar);
  }

  chatBox.appendChild(container);
  chatBox.scrollTop = chatBox.scrollHeight;
}

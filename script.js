async function sendMessage() {

  const input = document.getElementById("userInput");
  const message = input.value;

  if (!message.trim()) return;

  addMessage(message, "user");
  input.value = "";

  const typing = addMessage("...", "bot");

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message })
    });

    const data = await response.json();
    typing.remove();

    if (data.reply) {
      addMessage(data.reply, "bot");
    } else {
      addMessage("Error 😢", "bot");
    }

  } catch (error) {
    typing.remove();
    addMessage("Server error 😢", "bot");
  }
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

  return container;
}

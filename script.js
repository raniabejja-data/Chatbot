async function sendMessage() {

  const input = document.getElementById("userInput");
  const message = input.value.trim();

  if (!message) return;

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

    typing.innerHTML = data.reply || "Erreur serveur.";

  } catch (error) {
    typing.innerHTML = "Connexion impossible.";
  }
}

function addMessage(text, sender) {

  const chatBox = document.getElementById("chatBox");

  const container = document.createElement("div");
  container.className = "message-container " + sender;

  const avatar = document.createElement("img");
  avatar.className = "avatar";

  const message = document.createElement("div");
  message.className = "message";
  message.innerHTML = text;

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

  return message;
}

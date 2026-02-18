const apiKey = "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"; // Rappel: Change-la après le TP pour la sécurité !
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

function addMessage(text, isUser) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message');
    if (isUser) msgDiv.classList.add('user-message');

    const imgSource = isUser ? 'IMG_7006.jpeg' : 'IMG_7004.jpeg';
    const textClass = isUser ? 'user-text' : 'bot-text';

    msgDiv.innerHTML = `
        <img src="${imgSource}" class="avatar">
        <div class="text ${textClass}">${text}</div>
    `;

    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function fetchAI(message) {
    // Créer un message temporaire "..."
    const tempId = "typing-" + Date.now();
    const tempDiv = document.createElement('div');
    tempDiv.id = tempId;
    tempDiv.classList.add('message');
    tempDiv.innerHTML = `<img src="IMG_7004.jpeg" class="avatar"><div class="text bot-text">...</div>`;
    chatBox.appendChild(tempDiv);

    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "model": "mistralai/mistral-7b-instruct:free", // Modèle gratuit
                "messages": [{ "role": "user", "content": message }]
            })
        });

        const data = await response.json();
        document.getElementById(tempId).remove(); // Enlever le "..."
        addMessage(data.choices[0].message.content, false);
    } catch (error) {
        document.getElementById(tempId).innerText = "Erreur de connexion.";
    }
}

sendBtn.addEventListener('click', () => {
    const val = userInput.value;
    if(!val) return;
    addMessage(val, true);
    userInput.value = '';
    fetchAI(val);
});

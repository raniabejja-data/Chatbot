// Configuration
const apiKey = "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";
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const colorPicker = document.getElementById('color-picker');
const themeBtn = document.getElementById('theme-toggle');

// 1. Fonction pour ajouter un message à l'écran
function addMessage(text, isUser) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message');
    if (isUser) msgDiv.classList.add('user-message');

    // Utilisation de tes photos (vérifie bien les noms de fichiers !)
    const imgSource = isUser ? 'IMG_7006.jpeg' : 'IMG_7004.jpeg';
    const textClass = isUser ? 'user-text' : 'bot-text';

    msgDiv.innerHTML = `
        <img src="${imgSource}" class="avatar" onerror="this.src='https://via.placeholder.com/40'">
        <div class="text ${textClass}">${text}</div>
    `;

    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll automatique vers le bas
}

// 2. Fonction pour appeler l'API OpenRouter
async function fetchAI(message) {
    // Création d'un indicateur de chargement
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
                "HTTP-Referer": window.location.origin, // Requis par OpenRouter
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "model": "google/gemini-2.0-flash-lite-preview-02-05:free", 
                "messages": [{ "role": "user", "content": message }]
            })
        });

        const data = await response.json();
        document.getElementById(tempId).remove(); // On enlève le "..."

        if (data.choices && data.choices[0]) {
            addMessage(data.choices[0].message.content, false);
        } else {
            addMessage("Erreur : Vérifiez votre clé API ou le modèle utilisé.", false);
        }
    } catch (error) {
        console.error("Erreur détaillée:", error);
        document.getElementById(tempId).remove();
        addMessage("Impossible de contacter l'IA. Vérifiez votre connexion.", false);
    }
}

// 3. Événements (Boutons et Clavier)
sendBtn.addEventListener('click', () => {
    const text = userInput.value.trim();
    if (text !== "") {
        addMessage(text, true);
        userInput.value = '';
        fetchAI(text);
    }
});

// Envoyer avec la touche "Entrée"
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendBtn.click();
});

// 4. Personnalisation Créative
colorPicker.addEventListener('input', (e) => {
    document.documentElement.style.setProperty('--user-bg', e.target.value);
});

themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    themeBtn.innerText = document.body.classList.contains('dark-mode') ? "☀️ Mode Clair" : "🌙 Mode Sombre";
});

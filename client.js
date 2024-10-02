//Importo las herramientas para crear al cliente
const io = require("socket.io-client");


const socket = io();

// Logica para cargar la imagen del cliente

const usernameInput = document.getElementById('username');
const avatarUrlInput = document.getElementById('avatarUrl'); // Campo para la URL de la imagen
const setNameButton = document.getElementById('setNameButton');
const nameForm = document.getElementById('nameForm');
const chatForm = document.getElementById('form');
const messageInput = document.getElementById('input');
const messages = document.getElementById('messages');

let username = '';
let avatarUrl = '';

setNameButton.addEventListener('click', () => {
    username = usernameInput.value.trim();
    avatarUrl = avatarUrlInput.value.trim(); // Guardar la URL de la imagen
    if (username) {
        nameForm.style.display = 'none';
        chatForm.style.display = 'flex';
    }
});

chatForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (messageInput.value) {
        socket.emit('chat message', { user: username, avatarUrl: avatarUrl, message: messageInput.value });
        messageInput.value = '';
    }
});

socket.on('chat message', (data) => {
    const item = document.createElement('li');

    // Crear el elemento de la imagen si hay una URL
    if (data.avatarUrl) {
        const img = document.createElement('img');
        img.src = data.avatarUrl;
        img.alt = `${data.user} avatar`;
        item.appendChild(img); // Añadir la imagen al mensaje
    }

    // Añadir el texto del mensaje
    const messageText = document.createElement('span');
    messageText.textContent = `${data.timestamp} - ${data.user}: ${data.message}`;
    item.appendChild(messageText);

    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});

const socket = io();

        const usernameInput = document.getElementById('username');
        const avatarUrlInput = document.getElementById('avatarUrl');
        const setNameButton = document.getElementById('setNameButton');
        const nameForm = document.getElementById('nameForm');
        const chatForm = document.getElementById('form');
        const messageInput = document.getElementById('input');
        const recipientInput = document.getElementById('recipient'); // Campo para el destinatario
        const messages = document.getElementById('messages');

        let username = '';
        let avatarUrl = '';

        setNameButton.addEventListener('click', () => {
            username = usernameInput.value.trim();
            avatarUrl = avatarUrlInput.value.trim();
            if (username) {
                socket.emit('new user', username); // Notificar al servidor que se ha registrado un nuevo usuario
                nameForm.style.display = 'none';
                chatForm.style.display = 'flex';
            }
        });

        chatForm.addEventListener('submit', (event) => {
            event.preventDefault();
            if (messageInput.value) {
                socket.emit('chat message', { 
                    user: username, 
                    avatarUrl: avatarUrl, 
                    message: messageInput.value, 
                    to: recipientInput.value.trim() // Incluir el destinatario
                });
                messageInput.value = '';
                recipientInput.value = ''; // Limpiar el campo de destinatario
            }
        });

        socket.on('user connected', (username) => {
            const item = document.createElement('li');
            item.textContent = `${username} se ha conectado`;
            item.style.color = 'green';
            messages.appendChild(item);
        });
        
        socket.on('user disconnected', (username) => {
            const item = document.createElement('li');
            item.textContent = `${username} se ha desconectado`;
            item.style.color = 'red';
            messages.appendChild(item);
        });

        socket.on('chat message', (data) => {
            const item = document.createElement('li');

            if (data.avatarUrl) {
                const img = document.createElement('img');
                img.src = data.avatarUrl;
                img.alt = `${data.user} avatar`;
                item.appendChild(img);
            }

            const messageText = document.createElement('span');
            messageText.textContent = `${data.timestamp} - ${data.user}: ${data.message}`;
            item.appendChild(messageText);

            messages.appendChild(item);
            window.scrollTo(0, document.body.scrollHeight);
        });
/**const socket = io();


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
});**/
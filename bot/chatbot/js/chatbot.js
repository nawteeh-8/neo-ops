'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const chatbotContainer = document.getElementById('chatbot-container');

    // Load chatbot HTML
    fetch('bot/chatbot/index.html')
        .then(response => response.text())
        .then(html => {
            chatbotContainer.innerHTML = html;
            const chatbot = document.getElementById('chatbot');
            const closeChatbot = document.getElementById('close-chatbot');
            const chatbotHeader = document.querySelector('.chatbot-header');

            // Show chatbot
            setTimeout(() => {
                chatbot.style.display = 'flex';
            }, 1000);


            // Close chatbot
            closeChatbot.addEventListener('click', () => {
                chatbot.style.display = 'none';
            });

            // Drag and drop functionality
            let isDragging = false;
            let offset = { x: 0, y: 0 };

            chatbotHeader.addEventListener('mousedown', (e) => {
                isDragging = true;
                offset.x = e.clientX - chatbot.offsetLeft;
                offset.y = e.clientY - chatbot.offsetTop;
                chatbot.style.cursor = 'grabbing';
            });

            document.addEventListener('mousemove', (e) => {
                if (!isDragging) return;
                chatbot.style.left = `${e.clientX - offset.x}px`;
                chatbot.style.top = `${e.clientY - offset.y}px`;
            });

            document.addEventListener('mouseup', () => {
                isDragging = false;
                chatbot.style.cursor = 'grab';
            });
        });
});

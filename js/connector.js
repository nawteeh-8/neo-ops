'use strict';

class EventEmitter {
    constructor() {
        this.events = {};
    }

    on(eventName, listener) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(listener);
    }

    emit(eventName, data) {
        if (this.events[eventName]) {
            this.events[eventName].forEach(listener => listener(data));
        }
    }
}

const connector = new EventEmitter();

document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.getElementById('grid-container');
    const fabContainer = document.getElementById('fab-container');

    const services = ['business', 'contactcenter', 'itsupport', 'professionals'];
    const fabs = ['contact', 'join', 'chatbot'];

    services.forEach(service => {
        fetch(`services/${service}.html`)
            .then(response => response.text())
            .then(html => {
                const div = document.createElement('div');
                div.innerHTML = html;
                gridContainer.appendChild(div);
                const script = div.querySelector('script');
                if (script) {
                    const newScript = document.createElement('script');
                    newScript.src = script.src;
                    document.body.appendChild(newScript);
                }
            });
    });

    fabs.forEach(fab => {
        if (fab === 'chatbot') {
            const fabBtn = document.getElementById('fab-chat');
            if (fabBtn) {
                fabBtn.addEventListener('click', openChatbot);
            }
            const mobileFabBtn = document.getElementById('mobile-fab-chat');
            if (mobileFabBtn) {
                mobileFabBtn.addEventListener('click', openChatbot);
            }
        } else {
            fetch(`fabs/${fab}.html`)
                .then(response => response.text())
                .then(html => {
                    const div = document.createElement('div');
                    div.innerHTML = html;
                    fabContainer.appendChild(div);
                    const script = div.querySelector('script');
                    if (script) {
                        const newScript = document.createElement('script');
                        newScript.src = script.src;
                        document.body.appendChild(newScript);
                    }
                });
        }
    });
});

function openChatbot() {
    if (document.getElementById('chatbot-container')) {
        const chatbotContainer = document.getElementById('chatbot-container');
        chatbotContainer.parentNode.removeChild(chatbotContainer);
        return;
    }

    fetch('bot/chatbot.html')
        .then(res => res.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const chatbotContainer = doc.getElementById('chatbot-container');
            document.body.appendChild(chatbotContainer);

            if (!document.querySelector('link[href="bot/style.css"]')) {
                const style = document.createElement('link');
                style.rel = 'stylesheet';
                style.href = 'bot/style.css';
                document.head.appendChild(style);
            }

            const script = document.createElement('script');
            script.src = 'bot/app.js';
            script.defer = true;
            document.body.appendChild(script);
        });
}

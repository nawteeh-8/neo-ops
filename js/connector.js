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
    });
});

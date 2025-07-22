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

connector.on('langChange', lang => {
  const iframe = document.querySelector('#chatbot-container iframe');
  if (iframe) {
    iframe.contentWindow.postMessage({ type: 'langChange', lang }, '*');
  }
});

connector.on('themeChange', theme => {
  const iframe = document.querySelector('#chatbot-container iframe');
  if (iframe) {
    iframe.contentWindow.postMessage({ type: 'themeChange', theme }, '*');
  }
});

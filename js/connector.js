'use strict';

// Expected origin for the chatbot iframe
const ALLOWED_ORIGIN = window.location.origin;

class EventEmitter {
    constructor() {
        if (EventEmitter.instance) {
            return EventEmitter.instance;
        }
        this.events = {};
        EventEmitter.instance = this;
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
    iframe.contentWindow.postMessage({ type: 'langChange', lang }, ALLOWED_ORIGIN);
  }
});

connector.on('themeChange', theme => {
  const iframe = document.querySelector('#chatbot-container iframe');
  if (iframe) {
    iframe.contentWindow.postMessage({ type: 'themeChange', theme }, ALLOWED_ORIGIN);
  }
});

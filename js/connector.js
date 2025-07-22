'use strict';

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

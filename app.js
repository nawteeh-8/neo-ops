// chattia/app.js
(() => {
  const { createApp, ref, onMounted, watch, nextTick } = Vue;

  createApp({
    setup() {
      const messages  = ref([]);
      const userInput = ref('');
      const msgsEl    = ref(null);

      // Auto-scroll when new messages arrive
      watch(messages, () => {
        nextTick(() => {
          const el = msgsEl.value;
          if (el) el.scrollTop = el.scrollHeight;
        });
      });

      // Send message & fetch AI response
      async function sendMessage() {
        const text = userInput.value.trim();
        if (!text) return;

        // Append user message
        messages.value.push({ from: 'user', text });
        userInput.value = '';

        try {
          const resp = await fetch('https://api.yourdomain.com/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: text })
          });
          if (!resp.ok) throw new Error('Network response not ok');
          const { reply } = await resp.json();
          messages.value.push({ from: 'bot', text: reply });
        } catch (e) {
          messages.value.push({ from: 'bot', text: 'Oops, something went wrong.' });
          console.error(e);
        }
      }

      return { messages, userInput, sendMessage, msgsEl };
    },
    template: `
      <div class="chat-window">
        <div class="messages" ref="msgsEl">
          <div v-for="(m,i) in messages"
               :key="i"
               :class="['msg', m.from]">
            <span class="text">{{ m.text }}</span>
          </div>
        </div>
        <form @submit.prevent="sendMessage" class="input-area">
          <input v-model="userInput" placeholder="Ask me anything…" required>
          <button type="submit">➤</button>
        </form>
      </div>
    `
  }).mount('#chattia-app');
})();

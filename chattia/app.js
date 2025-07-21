(() => {
  const { createApp, ref, onMounted } = Vue;

  createApp({
    setup() {
      const messages  = ref([]);
      const userInput = ref('');

      // Scroll to bottom on new message
      const msgsEl = ref(null);
      onMounted(() => {
        watch(messages, () => {
          nextTick(() => {
            const el = msgsEl.value;
            if (el) el.scrollTop = el.scrollHeight;
          });
        });
      });

      // Send user message → fetch AI reply
      async function sendMessage() {
        const text = userInput.value.trim();
        if (!text) return;
        // Append user msg
        messages.value.push({ from:'user', text });
        userInput.value = '';
        
        // Call your backend AI API (must be CORS-enabled & authenticated)
        try {
          const resp = await fetch('https://api.yourdomain.com/chat', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: text })
          });
          if (!resp.ok) throw new Error('Network error');
          const data = await resp.json();
          // Append bot reply
          messages.value.push({ from:'bot', text: data.reply });
        } catch (e) {
          messages.value.push({ from:'bot', text: 'Oops, something went wrong.' });
          console.error(e);
        }
      }

      return { messages, userInput, sendMessage, msgsEl };
    },
    template: `
      <div class="chat-window">
        <div class="messages" ref="msgsEl">
          <div v-for="(m,i) in messages" :key="i" :class="['msg', m.from]">
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

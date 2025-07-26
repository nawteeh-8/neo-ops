# Neo Ops Chatbot

This project hosts the static files for the Neo Ops AI chatbot demo. The page
expects a serverless backend that processes user messages. The default endpoint
points to a Netlify Function but can be changed via the `CHATBOT_ENDPOINT`
JavaScript global.

## Deployment

1. **Create a Serverless Function**
   - Deploy a function named `chat` to your serverless provider (Netlify
     Functions, Cloudflare Workers, etc.).
   - The function should accept a POST request containing a JSON body with a
     `message` field and return `{ "reply": "..." }`.

2. **Set the Endpoint**
   - Define the endpoint URL in an environment variable named
     `CHATBOT_ENDPOINT` when serving the page. Example for Netlify:
     ```sh
     netlify env:set CHATBOT_ENDPOINT https://example.netlify.app/.netlify/functions/chat
     ```
   - Alternatively, inject it directly in HTML before loading `chatbot.html`:
     ```html
     <script>window.CHATBOT_ENDPOINT = "https://example.netlify.app/.netlify/functions/chat";</script>
     ```

3. **Serve the Files**
   - Host the static files from this repository on your preferred provider
     (GitHub Pages, Netlify, Cloudflare Pages, etc.). Ensure the environment
     variable is available at runtime.

With the endpoint configured, the chatbot will POST user messages to your
serverless function and display the returned `reply` text.

## Contact Forms

Service pages contain contact forms handled by `js/form-handler.js`. By default,
the script submits form data to `https://example.com/api/form`. Set a custom
target by defining the `FORM_ENDPOINT` global at runtime:

```html
<script>window.FORM_ENDPOINT = 'https://your-backend.example.com/form';</script>
```

When present, all service forms will POST their data to this endpoint.


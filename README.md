# Neo OPS

This repository includes a simple chatbot and static assets.

## Subresource Integrity

Subresource Integrity (SRI) hashes are used for external resources to ensure the files have not been tampered with. The SHA-384 hashes were generated using OpenSSL:

```bash
openssl dgst -sha384 -binary path/to/file | openssl base64 -A
```

The resulting base64 string is added as the value for the `integrity` attribute.

## Files
- `bot/app.js`
- `bot/chatbot.html`


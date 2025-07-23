# OPS Unified Portal

This repository contains a demo of the OPS web portal and its associated service worker code.

## Worker CORS Policy

The `bot/worker.js` file implements a simple API endpoint used by the chatbot. To harden security,
CORS responses are now restricted to the production domain (`https://example.com`).


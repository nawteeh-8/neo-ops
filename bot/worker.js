// Allow the domain expected by the frontend. This can be set via an
// environment variable binding so deployments remain consistent.
const ALLOWED_ORIGIN = self.ALLOWED_ORIGIN || 'https://frontend.example.com';

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  if (request.method !== 'POST') {
    return new Response('Expected POST request', { status: 405 })
  }

  const { message } = await request.json()

  // In a real application, you would make an API call to your AI service here.
  // For this example, we'll just echo the message back.
  const reply = `You said: ${message}`

  const response = { reply }

  return new Response(JSON.stringify(response), {
    headers: {
      'Content-Type': 'application/json',
      // Limit CORS to the production domain for security
      'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
    },
  })
}

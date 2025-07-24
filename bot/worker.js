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

  const headers = new Headers({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'https://example.com',
    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'same-origin'
  })

  return new Response(JSON.stringify(response), { headers })
}

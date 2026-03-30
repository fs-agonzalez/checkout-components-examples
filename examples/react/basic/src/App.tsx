import { useEffect, useRef, useState } from 'react'
import FastSpring from '@fastspring/checkout-sdk'

type Sdk = ReturnType<typeof FastSpring.init>

export default function App() {
  const sdkRef = useRef<Sdk | null>(null)
  const [sessionId, setSessionId] = useState('')

  useEffect(() => {
    // Initialise the SDK once on mount
    const sdk = FastSpring.init({
      checkoutUrl: 'https://mycompany.onfastspring.com/my-store',
      // env: 'qa2',   // omit for production
      // debug: true,
      onOrderCompletion: (data) => console.log('Order completed!', data),
      onPaymentError: (error) => console.error('Payment failed:', error),
      onSessionData: (data) => console.log('Session data:', data),
    })
    sdkRef.current = sdk

    // Pre-fill any stored session ID
    const stored = sdk.getStoredSessionId()
    if (stored) setSessionId(stored)

    // Mount components
    const card = sdk.components.create('fsc-card')
    card.mount('#card-element')

    const payButton = sdk.components.create('fsc-pay-button')
    payButton.mount('#pay-button-element')
  }, [])

  function handleCheckout() {
    if (!sessionId.trim()) return alert('Please enter a session ID')
    sdkRef.current?.checkout(sessionId.trim(), {
      onSuccess: () => console.log('Session loaded:', sessionId),
      onError: (err) => console.error('Session load failed:', err),
    })
  }

  return (
    <div style={{ maxWidth: 800, margin: '40px auto', padding: '0 16px' }}>
      <h1>FastSpring Checkout — React</h1>

      <div style={{ marginBottom: 16 }}>
        <label htmlFor="session-id">Session ID</label>
        <br />
        <input
          id="session-id"
          type="text"
          placeholder="Enter session ID"
          value={sessionId}
          onChange={(e) => setSessionId(e.target.value)}
          style={{ width: 320, padding: '8px 12px', marginTop: 4 }}
        />
      </div>

      <button onClick={handleCheckout}>Checkout</button>

      <div id="card-element" style={{ marginTop: 24 }} />
      <div id="pay-button-element" style={{ marginTop: 16 }} />
    </div>
  )
}

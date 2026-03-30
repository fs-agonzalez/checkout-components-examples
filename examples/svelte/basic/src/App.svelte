<script lang="ts">
  import { onMount } from 'svelte'
  import FastSpring from '@fastspring/checkout-sdk'

  let sessionId = ''
  let sdk: ReturnType<typeof FastSpring.init> | null = null

  onMount(() => {
    sdk = FastSpring.init({
      checkoutUrl: 'https://mycompany.onfastspring.com/my-store',
      // env: 'qa2',
      // debug: true,
      onOrderCompletion: (data) => console.log('Order completed!', data),
      onPaymentError: (error) => console.error('Payment failed:', error),
      onSessionData: (data) => console.log('Session data:', data),
    })

    const stored = sdk.getStoredSessionId()
    if (stored) sessionId = stored

    sdk.components.create('fsc-card').mount('#card-element')
    sdk.components.create('fsc-pay-button').mount('#pay-button-element')
  })

  function handleCheckout() {
    if (!sessionId.trim()) return alert('Please enter a session ID')
    sdk?.checkout(sessionId.trim(), {
      onSuccess: () => console.log('Session loaded:', sessionId),
      onError: (err) => console.error('Session load failed:', err),
    })
  }
</script>

<div style="max-width: 800px; margin: 40px auto; padding: 0 16px">
  <h1>FastSpring Checkout — Svelte</h1>

  <div style="margin-bottom: 16px">
    <label for="session-id">Session ID</label><br />
    <input
      id="session-id"
      type="text"
      placeholder="Enter session ID"
      bind:value={sessionId}
      style="width: 320px; padding: 8px 12px; margin-top: 4px"
    />
  </div>

  <button on:click={handleCheckout}>Checkout</button>

  <div id="card-element" style="margin-top: 24px" />
  <div id="pay-button-element" style="margin-top: 16px" />
</div>

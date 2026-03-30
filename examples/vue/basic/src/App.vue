<script setup lang="ts">
import { onMounted, ref } from 'vue'
import FastSpring from '@fastspring/checkout-sdk'

const sessionId = ref('')
let sdk: ReturnType<typeof FastSpring.init> | null = null

onMounted(() => {
  sdk = FastSpring.init({
    checkoutUrl: 'https://mycompany.onfastspring.com/my-store',
    // env: 'qa2',
    // debug: true,
    onOrderCompletion: (data) => console.log('Order completed!', data),
    onPaymentError: (error) => console.error('Payment failed:', error),
    onSessionData: (data) => console.log('Session data:', data),
  })

  const stored = sdk.getStoredSessionId()
  if (stored) sessionId.value = stored

  sdk.components.create('fsc-card').mount('#card-element')
  sdk.components.create('fsc-pay-button').mount('#pay-button-element')
})

function handleCheckout() {
  if (!sessionId.value.trim()) return alert('Please enter a session ID')
  sdk?.checkout(sessionId.value.trim(), {
    onSuccess: () => console.log('Session loaded:', sessionId.value),
    onError: (err) => console.error('Session load failed:', err),
  })
}
</script>

<template>
  <div style="max-width: 800px; margin: 40px auto; padding: 0 16px">
    <h1>FastSpring Checkout — Vue</h1>

    <div style="margin-bottom: 16px">
      <label for="session-id">Session ID</label><br />
      <input
        id="session-id"
        v-model="sessionId"
        type="text"
        placeholder="Enter session ID"
        style="width: 320px; padding: 8px 12px; margin-top: 4px"
      />
    </div>

    <button @click="handleCheckout">Checkout</button>

    <div id="card-element" style="margin-top: 24px" />
    <div id="pay-button-element" style="margin-top: 16px" />
  </div>
</template>

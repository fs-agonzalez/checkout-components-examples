import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { FormsModule } from '@angular/forms'
import FastSpring from '@fastspring/checkout-sdk'

type Sdk = ReturnType<typeof FastSpring.init>

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div style="max-width: 800px; margin: 40px auto; padding: 0 16px">
      <h1>FastSpring Checkout — Angular</h1>

      <div style="margin-bottom: 16px">
        <label for="session-id">Session ID</label><br />
        <input
          id="session-id"
          type="text"
          placeholder="Enter session ID"
          [(ngModel)]="sessionId"
          style="width: 320px; padding: 8px 12px; margin-top: 4px"
        />
      </div>

      <button (click)="handleCheckout()">Checkout</button>

      <div id="card-element" style="margin-top: 24px"></div>
      <div id="pay-button-element" style="margin-top: 16px"></div>
    </div>
  `,
})
export class AppComponent implements OnInit {
  sessionId = ''
  private sdk: Sdk | null = null

  ngOnInit(): void {
    this.sdk = FastSpring.init({
      checkoutUrl: 'https://mycompany.onfastspring.com/my-store',
      // env: 'qa2',
      // debug: true,
      onOrderCompletion: (data) => console.log('Order completed!', data),
      onPaymentError: (error) => console.error('Payment failed:', error),
      onSessionData: (data) => console.log('Session data:', data),
    })

    const stored = this.sdk.getStoredSessionId()
    if (stored) this.sessionId = stored

    this.sdk.components.create('fsc-card').mount('#card-element')
    this.sdk.components.create('fsc-pay-button').mount('#pay-button-element')
  }

  handleCheckout(): void {
    if (!this.sessionId.trim()) return alert('Please enter a session ID')
    this.sdk?.checkout(this.sessionId.trim(), {
      onSuccess: () => console.log('Session loaded:', this.sessionId),
      onError: (err) => console.error('Session load failed:', err),
    })
  }
}

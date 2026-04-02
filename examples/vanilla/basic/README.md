# FastSpring Checkout SDK — Vanilla JS Integration Guide

A step-by-step guide for integrating FastSpring Checkout into a plain HTML/JavaScript page — no build tools or frameworks required.

---

## Overview

The integration has five steps:

1. Include the SDK from CDN
2. Initialize the SDK (`FastSpring.init`)
3. Create and mount the **Card** component
4. Create and mount the **Pay Button** component
5. Call `sdk.checkout(sessionId)` to start the checkout flow

---

## Step 1 — Include the SDK from CDN

Add the SDK script tag in your HTML, just before the closing `</body>` tag:

**Production (CDN):**
```html
<script src="https://cdn.onfastspring.com/checkout-sdk/{{version}}/fastspring-sdk.iife.js"></script>
```

**QA:**
```html
<script src="https://d1f8f9xcsvx3ha.cloudfront.net/checkout-sdk/{{version}}/fastspring-sdk.iife.js"></script>
```

> **Currently supported versions:** `0.0.3-beta.1`

> **TypeScript / IntelliSense (optional)**
> Download `fastspring-sdk.iife.d.ts` from the same CDN path and place it next to your HTML file.
> VS Code will pick it up automatically and provide autocomplete.

---

## Step 2 — Initialize the SDK

Call `FastSpring.init()` once the SDK script has loaded. It returns an `sdk` instance used in all subsequent steps.

```html
<script>
    const sdk = FastSpring.init({

        // ── Required ──────────────────────────────────────────────────────
        checkoutUrl: 'https://<your-store>.onfastspring.com/<your-storefront>',

        // ── Optional ──────────────────────────────────────────────────────
        env: 'qa2',       // Omit (or remove) for production. Use 'qa2' for QA.
        debug: true,      // Shows built-in success/failure dialogs during testing.

        globalStyles: {   // Applied to all components as base defaults.
            color: '#1e293b',
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
        },

        // ── Callbacks ─────────────────────────────────────────────────────

        /**
         * Fired when the session data has been fetched and the checkout is ready.
         * Use this to show/hide your own loading indicators.
         */
        onSessionData: (data) => {
            console.log('Session data ready:', data);
        },

        /**
         * Fired after a successful payment and order completion.
         * `data` contains the order confirmation details.
         */
        onOrderCompletion: (data) => {
            console.log('Order completed!', data);
        },

        /**
         * Fired when the payment attempt is rejected or encounters an error.
         * Use this to display an error message to the customer.
         */
        onPaymentError: (error) => {
            console.error('Payment failed:', error);
        },
    });
</script>
```

---

## Step 3 — Create and Mount the Card Component

The card component renders the payment fields (card number, expiry, CVV) inside a secure iframe.

**HTML — add a mount target:**

```html
<div id="card-element"></div>
```

**JS — create and mount:**

```js
const cardComponent = sdk.components.create('fsc-card', {
    style: {
        state: {
            default: {
                // ── Card panel ───────────────────────────────────────────
                card: {
                    backgroundColor: '#fff',
                    borderColor: '#DEE2E6',
                    borderWidth: '1px',
                    borderRadius: '8px',
                    border: '2px solid navy',  // shorthand — overrides borderColor + borderWidth
                    boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                    padding: '0',
                    width: '100%',              // fills container; or fixed e.g. '500px'
                    maxWidth: '680px',          // caps width on wide screens; set to 'none' to remove cap
                    gap: '0',                   // gap between form rows
                    fontSize: '16px',           // base font size for card
                    fontFamily: 'Inter, sans-serif',
                    color: '#4B5563',           // base text colour
                },
                // ── All input fields ─────────────────────────────────────
                input: {
                    backgroundColor: '#fff',
                    borderColor: '#DEE2E6',
                    borderRadius: '6px',
                    color: '#1e293b',
                    fontSize: '16px',
                    fontFamily: 'Inter, sans-serif',
                    height: '48px',             // input field height
                    outlineColor: '#bfdbfe',    // focus ring colour
                    placeholderColor: '#7D8A9B',
                    errorBorderColor: '#e53935',
                    padding: '0 16px',
                    margin: '0',                // outer margin; routed through --fsc-input-margin
                },
                // ── Card number field only ───────────────────────────────
                cardNumber: {
                    backgroundColor: '#fff',
                    borderColor: '#DEE2E6',
                    color: '#1e293b',
                    fontSize: '16px',
                },
                // ── Expiry field only ────────────────────────────────────
                expiry: {
                    backgroundColor: '#fff',
                    borderColor: '#DEE2E6',
                    color: '#1e293b',
                },
                // ── CVV field only ───────────────────────────────────────
                cvv: {
                    backgroundColor: '#fff',
                    borderColor: '#DEE2E6',
                    color: '#1e293b',
                },
                // ── "Use a different card" link ──────────────────────────
                changeCard: {
                    color: '#6b7280',
                    fontSize: '14px',
                    fontFamily: 'Inter, sans-serif',
                },
                // ── Inline validation error messages ─────────────────────
                inlineError: {
                    color: '#e53935',
                    fontSize: '12px',
                    fontWeight: '400',
                    backgroundColor: 'transparent',
                },
            },
            focus: {
                // Styles applied when any input inside the card has focus
                card: {
                    borderColor: '#4d90fe',       // panel border when focused
                },
                input: {
                    borderColor: '#4d90fe',       // input border when focused
                },
            },
            hover: {
                // Styles applied when the customer hovers over the card panel
                card: {
                    backgroundColor: '#ffffff',  // panel background on hover
                    borderColor: '#94a3b8',      // panel border on hover
                },
                changeCard: {
                    color: '#111827',
                },
            },
            error: {
                card: {
                    backgroundColor: 'pink',
                    borderColor: '#ef4444',
                },
                input: {
                    borderColor: '#ef4444',
                    color: '#b91c1c',
                },
            },
        },
    },
});

cardComponent.mount('#card-element');
```

---

## Step 4 — Create and Mount the Pay Button Component

The pay button submits the payment when clicked.

**HTML — add a mount target:**

```html
<div id="pay-button-element"></div>
```

**JS — create and mount:**

```js
const payButtonComponent = sdk.components.create('fsc-pay-button', {
    style: {
        state: {
            default: {
                button: {
                    backgroundColor: '#008aff',
                    color: '#ffffff',
                    borderRadius: '8px',
                    border: 'none',
                    borderColor: '#008aff',
                    padding: '14px 28px',
                    width: '400px',
                    height: '54px',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '16px',
                    fontWeight: '400',
                    cursor: 'pointer',
                    margin: '0',
                },
            },
            hover: {
                button: {
                    backgroundColor: '#2563EB',
                    borderColor: '#2563EB',
                    color: '#ffffff',
                },
            },
            disabled: {
                button: {
                    opacity: '0.5',
                    cursor: 'not-allowed',
                },
            },
        },
    },
});

payButtonComponent.mount('#pay-button-element');
```

---

## Step 5 — Start the Checkout

Call `sdk.checkout()` with a valid **Session ID** to load the session data into the mounted components. The card and pay button will become visible once the session is confirmed open.

> **How to get a Session ID**
> Create a session server-side using the FastSpring Session API:
> `POST https://<session-service>/sessions`
> The API returns a `id` field — that is the Session ID to pass here.

```js
sdk.checkout('<SESSION_ID>', {
    onSuccess: () => {
        console.log('Session loaded — checkout is ready');
    },
    onError: (error) => {
        console.error('Session load failed:', error);
    },
});
```

---

## Complete Example

```html
<!DOCTYPE html>
<html>
<head>
    <title>FastSpring Checkout</title>
</head>
<body>

    <!-- Step 3: Card mount target -->
    <div id="card-element"></div>

    <!-- Step 4: Pay button mount target -->
    <div id="pay-button-element"></div>

    <!-- Step 1: Include SDK -->
    <!-- Production: https://cdn.onfastspring.com/checkout-sdk/0.0.3-beta.1/fastspring-sdk.iife.js -->
    <!-- QA: https://d1f8f9xcsvx3ha.cloudfront.net/checkout-sdk/0.0.3-beta.1/fastspring-sdk.iife.js -->
    <script src="https://cdn.onfastspring.com/checkout-sdk/0.0.3-beta.1/fastspring-sdk.iife.js"></script>

    <script>
        // Step 2: Init
        const sdk = FastSpring.init({
            checkoutUrl: 'https://<your-store>.onfastspring.com/<your-storefront>',
            onSessionData:     (data)  => console.log('Session ready:', data),
            onOrderCompletion: (data)  => console.log('Order completed!', data),
            onPaymentError:    (error) => console.error('Payment failed:', error),
        });

        // Step 3: Card component
        const cardComponent = sdk.components.create('fsc-card', {});
        cardComponent.mount('#card-element');

        // Step 4: Pay button component
        const payButtonComponent = sdk.components.create('fsc-pay-button', {});
        payButtonComponent.mount('#pay-button-element');

        // Step 5: Start checkout (call this after obtaining a session ID from your server)
        sdk.checkout('<SESSION_ID>', {
            onSuccess: () => console.log('Session loaded'),
            onError:   (err) => console.error('Session load failed:', err),
        });
    </script>

</body>
</html>
```

---

## Style Properties Reference

### Card panel (`state.default.card`)

| Property | Type | Description |
|---|---|---|
| `backgroundColor` | `string` | Panel background colour |
| `borderColor` | `string` | Panel border colour |
| `borderWidth` | `string` | Panel border width (e.g. `'1px'`) |
| `borderRadius` | `string` | Panel corner radius |
| `border` | `string` | Shorthand border (e.g. `'2px solid navy'`); overrides `borderColor` and `borderWidth` when set |
| `boxShadow` | `string` | Panel box shadow |
| `padding` | `string` | Space inside the panel |
| `width` | `string` | Panel width — `'100%'` fills the container, or a fixed value e.g. `'500px'` |
| `maxWidth` | `string` | Maximum panel width (default `'680px'`). Caps grow on wide screens. Set to `'none'` to remove the cap. When a fixed `width` is set, `maxWidth` is automatically matched to it so the panel is never clipped. |
| `gap` | `string` | Gap between form rows |
| `fontSize` | `string` | Base font size for the card |
| `fontFamily` | `string` | Base font family for the card |
| `color` | `string` | Base text colour |

> **Hover styles** — use `state.hover.card.backgroundColor` and `state.hover.card.borderColor` instead of the legacy `backgroundColorOnHover` / `borderColorOnHover` shortcuts.

### Focus state (`state.focus`)

Applied when any input inside the card has keyboard focus (`:host(:focus-within)`).

| Category | Property | Description |
|---|---|---|
| `card` | `borderColor` | Panel border colour when focused |
| `input` | `borderColor` | Input field border colour when focused |

### Input fields (`state.default.input`, `.cardNumber`, `.expiry`, `.cvv`)

Use `input` to style all fields at once. Use `cardNumber`, `expiry`, or `cvv` to target individual fields.

> **`backgroundColor` on inputs** — always applied as `background-color` (not the `background` shorthand).
> This is intentional: the card number field uses `background-image` for the brand badge (Visa, Mastercard, etc.).
> Using the shorthand would erase the logo when the merchant sets a background colour.
> Both `input[part="input"]` and `#cardNumber` receive the rule so the ID-specificity brand rules cannot block it.

| Property | Type | Description |
|---|---|---|
| `backgroundColor` | `string` | Input background colour |
| `borderColor` | `string` | Input border colour |
| `borderRadius` | `string` | Input corner radius |
| `color` | `string` | Input text colour |
| `fontSize` | `string` | Input font size |
| `fontFamily` | `string` | Input font family |
| `height` | `string` | Input field height (default `'48px'`) |
| `padding` | `string` | Input inner padding (default `'0 16px'`) |
| `margin` | `string` | Input outer margin — routed through `--fsc-input-margin`; grid layout deducts this from available space so inputs never overflow the card |
| `outlineColor` | `string` | Focus ring colour |
| `placeholderColor` | `string` | Placeholder text colour |
| `errorBorderColor` | `string` | Border colour in error state |

### "Use a different card" link (`state.default.changeCard`)

| Property | Type | Description |
|---|---|---|
| `color` | `string` | Link text colour |
| `fontSize` | `string` | Link font size |
| `fontFamily` | `string` | Link font family |

### Inline validation errors (`state.default.inlineError`)

| Property | Type | Description |
|---|---|---|
| `color` | `string` | Error message text colour |
| `fontSize` | `string` | Error message font size |
| `fontWeight` | `string` | Error message font weight |
| `backgroundColor` | `string` | Error message background |

### Pay button (`state.default.button`)

Styles are applied directly as CSS on the `<button>` element. Any valid CSS property in camelCase is accepted.

| Property | Type | Default | Description |
|---|---|---|---|
| `backgroundColor` | `string` | `#008aff` | Button background colour |
| `color` | `string` | `#ffffff` | Button label colour |
| `border` | `string` | `solid 0px` | Shorthand border (e.g. `'2px solid red'`) |
| `borderColor` | `string` | `#008aff` | Button border colour |
| `borderRadius` | `string` | `8px` | Button corner radius |
| `padding` | `string` | `28px` | Button inner padding |
| `margin` | `string` | `0px` | Button outer margin |
| `width` | `string` | `400px` | Button width |
| `height` | `string` | `54px` | Button height |
| `fontFamily` | `string` | `Helvetica` | Button font family |
| `fontSize` | `string` | `16px` | Button font size |
| `fontWeight` | `string` | `400` | Button font weight |
| `cursor` | `string` | `pointer` | Button cursor style |
| `opacity` | `string` | `1` | Button opacity |

### Pay button states

The same properties above can be set per state. Available state keys:

| State | Selector | When active |
|---|---|---|
| `default` | `button` | Always |
| `hover` | `button:hover` | Mouse hover |
| `active` | `button:active` | Mouse down / tap |
| `disabled` | `button:disabled` | Session not yet loaded, or payment is in-progress (spinner showing) |
| `error` | `button` (host `[error]`) | Payment error |
| `valid` | `button` (host `[valid]`) | Payment valid |

### Pay button text (`state.default.text`)

Styles applied to the `<span>` inside the button (the label text).

| Property | Type | Description |
|---|---|---|
| `color` | `string` | Text colour |
| `fontSize` | `string` | Text font size |
| `fontWeight` | `string` | Text font weight |
| `fontFamily` | `string` | Text font family |

### Pay button spinner (`state.default.spinner`)

Styles applied to the loading spinner element.

| Property | Type | Description |
|---|---|---|
| `width` | `string` | Spinner size (width) |
| `height` | `string` | Spinner size (height) |
| `border` | `string` | Spinner ring border (e.g. `'2px solid currentColor'`) |
| `color` | `string` | Spinner colour via `currentColor` |

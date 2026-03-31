/**
 * Ambient type declaration for the FastSpring SDK IIFE build.
 *
 * When loading the SDK via a plain <script> tag:
 *   <script src="fastspring-sdk.iife.js"></script>
 *
 * The global `FastSpring` object is available with full intellisense.
 */

// ─── Re-usable types ──────────────────────────────────────────────────────────

export interface GlobalStyles {
  textColor?: string
  fontFamily?: string
  fontSize?: string
  fontWeight?: string | number
  backgroundColor?: string
  borderColor?: string
  borderRadius?: string
  padding?: string
  focusColor?: string
  errorColor?: string
  successColor?: string
  disabledOpacity?: string
  transitionDuration?: string
  [property: string]: string | number | undefined
}

export interface SDKConfig {
  /** Base URL for the FastSpring checkout page (e.g. 'https://company.onfastspring.com/mystore/product') */
  checkoutUrl: string
  /** Target environment. Defaults to 'prod'. */
  env?: 'prod' | 'qa1' | 'qa2' | 'local'
  /** Global styles applied as defaults to all components */
  globalStyles?: GlobalStyles
  /** Called when an order is completed successfully */
  onOrderCompletion?: (data: unknown) => void
  /** Called when a payment attempt fails */
  onPaymentError?: (error: unknown) => void
  /** Called once session data is loaded and ready */
  onSessionData?: (data: unknown) => void
  /**
   * Enable built-in debug dialogs.
   * When `true`, a native `<dialog>` popup automatically appears on payment
   * success and failure, showing order details and raw JSON.
   * Handy during development — no extra HTML needed.
   * @example
   * FastSpring.init({ checkoutUrl: '...', debug: true })
   */
  debug?: boolean
}

// ─── Style property interfaces ───────────────────────────────────────────────

export interface CardStyleProperties {
  backgroundColor?: string
  borderColor?: string
  borderWidth?: string
  borderRadius?: string
  width?: string
  maxWidth?: string
  [key: string]: string | undefined
}

export interface InputStyleProperties {
  backgroundColor?: string
  borderColor?: string
  borderRadius?: string
  padding?: string
  fontSize?: string
  fontFamily?: string
  fontWeight?: string
  color?: string
  transition?: string
  [key: string]: string | undefined
}

export interface ButtonStyleProperties {
  backgroundColor?: string
  color?: string
  borderColor?: string
  border?: string
  borderRadius?: string
  padding?: string
  width?: string
  height?: string
  fontSize?: string
  fontFamily?: string
  fontWeight?: string
  cursor?: string
  transition?: string
  margin?: string
  [key: string]: string | undefined
}

export interface CardStateStyleProperties {
  card?: CardStyleProperties
  input?: InputStyleProperties
  label?: InputStyleProperties
  error?: InputStyleProperties
  cardNumber?: InputStyleProperties
  expiry?: InputStyleProperties
  cvv?: InputStyleProperties
  changeCard?: ButtonStyleProperties
  [key: string]: Record<string, string | undefined> | undefined
}

export interface PayButtonStateStyleProperties {
  button?: ButtonStyleProperties
  [key: string]: Record<string, string | undefined> | undefined
}

export interface CardComponentStyle {
  state?: {
    default?: CardStateStyleProperties
    hover?: CardStateStyleProperties
    error?: CardStateStyleProperties
    focus?: CardStateStyleProperties
    [state: string]: CardStateStyleProperties | undefined
  }
}

export interface PayButtonComponentStyle {
  state?: {
    default?: PayButtonStateStyleProperties
    hover?: PayButtonStateStyleProperties
    [state: string]: PayButtonStateStyleProperties | undefined
  }
}

export interface CardComponentOptions {
  style?: CardComponentStyle
  /** Label rendering mode. 'fixed' (default) | 'floating' */
  labelMode?: 'floating' | 'fixed'
  /** When true, hides the card panel header (credit card icon + title) */
  hideCardHeader?: boolean
}

export interface PayButtonComponentOptions {
  style?: PayButtonComponentStyle
}

// ─── Component instance ───────────────────────────────────────────────────────

export interface ComponentInstance {
  /** Mount the component into a DOM element (CSS selector or HTMLElement) */
  mount(container: string | HTMLElement): void
  /** Unmount and destroy the component */
  unmount(): void
  /** Update component options after creation */
  update(options: Record<string, unknown>): void
}

// ─── SDK instance ─────────────────────────────────────────────────────────────

export interface FSSDKInstance {
  components: {
    /** Create a new checkout component and return an instance */
    create(type: 'fsc-card', options?: CardComponentOptions): ComponentInstance
    create(type: 'fsc-pay-button', options?: PayButtonComponentOptions): ComponentInstance
    create(type: string, options?: Record<string, unknown>): ComponentInstance
    getAll(): ComponentInstance[]
    destroyAll(): void
  }
  session: {
    /** Load a session by its ID */
    load(sessionId: string): Promise<unknown>
    /** Get the current session data (null if not loaded) */
    getData(): unknown
    /** Check whether session data has been loaded */
    isReady(): boolean
    /** Register a callback to fire once session data is ready */
    onReady(callback: (data: unknown) => void): void
    /** Reset the session store to its initial state */
    reset(): void
    store(): unknown
  }
  /**
   * Load a session and begin checkout.
   * @param sessionId - The session ID to load
   * @param callbacks - Optional success/error callbacks
   */
  checkout(
    sessionId: string,
    callbacks?: {
      onSuccess?: () => void
      onError?: (error: unknown) => void
    }
  ): Promise<unknown>
}

// ─── Global declaration ───────────────────────────────────────────────────────

declare global {
  /**
   * FastSpring SDK global — available after loading `fastspring-sdk.iife.js`.
   *
   * @example
   * const sdk = FastSpring.init({
   *   checkoutUrl: 'https://company.onfastspring.com/mystore/product',
   *   onOrderCompletion: (data) => console.log('Order complete', data),
   *   onPaymentError:    (err)  => console.error('Payment failed', err),
   * });
   *
   * const card = sdk.components.create('fsc-card', { hideCardHeader: true });
   * card.mount('#card-element');
   *
   * sdk.checkout(sessionId);
   */
  const FastSpring: {
    /** Initialize the FastSpring SDK */
    init(config: SDKConfig): FSSDKInstance
  }
}

export {}

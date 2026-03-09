<template>
  <div class="checkout-page">
    <main class="container">

      <!-- Header -->
      <div class="checkout-header">
        <router-link to="/" class="checkout-logo">SHOP.CO</router-link>
        <div class="checkout-steps">
          <span class="step active">Shipping</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
          <span class="step active">Payment</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
          <span class="step">Confirmation</span>
        </div>
      </div>

      <div class="checkout-layout">

        <!-- ── LEFT: Forms ── -->
        <div class="checkout-forms">

          <!-- Shipping Address -->
          <div class="form-card">
            <h2 class="card-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
              Shipping Address
            </h2>

            <div class="form-row">
              <div class="form-group" :class="{ error: errors.firstName }">
                <label class="form-label">First Name</label>
                <input v-model="form.firstName" type="text" class="form-input" placeholder="John" @blur="validate('firstName')" />
                <span v-if="errors.firstName" class="error-msg">{{ errors.firstName }}</span>
              </div>
              <div class="form-group" :class="{ error: errors.lastName }">
                <label class="form-label">Last Name</label>
                <input v-model="form.lastName" type="text" class="form-input" placeholder="Doe" @blur="validate('lastName')" />
                <span v-if="errors.lastName" class="error-msg">{{ errors.lastName }}</span>
              </div>
            </div>

            <div class="form-group" :class="{ error: errors.email }">
              <label class="form-label">Email Address</label>
              <input v-model="form.email" type="email" class="form-input" placeholder="john@example.com" @blur="validate('email')" />
              <span v-if="errors.email" class="error-msg">{{ errors.email }}</span>
            </div>

            <div class="form-group" :class="{ error: errors.phone }">
              <label class="form-label">Phone Number</label>
              <input v-model="form.phone" type="tel" class="form-input" placeholder="+234 800 000 0000" @blur="validate('phone')" />
              <span v-if="errors.phone" class="error-msg">{{ errors.phone }}</span>
            </div>

            <div class="form-group" :class="{ error: errors.address }">
              <label class="form-label">Street Address</label>
              <input v-model="form.address" type="text" class="form-input" placeholder="44 Commercial Avenue" @blur="validate('address')" />
              <span v-if="errors.address" class="error-msg">{{ errors.address }}</span>
            </div>

            <div class="form-row">
              <div class="form-group" :class="{ error: errors.city }">
                <label class="form-label">City</label>
                <input v-model="form.city" type="text" class="form-input" placeholder="Lagos" @blur="validate('city')" />
                <span v-if="errors.city" class="error-msg">{{ errors.city }}</span>
              </div>
              <div class="form-group" :class="{ error: errors.state }">
                <label class="form-label">State</label>
                <input v-model="form.state" type="text" class="form-input" placeholder="Lagos State" @blur="validate('state')" />
                <span v-if="errors.state" class="error-msg">{{ errors.state }}</span>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group" :class="{ error: errors.zip }">
                <label class="form-label">ZIP / Postal Code</label>
                <input v-model="form.zip" type="text" class="form-input" placeholder="100001" @blur="validate('zip')" />
                <span v-if="errors.zip" class="error-msg">{{ errors.zip }}</span>
              </div>
              <div class="form-group">
                <label class="form-label">Country</label>
                <select v-model="form.country" class="form-input form-select">
                  <option value="Nigeria">Nigeria</option>
                  <option value="Ghana">Ghana</option>
                  <option value="Kenya">Kenya</option>
                  <option value="South Africa">South Africa</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="United States">United States</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <!-- Save address checkbox -->
            <label class="checkbox-label">
              <input type="checkbox" v-model="form.saveAddress" class="checkbox-input" />
              <span class="checkbox-custom"></span>
              <span class="checkbox-text">Save this address for future orders</span>
            </label>
          </div>

          <!-- Payment Details -->
          <div class="form-card">
            <h2 class="card-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
              Payment Method
            </h2>

            <div class="payment-options">
              <label
                v-for="method in paymentMethods"
                :key="method.id"
                class="payment-option"
                :class="{ selected: form.paymentMethod === method.id }"
              >
                <input type="radio" v-model="form.paymentMethod" :value="method.id" class="radio-input" />
                <div class="payment-option-inner">
                  <div class="payment-icon-wrap">
                    <span v-html="method.icon"></span>
                  </div>
                  <div>
                    <p class="payment-name">{{ method.name }}</p>
                    <p class="payment-desc">{{ method.desc }}</p>
                  </div>
                </div>
                <div class="radio-dot" :class="{ checked: form.paymentMethod === method.id }"></div>
              </label>
            </div>

            <div v-if="form.paymentMethod" class="payment-notice">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              You'll be redirected to complete payment securely via {{ selectedMethodName }}.
            </div>
          </div>

        </div>

        <!-- ── RIGHT: Order Summary ── -->
        <div class="summary-column">
          <div class="summary-card">
            <h2 class="card-title">Order Summary</h2>

            <!-- Items -->
            <div class="summary-items">
              <div v-for="item in cartItems" :key="item.id" class="summary-item">
                <div class="summary-item-image">
                  <img :src="item.image" :alt="item.name" />
                  <span class="item-qty">{{ item.quantity }}</span>
                </div>
                <div class="summary-item-info">
                  <p class="summary-item-name">{{ item.name }}</p>
                  <p class="summary-item-meta">{{ item.size }} · {{ item.color }}</p>
                </div>
                <p class="summary-item-price">${{ (item.price * item.quantity).toFixed(2) }}</p>
              </div>
            </div>

            <div class="summary-divider"></div>

            <!-- Promo Code -->
            <div class="promo-section">
              <div class="promo-input-wrap">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
                <input v-model="promoCode" type="text" class="promo-input" placeholder="Add promo code" />
                <button class="promo-btn" @click="applyPromo">Apply</button>
              </div>
              <p v-if="promoError" class="promo-error">{{ promoError }}</p>
              <p v-if="promoSuccess" class="promo-success">{{ promoSuccess }}</p>
            </div>

            <div class="summary-divider"></div>

            <!-- Totals -->
            <div class="summary-totals">
              <div class="total-row">
                <span>Subtotal</span>
                <span>${{ subtotal.toFixed(2) }}</span>
              </div>
              <div v-if="discount > 0" class="total-row discount-row">
                <span>Discount ({{ discountPercent }}%)</span>
                <span>-${{ discount.toFixed(2) }}</span>
              </div>
              <div v-if="promoDiscount > 0" class="total-row discount-row">
                <span>Promo ({{ promoCode.toUpperCase() }})</span>
                <span>-${{ promoDiscount.toFixed(2) }}</span>
              </div>
              <div class="total-row">
                <span>Delivery Fee</span>
                <span>{{ deliveryFee === 0 ? 'Free' : `$${deliveryFee.toFixed(2)}` }}</span>
              </div>
            </div>

            <div class="summary-divider"></div>

            <div class="total-final">
              <span>Total</span>
              <span>${{ finalTotal.toFixed(2) }}</span>
            </div>

            <!-- Pay Button -->
            <button
              class="pay-btn"
              @click="handlePlaceOrder"
              :disabled="isSubmitting"
            >
              <span v-if="isSubmitting" class="spinner"></span>
              <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
              {{ isSubmitting ? 'Processing...' : `Pay $${finalTotal.toFixed(2)}` }}
            </button>

            <p class="secure-note">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
              Secured by SSL encryption
            </p>
          </div>
        </div>

      </div>
    </main>
  </div>
</template>

<script>
import { useCart } from '@/composables/useCart'

export default {
  name: 'CheckoutPage',

  setup() {
    const { cartItems, cartItemCount } = useCart()
    return { cartItems, cartItemCount }
  },

  data() {
    return {
      isSubmitting: false,
      promoCode: '',
      promoDiscount: 0,
      promoError: '',
      promoSuccess: '',
      validPromoCodes: {
        'SAVE10': 10,
        'SHOP20': 20,
        'WELCOME': 15,
      },
      form: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        country: 'Nigeria',
        saveAddress: false,
        paymentMethod: 'paystack',
      },
      errors: {
        firstName: '', lastName: '', email: '',
        phone: '', address: '', city: '', state: '', zip: '',
      },
      paymentMethods: [
        {
          id: 'paystack',
          name: 'Paystack',
          desc: 'Pay with card, bank transfer or USSD',
          icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#00C3F7"/><text x="4" y="16" font-size="10" font-weight="bold" fill="white">PAY</text></svg>`
        },
        {
          id: 'paypal',
          name: 'PayPal',
          desc: 'Fast and secure PayPal checkout',
          icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#003087"/><text x="3" y="16" font-size="8" font-weight="bold" fill="white">PayPal</text></svg>`
        },
        {
          id: 'bank',
          name: 'Bank Transfer',
          desc: 'Direct bank transfer / USSD',
          icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#333" stroke-width="1.5"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></svg>`
        },
      ],
    }
  },

  computed: {
    subtotal() {
      return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    },
    discountPercent() {
      const hasDiscount = this.cartItems.find(i => i.discount)
      return hasDiscount ? hasDiscount.discount : 0
    },
    discount() {
      return this.subtotal * (this.discountPercent / 100)
    },
    deliveryFee() {
      return this.subtotal > 200 ? 0 : 15
    },
    finalTotal() {
      return this.subtotal - this.discount - this.promoDiscount + this.deliveryFee
    },
    selectedMethodName() {
      const m = this.paymentMethods.find(m => m.id === this.form.paymentMethod)
      return m ? m.name : ''
    }
  },

  methods: {
    getImagePath(image) {
      try {
        return new URL(`../assets/img/${image}`, import.meta.url).href
      } catch { return '' }
    },

    validate(field) {
      this.errors[field] = ''
      const v = this.form[field]
      if (field === 'firstName' && !v.trim()) this.errors.firstName = 'First name is required.'
      if (field === 'lastName'  && !v.trim()) this.errors.lastName  = 'Last name is required.'
      if (field === 'email') {
        if (!v.trim()) this.errors.email = 'Email is required.'
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) this.errors.email = 'Enter a valid email.'
      }
      if (field === 'phone'   && !v.trim()) this.errors.phone   = 'Phone number is required.'
      if (field === 'address' && !v.trim()) this.errors.address = 'Address is required.'
      if (field === 'city'    && !v.trim()) this.errors.city    = 'City is required.'
      if (field === 'state'   && !v.trim()) this.errors.state   = 'State is required.'
      if (field === 'zip'     && !v.trim()) this.errors.zip     = 'ZIP code is required.'
    },

    validateAll() {
      Object.keys(this.errors).forEach(f => this.validate(f))
      return !Object.values(this.errors).some(e => e)
    },

    applyPromo() {
      this.promoError = ''
      this.promoSuccess = ''
      this.promoDiscount = 0
      const code = this.promoCode.trim().toUpperCase()
      if (!code) { this.promoError = 'Please enter a promo code.'; return }
      const pct = this.validPromoCodes[code]
      if (!pct) { this.promoError = 'Invalid promo code.'; return }
      this.promoDiscount = this.subtotal * (pct / 100)
      this.promoSuccess = `${pct}% discount applied!`
    },

    async handlePlaceOrder() {
      if (!this.validateAll()) {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        return
      }
      if (!this.form.paymentMethod) {
        alert('Please select a payment method.')
        return
      }
      this.isSubmitting = true
      await new Promise(r => setTimeout(r, 1500))
      // TODO: POST to your backend order endpoint
      // const res = await fetch('/api/orders', { method: 'POST', body: JSON.stringify({...}) })
      this.isSubmitting = false
      this.$router.push('/order-confirmation')
    }
  },

  mounted() {
  console.log('Cart items:', this.cartItems)
}
}
</script>

<style scoped>
.checkout-page {
  min-height: 100vh;
  background: var(--color-bg-secondary);
  padding-top: 0;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 24px var(--space-lg) 60px;
}

/* Header */
.checkout-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--color-border);
}

.checkout-logo {
  font-family: var(--font-primary);
  font-size: 24px;
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  text-decoration: none;
}

.checkout-steps {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-secondary);
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

.step { color: var(--color-text-muted); }
.step.active { color: var(--color-text-primary); font-weight: var(--font-weight-medium); }

/* Layout */
.checkout-layout {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 24px;
  align-items: start;
}

/* Cards */
.form-card,
.summary-card {
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: 28px;
  margin-bottom: 20px;
}

.summary-card { margin-bottom: 0; position: sticky; top: 24px; }

.card-title {
  font-family: var(--font-primary);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin: 0 0 24px;
  display: flex;
  align-items: center;
  gap: 10px;
}

/* Form */
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 16px;
}

.form-label {
  font-family: var(--font-secondary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
}

.form-input {
  width: 100%;
  padding: 12px 16px;
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-md);
  font-family: var(--font-secondary);
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
  background: var(--color-bg-primary);
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;
  box-sizing: border-box;
}

.form-input:focus {
  border-color: var(--color-text-primary);
  box-shadow: 0 0 0 3px rgba(0,0,0,0.06);
}

.form-group.error .form-input { border-color: #ff3333; }
.error-msg { font-size: 12px; color: #ff3333; font-family: var(--font-secondary); }

.form-select { cursor: pointer; appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4 6L8 10L12 6' stroke='%23000000' stroke-width='1.5'/%3E%3C/svg%3E");
  background-repeat: no-repeat; background-position: right 12px center;
}

/* Checkbox */
.checkbox-label {
  display: flex; align-items: center; gap: 10px; cursor: pointer; margin-top: 4px;
}
.checkbox-input { display: none; }
.checkbox-custom {
  width: 18px; height: 18px;
  border: 1.5px solid var(--color-border);
  border-radius: 4px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.15s; background: #fff;
}
.checkbox-input:checked + .checkbox-custom {
  background: var(--color-text-primary); border-color: var(--color-text-primary);
}
.checkbox-input:checked + .checkbox-custom::after {
  content: ''; width: 10px; height: 6px;
  border-left: 2px solid #fff; border-bottom: 2px solid #fff;
  transform: rotate(-45deg) translateY(-1px);
}
.checkbox-text { font-family: var(--font-secondary); font-size: 13px; color: var(--color-text-secondary); }

/* Payment Options */
.payment-options { display: flex; flex-direction: column; gap: 12px; }

.payment-option {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.15s;
}
.payment-option:hover { border-color: var(--color-text-primary); }
.payment-option.selected { border-color: var(--color-text-primary); background: var(--color-bg-secondary); }

.radio-input { display: none; }

.payment-option-inner { display: flex; align-items: center; gap: 14px; flex: 1; }
.payment-icon-wrap { width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; }

.payment-name { font-family: var(--font-secondary); font-size: var(--font-size-sm); font-weight: var(--font-weight-semibold); color: var(--color-text-primary); margin: 0 0 2px; }
.payment-desc { font-family: var(--font-secondary); font-size: 12px; color: var(--color-text-muted); margin: 0; }

.radio-dot {
  width: 18px; height: 18px;
  border: 1.5px solid var(--color-border);
  border-radius: 50%; flex-shrink: 0;
  transition: all 0.15s;
}
.radio-dot.checked {
  border-color: var(--color-text-primary);
  background: radial-gradient(circle, var(--color-text-primary) 50%, transparent 50%);
}

.payment-notice {
  display: flex; align-items: center; gap: 8px;
  margin-top: 16px; padding: 12px 16px;
  background: var(--color-bg-secondary);
  border-radius: var(--radius-md);
  font-family: var(--font-secondary);
  font-size: 13px; color: var(--color-text-secondary);
}

/* Summary */
.summary-items {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.summary-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.summary-item-image {
  position: relative;
  width: 64px;
  height: 64px;
  flex-shrink: 0;
  border-radius: var(--radius-md);
  overflow: visible;
  background: var(--color-bg-secondary);
}

.summary-item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: var(--radius-md);
}

.item-qty {
  position: absolute;
  top: -8px;
  right: -8px;
  background: var(--color-text-primary);
  color: #fff;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  font-size: 11px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-secondary);
  border: 2px solid var(--color-bg-primary);
  z-index: 1;
}

.summary-item-info { flex: 1; }
.summary-item-name { font-family: var(--font-secondary); font-size: 13px; font-weight: var(--font-weight-semibold); color: var(--color-text-primary); margin: 0 0 2px; }
.summary-item-meta { font-family: var(--font-secondary); font-size: 12px; color: var(--color-text-muted); margin: 0; }
.summary-item-price { font-family: var(--font-secondary); font-size: 13px; font-weight: var(--font-weight-semibold); color: var(--color-text-primary); white-space: nowrap; }

.summary-divider { height: 1px; background: var(--color-border); margin: 16px 0; }

/* Promo */
.promo-input-wrap {
  display: flex; align-items: center; gap: 0;
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-full); overflow: hidden;
  padding: 4px 4px 4px 12px;
  background: var(--color-bg-secondary);
}
.promo-input-wrap svg { color: var(--color-text-muted); flex-shrink: 0; }
.promo-input {
  flex: 1; border: none; background: transparent;
  padding: 8px 8px; font-family: var(--font-secondary);
  font-size: var(--font-size-sm); color: var(--color-text-primary); outline: none;
}
.promo-btn {
  padding: 8px 16px; background: var(--color-text-primary);
  color: #fff; border: none; border-radius: var(--radius-full);
  font-family: var(--font-secondary); font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium); cursor: pointer;
  transition: opacity 0.2s;
}
.promo-btn:hover { opacity: 0.85; }
.promo-error { font-size: 12px; color: #ff3333; margin-top: 6px; font-family: var(--font-secondary); }
.promo-success { font-size: 12px; color: #00b341; margin-top: 6px; font-family: var(--font-secondary); }

/* Totals */
.summary-totals { display: flex; flex-direction: column; gap: 10px; }
.total-row {
  display: flex; justify-content: space-between; align-items: center;
  font-family: var(--font-secondary); font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}
.discount-row { color: #ff3333; }
.total-final {
  display: flex; justify-content: space-between; align-items: center;
  font-family: var(--font-primary); font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold); color: var(--color-text-primary);
  margin-bottom: 20px;
}

/* Pay Button */
.pay-btn {
  width: 100%; padding: 16px;
  background: var(--color-text-primary);
  color: var(--color-bg-primary);
  border: none; border-radius: var(--radius-full);
  font-family: var(--font-secondary); font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold); cursor: pointer;
  transition: opacity 0.2s;
  display: flex; align-items: center; justify-content: center; gap: 8px;
}
.pay-btn:hover:not(:disabled) { opacity: 0.88; }
.pay-btn:disabled { opacity: 0.6; cursor: not-allowed; }

.spinner {
  width: 16px; height: 16px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: white; border-radius: 50%;
  animation: spin 0.7s linear infinite; flex-shrink: 0;
}
@keyframes spin { to { transform: rotate(360deg); } }

.secure-note {
  display: flex; align-items: center; justify-content: center; gap: 6px;
  margin-top: 12px; font-family: var(--font-secondary);
  font-size: 12px; color: var(--color-text-muted);
}

/* Responsive */
@media (max-width: 1024px) {
  .checkout-layout { grid-template-columns: 1fr; }
  .summary-card { position: static; }
  .summary-column { order: -1; }
}

@media (max-width: 768px) {
  .container { padding: 16px; }
  .checkout-steps { display: none; }
  .form-row { grid-template-columns: 1fr; }
  .form-card, .summary-card { padding: 20px; }
}
</style>

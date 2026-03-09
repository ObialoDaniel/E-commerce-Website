<template>
  <div class="confirmation-page">
    <main class="container">

      <!-- Header -->
      <div class="confirmation-header">
        <router-link to="/" class="checkout-logo">SHOP.CO</router-link>
        <div class="checkout-steps">
          <span class="step done">Shipping</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
          <span class="step done">Payment</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
          <span class="step active">Confirmation</span>
        </div>
      </div>

      <!-- Success Card -->
      <div class="success-card">

        <!-- Animated Checkmark -->
        <div class="check-wrapper">
          <svg class="checkmark" viewBox="0 0 52 52">
            <circle class="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
            <path class="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
          </svg>
        </div>

        <h1 class="success-title">Order Confirmed!</h1>
        <p class="success-subtitle">Thank you for your purchase. We've received your order and will begin processing it shortly.</p>

        <div class="order-meta">
          <div class="meta-item">
            <span class="meta-label">Order Number</span>
            <span class="meta-value">#{{ orderNumber }}</span>
          </div>
          <div class="meta-divider"></div>
          <div class="meta-item">
            <span class="meta-label">Date</span>
            <span class="meta-value">{{ orderDate }}</span>
          </div>
          <div class="meta-divider"></div>
          <div class="meta-item">
            <span class="meta-label">Estimated Delivery</span>
            <span class="meta-value">{{ deliveryDate }}</span>
          </div>
        </div>
      </div>

      <div class="confirmation-layout">

        <!-- Order Items -->
        <div class="confirmation-main">
          <div class="info-card">
            <h2 class="card-title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
              Items Ordered
            </h2>

            <div class="order-items">
              <div v-for="item in cartItems" :key="item.cartItemId" class="order-item">
                <div class="item-image">
                  <img :src="item.image" :alt="item.name" />
                  <span class="item-qty-badge">{{ item.quantity }}</span>
                </div>
                <div class="item-details">
                  <p class="item-name">{{ item.name }}</p>
                  <p class="item-meta">Size: {{ item.size }} · Color: {{ item.color }}</p>
                </div>
                <p class="item-price">${{ (item.price * item.quantity).toFixed(2) }}</p>
              </div>
            </div>

            <div class="order-totals">
              <div class="total-row">
                <span>Subtotal</span>
                <span>${{ subtotal.toFixed(2) }}</span>
              </div>
              <div class="total-row">
                <span>Delivery Fee</span>
                <span>{{ deliveryFee === 0 ? 'Free' : `$${deliveryFee.toFixed(2)}` }}</span>
              </div>
              <div class="total-row final">
                <span>Total Paid</span>
                <span>${{ finalTotal.toFixed(2) }}</span>
              </div>
            </div>
          </div>

          <!-- Shipping Info -->
          <div class="info-card">
            <h2 class="card-title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
              Shipping Address
            </h2>
            <div class="address-block">
              <p>{{ shippingInfo.firstName }} {{ shippingInfo.lastName }}</p>
              <p>{{ shippingInfo.address }}</p>
              <p>{{ shippingInfo.city }}, {{ shippingInfo.state }} {{ shippingInfo.zip }}</p>
              <p>{{ shippingInfo.country }}</p>
              <p>{{ shippingInfo.phone }}</p>
            </div>
          </div>
        </div>

        <!-- Right: Tracking + CTAs -->
        <div class="confirmation-sidebar">

          <!-- Tracking Timeline -->
          <div class="info-card tracking-card">
            <h2 class="card-title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              Order Status
            </h2>

            <div class="timeline">
              <div
                v-for="(step, index) in timeline"
                :key="index"
                class="timeline-step"
                :class="{ active: step.active, done: step.done }"
              >
                <div class="timeline-icon">
                  <svg v-if="step.done" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                  <div v-else class="timeline-dot"></div>
                </div>
                <div class="timeline-line" v-if="index < timeline.length - 1"></div>
                <div class="timeline-content">
                  <p class="timeline-title">{{ step.title }}</p>
                  <p class="timeline-desc">{{ step.desc }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Need Help -->
          <div class="info-card help-card">
            <h2 class="card-title">Need Help?</h2>
            <p class="help-text">If you have any questions about your order, feel free to reach out to us.</p>
            <router-link to="/contact" class="help-btn">Contact Support</router-link>
          </div>

          <!-- CTAs -->
          <div class="cta-buttons">
            <router-link to="/category" class="btn-primary">Continue Shopping</router-link>
            <button class="btn-secondary" @click="printOrder">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
              Print Receipt
            </button>
          </div>

        </div>
      </div>

    </main>
  </div>
</template>

<script>
import { useCart } from '@/composables/useCart'

export default {
  name: 'OrderConfirmationPage',

  setup() {
    const { cartItems, clearCart } = useCart()
    return { cartItems, clearCart }
  },

  data() {
    return {
      orderNumber: this.generateOrderNumber(),
      shippingInfo: JSON.parse(sessionStorage.getItem('shippingInfo') || '{}'),
      timeline: [
        { title: 'Order Placed',    desc: 'We have received your order.',           done: true,  active: false },
        { title: 'Processing',      desc: 'Your order is being prepared.',          done: false, active: true  },
        { title: 'Shipped',         desc: 'Your order is on its way.',              done: false, active: false },
        { title: 'Out for Delivery',desc: 'Your order is out for delivery.',        done: false, active: false },
        { title: 'Delivered',       desc: 'Your order has been delivered.',         done: false, active: false },
      ]
    }
  },

  computed: {
    subtotal() {
      return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    },
    deliveryFee() {
      return this.subtotal > 200 ? 0 : 15
    },
    finalTotal() {
      return this.subtotal + this.deliveryFee
    },
    orderDate() {
      return new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    },
    deliveryDate() {
      const d = new Date()
      d.setDate(d.getDate() + 7)
      const d2 = new Date()
      d2.setDate(d2.getDate() + 10)
      return `${d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} – ${d2.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`
    }
  },

  mounted() {
    // Clear cart after successful order
    // this.clearCart()
  },

  methods: {
    generateOrderNumber() {
      return 'SC' + Date.now().toString().slice(-8).toUpperCase()
    },
    printOrder() {
      window.print()
    }
  }
}
</script>

<style scoped>
.confirmation-page {
  min-height: 100vh;
  background: var(--color-bg-secondary);
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 24px var(--space-lg) 60px;
}

/* Header */
.confirmation-header {
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
.step.done { color: var(--color-text-secondary); }
.step.active { color: var(--color-text-primary); font-weight: var(--font-weight-medium); }

/* Success Card */
.success-card {
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: 48px 32px 36px;
  text-align: center;
  margin-bottom: 24px;
}

/* Checkmark Animation */
.check-wrapper {
  width: 72px;
  height: 72px;
  margin: 0 auto 24px;
}

.checkmark {
  width: 72px;
  height: 72px;
  border-radius: 50%;
}

.checkmark-circle {
  stroke: #00b341;
  stroke-width: 2;
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
}

.checkmark-check {
  stroke: #00b341;
  stroke-width: 2.5;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.6s forwards;
}

@keyframes stroke {
  100% { stroke-dashoffset: 0; }
}

.success-title {
  font-family: var(--font-primary);
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin: 0 0 12px;
}

.success-subtitle {
  font-family: var(--font-secondary);
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  margin: 0 auto 32px;
  max-width: 480px;
  line-height: 1.6;
}

.order-meta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  background: var(--color-bg-secondary);
  border-radius: var(--radius-lg);
  padding: 20px 32px;
  flex-wrap: wrap;
}

.meta-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  text-align: center;
}

.meta-label {
  font-family: var(--font-secondary);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-text-muted);
}

.meta-value {
  font-family: var(--font-secondary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
}

.meta-divider {
  width: 1px;
  height: 32px;
  background: var(--color-border);
}

/* Layout */
.confirmation-layout {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 24px;
  align-items: start;
}

.confirmation-main { display: flex; flex-direction: column; gap: 20px; }
.confirmation-sidebar { display: flex; flex-direction: column; gap: 20px; position: sticky; top: 24px; }

/* Cards */
.info-card {
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: 24px;
}

.card-title {
  font-family: var(--font-primary);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin: 0 0 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

/* Order Items */
.order-items { display: flex; flex-direction: column; gap: 16px; margin-bottom: 20px; }

.order-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--color-border);
}
.order-item:last-child { border-bottom: none; padding-bottom: 0; }

.item-image {
  position: relative;
  width: 60px;
  height: 60px;
  flex-shrink: 0;
  border-radius: var(--radius-md);
  overflow: visible;
  background: var(--color-bg-secondary);
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: var(--radius-md);
}

.item-qty-badge {
  position: absolute;
  top: -6px;
  right: -6px;
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

.item-details { flex: 1; }
.item-name { font-family: var(--font-secondary); font-size: var(--font-size-sm); font-weight: var(--font-weight-semibold); color: var(--color-text-primary); margin: 0 0 4px; }
.item-meta { font-family: var(--font-secondary); font-size: 12px; color: var(--color-text-muted); margin: 0; }
.item-price { font-family: var(--font-secondary); font-size: var(--font-size-sm); font-weight: var(--font-weight-semibold); color: var(--color-text-primary); white-space: nowrap; }

/* Totals */
.order-totals { display: flex; flex-direction: column; gap: 10px; padding-top: 16px; border-top: 1px solid var(--color-border); }
.total-row { display: flex; justify-content: space-between; font-family: var(--font-secondary); font-size: var(--font-size-sm); color: var(--color-text-secondary); }
.total-row.final { font-size: var(--font-size-base); font-weight: var(--font-weight-bold); color: var(--color-text-primary); padding-top: 10px; border-top: 1px solid var(--color-border); }

/* Address */
.address-block { display: flex; flex-direction: column; gap: 4px; }
.address-block p { font-family: var(--font-secondary); font-size: var(--font-size-sm); color: var(--color-text-secondary); margin: 0; }

/* Timeline */
.timeline { display: flex; flex-direction: column; gap: 0; }

.timeline-step {
  display: grid;
  grid-template-columns: 28px 1fr;
  grid-template-rows: auto 1fr;
  gap: 0 12px;
  position: relative;
}

.timeline-icon {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-primary);
  z-index: 1;
  grid-row: 1;
  flex-shrink: 0;
}

.timeline-step.done .timeline-icon {
  background: #00b341;
  border-color: #00b341;
  color: white;
}

.timeline-step.active .timeline-icon {
  border-color: var(--color-text-primary);
  background: var(--color-text-primary);
}

.timeline-step.active .timeline-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: white;
}

.timeline-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-border);
}

.timeline-line {
  width: 2px;
  min-height: 24px;
  background: var(--color-border);
  margin: 0 auto;
  grid-column: 1;
  grid-row: 2;
}

.timeline-step.done .timeline-line { background: #00b341; }

.timeline-content {
  grid-column: 2;
  grid-row: 1 / 3;
  padding-bottom: 20px;
  padding-top: 4px;
}

.timeline-title { font-family: var(--font-secondary); font-size: var(--font-size-sm); font-weight: var(--font-weight-semibold); color: var(--color-text-primary); margin: 0 0 2px; }
.timeline-step:not(.done):not(.active) .timeline-title { color: var(--color-text-muted); }
.timeline-desc { font-family: var(--font-secondary); font-size: 12px; color: var(--color-text-muted); margin: 0; }

/* Help */
.help-text { font-family: var(--font-secondary); font-size: var(--font-size-sm); color: var(--color-text-secondary); margin: 0 0 16px; line-height: 1.6; }
.help-btn {
  display: inline-block;
  padding: 10px 20px;
  border: 1.5px solid var(--color-text-primary);
  border-radius: var(--radius-full);
  font-family: var(--font-secondary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
  text-decoration: none;
  transition: all 0.2s;
}
.help-btn:hover { background: var(--color-text-primary); color: var(--color-bg-primary); }

/* CTAs */
.cta-buttons { display: flex; flex-direction: column; gap: 12px; }

.btn-primary {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
  background: var(--color-text-primary);
  color: var(--color-bg-primary);
  border: none;
  border-radius: var(--radius-full);
  font-family: var(--font-secondary);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  text-decoration: none;
  cursor: pointer;
  transition: opacity 0.2s;
}
.btn-primary:hover { opacity: 0.88; }

.btn-secondary {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 15px;
  background: transparent;
  color: var(--color-text-primary);
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-full);
  font-family: var(--font-secondary);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all 0.2s;
}
.btn-secondary:hover { border-color: var(--color-text-primary); background: var(--color-bg-secondary); }

/* Responsive */
@media (max-width: 1024px) {
  .confirmation-layout { grid-template-columns: 1fr; }
  .confirmation-sidebar { position: static; }
}

@media (max-width: 768px) {
  .container { padding: 16px; }
  .confirmation-header { margin-bottom: 20px; }
  .checkout-steps { display: none; }
  .success-card { padding: 32px 20px 24px; }
  .success-title { font-size: var(--font-size-2xl); }
  .order-meta { gap: 16px; padding: 16px; }
  .meta-divider { display: none; }
  .info-card { padding: 20px; }
}

@media print {
  .cta-buttons,
  .help-card,
  .confirmation-header { display: none; }
}
</style>

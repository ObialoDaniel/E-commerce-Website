<template>
  <div class="cart-page">
    <AppHeader />
    <main class="container">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <ol>
          <li><router-link to="/">Home</router-link></li>
          <li><span class="current">Cart</span></li>
        </ol>
      </nav>

      <h1 class="page-title">YOUR CART</h1>

      <div class="cart-content">
        <section class="cart-items">
          <div v-if="cartItems.length === 0" class="empty-cart">
            <p>Your cart is empty</p>
            <router-link to="/category" class="continue-shopping-btn">
              Continue Shopping
            </router-link>
          </div>

          <div v-else>
            <div
              v-for="item in cartItems"
              :key="item.cartItemId"
              class="cart-item"
            >
              <!-- Product Image -->
              <div class="item-image">
                <img :src="item.image" :alt="item.name">
              </div>

              <!-- Product Info -->
              <div class="item-details">
                <div class="item-header">
                  <h3 class="item-name">{{ item.name }}</h3>
                  <button
                    @click="handleRemoveItem(item.cartItemId)"
                    class="remove-btn"
                    aria-label="Remove item"
                  >
                   <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.25 3H13.5V2.25C13.5 1.65326 13.2629 1.08097 12.841 0.65901C12.419 0.237053 11.8467 0 11.25 0H6.75C6.15326 0 5.58097 0.237053 5.15901 0.65901C4.73705 1.08097 4.5 1.65326 4.5 2.25V3H0.75C0.551088 3 0.360322 3.07902 0.21967 3.21967C0.0790178 3.36032 0 3.55109 0 3.75C0 3.94891 0.0790178 4.13968 0.21967 4.28033C0.360322 4.42098 0.551088 4.5 0.75 4.5H1.5V18C1.5 18.3978 1.65804 18.7794 1.93934 19.0607C2.22064 19.342 2.60218 19.5 3 19.5H15C15.3978 19.5 15.7794 19.342 16.0607 19.0607C16.342 18.7794 16.5 18.3978 16.5 18V4.5H17.25C17.4489 4.5 17.6397 4.42098 17.7803 4.28033C17.921 4.13968 18 3.94891 18 3.75C18 3.55109 17.921 3.36032 17.7803 3.21967C17.6397 3.07902 17.4489 3 17.25 3ZM7.5 14.25C7.5 14.4489 7.42098 14.6397 7.28033 14.7803C7.13968 14.921 6.94891 15 6.75 15C6.55109 15 6.36032 14.921 6.21967 14.7803C6.07902 14.6397 6 14.4489 6 14.25V8.25C6 8.05109 6.07902 7.86032 6.21967 7.71967C6.36032 7.57902 6.55109 7.5 6.75 7.5C6.94891 7.5 7.13968 7.57902 7.28033 7.71967C7.42098 7.86032 7.5 8.05109 7.5 8.25V14.25ZM12 14.25C12 14.4489 11.921 14.6397 11.7803 14.7803C11.6397 14.921 11.4489 15 11.25 15C11.0511 15 10.8603 14.921 10.7197 14.7803C10.579 14.6397 10.5 14.4489 10.5 14.25V8.25C10.5 8.05109 10.579 7.86032 10.7197 7.71967C10.8603 7.57902 11.0511 7.5 11.25 7.5C11.4489 7.5 11.6397 7.57902 11.7803 7.71967C11.921 7.86032 12 8.05109 12 8.25V14.25ZM12 3H6V2.25C6 2.05109 6.07902 1.86032 6.21967 1.71967C6.36032 1.57902 6.55109 1.5 6.75 1.5H11.25C11.4489 1.5 11.6397 1.57902 11.7803 1.71967C11.921 1.86032 12 2.05109 12 2.25V3Z" fill="#FF3333"/>
                    </svg>
                  </button>
                </div>

                <div class="item-attributes">
                  <p>Size: <span>{{ item.size }}</span></p>
                  <p>Color: <span>{{ item.color }}</span></p>
                </div>

                <div class="item-footer">
                  <span class="item-price">${{ formatPrice(item.price) }}</span>

                  <!-- Quantity Controls -->
                  <div class="quantity-controls">
                    <button
                      @click="decreaseQuantity(item.cartItemId)"
                      :disabled="item.quantity <= 1"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span class="quantity">{{ item.quantity }}</span>
                    <button
                      @click="increaseQuantity(item.cartItemId)"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Order Summary Section -->
        <aside class="order-summary">
          <h2>Order Summary</h2>

          <div class="summary-row">
            <span>Subtotal</span>
            <span class="summary-value">${{ formatPrice(subtotal) }}</span>
          </div>

          <div class="summary-row discount">
            <span>Discount (-20%)</span>
            <span class="summary-value">-${{ formatPrice(discount) }}</span>
          </div>

          <div class="summary-row">
            <span>Delivery Fee</span>
            <span class="summary-value">${{ formatPrice(deliveryFee) }}</span>
          </div>

          <hr>

          <div class="summary-row total">
            <span>Total</span>
            <span class="summary-value">${{ formatPrice(total) }}</span>
          </div>

          <!-- Promo Code -->
          <div class="promo-code">
            <div class="promo-input-wrapper">
              <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.4516 9.86063L11.1403 0.549383C10.9667 0.374635 10.7601 0.236091 10.5326 0.141785C10.305 0.0474796 10.061 -0.000710913 9.8147 7.92487e-06H1.12501C0.826639 7.92487e-06 0.540491 0.118534 0.329513 0.329513C0.118534 0.540491 7.92487e-06 0.826639 7.92487e-06 1.12501V9.8147C-0.000710913 10.061 0.0474796 10.305 0.141785 10.5326C0.236091 10.7601 0.374635 10.9667 0.549383 11.1403L9.86063 20.4516C10.2122 20.8031 10.6891 21.0005 11.1863 21.0005C11.6834 21.0005 12.1603 20.8031 12.5119 20.4516L20.4516 12.5119C20.8031 12.1603 21.0005 11.6834 21.0005 11.1863C21.0005 10.6891 20.8031 10.2122 20.4516 9.86063ZM11.1863 18.5953L2.25001 9.65626V2.25001H9.65626L18.5925 11.1863L11.1863 18.5953ZM6.75001 5.25001C6.75001 5.54668 6.66203 5.83669 6.49721 6.08336C6.33239 6.33004 6.09812 6.5223 5.82403 6.63583C5.54994 6.74936 5.24834 6.77906 4.95737 6.72119C4.6664 6.66331 4.39913 6.52045 4.18935 6.31067C3.97957 6.10089 3.83671 5.83361 3.77883 5.54264C3.72095 5.25167 3.75066 4.95007 3.86419 4.67598C3.97772 4.40189 4.16998 4.16763 4.41665 4.0028C4.66333 3.83798 4.95334 3.75001 5.25001 3.75001C5.64783 3.75001 6.02936 3.90804 6.31067 4.18935C6.59197 4.47065 6.75001 4.85218 6.75001 5.25001Z" fill="black" fill-opacity="0.4"/>
              </svg>

              <input
                type="text"
                v-model="promoCode"
                placeholder="Add promo code"
                class="promo-input"
              >
            </div>
            <button @click="applyPromo" class="apply-btn">Apply</button>
          </div>

          <!-- Checkout Button -->
          <button @click="goToCheckout" class="checkout-btn">
            Go to Checkout
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </aside>
      </div>
    </main>
    <AppFooter />
  </div>
</template>

<script>
import { useCart } from '@/composables/useCart'

export default {
  name: 'CartPage',

  setup() {
    const {
      cartItems,
      subtotal,
      increaseQuantity,
      decreaseQuantity,
      removeFromCart
    } = useCart()

    return {
      cartItems,
      subtotal,
      increaseQuantity,
      decreaseQuantity,
      removeFromCart,
    }
  },

  data() {
    return {
      promoCode: '',
      deliveryFee: 15,
      discountPercent: 20,
    }
  },

  computed: {
    discount() {
      return ((this.subtotal * this.discountPercent) / 100)
    },

    total() {
      return this.subtotal - this.discount + this.deliveryFee
    }
  },

  methods: {
    handleRemoveItem(cartItemId) {
      if (confirm('Are you sure you want to remove this item from the cart?')) {
        this.removeFromCart(cartItemId)
      }
    },

    formatPrice(price) {
      const numPrice = parseFloat(price) || 0
      return numPrice.toFixed(2)
    },

    applyPromo() {
      if (this.promoCode.trim()) {
        // Add promo code logic here
        alert(`Promo code "${this.promoCode}" applied!`)
      }
    },

    goToCheckout() {
      if (this.cartItems.length === 0) {
        alert('Your cart is empty. Please add items before checkout.')
        return
      }
      // Navigate to checkout page
      this.$router.push('/checkout')
    }
  }
}
</script>

<style scoped>
.cart-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.container {
  max-width: var(--container-max-width);
  margin: 0 auto;
  padding: var(--space-lg);
  flex: 1;
}

/* Breadcrumb */
.breadcrumb {
  margin-bottom: var(--space-xl);
}

.breadcrumb ol {
  display: flex;
  gap: var(--space-sm);
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.breadcrumb li:not(:last-child)::after {
  content: '>';
  margin-left: var(--space-sm);
}

.breadcrumb a {
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.breadcrumb a:hover {
  color: var(--color-text-primary);
}

.breadcrumb .current {
  color: var(--color-text-primary);
  font-weight: var(--font-weight-medium);
}

/* Page Title */
.page-title {
  font-family: var(--font-primary);
  font-size: var(--font-size-category);
  font-weight: var(--font-weight-bold);
  text-transform: uppercase;
  margin-bottom: var(--space-2xl);
  color: var(--color-text-primary);
}

/* Layout */
.cart-content {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: var(--space-2xl);
}

/* Cart Items */
.cart-items {
  display: flex;
  flex-direction: column;
  gap: var(--space-xl);
}

.empty-cart {
  text-align: center;
  padding: var(--space-5xl) var(--space-xl);
}

.empty-cart p {
  font-size: var(--font-size-xl);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-xl);
}

.continue-shopping-btn {
  display: inline-block;
  padding: var(--space-md) var(--space-2xl);
  background: var(--color-text-primary);
  color: var(--color-bg-primary);
  text-decoration: none;
  border-radius: var(--radius-full);
  font-weight: var(--font-weight-semibold);
  transition: opacity var(--transition-fast);
}

.continue-shopping-btn:hover {
  opacity: 0.9;
}

.cart-item {
  display: flex;
  gap: var(--space-lg);
  padding: var(--space-lg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  background: var(--color-bg-primary);
  border-bottom: var(--space-md);
}

.item-image {
  width: 120px;
  height: 140px;
  flex-shrink: 0;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--color-bg-secondary);
}

.item-image img {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.item-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.item-name {
  font-family: var(--font-secondary);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin: 0;
  line-height: var(--line-height-tight);
}

.remove-btn {
  background: none;
  border: none;
  color: #FF3333;
  cursor: pointer;
  padding: var(--space-xs);
  transition: opacity var(--transition-fast);
}

.remove-btn:hover {
  opacity: 0.7;
}

.item-attributes {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  margin: var(--space-sm) 0;
}

.item-attributes p {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin: 0;
}

.item-attributes span {
  color: var(--color-text-primary);
  font-weight: var(--font-weight-medium);
}

.item-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.item-price {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
}

.quantity-controls {
  display: flex;
  align-items: center;
  background: var(--color-bg-secondary);
  border-radius: var(--radius-full);
  padding: var(--space-xs);
  gap: var(--space-md);
}

.quantity-controls button {
  width: 36px;
  height: 36px;
  border: none;
  background: transparent;
  color: var(--color-text-primary);
  font-size: var(--font-size-xl);
  cursor: pointer;
  border-radius: var(--radius-full);
  transition: background var(--transition-fast);
  display: flex;
  align-items: center;
  justify-content: center;
}

.quantity-controls button:hover:not(:disabled) {
  background: var(--color-border);
}

.quantity-controls button:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.quantity {
  min-width: 32px;
  text-align: center;
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-base);
}

/* Order Summary */
.order-summary {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--space-xl);
  height: fit-content;
  position: sticky;
  top: var(--space-lg);
}

.order-summary h2 {
  font-family: var(--font-primary);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--space-lg);
  color: var(--color-text-primary);
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-md);
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
}

.summary-row.discount {
  color: #FF3333;
}

.summary-row.total {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin-bottom: 0;
}

.summary-value {
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
}

.summary-row.discount .summary-value {
  color: #FF3333;
}

hr {
  border: none;
  border-top: 1px solid var(--color-border);
  margin: var(--space-lg) 0;
}

/* Promo Code */
.promo-code {
  display: flex;
  gap: var(--space-sm);
  margin: var(--space-lg) 0;
}

.promo-input-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  background: var(--color-bg-secondary);
  border-radius: var(--radius-full);
  padding: 0 var(--space-md);
}

.promo-input-wrapper svg {
  color: var(--color-text-muted);
  flex-shrink: 0;
}

.promo-input {
  flex: 1;
  border: none;
  background: transparent;
  padding: var(--space-md) 0;
  font-family: var(--font-secondary);
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
}

.promo-input:focus {
  outline: none;
}

.promo-input::placeholder {
  color: var(--color-text-muted);
}

.apply-btn {
  padding: var(--space-md) var(--space-xl);
  background: var(--color-text-primary);
  color: var(--color-bg-primary);
  border: none;
  border-radius: var(--radius-full);
  font-family: var(--font-secondary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: opacity var(--transition-fast);
  white-space: nowrap;
}

.apply-btn:hover {
  opacity: 0.9;
}

/* Checkout Button */
.checkout-btn {
  width: 100%;
  padding: var(--space-md);
  background: var(--color-text-primary);
  color: var(--color-bg-primary);
  border: none;
  border-radius: var(--radius-full);
  font-family: var(--font-secondary);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: opacity var(--transition-fast);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
}

.checkout-btn:hover {
  opacity: 0.9;
}

/* Responsive */
@media (max-width: 1024px) {
  .cart-content {
    grid-template-columns: 1fr;
    gap: var(--space-xl)
  }

  .order-summary {
    position: static;
  }
}

@media (max-width: 768px) {
  .container {
    padding: var(--space-md);
  }

  .page-title {
    font-size: var(--font-size-2xl);
  }

  .cart-item {
    flex-direction: column;
    gap: var(--space-md);
  }

  .item-image {
    width: 100%;
    height: 200px;
  }

  .item-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-md);
  }

  .promo-code {
    flex-direction: column;
  }

  .apply-btn {
    width: 100%;
  }
}

/* Mobile Responsive - 320px */
@media (max-width: 320px) {
  .container {
    padding: 12px 8px;
  }

  .breadcrumb {
    margin-bottom: 16px;
  }

  .breadcrumb ol {
    font-size: 11px;
  }

  .page-title {
    font-size: 24px;
    margin-bottom: 16px;
  }

  .cart-item {
    padding: 12px;
    gap: 10px;
    flex-direction: row;
  }

  .item-attributes {
    flex-direction: row;
    gap: 16px;
    margin: 4px 0 8px 0;
  }

  .item-attributes p {
    font-size: 11px;
    margin: 0;
    display: flex;
    gap: 4px;
  }

  .item-image {
    width: 80px;
    height: 80px;
  }

  .item-name {
    font-size: 14px;
  }

  .item-meta p {
    font-size: 11px;
  }

  .item-price {
    font-size: 16px;
  }

  .item-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

  .quantity-controls {
    padding: 5px 10px;
    gap: 10px;
  }

  .quantity-controls button {
    width: 18px;
    height: 18px;
    font-size: 14px;
  }

  .quantity {
    font-size: 12px;
    min-width: 16px;
  }

  .order-summary {
    padding: 14px;
  }

  .order-summary h2 {
    font-size: 17px;
    margin-bottom: 14px;
  }

  .summary-row {
    font-size: 12px;
    margin-bottom: 10px;
  }

  .summary-row.total {
    font-size: 15px;
  }

  hr {
    margin: 12px 0;
  }

  .promo-code {
    gap: 8px;
    margin: 14px 0;
  }

  .promo-input-wrapper {
    padding: 0 12px;
  }

  .promo-input {
    font-size: 11px;
    padding: 10px 0;
  }

  .apply-btn {
    font-size: 11px;
    padding: 10px 16px;
  }

  .checkout-btn {
    font-size: 12px;
    padding: 11px 16px;
    gap: 8px;
  }
}
</style>

<template>
  <div class="cart page">
    <main class="container">
      <!-- Breadcrumb -->
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <ol>
          <li><router-link to="/">Home</router-link></li>
          <li><span class="current">Cart</span></li>
        </ol>
      </nav>

      <section class="cart-layout">
        <!-- Left: Cart Items -->
        <div class="cart-items">
          <h2 class="section-title">Your Cart</h2>

          <div v-if="cartItems.length === 0" class="empty">
            <p>Your cart is empty. <router-link to="/">Continue shopping</router-link></p>
          </div>

          <ul v-else class="items-list">
            <li v-for="item in cartItems" :key="item.id" class="cart-item">
              <img :src="item.image" alt="" class="item-thumb" />

              <div class="item-body">
                <div class="item-head">
                  <h3 class="item-title">{{ item.title }}</h3>
                  <button class="remove" @click="removeItem(item.id)" aria-label="Remove item">
                    🗑
                  </button>
                </div>

                <div class="item-meta">
                  <span v-if="item.size">Size: {{ item.size }}</span>
                  <span v-if="item.color">Color: {{ item.color }}</span>
                </div>

                <div class="item-controls">
                  <div class="qty-controls">
                    <button @click="decrease(item.id)" class="qty-btn" :disabled="item.qty <= 1">−</button>
                    <span class="qty">{{ item.qty }}</span>
                    <button @click="increase(item.id)" class="qty-btn">+</button>
                  </div>

                  <div class="price">
                    <span class="item-price">\${{ formatPrice(item.price * item.qty) }}</span>
                    <small class="unit-price">(\${{ formatPrice(item.price) }} each)</small>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <!-- Right: Order Summary -->
        <aside class="order-summary">
          <div class="summary-card">
            <h3>Order Summary</h3>

            <dl class="summary-lines">
              <div class="line">
                <dt>Subtotal</dt>
                <dd>\${{ formatPrice(subtotal) }}</dd>
              </div>

              <div class="line">
                <dt>Discount ({{ discountPercent }}%)</dt>
                <dd class="negative">- \${{ formatPrice(discountAmount) }}</dd>
              </div>

              <div class="line">
                <dt>Delivery Fee</dt>
                <dd>\${{ formatPrice(deliveryFee) }}</dd>
              </div>

              <div class="line total">
                <dt>Total</dt>
                <dd>\${{ formatPrice(total) }}</dd>
              </div>
            </dl>

            <div class="promo">
              <input
                v-model="promoInput"
                placeholder="Add promo code"
                @keyup.enter="applyPromo"
                aria-label="Promo code"
              />
              <button class="btn-apply" @click="applyPromo">Apply</button>
            </div>

            <button class="btn-checkout" :disabled="cartItems.length === 0" @click="checkout">
              Go to Checkout →
            </button>
          </div>
        </aside>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const CART_KEY = 'shop_cart_v1';

// Local reactive cart array
const cartItems = ref([]);

// Example pricing settings
const discountPercent = ref(20); // site-wide discount example
const deliveryFee = ref(15); // fixed delivery fee in USD

// Promo code
const promoInput = ref('');
const promoApplied = ref(null); // e.g. { code: 'SAVE10', percent: 10 }

// load cart from localStorage
function loadCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    cartItems.value = raw ? JSON.parse(raw) : [];
  } catch (e) {
    cartItems.value = [];
    console.error('Failed to load cart:', e);
  }
}

// save cart to localStorage
function saveCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(cartItems.value));
}

// example helpers to mutate cart
function increase(id) {
  const item = cartItems.value.find(i => i.id === id);
  if (item) item.qty += 1;
  saveCart();
}

function decrease(id) {
  const item = cartItems.value.find(i => i.id === id);
  if (item && item.qty > 1) {
    item.qty -= 1;
  } else if (item && item.qty === 1) {
    // optional: confirm removal
    removeItem(id);
  }
  saveCart();
}

function removeItem(id) {
  cartItems.value = cartItems.value.filter(i => i.id !== id);
  saveCart();
}

// computed values
const subtotal = computed(() =>
  cartItems.value.reduce((s, it) => s + it.price * it.qty, 0)
);

const discountAmount = computed(() => {
  // site discount plus optional promo
  const base = (subtotal.value * (discountPercent.value / 100));
  if (promoApplied.value && promoApplied.value.percent) {
    // apply promo percent on subtotal after base discount
    const afterBase = subtotal.value - base;
    const promoAmt = afterBase * (promoApplied.value.percent / 100);
    return base + promoAmt;
  }
  return base;
});

const total = computed(() => {
  const t = subtotal.value - discountAmount.value + deliveryFee.value;
  return Math.max(t, 0);
});

// format
function formatPrice(n) {
  return Number(n).toFixed(2);
}

// promo logic (simple example)
function applyPromo() {
  const code = promoInput.value.trim().toUpperCase();
  if (!code) return;

  // example promo map — replace with server validation in real apps
  const promos = {
    SAVE10: { code: 'SAVE10', percent: 10 },
    FREESHIP: { code: 'FREESHIP', percent: 0, freeShipping: true }
  };

  const found = promos[code] || null;
  if (found) {
    promoApplied.value = found;
    // handle free shipping promo
    if (found.freeShipping) deliveryFee.value = 0;
    // user feedback: this example uses alert; you can show a toast
    alert(`Promo "${found.code}" applied.`);
  } else {
    alert('Promo code not valid');
    promoApplied.value = null;
  }
}

// checkout handler
const router = useRouter();
function checkout() {
  // emit or route - for now navigate to checkout route (example)
  // You can also emit an event instead: emit('checkout', { cart: cartItems.value })
  router.push({ name: 'Checkout' }).catch(() => {});
}

// Watch cart to persist
watch(cartItems, saveCart, { deep: true });

// On mount, load cart
onMounted(() => {
  loadCart();
});
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px;
}

/* Breadcrumb */
.breadcrumb {
  margin-bottom: 32px;
}
.breadcrumb ol {
  display: flex;
  gap: 8px;
  list-style: none;
  padding: 0;
  margin: 0;
  color: #777;
}
.breadcrumb a { color: #777; text-decoration: none; }
.breadcrumb .current { color: #111; font-weight: 600; }

/* Layout */
.cart-layout {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 32px;
  align-items: start;
}

/* Left column */
.section-title { font-size: 28px; margin-bottom: 16px; }

.items-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.cart-item {
  display: flex;
  gap: 16px;
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  align-items: center;
  box-shadow: 0 0 0 1px rgba(0,0,0,0.03);
}

.item-thumb {
  width: 110px;
  height: 110px;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;
}

.item-body { flex: 1; min-width: 0; }

.item-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item-title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}

.remove {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
}

/* meta */
.item-meta {
  color: #777;
  font-size: 13px;
  display: flex;
  gap: 12px;
  margin-top: 6px;
}

/* controls & price */
.item-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
}

.qty-controls {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: #f4f4f4;
  padding: 6px 8px;
  border-radius: 8px;
}

.qty-btn {
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 18px;
  width: 28px;
  height: 28px;
}

.qty { min-width: 22px; text-align: center; display: inline-block; }

.price { text-align: right; }
.item-price { font-weight: 700; display: block; }
.unit-price { color: #888; font-size: 12px; }

/* Right column: summary */
.order-summary { position: relative; }
.summary-card {
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 0 0 1px rgba(0,0,0,0.03);
}

.summary-card h3 { margin: 0 0 12px 0; }

.summary-lines { margin: 0 0 16px 0; }
.line { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px dashed #eee; }
.line.total { font-weight: 700; border-bottom: none; padding-top: 14px; }

.negative { color: #d64545; }

.promo { display: flex; gap: 8px; margin-bottom: 18px; }
.promo input {
  flex: 1;
  padding: 10px 12px;
  border-radius: 999px;
  border: 1px solid #eee;
  outline: none;
}
.btn-apply {
  padding: 10px 14px;
  border-radius: 999px;
  border: none;
  background: #000;
  color: #fff;
  cursor: pointer;
}

.btn-checkout {
  width: 100%;
  padding: 14px;
  background: #000;
  color: #fff;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  font-weight: 700;
}

/* empty state */
.empty { padding: 28px; background: #fff; border-radius: 12px; color: #444; }

@media (max-width: 900px) {
  .cart-layout {
    grid-template-columns: 1fr;
  }
  .order-summary { order: 2; }
}
</style>

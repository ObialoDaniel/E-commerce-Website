<template>
  <footer class="footer">
    <!-- Newsletter Section -->
    <div class="newsletter-section">
      <div class="container">
        <div class="newsletter-content">
          <h2 class="newsletter-title">STAY UP TO DATE ABOUT OUR LATEST OFFERS</h2>
          <div class="newsletter-form">
            <div class="email-input-wrapper">
              <svg class="email-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M2.5 6.66669L9.0755 11.0504C9.63533 11.4236 10.3647 11.4236 10.9245 11.0504L17.5 6.66669M4.16667 15.8334H15.8333C16.7538 15.8334 17.5 15.0872 17.5 14.1667V5.83335C17.5 4.91288 16.7538 4.16669 15.8333 4.16669H4.16667C3.24619 4.16669 2.5 4.91288 2.5 5.83335V14.1667C2.5 15.0872 3.24619 15.8334 4.16667 15.8334Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
              <input 
                type="email" 
                class="email-input" 
                placeholder="Enter your email address"
                v-model="email"
              >
            </div>
            <button class="subscribe-btn" @click="handleSubscribe">Subscribe to Newsletter</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Footer -->
    <div class="footer-main">
      <div class="container">
        <div class="footer-grid">
          <!-- Company Info -->
          <div class="footer-col">
            <h3 class="footer-logo">SHOP.CO</h3>
            <p class="footer-description">
              We have clothes that suits your style and which you're proud to wear. From women to men.
            </p>
            <div class="social-links">
              <a href="#" class="social-link" aria-label="Twitter">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                </svg>
              </a>
              <a href="#" class="social-link" aria-label="Facebook">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                </svg>
              </a>
              <a href="#" class="social-link" aria-label="Instagram">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href="#" class="social-link" aria-label="GitHub">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                </svg>
              </a>
            </div>
          </div>

          <!-- Company Links -->
          <div class="footer-col">
            <h4 class="footer-title">COMPANY</h4>
            <ul class="footer-links">
              <li><router-link to="/about">About</router-link></li>
              <li><router-link to="/features">Features</router-link></li>
              <li><router-link to="/works">Works</router-link></li>
              <li><router-link to="/career">Career</router-link></li>
            </ul>
          </div>

          <!-- Help Links -->
          <div class="footer-col">
            <h4 class="footer-title">HELP</h4>
            <ul class="footer-links">
              <li><router-link to="/support">Customer Support</router-link></li>
              <li><router-link to="/delivery">Delivery Details</router-link></li>
              <li><router-link to="/terms">Terms & Conditions</router-link></li>
              <li><router-link to="/privacy">Privacy Policy</router-link></li>
            </ul>
          </div>

          <!-- FAQ Links -->
          <div class="footer-col">
            <h4 class="footer-title">FAQ</h4>
            <ul class="footer-links">
              <li><router-link to="/account">Account</router-link></li>
              <li><router-link to="/orders">Manage Deliveries</router-link></li>
              <li><router-link to="/orders">Orders</router-link></li>
              <li><router-link to="/payments">Payments</router-link></li>
            </ul>
          </div>

          <!-- Resources Links -->
          <div class="footer-col">
            <h4 class="footer-title">RESOURCES</h4>
            <ul class="footer-links">
              <li><a href="#">Free eBooks</a></li>
              <li><a href="#">Development Tutorial</a></li>
              <li><a href="#">How to - Blog</a></li>
              <li><a href="#">Youtube Playlist</a></li>
            </ul>
          </div>
        </div>

        <!-- Footer Bottom -->
        <div class="footer-bottom">
          <p class="copyright">Shop.co © 2000-2023, All Rights Reserved</p>
          <!-- <div class="payment-methods">
            <img src="/images/visa.png" alt="Visa" class="payment-icon">
            <img src="/images/mastercard.png" alt="Mastercard" class="payment-icon">
            <img src="/images/paypal.png" alt="PayPal" class="payment-icon">
            <img src="/images/applepay.png" alt="Apple Pay" class="payment-icon">
            <img src="/images/googlepay.png" alt="Google Pay" class="payment-icon">
          </div> -->
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter',
  data() {
    return {
      email: ''
    }
  },
  methods: {
    handleSubscribe() {
      if (this.email) {
        // Handle newsletter subscription
        console.log('Subscribing:', this.email)
        this.email = ''
        // Show success message
      }
    }
  }
}
</script>

<style scoped>
.footer {
  margin-top: auto;
}

/* Newsletter Section */
.newsletter-section {
  background-color: var(--color-bg-dark);
  padding: var(--space-2xl) 0;
  position: relative;
}

.newsletter-content {
  background-color: var(--color-bg-dark);
  border-radius: var(--radius-xl);
  padding: var(--space-2xl);
  max-width: 1000px;
  margin: 0 auto;
}

.newsletter-title {
  color: var(--color-text-light);
  font-size: var(--font-size-3xl);
  font-family: var(--font-primary);
  text-align: center;
  margin-bottom: var(--space-xl);
  line-height: 1.2;
}

.newsletter-form {
  display: flex;
  gap: var(--space-md);
  max-width: 600px;
  margin: 0 auto;
}

.email-input-wrapper {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
}

.email-icon {
  position: absolute;
  left: var(--space-md);
  color: var(--color-text-muted);
}

.email-input {
  width: 100%;
  padding: var(--space-md) var(--space-md) var(--space-md) 3rem;
  background-color: var(--color-bg-primary);
  border: none;
  border-radius: var(--radius-full);
  font-size: var(--font-size-base);
}

.subscribe-btn {
  padding: var(--space-md) var(--space-xl);
  background-color: var(--color-bg-primary);
  color: var(--color-text-primary);
  border-radius: var(--radius-full);
  font-weight: var(--font-weight-medium);
  white-space: nowrap;
  transition: all var(--transition-normal);
}

.subscribe-btn:hover {
  background-color: var(--color-bg-secondary);
}

/* Footer Main */
.footer-main {
  background-color: var(--color-bg-secondary);
  padding: var(--space-3xl) 0 var(--space-xl);
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr repeat(4, 1fr);
  gap: var(--space-3xl);
  margin-bottom: var(--space-3xl);
}

.footer-col {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.footer-logo {
  font-family: var(--font-primary);
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-sm);
}

.footer-description {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  line-height: var(--line-height-relaxed);
  margin-bottom: var(--space-lg);
}

.social-links {
  display: flex;
  gap: var(--space-md);
}

.social-link {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-full);
  background-color: var(--color-bg-primary);
  border: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-primary);
  transition: all var(--transition-normal);
}

.social-link:hover {
  background-color: var(--color-bg-dark);
  color: var(--color-text-light);
  border-color: var(--color-bg-dark);
}

.footer-title {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  letter-spacing: 0.5px;
  margin-bottom: var(--space-sm);
}

.footer-links {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.footer-links a {
  color: var(--color-text-secondary);
  font-size: var(--font-size-base);
  transition: color var(--transition-fast);
}

.footer-links a:hover {
  color: var(--color-text-primary);
}

/* Footer Bottom */
.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: var(--space-xl);
  border-top: 1px solid var(--color-border);
}

.copyright {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  margin: 0;
}

/* .payment-methods {
  display: flex;
  gap: var(--space-sm);
  align-items: center;
}

.payment-icon {
  height: 30px;
  width: auto;
  object-fit: contain;
  background-color: var(--color-bg-primary);
  padding: var(--space-xs);
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border);
} */

/* Responsive */
@media (max-width: 1024px) {
  .footer-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .footer-col:first-child {
    grid-column: 1 / -1;
  }
}

@media (max-width: 768px) {
  .newsletter-title {
    font-size: var(--font-size-xl);
  }

  .newsletter-form {
    flex-direction: column;
  }

  .footer-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-xl);
  }

  .footer-bottom {
    flex-direction: column;
    gap: var(--space-lg);
    text-align: center;
  }

  .payment-methods {
    flex-wrap: wrap;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .footer-grid {
    grid-template-columns: 1fr;
  }

  .newsletter-content {
    padding: var(--space-xl);
  }
}
</style>
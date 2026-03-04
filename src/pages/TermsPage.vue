<template>
  <div class="terms-page">
    <AppHeader />

    <main class="container">

      <nav class="breadcrumb" aria-label="Breadcrumb">
        <ol>
          <li><router-link to="/">Home</router-link></li>
          <li><span class="current">Terms & Conditions</span></li>
        </ol>
      </nav>

      <div class="terms-layout">

        <!-- Sidebar TOC -->
        <aside class="toc">
          <p class="toc-title">Contents</p>
          <ul>
            <li v-for="section in sections" :key="section.id">
              <a :href="`#${section.id}`" :class="{ active: activeSection === section.id }">
                {{ section.title }}
              </a>
            </li>
          </ul>
        </aside>

        <!-- Content -->
        <article class="terms-content">
          <div class="terms-header">
            <h1 class="terms-title">Terms &amp; Conditions</h1>
            <p class="terms-date">Last updated: January 1, {{ currentYear }}</p>
          </div>

          <section id="introduction">
            <h2>1. Introduction</h2>
            <p>Welcome to SHOP.CO ("we," "our," or "us"). These Terms and Conditions govern your use of our website and any related services, including purchases made through our platform. By accessing or using our website, you agree to be bound by these Terms in full. If you disagree with any part of these terms, you may not access our website or use our services.</p>
          </section>

          <section id="eligibility">
            <h2>2. Eligibility</h2>
            <p>To use our services and make purchases on SHOP.CO, you must:</p>
            <ul>
              <li>Be at least 18 years of age, or the age of majority in your jurisdiction</li>
              <li>Have the legal capacity to enter into a binding contract</li>
              <li>Not be prohibited from using our services under applicable law</li>
              <li>Provide accurate, current, and complete information during registration and checkout</li>
            </ul>
          </section>

          <section id="account">
            <h2>3. Account Registration</h2>
            <p>When you create an account with us, you must provide accurate and complete information. You are responsible for maintaining the confidentiality of your account and password, restricting access to your device, and all activities that occur under your account. Notify us immediately of any unauthorized use of your account.</p>
          </section>

          <section id="products">
            <h2>4. Products and Pricing</h2>
            <h3>4.1 Product Descriptions</h3>
            <p>We strive to display our products as accurately as possible. However, we do not warrant that product descriptions, colors, images, or other content are entirely accurate. Colors may appear differently depending on your device's display settings.</p>
            <h3>4.2 Pricing</h3>
            <p>All prices are listed in the applicable currency and are subject to change without notice. In the event of a pricing error, we reserve the right to cancel any orders placed at the incorrect price.</p>
            <h3>4.3 Availability</h3>
            <p>All products are subject to availability. We reserve the right to discontinue any product at any time without liability.</p>
          </section>

          <section id="orders">
            <h2>5. Orders and Payment</h2>
            <h3>5.1 Order Acceptance</h3>
            <p>Your receipt of an order confirmation does not constitute acceptance of your order. We reserve the right to accept or decline your order for any reason, including product unavailability, pricing errors, or suspected fraud.</p>
            <h3>5.2 Payment Methods</h3>
            <p>We accept Visa, Mastercard, PayPal, Apple Pay, and Google Pay. By submitting an order, you represent that you are authorized to use the designated payment method.</p>
            <h3>5.3 Taxes</h3>
            <p>Prices displayed do not include applicable taxes unless otherwise stated. All applicable taxes will be calculated and displayed at checkout.</p>
          </section>

          <section id="shipping">
            <h2>6. Shipping and Delivery</h2>
            <p>We offer shipping to various locations worldwide. Shipping costs and estimated delivery times are calculated at checkout.</p>
            <ul>
              <li>Standard delivery: 5–10 business days</li>
              <li>Express delivery: 2–3 business days</li>
              <li>Next-day delivery: Available in select locations</li>
            </ul>
            <p>Delivery times are estimates only and are not guaranteed. We are not responsible for delays caused by customs, weather, or other circumstances beyond our control.</p>
          </section>

          <section id="returns">
            <h2>7. Returns and Refunds</h2>
            <h3>7.1 Return Policy</h3>
            <p>You may return most items within 30 days of delivery for a full refund, subject to the following conditions:</p>
            <ul>
              <li>Items must be unworn, unwashed, and in their original condition</li>
              <li>Items must have all original tags attached</li>
              <li>Sale items, underwear, swimwear, and pierced jewelry are final sale</li>
            </ul>
            <h3>7.2 Refund Process</h3>
            <p>Once we receive and inspect your returned item, we will process your refund within 5–10 business days to your original payment method. Original shipping charges are non-refundable unless the return is due to our error.</p>
          </section>

          <section id="intellectual-property">
            <h2>8. Intellectual Property</h2>
            <p>The SHOP.CO name, logo, website design, and all content are the exclusive property of SHOP.CO and are protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, or create derivative works without our written permission.</p>
          </section>

          <section id="conduct">
            <h2>9. User Conduct</h2>
            <p>When using our website, you agree not to:</p>
            <ul>
              <li>Violate any applicable laws or regulations</li>
              <li>Engage in fraudulent or deceptive activities</li>
              <li>Attempt unauthorized access to our systems or other users' accounts</li>
              <li>Transmit harmful, offensive, or disruptive content</li>
              <li>Use automated tools to scrape or extract data from our website</li>
            </ul>
          </section>

          <section id="privacy">
            <h2>10. Privacy Policy</h2>
            <p>Your use of SHOP.CO is also governed by our Privacy Policy, which is incorporated into these Terms by reference. By using our website, you consent to the collection and use of your information as described in our Privacy Policy.</p>
          </section>

          <section id="liability">
            <h2>11. Limitation of Liability</h2>
            <p>To the fullest extent permitted by applicable law, SHOP.CO and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, revenue, data, or business opportunities. Our total liability shall not exceed the amount you paid us in the twelve months preceding the claim.</p>
          </section>

          <section id="disclaimers">
            <h2>12. Disclaimer of Warranties</h2>
            <p>Our services are provided on an "as is" and "as available" basis without any warranties of any kind. We disclaim all warranties, including implied warranties of merchantability and fitness for a particular purpose.</p>
          </section>

          <section id="governing-law">
            <h2>13. Governing Law</h2>
            <p>These Terms shall be governed by the laws of the Federal Republic of Nigeria. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts located in Lagos, Nigeria.</p>
          </section>

          <section id="changes">
            <h2>14. Changes to Terms</h2>
            <p>We reserve the right to modify these Terms at any time. Your continued use of our services after any changes constitutes your acceptance of the new Terms. We encourage you to review these Terms periodically.</p>
          </section>

          <section id="contact">
            <h2>15. Contact Us</h2>
            <p>If you have any questions about these Terms and Conditions, please contact us:</p>
            <div class="contact-box">
              <p><strong>SHOP.CO Customer Support</strong></p>
              <p>44 Commercial Avenue, Sabo-Yaba, Lagos, Nigeria</p>
              <p>Email: <a href="mailto:obialodaniel16@gmail.com">obialodaniel16@gmail.com</a></p>
              <p>Phone: +234 8100 7926 98</p>
              <p>Hours: Monday – Friday, 9:00 AM – 6:00 PM (WAT)</p>
            </div>
          </section>

          <p class="terms-footer">© 2000–{{ currentYear }} SHOP.CO. All Rights Reserved.</p>
        </article>

      </div>
    </main>

    <AppFooter />
  </div>
</template>

<script>
export default {
  name: 'TermsPage',

  data() {
    return {
      activeSection: 'introduction',
      currentYear: new Date().getFullYear(),
      sections: [
        { id: 'introduction',        title: '1. Introduction' },
        { id: 'eligibility',         title: '2. Eligibility' },
        { id: 'account',             title: '3. Account Registration' },
        { id: 'products',            title: '4. Products & Pricing' },
        { id: 'orders',              title: '5. Orders & Payment' },
        { id: 'shipping',            title: '6. Shipping & Delivery' },
        { id: 'returns',             title: '7. Returns & Refunds' },
        { id: 'intellectual-property', title: '8. Intellectual Property' },
        { id: 'conduct',             title: '9. User Conduct' },
        { id: 'privacy',             title: '10. Privacy Policy' },
        { id: 'liability',           title: '11. Limitation of Liability' },
        { id: 'disclaimers',         title: '12. Disclaimer of Warranties' },
        { id: 'governing-law',       title: '13. Governing Law' },
        { id: 'changes',             title: '14. Changes to Terms' },
        { id: 'contact',             title: '15. Contact Us' },
      ]
    }
  },

  mounted() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.activeSection = entry.target.id
          }
        })
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );

    document.querySelectorAll('.terms-content section').forEach(s => observer.observe(s))
    this._observer = observer
  },

  beforeUnmount() {
    if (this._observer) this._observer.disconnect()
  }
}
</script>

<style scoped>
.terms-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--color-bg-primary);
}

.container {
  max-width: var(--container-max-width);
  margin: 0 auto;
  padding: var(--space-lg);
  flex: 1;
}

/* Breadcrumb */
.breadcrumb { margin-bottom: var(--space-xl); }
.breadcrumb ol { display: flex; gap: var(--space-sm); list-style: none; padding: 0; margin: 0; font-size: var(--font-size-sm); color: var(--color-text-secondary); }
.breadcrumb li:not(:last-child)::after { content: '>'; margin-left: var(--space-sm); }
.breadcrumb a { color: var(--color-text-secondary); text-decoration: none; }
.breadcrumb a:hover { color: var(--color-text-primary); }
.breadcrumb .current { color: var(--color-text-primary); font-weight: var(--font-weight-medium); }

/* Layout */
.terms-layout {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 48px;
  align-items: start;
}

/* TOC */
.toc {
  position: sticky;
  top: 100px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 20px;
}

.toc-title {
  font-family: var(--font-secondary);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-bold);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-text-secondary);
  margin-bottom: 12px;
}

.toc ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.toc a {
  display: block;
  padding: 6px 10px;
  font-size: 13px;
  color: var(--color-text-secondary);
  text-decoration: none;
  border-radius: var(--radius-sm);
  transition: all 0.15s ease;
  line-height: 1.4;
}

.toc a:hover {
  color: var(--color-text-primary);
  background: var(--color-bg-secondary);
}

.toc a.active {
  color: var(--color-text-primary);
  font-weight: var(--font-weight-medium);
  background: var(--color-bg-secondary);
  border-left: 2px solid var(--color-text-primary);
}

/* Content */
.terms-header {
  margin-bottom: 40px;
  padding-bottom: 24px;
  border-bottom: 2px solid var(--color-text-primary);
}

.terms-title {
  font-family: var(--font-primary);
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin: 0 0 8px;
}

.terms-date {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin: 0;
}

.terms-content section {
  margin-bottom: 48px;
  scroll-margin-top: 100px;
}

.terms-content h2 {
  font-family: var(--font-primary);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin: 0 0 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--color-border);
}

.terms-content h3 {
  font-family: var(--font-secondary);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin: 20px 0 8px;
}

.terms-content p {
  font-family: var(--font-secondary);
  font-size: var(--font-size-base);
  color: rgba(0,0,0,0.7);
  line-height: 1.8;
  margin: 0 0 12px;
}

.terms-content ul {
  padding-left: 24px;
  margin: 12px 0;
}

.terms-content ul li {
  font-family: var(--font-secondary);
  font-size: var(--font-size-base);
  color: rgba(0,0,0,0.7);
  line-height: 1.8;
  margin-bottom: 6px;
}

.contact-box {
  background: var(--color-bg-secondary);
  border-radius: var(--radius-md);
  padding: 20px 24px;
  margin-top: 12px;
}

.contact-box p {
  margin-bottom: 6px;
}

.contact-box a {
  color: var(--color-text-primary);
  text-decoration: underline;
}

.terms-footer {
  margin-top: 48px;
  padding-top: 24px;
  border-top: 1px solid var(--color-border);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  text-align: center;
}

/* Responsive */
@media (max-width: 1024px) {
  .terms-layout {
    grid-template-columns: 180px 1fr;
    gap: 32px;
  }
}

@media (max-width: 768px) {
  .terms-layout {
    grid-template-columns: 1fr;
  }

  .toc {
    position: static;
    display: none; /* hide on mobile — too long */
  }

  .terms-title {
    font-size: var(--font-size-2xl);
  }
}
</style>

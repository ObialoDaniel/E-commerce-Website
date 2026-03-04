<template>
  <div class="privacy-page">
    <AppHeader />

    <main class="container">

      <nav class="breadcrumb" aria-label="Breadcrumb">
        <ol>
          <li><router-link to="/">Home</router-link></li>
          <li><span class="current">Privacy Policy</span></li>
        </ol>
      </nav>

      <div class="privacy-layout">

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
        <article class="privacy-content">
          <div class="privacy-header">
            <h1 class="privacy-title">Privacy Policy</h1>
            <p class="privacy-date">Last updated: January 1, {{ currentYear }}</p>
          </div>

          <section id="introduction">
            <h2>1. Introduction</h2>
            <p>SHOP.CO ("we," "our," or "us") is committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase from us. Please read this policy carefully. If you disagree with its terms, please discontinue use of our site.</p>
          </section>

          <section id="information-we-collect">
            <h2>2. Information We Collect</h2>
            <h3>2.1 Information You Provide Directly</h3>
            <p>We collect information you voluntarily provide when you:</p>
            <ul>
              <li>Register for an account (name, email address, password)</li>
              <li>Place an order (billing address, shipping address, payment information)</li>
              <li>Contact our customer support (name, email, message content)</li>
              <li>Subscribe to our newsletter (email address)</li>
              <li>Participate in promotions or surveys</li>
            </ul>
            <h3>2.2 Information Collected Automatically</h3>
            <p>When you visit our website, we automatically collect certain information, including:</p>
            <ul>
              <li>IP address and approximate location</li>
              <li>Browser type and version</li>
              <li>Device type and operating system</li>
              <li>Pages visited and time spent on each page</li>
              <li>Referring website or search terms</li>
              <li>Cookie identifiers and session data</li>
            </ul>
            <h3>2.3 Payment Information</h3>
            <p>We do not store your full payment card details on our servers. All payment transactions are processed through secure third-party payment processors (Visa, Mastercard, PayPal, Apple Pay, Google Pay) who are responsible for the security of your payment data.</p>
          </section>

          <section id="how-we-use">
            <h2>3. How We Use Your Information</h2>
            <p>We use the information we collect for the following purposes:</p>
            <ul>
              <li>To process and fulfill your orders and send related communications</li>
              <li>To create and manage your account</li>
              <li>To send transactional emails (order confirmations, shipping updates, receipts)</li>
              <li>To send promotional communications, if you have opted in</li>
              <li>To respond to your inquiries and provide customer support</li>
              <li>To improve our website, products, and services</li>
              <li>To detect and prevent fraud and unauthorized activity</li>
              <li>To comply with legal obligations</li>
              <li>To personalize your shopping experience and show relevant product recommendations</li>
            </ul>
          </section>

          <section id="how-we-share">
            <h2>4. How We Share Your Information</h2>
            <p>We do not sell, trade, or rent your personal information to third parties. We may share your information in the following limited circumstances:</p>
            <h3>4.1 Service Providers</h3>
            <p>We share information with trusted third-party vendors who assist us in operating our website, including payment processors, shipping carriers, email service providers, and analytics providers. These parties are bound by confidentiality agreements.</p>
            <h3>4.2 Legal Requirements</h3>
            <p>We may disclose your information if required by law or in response to valid requests by public authorities, such as a court or government agency.</p>
            <h3>4.3 Business Transfers</h3>
            <p>If SHOP.CO is involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction. We will notify you before your information is transferred.</p>
          </section>

          <section id="cookies">
            <h2>5. Cookies and Tracking Technologies</h2>
            <p>We use cookies and similar tracking technologies to enhance your experience. Cookies help us:</p>
            <ul>
              <li>Remember your preferences and shopping cart contents</li>
              <li>Understand how you use our website</li>
              <li>Deliver targeted advertisements</li>
              <li>Analyze website traffic and performance</li>
            </ul>
            <p>We use the following types of cookies:</p>
            <ul>
              <li><strong>Essential cookies</strong> — required for the website to function</li>
              <li><strong>Analytics cookies</strong> — help us understand visitor behavior</li>
              <li><strong>Marketing cookies</strong> — used to deliver relevant advertisements</li>
            </ul>
            <p>You can control cookie settings through your browser. However, disabling certain cookies may affect website functionality.</p>
          </section>

          <section id="data-retention">
            <h2>6. Data Retention</h2>
            <p>We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy:</p>
            <ul>
              <li>Account information — retained for 2 years after account deletion</li>
              <li>Order information — retained for 7 years for legal compliance</li>
              <li>Marketing preferences — retained until you unsubscribe</li>
              <li>Customer support communications — retained for 3 years</li>
            </ul>
          </section>

          <section id="your-rights">
            <h2>7. Your Rights and Choices</h2>
            <p>Depending on your location, you may have the following rights regarding your personal information:</p>
            <ul>
              <li><strong>Access</strong> — request a copy of the data we hold about you</li>
              <li><strong>Correction</strong> — request that we correct inaccurate data</li>
              <li><strong>Deletion</strong> — request that we delete your personal data</li>
              <li><strong>Portability</strong> — request your data in a machine-readable format</li>
              <li><strong>Objection</strong> — object to processing for certain purposes</li>
              <li><strong>Restriction</strong> — request that we restrict processing of your data</li>
            </ul>
            <p>To exercise any of these rights, please contact us at <a href="mailto:obialodaniel16@gmail.com">obialodaniel16@gmail.com</a>. We will respond within 30 days.</p>
          </section>

          <section id="marketing">
            <h2>8. Marketing Communications</h2>
            <p>You may opt out of receiving marketing emails at any time by clicking the "unsubscribe" link in any marketing email or by contacting us directly. You will continue to receive transactional emails related to your orders regardless of your marketing preferences.</p>
          </section>

          <section id="security">
            <h2>9. Data Security</h2>
            <p>We implement appropriate technical and organizational security measures to protect your information, including:</p>
            <ul>
              <li>SSL/TLS encryption for data transmission</li>
              <li>Secure storage of sensitive data</li>
              <li>Regular security assessments and audits</li>
              <li>Access controls limiting who can view your data</li>
            </ul>
            <p>However, no method of transmission over the internet is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.</p>
          </section>

          <section id="children">
            <h2>10. Children's Privacy</h2>
            <p>Our website is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe your child has provided us with personal information, please contact us immediately and we will remove that information.</p>
          </section>

          <section id="third-party">
            <h2>11. Third-Party Links</h2>
            <p>Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those websites. We encourage you to review the privacy policies of any third-party sites you visit.</p>
          </section>

          <section id="international">
            <h2>12. International Data Transfers</h2>
            <p>SHOP.CO is based in Nigeria. If you are accessing our website from outside Nigeria, your information may be transferred to, stored, and processed in Nigeria. By using our services, you consent to the transfer of your information to Nigeria and other countries where our service providers operate.</p>
          </section>

          <section id="changes">
            <h2>13. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will notify you of significant changes by posting a notice on our website or sending you an email. Your continued use of our website after any changes constitutes your acceptance of the updated policy.</p>
          </section>

          <section id="contact">
            <h2>14. Contact Us</h2>
            <p>If you have any questions or concerns about this Privacy Policy, please contact us:</p>
            <div class="contact-box">
              <p><strong>SHOP.CO — Privacy Team</strong></p>
              <p>44 Commercial Avenue, Sabo-Yaba, Lagos, Nigeria</p>
              <p>Email: <a href="mailto:obialodaniel16@gmail.com">obialodaniel16@gmail.com</a></p>
              <p>Phone: +234 8100 7926 98</p>
              <p>Hours: Monday – Friday, 9:00 AM – 6:00 PM (WAT)</p>
            </div>
          </section>

          <p class="privacy-footer">© 2000–{{ currentYear }} SHOP.CO. All Rights Reserved.</p>
        </article>

      </div>
    </main>

    <AppFooter />
  </div>
</template>

<script>
export default {
  name: 'PrivacyPage',

  data() {
    return {
      activeSection: 'introduction',
      currentYear: new Date().getFullYear(),
      sections: [
        { id: 'introduction',       title: '1. Introduction' },
        { id: 'information-we-collect', title: '2. Information We Collect' },
        { id: 'how-we-use',         title: '3. How We Use Your Information' },
        { id: 'how-we-share',       title: '4. How We Share Your Information' },
        { id: 'cookies',            title: '5. Cookies & Tracking' },
        { id: 'data-retention',     title: '6. Data Retention' },
        { id: 'your-rights',        title: '7. Your Rights & Choices' },
        { id: 'marketing',          title: '8. Marketing Communications' },
        { id: 'security',           title: '9. Data Security' },
        { id: 'children',           title: '10. Children\'s Privacy' },
        { id: 'third-party',        title: '11. Third-Party Links' },
        { id: 'international',      title: '12. International Transfers' },
        { id: 'changes',            title: '13. Changes to This Policy' },
        { id: 'contact',            title: '14. Contact Us' },
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

    document.querySelectorAll('.privacy-content section').forEach(s => observer.observe(s))
    this._observer = observer
  },

  beforeUnmount() {
    if (this._observer) this._observer.disconnect()
  }
}
</script>

<style scoped>
.privacy-page {
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
.privacy-layout {
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
.privacy-header {
  margin-bottom: 40px;
  padding-bottom: 24px;
  border-bottom: 2px solid var(--color-text-primary);
}

.privacy-title {
  font-family: var(--font-primary);
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin: 0 0 8px;
}

.privacy-date {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin: 0;
}

.privacy-content section {
  margin-bottom: 48px;
  scroll-margin-top: 100px;
}

.privacy-content h2 {
  font-family: var(--font-primary);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin: 0 0 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--color-border);
}

.privacy-content h3 {
  font-family: var(--font-secondary);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin: 20px 0 8px;
}

.privacy-content p {
  font-family: var(--font-secondary);
  font-size: var(--font-size-base);
  color: rgba(0,0,0,0.7);
  line-height: 1.8;
  margin: 0 0 12px;
}

.privacy-content ul {
  padding-left: 24px;
  margin: 12px 0;
}

.privacy-content ul li {
  font-family: var(--font-secondary);
  font-size: var(--font-size-base);
  color: rgba(0,0,0,0.7);
  line-height: 1.8;
  margin-bottom: 6px;
}

.privacy-content a {
  color: var(--color-text-primary);
  text-decoration: underline;
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

.privacy-footer {
  margin-top: 48px;
  padding-top: 24px;
  border-top: 1px solid var(--color-border);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  text-align: center;
}

/* Responsive */
@media (max-width: 1024px) {
  .privacy-layout {
    grid-template-columns: 180px 1fr;
    gap: 32px;
  }
}

@media (max-width: 768px) {
  .privacy-layout {
    grid-template-columns: 1fr;
  }

  .toc {
    position: static;
    display: none;
  }

  .privacy-title {
    font-size: var(--font-size-2xl);
  }
}
</style>

<template>
  <div class="contact-page">
    <AppHeader />

    <main class="container">

      <!-- Breadcrumb -->
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <ol>
          <li><router-link to="/">Home</router-link></li>
          <li><span class="current">Contact Us</span></li>
        </ol>
      </nav>

      <div class="contact-layout">

        <!-- ── Left: Info Panel ── -->
        <aside class="contact-info">
          <h1 class="info-title">Get in Touch</h1>
          <p class="info-subtitle">
            We'd love to hear from you. Send us a message and we'll get back to you as soon as possible.
          </p>

          <div class="info-items">
            <div class="info-item">
              <div class="info-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div>
                <p class="info-label">Our Location</p>
                <p class="info-value">44 Commercial Avenue, Sabo-Yaba, Lagos, Nigeria</p>
              </div>
            </div>

            <div class="info-item">
              <div class="info-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
                </svg>
              </div>
              <div>
                <p class="info-label">Phone Number</p>
                <p class="info-value">+234 8100 7926 98</p>
              </div>
            </div>

            <div class="info-item">
              <div class="info-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div>
                <p class="info-label">Email Address</p>
                <p class="info-value">obialodaniel16@gmail.com</p>
              </div>
            </div>

            <div class="info-item">
              <div class="info-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <div>
                <p class="info-label">Working Hours</p>
                <p class="info-value">Mon – Fri, 9:00 AM – 6:00 PM</p>
              </div>
            </div>
          </div>

          <!-- Social links -->
          <div class="social-links">
            <a href="https://x.com/Danyycodes" class="social-btn" aria-label="Twitter">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.741l7.73-8.835L1.254 2.25H8.08l4.26 5.633L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="https://www.facebook.com/danielobialo" class="social-btn" aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
              </svg>
            </a>
            <a href="https://www.instagram.com/danny_devp" class="social-btn" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
          </div>
        </aside>

        <!-- ── Right: Form ── -->
        <section class="contact-form-section">
          <div class="form-card">

            <!-- Success state -->
            <div v-if="submitted" class="success-state">
              <div class="success-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <h2 class="success-title">Message Sent!</h2>
              <p class="success-text">Thank you for reaching out. We'll get back to you within 24 hours.</p>
              <button @click="resetForm" class="btn-primary">Send Another Message</button>
            </div>

            <!-- Form -->
            <template v-else>
              <h2 class="form-title">Send Us a Message</h2>
              <p class="form-subtitle">Fill in the form below and we'll respond promptly.</p>

              <form action="https://formsubmit.co/obialodaniel16@gmail.com" method="POST" class="form" novalidate @submit="handleSubmit">
                <input type="hidden" name="_subject" value="New message from SHOP.CO Contact Form">
                <input type="hidden" name="_captcha" value="false">
                <input type="hidden" name="_next" value="https://e-commerce-website-seven-sepia.vercel.app/contact">
                <input type="hidden" name="_template" value="table">
                <div class="form-row">
                  <div class="form-group" :class="{ error: errors.firstName }">
                    <label class="form-label">First Name</label>
                    <input
                      v-model="form.firstName"
                      type="text"
                      class="form-input"
                      placeholder="John"
                      @blur="validateField('firstName')"
                      name="firstName"
                    >
                    <span v-if="errors.firstName" class="error-msg">{{ errors.firstName }}</span>
                  </div>
                  <div class="form-group" :class="{ error: errors.lastName }">
                    <label class="form-label">Last Name</label>
                    <input
                      v-model="form.lastName"
                      type="text"
                      class="form-input"
                      placeholder="Doe"
                      @blur="validateField('lastName')"
                      name="lastName"
                    >
                    <span v-if="errors.lastName" class="error-msg">{{ errors.lastName }}</span>
                  </div>
                </div>

                <!-- Email -->
                <div class="form-group" :class="{ error: errors.email }">
                  <label class="form-label">Email Address</label>
                  <input
                    v-model="form.email"
                    type="email"
                    class="form-input"
                    placeholder="john@example.com"
                    @blur="validateField('email')"
                    name="email"
                  >
                  <span v-if="errors.email" class="error-msg">{{ errors.email }}</span>
                </div>

                <!-- Phone -->
                <div class="form-group">
                  <label class="form-label">Phone Number <span class="optional">(Optional)</span></label>
                  <input
                    v-model="form.phone"
                    type="tel"
                    class="form-input"
                    placeholder="+1 (555) 000-0000"
                    name="phone"
                  >
                </div>

                <!-- Subject -->
                <div class="form-group" :class="{ error: errors.subject }">
                  <label class="form-label">Subject</label>
                  <div class="select-wrapper">
                    <select
                      v-model="form.subject"
                      class="form-input form-select"
                      name="subject"
                      @blur="validateField('subject')"
                    >
                      <option value="" disabled>Select a subject</option>
                      <option value="order">Order Inquiry</option>
                      <option value="return">Returns & Exchanges</option>
                      <option value="shipping">Shipping Issue</option>
                      <option value="product">Product Question</option>
                      <option value="other">Other</option>
                    </select>
                    <svg class="select-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                    </svg>
                  </div>
                  <span v-if="errors.subject" class="error-msg">{{ errors.subject }}</span>
                </div>

                <!-- Message -->
                <div class="form-group" :class="{ error: errors.message }">
                  <label class="form-label">Message</label>
                  <textarea
                    v-model="form.message"
                    class="form-input form-textarea"
                    name="message"
                    placeholder="Tell us how we can help you..."
                    rows="5"
                    @blur="validateField('message')"
                  ></textarea>
                  <div class="char-count" :class="{ warning: form.message.length > 450 }">
                    {{ form.message.length }}/500
                  </div>
                  <span v-if="errors.message" class="error-msg">{{ errors.message }}</span>
                </div>

                <!-- Submit -->
                <button type="submit" class="btn-primary submit-btn" :disabled="isSubmitting">
                  <span v-if="isSubmitting" class="spinner"></span>
                  <span>{{ isSubmitting ? 'Sending...' : 'Send Message' }}</span>
                </button>

              </form>
            </template>
          </div>
        </section>

      </div>
    </main>

    <AppFooter />
  </div>
</template>

<script>
export default {
  name: 'ContactPage',

  data() {
    return {
      submitted: false,
      isSubmitting: false,
      form: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      },
      errors: {
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: '',
      }
    }
  },

  methods: {
    validateField(field) {
      this.errors[field] = ''

      if (field === 'firstName' && !this.form.firstName.trim()) {
        this.errors.firstName = 'First name is required.'
      }
      if (field === 'lastName' && !this.form.lastName.trim()) {
        this.errors.lastName = 'Last name is required.'
      }
      if (field === 'email') {
        if (!this.form.email.trim()) {
          this.errors.email = 'Email address is required.'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.email)) {
          this.errors.email = 'Please enter a valid email address.'
        }
      }
      if (field === 'subject' && !this.form.subject) {
        this.errors.subject = 'Please select a subject.'
      }
      if (field === 'message') {
        if (!this.form.message.trim()) {
          this.errors.message = 'Message is required.'
        } else if (this.form.message.length > 500) {
          this.errors.message = 'Message cannot exceed 500 characters.'
        }
      }
    },

    validateAll() {
      ['firstName', 'lastName', 'email', 'subject', 'message'].forEach(f => this.validateField(f))
      return !Object.values(this.errors).some(e => e)
    },

   handleSubmit(e) {
      if (!this.validateAll()) {
        e.preventDefault()
        return
      }
      this.isSubmitting = true
    },

    resetForm() {
      this.submitted = false
      this.form = { firstName: '', lastName: '', email: '', phone: '', subject: '', message: '' }
      this.errors = { firstName: '', lastName: '', email: '', subject: '', message: '' }
    }
  }
}
</script>

<style scoped>
.contact-page {
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
.breadcrumb ol {
  display: flex;
  gap: var(--space-sm);
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}
.breadcrumb li:not(:last-child)::after { content: '>'; margin-left: var(--space-sm); }
.breadcrumb a { color: var(--color-text-secondary); text-decoration: none; transition: color var(--transition-fast); }
.breadcrumb a:hover { color: var(--color-text-primary); }
.breadcrumb .current { color: var(--color-text-primary); font-weight: var(--font-weight-medium); }

/* Layout */
.contact-layout {
  display: grid;
  grid-template-columns: 380px 1fr;
  gap: var(--space-2xl);
  align-items: start;
}

/* ── Info Panel ── */
.contact-info {
  background: var(--color-text-primary);
  color: var(--color-bg-primary);
  border-radius: var(--radius-xl);
  padding: var(--space-2xl);
  position: sticky;
  top: var(--space-lg);
}

.info-title {
  font-family: var(--font-primary);
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--space-md);
  line-height: 1.2;
}

.info-subtitle {
  font-family: var(--font-secondary);
  font-size: var(--font-size-sm);
  opacity: 0.75;
  line-height: 1.6;
  margin-bottom: var(--space-2xl);
}

.info-items {
  display: flex;
  flex-direction: column;
  gap: var(--space-xl);
  margin-bottom: var(--space-2xl);
}

.info-item {
  display: flex;
  gap: var(--space-md);
  align-items: flex-start;
}

.info-icon {
  width: 40px;
  height: 40px;
  background: rgba(255,255,255,0.15);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.info-label {
  font-family: var(--font-secondary);
  font-size: var(--font-size-xs);
  opacity: 0.6;
  margin-bottom: 4px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.info-value {
  font-family: var(--font-secondary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  line-height: 1.4;
}

/* Social */
.social-links {
  display: flex;
  gap: var(--space-sm);
  padding-top: var(--space-xl);
  border-top: 1px solid rgba(255,255,255,0.15);
}

.social-btn {
  width: 38px;
  height: 38px;
  background: rgba(255,255,255,0.12);
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-decoration: none;
  transition: background var(--transition-fast);
}
.social-btn:hover { background: rgba(255,255,255,0.25); }

/* ── Form Card ── */
.form-card {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--space-2xl);
  background: var(--color-bg-primary);
}

.form-title {
  font-family: var(--font-primary);
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-xs);
}

.form-subtitle {
  font-family: var(--font-secondary);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-xl);
}

/* Form elements */
.form {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-md);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  position: relative;
}

.form-label {
  font-family: var(--font-secondary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
}

.optional {
  color: var(--color-text-secondary);
  font-weight: var(--font-weight-regular);
}

.form-input {
  width: 100%;
  padding: 14px var(--space-md);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-family: var(--font-secondary);
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
  background: var(--color-bg-primary);
  outline: none;
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
  box-sizing: border-box;
}

.form-input::placeholder { color: var(--color-text-muted); }

.form-input:focus {
  border-color: var(--color-text-primary);
  box-shadow: 0 0 0 3px rgba(0,0,0,0.06);
}

.form-group.error .form-input {
  border-color: #ff3333;
}

.form-group.error .form-input:focus {
  box-shadow: 0 0 0 3px rgba(255,51,51,0.08);
}

.error-msg {
  font-family: var(--font-secondary);
  font-size: var(--font-size-xs);
  color: #ff3333;
}

/* Select */
.select-wrapper {
  position: relative;
}

.form-select {
  appearance: none;
  cursor: pointer;
  padding-right: 40px;
}

.select-arrow {
  position: absolute;
  right: var(--space-md);
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: var(--color-text-secondary);
}

/* Textarea */
.form-textarea {
  resize: vertical;
  min-height: 120px;
  line-height: 1.6;
}

.char-count {
  font-family: var(--font-secondary);
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  text-align: right;
  margin-top: 2px;
}

.char-count.warning { color: #ff3333; }

/* Submit button */
.btn-primary {
  width: 100%;
  padding: 16px;
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

.btn-primary:hover:not(:disabled) { opacity: 0.88; }
.btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }

/* Spinner */
.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  flex-shrink: 0;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Success state */
.success-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: var(--space-3xl) var(--space-xl);
  gap: var(--space-md);
}

.success-icon {
  width: 64px;
  height: 64px;
  background: var(--color-text-primary);
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--space-sm);
}

.success-title {
  font-family: var(--font-primary);
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
}

.success-text {
  font-family: var(--font-secondary);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: 1.6;
  max-width: 320px;
}

.success-state .btn-primary {
  width: auto;
  padding: 14px var(--space-2xl);
  margin-top: var(--space-sm);
}

/* ── Responsive ── */
@media (max-width: 1024px) {
  .contact-layout {
    grid-template-columns: 1fr;
  }

  .contact-info {
    position: static;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 16px;
  }

  .contact-layout {
    gap: var(--space-xl);
  }

  .info-title {
    font-size: var(--font-size-2xl);
  }

  .form-card {
    padding: var(--space-xl);
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .form-title {
    font-size: var(--font-size-xl);
  }
}

@media (max-width: 480px) {
  .form-card {
    padding: var(--space-lg);
    border-radius: var(--radius-lg);
  }

  .contact-info {
    border-radius: var(--radius-lg);
    padding: var(--space-xl);
  }
}
</style>

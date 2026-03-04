<template>
  <div class="register-page">

    <div class="split-layout">

      <!-- Left: Image Panel -->
      <div class="image-panel">
        <div
          v-for="(img, index) in slides"
          :key="index"
          class="slide"
          :class="{ active: currentSlide === index }"
          :style="{ backgroundImage: `url(${img})` }"
        ></div>
        <div class="image-overlay"></div>
        <div class="image-content">
          <!-- rest stays the same -->
        </div>
      </div>

      <!-- Right: Form Panel -->
      <div class="form-panel">
        <div class="form-container">

          <!-- Mobile Logo -->
          <router-link to="/" class="mobile-logo">SHOP.CO</router-link>

          <div class="form-header">
            <h1 class="form-title">Create account</h1>
            <p class="form-subtitle">Already have an account? <router-link to="/login" class="link">Sign in</router-link></p>
          </div>

          <!-- Google Button -->
          <button class="google-btn" @click="handleGoogle" type="button">
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <div class="divider">
            <span>or</span>
          </div>

          <!-- Form -->
          <form @submit.prevent="handleSubmit" novalidate>

            <!-- Name Row -->
            <div class="form-row">
              <div class="form-group" :class="{ error: errors.firstName }">
                <label class="form-label">First Name</label>
                <input
                  v-model="form.firstName"
                  type="text"
                  class="form-input"
                  placeholder="John"
                  @blur="validateField('firstName')"
                />
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
                />
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
              />
              <span v-if="errors.email" class="error-msg">{{ errors.email }}</span>
            </div>

            <!-- Password -->
            <div class="form-group" :class="{ error: errors.password }">
              <label class="form-label">Password</label>
              <div class="input-wrapper">
                <input
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  class="form-input"
                  placeholder="Min. 8 characters"
                  @blur="validateField('password')"
                />
                <button type="button" class="toggle-pw" @click="showPassword = !showPassword">
                  <svg v-if="showPassword" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
                    <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                  <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                </button>
              </div>
              <span v-if="errors.password" class="error-msg">{{ errors.password }}</span>
              <!-- Password strength -->
              <div v-if="form.password.length > 0" class="password-strength">
                <div class="strength-bars">
                  <div class="bar" :class="strengthClass(1)"></div>
                  <div class="bar" :class="strengthClass(2)"></div>
                  <div class="bar" :class="strengthClass(3)"></div>
                  <div class="bar" :class="strengthClass(4)"></div>
                </div>
                <span class="strength-label">{{ strengthLabel }}</span>
              </div>
            </div>

            <!-- Confirm Password -->
            <div class="form-group" :class="{ error: errors.confirmPassword }">
              <label class="form-label">Confirm Password</label>
              <div class="input-wrapper">
                <input
                  v-model="form.confirmPassword"
                  :type="showConfirm ? 'text' : 'password'"
                  class="form-input"
                  placeholder="Re-enter your password"
                  @blur="validateField('confirmPassword')"
                />
                <button type="button" class="toggle-pw" @click="showConfirm = !showConfirm">
                  <svg v-if="showConfirm" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
                    <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                  <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                </button>
              </div>
              <span v-if="errors.confirmPassword" class="error-msg">{{ errors.confirmPassword }}</span>
            </div>

            <!-- Terms Checkbox -->
            <div class="form-group checkbox-group" :class="{ error: errors.terms }">
              <label class="checkbox-label">
                <input type="checkbox" v-model="form.terms" class="checkbox-input" @change="validateField('terms')" />
                <span class="checkbox-custom"></span>
                <span class="checkbox-text">
                  I agree to the
                  <router-link to="/terms" class="link">Terms & Conditions</router-link>
                  and
                  <router-link to="/privacy" class="link">Privacy Policy</router-link>
                </span>
              </label>
              <span v-if="errors.terms" class="error-msg">{{ errors.terms }}</span>
            </div>

            <!-- Submit -->
            <button type="submit" class="btn-primary" :disabled="isSubmitting">
              <span v-if="isSubmitting" class="spinner"></span>
              <span>{{ isSubmitting ? 'Creating account...' : 'Create Account' }}</span>
            </button>

          </form>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterPage',

  data() {
    return {
      showPassword: false,
      showConfirm: false,
      isSubmitting: false,
      form: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        terms: false,
      },
      errors: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        terms: '',
      },
      currentSlide: 0,
      slides: [
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
        'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80',
        'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80',
        'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80',
      ],
      slideTimer: null,
    }
  },
  mounted() {
      this.slideTimer = setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length
    }, 4000)
  },

  beforeUnmount() {
    clearInterval(this.slideTimer)
  },

  computed: {
    passwordStrength() {
      const pw = this.form.password
      let score = 0
      if (pw.length >= 8) score++
      if (/[A-Z]/.test(pw)) score++
      if (/[0-9]/.test(pw)) score++
      if (/[^A-Za-z0-9]/.test(pw)) score++
      return score
    },
    strengthLabel() {
      const labels = ['', 'Weak', 'Fair', 'Good', 'Strong']
      return labels[this.passwordStrength]
    }
  },

  methods: {
    strengthClass(level) {
      const s = this.passwordStrength
      if (s === 0) return ''
      if (s >= level) {
        if (s === 1) return 'weak'
        if (s === 2) return 'fair'
        if (s === 3) return 'good'
        return 'strong'
      }
      return ''
    },

    validateField(field) {
      this.errors[field] = ''
      if (field === 'firstName' && !this.form.firstName.trim())
        this.errors.firstName = 'First name is required.'
      if (field === 'lastName' && !this.form.lastName.trim())
        this.errors.lastName = 'Last name is required.'
      if (field === 'email') {
        if (!this.form.email.trim()) this.errors.email = 'Email is required.'
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.email))
          this.errors.email = 'Please enter a valid email address.'
      }
      if (field === 'password') {
        if (!this.form.password) this.errors.password = 'Password is required.'
        else if (this.form.password.length < 8)
          this.errors.password = 'Password must be at least 8 characters.'
      }
      if (field === 'confirmPassword') {
        if (!this.form.confirmPassword) this.errors.confirmPassword = 'Please confirm your password.'
        else if (this.form.confirmPassword !== this.form.password)
          this.errors.confirmPassword = 'Passwords do not match.'
      }
      if (field === 'terms' && !this.form.terms)
        this.errors.terms = 'You must agree to the terms to continue.'
    },

    validateAll() {
      ['firstName', 'lastName', 'email', 'password', 'confirmPassword', 'terms']
        .forEach(f => this.validateField(f))
      return !Object.values(this.errors).some(e => e)
    },

    async handleSubmit() {
      if (!this.validateAll()) return
      this.isSubmitting = true
      await new Promise(r => setTimeout(r, 1500))
      this.isSubmitting = false
      // TODO: connect to your auth service
      this.$router.push('/')
    },

    handleGoogle() {
      // TODO: connect to Google OAuth
      console.log('Google sign up')
    }
  }
}
</script>

<style scoped>
.register-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-secondary);
  padding: 40px 24px;
}

/* ── Split Layout ── */

.split-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  max-width: 960px;
  min-height: 600px;
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
}

/* ── Image Panel ── */
.image-panel {
  position: relative;
  background: #000;
  background-image: url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80');
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 40px;
  overflow: hidden;
}

.image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(160deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.8) 100%);
}

.image-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.panel-logo {
  font-family: var(--font-primary);
  font-size: 24px;
  font-weight: var(--font-weight-bold);
  color: #fff;
  text-decoration: none;
  letter-spacing: 0.02em;
}

.panel-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px 0;
}

.panel-heading {
  font-family: var(--font-primary);
  font-size: clamp(36px, 4vw, 56px);
  font-weight: var(--font-weight-bold);
  color: #fff;
  line-height: 1.1;
  margin: 0 0 16px;
}

.panel-sub {
  font-family: var(--font-secondary);
  font-size: 16px;
  color: rgba(255,255,255,0.7);
  line-height: 1.6;
  max-width: 320px;
  margin: 0;
}

.panel-stats {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 24px 0 0;
  border-top: 1px solid rgba(255,255,255,0.2);
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.stat-number {
  font-family: var(--font-primary);
  font-size: 20px;
  font-weight: var(--font-weight-bold);
  color: #fff;
}

.stat-label {
  font-family: var(--font-secondary);
  font-size: 12px;
  color: rgba(255,255,255,0.6);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.stat-divider {
  width: 1px;
  height: 32px;
  background: rgba(255,255,255,0.2);
}

/* ── Form Panel ── */
.form-panel {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 32px;
  background: var(--color-bg-primary);
  overflow-y: auto;
}

.form-container {
  width: 100%;
  max-width: 380px;
  background: none;
  border: none;
  border-radius: 0;
  padding: 0;
  box-shadow: none;
}

.mobile-logo {
  display: none;
  font-family: var(--font-primary);
  font-size: 22px;
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  text-decoration: none;
  margin-bottom: 32px;
}

.form-header {
  margin-bottom: 28px;
}

.form-title {
  font-family: var(--font-primary);
  font-size: 32px;
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin: 0 0 8px;
}

.form-subtitle {
  font-family: var(--font-secondary);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin: 0;
}

.link {
  color: var(--color-text-primary);
  font-weight: var(--font-weight-medium);
  text-decoration: underline;
}

/* Google Button */
.google-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 14px;
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-full);
  background: #fff;
  font-family: var(--font-secondary);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
  cursor: pointer;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.google-btn:hover {
  border-color: #000;
  box-shadow: 0 0 0 3px rgba(0,0,0,0.06);
}

/* Divider */
.divider {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 20px 0;
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
  font-family: var(--font-secondary);
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--color-border);
}

/* Form */
form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-label {
  font-family: var(--font-secondary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
}

.input-wrapper {
  position: relative;
}

.toggle-pw {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-text-muted);
  display: flex;
  align-items: center;
  padding: 0;
  transition: color 0.15s;
}

.toggle-pw:hover { color: var(--color-text-primary); }

.form-input {
  width: 100%;
  padding: 13px 16px;
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

.input-wrapper .form-input {
  padding-right: 44px;
}

.form-input::placeholder { color: var(--color-text-muted); }

.form-input:focus {
  border-color: var(--color-text-primary);
  box-shadow: 0 0 0 3px rgba(0,0,0,0.06);
}

.form-group.error .form-input {
  border-color: #ff3333;
}

.error-msg {
  font-size: 12px;
  color: #ff3333;
  font-family: var(--font-secondary);
}

/* Password Strength */
.password-strength {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 4px;
}

.strength-bars {
  display: flex;
  gap: 4px;
  flex: 1;
}

.bar {
  height: 4px;
  flex: 1;
  border-radius: 2px;
  background: var(--color-border);
  transition: background 0.3s;
}

.bar.weak   { background: #ff3333; }
.bar.fair   { background: #ff9500; }
.bar.good   { background: #34c759; }
.bar.strong { background: #00b341; }

.strength-label {
  font-size: 11px;
  font-family: var(--font-secondary);
  color: var(--color-text-secondary);
  min-width: 36px;
}

/* Checkbox */
.checkbox-group { gap: 4px; }

.checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  cursor: pointer;
}

.checkbox-input {
  display: none;
}

.checkbox-custom {
  width: 18px;
  height: 18px;
  border: 1.5px solid var(--color-border);
  border-radius: 4px;
  flex-shrink: 0;
  margin-top: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s;
  background: #fff;
}

.checkbox-input:checked + .checkbox-custom {
  background: var(--color-text-primary);
  border-color: var(--color-text-primary);
}

.checkbox-input:checked + .checkbox-custom::after {
  content: '';
  width: 10px;
  height: 6px;
  border-left: 2px solid #fff;
  border-bottom: 2px solid #fff;
  transform: rotate(-45deg) translateY(-1px);
}

.checkbox-text {
  font-family: var(--font-secondary);
  font-size: 13px;
  color: var(--color-text-secondary);
  line-height: 1.5;
}

/* Submit */
.btn-primary {
  width: 100%;
  padding: 15px;
  background: var(--color-text-primary);
  color: var(--color-bg-primary);
  border: none;
  border-radius: var(--radius-full);
  font-family: var(--font-secondary);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: opacity 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 4px;
}

.btn-primary:hover:not(:disabled) { opacity: 0.88; }
.btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  flex-shrink: 0;
}

.slide {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  opacity: 0;
  transition: opacity 1.2s ease-in-out;
}

.slide.active {
  opacity: 1;
}

@keyframes spin { to { transform: rotate(360deg); } }

/* ── Responsive ── */
@media (max-width: 1024px) {
  .split-layout {
    grid-template-columns: 1fr;
  }

  .image-panel {
    display: none;
  }

  .mobile-logo {
    display: block;
  }

  .form-panel {
    min-height: 100vh;
    padding: 40px 24px;
  }
}

@media (max-width: 480px) {
  .form-row {
    grid-template-columns: 1fr;
  }

  .form-title {
    font-size: 26px;
  }
}
</style>

<template>
  <div class="login-page">
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
          <router-link to="/" class="panel-logo">SHOP.CO</router-link>
          <div class="panel-text">
            <h2 class="panel-heading">Welcome<br>back.</h2>
            <p class="panel-sub">Sign in to access your orders, wishlist, and personalized recommendations.</p>
          </div>
          <div class="panel-stats">
            <div class="stat">
              <span class="stat-number">200+</span>
              <span class="stat-label">Brands</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat">
              <span class="stat-number">2,000+</span>
              <span class="stat-label">Products</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat">
              <span class="stat-number">30,000+</span>
              <span class="stat-label">Customers</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: Form Panel -->
      <div class="form-panel">
        <div class="form-container">

          <!-- Mobile Logo -->
          <router-link to="/" class="mobile-logo">SHOP.CO</router-link>

          <div class="form-header">
            <h1 class="form-title">Sign in</h1>
            <p class="form-subtitle">Don't have an account? <router-link to="/SignUp" class="link">Create one</router-link></p>
          </div>

          <!-- Form -->
          <form @submit.prevent="handleSubmit" novalidate>

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
              <div class="label-row">
                <label class="form-label">Password</label>
                <router-link to="/forgot-password" class="forgot-link">Forgot password?</router-link>
              </div>
              <div class="input-wrapper">
                <input
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  class="form-input"
                  placeholder="Enter your password"
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
            </div>

            <!-- Remember Me -->
            <div class="form-group checkbox-group">
              <label class="checkbox-label">
                <input type="checkbox" v-model="form.rememberMe" class="checkbox-input" />
                <span class="checkbox-custom"></span>
                <span class="checkbox-text">Remember me for 30 days</span>
              </label>
            </div>

            <!-- Server Error -->
            <div v-if="serverError" class="server-error">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              {{ serverError }}
            </div>

            <!-- Submit -->
            <button type="submit" class="btn-primary" :disabled="isSubmitting">
              <span v-if="isSubmitting" class="spinner"></span>
              <span>{{ isSubmitting ? 'Signing in...' : 'Sign In' }}</span>
            </button>

            <div class="divider"><span>or</span></div>

            <p class="form-subtitle" style="text-align:center">
              New to SHOP.CO? <router-link to="/SignUp" class="link">Create an account</router-link>
            </p>

          </form>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { useToast } from '@/composables/useToast'

export default {
  name: 'LoginPage',

  setup() {
    const { success, error } = useToast()
    return { success, error }
  },

  data() {
    return {
      showPassword: false,
      isSubmitting: false,
      serverError: '',
      form: {
        email: '',
        password: '',
        rememberMe: false,
      },
      errors: {
        email: '',
        password: '',
      },
      currentSlide: 0,
      slides: [
        'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80',
        'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80',
        'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80',
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
      ],
      slideTimer: null,
    }
  },

  mounted() {
    this.slideTimer = setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length
    }, 4000)

    // Pre-fill email if remembered
    const saved = localStorage.getItem('rememberedEmail')
    if (saved) {
      this.form.email = saved
      this.form.rememberMe = true
    }
  },

  beforeUnmount() {
    clearInterval(this.slideTimer)
  },

  methods: {
    validateField(field) {
      this.errors[field] = ''
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
    },

    validateAll() {
      ['email', 'password'].forEach(f => this.validateField(f))
      return !Object.values(this.errors).some(e => e)
    },

    async handleSubmit() {
      this.serverError = ''
      if (!this.validateAll()) return
      this.isSubmitting = true

      try {
        // TODO: replace with your real auth endpoint
        await new Promise(r => setTimeout(r, 1500))

        // const res = await fetch('/api/auth/login', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ email: this.form.email, password: this.form.password })
        // })
        // const data = await res.json()
        // if (!res.ok) { this.serverError = data.message; return }
        // localStorage.setItem('token', data.token)
        // localStorage.setItem('user', JSON.stringify(data.user))

        if (this.form.rememberMe) {
          localStorage.setItem('rememberedEmail', this.form.email)
        } else {
          localStorage.removeItem('rememberedEmail')
        }

        this.success('Welcome Back!')
        this.$router.push('/')

      } catch  {
        this.serverError = 'Something went wrong. Please try again.'
      } finally {
        this.isSubmitting = false
      }
    }
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-secondary);
  padding: 40px 24px;
}

.split-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  max-width: 960px;
  min-height: 580px;
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
}

/* Image Panel */
.image-panel {
  position: relative;
  background: #000;
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 40px;
  overflow: hidden;
}

.slide {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  opacity: 0;
  transition: opacity 1.2s ease-in-out;
}
.slide.active { opacity: 1; }

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

.stat { display: flex; flex-direction: column; gap: 2px; }
.stat-number { font-family: var(--font-primary); font-size: 20px; font-weight: var(--font-weight-bold); color: #fff; }
.stat-label { font-family: var(--font-secondary); font-size: 12px; color: rgba(255,255,255,0.6); text-transform: uppercase; letter-spacing: 0.06em; }
.stat-divider { width: 1px; height: 32px; background: rgba(255,255,255,0.2); }

/* Form Panel */
.form-panel {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 32px;
  background: var(--color-bg-primary);
  overflow-y: auto;
  min-height: 100%;
}

.form-container {
  width: 100%;
  max-width: 380px;
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

.form-header { margin-bottom: 28px; }

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

/* Form */
form { display: flex; flex-direction: column; gap: 16px; }

.form-group { display: flex; flex-direction: column; gap: 6px; }

.label-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.form-label {
  font-family: var(--font-secondary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
}

.forgot-link {
  font-family: var(--font-secondary);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  text-decoration: underline;
  transition: color 0.15s;
}
.forgot-link:hover { color: var(--color-text-primary); }

.input-wrapper { position: relative; }

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
.input-wrapper .form-input { padding-right: 44px; }
.form-input::placeholder { color: var(--color-text-muted); }
.form-input:focus { border-color: var(--color-text-primary); box-shadow: 0 0 0 3px rgba(0,0,0,0.06); }
.form-group.error .form-input { border-color: #ff3333; }

.error-msg { font-size: 12px; color: #ff3333; font-family: var(--font-secondary); }

/* Server error */
.server-error {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: rgba(255, 51, 51, 0.06);
  border: 1px solid rgba(255, 51, 51, 0.2);
  border-radius: var(--radius-md);
  font-family: var(--font-secondary);
  font-size: var(--font-size-sm);
  color: #ff3333;
}

/* Checkbox */
.checkbox-group { gap: 4px; }
.checkbox-label { display: flex; align-items: center; gap: 10px; cursor: pointer; }
.checkbox-input { display: none; }
.checkbox-custom {
  width: 18px; height: 18px;
  border: 1.5px solid var(--color-border);
  border-radius: 4px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.15s; background: #fff;
}
.checkbox-input:checked + .checkbox-custom { background: var(--color-text-primary); border-color: var(--color-text-primary); }
.checkbox-input:checked + .checkbox-custom::after {
  content: ''; width: 10px; height: 6px;
  border-left: 2px solid #fff; border-bottom: 2px solid #fff;
  transform: rotate(-45deg) translateY(-1px);
}
.checkbox-text { font-family: var(--font-secondary); font-size: 13px; color: var(--color-text-secondary); }

/* Submit */
.btn-primary {
  width: 100%; padding: 15px;
  background: var(--color-text-primary);
  color: var(--color-bg-primary);
  border: none; border-radius: var(--radius-full);
  font-family: var(--font-secondary);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  cursor: pointer; transition: opacity 0.2s;
  display: flex; align-items: center; justify-content: center; gap: 8px;
  margin-top: 4px;
}
.btn-primary:hover:not(:disabled) { opacity: 0.88; }
.btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }

.spinner {
  width: 16px; height: 16px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: white; border-radius: 50%;
  animation: spin 0.7s linear infinite; flex-shrink: 0;
}
@keyframes spin { to { transform: rotate(360deg); } }

.divider {
  display: flex; align-items: center; gap: 12px;
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
  font-family: var(--font-secondary);
}
.divider::before, .divider::after { content: ''; flex: 1; height: 1px; background: var(--color-border); }

/* Responsive */
@media (max-width: 1024px) {
  .split-layout { grid-template-columns: 1fr; }
  .image-panel { display: none; }
  .mobile-logo { display: block; }
  .form-panel { min-height: 100vh; padding: 40px 24px; }
}

@media (max-width: 480px) {
  .form-title { font-size: 26px; }
}
</style>

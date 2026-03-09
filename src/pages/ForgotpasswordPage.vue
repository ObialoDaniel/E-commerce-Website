<template>
  <div class="forgot-page">
    <div class="card">

      <!-- Logo -->
      <router-link to="/" class="logo">SHOP.CO</router-link>

      <!-- Step 1: Enter Email -->
      <template v-if="!submitted">
        <div class="card-header">
          <div class="icon-wrap">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <path d="M2 7l10 7 10-7"/>
            </svg>
          </div>
          <h1 class="card-title">Forgot your password?</h1>
          <p class="card-subtitle">No worries — enter your email address and we'll send you a link to reset your password.</p>
        </div>

        <form @submit.prevent="handleSubmit" novalidate>
          <div class="form-group" :class="{ error: errors.email }">
            <label class="form-label">Email Address</label>
            <input
              v-model="form.email"
              type="email"
              class="form-input"
              placeholder="john@example.com"
              @blur="validateEmail"
              autofocus
            />
            <span v-if="errors.email" class="error-msg">{{ errors.email }}</span>
          </div>

          <button type="submit" class="btn-primary" :disabled="isSubmitting">
            <span v-if="isSubmitting" class="spinner"></span>
            <span>{{ isSubmitting ? 'Sending...' : 'Send Reset Link' }}</span>
          </button>
        </form>
      </template>

      <!-- Step 2: Success State -->
      <template v-else>
        <div class="success-state">
          <div class="check-wrap">
            <svg class="checkmark" viewBox="0 0 52 52">
              <circle class="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
              <path class="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
            </svg>
          </div>
          <h1 class="card-title">Check your inbox</h1>
          <p class="card-subtitle">
            We've sent a password reset link to <strong>{{ form.email }}</strong>. Check your spam folder if you don't see it within a few minutes.
          </p>

          <button class="btn-primary" @click="resend" :disabled="resendCooldown > 0">
            {{ resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend Email' }}
          </button>
        </div>
      </template>

      <!-- Back to Login -->
      <router-link to="/login" class="back-link">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <path d="M19 12H5M5 12L12 19M5 12L12 5"/>
        </svg>
        Back to Sign In
      </router-link>

    </div>
  </div>
</template>

<script>
export default {
  name: 'ForgotPasswordPage',

  data() {
    return {
      submitted: false,
      isSubmitting: false,
      resendCooldown: 0,
      resendTimer: null,
      form: {
        email: ''
      },
      errors: {
        email: ''
      }
    }
  },

  beforeUnmount() {
    clearInterval(this.resendTimer)
  },

  methods: {
    validateEmail() {
      this.errors.email = ''
      if (!this.form.email.trim()) {
        this.errors.email = 'Email is required.'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.email)) {
        this.errors.email = 'Please enter a valid email address.'
      }
    },

    async handleSubmit() {
      this.validateEmail()
      if (this.errors.email) return

      this.isSubmitting = true

      try {
        await new Promise(r => setTimeout(r, 1500))
        // TODO: connect to your backend
        // await fetch('/api/auth/forgot-password', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ email: this.form.email })
        // })

        this.submitted = true
        this.startResendCooldown()

      } catch {
        this.errors.email = 'Something went wrong. Please try again.'
      } finally {
        this.isSubmitting = false
      }
    },

    resend() {
      if (this.resendCooldown > 0) return
      this.handleSubmit()
    },

    startResendCooldown() {
      this.resendCooldown = 60
      this.resendTimer = setInterval(() => {
        this.resendCooldown--
        if (this.resendCooldown <= 0) {
          clearInterval(this.resendTimer)
        }
      }, 1000)
    }
  }
}
</script>

<style scoped>
.forgot-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-secondary);
  padding: 24px;
}

.card {
  width: 100%;
  max-width: 420px;
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: 40px 36px;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* Logo */
.logo {
  font-family: var(--font-primary);
  font-size: 22px;
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  text-decoration: none;
  text-align: center;
  display: block;
}

/* Header */
.card-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  text-align: center;
}

.icon-wrap {
  width: 56px;
  height: 56px;
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-primary);
}

.card-title {
  font-family: var(--font-primary);
  font-size: 24px;
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin: 0;
}

.card-subtitle {
  font-family: var(--font-secondary);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin: 0;
}

/* Form */
form {
  display: flex;
  flex-direction: column;
  gap: 16px;
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

.form-input::placeholder { color: var(--color-text-muted); }
.form-input:focus { border-color: var(--color-text-primary); box-shadow: 0 0 0 3px rgba(0,0,0,0.06); }
.form-group.error .form-input { border-color: #ff3333; }
.error-msg { font-size: 12px; color: #ff3333; font-family: var(--font-secondary); }

/* Button */
.btn-primary {
  width: 100%;
  padding: 14px;
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
}
@keyframes spin { to { transform: rotate(360deg); } }

/* Success State */
.success-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  text-align: center;
}

.check-wrap {
  width: 64px;
  height: 64px;
}

.checkmark {
  width: 64px;
  height: 64px;
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

@keyframes stroke { 100% { stroke-dashoffset: 0; } }

/* Back Link */
.back-link {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: var(--font-secondary);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: color 0.15s;
}
.back-link:hover { color: var(--color-text-primary); }

@media (max-width: 480px) {
  .card { padding: 32px 24px; }
  .card-title { font-size: 20px; }
}
</style>

<template>
  <div class="account-page">
    <main class="container">

      <!-- Page Header -->
      <div class="page-header">
        <div class="breadcrumb">
          <router-link to="/" class="breadcrumb-link">Home</router-link>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
          <span>My Account</span>
        </div>
        <div class="page-header-content">
          <div class="avatar">{{ initials }}</div>
          <div>
            <h1 class="page-title">{{ user.firstName }} {{ user.lastName }}</h1>
            <p class="page-subtitle">{{ user.email }}</p>
          </div>
        </div>
      </div>

      <div class="account-layout">

        <!-- Sidebar -->
        <aside class="sidebar">
          <nav class="sidebar-nav">
            <button
              v-for="item in navItems"
              :key="item.id"
              class="nav-item"
              :class="{ active: activeSection === item.id }"
              @click="activeSection = item.id"
            >
              <span v-html="item.icon"></span>
              {{ item.label }}
            </button>
          </nav>

          <div class="sidebar-divider"></div>

          <button class="logout-btn" @click="handleLogout">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Sign Out
          </button>
        </aside>

        <!-- Content Area -->
        <div class="content-area">

          <!-- ── Personal Info ── -->
          <div v-if="activeSection === 'personal'" class="content-card">
            <div class="card-header">
              <h2 class="card-title">Personal Information</h2>
              <button v-if="!editingPersonal" class="edit-btn" @click="startEditPersonal">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                Edit
              </button>
            </div>

            <!-- View Mode -->
            <div v-if="!editingPersonal" class="info-grid">
              <div class="info-item">
                <span class="info-label">First Name</span>
                <span class="info-value">{{ user.firstName }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Last Name</span>
                <span class="info-value">{{ user.lastName }}</span>
              </div>
              <div class="info-item full-width">
                <span class="info-label">Email Address</span>
                <span class="info-value">{{ user.email }}</span>
              </div>
              <div class="info-item full-width">
                <span class="info-label">Phone Number</span>
                <span class="info-value">{{ user.phone || '—' }}</span>
              </div>
              <div class="info-item full-width">
                <span class="info-label">Member Since</span>
                <span class="info-value">{{ user.memberSince }}</span>
              </div>
            </div>

            <!-- Edit Mode -->
            <form v-else @submit.prevent="savePersonal" novalidate>
              <div class="form-grid">
                <div class="form-group" :class="{ error: personalErrors.firstName }">
                  <label class="form-label">First Name</label>
                  <input v-model="personalForm.firstName" type="text" class="form-input" @blur="validatePersonal('firstName')" />
                  <span v-if="personalErrors.firstName" class="error-msg">{{ personalErrors.firstName }}</span>
                </div>
                <div class="form-group" :class="{ error: personalErrors.lastName }">
                  <label class="form-label">Last Name</label>
                  <input v-model="personalForm.lastName" type="text" class="form-input" @blur="validatePersonal('lastName')" />
                  <span v-if="personalErrors.lastName" class="error-msg">{{ personalErrors.lastName }}</span>
                </div>
                <div class="form-group full-width" :class="{ error: personalErrors.email }">
                  <label class="form-label">Email Address</label>
                  <input v-model="personalForm.email" type="email" class="form-input" @blur="validatePersonal('email')" />
                  <span v-if="personalErrors.email" class="error-msg">{{ personalErrors.email }}</span>
                </div>
                <div class="form-group full-width">
                  <label class="form-label">Phone Number</label>
                  <input v-model="personalForm.phone" type="tel" class="form-input" placeholder="+234 800 000 0000" />
                </div>
              </div>
              <div class="form-actions">
                <button type="button" class="btn-secondary" @click="cancelPersonal">Cancel</button>
                <button type="submit" class="btn-primary" :disabled="savingPersonal">
                  <span v-if="savingPersonal" class="spinner"></span>
                  {{ savingPersonal ? 'Saving...' : 'Save Changes' }}
                </button>
              </div>
            </form>

            <div v-if="personalSuccess" class="success-banner">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>
              Personal information updated successfully.
            </div>
          </div>

          <!-- ── Change Password ── -->
          <div v-if="activeSection === 'password'" class="content-card">
            <div class="card-header">
              <h2 class="card-title">Change Password</h2>
            </div>

            <form @submit.prevent="savePassword" novalidate>
              <div class="form-group" :class="{ error: passwordErrors.current }">
                <label class="form-label">Current Password</label>
                <div class="input-wrapper">
                  <input
                    v-model="passwordForm.current"
                    :type="showCurrentPw ? 'text' : 'password'"
                    class="form-input"
                    placeholder="Enter current password"
                    @blur="validatePassword('current')"
                  />
                  <button type="button" class="toggle-pw" @click="showCurrentPw = !showCurrentPw">
                    <svg v-if="showCurrentPw" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  </button>
                </div>
                <span v-if="passwordErrors.current" class="error-msg">{{ passwordErrors.current }}</span>
              </div>

              <div class="form-group" :class="{ error: passwordErrors.newPw }">
                <label class="form-label">New Password</label>
                <div class="input-wrapper">
                  <input
                    v-model="passwordForm.newPw"
                    :type="showNewPw ? 'text' : 'password'"
                    class="form-input"
                    placeholder="Min. 8 characters"
                    @blur="validatePassword('newPw')"
                  />
                  <button type="button" class="toggle-pw" @click="showNewPw = !showNewPw">
                    <svg v-if="showNewPw" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  </button>
                </div>
                <span v-if="passwordErrors.newPw" class="error-msg">{{ passwordErrors.newPw }}</span>

                <!-- Strength meter -->
                <div v-if="passwordForm.newPw.length > 0" class="password-strength">
                  <div class="strength-bars">
                    <div class="bar" :class="strengthClass(1)"></div>
                    <div class="bar" :class="strengthClass(2)"></div>
                    <div class="bar" :class="strengthClass(3)"></div>
                    <div class="bar" :class="strengthClass(4)"></div>
                  </div>
                  <span class="strength-label">{{ strengthLabel }}</span>
                </div>
              </div>

              <div class="form-group" :class="{ error: passwordErrors.confirm }">
                <label class="form-label">Confirm New Password</label>
                <div class="input-wrapper">
                  <input
                    v-model="passwordForm.confirm"
                    :type="showConfirmPw ? 'text' : 'password'"
                    class="form-input"
                    placeholder="Re-enter new password"
                    @blur="validatePassword('confirm')"
                  />
                  <button type="button" class="toggle-pw" @click="showConfirmPw = !showConfirmPw">
                    <svg v-if="showConfirmPw" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  </button>
                </div>
                <span v-if="passwordErrors.confirm" class="error-msg">{{ passwordErrors.confirm }}</span>
              </div>

              <div class="form-actions">
                <button type="submit" class="btn-primary" :disabled="savingPassword">
                  <span v-if="savingPassword" class="spinner"></span>
                  {{ savingPassword ? 'Updating...' : 'Update Password' }}
                </button>
              </div>
            </form>

            <div v-if="passwordSuccess" class="success-banner">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>
              Password updated successfully.
            </div>
          </div>

          <!-- ── Saved Addresses ── -->
          <div v-if="activeSection === 'addresses'" class="content-card">
            <div class="card-header">
              <h2 class="card-title">Saved Addresses</h2>
              <button class="edit-btn" @click="showAddressForm = !showAddressForm">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Add Address
              </button>
            </div>

            <!-- Address List -->
            <div v-if="addresses.length > 0" class="address-list">
              <div v-for="(addr, index) in addresses" :key="index" class="address-card" :class="{ default: addr.isDefault }">
                <div class="address-card-header">
                  <div class="address-type">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
                    {{ addr.label }}
                  </div>
                  <span v-if="addr.isDefault" class="default-badge">Default</span>
                </div>
                <p class="address-line">{{ addr.firstName }} {{ addr.lastName }}</p>
                <p class="address-line">{{ addr.address }}</p>
                <p class="address-line">{{ addr.city }}, {{ addr.state }} {{ addr.zip }}</p>
                <p class="address-line">{{ addr.country }}</p>
                <p class="address-line">{{ addr.phone }}</p>
                <div class="address-actions">
                  <button class="addr-action-btn" @click="setDefault(index)" :disabled="addr.isDefault">Set as Default</button>
                  <button class="addr-action-btn danger" @click="removeAddress(index)">Remove</button>
                </div>
              </div>
            </div>

            <div v-else-if="!showAddressForm" class="empty-state">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
              <p>No saved addresses yet.</p>
            </div>

            <!-- Add Address Form -->
            <div v-if="showAddressForm" class="address-form">
              <h3 class="address-form-title">New Address</h3>
              <div class="form-grid">
                <div class="form-group">
                  <label class="form-label">First Name</label>
                  <input v-model="newAddress.firstName" type="text" class="form-input" placeholder="John" />
                </div>
                <div class="form-group">
                  <label class="form-label">Last Name</label>
                  <input v-model="newAddress.lastName" type="text" class="form-input" placeholder="Doe" />
                </div>
                <div class="form-group full-width">
                  <label class="form-label">Label</label>
                  <select v-model="newAddress.label" class="form-input form-select">
                    <option value="Home">Home</option>
                    <option value="Work">Work</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div class="form-group full-width">
                  <label class="form-label">Street Address</label>
                  <input v-model="newAddress.address" type="text" class="form-input" placeholder="44 Commercial Avenue" />
                </div>
                <div class="form-group">
                  <label class="form-label">City</label>
                  <input v-model="newAddress.city" type="text" class="form-input" placeholder="Lagos" />
                </div>
                <div class="form-group">
                  <label class="form-label">State</label>
                  <input v-model="newAddress.state" type="text" class="form-input" placeholder="Lagos State" />
                </div>
                <div class="form-group">
                  <label class="form-label">ZIP Code</label>
                  <input v-model="newAddress.zip" type="text" class="form-input" placeholder="100001" />
                </div>
                <div class="form-group">
                  <label class="form-label">Country</label>
                  <select v-model="newAddress.country" class="form-input form-select">
                    <option>Nigeria</option>
                    <option>Ghana</option>
                    <option>Kenya</option>
                    <option>South Africa</option>
                    <option>United Kingdom</option>
                    <option>United States</option>
                  </select>
                </div>
                <div class="form-group full-width">
                  <label class="form-label">Phone</label>
                  <input v-model="newAddress.phone" type="tel" class="form-input" placeholder="+234 800 000 0000" />
                </div>
              </div>
              <div class="form-actions">
                <button type="button" class="btn-secondary" @click="showAddressForm = false">Cancel</button>
                <button type="button" class="btn-primary" @click="saveAddress">Save Address</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'AccountPage',

  data() {
    return {
      activeSection: 'personal',

      navItems: [
        {
          id: 'personal', label: 'Personal Info',
          icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`
        },
        {
          id: 'password', label: 'Change Password',
          icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>`
        },
        {
          id: 'addresses', label: 'Saved Addresses',
          icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>`
        },
      ],

      // User data — replace with data from localStorage/API
      user: {
        firstName: 'Daniel',
        lastName: 'Obialo',
        email: 'obialodaniel16@gmail.com',
        phone: '+234 810 079 2698',
        memberSince: 'March 2026',
      },

      // Personal Info
      editingPersonal: false,
      savingPersonal: false,
      personalSuccess: false,
      personalForm: {},
      personalErrors: { firstName: '', lastName: '', email: '' },

      // Password
      savingPassword: false,
      passwordSuccess: false,
      showCurrentPw: false,
      showNewPw: false,
      showConfirmPw: false,
      passwordForm: { current: '', newPw: '', confirm: '' },
      passwordErrors: { current: '', newPw: '', confirm: '' },

      // Addresses
      showAddressForm: false,
      addresses: [
        {
          label: 'Home',
          firstName: 'Daniel',
          lastName: 'Obialo',
          address: '44 Commercial Avenue',
          city: 'Lagos',
          state: 'Lagos State',
          zip: '100001',
          country: 'Nigeria',
          phone: '+234 810 079 2698',
          isDefault: true,
        }
      ],
      newAddress: {
        label: 'Home',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        country: 'Nigeria',
        phone: '',
        isDefault: false,
      },
    }
  },

  computed: {
    initials() {
      return `${this.user.firstName?.[0] || ''}${this.user.lastName?.[0] || ''}`.toUpperCase()
    },

    passwordStrength() {
      const pw = this.passwordForm.newPw
      let score = 0
      if (pw.length >= 8) score++
      if (/[A-Z]/.test(pw)) score++
      if (/[0-9]/.test(pw)) score++
      if (/[^A-Za-z0-9]/.test(pw)) score++
      return score
    },

    strengthLabel() {
      return ['', 'Weak', 'Fair', 'Good', 'Strong'][this.passwordStrength]
    }
  },

  methods: {
    // Personal Info
    startEditPersonal() {
      this.personalForm = { ...this.user }
      this.editingPersonal = true
      this.personalSuccess = false
    },

    cancelPersonal() {
      this.editingPersonal = false
      this.personalErrors = { firstName: '', lastName: '', email: '' }
    },

    validatePersonal(field) {
      this.personalErrors[field] = ''
      if (field === 'firstName' && !this.personalForm.firstName.trim())
        this.personalErrors.firstName = 'First name is required.'
      if (field === 'lastName' && !this.personalForm.lastName.trim())
        this.personalErrors.lastName = 'Last name is required.'
      if (field === 'email') {
        if (!this.personalForm.email.trim()) this.personalErrors.email = 'Email is required.'
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.personalForm.email))
          this.personalErrors.email = 'Enter a valid email.'
      }
    },

    async savePersonal() {
      ['firstName', 'lastName', 'email'].forEach(f => this.validatePersonal(f))
      if (Object.values(this.personalErrors).some(e => e)) return
      this.savingPersonal = true
      await new Promise(r => setTimeout(r, 1000))
      // TODO: PATCH /api/user/profile
      this.user = { ...this.user, ...this.personalForm }
      this.savingPersonal = false
      this.editingPersonal = false
      this.personalSuccess = true
      setTimeout(() => { this.personalSuccess = false }, 4000)
    },

    // Password
    validatePassword(field) {
      this.passwordErrors[field] = ''
      if (field === 'current' && !this.passwordForm.current)
        this.passwordErrors.current = 'Current password is required.'
      if (field === 'newPw') {
        if (!this.passwordForm.newPw) this.passwordErrors.newPw = 'New password is required.'
        else if (this.passwordForm.newPw.length < 8) this.passwordErrors.newPw = 'Must be at least 8 characters.'
      }
      if (field === 'confirm') {
        if (!this.passwordForm.confirm) this.passwordErrors.confirm = 'Please confirm your new password.'
        else if (this.passwordForm.confirm !== this.passwordForm.newPw)
          this.passwordErrors.confirm = 'Passwords do not match.'
      }
    },

    async savePassword() {
      ['current', 'newPw', 'confirm'].forEach(f => this.validatePassword(f))
      if (Object.values(this.passwordErrors).some(e => e)) return
      this.savingPassword = true
      await new Promise(r => setTimeout(r, 1000))
      // TODO: PATCH /api/user/password
      this.savingPassword = false
      this.passwordForm = { current: '', newPw: '', confirm: '' }
      this.passwordSuccess = true
      setTimeout(() => { this.passwordSuccess = false }, 4000)
    },

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

    // Addresses
    saveAddress() {
      this.addresses.push({ ...this.newAddress, isDefault: this.addresses.length === 0 })
      this.newAddress = { label: 'Home', firstName: '', lastName: '', address: '', city: '', state: '', zip: '', country: 'Nigeria', phone: '', isDefault: false }
      this.showAddressForm = false
    },

    removeAddress(index) {
      this.addresses.splice(index, 1)
    },

    setDefault(index) {
      this.addresses.forEach((a, i) => { a.isDefault = i === index })
    },

    // Logout
    handleLogout() {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      this.$router.push('/login')
    },
  }
}
</script>

<style scoped>
.account-page {
  min-height: 100vh;
  background: var(--color-bg-secondary);
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 32px var(--space-lg) 60px;
}

/* Page Header */
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-secondary);
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  margin-bottom: 20px;
}
.breadcrumb-link { color: var(--color-text-muted); text-decoration: none; }
.breadcrumb-link:hover { color: var(--color-text-primary); }
.breadcrumb span { color: var(--color-text-primary); }

.page-header-content {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
}

.avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--color-text-primary);
  color: var(--color-bg-primary);
  font-family: var(--font-primary);
  font-size: 20px;
  font-weight: var(--font-weight-bold);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.page-title {
  font-family: var(--font-primary);
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin: 0 0 4px;
}

.page-subtitle {
  font-family: var(--font-secondary);
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  margin: 0;
}

/* Layout */
.account-layout {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 24px;
  align-items: start;
}

/* Sidebar */
.sidebar {
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: 16px;
  position: sticky;
  top: 24px;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border: none;
  background: none;
  border-radius: var(--radius-md);
  font-family: var(--font-secondary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all 0.15s;
  text-align: left;
  width: 100%;
}

.nav-item:hover { background: var(--color-bg-secondary); color: var(--color-text-primary); }
.nav-item.active { background: var(--color-text-primary); color: var(--color-bg-primary); }

.sidebar-divider { height: 1px; background: var(--color-border); margin: 12px 0; }

.logout-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border: none;
  background: none;
  border-radius: var(--radius-md);
  font-family: var(--font-secondary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: #ff3333;
  cursor: pointer;
  transition: background 0.15s;
  width: 100%;
  text-align: left;
}
.logout-btn:hover { background: rgba(255, 51, 51, 0.06); }

/* Content Card */
.content-card {
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: 28px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.card-title {
  font-family: var(--font-primary);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin: 0;
}

.edit-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border: 1.5px solid var(--color-border);
  background: none;
  border-radius: var(--radius-full);
  font-family: var(--font-secondary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
  cursor: pointer;
  transition: all 0.15s;
}
.edit-btn:hover { background: var(--color-bg-secondary); border-color: var(--color-text-primary); }

/* Info Grid */
.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.info-item { display: flex; flex-direction: column; gap: 4px; }
.info-item.full-width { grid-column: 1 / -1; }

.info-label {
  font-family: var(--font-secondary);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-text-muted);
}

.info-value {
  font-family: var(--font-secondary);
  font-size: var(--font-size-base);
  color: var(--color-text-primary);
  font-weight: var(--font-weight-medium);
}

/* Form */
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 20px;
}

.form-group { display: flex; flex-direction: column; gap: 6px; }
.form-group.full-width { grid-column: 1 / -1; }

.form-label {
  font-family: var(--font-secondary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
}

.input-wrapper { position: relative; }

.toggle-pw {
  position: absolute; right: 14px; top: 50%; transform: translateY(-50%);
  background: none; border: none; cursor: pointer;
  color: var(--color-text-muted); display: flex; align-items: center; padding: 0;
  transition: color 0.15s;
}
.toggle-pw:hover { color: var(--color-text-primary); }

.form-input {
  width: 100%;
  padding: 12px 16px;
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
.form-input:focus { border-color: var(--color-text-primary); box-shadow: 0 0 0 3px rgba(0,0,0,0.06); }
.form-group.error .form-input { border-color: #ff3333; }
.form-select { cursor: pointer; appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4 6L8 10L12 6' stroke='%23000000' stroke-width='1.5'/%3E%3C/svg%3E");
  background-repeat: no-repeat; background-position: right 12px center;
}
.error-msg { font-size: 12px; color: #ff3333; font-family: var(--font-secondary); }

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 8px;
}

.btn-primary {
  padding: 12px 28px;
  background: var(--color-text-primary);
  color: var(--color-bg-primary);
  border: none; border-radius: var(--radius-full);
  font-family: var(--font-secondary); font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold); cursor: pointer;
  transition: opacity 0.2s;
  display: flex; align-items: center; gap: 8px;
}
.btn-primary:hover:not(:disabled) { opacity: 0.88; }
.btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }

.btn-secondary {
  padding: 12px 28px;
  background: transparent;
  color: var(--color-text-primary);
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-full);
  font-family: var(--font-secondary); font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium); cursor: pointer;
  transition: all 0.2s;
}
.btn-secondary:hover { border-color: var(--color-text-primary); background: var(--color-bg-secondary); }

.spinner {
  width: 14px; height: 14px;
  border: 2px solid rgba(255,255,255,0.3); border-top-color: white;
  border-radius: 50%; animation: spin 0.7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* Password Strength */
.password-strength { display: flex; align-items: center; gap: 10px; margin-top: 6px; }
.strength-bars { display: flex; gap: 4px; flex: 1; }
.bar { height: 4px; flex: 1; border-radius: 2px; background: var(--color-border); transition: background 0.3s; }
.bar.weak   { background: #ff3333; }
.bar.fair   { background: #ff9500; }
.bar.good   { background: #34c759; }
.bar.strong { background: #00b341; }
.strength-label { font-size: 11px; font-family: var(--font-secondary); color: var(--color-text-secondary); min-width: 36px; }

/* Success Banner */
.success-banner {
  display: flex; align-items: center; gap: 8px;
  margin-top: 20px; padding: 12px 16px;
  background: rgba(0, 179, 65, 0.08);
  border: 1px solid rgba(0, 179, 65, 0.2);
  border-radius: var(--radius-md);
  font-family: var(--font-secondary); font-size: var(--font-size-sm);
  color: #00b341;
}

/* Addresses */
.address-list { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px; }

.address-card {
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 16px;
  transition: border-color 0.15s;
}
.address-card.default { border-color: var(--color-text-primary); }

.address-card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }

.address-type {
  display: flex; align-items: center; gap: 6px;
  font-family: var(--font-secondary); font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold); color: var(--color-text-primary);
}

.default-badge {
  font-family: var(--font-secondary); font-size: 11px;
  font-weight: var(--font-weight-semibold);
  background: var(--color-text-primary); color: var(--color-bg-primary);
  padding: 2px 8px; border-radius: var(--radius-full);
}

.address-line { font-family: var(--font-secondary); font-size: 13px; color: var(--color-text-secondary); margin: 0 0 2px; }

.address-actions { display: flex; gap: 8px; margin-top: 12px; padding-top: 12px; border-top: 1px solid var(--color-border); }

.addr-action-btn {
  font-family: var(--font-secondary); font-size: 12px;
  font-weight: var(--font-weight-medium);
  background: none; border: 1px solid var(--color-border);
  border-radius: var(--radius-full); padding: 4px 12px;
  cursor: pointer; color: var(--color-text-secondary); transition: all 0.15s;
}
.addr-action-btn:hover:not(:disabled) { border-color: var(--color-text-primary); color: var(--color-text-primary); }
.addr-action-btn:disabled { opacity: 0.4; cursor: not-allowed; }
.addr-action-btn.danger { color: #ff3333; }
.addr-action-btn.danger:hover { border-color: #ff3333; color: #ff3333; }

.address-form {
  border-top: 1px solid var(--color-border);
  padding-top: 20px;
  margin-top: 8px;
}
.address-form-title { font-family: var(--font-primary); font-size: var(--font-size-base); font-weight: var(--font-weight-bold); margin: 0 0 16px; }

/* Empty State */
.empty-state {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 12px; padding: 40px 0;
  color: var(--color-text-muted); font-family: var(--font-secondary); font-size: var(--font-size-sm);
}

/* Responsive */
@media (max-width: 1024px) {
  .account-layout { grid-template-columns: 1fr; }
  .sidebar { position: static; display: flex; flex-wrap: wrap; gap: 8px; padding: 12px; }
  .sidebar-nav { flex-direction: row; flex-wrap: wrap; flex: 1; }
  .sidebar-divider { display: none; }
  .logout-btn { width: auto; }
}

@media (max-width: 768px) {
  .container { padding: 16px; }
  .info-grid { grid-template-columns: 1fr; }
  .info-item.full-width { grid-column: 1; }
  .form-grid { grid-template-columns: 1fr; }
  .form-group.full-width { grid-column: 1; }
  .address-list { grid-template-columns: 1fr; }
  .content-card { padding: 20px; }
  .page-title { font-size: var(--font-size-xl); }
}
</style>

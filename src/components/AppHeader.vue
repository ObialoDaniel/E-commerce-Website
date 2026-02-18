eader · VUE
Copy

<template>
  <header class="header">
    <!-- Promo Banner -->
    <div class="promo-banner">
      <div class="container">
        <p class="promo-text">
          Sign up and get 20% off to your first order.
          <a href="#" class="promo-link">Sign Up Now</a>
        </p>
      </div>
    </div>

    <!-- Main Header -->
    <div class="header-main">
      <div class="container">
        <div class="header-content">
          <!-- Mobile Menu Toggle -->
          <button class="menu-toggle" @click="toggleMobileMenu" aria-label="Toggle menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>

          <!-- Logo -->
          <router-link to="/" class="logo">SHOP.CO</router-link>

          <!-- Desktop Navigation -->
          <nav class="nav-desktop">
            <div class="nav-item dropdown">
              <button class="nav-link" @click="toggleDropdown('shop')">
                Shop
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </button>
              <div v-if="activeDropdown === 'shop'" class="dropdown-menu">
                <router-link to="/category/men" class="dropdown-item">Men</router-link>
                <router-link to="/category/women" class="dropdown-item">Women</router-link>
                <router-link to="/category/kids" class="dropdown-item">Kids</router-link>
              </div>
            </div>
            <router-link to="/category" class="nav-link">On Sale</router-link>
            <router-link to="/new-arrivals" class="nav-link">New Arrivals</router-link>
            <router-link to="/category" class="nav-link">Brands</router-link>
          </nav>

          <!-- Search Bar -->
          <div class="search-bar" ref="searchBarRef">
            <svg class="search-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M17.5 17.5L13.875 13.875M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
            <input
              type="text"
              class="search-input"
              placeholder="Search for products..."
              v-model="searchQuery"
              @keyup.enter="handleSearch"
              @focus="showDropdown"
              @blur="hideDropdown"
            />
            <!-- Clear button -->
            <button
              v-if="searchQuery.length > 0"
              class="search-clear-btn"
              @mousedown.prevent="clearSearch"
              aria-label="Clear search"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </button>

            <!-- Suggestions Dropdown -->
            <div v-if="isDropdownVisible && suggestions.length > 0" class="search-dropdown">
              <ul class="search-suggestions">
                <li
                  v-for="product in suggestions"
                  :key="product.id"
                  class="search-suggestion-item"
                  @mousedown.prevent="selectSuggestion(product)"
                >
                  <svg class="suggestion-icon" width="16" height="16" viewBox="0 0 20 20" fill="none">
                    <path d="M17.5 17.5L13.875 13.875M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                  </svg>
                  <!-- Highlight matching part of the name -->
                  <span v-html="highlightMatch(product.name)"></span>
                </li>
              </ul>
              <div class="search-dropdown-footer" @mousedown.prevent="handleSearch">
                <span>See all results for <strong>"{{ searchQuery }}"</strong></span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </div>
            </div>

            <!-- No results state -->
            <div v-if="isDropdownVisible && searchQuery.length >= 2 && suggestions.length === 0" class="search-dropdown">
              <p class="search-no-results">No products found for "<strong>{{ searchQuery }}</strong>"</p>
            </div>
          </div>

          <!-- Header Actions -->
          <div class="header-actions">
            <button class="action-btn search-mobile" @click="toggleSearch" aria-label="Search">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </button>
            <router-link to="/cart" class="action-btn cart-btn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M2 2H3.74001C4.82001 2 5.67 2.93 5.58 4L4.75 13.96C4.61 15.59 5.89999 16.99 7.53999 16.99H18.19C19.63 16.99 20.89 15.81 21 14.38L21.54 6.88C21.66 5.22 20.4 3.87 18.73 3.87H5.82001M16.25 22C16.9404 22 17.5 21.4404 17.5 20.75C17.5 20.0596 16.9404 19.5 16.25 19.5C15.5596 19.5 15 20.0596 15 20.75C15 21.4404 15.5596 22 16.25 22ZM8.25 22C8.94036 22 9.5 21.4404 9.5 20.75C9.5 20.0596 8.94036 19.5 8.25 19.5C7.55964 19.5 7 20.0596 7 20.75C7 21.4404 7.55964 22 8.25 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
              <span v-if="cartItemCount > 0" class="cart-badge">{{ cartItemCount }}</span>
            </router-link>
            <button class="action-btn" aria-label="Account">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12ZM12 12C7.58172 12 4 15.5817 4 20M12 12C16.4183 12 20 15.5817 20 20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <transition name="slide">
      <div v-if="mobileMenuOpen" class="mobile-menu">
        <div class="mobile-menu-overlay" @click="toggleMobileMenu"></div>
        <div class="mobile-menu-content">
          <div class="mobile-menu-header">
            <span class="logo">SHOP.CO</span>
            <button class="close-btn" @click="toggleMobileMenu">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </button>
          </div>
          <nav class="mobile-nav">
            <div class="mobile-nav-item">
              <button class="mobile-nav-link" @click="toggleMobileDropdown('shop')">
                Shop
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </button>
              <div v-if="mobileDropdownOpen === 'shop'" class="mobile-dropdown">
                <router-link to="/category/men" class="mobile-dropdown-item" @click="toggleMobileMenu">Men</router-link>
                <router-link to="/category/women" class="mobile-dropdown-item" @click="toggleMobileMenu">Women</router-link>
                <router-link to="/category/kids" class="mobile-dropdown-item" @click="toggleMobileMenu">Kids</router-link>
              </div>
            </div>
            <router-link to="/category" class="mobile-nav-link" @click="toggleMobileMenu">On Sale</router-link>
            <router-link to="/category" class="mobile-nav-link" @click="toggleMobileMenu">New Arrivals</router-link>
            <router-link to="/category" class="mobile-nav-link" @click="toggleMobileMenu">Brands</router-link>
          </nav>
        </div>
      </div>
    </transition>
  </header>
</template>

<script>
import { useCart } from '@/composables/useCart'
import { useSearch } from '@/composables/useSearch'

export default {
  name: 'AppHeader',

  setup() {
    const { cartItemCount } = useCart()
    const { searchQuery, suggestions, isDropdownVisible, showDropdown, hideDropdown, clearSearch } = useSearch()

    return {
      cartItemCount,
      searchQuery,
      suggestions,
      isDropdownVisible,
      showDropdown,
      hideDropdown,
      clearSearch
    }
  },

  data() {
    return {
      mobileMenuOpen: false,
      activeDropdown: null,
      mobileDropdownOpen: null,
    }
  },

  methods: {
    handleSearch() {
      if (this.searchQuery.trim()) {
        this.isDropdownVisible = false
        this.$router.push({ path: '/category', query: { q: this.searchQuery.trim() } })
      }
    },

    selectSuggestion(product) {
      this.searchQuery = product.name
      this.isDropdownVisible = false
      this.$router.push({ path: '/category', query: { q: product.name } })
    },

    // Wraps the matched portion of the product name in a <mark> tag
    highlightMatch(name) {
      const query = this.searchQuery.trim()
      if (!query) return name
      const regex = new RegExp(`(${query})`, 'gi')
      return name.replace(regex, '<mark class="search-highlight">$1</mark>')
    },

    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen
      document.body.style.overflow = this.mobileMenuOpen ? 'hidden' : ''
    },
    toggleDropdown(dropdown) {
      this.activeDropdown = this.activeDropdown === dropdown ? null : dropdown
    },
    toggleMobileDropdown(dropdown) {
      this.mobileDropdownOpen = this.mobileDropdownOpen === dropdown ? null : dropdown
    },
    toggleSearch() {
      // mobile search toggle — implement as needed
    },
  },

  mounted() {
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.dropdown')) {
        this.activeDropdown = null
      }
    })
  }
}
</script>

<style scoped>
/* ===== PROMO BANNER ===== */
.promo-banner {
  background-color: #000000;
  color: #ffffff;
  padding: 12px 0;
  text-align: center;
  width: 100%;
}

.promo-text {
  font-family: var(--font-secondary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-regular);
  margin: 0;
  color: #ffffff;
}

.promo-link {
  color: #ffffff;
  text-decoration: underline;
  font-weight: var(--font-weight-medium);
  margin-left: var(--space-xs);
  transition: opacity var(--transition-fast);
}

.promo-link:hover {
  opacity: 0.8;
}

/* ===== HEADER MAIN ===== */
.header {
  position: sticky;
  top: 0;
  z-index: 1000;
}

.header-main {
  background-color: var(--color-bg-primary);
  padding: var(--space-lg) 0;
  border-bottom: 1px solid var(--color-border);
  top: 0;
  z-index: var(--z-sticky);
}

.header-content {
  display: flex;
  align-items: center;
  gap: var(--space-lg);
}

/* ===== LOGO ===== */
.logo {
  font-family: var(--font-primary);
  font-size: var(--font-size-logo);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  text-decoration: none;
  transition: opacity var(--transition-fast);
}

.logo:hover {
  opacity: 0.8;
}

/* ===== MOBILE MENU TOGGLE ===== */
.menu-toggle {
  display: none;
  background: none;
  border: none;
  padding: var(--space-sm);
  color: var(--color-text-primary);
  cursor: pointer;
}

/* ===== DESKTOP NAVIGATION ===== */
.nav-desktop {
  display: flex;
  align-items: center;
  gap: var(--space-lg);
}

.nav-item {
  position: relative;
}

.nav-link {
  font-family: var(--font-secondary);
  font-size: var(--font-size-base);
  color: var(--color-text-primary);
  font-weight: var(--font-weight-regular);
  background: none;
  border: none;
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-sm);
  cursor: pointer;
  transition: color var(--transition-fast);
  text-decoration: none;
}

.nav-link:hover {
  color: var(--color-text-secondary);
}

/* ===== DROPDOWN ===== */
.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-sm);
  min-width: 150px;
  box-shadow: var(--shadow-lg);
  margin-top: var(--space-sm);
  z-index: 100;
}

.dropdown-item {
  display: block;
  padding: var(--space-sm) var(--space-md);
  color: var(--color-text-primary);
  border-radius: var(--radius-sm);
  transition: background-color var(--transition-fast);
  text-decoration: none;
  font-family: var(--font-secondary);
  font-size: var(--font-size-base);
}

.dropdown-item:hover {
  background-color: var(--color-bg-secondary);
}

/* ===== SEARCH BAR ===== */
.search-bar {
  flex: 1;
  max-width: 577px;
  position: relative;
  display: flex;
  align-items: center;
}

.search-clear-btn {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #888;
  padding: 2px;
}
.search-clear-btn:hover {
  color: #111;
}

.search-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  overflow: hidden;
}

.search-suggestions {
  list-style: none;
  margin: 0;
  padding: 6px 0;
}

.search-suggestion-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  cursor: pointer;
  font-size: 14px;
  color: #333;
  transition: background 0.15s;
}
.search-suggestion-item:hover {
  background: #f5f5f5;
}

.search-icon {
  position: absolute;
  left: var(--space-md);
  color: var(--color-text-muted);
  pointer-events: none;
  z-index: 1;
}


.search-highlight {
  background: none;
  font-weight: 700;
  color: #111;
}

.search-dropdown-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  border-top: 1px solid #f0f0f0;
  font-size: 13px;
  color: #555;
  cursor: pointer;
  transition: background 0.15s;
}
.search-dropdown-footer:hover {
  background: #f5f5f5;
}
.search-dropdown-footer strong {
  color: #111;
}

.search-no-results {
  padding: 16px;
  font-size: 14px;
  color: #888;
  text-align: center;
  margin: 0;
}
.search-no-results strong {
  color: #333;
}

.search-input {
  width: 100%;
  padding: 12px var(--space-md) 12px 48px;
  background-color: var(--color-bg-secondary);
  border: none;
  border-radius: var(--radius-full);
  font-family: var(--font-secondary);
  font-size: var(--font-size-base);
  color: var(--color-text-primary);
  transition: outline var(--transition-fast);
}

.search-input::placeholder {
  color: var(--color-text-muted);
}

.search-input:focus {
  outline: 2px solid var(--color-text-primary);
  outline-offset: 2px;
}

/* ===== HEADER ACTIONS ===== */
.header-actions {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  margin-left: auto;
}

.action-btn {
  background: none;
  border: none;
  padding: var(--space-sm);
  position: relative;
  color: var(--color-text-primary);
  cursor: pointer;
  transition: color var(--transition-fast);
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
}

.action-btn:hover {
  color: var(--color-text-secondary);
}

.cart-btn {
  position: relative;
}


.cart-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background-color: #FF3333;
  color: #FFFFFF;
  font-size: 11px;
  font-weight: 700;
  min-width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
  border: 2px solid var(--color-bg-primary);
  animation: scaleIn 0.2s ease-out;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

@keyframes scaleIn {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}

.search-mobile {
  display: none;
}


/* ===== MOBILE MENU ===== */
.mobile-menu {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: var(--z-modal);
}

.mobile-menu-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.mobile-menu-content {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 80%;
  max-width: 300px;
  background: var(--color-bg-primary);
  padding: var(--space-lg);
  overflow-y: auto;
}

.mobile-menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-xl);
  padding-bottom: var(--space-lg);
  border-bottom: 1px solid var(--color-border);
}

.close-btn {
  background: none;
  border: none;
  padding: var(--space-sm);
  cursor: pointer;
  color: var(--color-text-primary);
}

.mobile-nav {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.mobile-nav-item {
  display: flex;
  flex-direction: column;
}

.mobile-nav-link {
  padding: var(--space-md);
  color: var(--color-text-primary);
  font-family: var(--font-secondary);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-regular);
  background: none;
  border: none;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  cursor: pointer;
  text-decoration: none;
  border-radius: var(--radius-sm);
  transition: background-color var(--transition-fast);
}

.mobile-nav-link:hover {
  background-color: var(--color-bg-secondary);
}

.mobile-dropdown {
  padding-left: var(--space-lg);
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  margin-top: var(--space-xs);
}

.mobile-dropdown-item {
  padding: var(--space-sm) var(--space-md);
  color: var(--color-text-secondary);
  font-family: var(--font-secondary);
  font-size: var(--font-size-base);
  text-decoration: none;
  border-radius: var(--radius-sm);
  transition: background-color var(--transition-fast);
}

.mobile-dropdown-item:hover {
  background-color: var(--color-bg-secondary);
  color: var(--color-text-primary);
}

/* ===== TRANSITIONS ===== */
.slide-enter-active,
.slide-leave-active {
  transition: all var(--transition-normal);
}

.slide-enter-from .mobile-menu-content {
  transform: translateX(-100%);
}

.slide-leave-to .mobile-menu-content {
  transform: translateX(-100%);
}

.slide-enter-from .mobile-menu-overlay,
.slide-leave-to .mobile-menu-overlay {
  opacity: 0;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 1024px) {
  .nav-desktop {
    display: none;
  }

  .menu-toggle {
    display: block;
  }

  .search-bar {
    display: none;
  }

  .search-mobile {
    display: flex;
  }

  .header-content {
    gap: var(--space-md);
  }
}

@media (max-width: 768px) {
  .logo {
    font-size: var(--font-size-xl);
  }

  .header-main {
    padding: var(--space-md) 0;
  }

  .promo-banner {
    padding: 10px 0;
  }

  .promo-text {
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .logo {
    font-size: var(--font-size-lg);
  }

  .action-btn {
    padding: var(--space-xs);
  }

  .mobile-menu-content {
    width: 85%;
  }
}
</style>

<template>
  <div class="not-found-page">
    <div class="content">

      <!-- Animated 404 -->
      <div class="error-visual">
        <span class="four">4</span>
        <div class="zero-wrap">
          <div class="zero">
            <div class="zero-inner"></div>
          </div>
          <div class="hanger"></div>
        </div>
        <span class="four">4</span>
      </div>

      <h1 class="title">Page Not Found</h1>
      <p class="subtitle">Looks like this page went out of stock. The link may be broken, or the page may have been removed.</p>

      <!-- Quick Links -->
      <div class="quick-links">
        <router-link to="/" class="btn-primary">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          Back to Homepage
        </router-link>
        <router-link to="/category" class="btn-secondary">
          Browse Products
        </router-link>
      </div>

      <!-- Popular Links -->
      <div class="popular">
        <p class="popular-label">Popular pages</p>
        <div class="popular-links">
          <router-link to="/new-arrivals" class="popular-link">New Arrivals</router-link>
          <router-link to="/top-selling" class="popular-link">On Sale</router-link>
          <router-link to="/category" class="popular-link">Category</router-link>
          <router-link to="/contact" class="popular-link">Contact Us</router-link>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFoundPage'
}
</script>

<style scoped>
.not-found-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-secondary);
  padding: 40px 24px;
}

.content {
  text-align: center;
  max-width: 560px;
  width: 100%;
}

/* 404 Visual */
.error-visual {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 32px;
}

.four {
  font-family: var(--font-primary);
  font-size: clamp(80px, 15vw, 140px);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  line-height: 1;
  animation: bounceIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

.four:last-child {
  animation-delay: 0.15s;
  opacity: 0;
}

.four:first-child {
  opacity: 0;
}

@keyframes bounceIn {
  from { opacity: 0; transform: translateY(-30px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Clothes hanger zero */
.zero-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: bounceIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.08s forwards;
  opacity: 0;
}

.hanger {
  width: 2px;
  height: clamp(16px, 3vw, 28px);
  background: var(--color-text-primary);
  border-radius: 2px;
  margin-bottom: -4px;
  position: relative;
}

.hanger::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: clamp(20px, 4vw, 36px);
  height: clamp(10px, 2vw, 18px);
  border: 2px solid var(--color-text-primary);
  border-bottom: none;
  border-radius: 20px 20px 0 0;
}

.zero {
  width: clamp(80px, 14vw, 130px);
  height: clamp(80px, 14vw, 130px);
  border-radius: 50%;
  background: var(--color-text-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: swing 3s ease-in-out infinite;
  transform-origin: top center;
}

.zero-inner {
  width: 55%;
  height: 55%;
  border-radius: 50%;
  background: var(--color-bg-secondary);
}

@keyframes swing {
  0%   { transform: rotate(-6deg); }
  50%  { transform: rotate(6deg); }
  100% { transform: rotate(-6deg); }
}

/* Text */
.title {
  font-family: var(--font-primary);
  font-size: clamp(24px, 4vw, 36px);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin: 0 0 12px;
}

.subtitle {
  font-family: var(--font-secondary);
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin: 0 auto 32px;
  max-width: 420px;
}

/* Buttons */
.quick-links {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.btn-primary {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  background: var(--color-text-primary);
  color: var(--color-bg-primary);
  border-radius: var(--radius-full);
  font-family: var(--font-secondary);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  text-decoration: none;
  transition: opacity 0.2s;
}
.btn-primary:hover { opacity: 0.88; }

.btn-secondary {
  display: flex;
  align-items: center;
  padding: 14px 28px;
  background: transparent;
  color: var(--color-text-primary);
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-full);
  font-family: var(--font-secondary);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  text-decoration: none;
  transition: all 0.2s;
}
.btn-secondary:hover { border-color: var(--color-text-primary); background: var(--color-bg-primary); }

/* Popular Links */
.popular-label {
  font-family: var(--font-secondary);
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  margin: 0 0 12px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.popular-links {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
}

.popular-link {
  padding: 8px 16px;
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  font-family: var(--font-secondary);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: all 0.15s;
}
.popular-link:hover { border-color: var(--color-text-primary); color: var(--color-text-primary); }

@media (max-width: 480px) {
  .quick-links { flex-direction: column; align-items: stretch; }
  .btn-primary, .btn-secondary { justify-content: center; }
}
</style>

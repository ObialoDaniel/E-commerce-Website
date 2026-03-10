<template>
  <div class="skeleton-card">
    <div class="skeleton-image shimmer"></div>
    <div class="skeleton-info">
      <div class="skeleton-title shimmer"></div>
      <div class="skeleton-stars shimmer"></div>
      <div class="skeleton-price shimmer"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCardSkeleton'
}
</script>

<style scoped>
.skeleton-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.skeleton-image {
  width: 100%;
  aspect-ratio: 1;
  border-radius: var(--radius-xl);
  background: var(--color-bg-secondary);
}

.skeleton-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 4px;
}

.skeleton-title {
  height: 18px;
  width: 75%;
  border-radius: var(--radius-sm);
  background: var(--color-bg-secondary);
}

.skeleton-stars {
  height: 14px;
  width: 50%;
  border-radius: var(--radius-sm);
  background: var(--color-bg-secondary);
}

.skeleton-price {
  height: 20px;
  width: 40%;
  border-radius: var(--radius-sm);
  background: var(--color-bg-secondary);
}

/* Shimmer animation */
.shimmer {
  position: relative;
  overflow: hidden;
}

.shimmer::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.6) 50%,
    transparent 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  from { background-position: 200% 0; }
  to   { background-position: -200% 0; }
}
</style>

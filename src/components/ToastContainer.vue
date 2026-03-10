<template>
  <Teleport to="body">
    <div class="toast-container">
      <TransitionGroup name="toast">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="toast"
          :class="[toast.type, { hiding: !toast.visible }]"
        >
          <!-- Icon -->
          <div class="toast-icon">
            <svg v-if="toast.type === 'success'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            <svg v-else-if="toast.type === 'error'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          </div>

          <!-- Message -->
          <span class="toast-message">{{ toast.message }}</span>
          <!-- Undo Action -->
          <button
            v-if="toast.action"
            class="toast-action"
            @click="toast.action.handler(); removeToast(toast.id)"
          >
            {{ toast.action.label }}
          </button>
          <!-- Progress bar -->
          <div class="toast-progress" :class="toast.type"></div>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script>
import { useToast } from '@/composables/useToast'

export default {
  name: 'ToastContainer',
  setup() {
    const { toasts, removeToast } = useToast()
    return { toasts,removeToast }
  }
}
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: 24px;
  right: 24px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 10px;
  pointer-events: none;
}

.toast {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 18px;
  border-radius: 12px;
  min-width: 280px;
  max-width: 360px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  position: relative;
  overflow: hidden;
  pointer-events: all;
  background: #fff;
  border: 1px solid var(--color-border);
}

.toast-action {
  background: none;
  border: none;
  font-family: var(--font-secondary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;
  white-space: nowrap;
  text-decoration: underline;
  flex-shrink: 0;
  transition: opacity 0.15s;
}

.toast-action:hover { opacity: 0.7; }
/* Types */
.toast.success { border-left: 4px solid #00b341; }
.toast.error   { border-left: 4px solid #ff3333; }
.toast.info    { border-left: 4px solid #0066ff; }

.toast-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.toast.success .toast-icon { background: rgba(0, 179, 65, 0.1);  color: #00b341; }
.toast.error   .toast-icon { background: rgba(255, 51, 51, 0.1); color: #ff3333; }
.toast.info    .toast-icon { background: rgba(0, 102, 255, 0.1); color: #0066ff; }

.toast-message {
  font-family: var(--font-secondary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
  flex: 1;
  line-height: 1.4;
}

/* Progress bar */
.toast-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  width: 100%;
  transform-origin: left;
  animation: progress 3.5s linear forwards;
}

.toast-progress.success { background: #00b341; }
.toast-progress.error   { background: #ff3333; }
.toast-progress.info    { background: #0066ff; }

@keyframes progress {
  from { transform: scaleX(1); }
  to   { transform: scaleX(0); }
}

/* Transitions */
.toast-enter-active {
  transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.toast-leave-active {
  transition: all 0.3s ease;
}
.toast-enter-from {
  opacity: 0;
  transform: translateX(60px);
}
.toast-leave-to {
  opacity: 0;
  transform: translateX(60px);
}

@media (max-width: 480px) {
  .toast-container {
    top: auto;
    bottom: 24px;
    right: 16px;
    left: 16px;
  }
  .toast {
    min-width: unset;
    max-width: 100%;
  }
}
</style>

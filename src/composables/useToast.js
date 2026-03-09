import { reactive } from 'vue'

const state = reactive({
  toasts: []
})

let nextId = 0

export function useToast() {
  function addToast({ message, type = 'success', duration = 3500 }) {
    const id = ++nextId
    state.toasts.push({ id, message, type, visible: true })

    setTimeout(() => {
      removeToast(id)
    }, duration)
  }

  function removeToast(id) {
    const index = state.toasts.findIndex(t => t.id === id)
    if (index !== -1) {
      state.toasts[index].visible = false
      setTimeout(() => {
        state.toasts.splice(index, 1)
      }, 400)
    }
  }

  // Shorthand helpers
  const success = (message) => addToast({ message, type: 'success' })
  const error   = (message) => addToast({ message, type: 'error' })
  const info    = (message) => addToast({ message, type: 'info' })

  return {
    toasts: state.toasts,
    addToast,
    removeToast,
    success,
    error,
    info,
  }
}

// composables/useCart.js - Fixed version with proper data handling
import { reactive, computed } from 'vue'

// Global cart state - shared across all components
const cartState = reactive({
  items: []
})

// Load cart from localStorage on initialization
const loadCartFromStorage = () => {
  const savedCart = localStorage.getItem('cart')
  if (savedCart) {
    try {
      const parsed = JSON.parse(savedCart)
      // Validate that parsed data is an array
      if (Array.isArray(parsed)) {
        cartState.items = parsed
      }
    } catch (error) {
      console.error('Error loading cart:', error)
      cartState.items = []
    }
  }
}

// Save cart to localStorage
const saveCartToStorage = () => {
  try {
    localStorage.setItem('cart', JSON.stringify(cartState.items))
  } catch (error) {
    console.error('Error saving cart:', error)
  }
}

// Initialize cart on first import
loadCartFromStorage()

export function useCart() {
  // Computed properties
  const cartItems = computed(() => cartState.items)

  const cartItemCount = computed(() => {
    return cartState.items.reduce((total, item) => {
      const qty = parseInt(item.quantity) || 0
      return total + qty
    }, 0)
  })

  const subtotal = computed(() => {
    return cartState.items.reduce((sum, item) => {
      const price = parseFloat(item.price) || 0
      const quantity = parseInt(item.quantity) || 0
      return sum + (price * quantity)
    }, 0)
  })

  // Add item to cart
  const addToCart = (product, size, color, quantity = 1) => {
    try {
      // Validate inputs
      if (!product || !product.id) {
        console.error('Invalid product data')
        return { success: false, message: 'Invalid product data' }
      }

      // Ensure quantity is a valid number
      const validQuantity = parseInt(quantity) || 1

      // Check if item with same product, size, and color already exists
      const existingItem = cartState.items.find(item =>
        item.id === product.id &&
        item.size === size &&
        item.color === color
      )

      if (existingItem) {
        // Update quantity if item exists
        existingItem.quantity = parseInt(existingItem.quantity) + validQuantity
      } else {
        // Add new item with all required data
        cartState.items.push({
          cartItemId: Date.now() + Math.random(), // Unique ID for cart item
          id: product.id,
          name: product.name || 'Unknown Product',
          price: parseFloat(product.price) || 0,
          image: product.image || '',
          size: size || 'One Size',
          color: color || 'Default',
          quantity: validQuantity
        })
      }

      // Save to localStorage
      saveCartToStorage()

      return {
        success: true,
        message: `${product.name} added to cart!`
      }
    } catch (error) {
      console.error('Error adding to cart:', error)
      return {
        success: false,
        message: 'Failed to add item to cart'
      }
    }
  }

  // Remove item from cart
  const removeFromCart = (cartItemId) => {
    try {
      const index = cartState.items.findIndex(item => item.cartItemId === cartItemId)
      if (index > -1) {
        cartState.items.splice(index, 1)
        saveCartToStorage()
      }
    } catch (error) {
      console.error('Error removing from cart:', error)
    }
  }

  // Increase quantity
  const increaseQuantity = (cartItemId) => {
    try {
      const item = cartState.items.find(item => item.cartItemId === cartItemId)
      if (item) {
        item.quantity = parseInt(item.quantity) + 1
        saveCartToStorage()
      }
    } catch (error) {
      console.error('Error increasing quantity:', error)
    }
  }

  // Decrease quantity
  const decreaseQuantity = (cartItemId) => {
    try {
      const item = cartState.items.find(item => item.cartItemId === cartItemId)
      if (item && parseInt(item.quantity) > 1) {
        item.quantity = parseInt(item.quantity) - 1
        saveCartToStorage()
      }
    } catch (error) {
      console.error('Error decreasing quantity:', error)
    }
  }

  // Clear cart
  const clearCart = () => {
    try {
      cartState.items = []
      saveCartToStorage()
    } catch (error) {
      console.error('Error clearing cart:', error)
    }
  }

  return {
    // State
    cartItems,
    cartItemCount,
    subtotal,

    // Methods
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart
  }
}

// src/composables/useSearch.js
import { ref, computed } from 'vue'
import data from '@/data/products.json'

// Flatten all product arrays into one, ignoring non-product keys like browseByCategory
const allProducts = [
  ...data.newArrivals,
  ...data.topSelling,
  ...data.youMightAlsoLike,
]

export function useSearch() {
  const searchQuery = ref('')
  const isDropdownVisible = ref(false)

  const suggestions = computed(() => {
    const query = searchQuery.value.trim().toLowerCase()
    if (!query || query.length < 2) return []

    return allProducts
      .filter(product => product.name.toLowerCase().includes(query))
      .slice(0, 6) // max 6 suggestions
  })

  function showDropdown() {
    isDropdownVisible.value = true
  }

  function hideDropdown() {
    // small delay so click on suggestion registers before blur closes it
    setTimeout(() => {
      isDropdownVisible.value = false
    }, 150)
  }

  function clearSearch() {
    searchQuery.value = ''
    isDropdownVisible.value = false
  }

  return {
    searchQuery,
    suggestions,
    isDropdownVisible,
    showDropdown,
    hideDropdown,
    clearSearch
  }
}

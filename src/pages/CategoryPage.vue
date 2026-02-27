<template>
  <div class="category-page">
    <AppHeader />
    <main class="container">
      <!-- Breadcrumb -->
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <ol>
          <li><router-link to="/">Home</router-link></li>
          <li><span class="current">{{ searchQuery ? `Search: "${searchQuery}"` : 'Casual' }}</span></li>
        </ol>
      </nav>

      <div class="category-content">

        <!-- ───── DESKTOP SIDEBAR ───── -->
        <aside class="filters-sidebar desktop-sidebar">
          <FiltersPanel
            :categories="categories"
            :selected-categories="pendingCategories"
            :min-price="minPrice"
            :max-price="maxPrice"
            :price-min="pendingPriceMin"
            :price-max="pendingPriceMax"
            :colors="colors"
            :selected-colors="pendingColors"
            :sizes="sizes"
            :selected-sizes="pendingSizes"
            :dress-styles="dressStyles"
            :selected-styles="pendingStyles"
            :show-close-btn="false"
            @toggle-category="togglePendingCategory"
            @update-price="p => { pendingPriceMin = p.min; pendingPriceMax = p.max }"
            @toggle-color="togglePendingColor"
            @toggle-size="togglePendingSize"
            @toggle-style="togglePendingStyle"
            @apply="applyFilters"
          />
        </aside>

        <!-- ───── MOBILE MODAL OVERLAY ───── -->
        <Teleport to="body">
          <Transition name="overlay-fade">
            <div v-if="showFilters" class="modal-overlay" @click.self="closeFilters">
              <Transition name="slide-up">
                <div v-if="showFilters" class="modal-panel">
                  <FiltersPanel
                    :categories="categories"
                    :selected-categories="pendingCategories"
                    :min-price="minPrice"
                    :max-price="maxPrice"
                    :price-min="pendingPriceMin"
                    :price-max="pendingPriceMax"
                    :colors="colors"
                    :selected-colors="pendingColors"
                    :sizes="sizes"
                    :selected-sizes="pendingSizes"
                    :dress-styles="dressStyles"
                    :selected-styles="pendingStyles"
                    :show-close-btn="true"
                    @toggle-category="togglePendingCategory"
                    @update-price="p => { pendingPriceMin = p.min; pendingPriceMax = p.max }"
                    @toggle-color="togglePendingColor"
                    @toggle-size="togglePendingSize"
                    @toggle-style="togglePendingStyle"
                    @apply="applyFilters"
                    @close="closeFilters"
                  />
                </div>
              </Transition>
            </div>
          </Transition>
        </Teleport>

        <!-- Products Section -->
        <section class="products-section">
          <!-- Products Header -->
          <div class="products-header">
            <h1 class="page-title">
              {{ searchQuery ? `Results for "${searchQuery}"` : 'Casual' }}
            </h1>
            <div class="products-info">
              <span class="products-count">
                Showing {{ paginationStart }}-{{ paginationEnd }} of {{ totalFilteredProducts }} Products
              </span>
              <div class="sort-controls">
                <label for="sort">Sort by:</label>
                <select id="sort" v-model="sortOption" class="sort-dropdown">
                  <option value="popular">Most Popular</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
              <!-- Mobile filter trigger -->
              <button class="mobile-filter-btn" @click="openFilters">
                <svg width="18" height="18" viewBox="0 0 21 19" fill="none">
                  <path d="M11.25 9V17.625C11.25 17.9234 11.1315 18.2095 10.9205 18.4205C10.7095 18.6315 10.4234 18.75 10.125 18.75C9.82663 18.75 9.54048 18.6315 9.3295 18.4205C9.11853 18.2095 9 17.9234 9 17.625V9C9 8.70163 9.11853 8.41548 9.3295 8.2045C9.54048 7.99353 9.82663 7.875 10.125 7.875C10.4234 7.875 10.7095 7.99353 10.9205 8.2045C11.1315 8.41548 11.25 8.70163 11.25 9ZM16.875 15.375C16.5766 15.375 16.2905 15.4935 16.0795 15.7045C15.8685 15.9155 15.75 16.2016 15.75 16.5V17.625C15.75 17.9234 15.8685 18.2095 16.0795 18.4205C16.2905 18.6315 16.5766 18.75 16.875 18.75C17.1734 18.75 17.4595 18.6315 17.6705 18.4205C17.8815 18.2095 18 17.9234 18 17.625V16.5C18 16.2016 17.8815 15.9155 17.6705 15.7045C17.4595 15.4935 17.1734 15.375 16.875 15.375ZM19.125 11.625H18V1.125C18 0.826631 17.8815 0.540483 17.6705 0.329505C17.4595 0.118526 17.1734 0 16.875 0C16.5766 0 16.2905 0.118526 16.0795 0.329505C15.8685 0.540483 15.75 0.826631 15.75 1.125V11.625H14.625C14.3266 11.625 14.0405 11.7435 13.8295 11.9545C13.6185 12.1655 13.5 12.4516 13.5 12.75C13.5 13.0484 13.6185 13.3345 13.8295 13.5455C14.0405 13.7565 14.3266 13.875 14.625 13.875H19.125C19.4234 13.875 19.7095 13.7565 19.9205 13.5455C20.1315 13.3345 20.25 13.0484 20.25 12.75C20.25 12.4516 20.1315 12.1655 19.9205 11.9545C19.7095 11.7435 19.4234 11.625 19.125 11.625ZM3.375 12.375C3.07663 12.375 2.79048 12.4935 2.5795 12.7045C2.36853 12.9155 2.25 13.2016 2.25 13.5V17.625C2.25 17.9234 2.36853 18.2095 2.5795 18.4205C2.79048 18.6315 3.07663 18.75 3.375 18.75C3.67337 18.75 3.95952 18.6315 4.1705 18.4205C4.38147 18.2095 4.5 17.9234 4.5 17.625V13.5C4.5 13.2016 4.38147 12.9155 4.1705 12.7045C3.95952 12.4935 3.67337 12.375 3.375 12.375ZM5.625 8.625H4.5V1.125C4.5 0.826631 4.38147 0.540483 4.1705 0.329505C3.95952 0.118526 3.67337 0 3.375 0C3.07663 0 2.79048 0.118526 2.5795 0.329505C2.36853 0.540483 2.25 0.826631 2.25 1.125V8.625H1.125C0.826631 8.625 0.540483 8.74353 0.329505 8.9545C0.118526 9.16548 0 9.45163 0 9.75C0 10.0484 0.118526 10.3345 0.329505 10.5455C0.540483 10.7565 0.826631 10.875 1.125 10.875H5.625C5.92337 10.875 6.20952 10.7565 6.4205 10.5455C6.63147 10.3345 6.75 10.0484 6.75 9.75C6.75 9.45163 6.63147 9.16548 6.4205 8.9545C6.20952 8.74353 5.92337 8.625 5.625 8.625ZM12.375 4.125H11.25V1.125C11.25 0.826631 11.1315 0.540483 10.9205 0.329505C10.7095 0.118526 10.4234 0 10.125 0C9.82663 0 9.54048 0.118526 9.3295 0.329505C9.11853 0.540483 9 0.826631 9 1.125V4.125H7.875C7.57663 4.125 7.29048 4.24353 7.0795 4.4545C6.86853 4.66548 6.75 4.95163 6.75 5.25C6.75 5.54837 6.86853 5.83452 7.0795 6.0455C7.29048 6.25647 7.57663 6.375 7.875 6.375H12.375C12.6734 6.375 12.9595 6.25647 13.1705 6.0455C13.3815 5.83452 13.5 5.54837 13.5 5.25C13.5 4.95163 13.3815 4.66548 13.1705 4.4545C12.9595 4.24353 12.6734 4.125 12.375 4.125Z" fill="black" fill-opacity="0.6"/>
                </svg>
                Filters
                <span v-if="activeFilterCount > 0" class="filter-badge">{{ activeFilterCount }}</span>
              </button>
            </div>
          </div>

          <!-- Products Grid -->
          <div class="products-grid">
            <router-link
              v-for="product in paginatedProducts"
              :key="product.id"
              :to="`/product/${product.id}`"
              class="product-card"
            >
              <div class="product-image">
                <img :src="getImagePath(product.image)" :alt="product.name">
              </div>
              <div class="product-info">
                <h3 class="product-name">{{ product.name }}</h3>
                <div class="rating">
                  <div class="stars">
                    <span v-for="star in 5" :key="star" class="star" :class="{ filled: star <= Math.floor(product.rating) }">★</span>
                  </div>
                  <span class="rating-value">{{ product.rating }}/5</span>
                </div>
                <div class="price-section">
                  <span class="current-price">${{ product.price }}</span>
                  <span v-if="product.originalPrice" class="original-price">${{ product.originalPrice }}</span>
                  <span v-if="product.discount" class="discount">-{{ product.discount }}%</span>
                </div>
              </div>
            </router-link>
          </div>

          <!-- No Products Found -->
          <div v-if="paginatedProducts.length === 0" class="no-products">
            <p>
              {{ searchQuery ? `No products found for "${searchQuery}".` : 'No products match your selected filters.' }}
            </p>
            <button @click="clearFilters" class="clear-filters-btn">Clear All Filters</button>
          </div>

          <!-- Pagination -->
          <div class="pagination" v-if="totalPages > 1">
            <button class="pagination-btn prev" :disabled="currentPage === 1" @click="previousPage">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2"/>
              </svg>
              Previous
            </button>
            <div class="page-numbers">
              <button
                v-for="page in visiblePages"
                :key="page"
                @click="goToPage(page)"
                :class="{ active: currentPage === page }"
                class="page-btn"
              >{{ page }}</button>
            </div>
            <button class="pagination-btn next" :disabled="currentPage === totalPages" @click="nextPage">
              Next
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2"/>
              </svg>
            </button>
          </div>
        </section>
      </div>
    </main>
    <AppFooter />
  </div>
</template>

<script>
import productsData from '@/data/products.json'
import FiltersPanel from '@/components/Filterspanel.vue'

export default {
  name: 'CategoryPage',
  components: { FiltersPanel },

  data() {
    return {
      // ── Filter options ──
      categories: ['T-shirts', 'Shorts', 'Shirts', 'Hoodie', 'Jeans'],
      minPrice: 50,
      maxPrice: 300,
      colors: [
        { name: 'Green',  hex: '#00C12B' },
        { name: 'Red',    hex: '#F50606' },
        { name: 'Yellow', hex: '#F5DD06' },
        { name: 'Orange', hex: '#F57906' },
        { name: 'Cyan',   hex: '#06CAF5' },
        { name: 'Blue',   hex: '#0000FF' },
        { name: 'Purple', hex: '#800080' },
        { name: 'Pink',   hex: '#FFC0CB' },
        { name: 'White',  hex: '#FFFFFF' },
        { name: 'Black',  hex: '#000000' },
      ],
      sizes: ['XX-Small','X-Small','Small','Medium','Large','X-Large','XX-Large','3X-Large','4X-Large'],
      dressStyles: ['Casual', 'Formal', 'Party', 'Gym'],

      // ── PENDING state (shown inside filter panel before Apply) ──
      pendingCategories: [],
      pendingPriceMin: 50,
      pendingPriceMax: 300,
      pendingColors: [],
      pendingSizes: [],
      pendingStyles: [],

      // ── APPLIED state (actually affects the product grid) ──
      appliedCategories: [],
      appliedPriceMin: 50,
      appliedPriceMax: 300,
      appliedColors: [],
      appliedSizes: [],
      appliedStyles: [],

      // ── UI ──
      showFilters: false,
      sortOption: 'popular',
      currentPage: 1,
      isMobile: false,
      searchQuery: '',
      products: [],
    }
  },

  created() {
    // Deduplicate products by id
    const seen = new Set()
    const all = [
      ...productsData.newArrivals,
      ...productsData.topSelling,
      ...productsData.youMightAlsoLike,
    ]
    this.products = all.filter(p => {
      if (seen.has(p.id)) return false
      seen.add(p.id)
      return true
    })

    this.searchQuery = this.$route.query.q || ''
  },

  mounted() {
    this.checkMobile()
    window.addEventListener('resize', this.checkMobile)
  },

  beforeUnmount() {
    window.removeEventListener('resize', this.checkMobile)
  },

  computed: {
    itemsPerPage() {
      return this.isMobile ? 6 : 9
    },

    // ── Core filtering — uses APPLIED state only ──
    // All active filters are AND-combined (product must pass every active filter)
    filteredProducts() {
      let filtered = [...this.products]

      // 1. Search query — matches product name
      if (this.searchQuery.trim()) {
        const q = this.searchQuery.trim().toLowerCase()
        filtered = filtered.filter(p => p.name.toLowerCase().includes(q))
      }

      // 2. Clothing type filter (T-shirts, Shorts, Shirts, Hoodie, Jeans)
      //    → matches product.type (added to products.json)
      if (this.appliedCategories.length > 0) {
        const types = this.appliedCategories.map(c => c.toLowerCase())
        filtered = filtered.filter(p =>
          types.includes((p.type || '').toLowerCase())
        )
      }

      // 3. Price — product.price must be within [appliedPriceMin, appliedPriceMax]
      filtered = filtered.filter(p =>
        p.price >= this.appliedPriceMin && p.price <= this.appliedPriceMax
      )

      // 4. Colors — product must have AT LEAST ONE of the selected colors
      if (this.appliedColors.length > 0) {
        const selected = this.appliedColors.map(c => c.toLowerCase())
        filtered = filtered.filter(p =>
          (p.colors || []).some(c => selected.includes(c.name.toLowerCase()))
        )
      }

      // 5. Sizes — product must offer AT LEAST ONE of the selected sizes
      if (this.appliedSizes.length > 0) {
        const selected = this.appliedSizes.map(s => s.toLowerCase())
        filtered = filtered.filter(p =>
          (p.sizes || []).some(s => selected.includes(s.toLowerCase()))
        )
      }

      // 6. Dress Style (Casual, Formal, Party, Gym)
      //    → matches product.category (e.g. "casual", "formal")
      //    NOTE: separate from clothing type — both can be active at once
      if (this.appliedStyles.length > 0) {
        const selected = this.appliedStyles.map(s => s.toLowerCase())
        filtered = filtered.filter(p =>
          selected.includes((p.category || '').toLowerCase())
        )
      }

      return this.sortProducts(filtered)
    },

    totalFilteredProducts() { return this.filteredProducts.length },
    totalPages()            { return Math.ceil(this.filteredProducts.length / this.itemsPerPage) },

    paginatedProducts() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      return this.filteredProducts.slice(start, start + this.itemsPerPage)
    },

    paginationStart() {
      return this.filteredProducts.length === 0 ? 0 : (this.currentPage - 1) * this.itemsPerPage + 1
    },

    paginationEnd() {
      return Math.min(this.currentPage * this.itemsPerPage, this.filteredProducts.length)
    },

    visiblePages() {
      const maxVisible = 10
      const pages = []
      if (this.totalPages <= maxVisible) {
        for (let i = 1; i <= this.totalPages; i++) pages.push(i)
      } else {
        let start = Math.max(1, this.currentPage - 4)
        let end   = Math.min(this.totalPages, start + maxVisible - 1)
        if (end === this.totalPages) start = Math.max(1, end - maxVisible + 1)
        for (let i = start; i <= end; i++) pages.push(i)
      }
      return pages
    },

    // Badge count for mobile button
    activeFilterCount() {
      return (
        this.appliedCategories.length +
        this.appliedColors.length +
        this.appliedSizes.length +
        this.appliedStyles.length +
        (this.appliedPriceMin > this.minPrice || this.appliedPriceMax < this.maxPrice ? 1 : 0)
      )
    },
  },

  watch: {
    '$route.query.q'(newQuery) {
      this.searchQuery = newQuery || ''
      this.currentPage = 1
    },
    filteredProducts() { this.currentPage = 1 },
    sortOption()       { this.currentPage = 1 },
  },

  methods: {
    checkMobile() {
      this.isMobile = window.innerWidth <= 768
    },

    getImagePath(image) {
      try {
        return new URL(`../assets/img/${image}`, import.meta.url).href
      } catch {
        return ''
      }
    },

    // ── Pending toggles (inside the panel before Apply) ──
    togglePendingCategory(cat) {
      const i = this.pendingCategories.indexOf(cat)
      i > -1 ? this.pendingCategories.splice(i, 1) : this.pendingCategories.push(cat)
    },
    togglePendingColor(color) {
      const i = this.pendingColors.indexOf(color)
      i > -1 ? this.pendingColors.splice(i, 1) : this.pendingColors.push(color)
    },
    togglePendingSize(size) {
      const i = this.pendingSizes.indexOf(size)
      i > -1 ? this.pendingSizes.splice(i, 1) : this.pendingSizes.push(size)
    },
    togglePendingStyle(style) {
      const i = this.pendingStyles.indexOf(style)
      i > -1 ? this.pendingStyles.splice(i, 1) : this.pendingStyles.push(style)
    },

    // ── Apply: commit pending → applied ──
    applyFilters() {
      this.appliedCategories = [...this.pendingCategories]
      this.appliedPriceMin   = this.pendingPriceMin
      this.appliedPriceMax   = this.pendingPriceMax
      this.appliedColors     = [...this.pendingColors]
      this.appliedSizes      = [...this.pendingSizes]
      this.appliedStyles     = [...this.pendingStyles]
      this.currentPage       = 1
      this.closeFilters()
    },

    clearFilters() {
      this.pendingCategories = []
      this.pendingPriceMin   = this.minPrice
      this.pendingPriceMax   = this.maxPrice
      this.pendingColors     = []
      this.pendingSizes      = []
      this.pendingStyles     = []
      this.appliedCategories = []
      this.appliedPriceMin   = this.minPrice
      this.appliedPriceMax   = this.maxPrice
      this.appliedColors     = []
      this.appliedSizes      = []
      this.appliedStyles     = []
      this.searchQuery       = ''
      this.$router.replace({ query: {} })
    },

    openFilters() {
      this.pendingCategories = [...this.appliedCategories]
      this.pendingPriceMin   = this.appliedPriceMin
      this.pendingPriceMax   = this.appliedPriceMax
      this.pendingColors     = [...this.appliedColors]
      this.pendingSizes      = [...this.appliedSizes]
      this.pendingStyles     = [...this.appliedStyles]
      this.showFilters       = true
      document.body.style.overflow = 'hidden'
    },

    closeFilters() {
      this.showFilters = false
      document.body.style.overflow = ''
    },

    sortProducts(products) {
      const s = [...products]
      switch (this.sortOption) {
        case 'price-low':  return s.sort((a, b) => a.price - b.price)
        case 'price-high': return s.sort((a, b) => b.price - a.price)
        case 'newest':     return s.reverse()
        default:           return s.sort((a, b) => b.rating - a.rating)
      }
    },

    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    },
    nextPage()     { this.goToPage(this.currentPage + 1) },
    previousPage() { this.goToPage(this.currentPage - 1) },
  },
}
</script>

<style scoped>
.category-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.container {
  max-width: var(--container-max-width);
  margin: 0 auto;
  padding: var(--space-lg);
  flex: 1;
}

/* Breadcrumb */
.breadcrumb { margin-bottom: var(--space-xl); }
.breadcrumb ol {
  display: flex;
  gap: var(--space-sm);
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}
.breadcrumb li:not(:last-child)::after { content: '>'; margin-left: var(--space-sm); }
.breadcrumb a { color: var(--color-text-secondary); text-decoration: none; transition: color var(--transition-fast); }
.breadcrumb a:hover { color: var(--color-text-primary); }
.breadcrumb .current { color: var(--color-text-primary); font-weight: var(--font-weight-medium); }

/* Layout */
.category-content {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: var(--space-xl);
}

/* Desktop sidebar */
.desktop-sidebar {
  display: block;
  height: fit-content;
  position: sticky;
  top: var(--space-lg);
}

/* Mobile filter trigger button */
.mobile-filter-btn {
  display: none;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-sm) var(--space-md);
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  font-family: var(--font-secondary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  position: relative;
  transition: background var(--transition-fast);
}
.mobile-filter-btn:hover { background: var(--color-border); }

.filter-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--color-text-primary);
  color: var(--color-bg-primary);
  border-radius: var(--radius-full);
  width: 18px;
  height: 18px;
  font-size: 10px;
  font-weight: var(--font-weight-semibold);
}

/* Modal overlay */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  align-items: flex-end;
}

.modal-panel {
  width: 100%;
  max-height: 92vh;
  overflow-y: auto;
  border-radius: var(--radius-xl) var(--radius-xl) 0 0;
  background: var(--color-bg-primary);
}

/* Overlay transitions */
.overlay-fade-enter-active,
.overlay-fade-leave-active { transition: opacity 0.5s ease; }
.overlay-fade-enter-from,
.overlay-fade-leave-to { opacity: 0; }

.slide-up-enter-active,
.slide-up-leave-active { transition: transform 0.3s ease; }
.slide-up-enter-from,
.slide-up-leave-to { transform: translateY(100%); }

/* Products Section */
.products-section { flex: 1; }

.products-header {
  margin-bottom: var(--space-md);
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: var(--space-md);
}

.page-title {
  font-family: var(--font-primary);
  font-size: var(--font-size-category);
  font-weight: var(--font-weight-medium);
  margin-bottom: var(--space-sm);
  color: var(--color-text-primary);
}

.products-info {
  display: flex;
  align-items: center;
  white-space: nowrap;
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  gap: var(--space-sm);
  flex-shrink: 0;
}

.sort-controls {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.sort-dropdown {
  padding: var(--space-sm) var(--space-2xl) var(--space-sm) var(--space-md);
  border: none;
  background: var(--color-bg-secondary);
  border-radius: var(--radius-xl);
  font-family: var(--font-secondary);
  font-size: var(--font-size-sm);
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4 6L8 10L12 6' stroke='%23000000' stroke-width='1.5'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right var(--space-md) center;
}

/* Products Grid */
.products-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-xl);
  margin-bottom: var(--space-2xl);
}

.product-card {
  text-decoration: none;
  transition: transform var(--transition-normal);
}
.product-card:hover { transform: translateY(-4px); }

.product-image {
  width: 100%;
  aspect-ratio: 1;
  background: var(--color-bg-secondary);
  border-radius: var(--radius-xl);
  overflow: hidden;
  margin-bottom: var(--space-md);
}
.product-image img { width: 100%; height: 100%; object-fit: cover; }

.product-info { display: flex; flex-direction: column; gap: var(--space-sm); }

.product-name {
  font-family: var(--font-secondary);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  line-height: var(--line-height-tight);
  margin-bottom: 0;
}

.rating { display: flex; align-items: center; gap: var(--space-sm); }
.stars  { display: flex; gap: 2px; font-size: var(--font-size-base); }
.star         { color: var(--color-border); }
.star.filled  { color: #FFC107; }
.rating-value { font-family: var(--font-secondary); font-size: var(--font-size-sm); color: var(--color-text-secondary); }

.price-section { display: flex; align-items: center; gap: var(--space-sm); }

.current-price {
  font-family: var(--font-secondary);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
}
.original-price {
  font-family: var(--font-secondary);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-muted);
  text-decoration: line-through;
}
.discount {
  background: rgba(255, 51, 51, 0.1);
  color: #ff3333;
  padding: 4px 10px;
  border-radius: var(--radius-xl);
  font-family: var(--font-secondary);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
}

/* No products */
.no-products { text-align: center; padding: var(--space-3xl) 0; color: var(--color-text-secondary); }
.clear-filters-btn {
  margin-top: var(--space-md);
  padding: var(--space-sm) var(--space-xl);
  background: var(--color-text-primary);
  color: var(--color-bg-primary);
  border: none;
  border-radius: var(--radius-full);
  font-family: var(--font-secondary);
  font-size: var(--font-size-sm);
  cursor: pointer;
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: var(--space-3xl);
  padding-top: var(--space-xl);
  border-top: 1px solid var(--color-border);
}
.pagination-btn {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-sm) var(--space-md);
  border: 1px solid var(--color-border);
  background: var(--color-bg-primary);
  border-radius: var(--radius-md);
  font-family: var(--font-secondary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all var(--transition-fast);
}
.pagination-btn:hover:not(:disabled) { background: var(--color-bg-secondary); }
.pagination-btn:disabled { opacity: 0.5; cursor: not-allowed; }
.page-numbers { display: flex; gap: 4px; }
.page-btn {
  width: 36px;
  height: 36px;
  border: none;
  background: transparent;
  border-radius: var(--radius-md);
  font-family: var(--font-secondary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all var(--transition-fast);
}
.page-btn:hover  { background: var(--color-bg-secondary); }
.page-btn.active { background: var(--color-text-primary); color: var(--color-bg-primary); }

/* ── Responsive ── */
@media (max-width: 1024px) {
  .category-content {
    grid-template-columns: 1fr;
  }
  .desktop-sidebar {
    display: none;
  }
  .mobile-filter-btn {
    display: flex;
  }
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 16px;
  }

  /* Header: ALL in one single row — title | count | filter icon */
  .products-header {
    align-items: center;
    gap: 8px;
    margin-bottom: 16px;
    flex-wrap: nowrap;
  }

  .page-title {
    font-size: 20px;
    margin-bottom: 0;
    white-space: nowrap;
    flex-shrink: 0;
  }

  /* products-info stretches to fill space, count left, icon right */
  .products-info {
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;
    flex: 1;
    min-width: 0;
  }

  .products-count {
    font-size: 11px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1;
    min-width: 0;
  }

  /* Hide sort dropdown entirely */
  .sort-controls {
    display: none;
  }

  /* Icon-only filter button */
  .mobile-filter-btn {
    position: relative;
    width: 36px;
    height: 36px;
    padding: 0;
    border-radius: 50%;
    justify-content: center;
    gap: 0;
    /* font-size: 0 hides the "Filters" text node */
    font-size: 0;
  }

  .mobile-filter-btn svg {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }

  .filter-badge {
    position: absolute;
    top: -3px;
    right: -3px;
    width: 15px;
    height: 15px;
    font-size: 9px;
  }

  /* 2-column grid */
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    margin-bottom: 16px;
  }

  /* Compact product cards */
  .product-image {
    border-radius: 12px;
    margin-bottom: 8px;
  }

  .product-info {
    gap: 4px;
  }

  .product-name {
    font-size: 13px;
    line-height: 1.3;
  }

  .rating {
    gap: 4px;
  }

  .stars {
    font-size: 11px;
  }

  .rating-value {
    font-size: 11px;
  }

  .price-section {
    gap: 4px;
    flex-wrap: wrap;
  }

  .current-price {
    font-size: 14px;
  }

  .original-price {
    font-size: 13px;
  }

  .discount {
    font-size: 10px;
    padding: 2px 6px;
  }

  /* Pagination */
  .pagination {
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 8px;
    margin-top: 16px;
    padding-top: 16px;
  }

  .pagination-btn {
    padding: 8px 12px;
    font-size: 12px;
  }

  .page-numbers {
    flex-wrap: wrap;
    justify-content: center;
    gap: 4px;
  }

  .page-btn {
    width: 30px;
    height: 30px;
    font-size: 12px;
  }
}

@media (max-width: 360px) {
  .container {
    padding: 12px;
  }

  .products-grid {
    gap: 8px;
  }

  .product-name {
    font-size: 12px;
  }

  .current-price {
    font-size: 13px;
  }
}
</style>

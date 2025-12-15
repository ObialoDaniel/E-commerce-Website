<template>
  <div class="category-page">
    <AppHeader />
    <main class="container">
      <!-- Breadcrumb -->
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <ol>
          <li><router-link to="/">Home</router-link></li>
          <li><span class="current">Casual</span></li>
        </ol>
      </nav>

      <div class="category-content">
        <!-- Filters Sidebar -->
        <aside class="filters-sidebar">
          <div class="filters-header">
            <h2>Filters</h2>
            <button class="filter-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="4" y1="6" x2="16" y2="6"></line>
                <line x1="4" y1="12" x2="20" y2="12"></line>
                <line x1="4" y1="18" x2="12" y2="18"></line>
                <circle cx="18" cy="6" r="2"></circle>
                <circle cx="8" cy="18" r="2"></circle>
              </svg>
            </button>
          </div>

          <!-- Categories Filter -->
          <div class="filter-section">
            <div
              v-for="category in categories"
              :key="category"
              @click="toggleCategory(category)"
              :class="{ active: selectedCategories.includes(category) }"
              class="filter-item clickable"
            >
              <span class="filter-label">{{ category }}</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 12L10 8L6 4" stroke="currentColor" stroke-width="1.5"/>
              </svg>
            </div>
          </div>

          <hr>

          <!-- Price Filter -->
          <div class="filter-section">
            <h3 class="filter-title">Price</h3>
            <div class="price-range">
              <input
                type="range"
                min="50"
                max="200"
                v-model="priceRange"
                class="range-slider"
              >
              <div class="price-labels">
                 <span>${{ minPrice }}</span>
                 <span>${{ priceRange }}</span>
              </div>
            </div>
          </div>

          <hr>

          <!-- Colors Filter -->
          <div class="filter-section">
            <h3 class="filter-title">Colors</h3>
            <div class="color-grid">
              <button
                v-for="color in colors"
                :key="color.name"
                :style="{ backgroundColor: color.hex }"
                :class="{ active: selectedColors.includes(color.name) }"
                @click="toggleColor(color.name)"
                class="color-option"
                :aria-label="color.name"
              >
                <svg v-if="selectedColors.includes(color.name)" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="white" stroke-width="2.5">
                  <path d="M3 8L6.5 11.5L13 5"/>
                </svg>
              </button>
            </div>
          </div>

          <hr>

          <!-- Size Filter -->
          <div class="filter-section">
            <h3 class="filter-title">Size</h3>
            <div class="size-grid">
              <button
                v-for="size in sizes"
                :key="size"
                @click="toggleSize(size)"
                :class="{ active: selectedSizes.includes(size) }"
                class="size-option"
              >
                {{ size }}
              </button>
            </div>
          </div>

          <hr>

          <!-- Dress Style Filter -->
          <div class="filter-section">
            <h3 class="filter-title">Dress Style</h3>
            <div
              v-for="style in dressStyles"
              :key="style"
              @click="toggleStyle(style)"
              :class="{ active: selectedStyles.includes(style) }"
              class="filter-item clickable"
            >
              <span class="filter-label">{{ style }}</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 12L10 8L6 4" stroke="currentColor" stroke-width="1.5"/>
              </svg>
            </div>
          </div>


          <button class="apply-filters-btn">Apply Filter</button>
        </aside>

        <!-- Products Section -->
        <section class="products-section">
          <!-- Products Header -->
          <div class="products-header">
            <h1 class="page-title">Casual</h1>
            <div class="products-info">
              <span class="products-count">Showing 1-{{ filteredProducts.length }} of {{ totalProducts }} Products</span>
              <div class="sort-controls">
                <label for="sort">Sort by:</label>
                <select id="sort" v-model="sortOption" class="sort-dropdown">
                  <option value="popular">Most Popular</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Products Grid -->
          <div class="products-grid">
            <router-link
              v-for="product in filteredProducts"
              :key="product.id"
              :to="`/product/${product.id}`"
              class="product-card"
            >
              <div class="product-image">
                <img :src="product.image" :alt="product.name">
              </div>
              <div class="product-info">
                <h3 class="product-name">{{ product.name }}</h3>
                <div class="rating">
                  <div class="stars">
                    <span v-for="star in 5" :key="star" class="star" :class="{
                      filled: star <= Math.floor(product.rating)
                    }">★</span>
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

          <!--No Products Found-->
          <div v-if="filteredProducts.length === 0" class="no-products">
            <p>No products found matching your filters.</p>
            <button @click="clearFilters" class="clear-filters-btn">Clear All Filters</button>
          </div>
          <!-- Pagination -->
          <div class="pagination">
            <button class="pagination-btn prev" :disabled="currentPage === 1">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2"/>
              </svg>
              Previous
            </button>

            <div class="page-numbers">
              <button
                v-for="page in totalPages"
                :key="page"
                @click="currentPage = page"
                :class="{ active: currentPage === page }"
                class="page-btn"
              >
                {{ page }}
              </button>
            </div>

            <button class="pagination-btn next">
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
export default {
  name: 'CategoryPage',
  data() {
    return {
      categories: ['T-shirts', 'Shorts', 'Shirts', 'Hoodie', 'Jeans'],
      selectedCategories: [],

      minPrice: 50,
      priceRange: 290,

      colors: [
        { name: 'Green', hex: '#00C12B' },
        { name: 'Red', hex: '#F50606' },
        { name: 'Yellow', hex: '#F5DD06' },
        { name: 'Orange', hex: '#F57906' },
        { name: 'Cyan', hex: '#06CAF5' },
        { name: 'Blue', hex: '#0000FF' },
        { name: 'Purple', hex: '#800080' },
        { name: 'Pink', hex: '#FFC0CB' },
        { name: 'White', hex: '#FFFFFF' },
        { name: 'Black', hex: '#000000' }
      ],
      selectedColors: [],

      sizes: ['XX-Small', 'X-Small', 'Small', 'Medium', 'Large', 'X-Large', 'XX-Large', '3X-Large', '4X-Large'],
      selectedSizes: [],

      dressStyles: ['Casual', 'Formal', 'Party', 'Gym'],
      selectedStyles: [],

      sortOption: 'popular',
      currentPage: 1,
      totalPages: 10,

      products: [
        {
          id: 1,
          name: 'Gradient Graphic T-shirt',
          image: '/src/assets/img/gradient-tshirt.png',
          rating: 3.5,
          price: 145,
          originalPrice: null,
          discount: null,
          category: "T-shirts",
          colors: ["black", "white", "gray"],
          sizes: ["Small", "Medium", "Large", "X-Large"],
          style: "Casual"
        },
        {
          id: 2,
          name: 'Polo with Tipping Details',
          image: '/src/assets/img/polo-tipping.png',
          rating: 4.5,
          price: 180,
          originalPrice: null,
          discount: null,
          category: "Shirts",
          colors: ["blue", "black"],
          sizes: ["Small", "Medium", "Large", "X-Large"],
          style: "Casual"

        },
        {
          id: 3,
          name: 'Black Striped T-shirt',
          image: '/src/assets/img/stripped-tshirt.png',
          rating: 5.0,
          price: 120,
          originalPrice: 160,
          discount: 30,
          category: "T-shirts",
          colors: ["red", "blue", "green"],
          sizes: ["Small", "Medium", "Large", "X-Large"],
          style: "formal"
        },
        {
          id: 4,
          name: 'Skinny Fit Jeans',
          image: '/src/assets/img/Jeans.png',
          rating: 3.5,
          price: 240,
          originalPrice: 260,
          discount: 20,
          category: "Jeans",
          colors: ["orange", "yellow", "red"],
          sizes: ["Small", "Medium", "Large", "X-Large"],
          style: "Casual"
        },
        {
          id: 5,
          name: 'Checkered Shirt',
          image: '/src/assets/img/checkered.png',
          rating: 4.5,
          price: 180,
          originalPrice: null,
          discount: null,
          category: "Shirts",
          colors: ["blue", "white"],
          sizes: ["Small", "Medium", "Large", "X-Large"],
          style: "Party"
        },
        {
          id: 6,
          name: 'Sleeve Striped T-shirt',
          image: '/src/assets/img/Sleeve.png',
          rating: 4.5,
          price: 130,
          originalPrice: 160,
          discount: 30,
          category: "casual",
          colors: ["white", "black"],
          sizes: ["Small", "Medium", "Large", "X-Large"]
        },
        {
          id: 7,
          name: 'Vertical Striped Shirt',
          image: '/src/assets/img/Vertical.png',
          rating: 5.0,
          price: 212,
          originalPrice: 232,
          discount: 20
        },
        {
          id: 8,
          name: 'Courage Graphic T-shirt',
          image: '/src/assets/img/Courage.png',
          rating: 4.0,
          price: 145,
          originalPrice: null,
          discount: null
        },
        {
          id: 9,
          name: 'Loose Fit Bermuda Shorts',
          image: '/src/assets/img/Loose.png',
          rating: 3.0,
          price: 80,
          originalPrice: null,
          discount: null
        }
      ]
    }
  },
  computed: {
    filteredProducts() {
      return this.products
    },
    totalProducts() {
      return this.products.length
    }
  },
  methods: {
    toggleCategory(category) {
      const index = this.selectedCategories.indexOf(category)
      if (index > -1) {
        this.selectedCategories.splice(index, 1)
      } else {
        this.selectedCategories.push(category)
      }
    },
    toggleStyle(style) {
      const index = this.selectedStyles.indexOf(style)
      if (index > -1) {
        this.selectedStyles.splice(index, 1)
      } else {
        this.selectedStyles.push(style)
      }
    },
    toggleColor(colorName) {
      const index = this.selectedColors.indexOf(colorName)
      if (index > -1) {
        this.selectedColors.splice(index, 1)
      } else {
        this.selectedColors.push(colorName)
      }
    },
    toggleSize(size) {
      const index = this.selectedSizes.indexOf(size)
      if (index > -1) {
        this.selectedSizes.splice(index, 1)
      } else {
        this.selectedSizes.push(size)
      }
    }
  }
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
.breadcrumb {
  margin-bottom: var(--space-xl);
}

.breadcrumb ol {
  display: flex;
  gap: var(--space-sm);
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.breadcrumb li:not(:last-child)::after {
  content: '>';
  margin-left: var(--space-sm);
}

.breadcrumb a {
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.breadcrumb a:hover {
  color: var(--color-text-primary);
}

.breadcrumb .current {
  color: var(--color-text-primary);
  font-weight: var(--font-weight-medium);
}

/* Layout */
.category-content {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: var(--space-xl);
}

/* Filters Sidebar */
.filters-sidebar {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--space-xl);
  height: fit-content;
  position: sticky;
  top: var(--space-lg);
  background-color: var(--color-bg-primary);
}

.filters-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-xl);
}

.filters-header h2 {
  font-family: var(--font-primary);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-medium);
  margin: 0;
  color: var(--color-text-primary);
}

.filter-icon {
  background: var(--color-bg-secondary);
  border: none;
  border-radius: var(--radius-full);
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background var(--transition-fast);
}

.filter-icon:hover {
  background: var(--color-border);
}

.filter-section {
  margin-bottom: var(--space-xl);
}

.filter-title {
  font-family: var(--font-primary);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  margin-bottom: var(--space-md);
  color: var(--color-text-primary);
}

.filter-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-sm) 0;
  cursor: default
}

.filter-item.clickable {
  cursor: pointer;
  transition: all var(--transition-fast);
  border-radius: var(--radius-sm);
  padding: var(--space-sm) var(--space-xs);
  margin: 0 calc(-1 * var(--space-xs));
}

.filter-item.clickable:hover {
  background: var(--color-bg-secondary);
}

.filter-item.active {
  background: var(--color-bg-secondary);
}

.filter-item.active .filter-label {
  color: var(--color-text-primary);
  font-weight: var(--font-weight-semibold);
}

.filter-item label {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  cursor: pointer;
  flex: 1;
}

.filter-item input[type="checkbox"] {
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.filter-item span {
  font-family: var(--font-secondary);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.filter-item svg {
  color: var(--color-text-muted);
}

hr {
  border: none;
  border-top: 1px solid var(--color-border);
  margin: var(--space-lg) 0;
}

/* Price Range */
.price-range {
  padding: var(--space-sm) 0;
}

.range-slider {
  width: 100%;
  height: 6px;
  border-radius: var(--radius-sm);
  background: var(--color-bg-secondary);
  outline: none;
}

.range-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: var(--radius-full);
  background: var(--color-text-primary);
  cursor: pointer;
}

.price-labels {
  display: flex;
  justify-content: space-between;
  margin-top: var(--space-md);
  font-family: var(--font-secondary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
}

/* Colors Grid */
.color-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: var(--space-xs);
}

.color-option {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-full);
  border: 1px solid var(--color-border);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-fast);
  padding: 0;
}

.color-option:hover {
  transform: scale(1.1);
}

.color-option.active {
  border: 2px solid var(--color-text-primary);
}

/* Size Grid */
.size-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-sm);
}

.size-option {
  padding: var(--space-sm) var(--space-md);
  background: var(--color-bg-secondary);
  border: none;
  border-radius: var(--radius-xl);
  font-family: var(--font-secondary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-regular);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.size-option:hover {
  background: var(--color-border);
}

.size-option.active {
  background: var(--color-text-primary);
  color: var(--color-bg-primary);
}

/* Apply Filters Button */
.apply-filters-btn {
  width: 100%;
  padding: var(--space-md);
  background: var(--color-text-primary);
  color: var(--color-bg-primary);
  border: none;
  border-radius: var(--radius-full);
  font-family: var(--font-secondary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  margin-top: var(--space-xl);
  transition: background var(--transition-fast);
}

.apply-filters-btn:hover {
  opacity: 0.9;
}

/* Products Section */
.products-section {
  flex: 1;
}

.products-header {
  margin-bottom: var(--space-md);
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex-wrap: nowrap;
  align-items: center;
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
  white-space: nowrap;
  align-items: center;
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  gap: var(--space-sm);
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

.product-card:hover {
  transform: translateY(-4px);
}

.product-image {
  width: 100%;
  aspect-ratio: 1;
  background: var(--color-bg-secondary);
  border-radius: var(--radius-xl);
  overflow: hidden;
  margin-bottom: var(--space-md);
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-info {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.product-name {
  font-family: var(--font-secondary);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  line-height: var(--line-height-tight);
  margin-bottom: 0;
}

.rating {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.stars {
  display: flex;
  gap: 2px;
  font-size: var(--font-size-base);
}

.star {
  color: var(--color-border);
}

.star.filled {
  color: #FFC107;
}

.rating-value {
  font-family: var(--font-secondary);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.price-section {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

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

.pagination-btn:hover:not(:disabled) {
  background: var(--color-bg-secondary);
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-numbers {
  display: flex;
  gap: 4px;
}

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

.page-btn:hover {
  background: var(--color-bg-secondary);
}

.page-btn.active {
  background: var(--color-text-primary);
  color: var(--color-bg-primary);
}

/* Responsive */
@media (max-width: 1024px) {
  .category-content {
    grid-template-columns: 1fr;
  }

  .filters-sidebar {
    position: static;
  }

  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .container {
    padding: var(--space-md);
  }

  .products-grid {
    grid-template-columns: 1fr;
    gap: var(--space-md);
  }

  .page-title {
    font-size: var(--font-size-2xl);
  }

  .pagination {
    flex-direction: column;
    gap: var(--space-md);
  }

  .products-info {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-sm);
  }
}
</style>

<template>
  <div class="category-page">
    <AppHeader />
    <main class="container">
     <!-- Breadcrumb Navigation -->
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <ol>
          <li v-for="(crumb, index) in computedBreadcrumbs" :key="index">
            <router-link v-if="index < computedBreadcrumbs.length - 1" :to="crumb.path">
              {{ crumb.label }}
            </router-link>
            <span v-else class="current">{{ crumb.label }}</span>
          </li>
        </ol>
      </nav>

      <!--Product Detail Section-->
      <section class="product-detail">
        <div class="product-gallery">
          <!--Thumbnail Images-->
          <div class="thumbnails">
            <button
              v-for="(image, index) in productData.images"
              :key="index"
              @click="selectedImage = image"
              :class="{ active: selectedImage === image }"
              class="thumbnail"
            >
              <img :src="getImagePath(image)" :alt="`${productData.name} view ${index + 1}`" />
            </button>
          </div>

          <!--Main Image-->
          <div class="main-image">
            <img
              v-if="selectedImage"
              :src="getImagePath(selectedImage)"
              :alt="productData.name"
            />
          </div>
        </div>

        <!--Product Info-->
        <div class="product-info">
          <h1 class="product-title">{{ productData.name }}</h1>

           <!-- Rating -->
          <div class="rating">
            <div class="stars">
              <span v-for="star in 5" :key="star" class="star" :class="{ filled: star <= Math.floor(productData.rating) }">
                ★
              </span>
            </div>
            <span class="rating-value">{{ productData.rating }}/5</span>
          </div>

          <!--Price-->
          <div class="price-section">
            <span class="current-price">${{ productData.price }}</span>
            <span v-if="productData.originalPrice" class="original-price">${{ productData.originalPrice }}</span>
            <span v-if="productData.discount" class="discount">-{{ productData.discount }}%</span>
          </div>

          <!--Description-->
          <p class="description">{{ productData.description }}</p>

          <hr class="divider">

          <!--Color Selection-->
          <div class="option-group">
            <label class="option-label">Select Colors</label>
            <div class="color-options">
              <button
                v-for="color in productData.colors"
                :key="color.name"
                @click="selectedColor = color"
                :class="{ active: selectedColor === color }"
                :style="{ backgroundColor: color.hex }"
                :aria-label="color.name"
                class="color-option"
              >
                <svg v-if="selectedColor === color" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="white" stroke-width="2.5">
                  <path d="M3 8L6.5 11.5L13 5"/>
                </svg>
              </button>
            </div>
          </div>

          <hr class="divider">

          <!--Size Selection-->
          <div class="option-group">
            <label class="option-label">Choose Size</label>
            <div class="size-options">
              <button
                v-for="size in productData.sizes"
                :key="size"
                @click="selectedSize = size"
                :class="{ active: selectedSize === size }"
                class="size-option"
              >
                {{ size }}
              </button>
            </div>
          </div>

          <hr class="divider">

          <!--Add to Cart Button-->
          <div class="cart-actions">
            <div class="quantity-selector">
              <button @click="decreaseQuantity" aria-label="Decrease quantity">−</button>
              <span class="quantity-display">{{ quantity }}</span>
              <button @click="increaseQuantity" aria-label="Increase quantity">+</button>
            </div>
            <button class="add-to-cart-btn" @click="handleAddToCart">Add to Cart</button>
          </div>
        </div>
      </section>

      <!--Tabs Section (Product Details, Review, FAQS)-->
      <section class="product-tabs">
        <div class="tabs-header">
          <button
            v-for="tab in tabs"
            :key="tab"
            @click="activeTab = tab"
            :class="{ active: activeTab === tab }"
            class="tab-button"
          >
            {{ tab }}
          </button>
        </div>

        <div class="tab-content">
          <!--Product Details tab-->
          <div v-if="activeTab === 'Product Details'" class="tab-panel">
            <h2>Product Details</h2>
            <p>{{ productData.description }}</p>
          </div>

          <!--Rating & Reviews Tab-->
          <div v-if="activeTab === 'Rating & Reviews'" class="tab-panel">
            <div class="reviews-header">
              <h2>All Reviews <span class="review-count">({{ productData.reviewCount }})</span></h2>
              <div class="reviews-controls">
                <button class="filter-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="4" y1="6" x2="16" y2="6"></line>
                    <line x1="4" y1="12" x2="20" y2="12"></line>
                    <line x1="4" y1="18" x2="12" y2="18"></line>
                    <circle cx="18" cy="6" r="2"></circle>
                    <circle cx="8" cy="18" r="2"></circle>
                  </svg>
                </button>
                <select v-model="sortOption" class="sort-dropdown">
                  <option value="latest">Latest</option>
                  <option value="highest">Highest Rated</option>
                  <option value="lowest">Lowest Rated</option>
                </select>
                <button class="write-review-btn">Write a Review</button>
              </div>
            </div>

            <!-- Reviews Grid -->
            <div class="reviews-grid">
              <div
                v-for="(review, index) in visibleReviews"
                :key="index"
                class="review-card"
              >
                <div class="review-header">
                  <div class="stars">
                    <span v-for="star in 5" :key="star" class="star" :class="{ filled: star <= Math.floor(review.rating) }">★</span>
                  </div>
                  <button class="menu-btn">⋯</button>
                </div>

                <div class="review-author">
                  <span class="name">{{ review.name }}</span>
                  <Check v-if="review.verified" class="verified-icon" />
                </div>

                <p class="review-text">{{ review.text }}</p>
                <p class="review-date">Posted on {{ review.date }}</p>
              </div>
            </div>

            <!-- Load more button -->
            <div class="load-more-container" v-if="visibleCount < reviews.length">
              <button class="load-more-btn" @click="loadMoreReviews">
                Load More Reviews
              </button>
            </div>
          </div>

          <!--FAQS Tab-->
          <div v-if="activeTab === 'FAQs'" class="tab-panel">
            <h2>Frequently Asked Questions</h2>
            <p>Coming soon...</p>
          </div>
        </div>
      </section>

      <!-- You Might Also Like Section -->
      <section class="you-might-like-section">
        <h2 class="section-title">YOU MIGHT ALSO LIKE</h2>

        <div class="similar-products-grid">
          <router-link
            v-for="product in filteredSuggestedProducts"
            :key="product.id"
            :to="`/product/${product.id}`"
            class="similar-product-card"
          >
            <div class="similar-product-image">
              <img :src="getImagePath(product.image)" :alt="product.name">
            </div>

            <div class="similar-product-info">
              <h3 class="similar-product-name">{{ product.name }}</h3>

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
      </section>
    </main>
    <AppFooter />
  </div>
</template>

<script>
import { useCart } from '@/composables/useCart'
import Check from "@/components/check.vue"
import productsData from '@/data/products.json'

export default {
  name: 'ProductDetailPage',
  components: { Check },

  setup() {
    const { addToCart } = useCart()
    return {
      addToCart
    }
  },

  data() {
    return {
      selectedImage: '',
      selectedColor: null,
      selectedSize: 'Large',
      quantity: 1,
      activeTab: 'Rating & Reviews',
      tabs: ['Product Details', 'Rating & Reviews', 'FAQs'],
      sortOption: 'latest',
      visibleCount: 6,

      allProducts: [
        ...productsData.newArrivals,
        ...productsData.topSelling,
        ...productsData.youMightAlsoLike
      ],


      reviews: [
        {
          name: "Samantha D.",
          verified: true,
          rating: 4.5,
          text: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
          date: "August 14, 2023",
        },
        {
          name: "Alex M.",
          verified: true,
          rating: 4,
          text: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
          date: "August 15, 2023",
        },
        {
          name: "Ethan R.",
          verified: true,
          rating: 3.5,
          text: "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.",
          date: "August 16, 2023",
        },
        {
          name: "Olivia P.",
          verified: true,
          rating: 4,
          text: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.",
          date: "August 17, 2023",
        },
        {
          name: "Liam K.",
          verified: true,
          rating: 4,
          text: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.",
          date: "August 18, 2023",
        },
        {
          name: "Ava H.",
          verified: true,
          rating: 4.5,
          text: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.",
          date: "August 19, 2023",
        },
      ],

      suggestedProducts: productsData.youMightAlsoLike
    }
  },

  computed: {
    productId() {
      return parseInt(this.$route.params.id)
    },

    productData() {
      const product = this.allProducts.find(p => p.id === this.productId)

      if (!product) {
        console.error(`Product with ID ${this.productId} not found!`)
        return {
          id: this.productId,
          name: 'Product Not Found',
          price: 0,
          rating: 0,
          image: 'placeholder.png',
          colors: [{ name: 'Black', hex: '#000000' }],
          sizes: ['Small', 'Medium', 'Large'],
          description: 'This product could not be found.',
          images: ['placeholder.png'],
          reviewCount: 0,
          gender: 'N/A',
          categorySlug: 'casual',
          category: 'N/A'
        }
      }

      return product
    },

    computedBreadcrumbs() {
      return [
        { label: 'Home', path: '/' },
        { label: 'Shop', path: '/category' },
        { label: this.productData.gender || 'Products', path: `/category/${this.productData.categorySlug}` },
        { label: this.productData.category, path: this.$route.path }
      ]
    },

    sortedReviews() {
      const sorted = [...this.reviews]
      if (this.sortOption === "latest") return sorted.reverse()
      if (this.sortOption === "oldest") return sorted
      if (this.sortOption === "highest") return sorted.sort((a, b) => b.rating - a.rating)
      if (this.sortOption === "lowest") return sorted.sort((a, b) => a.rating - b.rating)
      return sorted
    },

    visibleReviews() {
      return this.sortedReviews.slice(0, this.visibleCount)
    },

    filteredSuggestedProducts() {
      return this.suggestedProducts.filter(p => p.id !== this.productId)
    }
  },

  mounted() {
    this.checkProductExists()

    if (this.productData && this.productData.id !== 0) {
      this.selectedImage = this.productData.image
      this.selectedColor = this.productData.colors[0]
    }
  },

  watch: {
    '$route.params.id'(newId, oldId) {
      if (newId !== oldId) {
        this.checkProductExists()

        if (this.productData && this.productData.id !== 0) {
          this.selectedImage = this.productData.image
          this.selectedColor = this.productData.colors[0]
          this.selectedSize = 'Large'
          this.quantity = 1
          window.scrollTo(0, 0)
        }
      }
    }
  },

  methods: {
    checkProductExists() {
      const product = this.allProducts.find(p => p.id === this.productId)
      if (!product) {
        console.error(`Product with ID ${this.productId} not found! Redirecting...`)
        this.$router.push('/category')
      }
    },

    getImagePath(image) {
      try {
        return new URL(`../assets/img/${image}`, import.meta.url).href
      } catch (error) {
        console.error(`Error loading image: ${image}`, error)
        return ''
      }
    },

    increaseQuantity() {
      this.quantity++
    },

    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity--
      }
    },

    handleAddToCart() {
      if (!this.productData || this.productData.id === 0) {
        alert('Product data not available')
        return
      }

      if (!this.selectedColor) {
        alert('Please select a color')
        return
      }

      if (!this.selectedSize) {
        alert('Please select a size')
        return
      }

      const productForCart = {
        id: this.productData.id,
        name: this.productData.name,
        price: this.productData.price,
        image: this.getImagePath(this.productData.image)
      }

      const result = this.addToCart(
        productForCart,
        this.selectedSize,
        this.selectedColor.name,
        this.quantity
      )

      if (result.success) {
        alert(`${result.message}\n\nItem added:\n${this.productData.name}\nSize: ${this.selectedSize}\nColor: ${this.selectedColor.name}\nQuantity: ${this.quantity}`)
      } else {
        alert('Failed to add item to cart. Please try again.')
      }
    },

    loadMoreReviews() {
      this.visibleCount += 2
    }
  }
}
</script>

<style scoped>
/* Base Styles */
.category-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #FFFFFF;
}

.container {
  max-width: 1240px;
  margin: 0 auto;
  padding: 20px 16px;
  flex: 1;
}

/* Breadcrumb */
.breadcrumb {
  margin-bottom: 24px;
}

.breadcrumb ol {
  display: flex;
  gap: 8px;
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.6);
  flex-wrap: wrap;
}

.breadcrumb li:not(:last-child)::after {
  content: '/';
  margin-left: 8px;
  color: rgba(0, 0, 0, 0.6);
}

.breadcrumb a {
  color: rgba(0, 0, 0, 0.6);
  text-decoration: none;
  transition: color 0.2s;
}

.breadcrumb a:hover {
  color: #000;
}

.breadcrumb .current {
  color: #000;
  font-weight: 500;
}

/* Product Detail Section */
.product-detail {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-bottom: 40px;
}

/* Product Gallery */
.product-gallery {
  display: flex;
  gap: 14px;
}

.thumbnails {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.thumbnail {
  width: 152px;
  height: 167px;
  border: none;
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  background: #F0EEED;
  padding: 8px; /* Add padding to prevent edge cutting */
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box; /* Ensure padding is included in width/height */
}

.thumbnail:hover {
  opacity: 0.8;
}

/* .thumbnail.active {
  outline: 2px solid #000;
} */

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: contain; /* Changed from 'cover' to 'contain' to fit entire image */
  border-radius: 12px;
}


.main-image {
  flex: 1;
  border-radius: 20px;
  overflow: hidden;
  background: #F0EEED;
  height: 530px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.main-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Product Info */
.product-info {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.product-title {
  font-size: 40px;
  font-weight: 700;
  margin: 0;
  line-height: 1.2;
  color: #000;
  font-family: 'Integral CF', sans-serif;
}

.rating {
  display: flex;
  align-items: center;
  gap: 13px;
}

.stars {
  display: flex;
  gap: 6px;
  font-size: 22px;
}

.star {
  color: #E0E0E0;
}

.star.filled {
  color: #FFC633;
}

.rating-value {
  font-size: 16px;
  color: #000;
}

.price-section {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 6px 0;
}

.current-price {
  font-size: 32px;
  font-weight: 700;
  color: #000;
}

.original-price {
  font-size: 32px;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.4);
  text-decoration: line-through;
}

.discount {
  background: rgba(255, 51, 51, 0.1);
  color: #FF3333;
  padding: 6px 14px;
  border-radius: 62px;
  font-size: 16px;
  font-weight: 500;
}

.description {
  color: rgba(0, 0, 0, 0.6);
  line-height: 1.6;
  margin: 6px 0;
  font-size: 16px;
}

.divider {
  border: none;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  margin: 10px 0;
}

/* Options */
.option-group {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.option-label {
  color: rgba(0, 0, 0, 0.6);
  font-size: 16px;
  font-weight: 400;
}

.color-options {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.color-option {
  width: 37px;
  height: 37px;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.2);
  cursor: pointer;
  position: relative;
  transition: all 0.2s;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.color-option:hover {
  transform: scale(1.1);
}

.color-option.active {
  outline: 1px solid #000;
  outline-offset: 3px;
}

.size-options {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.size-option {
  padding: 12px 24px;
  border: none;
  border-radius: 62px;
  background: #F0F0F0;
  cursor: pointer;
  font-weight: 400;
  transition: all 0.2s;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.6);
}

.size-option:hover {
  background: #E0E0E0;
}

.size-option.active {
  background: #000;
  color: #FFF;
}

/* Cart Actions */
.cart-actions {
  display: flex;
  gap: 20px;
  margin-top: 10px;
}

.quantity-selector {
  display: flex;
  align-items: center;
  background: #F0F0F0;
  border-radius: 62px;
  padding: 16px 20px;
  gap: 20px;
  min-width: 170px;
}

.quantity-selector button {
  width: 20px;
  height: 20px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 20px;
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  transition: opacity 0.2s;
}

.quantity-selector button:hover {
  opacity: 0.7;
}

.quantity-display {
  font-weight: 500;
  font-size: 16px;
  min-width: 30px;
  text-align: center;
}

.add-to-cart-btn {
  flex: 1;
  background: #000;
  color: #FFF;
  border: none;
  border-radius: 62px;
  padding: 16px 54px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.add-to-cart-btn:hover {
  background: #333;
  transform: translateY(-1px);
}

.add-to-cart-btn:active {
  transform: translateY(0);
}

/* Tabs Section */
.product-tabs {
  margin-top: 40px;
  margin-bottom: 64px;
}

.tabs-header {
  display: flex;
  gap: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 32px;
}

.tab-button {
  padding: 24px 0;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
  color: rgba(0, 0, 0, 0.6);
  position: relative;
  transition: all 0.3s;
  font-weight: 400;
  margin-right: 40px;
}

.tab-button:hover {
  color: #000;
}

.tab-button.active {
  color: #000;
  font-weight: 500;
}

.tab-button.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 2px;
  background-color: #000;
}

.tab-content {
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.tab-panel h2 {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 20px;
}

/* Reviews Section */
.reviews-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  gap: 20px;
}

.reviews-header h2 {
  font-size: 24px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #000;
  margin: 0;
  flex-shrink: 0;
}

.review-count {
  font-weight: 400;
  color: rgba(0, 0, 0, 0.6);
}

.reviews-controls {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: nowrap;
  flex-shrink: 0;
  margin-left: auto; /* Push controls to the right */
}

.filter-btn {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  background-color: #F0F0F0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  flex-shrink: 0;
}

.filter-btn:hover {
  background-color: #E0E0E0;
}

.sort-dropdown {
  padding: 14px 40px 14px 20px;
  border: none;
  border-radius: 62px;
  background-color: #F0F0F0;
  font-size: 16px;
  color: #000;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4 6L8 10L12 6' stroke='%23000000' stroke-width='1.5'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 16px center;
  transition: all 0.3s;
  width: auto; /* Changed from min-width */
  min-width: unset; /* Remove min-width constraint */
  flex-shrink: 0;
}

.sort-dropdown:hover {
  background-color: #E0E0E0;
}

.write-review-btn {
  padding: 16px 54px;
  background-color: #000;
  color: #FFF;
  border: none;
  border-radius: 62px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  white-space: nowrap;
  flex-shrink: 0;
}

.write-review-btn:hover {
  background-color: #333;
}

/* Reviews Grid */
.reviews-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 36px;
}

.review-card {
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  padding: 28px 32px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: all 0.3s;
}

.review-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.menu-btn {
  background: none;
  border: none;
  font-size: 24px;
  color: rgba(0, 0, 0, 0.4);
  cursor: pointer;
  transition: color 0.2s;
  padding: 0;
  width: 24px;
  height: 24px;
}

.menu-btn:hover {
  color: #000;
}

.review-author {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  font-size: 20px;
}

.verified-icon {
  color: #01AB31;
  width: 24px;
  height: 24px;
}

.review-text {
  font-size: 16px;
  line-height: 1.6;
  color: rgba(0, 0, 0, 0.6);
  margin: 0;
}

.review-date {
  font-size: 16px;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 500;
  margin: 0;
}

/* Load More */
.load-more-container {
  display: flex;
  justify-content: center;
  margin: 24px 0;
}

.load-more-btn {
  background: none;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 62px;
  padding: 16px 54px;
  font-weight: 500;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
}

.load-more-btn:hover {
  background: #000;
  color: #FFF;
  border-color: #000;
}

/* You Might Also Like Section */
.you-might-like-section {
  margin: 64px 0;
}

.section-title {
  text-align: center;
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 55px;
  text-transform: uppercase;
  letter-spacing: 0;
  font-family: 'Integral CF', sans-serif;
}

.similar-products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.similar-product-card {
  text-decoration: none;
  transition: transform 0.3s;
}

.similar-product-card:hover {
  transform: translateY(-4px);
}

.similar-product-image {
  width: 100%;
  aspect-ratio: 1;
  overflow: hidden;
  background: #F0EEED;
  border-radius: 20px;
  margin-bottom: 16px;
}

.similar-product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.similar-product-info {
  padding: 0;
}

.similar-product-name {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 8px;
  color: #000;
  line-height: 1.3;
}

.similar-product-info .rating {
  margin-bottom: 8px;
}

.similar-product-info .stars {
  font-size: 18px;
  gap: 5px;
}

.similar-product-info .rating-value {
  font-size: 14px;
}

.similar-product-info .price-section {
  gap: 10px;
}

.similar-product-info .current-price {
  font-size: 24px;
}

.similar-product-info .original-price {
  font-size: 24px;
}

.similar-product-info .discount {
  font-size: 12px;
  padding: 4px 12px;
}

/* Responsive Styles */
@media (max-width: 1024px) {
  .product-detail {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .similar-products-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .reviews-grid {
    grid-template-columns: 1fr;
  }

   .reviews-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .reviews-controls {
    flex-wrap: wrap;
    width: 100%;
    margin-left: 0;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 16px;
  }

  .product-title {
    font-size: 32px;
  }

  .product-gallery {
    flex-direction: column-reverse;
  }

  .thumbnails {
    flex-direction: row;
    overflow-x: auto;
    gap: 12px;
  }

  .thumbnail {
    flex-shrink: 0;
    width: 100px;
    height: 110px;
  }

  .main-image {
    height: 400px;
  }

  .cart-actions {
    flex-direction: column;
    gap: 16px;
  }

  .quantity-selector {
    width: 100%;
    justify-content: space-between;
  }

  .add-to-cart-btn {
    width: 100%;
  }

  .tabs-header {
    overflow-x: auto;
  }

  .tab-button {
    flex-shrink: 0;
    font-size: 16px;
    padding: 16px 0;
    margin-right: 24px;
  }

  .section-title {
    font-size: 32px;
    margin-bottom: 32px;
  }

  .similar-products-grid {
    grid-template-columns: 1fr;
    overflow-x: auto;
    display: flex;
    gap: 16px;
  }

  .similar-product-card {
    flex-shrink: 0;
    width: 280px;
  }

  .reviews-controls {
    width: 100%;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .write-review-btn {
    padding: 12px 20px;
    font-size: 14px;
  }

  .sort-dropdown {
    padding: 12px 40px 12px 16px;
    font-size: 14px;
    min-width: 100px;
  }
}
</style>

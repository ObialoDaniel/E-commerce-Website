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

      <!--Product Deatil Section-->
      <section class="product-detail">
        <div class="product-gallery">
          <!--Thumbnail Images-->
          <div class="thumbnails">
            <button
              v-for="(image, index)  in productData.images"
              :key="index"
              @click="selectedImage = image"
              :class="{ active : selectedImage === image}"
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
            <span v-if="productData.originalPrice" class="original-price">${{ productData.originaPrice }}</span>
            <span v-if="productData.discount" class="discount"> {{ productData.discount }} %</span>
          </div>

          <!--Description-->
          <p class="description">{{ productData.description }}</p>

          <!--Color Selection-->
          <div class="opetion-group">
            <label class="option-label"> Select Colors</label>
            <div class="color-options">
              <button
                v-for="color in productData.colors"
                :key="color.name"
                :class="{ active: selectedColor === color}"
                :style="{ backgroundColor: color.hex }"
                :aria-label="color.name"
                class="color-option"
                >
                <span v-if="selectedColor === color" class="checkmark">✓</span>
             </button>
            </div>
          </div>
          <!--Size Selection-->
          <div class="option-group">
            <label class="option-label">Choose Size</label>
            <div class="size options">
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
          <!--Add to Cart Button-->
          <div class="cart-actions">
            <div class="quantity-selector">
              <button @click="decreaseQuantity" aria-label="Decrease quantity">-</button>
              <input v-model.number="quantity" type="number" min="1" readonly />
              <button @click="increaseQuantity" aria-label="Increase quantity">+</button>
            </div>
            <button class="add-to-cart-button" @click="addToCart">Add to Cart</button>
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
        <div class="tab-current">
          <!--Product Details tab-->
          <div v-if="activeTab === 'Product Details'" class="tab-content">
            <slot name="product-details">
              <h2>Product Details</h2>
              <p>{{ productData.Description }}</p>
            </slot>
          </div>
          <!--Rating & Reviews Tab-->
          <div v-if="activeTab === 'rating & Reviews'" class="tab-content">
            <slot name="rebiews">
              <div class="reviews-header">
                <h2> All Reviews <span class="review-count">{{ productData.reviewCount }}</span></h2>
                <button class="write-review-btn">Write a Review</button>
              </div>
            </slot>
          </div>
          <!--FAQS Tab-->
          <div v-if="activeTab === 'FAQs'" class="tab-content">
            <slot name="faqs">
              <h2> Frequently Asked Questons</h2>
            </slot>
          </div>
        </div>
      </section>
    </main>

    <AppFooter />
  </div>
</template>

<script>
export default {
  name: 'CategoryPage',

  props: {
    id: {
      String,
      required: true
    }
  },

  data() {
    return {
      selectedImage: '',
      selectedColor: null,
      selectedSize: 'Large',
      quantity: 1,
      activeTab: 'Rating & Reviews',
      tabs: ['Product Details', 'Rating & Reviews', ' FAQs'],

      productData: {
      id: this.id,
      name: 'ONE LIFE GRAPHIC T-SHIRT',
      rating: 4.5,
      price: 260,
      originalPrice: 300,
      discount: 40,
      description: 'This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.',
      image: 'graphic-tee.png',
      images: [
        "graphic-tee1.png",
        "graphic-tee2.png",
        "graphic-tee3.png",
      ],
      colors: [
        { name: 'Olive', hex: '#4A4A3A' },
        { name: 'Dark Green', hex: '#2D4A3E' },
        { name: 'Navy', hex: '#2B3A4A' },
      ],
      sizes: ['Small', 'Medium', 'Large', 'X-Large'],
      reviewCount: 451,
      category: 'T-shirts',
      gender: 'Men',
      categorySlug: 'men'
      }
    }
  },

  computed: {
    computedBreadcrumbs() {
      return [
        { label: 'Home', path: '/' },
        { label: 'Shop', path: '/category' },
        { label: this.productData.gender, path: `/category/${this.productData.categorySlug}` },
        { label: this.productData.category, path: this.$route.path }
      ]
    }
  },


  mounted() {
    this.selectedImage = this.productData.image
    this.selectedColor = this.productData.colors[0]
  },

  methods: {
    getImagePath(image) {
      try {
        return new URL(`../assets/img/${image}`, import.meta.url).href
      } catch (error) {
        console.error('error Loading image: ${image}', error)
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

    addToCart() {
      const cartItem = {
        product: this.productData,
        color: this.selectedColor,
        size: this.selectedSize,
        quantity: this.quantity
      }

      // Emit event to parent or dispatch to store
      this.$emit('add-to-cart', cartItem)

      // If using Vuex/Pinia:
      // this.$store.dispatch('cart/addItem', cartItem)

      console.log('Added to cart:', cartItem)
      alert(`Added ${this.quantity} ${this.productData.name} to cart!`)
    }
  }
}
</script>

<style scoped>
.product-detail-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 20px;
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
  color: #666;
}

.breadcrumb li:not(:last-child)::after {
  content: '>';
  margin-left: 8px;
}

.breadcrumb a {
  color: #666;
  text-decoration: none;
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
  margin-bottom: 60px;
}

/* Product Gallery */
.product-gallery {
  display: flex;
  gap: 16px;
}

.thumbnails {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.thumbnail {
  width: 100px;
  height: 100px;
  border: 2px solid #e5e5e5;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  background: white;
  padding: 0;
  transition: border-color 0.2s;
}

.thumbnail:hover,
.thumbnail.active {
  border-color: #000;
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.main-image {
  flex: 1;
  border-radius: 16px;
  overflow: hidden;
  background: #f5f5f5;
  max-height: 530px;
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
  gap: 20px;
}

.product-title {
  font-size: 32px;
  font-weight: 700;
  margin: 0;
  line-height: 1.2;
}

.rating {
  display: flex;
  align-items: center;
  gap: 12px;
}

.stars {
  display: flex;
  gap: 4px;
  color: #ddd;
  font-size: 20px;
}

.star.filled {
  color: #FFC107;
}

.rating-value {
  font-size: 14px;
  color: #666;
}

.price-section {
  display: flex;
  align-items: center;
  gap: 12px;
}

.current-price {
  font-size: 32px;
  font-weight: 700;
}

.original-price {
  font-size: 24px;
  color: #999;
  text-decoration: line-through;
}

.discount {
  background: #FFE8E8;
  color: #FF3333;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
}

.description {
  color: #666;
  line-height: 1.6;
  margin: 0;
}

/* Options */
.option-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.option-label {
  font-weight: 600;
  color: #666;
  font-size: 14px;
  text-transform: uppercase;
}

.color-options,
.size-options {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.color-option {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid #e5e5e5;
  cursor: pointer;
  position: relative;
  transition: all 0.2s;
  padding: 0;
}

.color-option:hover,
.color-option.active {
  border-color: #000;
  transform: scale(1.1);
}

.checkmark {
  color: white;
  font-size: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-shadow: 0 0 2px rgba(0,0,0,0.5);
}

.size-option {
  padding: 12px 24px;
  border: 1px solid #e5e5e5;
  border-radius: 24px;
  background: white;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
  font-size: 14px;
}

.size-option:hover,
.size-option.active {
  background: #000;
  color: white;
  border-color: #000;
}

/* Cart Actions */
.cart-actions {
  display: flex;
  gap: 16px;
  margin-top: 12px;
}

.quantity-selector {
  display: flex;
  align-items: center;
  background: #f5f5f5;
  border-radius: 24px;
  padding: 4px;
}

.quantity-selector button {
  width: 40px;
  height: 40px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 20px;
  border-radius: 50%;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.quantity-selector button:hover {
  background: #e5e5e5;
}

.quantity-selector input {
  width: 60px;
  text-align: center;
  border: none;
  background: transparent;
  font-weight: 600;
  font-size: 16px;
}

.add-to-cart-btn {
  flex: 1;
  background: #000;
  color: white;
  border: none;
  border-radius: 24px;
  padding: 16px 32px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.add-to-cart-btn:hover {
  background: #333;
}

/* Tabs */
.product-tabs {
  margin-bottom: 60px;
}

.tabs-header {
  display: flex;
  gap: 24px;
  border-bottom: 1px solid #e5e5e5;
  margin-bottom: 32px;
}

.tab-button {
  padding: 16px 0;
  border: none;
  background: transparent;
  font-size: 16px;
  font-weight: 500;
  color: #666;
  cursor: pointer;
  position: relative;
  transition: color 0.2s;
}

.tab-button:hover {
  color: #000;
}

.tab-button.active {
  color: #000;
  font-weight: 600;
}

.tab-button.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 2px;
  background: #000;
}

.tab-content {
  min-height: 300px;
}

.tab-panel h2 {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 24px;
}

.reviews-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.review-count {
  color: #666;
  font-weight: 400;
}

.write-review-btn {
  background: #000;
  color: white;
  border: none;
  border-radius: 24px;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.write-review-btn:hover {
  background: #333;
}

/* Responsive */
@media (max-width: 768px) {
  .product-detail {
    grid-template-columns: 1fr;
  }

  .product-gallery {
    flex-direction: column-reverse;
  }

  .thumbnails {
    flex-direction: row;
    overflow-x: auto;
  }

  .thumbnail {
    flex-shrink: 0;
  }

  .cart-actions {
    flex-direction: column;
  }

  .product-title {
    font-size: 24px;
  }

  .tabs-header {
    overflow-x: auto;
    white-space: nowrap;
  }
}
</style>

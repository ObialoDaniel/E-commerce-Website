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
            <span v-if="productData.originalPrice" class="original-price">${{ productData.originalPrice }}</span>
            <span v-if="productData.discount" class="discount"> {{ productData.discount }} %</span>
          </div>

          <!--Description-->
          <p class="description">{{ productData.description }}</p>

          <!--Color Selection-->
          <div class="option-group">
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
            <button class="add-to-cart-btn" @click="addToCart">Add to Cart</button>
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
              <p>{{ productData.description }}</p>
            </slot>
          </div>
          <!--Rating & Reviews Tab-->
          <div v-if="activeTab === 'Rating & Reviews'" class="tab-content">
            <slot name="reviews">
              <div class="reviews-header">
                <h2> All Reviews <span class="review-count">{{ productData.reviewCount }}</span></h2>
                <div class="reviews-controls">
                  <select v-model="sortOption" class="sort-dropdown">
                    <option value="latest">Latest</option>
                    <option value="highest">Highest Rated</option>
                    <option value="lowest">Lowest Rated</option>
                  </select>
              </div>
                <button class="write-review-btn">Write a Review</button>
              </div>
              <!-- Reviews Grid -->
              <div class="reviews-grid">
                <div
                  v-for="(review, index) in visibleReviews"
                  :key="index"
                  class="review-card"
                >
                  <div class="review-top">
                    <div class="stars">
                       <span v-for="star in 5"
                          :key="star" class="star"
                          :class="{
                            filled: star <= Math.floor(review.rating),
                            half: star === Math.ceil(review.rating) && review.rating % 1 !== 0
                          }">
                         ★
                        </span>
                    </div>
                    <button class="menu-btn">⋯</button>
                  </div>

                  <div class="review-author">
                    <span class="name">{{ review.name }}</span>
                    <Check v-if="review.verified" class="verified-icon" />
                  </div>

                  <p class="review-text">"{{ review.text }}"</p>
                  <p class="review-date">Posted on {{ review.date }}</p>
                </div>

              </div>
              <!-- Load more button -->
              <div class="load-more-container" v-if="visibleCount < reviews.length">
                <button class="load-more-btn" @click="loadMoreReviews">
                  Load More Reviews
                </button>
              </div>
            </slot>
          </div>
          <!--FAQS Tab-->
          <div v-if="activeTab === 'FAQs'" class="tab-content">
            <slot name="faqs">
              <h2> Frequently Asked Questions </h2>
            </slot>
          </div>
        </div>
      </section>
      <section class="you-might-like-section">
        <h2 class="you-might-like-title">YOU MIGHT ALSO LIKE</h2>

        <div class="similar-products-grid">
          <div v-for="product in products" :key="product.id" class="similar-product-card">
            <div class="similar-product-image">
              <img :src="product.image" :alt="product.name">
            </div>

            <div class="similar-product-info">
              <h3 class="similar-product-name">{{ product.name }}</h3>

              <div class="rating">
                <div class="stars">
                  <span v-for="star in 5" :key="star" class="star" :class="{
                    filled: star <= Math.floor(product.rating),
                    half: star === Math.ceil(product.rating) && product.rating % 1 !== 0
                  }">
                    ★
                  </span>
                </div>
                <span class="rating-value">{{ product.rating }}/5</span>
              </div>

              <div class="price-section">
                <span class="current-price">${{ product.price }}</span>
                <span v-if="product.originalPrice" class="original-price">${{ product.originalPrice }}</span>
                <span v-if="product.discount" class="discount">-{{ product.discount }}%</span>
              </div>
            </div>
          </div>
        </div>
     </section>
    </main>
    <AppFooter />
  </div>
</template>

<script>
import Check from "@/components/check.vue";

export default {
  name: 'CategoryPage',
  components: {Check},
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
      },

      selectedSort: "latest",
      visibleCount: 4,
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
          text:"The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
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

      products: [
        {
          id: 1,
          name: "Polo with Contrast Trims",
          image:'/src/assets/img/polo-contrast.png',
          rating: 4.0,
          price: 212,
          originalPrice: 242,
          discount: 20
        },
        {
          id: 2,
          name: "Gradient Graphic T-shirt",
          image: '/src/assets/img/gradient-tshirt.png',
          rating: 3.5,
          price: 145,
          originalPrice: null,
          discount: null
        },
        {
          id: 3,
          name: "Polo with Tipping Details",
          image: '/src/assets/img/polo-tipping.png',
          rating: 4.5,
          price: 180,
          originalPrice: null,
          discount: null
        },
        {
          id: 4,
          name: "Black Striped T-shirt",
          image: '/src/assets/img/stripped-tshirt.png',
          rating: 5.0,
          price: 120,
          originalPrice: 160,
          discount: 30
        }
      ]
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
    },

    sortedReviews() {
      const sorted = [...this.reviews];
      if (this.selectedSort === "latest") return sorted.reverse();
      if (this.selectedSort === "oldest") return sorted;
      if (this.selectedSort === "high") return sorted.sort((a, b) => b.rating - a.rating);
      if (this.selectedSort === "low") return sorted.sort((a, b) => a.rating - b.rating);
      return sorted;
    },
    visibleReviews() {
      return this.sortedReviews.slice(0, this.visibleCount);
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
      this.$emit('add-to-cart', cartItem)

      console.log('Added to cart:', cartItem)
      alert(`Added ${this.quantity} ${this.productData.name} to cart!`)
    },

    loadMore() {
      this.visibleCount += 2;
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
  margin-right: 8px;
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
  border-radius: 32px;
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
  border-radius: 32px;
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
.rewiews-header h2 {
  font-size: 24px;
  font-weight: 700;
  margin: 0;
}

.review-count {
  color: #666;
  font-weight: 400;
  font-size: 14px;
}

.actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.sort-dropdown select {
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-weight: 500;
  background: white;
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

.reviews-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
  gap: 24px;
  margin-bottom: 2rem;
}

.review-card {
  border: 1px solid #eee;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: box-shadow 0.2s;
}

.review-card:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.review-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stars {
  display: flex;
  color: #ffd700;
}

.star {
  color: #ddd;
  font-size: 20px;
}

.star.filled {
  color: #ffc107;
}


.star.half {
  background: linear-gradient(90deg, #ffc107 50%, #ddd 50%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.menu-btn {
  background: none;
  border: none;
  font-size: 20px;
  color: #999;
  cursor: pointer;
  transition: color 0.2s;
}

.menu-btn:hover {
  color: #000;
}

.review-author {
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 600;
}

.verified-icon {
  color: #4caf50;
  width: 18px;
  height: 18px;
}

.review-text {
  font-size: 14px;
  line-height: 1.6;
  color: #444;
}

.review-date {
  font-size: 13px;
  color: #777;
}

.load-more-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem 0 8rem 0;
  width: 100%;
}

.load-more-btn {
  background: none;
  border: 2px solid #eee;
  border-radius: 24px;
  padding: 12px 48px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.load-more-btn:hover {
  background: #000;
  color: #fff;
}

.you-might-like-title {
  text-align: center;
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 60px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.similar-products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px;
  margin: 2rem 0;
}

.similar-product-card {
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.3s ease;
  cursor: pointer;
}

.similar-product-card:hover {
  transform: translateY(-4px);
}

.similar-product-image {
  width: 100%;
  aspect-ratio: 1;
  overflow: hidden;
  background: #f5f5f5;
  border-radius: 16px;
}

.similar-product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.similar-product-info {
  padding: 16px 0;
}

.similar-product-name {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #000;
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

  .you-might-like-title {
    font-size: 32px;
    margin-bottom: 40px;
  }

  .similar-products-grid {
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 16px;
  }

  .similar-product-name {
    font-size: 16px;
  }
}
</style>

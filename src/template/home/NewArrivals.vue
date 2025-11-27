<template>
  <section class="new-arrivals-section">
    <div class="new-arrivals-container">
      <h2 class="section-title">NEW ARRIVALS</h2>

      <div class="products-grid">
        <router-link
          v-for="product in products"
          :key="product.id"
          :to="`/product/${product.id}`"
          class="product-card"
        >
          <div class="product-image-container">
            <img
              :src="product.imageUrl"
              :alt="product.name"
              class="product-image"
            />
          </div>

          <div class="product-info">
            <h3 class="product-name">{{ product.name }}</h3>

            <div class="product-rating">
              <div class="rating-stars">
                <span v-for="star in 5" :key="star" class="star">
                  <svg v-if="star <= Math.floor(product.rating)" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.5 0L11.6329 7.03647H18.9877L12.9274 11.3765L15.0603 18.4135L9.5 14.0735L3.93971 18.4135L6.07261 11.3765L0.012305 7.03647H7.36709L9.5 0Z" fill="#FFC633"/>
                  </svg>
                  <svg v-else-if="star === Math.ceil(product.rating) && product.rating % 1 !== 0" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient :id="'half-' + product.id + '-' + star">
                        <stop offset="50%" stop-color="#FFC633"/>
                        <stop offset="50%" stop-color="#D1D5DB"/>
                      </linearGradient>
                    </defs>
                    <path d="M9.5 0L11.6329 7.03647H18.9877L12.9274 11.3765L15.0603 18.4135L9.5 14.0735L3.93971 18.4135L6.07261 11.3765L0.012305 7.03647H7.36709L9.5 0Z" :fill="'url(#half-' + product.id + '-' + star + ')'"/>
                  </svg>
                  <svg v-else width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.5 0L11.6329 7.03647H18.9877L12.9274 11.3765L15.0603 18.4135L9.5 14.0735L3.93971 18.4135L6.07261 11.3765L0.012305 7.03647H7.36709L9.5 0Z" fill="#D1D5DB"/>
                  </svg>
                </span>
              </div>
              <span class="rating-value">{{ product.rating.toFixed(1) }}/5</span>
            </div>

            <div class="product-price">
              <span class="price-current">${{ product.price }}</span>
              <span v-if="product.originalPrice" class="price-original">
                ${{ product.originalPrice }}
              </span>
              <span v-if="product.discount" class="price-discount">
                -{{ product.discount }}%
              </span>
            </div>
          </div>
        </router-link>
      </div>

      <div class="view-all-container">
        <router-link to="/category" class="view-all-btn"> View All </router-link>
      </div>
    </div>
  </section>
</template>

<script>
import productsData from '@/data/products.json'
import starsImage from '@/assets/img/stars.png'
import TShirtImage from '@/assets/img/T-shirt.png'
import JeansImage from '@/assets/img/Jeans.png'
import CheckeredImage from '@/assets/img/checkered.png'
import SleeveImage from '@/assets/img/Sleeve.png'

export default {
  name: 'NewArrivals',
  data() {
    return {
      products: [],
      starsImage: starsImage
    }
  },
  mounted() {
    const imageMap = {
      'T-shirt.png': TShirtImage,
      'T-shirts.png': TShirtImage,
      'Jeans.png': JeansImage,
      'checkered.jpg': CheckeredImage,
      'Sleeve.png': SleeveImage
    }

    this.products = (productsData.newArrivals || []).map(product => {
      const filename = product.image ? product.image.split('/').pop() : ''
      return {
        ...product,
        imageUrl: imageMap[filename] || starsImage
      }
    })

    console.log('Products with images:', this.products)
  }
}
</script>

<style scoped>
.new-arrivals-section {
  padding: var(--space-5xl) 0;
  background-color: var(--color-bg-primary);
}

.new-arrivals-container {
  max-width: var(--container-max-width);
  margin: 0 auto;
  padding: 0 var(--container-padding);
}

.section-title {
  font-family: var(--font-primary);
  font-size: var(--font-size-category);
  font-weight: var(--font-weight-bold);
  text-align: center;
  color: var(--color-text-primary);
  margin-bottom: var(--space-3xl);
  text-transform: uppercase;
  letter-spacing: -0.02em;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-xl);
  margin-bottom: var(--space-xl);
}

.product-card {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  transition: transform var(--transition-normal);
}

.product-card:hover {
  transform: translateY(-4px);
}

.product-image-container {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  background-color: var(--color-bg-secondary);
  border-radius: var(--radius-xl);
  overflow: hidden;
  margin-bottom: var(--space-md);
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-normal);
}

.product-card:hover .product-image {
  transform: scale(1.05);
}

.product-info {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.product-name {
  font-family: var(--font-secondary);
  font-size: var(--font-size-product);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  line-height: var(--line-height-tight);
  margin-bottom: var(--space-xs);
}

.product-rating {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  margin-bottom: var(--space-xs);
}

.rating-stars {
  display: flex;
  gap: 4px;
}

.star {
  display: inline-flex;
}

.star svg {
  width: 19px;
  height: 19px;
}

.rating-value {
  font-family: var(--font-secondary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-regular);
  color: var(--color-text-primary);
}

.product-price {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  flex-wrap: wrap;
}

.price-current {
  font-family: var(--font-secondary);
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
}

.price-original {
  font-family: var(--font-secondary);
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-muted);
  text-decoration: line-through;
}

.price-discount {
  background-color: rgba(255, 51, 51, 0.1);
  color: #ff3333;
  font-family: var(--font-secondary);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  padding: 6px 14px;
  border-radius: var(--radius-full);
}

.view-all-container {
  display: flex;
  justify-content: center;
  margin-top: var(--space-2xl);
}

.view-all-btn {
  font-family: var(--font-secondary);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
  background-color: transparent;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: var(--space-md) var(--space-3xl);
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: all var(--transition-normal);
  text-decoration: none;
  display: inline-block;
}

.view-all-btn:hover {
  background-color: var(--color-text-primary);
  color: var(--color-bg-primary);
  border-color: var(--color-text-primary);
}

/* ===== RESPONSIVE ===== */
@media (max-width: 1280px) {
  .products-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 1024px) {
  .section-title {
    font-size: var(--font-size-3xl);
  }

  .products-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-lg);
  }

  .product-name {
    font-size: var(--font-size-lg);
  }

  .price-current,
  .price-original {
    font-size: var(--font-size-xl);
  }
}

@media (max-width: 768px) {
  .new-arrivals-section {
    padding: var(--space-3xl) 0;
  }

  .section-title {
    font-size: var(--font-size-2xl);
    margin-bottom: var(--space-2xl);
  }

  .products-grid {
    gap: var(--space-md);
  }

  .product-name {
    font-size: var(--font-size-base);
  }

  .price-current,
  .price-original {
    font-size: var(--font-size-lg);
  }

  .rating-stars {
    gap: 3px;
  }

  .star svg {
    width: 16px;
    height: 16px;
  }

  .rating-value {
    font-size: 12px;
  }
}

/* ===== MOBILE SWIPER (320px - 425px) ===== */
@media (min-width: 320px) and (max-width: 425px) {
  .new-arrivals-section {
    padding: 40px 0;
  }

  .new-arrivals-container {
    padding: 0;
  }

  .section-title {
    font-size: 32px;
    margin-bottom: 32px;
    padding: 0 16px;
  }

  .products-grid {
    display: flex;
    flex-wrap: nowrap;
    grid-template-columns: unset;
    gap: 16px;
    overflow-x: auto;
    overflow-y: hidden;
    scroll-behavior: smooth;
    scroll-snap-type: x mandatory;
    padding: 0 16px 20px 16px;
    margin-bottom: 24px;
    -webkit-overflow-scrolling: touch;

    /* Hide scrollbar */
    scrollbar-width: none;
    -ms-overflow-style: none;

  }

  .products-grid::-webkit-scrollbar {
    display: none;
  }

  .product-card {
    flex: 0 0 auto;
    width: 198px;
    scroll-snap-align: start;
  }

  .product-image-container {
    width: 198px;
    height: 200px;
    aspect-ratio: unset;
    border-radius: 20px;
    margin-bottom: 12px;
  }

  .product-name {
    font-size: 16px;
    font-weight: 700;
  }

  .product-rating {
    gap: 8px;
    margin-bottom: 8px;
  }

  .rating-stars {
    gap: 4px;
  }

  .star svg {
    width: 15px;
    height: 15px;
  }

  .rating-value {
    font-size: 14px;
  }

  .price-current {
    font-size: 24px;
  }

  .price-original {
    font-size: 24px;
  }

  .price-discount {
    font-size: 12px;
    padding: 6px 14px;
  }

  .view-all-container {
    padding: 0 16px;
    margin-top: 0;
  }

  .view-all-btn {
    width: 100%;
    text-align: center;
    padding: 16px;
    border-radius: 62px;
  }
}
</style>

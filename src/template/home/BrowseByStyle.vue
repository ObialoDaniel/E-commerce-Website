<template>
  <section class="browse-style-section">
    <div class="browse-style-container">
      <h1 class="section-title">BROWSE BY DRESS STYLE</h1>

      <div class="categories-grid">
        <router-link
          v-for="category in categories"
          :key="category.id"
          :to="`/category/${category.name.toLowerCase()}`"
          :class="['category-card', `category-${category.id}`]"
        >
          <div class="category-content">
            <h3 class="category-name">{{ category.name }}</h3>
            <div class="category-image-container">
              <img
                :src="category.imageUrl"
                :alt="category.name"
                class="category-image"
              />
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
import productsData from '@/data/products.json'
import CasualImage from '@/assets/img/Casual.png'
import FormalImage from '@/assets/img/Formal.png'
import PartyImage from '@/assets/img/Party.png'
import GymImage from '@/assets/img/Gym.png'

export default {
  name: 'BrowseByStyle',
  data() {
    return {
      categories: []
    }
  },
  mounted() {
    const imageMap = {
      'Casual.png': CasualImage,
      'Formal.png': FormalImage,
      'Party.png': PartyImage,
      'Gym.png': GymImage
    }

    this.categories = (productsData.browseByCategory || []).map(category => {
      const filename = category.image ? category.image.split('/').pop() : ''
      return {
        ...category,
        imageUrl: imageMap[filename] || CasualImage
      }
    })

    console.log('Categories loaded:', this.categories)
  }
}
</script>

<style scoped>
.browse-style-section {
  padding: 80px 0;
  background-color: #F0F0F0;
  border-radius: 40px;
  margin: 80px var(--container-padding) 0;
}

.browse-style-container {
  max-width: var(--container-max-width);
  margin: 0 auto;
  padding: 0 64px;
}

.section-title {
  font-family: var(--font-primary);
  font-size: 48px;
  font-weight: var(--font-weight-bold);
  text-align: center;
  color: var(--color-text-primary);
  margin-bottom: 64px;
  text-transform: uppercase;
  letter-spacing: -0.02em;
}

/* THE FIX: 3-column grid for diagonal alternating pattern */
.categories-grid {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 20px;
  height: 600px;
}

.category-card {
  position: relative;
  background-color: #FFFFFF;
  border-radius: 20px;
  overflow: hidden;
  text-decoration: none;
  transition: all 0.3s ease;
  display: flex;
  align-items: flex-start;
  padding: 0;
}

.category-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.category-content {
  position: relative;
  width: 100%;
  height: 100%;
}

.category-name {
  position: absolute;
  top: 25px;
  left: 36px;
  font-family: var(--font-secondary);
  font-size: 36px;
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  z-index: 10;
  margin: 0;
}

.category-image-container {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 40%;
  height: 100%;
  overflow: hidden;
}

.category-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
}

/* Specific grid positions - THE KEY FIX */
.category-1 {
  grid-column: 1;
  grid-row: 1;
}

.category-2 {
  grid-column: 2 / 4;
  grid-row: 1;
}

.category-3 {
  grid-column: 1 / 3;
  grid-row: 2;
}

.category-4 {
  grid-column: 3;
  grid-row: 2;
}


/* Custom image positioning per card */
/* Casual - Image on the right side */
.category-1 .category-image-container {
  left: auto;
  right: 0;
  width: 60%;
}

.category-1 .category-image {
  object-position: center center;
}

/* Formal - Image on the right side, takes more space */
.category-2 .category-image-container {
  left: auto;
  right: 0;
  width: 55%;
}

.category-2 .category-image {
  object-position: center center;
}

/* Party - Image on the right side */
.category-3 .category-image-container {
  left: auto;
  right: 0;
  width: 55%;
}

.category-3 .category-image {
  object-position: center center;
}

/* Gym - Image on the right side */
.category-4 .category-image-container {
  left: auto;
  right: 0;
  width: 60%;
}

.category-4 .category-image {
  object-position: center center;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 1280px) {
  .browse-style-container {
    padding: 0 48px;
  }

  .categories-grid {
    height: 550px;
    gap: 16px;
  }

  .section-title {
    font-size: 40px;
    margin-bottom: 48px;
  }

  .category-name {
    font-size: 32px;
    top: 20px;
    left: 28px;
  }
}

@media (max-width: 1024px) {
  .browse-style-section {
    padding: 60px 0;
    margin: 60px var(--container-padding) 0;
  }

  .browse-style-container {
    padding: 0 32px;
  }

  .section-title {
    font-size: 36px;
    margin-bottom: 40px;
  }

  .categories-grid {
    height: 500px;
    gap: 16px;
  }

  .category-name {
    font-size: 28px;
    top: 18px;
    left: 24px;
  }
}

@media (max-width: 768px) {
  .browse-style-section {
    padding: 48px 0;
    margin: 48px 16px 0;
    border-radius: 30px;
  }

  .browse-style-container {
    padding: 0 24px;
  }

  .section-title {
    font-size: 32px;
    margin-bottom: 32px;
  }

  .categories-grid {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, 200px);
    height: auto;
    gap: 12px;
  }

  .category-1,
  .category-2,
  .category-3,
  .category-4 {
    grid-column: 1 !important;
    grid-row: auto !important;
  }

  .category-name {
    font-size: 24px;
    top: 16px;
    left: 20px;
  }

  .category-image-container {
    left: auto !important;
    right: 0 !important;
    width: 65% !important;
  }
}
</style>

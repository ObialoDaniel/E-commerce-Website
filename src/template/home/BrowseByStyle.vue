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


.categories-grid {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 20px;
  height: 100vh;
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
  left: 10;
  height: 100%;
  overflow: hidden;
}

.category-image {
  width: 100%;
  object-fit: cover;
  object-position: center center;
  display:block;

}

/* Specific grid positions - THE KEY FIX */
.category-1 {
  grid-column:1/2 ;
  grid-row:1 ;
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

.category-1 .category-image-container {
  left: 50%;
  width: 100%;
  right:0;
  padding: 15px;
  overflow: visible;
  box-sizing: border-box;
}

.category-1 .category-image {
  transform: scale(2.0);
}

/* Formal - Image on the right side, takes more space */
.category-2 .category-image-container {
  left: 0;
  right: 0;
  width: 100%;
}

.category-2 .category-image {
  /* object-position: 100% 30% ; */
  transform: scale(1.8);
  margin-left: auto;
  width: 60%;
}

/* Party - Image on the right side */
.category-3 .category-image-container {
  left: 40%;
  right: 0;
}

.category-3 .category-image {
  object-position: 80% 0% ;
  transform: scale(1.8);
}

/* Gym - Image on the right side */
.category-4 .category-image-container {
  left: 0;
  right: -5px;
}

.category-4 .category-image {
  object-position: 70% 25%;
  transform: scale(1.6);
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

@media (min-width: 320px) and (max-width: 425px) {
  .browse-style-section {
    margin: 0 2px;
  }
  .browse-style-container {
    padding: 0 20px;
  }
  .categories-grid {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, 180px);
    gap: 14px;
  }

  .category-card {
    border-radius: 16px;
  }

  .category-name {
    font-size: 22px;
    top: 14px;
    left: 18px;
  }

  /* IMAGE CONTAINER FIX */
  .category-image-container {
    position: absolute;
    right: 0;
    width: 60% !important;
    height: 100%;
    overflow: hidden;
  }

  /* ---- INDIVIDUAL IMAGE FIXES ---- */

  /* Casual */
  .category-1 .category-image {
    transform: scale(2.55);
  }

  /* Formal */
  .category-2 .category-image {
    transform: scale(1.75);
    object-position: 75% center; 
    width: 100%;
  }

  /* Party */
  .category-3 .category-image {
    transform: scale(1.55);
    object-position: 80% 10%;
  }

  /* Gym */
  .category-4 .category-image {
    transform: scale(1.45);
    object-position: 70% center;
  }
}

</style>

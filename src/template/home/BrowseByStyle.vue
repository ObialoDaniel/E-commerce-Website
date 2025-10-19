<template>
  <section class="browse-style-section">
    <div class="browse-style-container">
      <h2 class="section-title">BROWSE BY DRESS STYLE</h2>

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
  padding: var(--space-5xl) 0;
  background-color: var(--color-bg-secondary);
  border-radius: var(--radius-2xl);
  margin: 0 var(--container-padding);
}

.browse-style-container {
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

.categories-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: var(--space-lg);
}

.category-card {
  position: relative;
  background-color: var(--color-bg-primary);
  border-radius: var(--radius-xl);
  overflow: hidden;
  text-decoration: none;
  transition: transform var(--transition-normal);
  min-height: 280px;
  display: flex;
}

.category-card:hover {
  transform: translateY(-4px);
}

/* Grid layout positioning */
.category-1 {
  grid-column: 1 / 2;
  grid-row: 1 / 2;
}

.category-2 {
  grid-column: 2 / 4;
  grid-row: 1 / 2;
}

.category-3 {
  grid-column: 1 / 3;
  grid-row: 2 / 3;
}

.category-4 {
  grid-column: 3 / 4;
  grid-row: 2 / 3;
}

.category-content {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-start;
  padding: var(--space-xl);
}

.category-name {
  font-family: var(--font-secondary);
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  z-index: 2;
  position: relative;
}

.category-image-container {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 60%;
  overflow: hidden;
  height: 400px;
}

.category-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  object-position: center;
  max-height: none;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 1024px) {
  .section-title {
    font-size: var(--font-size-3xl);
  }

  .categories-grid {
    gap: var(--space-md);
  }

  .category-card {
    min-height: 240px;
  }

  .category-name {
    font-size: var(--font-size-xl);
  }
}

@media (max-width: 768px) {
  .browse-style-section {
    padding: var(--space-3xl) 0;
    margin: 0 var(--space-md);
  }

  .section-title {
    font-size: var(--font-size-2xl);
    margin-bottom: var(--space-2xl);
  }

  .categories-grid {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }

  .category-1,
  .category-2,
  .category-3,
  .category-4 {
    grid-column: 1 / 2;
    grid-row: auto;
  }

  .category-card {
    min-height: 200px;
  }

  .category-name {
    font-size: var(--font-size-lg);
  }

  .category-content {
    padding: var(--space-lg);
  }
}

@media (max-width: 480px) {
  .section-title {
    font-size: var(--font-size-xl);
  }

  .category-card {
    min-height: 180px;
  }

  .category-name {
    font-size: var(--font-size-base);
  }

  .category-content {
    padding: var(--space-md);
  }

  .category-image-container {
    width: 50%;
  }
}
</style>

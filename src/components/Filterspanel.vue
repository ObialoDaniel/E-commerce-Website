<template>
  <div class="filters-panel">
    <!-- Header -->
    <div class="filters-header">
      <h2>Filters</h2>
     <button v-if="showCloseBtn" @click="$emit('close')" class="close-btn" aria-label="Close filters">
        <svg class="scissor-svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <line class="line-1" x1="18" y1="6" x2="6" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line class="line-2" x1="6" y1="6" x2="18" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
      <button v-else class="filter-icon" aria-label="Filters">
        <svg width="21" height="19" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.25 9V17.625C11.25 17.9234 11.1315 18.2095 10.9205 18.4205C10.7095 18.6315 10.4234 18.75 10.125 18.75C9.82663 18.75 9.54048 18.6315 9.3295 18.4205C9.11853 18.2095 9 17.9234 9 17.625V9C9 8.70163 9.11853 8.41548 9.3295 8.2045C9.54048 7.99353 9.82663 7.875 10.125 7.875C10.4234 7.875 10.7095 7.99353 10.9205 8.2045C11.1315 8.41548 11.25 8.70163 11.25 9ZM16.875 15.375C16.5766 15.375 16.2905 15.4935 16.0795 15.7045C15.8685 15.9155 15.75 16.2016 15.75 16.5V17.625C15.75 17.9234 15.8685 18.2095 16.0795 18.4205C16.2905 18.6315 16.5766 18.75 16.875 18.75C17.1734 18.75 17.4595 18.6315 17.6705 18.4205C17.8815 18.2095 18 17.9234 18 17.625V16.5C18 16.2016 17.8815 15.9155 17.6705 15.7045C17.4595 15.4935 17.1734 15.375 16.875 15.375ZM19.125 11.625H18V1.125C18 0.826631 17.8815 0.540483 17.6705 0.329505C17.4595 0.118526 17.1734 0 16.875 0C16.5766 0 16.2905 0.118526 16.0795 0.329505C15.8685 0.540483 15.75 0.826631 15.75 1.125V11.625H14.625C14.3266 11.625 14.0405 11.7435 13.8295 11.9545C13.6185 12.1655 13.5 12.4516 13.5 12.75C13.5 13.0484 13.6185 13.3345 13.8295 13.5455C14.0405 13.7565 14.3266 13.875 14.625 13.875H19.125C19.4234 13.875 19.7095 13.7565 19.9205 13.5455C20.1315 13.3345 20.25 13.0484 20.25 12.75C20.25 12.4516 20.1315 12.1655 19.9205 11.9545C19.7095 11.7435 19.4234 11.625 19.125 11.625ZM3.375 12.375C3.07663 12.375 2.79048 12.4935 2.5795 12.7045C2.36853 12.9155 2.25 13.2016 2.25 13.5V17.625C2.25 17.9234 2.36853 18.2095 2.5795 18.4205C2.79048 18.6315 3.07663 18.75 3.375 18.75C3.67337 18.75 3.95952 18.6315 4.1705 18.4205C4.38147 18.2095 4.5 17.9234 4.5 17.625V13.5C4.5 13.2016 4.38147 12.9155 4.1705 12.7045C3.95952 12.4935 3.67337 12.375 3.375 12.375ZM5.625 8.625H4.5V1.125C4.5 0.826631 4.38147 0.540483 4.1705 0.329505C3.95952 0.118526 3.67337 0 3.375 0C3.07663 0 2.79048 0.118526 2.5795 0.329505C2.36853 0.540483 2.25 0.826631 2.25 1.125V8.625H1.125C0.826631 8.625 0.540483 8.74353 0.329505 8.9545C0.118526 9.16548 0 9.45163 0 9.75C0 10.0484 0.118526 10.3345 0.329505 10.5455C0.540483 10.7565 0.826631 10.875 1.125 10.875H5.625C5.92337 10.875 6.20952 10.7565 6.4205 10.5455C6.63147 10.3345 6.75 10.0484 6.75 9.75C6.75 9.45163 6.63147 9.16548 6.4205 8.9545C6.20952 8.74353 5.92337 8.625 5.625 8.625ZM12.375 4.125H11.25V1.125C11.25 0.826631 11.1315 0.540483 10.9205 0.329505C10.7095 0.118526 10.4234 0 10.125 0C9.82663 0 9.54048 0.118526 9.3295 0.329505C9.11853 0.540483 9 0.826631 9 1.125V4.125H7.875C7.57663 4.125 7.29048 4.24353 7.0795 4.4545C6.86853 4.66548 6.75 4.95163 6.75 5.25C6.75 5.54837 6.86853 5.83452 7.0795 6.0455C7.29048 6.25647 7.57663 6.375 7.875 6.375H12.375C12.6734 6.375 12.9595 6.25647 13.1705 6.0455C13.3815 5.83452 13.5 5.54837 13.5 5.25C13.5 4.95163 13.3815 4.66548 13.1705 4.4545C12.9595 4.24353 12.6734 4.125 12.375 4.125Z" fill="black" fill-opacity="0.4"/>
        </svg>
      </button>
    </div>

    <!-- Categories -->
    <div class="filter-section">
      <div
        v-for="cat in categories"
        :key="cat"
        @click="$emit('toggle-category', cat)"
        :class="{ active: selectedCategories.includes(cat) }"
        class="filter-item clickable"
      >
        <span class="filter-label">{{ cat }}</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M6 12L10 8L6 4" stroke="currentColor" stroke-width="1.5"/>
        </svg>
      </div>
    </div>

    <hr>

    <!-- Price -->
    <div class="filter-section">
      <h3 class="filter-title">Price</h3>
      <div class="price-range">
        <div class="dual-range-wrapper">
          <div class="dual-range-track">
            <div class="dual-range-fill" :style="fillStyle"></div>
          </div>
          <input
            type="range"
            :min="minPrice"
            :max="maxPrice"
            :value="localMinPrice"
            @input="onMinInput"
            class="range-slider range-slider--min"
          >
          <input
            type="range"
            :min="minPrice"
            :max="maxPrice"
            :value="localMaxPrice"
            @input="onMaxInput"
            class="range-slider range-slider--max"
          >
        </div>
        <div class="price-labels">
          <span>${{ localMinPrice }}</span>
          <span>${{ localMaxPrice }}</span>
        </div>
      </div>
    </div>

    <hr>

    <!-- Colors -->
    <div class="filter-section">
      <h3 class="filter-title">Colors</h3>
      <div class="color-grid">
        <button
          v-for="color in colors"
          :key="color.name"
          :style="{ backgroundColor: color.hex }"
          :class="{ active: selectedColors.includes(color.name) }"
          @click="$emit('toggle-color', color.name)"
          class="color-option"
          :aria-label="color.name"
        >
          <svg v-if="selectedColors.includes(color.name)" width="14" height="14" viewBox="0 0 16 16" fill="none" :stroke="color.name === 'White' || color.name === 'Yellow' ? '#000' : 'white'" stroke-width="2.5">
            <path d="M3 8L6.5 11.5L13 5"/>
          </svg>
        </button>
      </div>
    </div>

    <hr>

    <!-- Size -->
    <div class="filter-section">
      <h3 class="filter-title">Size</h3>
      <div class="size-grid">
        <button
          v-for="size in sizes"
          :key="size"
          @click="$emit('toggle-size', size)"
          :class="{ active: selectedSizes.includes(size) }"
          class="size-option"
        >{{ size }}</button>
      </div>
    </div>

    <hr>

    <!-- Dress Style -->
    <div class="filter-section">
      <h3 class="filter-title">Dress Style</h3>
      <div
        v-for="style in dressStyles"
        :key="style"
        @click="$emit('toggle-style', style)"
        :class="{ active: selectedStyles.includes(style) }"
        class="filter-item clickable"
      >
        <span class="filter-label">{{ style }}</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M6 12L10 8L6 4" stroke="currentColor" stroke-width="1.5"/>
        </svg>
      </div>
    </div>

    <button @click="$emit('apply')" class="apply-filters-btn">Apply Filter</button>
  </div>
</template>

<script>
export default {
  name: 'FiltersPanel',
  emits: ['close', 'toggle-category', 'update-price', 'toggle-color', 'toggle-size', 'toggle-style', 'apply'],
  props: {
    categories:         { type: Array,   default: () => [] },
    selectedCategories: { type: Array,   default: () => [] },
    minPrice:           { type: Number,  default: 50 },
    maxPrice:           { type: Number,  default: 300 },
    priceMin:           { type: Number,  default: 50 },
    priceMax:           { type: Number,  default: 300 },
    colors:             { type: Array,   default: () => [] },
    selectedColors:     { type: Array,   default: () => [] },
    sizes:              { type: Array,   default: () => [] },
    selectedSizes:      { type: Array,   default: () => [] },
    dressStyles:        { type: Array,   default: () => [] },
    selectedStyles:     { type: Array,   default: () => [] },
    showCloseBtn:       { type: Boolean, default: false },
  },

  data() {
    return {
      localMinPrice: this.priceMin,
      localMaxPrice: this.priceMax,
    }
  },

  watch: {
    priceMin(val) { this.localMinPrice = val },
    priceMax(val) { this.localMaxPrice = val },
  },

  computed: {
    fillStyle() {
      const range = this.maxPrice - this.minPrice
      const left  = ((this.localMinPrice - this.minPrice) / range) * 100
      const right = ((this.maxPrice - this.localMaxPrice) / range) * 100
      return {
        left:  left  + '%',
        right: right + '%',
      }
    }
  },

  methods: {
    onMinInput(e) {
      const val = Number(e.target.value)
      if (val >= this.localMaxPrice) return
      this.localMinPrice = val
      this.$emit('update-price', { min: this.localMinPrice, max: this.localMaxPrice })
    },
    onMaxInput(e) {
      const val = Number(e.target.value)
      if (val <= this.localMinPrice) return
      this.localMaxPrice = val
      this.$emit('update-price', { min: this.localMinPrice, max: this.localMaxPrice })
    },
  }
}
</script>

<style scoped>
.filters-panel {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--space-xl);
  background-color: var(--color-bg-primary);
}

/* When inside the modal the border/radius is handled by the outer shell */
:deep(.modal-panel) .filters-panel {
  border: none;
  border-radius: 0;
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

.close-btn {
  background: var(--color-bg-secondary);
  border: none;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--color-text-primary);
}

.scissor-svg .line-1,
.scissor-svg .line-2 {
  transform-origin: center;
  transition: transform 1s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Hover — blades open */
.close-btn:hover .line-1 {
  transform: rotate(-20deg);
}
.close-btn:hover .line-2 {
  transform: rotate(20deg);
}

/* Click — blades snap shut */
.close-btn:active .line-1 {
  transform: rotate(20deg);
}
.close-btn:active .line-2 {
  transform: rotate(-20deg);
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
.filter-icon:hover { background: var(--color-border); }

.filter-section { margin-bottom: var(--space-xl); }

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
}
.filter-item.clickable {
  cursor: pointer;
  transition: all var(--transition-fast);
  border-radius: var(--radius-sm);
  padding: var(--space-sm) var(--space-xs);
  margin: 0 calc(-1 * var(--space-xs));
}
.filter-item.clickable:hover { background: var(--color-bg-secondary); }
.filter-item.active { background: var(--color-bg-secondary); }
.filter-item.active .filter-label { color: var(--color-text-primary); font-weight: var(--font-weight-semibold); }
.filter-label {
  font-family: var(--font-secondary);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}
.filter-item svg { color: var(--color-text-muted); }

hr { border: none; border-top: 1px solid var(--color-border); margin: var(--space-lg) 0; }

/* Price - dual thumb range slider */
.price-range { padding: var(--space-sm) 0; }

.dual-range-wrapper {
  position: relative;
  height: 20px;
  display: flex;
  align-items: center;
}

.dual-range-track {
  position: absolute;
  left: 0;
  right: 0;
  height: 5px;
  border-radius: 3px;
  background: #E5E5E5;
  pointer-events: none;
}

.dual-range-fill {
  position: absolute;
  top: 0;
  height: 100%;
  background: #000000;
  border-radius: 3px;
}

.range-slider {
  position: absolute;
  width: 100%;
  height: 5px;
  background: transparent;
  outline: none;
  -webkit-appearance: none;
  appearance: none;
  pointer-events: none;
  margin: 0;
}

.range-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #000000;
  cursor: pointer;
  border: 3px solid #ffffff;
  box-shadow: 0 1px 4px rgba(0,0,0,0.3);
  pointer-events: all;
}

.range-slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #000000;
  cursor: pointer;
  border: 3px solid #ffffff;
  box-shadow: 0 1px 4px rgba(0,0,0,0.3);
  pointer-events: all;
}

.range-slider--min { z-index: 3; }
.range-slider--max { z-index: 4; }

.price-labels {
  display: flex;
  justify-content: space-between;
  margin-top: var(--space-md);
  font-family: var(--font-secondary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
}

/* Colors */
.color-grid {
  display: flex;
  flex-wrap: wrap;
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
  flex-shrink: 0;
}
.color-option:hover   { transform: scale(1.1); }
.color-option.active  { border: 2.5px solid var(--color-text-primary); box-shadow: 0 0 0 1px var(--color-text-primary); }

/* Sizes - wrap freely like the design */
.size-grid {
  display: flex;
  flex-wrap: wrap;
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
  white-space: nowrap;
}
.size-option:hover  { background: var(--color-border); }
.size-option.active { background: var(--color-text-primary); color: var(--color-bg-primary); }

/* Apply button */
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
  transition: opacity var(--transition-fast);
}
.apply-filters-btn:hover { opacity: 0.9; }
</style>

<template>
  <section class="brands-section">
    <div class="brands-container">
      <div class="brands-content">
        <div class="brand-item">
          <VersaceLogo />
        </div>
        <div class="brand-item">
          <ZaraLogo />
        </div>
        <div class="brand-item">
          <GucciLogo />
        </div>
        <div class="brand-item">
          <PradaLogo />
        </div>
        <div class="brand-item">
          <CalvinLogo />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import VersaceLogo from '@/components/BrandLogos/VersaceLogo.vue';
import ZaraLogo from '@/components/BrandLogos/ZaraLogo.vue';
import PradaLogo from '@/components/BrandLogos/PradaLogo.vue';
import GucciLogo from '@/components/BrandLogos/GucciLogo.vue';
import CalvinLogo from '@/components/BrandLogos/CalvinLogo.vue';

export default {
  name: 'BrandsSection',
  components: {
    VersaceLogo,
    ZaraLogo,
    GucciLogo,
    PradaLogo,
    CalvinLogo
  },
}
</script>

<style scoped>
.brands-section {
  background-color: #000000;
  padding: 40px 0px;
}

.brands-container {
  max-width: 1200px;
  margin: 0 auto;
}

.brands-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 60px;
  flex-wrap: nowrap;
  overflow: visible;
}

.brand-item {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  height: 40px;
}

.brand-item :deep(svg) {
  color: #ffffff;
  opacity: 0.7;
  transition: all 0.3s ease;
  object-fit: contain;
}

.brand-item :deep(svg):hover {
  opacity: 1;
  transform: translateY(-2px);
}
</style>

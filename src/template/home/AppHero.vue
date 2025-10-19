<template>
  <section class="hero-section">
    <div class="hero-container">
      <div class ="hero-content">
        <h1 class="hero-title">FIND CLOTHES THAT MATCHES YOUR STYLE</h1>
        <P class="hero-description">
          Browse through our diverse range of meticulously crafted garments, designed to bring out your individaulity and cater to your sense of style.
        </P>
        <router-link to="/product" class="shop-now-btn">Shop Now</router-link>

        <div class="stats-section">
          <div class="stat-item">
            <div class="stat-number">200+</div>
            <div class="stat-label">International Brands</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">2,000+</div>
            <div class="stat-label">High-Quality Products</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">30,000+</div>
            <div class="stat-label">Happy Customers</div>
          </div>
        </div>
      </div>

      <div class="image-container">
        <div class="hero-image">
          <img src="@/assets/img/Hero-Image.jpg" alt="Fashion Model" class="model-image">
        </div>
      </div>

      <!-- <div class="diamond-overlay">
        <SmallDiamond class="sm-diamond" />
        <LargeDiamond class="lg-diamond" />
      </div> -->
   </div>
  </section>
</template>

<script>
// import LargeDiamond from '@/components/largeDiamond.vue';
// import SmallDiamond from '@/components/smallDiamond.vue';

export default {
  name: 'AppHero',
  // components:{
  //  SmallDiamond,
  //  LargeDiamond
  // }
}
</script>

<style scoped>
.hero-section {
  background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);
  padding: 0px 20px;
  min-height: 80vh;
  display: flex;
  align-items: center;
}

.hero-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

.hero-content {
  text-align: left;
}

.hero-title {
  font-size: 64px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #222;
  line-height: 64px;
}

.hero-description {
  font-size: 16px;
  color: #666;
  margin-bottom: 30px;
  line-height: 1.6;
  max-width: 560px;
}

.shop-now-btn {
  display: inline-block;
  background-color: #000;
  color: white;
  padding: 16px 54px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 30px;
  text-decoration: none;
  transition: all 0.3s ease;
  margin-bottom: 60px;
  gap: 12px;
}

.shop-now-btn:hover {
  background-color: #333;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.stats-section {
  display: flex;
  justify-content: space-between;
  max-width: 595px;
  margin-bottom: 0px;
}

.stat-item {
  margin-right: 30px;
}

.stat-number {
  font-size: 40px;
  font-weight: bold;
  color: #222;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 16px;
  color: #666;
}

.hero-image {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  overflow: hidden;
}

.image-container {
  position: relative;
  width: 100%;
  height: 600px;
  overflow: hidden;
  border-radius: 10px;
}

.model-image {
  width: 100%;
  height: auto;
  max-height: none;
  object-fit: cover;
  object-position: top center;
  border-radius: 10px;
}


</style>

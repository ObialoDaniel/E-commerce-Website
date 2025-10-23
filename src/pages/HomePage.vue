<template>
  <div class="homepage">
    <main>
      <AppHero />
      <BrandsSection />
      <NewArrivals />
      <TopSelling />
      <BrowseByStyle />
      <HappyCustomers />
    </main>
  </div>
</template>

<script>
import AppHero from '@/template/home/AppHero.vue';
import BrandsSection from '@/components/BrandLogo.vue';
import NewArrivals  from '@/template/home/NewArrivals.vue';
import TopSelling from '@/template/home/TopSelling.vue';
import BrowseByStyle from '@/template/home/BrowseByStyle.vue';
import HappyCustomers from '@/template/home/HappyCustomers.vue';

export default{
  name: 'HomePage',
  components: {
    AppHero,
    BrandsSection,
    NewArrivals,
    TopSelling,
    BrowseByStyle,
    HappyCustomers
  }
}
</script>

<style scoped>
.homepage {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}

</style>

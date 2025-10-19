import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import CategoryPage from '@/pages/CategoryPage.vue'
import ProductDetailPage from '@/pages/ProductDetailPage.vue'



const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,





    
    meta: {
        title: 'SHOP.CO - Home',
    }
  },

  {
    path: '/category' ,
    name: 'Category' ,
    component: CategoryPage,
    meta: {
        title: 'SHOP.CO - Browse Products',
    }
  },

  {
    path: '/category/:slug',
    name: 'CategoryByType',
    component: CategoryPage,
    meta: {
        title: 'SHOP.CO - Category',
    },
    props: true
  },

  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: ProductDetailPage,
    meta: {
      title: 'SHOP.CO - Product Details',
    },
    props: true
  },

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  }
})
export default router

import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import CategoryPage from '@/pages/CategoryPage.vue'
import ProductDetailPage from '@/pages/ProductDetailPage.vue'
import CartPage from '@/pages/CartPage.vue'
import NewArrivals from '@/template/home/NewArrivals.vue'
import ContactPage from '@/pages/ContactPage.vue'
import TopSelling from '@/template/home/TopSelling.vue'


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

  {
    path: '/cart',
    name: 'Cart',
    component: CartPage,
    meta: {
      title: 'SHOP.CO - Your Cart',
    }
  },

  {
    path: '/top-selling',
    name: 'TopSelling',
    component: TopSelling,
    meta: {
      title: 'SHOP.CO - Top Selling',
    }
  },

  {
    path: '/new-arrivals',
    name: 'NewArrivals',
    component: NewArrivals,
    meta: {
      title: 'SHOP.CO - New Arrivals',
    }
  },

  {
    path: '/contact',
    name: 'Contact',
    component: ContactPage,
    meta: {
      title: 'SHOP.CO - Contact Us',
    }
  },

  { path: '/terms',
    name: 'Terms',
    component: () => import('@/pages/TermsPage.vue')
  },

  { path: '/privacy',
    name: 'PrivacyPolicy',
    component: () => import('@/pages/PrivacyPolicyPage.vue')
  },

  { path: '/SignUp',
    name: 'SignUp',
    component: () => import('@/pages/SignUpPage.vue') }

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

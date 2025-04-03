import { createRouter, createWebHistory } from 'vue-router'
import ProductCatalog from '../components/ProductCatalog.vue';
import ShoppingCart from '../components/ShoppingCart.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ProductCatalog,
    },
    {
      path: '/cart',
      name: 'cart',
      component: ShoppingCart,
    },
  ],
  
})

export default router

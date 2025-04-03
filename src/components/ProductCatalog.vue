<template>
  <div class="product-page">
    <div class="filter-bar">
      <ProductSort @sort-change="handleSortChange" />
      <ProductFilter @category-change="handleCategoryChange" @search-change="handleSearchChange"
        :categories="categories" />
    </div>


    <div v-if="products.length === 0" class="product-empty">
      No products found
    </div>

    <div v-else class="product-grid">
      <ProductCard v-for="product in products" :key="product.id" :product="product" @addToCart="handleAddCart" />
    </div>

    <button class="go-to-cart-btn" @click="goToCart">
      🛒 Go to Cart ({{ cartStore.totalItems }})
    </button>
  </div>
</template>

<script setup>
import { useProductStore } from '../stores/productStore';
import { useCartStore } from '@/stores/cartStore'
import { useRouter } from 'vue-router'

import ProductSort from './ProductSort.vue';
import ProductFilter from './ProductFilter.vue';
import ProductCard from './ProductCard.vue';
import { storeToRefs } from 'pinia';


const productStore = useProductStore();
const cartStore = useCartStore()
const router = useRouter()


const { products,categories } = storeToRefs(productStore);


const handleSortChange = (newSort) => {
  productStore.setSortOption(newSort);
};

const handleCategoryChange = (newCategory) => {
  productStore.setCategory(newCategory);
};

const handleSearchChange = (searchTerm) => {
  productStore.setSearchQuery(searchTerm);
};

const handleAddCart = (newProduct) => {
  cartStore.addToCart(newProduct);
}

function goToCart() {
  router.push('/cart') // change if your cart route is different
}
</script>

<style scoped>
.product-page {
  padding: 2rem;
  max-width: 1200px;
  margin: auto;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.product-empty {
  text-align: center;
  margin-top: 3rem;
  font-size: 1.2rem;
  color: #999;
}

.go-to-cart-btn {
  margin-top: 2rem;
  padding: 0.75rem 1.5rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.go-to-cart-btn:hover {
  background-color: #2980b9;
}

.filter-bar {
  display: flex;
}
</style>

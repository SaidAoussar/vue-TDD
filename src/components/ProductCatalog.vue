<template>
  <ProductSort @sort-change="handleSortChange" />
  <ProductFilter @category-change="handleCategoryChange" @search-change="handleSearchChange" :categories="categories" />

  <div v-if="products.length === 0">
    No products found
  </div>
  <div v-else>
    <ProductCard v-for="product in products" :key="product.id" :product="product" />

  </div>




</template>

<script setup>
import { useProductStore } from '../stores/productStore';
import ProductSort from './ProductSort.vue';
import ProductFilter from './ProductFilter.vue';
import ProductCard from './ProductCard.vue';
import { storeToRefs } from 'pinia';


const productStore = useProductStore();
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




</script>
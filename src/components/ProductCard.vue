<template>
  <div >
    <h2>{{ product.name }}</h2>
    <p class="price">${{ product.price.toFixed(2) }}</p>
    <p class="rating">{{ product.rating }}</p>
    <img :src="product.images[0]" />
    <button @click="addToCart">Add to Cart</button>
  </div>
</template>

<script setup>

const props = defineProps(['product']);

const emit = defineEmits(['add-to-cart']);


function addToCart() {
  emit('add-to-cart', props.product);
}
</script>

<style scoped>
</style>

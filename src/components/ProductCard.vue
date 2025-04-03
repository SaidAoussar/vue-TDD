<template>
  <div class="product">
    <h2 class="name">{{ product.name }}</h2>
    <p class="price">$ {{ product.price.toFixed(2) }}</p>
    <p class="rating">⭐ {{ product.rating }}</p>
    <img :src="product.images[0]" class="image" />
    <button class="addBtn" @click="addToCart">Add to Cart</button>
  </div>
</template>

<script setup>

const props = defineProps(['product']);

const emit = defineEmits(['add-to-cart']);


function addToCart() {
  emit('add-to-cart',props.product);
}
</script>

<style scoped>
.product {
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 8px;
  width: 240px;
  text-align: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.2s ease;
}

.product:hover {
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
}

.name {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.price {
  color: #2ecc71;
  font-weight: bold;
  margin-bottom: 0.25rem;
}

.rating {
  font-size: 0.9rem;
  color: #f39c12;
  margin-bottom: 0.5rem;
}

.image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  margin-bottom: 1rem;
  border-radius: 4px;
}

.addBtn {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s ease;
}

.addBtn:hover {
  background-color: #2980b9;
}
</style>

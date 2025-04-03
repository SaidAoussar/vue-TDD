<template>
  <div class="product-filter">
    <select @change="onCategoryChange" :value="selectedCategory" data-test="category-select">
      <option value="" data-test="category-option">All Categories</option>
      <option v-for="category in categories" :key="category.id" :value="category.id" data-test="category-option">
        {{ category.name }}
      </option>
    </select>

    <input type="text" class="search-input" placeholder="Search products..." @input="onInput"
      data-test="search-input" />
  </div>
</template>

<script setup>
const props = defineProps(['categories','selectedCategory'])
const emit = defineEmits(['category-change','search-change'])

function onCategoryChange(event) {
  emit('category-change',event.target.value)
}

function onInput(event) {
  emit('search-change',event.target.value)
}
</script>

<style scoped>
.product-filter {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.search-input,
select {

  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: white;
  color: #333;
}
</style>

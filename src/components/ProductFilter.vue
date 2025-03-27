<template>
  <select>
    <option @click="updateCategory(category.id)" data-test="category-option">All Categories</option>
    <option v-for="category in props.categories" :key="category.id" :value="category.id" data-test="category-option" @click="updateCategory(category.id)">{{ category.name }}</option>
  </select>

  <input type="text" @input="onInput"/>
</template>

<script setup>
const props = defineProps(['categories','selectedCategory']);

const emit = defineEmits(['category-change','search-change']);


function updateCategory(value){
  emit("category-change", value);
}


const onInput = (event) => {
  emit('search-change', event.target.value);
};

</script>
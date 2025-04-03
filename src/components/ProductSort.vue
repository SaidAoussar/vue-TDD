<template>
  <div class="sort-wrapper">
    <select v-model="selectedSort" @change="updateSort" class="sort-select" data-test="sort-select">
      <option v-for="option in sortOptions" :key="option.value" :value="option.value"
        :class="{ active: option.value === selectedSort }" data-test="sort-option" @click="updateSort(option.value)">
        {{ option.name }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { ref,watch } from 'vue';

const props = defineProps({
  currentSort: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['sort-change']);

const sortOptions = [
  { name: 'Price: Low to High',value: 'price-asc' },
  { name: 'Price: High to Low',value: 'price-desc' },
  { name: 'Rating: High to Low',value: 'rating-desc' },
];

const selectedSort = ref(props.currentSort);

watch(() => props.currentSort,(newVal) => {
  selectedSort.value = newVal;
});

function updateSort(value) {
  emit('sort-change',value);
}
</script>


<style scoped>
.sort-wrapper {
  margin-bottom: 1.5rem;
  margin-right: 1rem;
}

.sort-select {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: white;
  color: #333;
  cursor: pointer;
}

.sort-select option {
  padding: 0.5rem;
}

.sort-select option.active {
  font-weight: bold;
  background-color: #f0f0f0;
}
</style>

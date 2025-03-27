<template>
  <select v-model="selectedSort" @change="updateSort" data-test="sort-select">
    <option
      v-for="option in sortOptions"
      :key="option.value"
      :value="option.value"
      :class="{ active: option.value === selectedSort }"
      data-test="sort-option"

      @click="updateSort(option.value)"
    >
      {{ option.name }}
    </option>
  </select>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  currentSort: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['sort-change']);

const sortOptions = [
  { name: 'Price: Low to High', value: 'price-asc' },
  { name: 'Price: High to Low', value: 'price-desc' },
  { name: 'Rating: High to Low', value: 'rating-desc' },
];

const selectedSort = ref(props.currentSort);

watch(() => props.currentSort, (newVal) => {
  selectedSort.value = newVal;
});

function updateSort(value) {
  emit('sort-change', value);
}
</script>

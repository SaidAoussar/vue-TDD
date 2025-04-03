<template>
  <div class="cartItem">
    <img :src="item.product.images[0]" :alt="item.product.name" class="image" />

    <div class="info">
      <h3 class="name">{{ item.product.name }}</h3>
      <p class="price">$ {{ item.product.price.toFixed(2) }}</p>

      <div class="quantity-section">
        <label for="quantity">Qty:</label>
        <input id="quantity" type="number" min="1" :value="item.quantity" @input="updateQuantity($event.target.value)"
          class="quantityInput" />
      </div>

      <p class="total">Total: $ {{ total.toFixed(2) }}</p>

      <button class="removeBtn" @click="removeItem">Remove</button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update-quantity','remove-item'])

const total = computed(() => props.item.product.price * props.item.quantity)

function updateQuantity(newQuantity) {
  const quantity = Number(newQuantity)
  emit('update-quantity',{
    productId: props.item.product.id,
    quantity
  })
}

function removeItem() {
  emit('remove-item',{
    productId: props.item.product.id
  })
}
</script>

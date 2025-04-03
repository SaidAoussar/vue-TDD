<template>
  <div class="cart-item">
    <img :src="item.product.images[0]" :alt="item.product.name" data-test="item-img" class="image" />

    <div class="info">
      <h3 class="name" data-test="item-name">
        {{ item.product.name }}
      </h3>

      <p class="price" data-test="item-price">
        ${{ item.product.price.toFixed(2) }}
      </p>

      <div class="quantity-section">
        <label for="quantity">Qty:</label>
        <input id="quantity" type="number" min="1" :value="item.quantity" @input="updateQuantity($event.target.value)"
          data-test="qte-input" class="quantity-input" />
      </div>

      <p class="total" data-test="item-total">
        Total: ${{ total.toFixed(2) }}
      </p>

      <button class="remove-btn" @click="removeItem" data-test="remove-btn">
        Remove
      </button>
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

<style scoped>
.cart-item {
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #ddd;
}

.image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
}

.info {
  flex: 1;
}

.name {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.price {
  color: #2ecc71;
  margin-bottom: 0.5rem;
}

.quantity-section {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.quantity-input {
  width: 60px;
  padding: 4px;
  text-align: center;
}

.total {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.remove-btn {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
}

.remove-btn:hover {
  background-color: #c0392b;
}
</style>

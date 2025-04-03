<template>
  <div class="summary">
    <h3 class="summary-title">Order Summary</h3>

    <div class="row">
      <span>Subtotal:</span>
      <span data-test="subtotal">{{ formatCurrency(subtotal) }}</span>
    </div>

    <div class="row">
      <span>Tax (8%):</span>
      <span data-test="tax">{{ formatCurrency(tax) }}</span>
    </div>

    <div class="row total">
      <span>Grand Total:</span>
      <span data-test="grand-total">{{ formatCurrency(grandTotal) }}</span>
    </div>

    <button class="checkout-btn" data-test="checkout-btn" @click="checkout">Checkout</button>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  cartItems: {
    type: Array,
    required: true
  }
})

const subtotal = computed(() =>
  props.cartItems.reduce((total,item) => {
    return total + item.product.price * item.quantity
  },0)
)

const tax = computed(() => subtotal.value * 0.08)
const grandTotal = computed(() => subtotal.value + tax.value)

function formatCurrency(amount) {
  return `$${amount.toFixed(2)}`
}

function checkout() {
  alert('Checkout functionality coming soon!')
}
</script>


<style scoped>
.summary {
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 6px;
  max-width: 300px;
  background-color: #fafafa;
}

.summary-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #333;
}

.row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
}

.total {
  font-weight: bold;
  margin-top: 1rem;
  font-size: 1rem;
}

.checkout-btn {
  width: 100%;
  padding: 0.6rem;
  background-color: #27ae60;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.checkout-btn:hover {
  background-color: #1e874b;
}
</style>
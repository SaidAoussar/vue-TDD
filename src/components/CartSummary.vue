<template>
  <div class="summary">
    <h3 class="summaryTitle">Order Summary</h3>

    <div class="row">
      <span>Subtotal:</span>
      <span>{{ formatCurrency(subtotal) }}</span>
    </div>

    <div class="row">
      <span>Tax (8%):</span>
      <span>{{ formatCurrency(tax) }}</span>
    </div>

    <div class="row total">
      <span>Grand Total:</span>
      <span>{{ formatCurrency(grandTotal) }}</span>
    </div>

    <button class="checkoutBtn" @click="checkout">Checkout</button>
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
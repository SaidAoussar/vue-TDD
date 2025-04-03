<template>
  <div class="shopping-cart">
    <h2 class="title">Your Cart ({{ cartStore.totalItems }} item<span v-if="cartStore.totalItems > 1">s</span>)</h2>

    <div v-if="cartStore.items.length > 0" class="cart-content">
      <div class="items">
        <CartItem v-for="item in cartStore.items" :key="item.product.id" :item="item"
          @update-quantity="handleQuantityUpdate" @remove-item="handleRemoveItem" />
      </div>

      <CartSummary :cart-items="cartStore.items" />
    </div>

    <div v-else class="empty-cart">
      <p>Your cart is empty.</p>
    </div>
    <button @click="goToProducts" class="continueb-tn">Continue Shopping</button>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cartStore'
import CartItem from '@/components/CartItem.vue'
import CartSummary from '@/components/CartSummary.vue'
import { useRouter } from 'vue-router'



const cartStore = useCartStore()
const router = useRouter()


console.log('Cart items:',cartStore.items);


function handleQuantityUpdate({ productId,quantity }) {
  cartStore.updateQuantity(productId,quantity)
}

function handleRemoveItem({ productId }) {
  cartStore.removeFromCart(productId)
}

function goToProducts() {
  router.push('/')
}
</script>
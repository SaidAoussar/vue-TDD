<template>
  <div class="shopping-cart">
    <h2 class="title" data-test="cart-title">
      Your Cart ({{ cartStore.totalItems }} item<span v-if="cartStore.totalItems > 1">s</span>)
    </h2>

    <div v-if="cartStore.items.length > 0" class="cart-content">
      <div class="items">
        <CartItem v-for="item in cartStore.items" :key="item.product.id" :item="item"
          @update-quantity="handleQuantityUpdate" @remove-item="handleRemoveItem" />
      </div>

      <CartSummary :cart-items="cartStore.items" />
    </div>

    <div v-else class="empty-cart" data-test="empty-cart">
      <p>Your cart is empty.</p>
    </div>

    <button @click="goToProducts" class="continue-btn" data-test="continue-btn">Continue Shopping</button>
  </div>

</template>

<script setup>
import { useCartStore } from '../stores/cartStore'
import CartItem from '../components/CartItem.vue'
import CartSummary from '../components/CartSummary.vue'
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

<style scoped>
.shopping-cart {
  padding: 2rem;
  max-width: 1000px;
  margin: auto;
}

.title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
}

.cart-content {
  display: flex;
  align-items: flex-start;
  gap: 2rem;
  flex-wrap: wrap;
}

.items {
  flex: 2;
  min-width: 60%;
}

.empty-cart {
  text-align: center;
  font-size: 1.1rem;
  margin-top: 3rem;
  color: #666;
}

.continue-btn {
  margin-top: 2rem;
  padding: 0.7rem 1.4rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.continue-btn:hover {
  background-color: #2980b9;
}
</style>
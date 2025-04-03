import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import ShoppingCart from '../../src/components/ShoppingCart.vue'
import { useCartStore } from '../../src/stores/cartStore'
import { createRouter, createWebHistory } from 'vue-router'



describe('ShoppingCart.vue', () => {
  let cartStore
  let router

  beforeEach(() => {
    setActivePinia(createPinia()) // set Pinia context
    cartStore = useCartStore()

    // Default state
    cartStore.items = []

    // Create test router
    router = createRouter({
      history: createWebHistory(),
      routes: [{ path: '/', name: 'home' }],
    })
  })

  it('renders empty cart message when no items', () => {
    const wrapper = mount(ShoppingCart, {
      global: {
        plugins: [router],
      },
    
    })

    const emptyMsg = wrapper.find('[data-test="empty-cart"]')
    expect(emptyMsg.exists()).toBe(true)
    expect(emptyMsg.text()).toContain('Your cart is empty.')
  })

  it('displays cart title with correct item count', async () => {

    const smartWatch = {
      id: 2,
      name: "Smart Fitness Watch",
      description:
        "Track your health metrics, workouts, and receive notifications on this sleek fitness watch.",
      price: 149.99,
      category: "electronics",
      rating: 4.5,
      inventory: 78,
      images: ["watch-front.jpg", "watch-side.jpg", "watch-app.jpg"],
      features: [
        "Heart rate monitoring",
        "Sleep tracking",
        "Water resistant to 50m",
        "7-day battery life",
        "GPS tracking",
      ],
      colors: ["black", "white", "green"],
    }

    cartStore.items = [
        { product: smartWatch, quantity: 3 }
    ]

    const wrapper = mount(ShoppingCart,{global: {
      plugins: [router],
    },
  })

    const title = wrapper.find('[data-test="cart-title"]')
    expect(title.exists()).toBe(true)
    expect(title.text()).toContain('Your Cart (3 items)')
  })

  it('navigates to / on "Continue Shopping" button click', async () => {
    const routerPush = vi.spyOn(router, 'push')

    const wrapper = mount(ShoppingCart, {
      global: {
        plugins: [router],
      },
    })

    await router.isReady() // wait for router to be ready

    const btn = wrapper.find('[data-test="continue-btn"]')
    await btn.trigger('click')

    expect(routerPush).toHaveBeenCalledWith('/')
  })
})

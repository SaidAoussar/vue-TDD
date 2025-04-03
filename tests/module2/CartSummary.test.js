import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import CartSummary from '../../src/components/CartSummary.vue'
import { formatCurrency } from '../../src/utils/formatCurrency'

describe('CartSummary.vue', () => {
  const cartItems = [
    {
      product: { id: 1, name: 'Item A', price: 100 },
      quantity: 2
    },
    {
      product: { id: 2, name: 'Item B', price: 50 },
      quantity: 1
    }
  ]

  const expectedSubtotal = 100 * 2 + 50 * 1 // 250
  const expectedTax = expectedSubtotal * 0.08 // 20
  const expectedTotal = expectedSubtotal + expectedTax // 270

  it('renders formatted subtotal, tax, and grand total using data-test', () => {
    const wrapper = mount(CartSummary, {
      props: {
        cartItems
      }
    })

    const subtotalEl = wrapper.find('[data-test="subtotal"]')
    const taxEl = wrapper.find('[data-test="tax"]')
    const totalEl = wrapper.find('[data-test="grand-total"]')

    expect(subtotalEl.exists()).toBe(true)
    expect(taxEl.exists()).toBe(true)
    expect(totalEl.exists()).toBe(true)

    expect(subtotalEl.text()).toBe(formatCurrency(expectedSubtotal))
    expect(taxEl.text()).toBe(formatCurrency(expectedTax))
    expect(totalEl.text()).toBe(formatCurrency(expectedTotal))
  })

  it('calls alert on checkout button click', async () => {
    const mockAlert = vi.fn()
    window.alert = mockAlert

    const wrapper = mount(CartSummary, {
      props: {
        cartItems
      }
    })

    const button = wrapper.find('[data-test="checkout-btn"]')
    expect(button.exists()).toBe(true)

    await button.trigger('click')
    expect(mockAlert).toHaveBeenCalledWith('Checkout functionality coming soon!')
  })
})

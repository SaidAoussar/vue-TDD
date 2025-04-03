import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils"
import { products } from "../../mock-data/products";
import { formatCurrency } from "./../../src/utils/formatCurrency";

describe("CartItem.vue",  () => {
  it("renders cart item information correctly", async () => {
    let CartItem;
    try {
      CartItem = (await import("./../../src/components/CartItem.vue")).default
    } catch (error) {
      expect.fail("CartItem.vue component not found.Create this compoenent first");
    }
    const product = products[0]; 
    const cartItem = {product, quantity: 2};
    const wrapper = mount(CartItem, {
      props:{
        item:cartItem
      }
    });

    // item name
    const nameEl = wrapper.find('[data-test="item-name"]');
    expect(nameEl.exists()).toBe(true);
    expect(nameEl.text()).toBe(product.name); 

    //price
    const formattedItemPrice = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(product.price);

    const formattedPrice = formatCurrency(product.price, 'USD', 'en-US');
    const priceEl = wrapper.find('[data-test="item-price"]');
    expect(priceEl.exists()).toBe(true);
    expect(priceEl.text()).toBe(formattedPrice);

    //image
    const imgEl = wrapper.find('[data-test="item-img"]');
    expect(imgEl.exists()).toBe(true);
    expect(imgEl.attributes('src')).toBe(product.images[0]);

    // qte input
    const priceInputEl = wrapper.find('[data-test="qte-input"]')
    expect(priceInputEl.exists()).toBe(true);
    expect(priceInputEl.attributes('value')).toBe(cartItem.quantity.toString());

    //total
    const total = cartItem.quantity * cartItem.product.price;
    const formattedTotal = formatCurrency(total, 'USD', 'en-US');
    const totalEl = wrapper.find('[data-test="item-total"]');
    expect(totalEl.exists()).toBe(true);
    expect(totalEl.text()).toContain(formattedTotal);

    // remove btn

    const removeBtn = wrapper.find('[data-test="remove-btn"]');
    expect(removeBtn.exists()).toBe(true);
    expect(removeBtn.text().toLowerCase()).toContain('remove');

    await removeBtn.trigger('click');

    expect(wrapper.emitted('remove-item')).toBeTruthy();
    expect(wrapper.emitted('remove-item')[0][0]).toEqual({
      productId: product.id,
    });
   

  })
})


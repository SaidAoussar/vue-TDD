import { defineStore } from "pinia";


export const useCartStore = defineStore("cartStore", {
  state: () => ({
    items: JSON.parse(localStorage.getItem('cart-items') || '[]'),
  }),

  actions: {

    addToCart(product){

      const itemExist = this.items.find((item) => item.product.id ===product.id);
      if(itemExist){
        itemExist.quantity ++;
        
      }else{
        this.items = [...this.items, {product, quantity: 1}];
      }
      this.saveCartToStorage();

    },

    updateQuantity(id, qte){
      const itemExist = this.items.find((item) => item.product.id ===id);

      if(qte === 0){
        this.removeFromCart(id)
      }else{
        itemExist.quantity = qte;
        this.saveCartToStorage();       
      }
    },
    removeFromCart(id){
      this.items = this.items.filter((item) => item.product.id !== id);
      this.saveCartToStorage()
    }, 
    clearCart(){
      this.items = [];
      this.saveCartToStorage()

    },

    saveCartToStorage() {
      localStorage.setItem('cart-items', JSON.stringify(this.items))
    }
  },

  getters: {
    totalItems : (state) => {
      return state.items.reduce((sum,item) => sum + item.quantity,0);
    },
    subtotal: (state) =>{
      return state.items.reduce((sum , item) => sum + (item.quantity * item.product.price), 0);
    }, 
    tax: (state) => {
      return state.subtotal * 0.08;
    },
    grandTotal: (state)=>{
      return state.subtotal + state.tax;
    }
  },
});
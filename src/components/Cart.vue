<template>
  <div>
    <nav>
      <router-link to="/">Main</router-link>
      |
      <router-link to="/cart">Cart</router-link>
      |
      <router-link to="/order">My orders</router-link>
    </nav>
    <div>
      <h1>Orders</h1>
      <div v-if="productsCart.length === 0">
        <p>Empty!</p>
      </div>
      <div>
        <div v-for="product in productsCart" :key="product.id">
      <span>
        <div>
          {{ product.name }}
        </div>
        <div>
            <span>
            {{ product.description }}
          </span>
          <p>
            {{ product.price }}rub.
          </p>
          <div>
            <div>
              <button @click="removeQuantity">-</button>
              <button @click="addQuantity">+</button>
              <p>In-stock: {{ quantity }}</p>
            </div>
            <button @click="removeFromCart(product)" type="submit">Delete</button>
          </div>
        </div>
      </span>
        </div>
      </div>
      <div>
        <button v-if="productsCart.length !== 0" @click="goBack">Back</button>
        <button v-if="productsCart.length !== 0" @click="addToMyOrder(product)" type="submit">Order</button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Cart',
  data() {
    return {
      productsCart: [],
      myOrder: [],
      quantity: 1,
    };
  },
  created() {
    this.getProductCart();
  },
  mounted() {
    if (localStorage.getItem('quantity')) {
      this.quantity = JSON.parse(localStorage.getItem('quantity'));
    }
  },
  methods: {
    async getProductCart() {
      const localToken = localStorage.getItem('userToken');
      if (!localToken) {
        return;
      }
      const url = "https://jurapro.bhuser.ru/api-shop/cart";
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${localToken}`
        },

      });
      if (response.ok) {
        const result = await response.json();
        this.productsCart = result.data

      }

    },
    async removeFromCart(product) {

      const userToken = localStorage.getItem('userToken');
      if (!userToken) {
        return;
      }

      const url = `https://jurapro.bhuser.ru/api-shop/cart/${product.id}`;
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {

          "Authorization": `Bearer ${userToken}`
        }
      });
      if (response.ok) {
        location.reload();
      }
    },

    async addToMyOrder(product) {
      const url = 'https://jurapro.bhuser.ru/api-shop/order';
      const userToken = localStorage.getItem('userToken');
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${userToken}`
        }
      });
      if (response.ok) {
        const existingItemIndex = this.myOrder.findIndex(item => item.id === product.id);
        if (existingItemIndex !== -1 && this.productExists(this.myOrder[existingItemIndex], product)) {
          this.myOrder[existingItemIndex].quantity++;
        } else {
          this.myOrder.push({...product});
        }
        this.$router.push('/orders');
      }
    },
    productExists(item1, item2) {
      return item1.id === item2.id && item1.name === item2.name && item1.description === item2.description && item1.price === item2.price;
    },
    goBack() {
      this.$router.push('/');
    },
    addQuantity() {
      this.quantity++;
      this.save();
    },
    removeQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
        this.save();
      }
    },
    save() {
      localStorage.setItem('quantity', JSON.stringify(this.quantity));
    }
  }
}
</script>

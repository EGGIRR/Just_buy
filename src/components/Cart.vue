<template>
  <div>
    <nav>
      <router-link to="/">Main</router-link>
      <router-link to="/cart">Cart</router-link>
      <router-link to="/orders">My orders</router-link>
    </nav>
    <div>
      <h1>Orders</h1>
      <div v-if="productsCart.length === 0">
        <p>Empty!</p>
      </div>
      <div>
        <div v-for="product in productsCart" :key="product.id">
          <div v-if="product.quantity !== 0">
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
            <button @click="removeFromCart(product)">-</button>
            <span>{{ product.quantity }}</span>
            <button @click="incrementQuantity(product)">+</button>
          </div>
        </div>
      </span>
          </div>
        </div>
        <div>
          <button v-if="productsCart.length !== 0" @click="toMain">Back</button>
          <button v-if="productsCart.length !== 0" @click="addToMyOrder(product)" type="submit">Order</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {thisUrl} from "@/utils/api";

export default {
  name: 'Cart',
  data() {
    return {
      productsCart: [],
      myOrder: [],
      quantity: 1
    };
  },
  created() {
    this.getProductCart();
  },
  methods: {
    async getProductCart() {
      const localToken = localStorage.getItem('userToken');
      if (!localToken) {
        return;
      }
      const url = thisUrl() + "/cart";
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${localToken}`
        },
      });
      if (response.ok) {
        const result = await response.json();
        const productsInCart = {};
        result.data.forEach(product => {
          if (productsInCart[product.product_id]) {
            productsInCart[product.product_id].quantity++;
          } else {
            productsInCart[product.product_id] = {...product, quantity: 1};
          }
        });
        this.productsCart = Object.values(productsInCart);
      }
    },
    async removeFromCart(product) {
      const userToken = localStorage.getItem('userToken');
      if (!userToken) {
        return;
      }

      const url = thisUrl() + `/cart/${product.id}`;
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {

          "Authorization": `Bearer ${userToken}`
        }
      });
      if (response.ok) {
        product.quantity--;
        product.id++
      }
    },
    async incrementQuantity(product) {
      const userToken = localStorage.getItem('userToken');
      if (!userToken) {
        return;
      }
      const url = thisUrl() + `/cart/${product.product_id}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {

          "Authorization": `Bearer ${userToken}`
        }
      });
      if (response.ok) {
        product.quantity++
      }
    },

    async addToMyOrder(product) {
      const url = thisUrl() + '/order';
      const userToken = localStorage.getItem('userToken');
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${userToken}`
        }
      });
      if (response.ok) {
        this.$router.push('/orders');
      }
    },
    toMain() {
      this.$router.push('/');
    },

  },
}
</script>

<template>
  <div class="menu">
    <nav>
      <router-link to="/">Main</router-link>
      <span v-if="!isAuthenticated">
          <router-link to="/registration">Sing up</router-link>
          <router-link to="/login">Sign in</router-link>
        </span>
      <span v-if="isAuthenticated">
          <router-link to="/" @click="logout">Sign out</router-link>
          <router-link to="/cart">Cart</router-link>
          <router-link to="/orders">My orders</router-link>
        </span>
    </nav>
  </div>

  <div class="products">
    <h1>Product list:</h1>
    <div>
      <div v-for="product in products" :key="product.id">
        <span>
          <div>
            <h2>{{ product.name }}</h2>
          </div>
          <div>
            <span>{{ product.description }}</span>
            <p>{{ product.price }}rub.</p>
            <button v-if="isAuthenticated" @click="addToCart(product)" type="submit" class="btn">Add to cart</button>
          </div>
          <div v-if="added">
            <p>Added to cart!</p>
          </div>
          </span>
      </div>
    </div>
  </div>
</template>

<script>
import {thisUrl} from "@/utils/api";

export default {
  name: 'HomeView',
  data() {
    return {
      products: [],
      productsInCart: [],
      added: false
    }

  },
  created() {
    this.getProduct();
  },
  methods: {
    async getProduct() {
      const url = thisUrl() + "/products";
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },

      });
      if (response.ok) {
        const result = await response.json();
        this.products = result.data
      } else {
        this.error = "Error";
      }
    },
    async addToCart(product) {
      const productId = product.id;
      const url = thisUrl() + `/cart/${productId}`;
      const userToken = localStorage.getItem('userToken');
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${userToken}`
        }
      });
      if (response.ok) {
        const existingItemIndex = this.productsInCart.findIndex(item => item.product_id === product.product_id);
        if (existingItemIndex !== -1) {
          this.productsInCart[existingItemIndex].quantity++;
        } else {
          this.productsInCart.push({product, quantity: 1});
        }
        this.added = true;
        setTimeout(() => {
          this.added = false;
        }, 2000);
      }
    },
    logout() {
      localStorage.removeItem('userToken');
      this.$router.push('/');
      location.reload();
    }
  },
  computed: {
    isAuthenticated() {
      return !!localStorage.getItem('userToken');
    }
  }

}
</script>


<style>
.menu{
  width: 350px;
  height: 50px;
  display: flex;
  flex-direction: row;
  margin-left: 40%;
  background-color: lightblue;
  border-radius: 2em;
  padding-left: 22px;
  padding-top: 20px;
}
.menu > nav{
  font-size: 24px;
}
.menu > nav > a{
  text-decoration: none;
  color: black;
}

.menu > nav > span > a{
  text-decoration: none;
  margin-left: 16px;
  color: black;
}
.products{
  font-size: 24px;
  width: 540px;
}
</style>
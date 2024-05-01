<template>
  <div class="home">
    <nav>
      <router-link to="/">Main</router-link>
      |
      <span v-if="!isAuthenticated">
          <router-link to="/registration">Sing up</router-link> |
          <router-link to="/login">Sign in</router-link>
        </span>
      <span v-if="isAuthenticated">
          <router-link to="/" @click="logout">Sign out</router-link> |
          <router-link to="/cart">Cart</router-link> |
          <router-link to="/order">My orders</router-link>
        </span>
    </nav>
  </div>

  <div>
    <h1>Каталог товаров</h1>
    <div>
      <div v-for="product in products" :key="product.id">
        <span>
          <div>
            <h2>{{ product.name }}</h2>
          </div>
          <div>
            <span>{{ product.description }}</span>
            <p>{{ product.price }}rub.</p>
            <button v-if="isAuthenticated" @click="addToCart(product)" type="submit" class="btn">В корзину</button>
          </div>
        </span>
      </div>
    </div>
  </div>

  <div class="show" v-if="showBlock">
    <p>Товар успешно добавлен в корзину!</p>
  </div>
</template>

<script>

export default {
  name: 'HomeView',
  data() {
    return {
      products: [],
      productsInCart: [],
      showBlock: false
    }

  },
  created() {
    this.getProduct();
  },
  methods: {
    async getProduct() {
      const url = "https://jurapro.bhuser.ru/api-shop/products";
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },

      });
      if (response.ok) {
        const result = await response.json();
        this.products = result.data
        console.log('Result: ', result)
      } else {
        this.error = "Error";
        console.error(this.error);
      }
    },
    async addToCart(product) {
      const productId = product.id;
      const url = `https://jurapro.bhuser.ru/api-shop/cart/${productId}`;
      const userToken = localStorage.getItem('userToken');
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${userToken}`
          }
        });
        if (response.ok) {
          const existingItemIndex = this.productsInCart.find(item => item.id === product.id);
          if (existingItemIndex) {
            existingItemIndex.quantity++;
          } else {
            this.productsInCart.push({...product, quantity: 1});
          }
          const data = await response.json();
          console.log(data.data.message);
          this.showBlock = true;
          setTimeout(() => {
            this.showBlock = false;
          }, 2000);
        } else {
          console.error("Error when added to cart:", response.statusText);
        }
      } catch (error) {
        console.error("Error when added to cart:", error);
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
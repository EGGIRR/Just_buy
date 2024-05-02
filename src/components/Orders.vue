<template>
  <div>
    <nav>
      <router-link to="/">Main</router-link> |
      <router-link to="/cart">Cart</router-link> |
      <router-link to="/orders">My orders</router-link>
    </nav>
    <div>
      <div v-if="Orders.length === 0">
        <p>Empty!</p>
      </div>
      <div>
        <div v-for="order in Orders" :key="order.id">
      <span>
        <div><p>Order №{{order.id}}</p></div>
        <div>
          <span>
          Products: {{ order.products.length}}
        </span>
          <p class="price">
            Cost: {{ order.order_price }}rub.
          </p>
        </div>
      </span>
        </div>
      </div>
      <button v-if="Orders.length !== 0" @click="toMain">Back</button>
    </div>
  </div>
</template>


<script >
import {thisUrl} from "@/utils/api";
import Cart from "./Cart.vue";
export default {
  computed: {
    Cart() {
      return Cart
    }
  },
  data() {
    return {
      Orders:[],
    }
  },
  created() {
    this.getProductOrder();
  },
  methods: {
    async getProductOrder(){
      const localToken = localStorage.getItem('userToken');
      if(!localToken){
        return;
      }
      const url = thisUrl() + "/order";
      const response = await fetch(url,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${localToken}`
        },

      });
      if (response.ok) {
        const result = await response.json();
        this.Orders = result.data
      }
    },
    toMain(){
      this.$router.push('/');
    },

  }
}
</script>
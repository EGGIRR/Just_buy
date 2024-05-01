<template>
  <div class="home">
    <nav>
      <router-link to="/">Main</router-link> |
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
</template>

<script>

export default {
  name: 'HomeView',

  methods:{
    logout(){
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
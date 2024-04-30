<template>
  <div class="home">

    <nav>
      <router-link to="/">Главная</router-link> |
      <span v-if="!isAuthenticated">
          <router-link to="/registration">Регистрация</router-link> |
          <router-link to="/login">Вход</router-link>
        </span>
      <span v-if="isAuthenticated">
          <router-link to="/" @click="logout">Выход</router-link> |
          <router-link to="/cart">Корзина</router-link> |
          <router-link to="/order">Мои заказы</router-link>
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
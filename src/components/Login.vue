<template>
  <div>
    <nav>
      <router-link to="/">Главная</router-link> |
      <router-link to="/registration">Регистрация</router-link> |
      <router-link to="/login">Вход</router-link>
    </nav>
    <h1>Вход</h1>
    <div class="form-login">
      <form @submit.prevent="login" class="login">
        <input type="email" v-model="email" placeholder="email">
        <input type="password" v-model="password" placeholder="Password">

        <div class="buttons">
          <button class="btn_login" @click="goBack">Назад</button>
          <button class="btn_login" type="submit">Вход</button>
        </div>
      </form>

    </div>
    <div class="show-error" v-if="showBlock">
      {{ error}}
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {

      email: '',
      password: '',
      error: '',
      showBlock: false

    }
  },
  methods: {
    async login() {
      const url = "https://jurapro.bhuser.ru/api-shop/login";
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: this.email,
          password: this.password
        })
      });
      if (response.ok) {
        const userToken = await response.json();
        localStorage.setItem('userToken', userToken.data.user_token);
        this.$router.push('/'); // Перенаправляем пользователя на главную страницу
      } else {
        this.error='Неверные учетные данные'
        this.email=''
        this.password=''
        this.showBlock = true;
        setTimeout(() => {
          this.showBlock = false;
        }, 3000);
        console.error('Ошибка:', this.error);
      }

    },
    goBack(){
      this.$router.push('/');
    }

  }
}
</script>
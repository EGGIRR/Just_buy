<template>
  <div>
    <nav>
      <router-link to="/">Main</router-link>
      |
      <router-link to="/registration">Sign up</router-link>
    </nav>
    <h1>Sign up</h1>
    <div>
      <form @submit.prevent="register" class="register">
        <input v-model="fio" placeholder="fio">
        <input v-model="email" placeholder="email">
        <input v-model="password" placeholder="Password">
        <div>
          <button @click="toMain">Back</button>
          <button type="submit">Sign up</button>
        </div>

      </form>

    </div>
    <div v-if="errors">
      {{ error }}
    </div>
  </div>
</template>

<script>
import {thisUrl} from "@/utils/api";
export default {
  data() {
    return {
      fio: '',
      email: '',
      password: '',
      error: '',
      errors: ''
    }
  },
  methods: {
    async register() {
      const url = thisUrl() + "/signup";
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fio: this.fio,
          email: this.email,
          password: this.password
        })
      });
      if (response.ok) {
        this.$router.push('/login');
      } else {
        this.error = "Failed sign up";
        this.fio = ''
        this.email = ''
        this.password = ''
        this.errors = true;
        setTimeout(() => {
          this.errors = false;
        }, 3000);
      }
    },
    toMain() {
      this.$router.push('/');
    }
  }
}
</script>
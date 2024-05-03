<template>
  <div>
    <nav>
      <router-link to="/">Main</router-link>
      <router-link to="/registration">Sign up</router-link>
      <router-link to="/login">Sign in</router-link>
    </nav>
    <h1>Sigh in</h1>
    <div>
      <form @submit.prevent="login">
        <input type="email" v-model="email" placeholder="email">
        <input type="password" v-model="password" placeholder="Password">
        <div>
          <button @click="toMain">Back</button>
          <button type="submit">Login</button>
        </div>
      </form>

    </div>
    <div class="show-error" v-if="errors">
      {{ errorsMessage }}
    </div>

  </div>
</template>

<script>

import {thisUrl} from "@/utils/api";

export default {
  data() {
    return {

      email: '',
      password: '',
      errorsMessage: [],
      errors: false
    }
  },
  methods: {
    async login() {
      const url = thisUrl() + "/login";
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
        this.$router.push('/');
      } else {
        if(this.email !== ''){
          this.errorsMessage = []
          this.errorsMessage.push("Wrong email")
        }else{
          this.errorsMessage = []
          this.errorsMessage.push("Email required")
        }
        if(this.password === ''){
          this.errorsMessage.push("Password required")
        } else {
          this.errorsMessage.push("Wrong password")
        }
        this.email = ''
        this.password = ''
        this.errors = true;
        setTimeout(() => {
          this.errors = false;
        }, 5000);
      }

    },
    toMain() {
      this.$router.push('/');
    }
  }
}
</script>
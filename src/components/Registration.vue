<template>
  <div>
    <nav>
      <router-link to="/">Main</router-link>
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
      {{ errorsMessage }}
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
      errorsMessage: [],
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
        if(this.fio === ''){
          this.errorsMessage = []
          this.errorsMessage.push("FIO required")
        }
        if(this.email === ''){
          this.errorsMessage.push("Email required")
        }
        if(this.password === ''){
          this.errorsMessage.push("Password required")
        } else if(this.password.length < 6){
          this.errorsMessage.push("Password should be 6 or more symbols");
        } else {
          this.errorsMessage.push("Wrong password")
        }
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
<template>
  <div class="page">
    <h2>Вход</h2>
    <input v-model="password" type="password" placeholder="Пароль (1234)" />
    <button @click="login">Войти</button>
    <p v-if="error" style="color:red">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const password = ref('')
const error = ref(null)
const router = useRouter()
const route = useRoute()

const login = () => {
  if (password.value == '1234') {
    localStorage.setItem('authToken', 'demo')
    // Редирект туда, откуда пришли, или в кабинет
    const redirectPath = route.query.redirect || '/dashboard'
    router.push(redirectPath)
  } else {
    error.value = "Неверно указанный пароль"
  }
}
</script>
<style scoped>
.page { padding: 20px; font-family: sans-serif; }
</style> 
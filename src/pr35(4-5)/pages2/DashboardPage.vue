<template>
  <div class="page">
    <h2>Личный кабинет</h2>
    <p>Вы авторизованы!</p>
    <button @click="logout">Выйти</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const logout = () => {
  localStorage.removeItem('authToken')
  router.push('/login')
}
</script>

<style scoped>
.page { padding: 20px; font-family: sans-serif; }
</style>
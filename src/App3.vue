<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="page">
    <h1>Пользователи</h1>
    
    <div class="controls">
      <button @click="toggleApi" class="btn-toggle">
        Переключить на {{ useAxios ? 'fetch' : 'Axios' }}
      </button>
      <span class="api-status">Сейчас используется: <b>{{ useAxios ? 'Axios' : 'fetch' }}</b></span>
    </div>

    <div v-if="loading" class="spinner-box">
      <div class="spinner"></div>
      <p>Загрузка данных...</p>
    </div>
    
    <div v-else-if="error" class="error-box">
      <strong>Ошибка:</strong> {{ error }}
      <button @click="loadUsers" class="btn-retry">Попробовать снова</button>
    </div>
    
    <div v-else class="cards-grid">
      <div v-for="user in users" :key="user.id" class="card">
        <div class="card-header">
          <strong>{{ user.name }}</strong>
          <span class="badge">{{ user.email }}</span>
        </div>
        <p class="card-body">
          {{ user.company.name }}<br />
          Город: {{ user.address.city }}
        </p>
        
        <!-- ВАРИАНТ 8 -->
        <div class="card-phone">
          <a v-if="user.phone" :href="'tel:' + cleanPhone(user.phone)" class="btn-call">
            Позвонить: {{ user.phone }}
          </a>
          <span v-else class="no-phone">
            Телефон не указан
          </span>
        </div>

        <div class="card-footer">
          ID: {{ user.id }}
        </div>
      </div>
      <p v-if="!loading && users.length == 0" class="empty-message">Список пуст.</p>
    </div>
  </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue'
    import axios from 'axios'

    const users = ref([])
    const loading = ref(false)
    const error = ref(null)
    const useAxios = ref(true)

    const toggleApi = () => {
    useAxios.value = !useAxios.value
    loadUsers()
    }

    const cleanPhone = (phone) => {
    return phone.replace(/[^0-9+]/g, '')
    }

    const loadUsers = async () => {
    loading.value = true
    error.value = null
    const url = 'https://jsonplaceholder.typicode.com/users'

    if (useAxios.value) {
        try {
        const response = await axios.get(url)
        users.value = response.data
        } catch (err) {
        error.value = err.response 
            ? `Ошибка сервера: ${err.response.status}` 
            : err.message || 'Ошибка сети'
        } finally {
        loading.value = false
        }
    } else {
        try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`)
        }
        const data = await response.json()
        users.value = data
        } catch (err) {
        error.value = err instanceof Error ? err.message : 'Неизвестная ошибка'
        } finally {
        loading.value = false
        }
    }
    }

    onMounted(() => {
    loadUsers()
    })
</script>

<style scoped>
    .page {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
    min-height: 100vh;
    }

    h1 {
    color: #d6336c;
    text-align: center;
    margin-bottom: 15px;
    }

    .controls {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
    margin-bottom: 30px;
    }

    .btn-toggle {
    padding: 10px 20px;
    background-color: #ff69b4;
    color: white;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    font-weight: bold;
    transition: 0.3s;
    }

    .btn-toggle:hover {
    background-color: #d6336c;
    }

    .api-status {
    color: #555;
    font-size: 14px;
    }

    .cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
    }

    .card {
    background: white;
    border: 2px solid #ffb6c1;
    border-radius: 10px;
    padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0 4px 8px rgba(255, 182, 193, 0.4);
    transition: transform 0.3s ease;
    }

    .card:hover {
    transform: translateY(-5px);
    }

    .card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    border-bottom: 1px solid #ffe4e1;
    padding-bottom: 10px;
    margin-bottom: 10px;
    }

    .card-header strong {
    color: #d6336c;
    font-size: 16px;
    }

    .badge {
    background-color: #ffe4e1;
    color: #d6336c;
    padding: 3px 8px;
    border-radius: 12px;
    font-size: 12px;
    word-break: break-all;
    }

    .card-body {
    color: #555;
    font-size: 14px;
    margin-bottom: 15px;
    }

    .card-phone {
    margin-bottom: 15px;
    }

    .btn-call {
    display: inline-block;
    padding: 8px 12px;
    background-color: #2ecc71;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    font-size: 14px;
    font-weight: bold;
    transition: 0.2s;
    }

    .btn-call:hover {
    background-color: #27ae60;
    }

    .no-phone {
    display: inline-block;
    padding: 8px 12px;
    background-color: #eee;
    color: #888;
    border-radius: 5px;
    font-size: 14px;
    }

    .card-footer {
    text-align: right;
    font-size: 12px;
    color: #aaa;
    }

    .empty-message {
    text-align: center;
    color: #888;
    font-style: italic;
    }

    .spinner-box {
    text-align: center;
    padding: 50px;
    color: #d6336c;
    }

    .spinner {
    border: 4px solid #ffe4e1;
    border-top: 4px solid #ff69b4;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
    margin: 0 auto 15px;
    }

    @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
    }

    .error-box {
    background-color: #ffebee;
    color: #c62828;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    border: 1px solid #ffcdd2;
    }

    .btn-retry {
    margin-left: 15px;
    padding: 5px 10px;
    cursor: pointer;
    background: #c62828;
    color: white;
    border: none;
    border-radius: 4px;
    }
</style>
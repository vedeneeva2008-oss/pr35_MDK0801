<template>
  <div class="page">
    <h1>Каталог курсов</h1>
    
    <div class="filters">
      <button @click="setFilter('all')" :class="{ active: filter == 'all' }">Все</button>
      <button @click="setFilter('frontend')" :class="{ active: filter == 'frontend' }">Frontend</button>
      <button @click="setFilter('backend')" :class="{ active: filter == 'backend' }">Backend</button>
    </div>

    <div v-if="loading" class="spinner">Загрузка...</div>

    <ul v-else class="course-list">
      <li v-for="course in filteredCourses" :key="course.id" class="course-card">
        <h3>{{ course.title }}</h3>
        <p>Категория: {{ course.category }}</p>
        <RouterLink :to="'/courses/' + course.id" class="btn">Подробнее</RouterLink>
      </li>
    </ul>

    <p v-if="!loading && filteredCourses.length == 0">Нет курсов в этой категории.</p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { courses } from '../data/courses.js'

const route = useRoute()
const router = useRouter()

const filter = ref(route.query.category || 'all')
const loading = ref(true)

onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 1000)
})

const filteredCourses = computed(() => {
  if (filter.value == 'all') return courses
  return courses.filter(c => c.category == filter.value)
})

const setFilter = (val) => {
  filter.value = val
  router.push({ name: 'Courses', query: { category: val } })
}
</script> 

<style scoped>
.page { padding: 20px; font-family: sans-serif; }
.filters button { margin-right: 10px; padding: 5px 15px; cursor: pointer; }
.filters button.active { background: #42b983; color: white; border: none; }
.spinner { font-size: 20px; color: #42b983; margin: 20px 0; }
.course-list { list-style: none; padding: 0; display: flex; gap: 20px; flex-wrap: wrap; }
.course-card { border: 1px solid #ccc; padding: 15px; width: 250px; border-radius: 8px; }
.btn { display: inline-block; margin-top: 10px; background: #42b983; color: white; padding: 5px 10px; text-decoration: none; border-radius: 4px; }
</style>
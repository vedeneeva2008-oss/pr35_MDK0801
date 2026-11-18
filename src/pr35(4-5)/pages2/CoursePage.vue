<template>
  <div class="page">
    <h1>Курс: {{ course?.title }}</h1>
    
    <div class="tabs">
      <RouterLink :to="`/courses/${id}/description`">Описание</RouterLink>
      <RouterLink :to="`/courses/${id}/program`">Программа</RouterLink>
      <RouterLink :to="`/courses/${id}/reviews`">Отзывы</RouterLink>
    </div>

    <RouterView />
  </div>
</template>

<script setup>
/* eslint-disable no-undef */
import { computed, provide } from 'vue'
import { courses } from '../data/courses.js'

const props = defineProps({ id: [String, Number] })
const course = computed(() => courses.find(c => c.id == props.id))

// Передаем данные во вложенные компоненты (вкладки)
provide('courseData', course)
</script>

<style scoped>
.page { padding: 20px; font-family: sans-serif; }
.tabs { margin: 20px 0; border-bottom: 2px solid #eee; padding-bottom: 10px; }
.tabs a { margin-right: 20px; text-decoration: none; color: #333; font-weight: bold; }
.tabs a.router-link-active { color: #42b983; border-bottom: 2px solid #42b983; }
</style>
<template>
  <div class="tab-content">
    <h3>Описание</h3>
    <p>{{ course?.description }}</p>
  </div>
</template>

<script setup>
import { inject } from 'vue'
const course = inject('courseData')
</script>
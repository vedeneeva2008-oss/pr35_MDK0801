<template>
  <div class="tab-content">
    <h3>Отзывы</h3>
    <div v-for="(review, index) in course?.reviews" :key="index" class="review">
      <strong>{{ review.author }}</strong> ({{ review.rating }}/5)
      <p>{{ review.text }}</p>
    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue'
const course = inject('courseData')
</script>

<style scoped>
.review { border-bottom: 1px solid #eee; padding: 10px 0; }
</style>
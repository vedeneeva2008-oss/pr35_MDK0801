import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '../pages/HomePage.vue'
import CoursesListPage from '../pages/CoursesListPage.vue'
import CoursePage from '../pages/CoursePage.vue'
import CourseDescriptionPage from '../pages/CourseDescriptionPage.vue'
import CourseProgramPage from '../pages/CourseProgramPage.vue'
import CourseReviewsPage from '../pages/CourseReviewsPage.vue'
import LoginPage from '../pages/LoginPage.vue'
import DashboardPage from '../pages/DashboardPage.vue'
import NotFoundPage from '../pages/NotFoundPage.vue'

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { 
    path: '/courses', 
    name: 'Courses', 
    component: CoursesListPage,
    meta: { requiresAuth: false }
  },
  {
    path: '/courses/:id',
    name: 'CourseDetail',
    component: CoursePage,
    props: true, // Передаем ID как prop
    children: [
      { path: '', redirect: { name: 'CourseDescription' } }, // По умолчанию открываем описание
      { path: 'description', name: 'CourseDescription', component: CourseDescriptionPage },
      { path: 'program', name: 'CourseProgram', component: CourseProgramPage },
      { path: 'reviews', name: 'CourseReviews', component: CourseReviewsPage },
    ]
  },
  { path: '/login', name: 'Login', component: LoginPage, meta: { guestOnly: true } },
  { path: '/dashboard', name: 'Dashboard', component: DashboardPage, meta: { requiresAuth: true } },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundPage } // 404
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Защита маршрутов
router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('authToken') === 'demo'

  // Если маршрут требует входа, а мы не вошли
  if (to.meta.requiresAuth && !isLoggedIn) {
    // Запоминаем, куда хотели зайти
    next({ name: 'Login', query: { redirect: to.fullPath } })
    return
  }

  // Если мы уже вошли, а пытаемся зайти на страницу логина
  if (to.meta.guestOnly && isLoggedIn) {
    next({ name: 'Dashboard' })
    return
  }

  next()
})

export default router
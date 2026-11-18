import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import ProductListPage from '../pages/ProductListPage.vue'
import ProductDetailPage from '../pages/ProductDetailPage.vue'
import LoginPage from '../pages/LoginPage.vue'
import ProtectedPage from '../pages/ProtectedPage.vue'

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { 
    path: '/products', 
    name: 'Products', 
    component: ProductListPage,
    meta: { requiresAuth: false }
  },
  { 
    path: '/products/:id', 
    name: 'ProductDetail', 
    component: ProductDetailPage,
    props: true, // передаём params как props
    meta: { requiresAuth: false }
  },
  { 
    path: '/login', 
    name: 'Login', 
    component: LoginPage,
    meta: { requiresAuth: false, guestOnly: true }
  },
  { 
    path: '/dashboard', 
    name: 'Dashboard', 
    component: ProtectedPage,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Простой глобальный guard (защита маршрутов)
router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('token') === 'demo'

  if (to.meta.requiresAuth && !isLoggedIn) {
    next({ name: 'Login' })
    return
  }

  if (to.meta.guestOnly && isLoggedIn) {
    next({ name: 'Dashboard' })
    return
  }

  next()
})

export default router
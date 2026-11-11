<template>
  <div class="page">
    <h1>Главная</h1>
    <nav>
      <RouterLink to="/courses" class="nav-link">Список курсов</RouterLink> |
      <RouterLink to="/dashboard" class="nav-link">Личный кабинет</RouterLink>
    </nav>
  </div>
</template>

<style scoped>
    .nav-link {
    margin-right: 1rem;
    text-decoration: none;
    color: #42b983;
    font-weight: 600;
    }
    .nav-link:hover { text-decoration: underline; }
</style>
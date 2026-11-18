<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="app-container" :class="currentTheme">
    
    <!-- ЗАДАНИЕ 1 -->
    <section class="task-section">
      <h2>Задачи</h2>
      <div class="todo-input-group">
        <input type="text" v-model="newTask" @keyup.enter="addTask" placeholder="Новая задача...">
        <button @click="addTask" class="btn-add-task">Добавить</button>
      </div>

      <ul class="todo-list" v-if="tasks.length > 0">
        <li v-for="task in tasks" :key="task.id" class="todo-item">
          <div v-if="editingId != task.id" class="view-mode">
            <span 
              :class="{ completed: task.done }" 
              @click="task.done = !task.done"
              class="task-text">
              {{ task.text }}
            </span>
            <div>
              <button @click="startEdit(task)" class="btn-edit">Изменить</button>
              <button @click="deleteTask(task.id)" class="btn-del">Удалить</button>
            </div>
          </div>

          <div v-else class="edit-mode">
            <input type="text" v-model="editText" @keyup.enter="saveEdit(task.id)">
            <button @click="saveEdit(task.id)" class="btn-save">ОК</button>
            <button @click="cancelEdit" class="btn-cancel">Отмена</button>
          </div>
        </li>
      </ul>
      <p v-else class="empty-msg">Задач нет</p>
    </section>

    <!-- ЗАДАНИЕ 2 -->
    <section class="task-section">
      <h2>Лайки</h2>
      <div style="text-align: center; margin-bottom: 10px;">
        <span style="font-size: 24px; font-weight: bold; color: #e91e63;">{{ likes }}</span>
      </div>
      <div style="text-align: center;">
        <button class="btn-like" @click="addLike">👍 Лайк</button>
        <button class="btn-dislike" @click="removeLike">👎 Дизлайк</button>
      </div>
    </section>

    <!-- ЗАДАНИЕ 3 -->
    <section class="task-section">
      <h2>Тема</h2>
      <p style="text-align: center;">Текущая: <strong>{{ currentTheme == 'light-theme' ? 'Светлая' : 'Тёмная' }}</strong></p>
      <div style="text-align: center;">
        <button @click="setTheme('light-theme')">Светлая</button>
        <button @click="setTheme('dark-theme')">Тёмная</button>
      </div>
    </section>

  </div>
</template>

<script setup>
  import { ref } from 'vue'

  // ЗАДАНИЕ 1
  const tasks = ref([
    { id: 1, text: 'Сделать практику', done: false },
    { id: 2, text: 'Выучить Vue', done: false }
  ])
  const newTask = ref('')
  const editingId = ref(null)
  const editText = ref('')

  const addTask = () => {
    if (newTask.value.trim() == '') return
    tasks.value.push({ id: Date.now(), text: newTask.value, done: false })
    newTask.value = ''
  }

  const deleteTask = (id) => {
    tasks.value = tasks.value.filter(task => task.id != id)
  }

  const startEdit = (task) => {
    editingId.value = task.id
    editText.value = task.text
  }

  const saveEdit = (id) => {
    if (editText.value.trim() == '') return
    const task = tasks.value.find(t => t.id == id)
    if (task) task.text = editText.value
    editingId.value = null
  }

  const cancelEdit = () => {
    editingId.value = null
  }

  // ЗАДАНИЕ 2
  const likes = ref(0)
  const addLike = () => { likes.value++ }
  const removeLike = () => {
    if (likes.value > 0) likes.value--
  }

  // ЗАДАНИЕ 3
  const currentTheme = ref('light-theme')
  const setTheme = (themeName) => {
    currentTheme.value = themeName
  }
</script>

<style scoped>
  .app-container {
    max-width: 600px;
    margin: 20px auto;
    padding: 15px;
    font-family: sans-serif;
  }

  .light-theme {
    background-color: #ffe6f0;
    color: #333;
  }

  .dark-theme {
    background-color: #333;
    color: #ffb6c1;
  }

  .task-section {
    background-color: #fff;
    padding: 15px;
    margin-bottom: 15px;
    border: 1px solid #ffb6c1;
  }

  .dark-theme .task-section {
    background-color: #444;
    border-color: #ff69b4;
  }

  h2 {
    font-size: 16px;
    margin-top: 0;
    color: #ff1493;
  }

  .todo-input-group {
    display: flex;
    gap: 5px;
    margin-bottom: 10px;
  }

  .todo-input-group input {
    flex-grow: 1;
    padding: 5px;
  }

  .todo-list {
    padding-left: 0;
    list-style-type: none;
  }

  .todo-item {
    margin-bottom: 10px;
    padding-bottom: 5px;
    border-bottom: 1px solid #ffe6f0;
  }

  .view-mode {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .task-text {
    cursor: pointer;
    flex-grow: 1; 
  }

  .completed {
    text-decoration: line-through;
    color: #888;
  }

  button {
    padding: 5px 10px;
    background-color: #ff69b4;
    color: white;
    border: none;
    cursor: pointer;
    margin-left: 5px;
  }

  button:hover {
    background-color: #ff1493;
  }

  .empty-msg {
    color: #888;
  }
</style>
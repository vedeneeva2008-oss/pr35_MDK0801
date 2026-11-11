<template>
  <div class="app">
    <!-- ЗАДАНИЕ 3 -->
    <section>
      <h1>Каталог товаров</h1>
      <div class="cat">
        <div v-for="product in catalog" :key="product.id" class="crd">
          <h3>{{ product.name }}</h3>
          <p>{{ product.price }} Р</p>
          <button class="btn" @click="addToCart(product)">В корзину</button>
        </div>
      </div>
    </section>

    <section>
      <h1>Корзина ({{ totalCount }} шт.)</h1>    
      <div v-if="cart.length == 0">
        <p>Корзина пуста</p>
      </div>      
      <div v-else class="cart">
        <div v-for="item in cart" :key="item.id" class="cart-itm">
          <div>
            <strong>{{ item.name }}</strong> - 
            <span>{{ item.price }} Р</span>
          </div>
          <div class="ctrl">
            <button class="btn-qty" @click="changeQuantity(item, -1)">-</button>
            <span>{{ item.quantity }}</span>
            <button class="btn-qty" @click="changeQuantity(item, 1)">+</button>
            <button class="btn-del" @click="removeFromCart(item.id)">Удалить</button>
          </div>
        </div>
      </div>
      
      <div class="total">
        <h3>Итого: {{ totalSum }} Р</h3>
      </div>
    </section>

    <!-- ЗАДАНИЕ 4 -->
    <section class="converter-section">
      <h1>Конвертер массы (Вариант 7)</h1>  
      <div class="converter-box">
        <div class="input-group">
          <label>Значение:</label>
          <input 
            type="number" 
            v-model="convInput" 
            placeholder="Введите число..."
          >
        </div>

        <div class="input-group">
          <label>Направление:</label>
          <select v-model="convType">
            <option value="t-c">Тонны → Центнеры</option>
            <option value="oz-g">Унции → Граммы</option>
            <option value="c-kg">Центнеры → Килограммы</option>
          </select>
        </div>

        <button class="btn-reset" @click="resetConverter">Сбросить</button>

        <div class="result-box">
          <h3>Результат:</h3>
          <p v-if="convInput == '' || isNaN(convInput)"></p>
          <p v-else class="result-value">{{ convResult }}</p>
        </div>

        <div class="history-box" v-if="convHistory.length > 0">
          <h4>Последние конвертации:</h4>
          <ul>
            <li v-for="(record, index) in convHistory" :key="index">
              {{ record }}
            </li>
          </ul>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
  import { ref, computed, watch } from 'vue'

  // ЗАДАНИЕ 3
  const catalog = ref([
    { id: 1, name: 'Хлеб', price: 45 },
    { id: 2, name: 'Молоко', price: 89 },
    { id: 3, name: 'Яйца', price: 120 },
    { id: 4, name: 'Сыр', price: 350 },
    { id: 5, name: 'Масло', price: 180 },
    { id: 6, name: 'Кофе', price: 420 },
  ])

  const cart = ref([])

  function addToCart(product) {
    const existingItem = cart.value.find(item => item.id == product.id)
    if (existingItem) {
      existingItem.quantity++
    } else {
      cart.value.push({ ...product, quantity: 1 })
    }
  }

  function removeFromCart(id) {
    cart.value = cart.value.filter(item => item.id != id)
  }

  function changeQuantity(item, amount) {
    item.quantity += amount
    if (item.quantity < 1) {
      removeFromCart(item.id)
    }
  }

  const totalCount = computed(() => {
    return cart.value.reduce((count, item) => count + item.quantity, 0)
  })

  const totalSum = computed(() => {
    return cart.value.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  })


  // ЗАДАНИЕ 4 (ВАРИАНТ 7)
  const convInput = ref('')
  const convType = ref('t-c')
  const convHistory = ref([])

  const convResult = computed(() => {
    const val = parseFloat(convInput.value)

    if (isNaN(val)) return ''

    let result = 0
    let unit = ''

    if (convType.value == 't-c') {
      result = val * 10
      unit = 'ц'
    } else if (convType.value == 'oz-g') {
      result = val * 28.3495
      unit = 'г'
    } else if (convType.value == 'c-kg') {
      result = val * 100
      unit = 'кг'
    }

    return result.toFixed(2) + ' ' + unit
  })

  watch(convResult, (newVal) => {
    if (newVal != '') {
      const record = `${convInput.value} → ${newVal}`
      convHistory.value.unshift(record)
      if (convHistory.value.length > 5) {
        convHistory.value.pop()
      }
    }
  })

  function resetConverter() {
    convInput.value = ''
    convType.value = 't-c'
  }

</script>

<style scoped>
  .app {
    font-family: 'Segoe UI', Arial, sans-serif;
    background-color: #fafafa;
    color: #333;
    min-height: 100vh;
    padding: 40px 20px;
  }

  section {
    max-width: 800px;
    margin: 0 auto 40px auto;
    background: #fff;
    padding: 30px;
    border-radius: 12px;
    border: 1px solid #f0f0f0;
  }

  h1 {
    font-size: 22px;
    color: #d63384;
    margin-top: 0;
    margin-bottom: 20px;
    font-weight: 600;
  }

  h3, h4 {
    font-size: 18px;
    margin-bottom: 15px;
    color: #444;
  }

  .cat {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }

  .crd {
    background: #fffafc;
    border: 1px solid #fce4f0;
    border-radius: 8px;
    padding: 20px;
    width: calc(33.333% - 14px);
    box-sizing: border-box;
    text-align: center;
    h3 {
      font-size: 16px;
      margin-top: 0;
      color: #333;
    }
    p {
      color: #d63384;
      font-weight: bold;
      font-size: 18px;
      margin-bottom: 15px;
    }
  }

  button {
    cursor: pointer;
    font-family: inherit;
    font-weight: 600;
    font-size: 14px;
    padding: 8px 16px;
    border-radius: 6px;
    border: 1px solid transparent;
    transition: all 0.2s ease;
  }

  .btn {
    background: #d63384;
    color: #fff;
    width: 100%;
  }

  .btn:hover {
    background: #b82b70;
  }

  .cart-itm {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    background: #fafafa;
    border-radius: 8px;
    margin-bottom: 10px;
    border: 1px solid #eee;
  }

  .ctrl {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .btn-qty {
    width: 32px;
    height: 32px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    border: 1px solid #ccc;
    color: #333;
  }

  .btn-qty:hover {
    border-color: #d63384;
    color: #d63384;
  }

  .btn-del {
    background: transparent;
    color: #999;
    border: none;
  }

  .btn-del:hover {
    color: red;
  }

  .total {
    text-align: right;
    margin-top: 20px;
    padding-top: 20px;
    border-top: 2px dashed #fce4f0;
    h3 {
      color: #d63384;
      margin: 0;
    }
  }

  .input-group {
    margin-bottom: 15px;
    label {
      display: block;
      margin-bottom: 6px;
      font-size: 14px;
      font-weight: 600;
      color: #555;
    }
  }

  input[type="number"],
  select {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 16px;
    font-family: inherit;
    box-sizing: border-box;
    background: #fafafa;
    transition: 0.2s;
  }

  input[type="number"]:focus,
  select:focus {
    outline: none;
    border-color: #d63384;
    background: #fff;
  }

  .btn-reset {
    background: #fff;
    border: 1px solid #ccc;
    color: #555;
    margin-bottom: 20px;
  }

  .btn-reset:hover {
    border-color: #d63384;
    color: #d63384;
  }

  .result-box {
    background: #fffafc;
    padding: 20px;
    border-radius: 8px;
    border: 1px solid #fce4f0;
    margin-bottom: 20px;
  }

  .result-value {
    font-size: 24px;
    font-weight: bold;
    color: #d63384;
    margin: 10px 0 0 0;
  }

  .history-box {
    background: #fafafa;
    padding: 15px;
    border-radius: 8px;
    border: 1px solid #eee;
    ul {
      padding-left: 20px;
      margin: 0;
    }
    li {
      margin-bottom: 8px;
      color: #555;
      font-size: 14px;
    }
  }
</style>
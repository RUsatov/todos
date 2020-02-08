<template>
  <section class="todo-main">
    <!-- Кнопка добавления списка дел -->
    <router-link
      tag="button"
      to="/create"
      class="create-todo"
      @click="$router.push('/create')"
      :disabled="todos.length >= 8"
      :title="
        todos.length >= 8 ? 'Создано максимальное количество заметок' : ''
      "
    >
      <span class="create-todo__plus">+</span>
      <span class="create-todo__text">Добавить список дел</span>
    </router-link>

    <!-- Отрисовка карточек -->
    <card
      v-for="card of todos"
      :key="card.id"
      :card="card"
      @delete="deleteTodo"
    />

    <h2 v-if="isEmptyTodos" class="info-empty">
      Список дел пуст.
      <router-link to="/create" class="info-empty__link link"
        >Создайте первую заметку.</router-link
      >
    </h2>
  </section>
</template>

<script>
import Card from '@/components/Card.vue'

export default {
  components: {
    Card,
  },
  async created() {
    await this.$store.dispatch('getTodoList').then(res => {
      res.length ? (this.isEmptyTodos = false) : (this.isEmptyTodos = true)
      this.todos = res
    })
  },
  data() {
    return {
      todos: [],
      isEmptyTodos: false,
    }
  },
  methods: {
    deleteTodo(id) {
      const idx = this.todos.findIndex(el => el.id === id)
      this.todos.splice(idx, 1)
    },
  },
}
</script>

<style lang="scss" scoped>
.todo-main {
  display: grid;
  flex-wrap: wrap;
  justify-content: flex-start; // на случай если grid не поддерживается   grid-gap: 14px;  grid-template-columns: 1fr;
  @media screen and (min-width: 575.98px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (min-width: 767.98px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (min-width: 1199.98px) {
    grid-gap: 24px;
    grid-template-columns: repeat(4, 1fr);
  }
}

.create-todo {
  position: fixed;
  top: 32px;
  right: 32px;
  z-index: 5;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 42px;
  min-height: 42px;
  overflow: hidden;

  font-size: 30px;
  color: $white;

  background-color: $primary;
  border-radius: 100px;
  cursor: pointer;

  transition: all 0.4s;

  &__plus {
    position: absolute;
  }

  &__text {
    font-size: 16px;
    white-space: nowrap;

    opacity: 0;
  }

  &:hover {
    width: 230px;
    .create-todo__plus {
      position: absolute;

      opacity: 0;
    }
    .create-todo__text {
      position: relative;

      opacity: 1;
    }
  }

  &:active {
    background-color: darken($primary, 8%);
  }

  &:disabled {
    cursor: default;
    opacity: 0.4;
    &:hover {
      width: 42px;
      .create-todo__plus {
        opacity: 1;
      }
      .create-todo__text {
        opacity: 0;
      }
    }
    &:active {
      background: $primary;
    }
  }
}

.info-empty {
  position: absolute;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: $white;
  text-align: center;

  @media screen and (min-width: 575.98px) {
    font-size: 18px;
  }
  @media screen and (min-width: 767.98px) {
    font-size: 20px;
  }
  @media screen and (min-width: 1199.98px) {
    font-size: 26px;
  }
}
</style>

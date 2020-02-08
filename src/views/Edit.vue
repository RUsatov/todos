<template>
  <section>
    <create-form :card="todo" />
  </section>
</template>

<script>
import createForm from '@/components/Form'

export default {
  components: { createForm },
  data() {
    return {
      todo: null,
    }
  },
  created() {
    this.getTodo()
  },
  methods: {
    /**
     * Получает нужную карточку по id из url.
     * Получение при переходе с главной происходит из геттера vuex.
     * При обновлении страницы получение карточки происходит при помощи запроса всех моделей и последующей выборки.
     */
    getTodo() {
      const todos = this.$store.getters.todoList
      if (todos.length) {
        this.todo = todos.find(el => el.id === this.$route.params.id)
      } else {
        this.$store.dispatch('getTodoList').then(res => {
          this.todo = res.find(el => el.id === this.$route.params.id)
        })
      }
    },
  },
}
</script>

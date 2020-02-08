import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import axios from 'axios'

const api = 'https://todo-22454.firebaseio.com/'

export default new Vuex.Store({
  state: {
    todos: [],
  },
  mutations: {
    todoList(state, todos) {
      state.todos = todos
    },
  },
  actions: {
    /**
     * Вносит изменения в БД при изменении todo заметки
     * @param {object} todo - объект измененной заметки
     */
    async editTodo({}, todo) {
      try {
        await axios.put(`${api}/todos/${todo.id}.json`, todo)
      } catch (e) {
        console.log(e)
      }
    },

    /**
     * Удаляет из БД заметку по её id
     * @param {string} id - идентификатор статьи в БД
     */
    async deleteTodo({}, id) {
      try {
        await axios.delete(`${api}/todos/${id}.json`)
      } catch (e) {
        console.log(e)
      }
    },

    /**
     * Добавляет в БД todo заметку
     * @param {object} todo - объект созданной заметки
     */
    async saveTodo({}, todo) {
      try {
        await axios.post(`${api}/todos.json`, todo)
      } catch (e) {
        console.log(e)
      }
    },

    /**
     * Получает список всех todo заметок из БД
     * @return {array} - массив объектов со всеми заметками
     */
    async getTodoList({ commit }) {
      try {
        return await axios
          .get(`${api}/todos.json`)
          .then(res => {
            const todos = []
            for (let key in res.data) {
              todos.push({ ...res.data[key], id: key })
            }
            commit('todoList', todos)
            return todos
          })
          .catch(e => console.log(e))
      } catch (e) {
        console.log(e)
      }
    },
  },
  getters: {
    todoList: state => state.todos,
  },
})

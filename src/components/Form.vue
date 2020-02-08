<template>
  <div class="todo-form">
    <!-- Управление отменой и возвратом действий -->
    <div class="todo-control">
      <btn
        class="todo-control__btn todo-control__btn--previus"
        small
        square
        color="gray"
        @click="operation('undo')"
        :disabled="versionCount === 0"
      >
        <img
          title="Отменить последнее изменение"
          src="~@/assets/img/previous.svg"
          alt="previus"
        />
      </btn>
      <btn
        class="todo-control__btn todo-control__btn--next"
        small
        square
        color="gray"
        @click="operation('redo')"
        :disabled="versionCount === Object.keys(versions).length - 1"
      >
        <img
          title="Вернуть последнее изменение"
          src="~@/assets/img/next.svg"
          alt="next"
        />
      </btn>
    </div>

    <!-- Поле названия списка -->
    <input
      class="todo-title input"
      v-model.trim.lazy="todoList.title"
      placeholder="Название списка"
    />

    <!-- Поля для создания списка дел -->
    <div
      v-for="(item, idx) in todoList.todos"
      :key="item.text + idx"
      class="todo-item"
    >
      <checkbox
        :id="`todo-item-checkbox-${idx}`"
        title="Отметить как выполненное"
        v-model="item.done"
      />
      <input
        type="text"
        class="todo-item__input input"
        @keydown.enter="addItem(idx)"
        v-model.trim.lazy="item.text"
        placeholder="Опишите задачу"
      />
      <button
        :disabled="todoList.todos.length <= 1"
        title="Удалить задачу"
        @click="deleteItem(idx)"
        class="icon-btn icon-btn--delete"
      ></button>
    </div>

    <btn
      label="Добавить задачу"
      :disabled="todoList.todos.length >= 10"
      color="white"
      small
      @click="addItem"
      class="add-item-btn"
    />
    <p v-if="todoList.todos.length >= 10" class="add-item-info">
      Достигнуто максимальное количество полей
    </p>

    <!-- Кнопки управления -->
    <div class="todo-form__footer">
      <btn
        v-if="todoList.id"
        @click="showDeleteModal = true"
        color="red"
        label="Удалить"
        class="footer-btn footer-btn--delete"
        :disabled="submit"
      />
      <btn
        @click="showCancelModal = true"
        color="gray"
        label="Отмена"
        class="footer-btn footer-btn--cancel"
        :disabled="submit"
      />
      <btn
        @click="saveTodo"
        :label="isEdit ? 'Сохранить' : 'Создать'"
        class="footer-btn footer-btn--save"
        :disabled="!todoList.title || !todoList.todos[0].text || submit"
      />
    </div>

    <!-- Модальное окно с удалением -->
    <modal
      v-show="showDeleteModal"
      @close="showDeleteModal = false"
      title="Подтвердите удаление"
    >
      <div class="modal-wrapper" slot="body">
        <p class="modal-text">
          Вы действительно хотите удалить список <b>«{{ todoList.title }}»</b>?
        </p>
        <div class="modal-btn_block">
          <btn color="gray" label="Отмена" @click="showDeleteModal = false" />
          <btn
            color="red"
            label="Удалить"
            noshadow
            @click="deleteTodo"
            :disabled="submit"
          />
        </div>
      </div>
    </modal>

    <!-- Модальное окно с отменой -->
    <modal
      v-show="showCancelModal"
      @close="showCancelModal = false"
      title="Подтвердите отмену"
    >
      <div class="modal-wrapper" slot="body">
        <p class="modal-text">
          Вы действительно хотите отменить все изменения и перейти на главную
          страницу?
        </p>
        <div class="modal-btn_block">
          <btn color="gray" label="Отмена" @click="showCancelModal = false" />
          <btn label="На главную" noshadow @click="$router.push('/')" />
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import checkbox from '@/components/ui/Checkbox'
import btn from '@/components/ui/Button'
import modal from '@/components/ui/Modal'

export default {
  components: {
    checkbox,
    btn,
    modal,
  },
  props: {
    card: {
      type: Object,
    },
  },
  data() {
    return {
      showDeleteModal: false,
      showCancelModal: false,
      versionCount: 0,
      submit: false,
      todoList: this.card
        ? JSON.parse(JSON.stringify(this.card))
        : {
            title: '',
            todos: [
              {
                text: '',
                done: false,
              },
            ],
          },
      versions: {
        0: this.card
          ? JSON.parse(JSON.stringify(this.card))
          : {
              title: '',
              todos: [
                {
                  text: '',
                  done: false,
                },
              ],
            },
      },
    }
  },
  watch: {
    /**
     * Отслеживает объект todoList с полным погружением.
     * Если изменение есть, то записывает новую версию объекта this.todoList в переменную this.versions
     */
    todoList: {
      handler(val) {
        this.versions[++this.versionCount] = JSON.parse(
          JSON.stringify(this.todoList)
        ) // {...this.todoList} не использовался потому что копируются только внешние поля
      },
      deep: true,
    },
    /**
     * Отслеживает изменение пропса card. Используется, если страницу обновили
     * @param {object} val - объект всей заметки
     */
    card(val) {
      if (val) {
        this.todoList = val
      }
    },
  },
  computed: {
    /**
     * Проверяет на какой странице создан компонент
     * @return {boolean} если объект this.card из пропов существует, значит это страница изменения заметки
     */
    isEdit() {
      return this.card ? true : false
    },
  },
  methods: {
    /**
     * Добавляет одно поле в список дел
     * @param {number} idx - индекс инпута, на котором нажали Enter
     */
    addItem(idx) {
      this.todoList.todos.push({
        text: '',
        done: false,
      })

      if (idx !== undefined) {
        const inputs = document.querySelectorAll('.todo-item__input')
        inputs[idx].blur()
      }

      this.$nextTick(() => {
        const inputs = document.querySelectorAll('.todo-item__input')
        inputs[inputs.length - 1].focus()
      })
    },
    /**
     * Удаляет выбранное поле дел из списка
     * @param {number} idx - индекс поля в массиве
     */
    deleteItem(idx) {
      this.todoList.todos.splice(idx, 1)
    },
    /**
     * Выполняет операцию отмены действия или возврата действия
     * @param {string} action - операция, которую нужно выполнить. undo или redo
     */
    operation(action) {
      const ver = action === 'undo' ? --this.versionCount : ++this.versionCount
      this.todoList = this.versions[ver]
      this.versionCount = ver - 1
    },
    /**
     * Удаляет из БД всю заметку с задачами и возвращает пользователя на главную страницу
     */
    deleteTodo() {
      this.submit = true
      this.$store.dispatch('deleteTodo', this.todoList.id).then(res => {
        this.submit = false
        this.showDeleteModal = false
        this.$router.push('/')
      })
    },
    /**
     * Сохраняет в БД заметку с задачами и возвращает пользователя на главную страницу.
     * Если компонент используется на странице изменения заметки, то обновляет запись в БД.
     * В противном случае добавляет новый объект в БД.
     * Перед отправкой чистит возможные пустые поля с делами.
     */
    async saveTodo() {
      this.submit = true
      const clearedList = this.todoList.todos.filter(el => el.text)
      this.todoList.todos = clearedList
      if (this.isEdit) {
        await this.$store.dispatch('editTodo', this.todoList)
      } else {
        await this.$store.dispatch('saveTodo', this.todoList)
      }
      this.submit = false
      this.$router.push('/')
    },
  },
}
</script>

<style lang="scss" scoped>
.todo-form {
	position: relative;

	display: flex;
	flex-direction: column;
	width: 100%;
	max-width: 600px;
	min-height: 400px;

	background-color: $card;
	border-radius: 4px;

  @extend %p-4;

	@media screen and (max-width: 575.98px) {
		padding-right: 14px;
		padding-left: 14px;
	}
}

.todo-control {
	position: absolute;
	top: -38px;
	right: 0;
	&__btn--previus {
		@extend %mr-1;
	}
}

.todo-title {
	@extend %mb-3;
}

.todo-item {
	display: flex;
	align-items: center;

  @extend %mb-2;
}

.input {
	width: 100%;
	height: 36px;
	padding: 7px 12px;

	border: solid 1px $dark;
	border-radius: 5px;
	outline: none;

	transition: inherit;
  @extend %mr-1;
}

.add-item-btn {
	max-width: 150px;

  @extend %mb-2;
}

.add-item-info {
	@extend %mb-3;
}

.todo-form__footer {
	display: flex;
	margin-top: auto;
}

.footer-btn {
	&--cancel {
		margin-left: auto;

    @extend %mr-1;
	}
}
</style>

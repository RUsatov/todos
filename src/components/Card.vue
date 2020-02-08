<template>
  <article class="card">
    <div class="card__header">
      <router-link
        :to="`/edit${card.id}`"
        tag="button"
        class="icon-btn icon-btn--edit icon-btn--edit-margin"
        title="Редактировать"
      ></router-link>
      <button
        class="icon-btn icon-btn--delete"
        title="Удалить"
        @click="showDeleteModal = true"
      ></button>
    </div>

    <h1 class="card__title">{{ card.title }}</h1>

    <ul class="card__list">
      <li
        v-show="idx < 5"
        v-for="(todo, idx) in card.todos"
        :key="todo.text"
        class="card__list-item"
      >
        <checkbox
          class="card__list-checkbox"
          v-model="todo.done"
          :label="todo.text"
          disabled
        />
      </li>
    </ul>
    <router-link v-if="card.todos.length > 5" :to="`/edit${card.id}`" class="card__link link">Показать больше</router-link>

    <modal
      v-show="showDeleteModal"
      @close="showDeleteModal = false"
      title="Подтвердите удаление"
    >
      <div class="modal-wrapper" slot="body">
        <p class="modal-text">
          Вы действительно хотите удалить список <b>«{{ card.title }}»</b>?
        </p>
        <div class="modal-btn_block">
          <btn
            color="gray"
            label="Отмена"
            @click="showDeleteModal = false"
            :disabled="submit"
          />
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
  </article>
</template>

<script>
import checkbox from '@/components/ui/Checkbox'
import modal from '@/components/ui/Modal'
import btn from '@/components/ui/Button'

export default {
  components: {
    checkbox,
    modal,
    btn,
  },
  props: {
    card: Object,
  },
  data() {
    return {
      showDeleteModal: false,
      submit: false,
    }
  },
  methods: {
    /**
     * Удаляет заметку из БД и закрывает модальное окно
     */
    deleteTodo() {
      this.submit = true
      this.$store.dispatch('deleteTodo', this.card.id).then(res => {
        this.submit = false
        this.showDeleteModal = false
        this.$emit('delete', this.card.id)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.card {
	position: relative;

	flex: 0 0 23%;
	min-width: 250px;
	height: 250px;
	overflow-y: auto;

	background-color: $card;
  border-radius: 4px;

  overflow: hidden;

  @extend %px-2;
  @extend %py-3;

	@media screen and (min-width: 767.98px) {
		min-width: auto;
	}
	&:hover {
		.card__header {
			opacity: 1;
		}
	}

	&__header {
		position: absolute;
		top: 14px;
		right: 14px;

    opacity: 0;
    background-color: $card;

    @extend %pl-2;
    @extend %pt-1;
    @extend %mb-2;
	}
	&__title {
		@extend %mb-3;
	}
	&__list-item {
		@extend %mb-1;
  }
  &__link {
    position: absolute;
    bottom: 14px;
    left: 14px;
    background-color: $card;
  }
}
</style>

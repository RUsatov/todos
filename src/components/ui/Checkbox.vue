<template>
  <div class="checkbox">
    <input
      type="checkbox"
      :id="id"
      :name="name"
      class="checkbox__input"
      @input="$emit('input', $event.target.checked)"
      :disabled="disabled"
      :checked="value"
      v-bind="$attrs"
    />
    <label :for="id" class="checkbox__label">{{ label }}</label>
  </div>
</template>

<script>
export default {
  props: {
    /**
     * Значение чекбокса
     * @model
     */
    value: Boolean,
    /**
     * Подпись (label) чек-бокса
     */
    label: {
      type: String,
      default: '',
    },
    /**
     * id чекбокса. Прописывается для input и label одинаковый
     */
    id: {
      type: String,
      default: 'checkbox',
    },
    /**
     * Имя инпута
     */
    name: {
      type: String,
      default: 'checkbox',
    },
    /**
     * Отключение чек-бокса
     */
    disabled: Boolean,
  },
}
</script>

<style lang="scss" scoped>
.checkbox {
  display: flex;
  min-height: 20px;
}
.checkbox__input {
  display: none;
}
.checkbox__label {
  display: flex;
  align-items: center;
}

.checkbox__input + .checkbox__label {
  position: relative;

  padding: 0 0 0 24px;

  cursor: pointer;
  user-select: none;
  font-size: inherit;

  &:hover {
    &:before {
      border: solid 1px lighten($dark, 15%);
    }
  }
}
.checkbox__input:checked + .checkbox__label {
  &:hover {
    &:before {
      border-color: lighten($dark, 15%);
    }
  }
}

.checkbox__input + .checkbox__label:before,
.checkbox__input + .checkbox__label:after {
  content: '';
  position: absolute;
  top: 1px;
  left: 0;

  width: 16px;
  height: 16px;

  transition: 0.2s;
}

.checkbox__input + .checkbox__label:before {
  background-color: transparent;
  border: solid 1px $dark;
  border-radius: 4px;
}

.checkbox__input + .checkbox__label:after {
  transform: scale(0);
  background: url('~@/assets/img/input-check.svg') no-repeat 50%;
}

.checkbox__input:checked + .checkbox__label:after {
  transform: scale(1);
}

.checkbox__input:disabled + .checkbox__label:before {
  background-color: transparent;
  border: solid 1px lightgray !important;
  cursor: default !important;
}
.checkbox__input:disabled + .checkbox__label {
  cursor: default;
}
</style>

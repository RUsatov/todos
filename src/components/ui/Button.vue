<template>
  <a
    v-if="href"
    :href="href"
    class="btn"
    :class="[classes, active_class]"
    :style="`width: ${width}px; height: ${height}px`"
    :disabled="disabled"
  >
    <i
      v-if="icon"
      :class="icon"
      :style="
        `font-size: ${icon_size}px; color: ${text_color}; -webkit-text-fill-color: ${text_color}`
      "
    ></i>
    <span
      v-if="!this.$slots.default && !square && !rounded"
      :style="text_color ? `color: ${text_color};` : ''"
      >{{ label }}</span
    >
    <!-- @slot Безымянный слот. Используется для вставки html. Если в слоте что-то есть, то label игнорируется-->
    <slot></slot>
  </a>
  <button
    v-else
    class="btn"
    :class="[classes, active_class]"
    :style="`width: ${width}px; height: ${height}px`"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <i
      v-if="icon"
      :class="icon"
      :style="
        `font-size: ${icon_size}px; color: ${text_color}; -webkit-text-fill-color: ${text_color}`
      "
    ></i>
    <span
      v-if="!this.$slots.default && !square && !rounded"
      :style="text_color ? `color: ${text_color};` : ''"
      >{{ label }}</span
    >
    <!-- @slot Безымянный слот. Используется для вставки html. Если в слоте что-то есть, то label игнорируется-->
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    /**
     * Делает кнопку не активной
     */
    disabled: Boolean,
    /**
     * Ширина кнопки (только цифра, выводится в px)
     */
    width: [String, Number],
    /**
     * Высота кнопки (только цифра, выводится в px)
     */
    height: [String, Number],
    /**
     * Ссылка кнопки
     */
    href: String,
    /**
     * Цвет кнопки
     * @values luxury, gray, darkgray, red, lightred, white
     */
    color: {
      type: String,
      default: 'primary',
      validator(value) {
        return (
          ['primary', 'gray', 'darkgray', 'red', 'lightred', 'white'].indexOf(
            value
          ) !== -1
        )
      },
    },
    /**
     * Цвет текста в любом формате. hex, rgba и т.д.
     */
    text_color: String,
    /**
     * Название класса активной ссылки/кнопки
     */
    active_class: String,
    /**
     * Большая кнопка. Может использоваться вместе с square и rounded
     */
    big: Boolean,
    /**
     * Малая кнопка. Может использоваться вместе с square и rounded
     */
    small: Boolean,
    /**
     * Квадратная кнопка. Если включено, то label игнорируется
     */
    square: Boolean,
    /**
     * Круглая кнопка. Если включено, то label игнорируется
     */
    rounded: Boolean,
    /**
     * Кнопка с обводкой.
     * Адекватно работает только на ярких и темных кнопках.
     */
    outline: Boolean,
    /**
     * Отключение тени
     */
    noshadow: Boolean,
    /**
     * Текст кнопки
     */
    label: {
      type: String,
      default: 'Кнопка',
    },
    /**
     * Название класса иконки
     */
    icon: String,
    /**
     * Размер иконки в пикселях.
     */
    icon_size: {
      type: [String, Number],
      default: 16,
    },
  },
  computed: {
    classes() {
      return {
        'btn--big': this.big,
        'btn--small': this.small,
        'btn--square': this.square,
        'btn--rounded': this.rounded,
        'btn--luxury': this.color === 'luxury',
        'btn--white': this.color === 'white',
        'btn--gray': this.color === 'gray',
        'btn--darkgray': this.color === 'darkgray',
        'btn--red': this.color === 'red',
        'btn--lightred': this.color === 'lightred',
        'btn--outline': this.outline,
        'btn--noshadow': this.noshadow,
        disabled: this.disabled,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
*,
*::after,
*::before {
  box-sizing: border-box;
}

.btn {
  --text-color: #ffffff;
  --primary-color: #cd6684;
  --primary-color-hover: #da819a;
  --primary-color-active: #c05271;
  --box-shadow-color: rgba(206, 82, 117, 0.2);

  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  height: 42px;
  padding: 12px 34px;
  font-family: inherit;
  background-color: var(--primary-color);
  color: var(--text-color);
  border-radius: 4px;
  font-weight: bold;
  white-space: nowrap;
  font-size: 14px;
  line-height: 1.36;
  box-shadow: 0 10px 10px 0 var(--box-shadow-color);
  outline: none;
  cursor: pointer;
  i {
    margin-right: 4px;
    &:before {
      color: var(--text-color);
    }
  }
  &:hover {
    box-shadow: 0 30px 30px 0 var(--box-shadow-color);
    background-color: var(--primary-color-hover);
  }
  &:active {
    box-shadow: none;
    background-color: var(--primary-color-active);
  }

  // Размеры
  &--big {
    height: 54px;
    padding: 18px 60px;
  }
  &--small {
    height: 36px;
    font-size: 12px;
    padding: 8px 24px;
  }
  &--square {
    width: 42px;
    height: 42px;
    padding: 0;
    img {
      max-width: 100%;
      padding: 10px;
    }
    &.btn--big {
      width: 54px;
      height: 54px;
      img {
        padding: 14px;
      }
    }
    &.btn--small {
      width: 30px;
      height: 30px;
      img {
        padding: 7px;
      }
    }
    i {
      // opacity: .75;
      margin: 0;
    }
    &:hover,
    &:active {
      opacity: 1;
    }
  }
  &--rounded {
    width: 40px;
    height: 40px;
    padding: 0;
    border-radius: 50%;
    img {
      max-width: 100%;
      padding: 10px;
    }
    &.btn--big {
      width: 54px;
      height: 54px;
      img {
        padding: 14px;
      }
    }
    &.btn--small {
      width: 30px;
      height: 30px;
      img {
        padding: 7px;
      }
    }
    i {
      margin: 0;
    }
  }

  // Цвета
  &--white {
    --text-color: #cd6684;
    --primary-color: transparent;
    --primary-color-hover: #f6f6f6;
    --primary-color-active: #eeeeee;
    --box-shadow-color: none;
  }
  &--gray {
    --text-color: #4d4d4d;
    --primary-color: #eeeeee;
    --primary-color-hover: #f6f6f6;
    --primary-color-active: #e6e6e6;
    --box-shadow-color: none;
  }
  &--darkgray {
    --text-color: #ffffff;
    --primary-color: #4d4d4d;
    --primary-color-hover: #5b5b5b;
    --primary-color-active: #444444;
    --box-shadow-color: none;
  }
  &--red {
    --primary-color: #e44545;
    --primary-color-hover: #f65959;
    --primary-color-active: #d43838;
    --box-shadow-color: rgba(228, 69, 69, 0.2);
  }
  &--lightred {
    --text-color: #e44545;
    --primary-color: #ffffff;
    --primary-color-hover: rgba(228, 69, 69, 0.1);
    --primary-color-active: rgba(228, 69, 69, 0.25);
    --box-shadow-color: none;
  }

  // Кнопка с обводкой
  &--outline {
    border: 1px solid var(--primary-color);
    background: transparent;
    color: var(--primary-color);
    --box-shadow-color: none;
    &:hover {
      border: 1px solid var(--primary-color-hover);
      color: #fff;
    }
  }
  // Убираем тень
  &--noshadow {
    --box-shadow-color: none;
  }
}

// Отключаем кнопку
.btn.disabled {
  opacity: 0.4;
  box-shadow: none;
  pointer-events: none;
}
</style>

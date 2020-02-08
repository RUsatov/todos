<template>
  <transition name="modal">
    <div class="modal__wrapper" @click="$emit('close')">
      <div class="modal-content" @click.stop="">
        <div class="modal-header">
          <h5 class="modal-title">{{ title }}</h5>
          <span class="button-close" @click="$emit('close')">×</span>
        </div>
        <div class="modal-body">
          <slot name="body">default body</slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {}
  },
  mounted() {
    document.body.addEventListener('keyup', e => {
      if (e.keyCode === 27) {
        this.$emit('close')
      }
    })
  },
  computed: {},
  methods: {},
}
</script>

<style lang="scss" scoped>
// Animation
.modal-enter {
  opacity: 0;
}
.modal-leave-active {
  opacity: 0;
}
.modal-enter .modal-content,
.modal-leave-active .modal-content {
  transform: scale(1.1);
}

.modal__wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  transition: opacity 0.2s ease;
  right: 0;
  z-index: 998;
  background-color: rgba(00, 00, 00, 0.48);
}

.modal-content {
  position: relative;
  max-width: 400px;
  padding: 20px 18px;
  background-color: #fff;
  border: 1px solid #dcdfe6;
  transition: all 0.2s ease;
  border-radius: 8px;
  z-index: 999;
  overflow: hidden;
  @media screen and (max-width: 575.98px) {
    max-width: 310px;
    padding: 28px 10px;
  }
}
.modal-header {
  display: flex;
  align-self: center;
  justify-content: space-between;
  @extend %mb-2;
  // padding-bottom: 20px;
  .button-close {
    cursor: pointer;
  }
}
.modal-body {
  line-height: 1.5;
}
.button-close {
  position: absolute;
  top: 14px;
  right: 14px;
  font-size: 38px;
  line-height: 16px;
}
</style>

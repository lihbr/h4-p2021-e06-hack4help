<template>
  <transition name="fade">
    <div
      v-if="active"
      class="modal fixed w-full h-screen top-0 left-0 bg-black-o-20 z-10"
      @click.self="$emit('close')"
    >
      <div
        class="modal__inner absolute top-50p left-50p transform-center max-w-full w-col-4 bg-white rounded text-center max-h-90vh overflow-auto"
      >
        <icon-cross
          class="absolute closeButton cursor-pointer"
          @click.native="$emit('close')"
        />
        <slot />
      </div>
    </div>
  </transition>
</template>

<script>
import IconCross from "~/assets/icons/cross.svg";

export default {
  components: {
    IconCross
  },
  props: {
    active: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="sass" scoped>
.modal
  &__inner
    padding: 50px 15px

    @screen sm
      padding: 50px 60px

  .closeButton
    top: 15px
    right: 15px

    @screen sm
      top: 54px
      right: 50px

.fade-enter-active, .fade-leave-active
  @apply transition-opacity will-change-opacity transition-quarter

  .modal__inner
    @apply transition-transform will-change-transform transition-quarter

.fade-enter, .fade-leave-to
  @apply opacity-0

  .modal__inner
    transform: translate(-50%, -65%)
</style>

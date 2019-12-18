<template>
  <smart-link
    class="ctaButton block bg-cyan hover:bg-cyan-800 transition-bg-opacity transition-half rounded text-center select-none"
    :class="{
      disabled,
      outline,
      'outline--cyan': outline === 'cyan',
      'outline--red': outline === 'red',
      'outline--grey': outline === 'grey'
    }"
    :href="href"
    :title="title"
    :blank="blank"
  >
    <button
      class="px-5 text-strong-cta uppercase w-inherit outline-none"
      :class="{ small }"
    >
      <slot />
    </button>
  </smart-link>
</template>

<script>
export default {
  props: {
    href: {
      type: String,
      default: () => ""
    },
    title: {
      type: String,
      default: () => ""
    },
    blank: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    outline: {
      type: String,
      default: ""
    }
  }
};
</script>

<style lang="sass" scoped>
.ctaButton
  &.disabled
    @apply cursor-default pointer-events-none opacity-80

  &:not(.outline)
    @apply text-white

  &.outline
    @apply bg-none border

    &:hover
      @apply text-white

    &--grey-800
      @apply text-grey-800 border-grey-800

      &:hover
        @apply bg-grey-800

    &--red
      @apply text-red border-red

      &:hover
        @apply bg-red

    &--cyan
      @apply text-cyan border-cyan

      &:hover
        @apply bg-cyan

  button
    height: 50px

    &.small
      height: 40px
</style>

<template>
  <smart-link
    class="ctaButton block bg-cyan hover:bg-cyan-800 transition-bg-opacity transition-half rounded text-center select-none"
    :class="{ disabled, danger, outline }"
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
    danger: {
      type: Boolean,
      default: false
    },
    outline: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="sass" scoped>
.ctaButton
  &.disabled
    @apply cursor-default pointer-events-none opacity-80

  &:not(.danger):not(.outline)
    @apply text-white

  &.danger
    @apply bg-none text-red border border-red

    &:hover
      @apply bg-red text-white

  &.outline
    @apply bg-none text-grey-800 border border-grey-800

    &:hover
      @apply bg-grey-800 text-white

  button
    height: 50px

    &.small
      height: 40px
</style>

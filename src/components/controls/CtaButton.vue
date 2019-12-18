<template>
  <smart-link
    class="ctaButton block bg-cyan hover:bg-cyan-800 transition-bg transition-half rounded px-5 text-center"
    :href="href"
    :title="title"
    :blank="blank"
  >
    <button class="h-10 text-white text-strong-cta uppercase w-inherit">
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
    }
  }
};
</script>

<style lang="sass" scoped></style>

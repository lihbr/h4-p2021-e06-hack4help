<template>
  <div class="button">
    <button class="bg-primary hover:bg-primaryActive w-64 h-12">
      <p class="text-white">
        {{ this.text }}
      </p>
    </button>
  </div>
</template>

<script>
// import Component from "~/components/Component.vue"

export default {
  components: {
    // Component
  },
  props: ["text"]
};
</script>

<style lang="sass" scoped></style>

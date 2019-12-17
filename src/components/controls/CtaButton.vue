<template>
  <div class="button">
    <button class="bg-primary hover:bg-primaryDarken w-64 h-12">
      <p class="text-white">
        {{ this.text }}
      </p>
    </button>
  </div>
</template>

<script>
// import Component from "~/components/Component.vue"

export default {
  props: ["text"],
  components: {
    // Component
  }
};
</script>

<style lang="sass" scoped></style>

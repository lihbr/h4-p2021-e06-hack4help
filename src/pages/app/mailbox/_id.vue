<template>
  <div class="singleMailbox">
    {{ $route.params.id }}
  </div>
</template>

<script>
// import Component from "~/components/Component.vue"

export default {
  middleware: "isAuth",
  components: {
    // Component
  }
};
</script>

<style lang="sass" scoped></style>

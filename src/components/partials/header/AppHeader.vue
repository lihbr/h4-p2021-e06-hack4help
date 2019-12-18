<template>
  <header class="appHeader bg-grey">
    <div class="flex justify-between items-center container mx-auto p-5">
      <smart-link
        href="/"
        class="logo block items-center font-sub text-l font-medium"
      >
        <img-logo class="sm:mr-3 inline-block" />
        <span class="hidden sm:inline">Une adresse pour tous</span>
      </smart-link>
      <nav class="right">
        <slot />
      </nav>
    </div>
  </header>
</template>

<script>
import ImgLogo from "~/assets/img/logo.svg";

export default {
  components: {
    ImgLogo
  }
};
</script>

<style lang="sass" scoped></style>

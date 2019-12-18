<template>
  <header class="appHeader bg-grey">
    <div class="flex justify-between items-center container mx-auto p-5">
      <figure class="logo flex items-center">
        <img src="" alt="Adresse pour tous" />
      </figure>
      <nav class="right">
        <slot />
      </nav>
    </div>
  </header>
</template>

<script>
export default {};
</script>

<style lang="sass" scoped></style>

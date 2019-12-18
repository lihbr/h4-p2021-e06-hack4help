<template>
  <div class="__layout__app">
    <app-header>
      <div class="flex">
        <user-profile />
        <logout class="ml-3" />
      </div>
    </app-header>
    <main class="main">
      <nuxt />
    </main>
  </div>
</template>

<script>
import objectFitImages from "object-fit-images";

import AppHeader from "~/components/partials/header/AppHeader.vue";
import UserProfile from "~/components/partials/header/actions/UserProfile.vue";
import Logout from "~/components/partials/header/actions/Logout.vue";

export default {
  components: {
    AppHeader,
    UserProfile,
    Logout
  },
  head() {
    return {
      htmlAttrs: {
        class: this.getHtmlClass().join(" ")
      }
    };
  },
  computed: {
    detect() {
      return this.$store.state.detect;
    }
  },
  created() {
    this.$store.dispatch("init");
  },
  mounted() {
    /**
     * Default operations
     */
    this.$store.dispatch("detect/detect");
    // Object fit polyfill
    objectFitImages();
    // Force add classes once
    document.documentElement.classList.add(...this.getHtmlClass());
    /**
     * End of default operations
     */
  },
  methods: {
    getHtmlClass() {
      const htmlClass = [];

      this.detect.browser && htmlClass.push(this.detect.browser);
      this.detect.isMobile && htmlClass.push("isMobile");
      this.detect.isTouch && htmlClass.push("isTouch");

      return htmlClass;
    }
  }
};
</script>

<style lang="sass"></style>

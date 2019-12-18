<template>
  <div class="__layout__default">
    <app-header>
      <div class="flex -mx-2 sm:-mx-semibase">
        <cta-button href="/donate" class="hidden sm:block sm:mx-semibase" small>
          Offrir une adresse
        </cta-button>
        <cta-button href="/donate" class="sm:hidden" small>
          Don
        </cta-button>
        <cta-button
          href="/app/login"
          outline="cyan"
          class="mx-2 sm:mx-semibase"
          small
        >
          Se connecter
        </cta-button>
      </div>
    </app-header>
    <main class="main">
      <nuxt />
    </main>
    <app-footer />
  </div>
</template>

<script>
import objectFitImages from "object-fit-images";

import AppHeader from "~/components/partials/header/AppHeader.vue";
import AppFooter from "~/components/partials/footer/AppFooter.vue";
import CtaButton from "~/components/controls/CtaButton.vue";

export default {
  components: {
    AppHeader,
    AppFooter,
    CtaButton
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

<template>
  <div class="login">
    <div class="flex h-screen">
      <div
        class="bg-grey w-3/5 text-center px-4 py-2 flex flex-col justify-center"
      >
        <h1>
          image unsplash
        </h1>
      </div>
      <div class="bg-white w-2/5 px-20 py-2 flex flex-col justify-center">
        <div>email</div>
        <div>mot de passe</div>
        <div>se souvenir / oublié</div>
        <cta-button text="SE CONNECTER"></cta-button>
        <div>ligne</div>
        <h2>Rejoindre l'aventure</h2>
        <p>Vous êtes une association et vous souhaitez créer un espace ?</p>
        <cta-button text="FAIRE UNE DEMANDE"></cta-button>
      </div>
    </div>
  </div>
</template>

<script>
// import Component from "~/components/Component.vue"
import CtaButton from "../../components/controls/CtaButton.vue";

export default {
  components: {
    // Component
    CtaButton
  }
};
</script>

<style lang="sass" scoped>
.test
  background-color: grey
</style>

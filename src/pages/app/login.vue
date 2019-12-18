<template>
  <div class="login">
    <div class="flex flex-wrap h-screen">
      <div
        class="bg-grey w-full md:w-3/5 text-center flex flex-col justify-center"
      >
        <h1>
          image unsplash
        </h1>
      </div>
      <div
        class="bg-white w-full px-10 xl:px-20 md:w-2/5 flex flex-col justify-center items-center"
      >
        <form
          id="login"
          class="w-full max-w-md"
          action=""
          method="post"
          novalidate="true"
          @submit="checkForm"
        >
          <div class="w-full">
            <div v-if="errors.length" class="text-p-200 mb-4">
              <b v-if="errors.length == 1">
                Merci de corriger l'erreur suivante :
              </b>
              <b v-else>
                Merci de corriger les erreurs suivantes :
              </b>
              <ul>
                <li v-for="error in errors" :key="error" class="text-red">
                  {{ error }}
                </li>
              </ul>
            </div>
            <div class="mb-4">
              <label class="text-p-200 mb-2" for="email">
                Adresse mail
              </label>
              <input
                id="email"
                v-model="email"
                class="inputString flex px-5 rounded border border-grey-800 h-10 items-center w-full"
                type="text"
                placeholder="Votre adresse mail"
              />
            </div>
            <div class="mb-6">
              <label class="text-p-200 mb-2" for="password">
                Mot de passe
              </label>
              <input
                id="password"
                v-model="password"
                class="inputString flex px-5 rounded border border-grey-800 h-10 items-cente w-full"
                type="password"
                placeholder="******************"
              />
            </div>
            <div class="flex flex-row justify-between mb-6">
              <label class="flex items-center">
                <input type="checkbox" class="form-checkbox" />
                <span class="text-p-200 ml-2">Se souvenir de moi</span>
              </label>
              <a class="text-p-200 ml-2 underline">Mot de passe oublié</a>
            </div>
            <button type="submit" class="w-full mb-12">
              <cta-button>
                Se connecter
              </cta-button>
            </button>
          </div>
        </form>
        <div class="h-px w-full bg-grey-600 mb-10"></div>
        <h2 class="text-h2 mb-6">
          Rejoindre l'aventure
        </h2>
        <p class="p text-grey-800 mb-6">
          Vous êtes une association et vous souhaitez créer un espace ?
        </p>
        <cta-button class="w-full">
          Faire une demande
        </cta-button>
        <!--<div class="text-p-200">Adresse email</div>
        <input-string
          v-model="email"
          placeholder="nomprenom@email.net"
          class="mx-semibase flex-1 max-w-full md:w-col-3"
        >
          <template v-slot:before>
            <icon-search class="iconSearch" />
          </template>
        </input-string>
        <div>mot de passe</div>
        <div>se souvenir / oublié</div>
        <cta-button class="w-full">
          Se connecter
        </cta-button>
        <div>ligne</div>
        <h2>Rejoindre l'aventure</h2>
        <p>Vous êtes une association et vous souhaitez créer un espace ?</p>
        <cta-button class="w-full">
          Faire une demande
        </cta-button>-->
      </div>
    </div>
  </div>
</template>

<script>
// import Component from "~/components/Component.vue"
import CtaButton from "../../components/controls/CtaButton.vue";
//import InputString from "../../components/controls/InputString.vue";

export default {
  layout: "blank",
  components: {
    // Component
    CtaButton
    //InputString
  },
  data() {
    return {
      errors: []
    };
  },
  methods: {
    checkForm: function(e) {
      this.errors = [];

      if (!this.email) {
        this.errors.push("Email requis.");
      } else if (!this.validEmail(this.email)) {
        this.errors.push("Merci d'entrer un email valide.");
      }

      if (!this.password) {
        this.errors.push("Password requis.");
      }

      if (!this.errors.length) {
        return true;
      }

      e.preventDefault();
    },
    validEmail: function(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
  }
};
</script>

<style lang="sass" scoped>
.inputString
  &:focus-within
    @apply border-black
</style>

<template>
  <div class="login">
    <div class="flex flex-wrap h-screen">
      <div
        class="bg-grey w-full hidden md:flex md:w-3/5 text-center flex-col justify-center items-center px-20"
      >
        <img-letter class="w-full" />
      </div>
      <div
        class="bg-white w-full px-10 xl:px-20 md:w-2/5 flex flex-col justify-center items-center"
      >
        <smart-link
          href="/"
          class="logo block items-center font-sub text-l font-medium"
        >
          <span class="text-left">Retour</span>
        </smart-link>
        <img-logo class="w-full h-24 mb-6 mt-10" />
        <h2 class="text-h2 mb-10">
          Une adresse pour tous
        </h2>
        <form
          id="login"
          class="w-full max-w-md"
          action
          method="post"
          novalidate="true"
          @submit="checkForm"
        >
          <div class="w-full">
            <div v-if="errors.length" class="text-p-200 mb-4">
              <b v-if="errors.length == 1">
                Merci de corriger l'erreur suivante :
              </b>
              <b v-else>Merci de corriger les erreurs suivantes :</b>
              <ul>
                <li v-for="error in errors" :key="error" class="text-red">
                  {{ error }}
                </li>
              </ul>
            </div>
            <div class="mb-4">
              <label class="text-p-200 mb-2" for="email">Adresse mail</label>
              <input
                id="email"
                v-model="email"
                class="inputString flex px-5 rounded border border-grey-800 h-10 items-center w-full"
                type="text"
                placeholder="Votre adresse mail"
              />
            </div>
            <div class="mb-6">
              <label class="text-p-200 mb-2" for="password">Mot de passe</label>
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
              <cta-button>Se connecter</cta-button>
            </button>
          </div>
        </form>
        <div class="h-px w-full bg-grey-600 mb-10"></div>
        <div class="max-w-md">
          <h2 class="text-h2 mb-6 text-center">
            Nous contacter
          </h2>
          <p class="p text-grey-800 mb-6">
            Vous êtes une association et vous souhaitez créer un espace ?
          </p>
          <cta-button class="w-full mb-10" @click.native="contact = true">
            Faire une demande
          </cta-button>
        </div>
      </div>
    </div>
    <modal :active="contact" @close="contact = false">
      <div class="text-h2 mb-base">
        Suppression d'une boîte
      </div>
      <p class="p text-grey-800 mb-6">
        Une question, une remarque à nous communiquez ? N'hésitez pas à nous
        écrire !
      </p>
      <div v-if="!isRecipient" class="flex -mx-semibase mt-base">
        <cta-button
          :disabled="editing && !canSubmit"
          class="w-full mx-semibase"
          outline="grey-800"
          @click.native="contact = false"
        >
          Annuler
        </cta-button>
        <cta-button
          :disabled="editing && !canSubmit"
          class="w-full mx-semibase"
          outline="red"
          @click.native="sendingContact"
        >
          Confirmer
        </cta-button>
      </div>
    </modal>
  </div>
</template>

<script>
// import Component from "~/components/Component.vue"
import CtaButton from "~/components/controls/CtaButton.vue";
import ImgLetter from "~/assets/img/letter.svg";
import ImgLogo from "~/assets/img/logo.svg";
import Modal from "~/components/controls/Modal.vue";

//import InputString from "../../components/controls/InputString.vue";
import { LoginQuery } from "../../graphql";

export default {
  layout: "blank",
  head: {
    title: "Connexion"
  },
  components: {
    // Component
    CtaButton,
    ImgLetter,
    ImgLogo,
    Modal
    //InputString
  },
  data() {
    return {
      errors: [],
      email: "",
      password: "",
      contact: false,
      editing: false,
      isRecipient: false
    };
  },
  methods: {
    checkForm(e) {
      e.preventDefault();

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
        this.authenticate();
        return true;
      }

      return false;
    },
    validEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    async authenticate() {
      try {
        const result = await this.$apollo.mutate({
          mutation: LoginQuery,
          variables: {
            email: this.email,

            password: this.password
          }
        });

        this.errors = [];
        this.$store.commit("currentUser/set", result.data.login.user);
        this.$apolloHelpers.onLogin(result.data.login.token);
        this.$nuxt.$router.push("/app/dashboard");
      } catch (e) {
        this.errors.push("Email ou mot de passe invalide");
      }
    },
    sendingContact() {
      // TODO: Handle submit
      window.alert("TODO: Handle submit");

      this.contact = false;
      this.$router.push("/app/login");
    }
  }
};
</script>

<style lang="sass" scoped>
.inputString
  &:focus-within
    @apply border-black
</style>

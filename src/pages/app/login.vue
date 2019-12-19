<template>
  <div class="login flex items-center justify-between h-screen">
    <smart-link
      href="/"
      class="absolute top-base left-semibase lg:left-col text-grey-800 font-medium text-l"
    >
      <icon-arrow-left class="inline-block mr-1" />Retour
    </smart-link>
    <img-letter class="flex-1 mx-base hidden lg:block" />
    <div
      class="bg-white min-h-screen w-full px-semibase lg:px-col lg:pt-col lg:pb-base lg:w-col-5 lg:h-screen lg:overflow-x-auto"
    >
      <figure class="mb-10 sm:mb-20">
        <img-logo class="w-full h-24 mb-6 mt-10" />
        <h1 class="font-sub text-3xl font-medium text-center">
          Une adresse pour tous
        </h1>
      </figure>
      <form
        class="border-b border-grey-600 mb-10"
        novalidate="true"
        @submit.prevent="authenticate"
      >
        <div class="w-full">
          <div class="inputWrapper mb-base">
            <label for="email">Adresse e-mail</label>
            <input-string
              v-model="authentication.email"
              link-id="email"
              placeholder="jean.dupuis@gmail.com"
              type="mail"
            />
          </div>
          <div class="inputWrapper mb-semibase">
            <label for="password">Mot de passe</label>
            <input-string
              v-model="authentication.password"
              link-id="password"
              placeholder="Votre mot de passe"
              type="password"
            />
          </div>

          <div class="flex flex-row justify-between mb-6">
            <label class="flex items-center">
              <input type="checkbox" class="form-checkbox" />
              <span class="text-p-200 ml-2">Se souvenir de moi</span>
            </label>
            <span
              class="text-p-200 ml-2 underline cursor-pointer"
              @click="contacting = true"
            >
              Mot de passe oublié
            </span>
          </div>

          <div class="inputWrapper mb-10">
            <small v-if="authenticationError" class="text-red">
              Identifiant ou mot de passe incorrect.
            </small>
            <cta-button type="submit" class="w-full" :disabled="!canSubmit">
              Se connecter
            </cta-button>
          </div>
        </div>
      </form>
      <div class="mt-10 text-center">
        <h2 class="text-h2 mb-5">
          Nous contacter
        </h2>
        <p class="text-p text-grey-800 mb-base">
          Vous êtes une association et vous souhaitez créer un espace ?
        </p>
        <cta-button class="w-full" @click.native="contacting = true">
          Faire une demande
        </cta-button>
      </div>
    </div>

    <modal :active="contacting" @close="contacting = false">
      <div class="text-h2 mb-base">
        Nous contacter
      </div>
      <p class="text-p text-grey-800 mb-6">
        Un problème ? Une demande ? Nous sommes là pour vous aider !
      </p>
      <form class="text-left" @submit.prevent="sendContact">
        <div class="inputWrapper mb-semibase">
          <label for="cLastName">Nom</label>
          <input-string
            v-model="contact.lastName"
            link-id="lastName"
            placeholder="Dupuis"
          />
        </div>
        <div class="inputWrapper mb-semibase">
          <label for="cFirstName">Prénom</label>
          <input-string
            v-model="contact.firstName"
            link-id="cFirstName"
            placeholder="Jean"
          />
        </div>
        <div class="inputWrapper mb-semibase">
          <label for="cEmail">Email</label>
          <input-string
            v-model="contact.email"
            link-id="cEmail"
            type="mail"
            placeholder="jean.dupuis@gmail.com"
          />
        </div>
        <div class="inputWrapper mb-semibase">
          <label for="cEmail">Votre message</label>
          <textarea
            id="cMessage"
            v-model="contact.message"
            class="w-full rounded outline-none border border-grey-600 p-5 text-p h-40 resize-none"
          />
        </div>
        <div class="flex -mx-semibase mt-base">
          <cta-button
            :disabled="!canSubmitContact"
            class="w-full mx-semibase"
            type="submit"
          >
            Envoyer
          </cta-button>
        </div>
      </form>
    </modal>
  </div>
</template>

<script>
import CtaButton from "~/components/controls/CtaButton.vue";
import Modal from "~/components/controls/Modal.vue";

import IconArrowLeft from "~/assets/icons/arrow--left.svg";
import ImgLetter from "~/assets/img/letter.svg";
import ImgLogo from "~/assets/img/logo.svg";

import InputString from "../../components/controls/InputString.vue";
import { LoginQuery } from "../../graphql";

export default {
  layout: "blank",
  middleware: "isNotAuth",
  head: {
    title: "Connexion"
  },
  components: {
    CtaButton,
    InputString,
    Modal,
    IconArrowLeft,
    ImgLetter,
    ImgLogo
  },
  data() {
    return {
      errors: [],
      email: "",
      password: "",
      authentication: {
        email: "",
        password: ""
      },
      authenticationError: false,
      contact: {
        firstName: "",
        lastName: "",
        email: "",
        message: ""
      },
      contacting: false
    };
  },
  computed: {
    canSubmit() {
      if (this.authentication.email.trim() === "") return false;
      if (this.authentication.password.trim() === "") return false;

      const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (!emailRegex.test(this.authentication.email)) return false;

      return true;
    },
    canSubmitContact() {
      if (this.contact.firstName.trim() === "") return false;
      if (this.contact.lastName.trim() === "") return false;
      if (this.contact.email.trim() === "") return false;
      if (this.contact.message.trim() === "") return false;

      return true;
    }
  },
  methods: {
    async authenticate() {
      try {
        this.authenticationError = false;

        const result = await this.$apollo.mutate({
          mutation: LoginQuery,
          variables: {
            email: this.authentication.email,

            password: this.authentication.password
          }
        });

        this.$store.commit("currentUser/set", result.data.login.user);
        this.$apolloHelpers.onLogin(result.data.login.token);
        this.$nuxt.$router.push("/app/dashboard");
      } catch (e) {
        this.authenticationError = true;
      }
    },
    sendContact() {
      this.contacting = false;
      this.$router.push("/");
    }
  }
};
</script>

<style lang="sass" scoped>
.login
  .inputWrapper
    label
      @apply text-xsAlt text-grey-800 leading-loose

    small
      @apply text-xsAlt text-red
</style>

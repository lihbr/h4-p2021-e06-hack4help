<template>
  <div class="donate">
    <section class="container mx-auto px-5 text-center py-20">
      <h1 class="inline-block text-h1 px-2 pb-1 border-b-4 border-cyan mb-20">
        Offrez une adresse
      </h1>
      <div class="flex flex-wrap -m-semibase">
        <div class="w-full 2xl:w-1/3 p-semibase">
          <div
            class="card sm:flex justify-between 2xl:block items-center bg-white rounded text-left 2xl:text-center px-base-2 py-semibase 2xl:py-10"
          >
            <div class="text-center">
              <strong class="block font-sub text-6xl font-medium">
                5€ / mois
              </strong>
              <small class="block text-p-200">Sans engagement</small>
            </div>
            <img-mailbox class="hidden 2xl:block mx-auto my-10" />
            <p
              class="text-p my-semibase sm:my-0 sm:mx-base 2xl:mx-0 2xl:mb-semibase flex-1 text-center sm:text-right 2xl:text-center"
            >
              Merci !<br />
              Vous participez au financement d'une adresse.
            </p>
            <cta-button
              href="https://paypal.com"
              class="mx-auto sm:mx-0 max-w-40 2xl:mx-auto"
              blank
              small
            >
              Choisir
            </cta-button>
          </div>
        </div>
        <div class="w-full 2xl:w-1/3 p-semibase">
          <div
            class="card sm:flex justify-between 2xl:block items-center bg-white rounded text-left 2xl:text-center px-base-2 py-semibase 2xl:py-10"
          >
            <div class="text-center">
              <strong class="block font-sub text-6xl font-medium">
                10€ / mois
              </strong>
              <small class="block text-p-200">Sans engagement</small>
            </div>
            <img-mailbox class="hidden 2xl:block mx-auto my-10" />
            <p
              class="text-p my-semibase sm:my-0 sm:mx-base 2xl:mx-0 2xl:mb-semibase flex-1 text-center sm:text-right 2xl:text-center"
            >
              Merci !<br />
              Vous offrez une adresse.
            </p>
            <cta-button
              href="https://paypal.com"
              class="mx-auto sm:mx-0 max-w-40 2xl:mx-auto"
              blank
              small
            >
              Choisir
            </cta-button>
          </div>
        </div>
        <div class="w-full 2xl:w-1/3 p-semibase">
          <div
            class="card sm:flex justify-between 2xl:block items-center bg-white rounded text-left 2xl:text-center px-base-2 py-semibase 2xl:py-10"
          >
            <div class="text-center">
              <strong class="block font-sub text-6xl font-medium">
                20€ / mois
              </strong>
              <small class="block text-p-200">Sans engagement</small>
            </div>
            <img-mailbox-double class="hidden 2xl:block mx-auto my-10" />
            <p
              class="text-p my-semibase sm:my-0 sm:mx-base 2xl:mx-0 2xl:mb-semibase flex-1 text-center sm:text-right 2xl:text-center"
            >
              Merci !<br />
              Vous offrez deux adresses.
            </p>
            <cta-button
              href="https://paypal.com"
              class="mx-auto sm:mx-0 max-w-40 2xl:mx-auto"
              blank
              small
            >
              Choisir
            </cta-button>
          </div>
        </div>
      </div>
    </section>
    <section class="bg-white py-20">
      <div class="container mx-auto px-5 text-center">
        <h2 class="text-h1 mb-12">
          Ou faites un don ponctuel
        </h2>
        <div class="flex flex-wrap -m-semibase">
          <div class="w-full sm:w-1/2 lg:w-1/4 p-semibase">
            <div class="card bg-grey rounded text-center px-12 py-5">
              <strong class="font-sub text-6xl font-medium">5€</strong>
              <cta-button href="https://paypal.com" blank small>
                Choisir
              </cta-button>
            </div>
          </div>
          <div class="w-full sm:w-1/2 lg:w-1/4 p-semibase">
            <div class="card bg-grey rounded text-center px-12 py-5">
              <strong class="font-sub text-6xl font-medium">10€</strong>
              <cta-button href="https://paypal.com" blank small>
                Choisir
              </cta-button>
            </div>
          </div>
          <div class="w-full sm:w-1/2 lg:w-1/4 p-semibase">
            <div class="card bg-grey rounded text-center px-12 py-5">
              <strong class="font-sub text-6xl font-medium">20€</strong>
              <cta-button href="https://paypal.com" blank small>
                Choisir
              </cta-button>
            </div>
          </div>
          <div class="w-full sm:w-1/2 lg:w-1/4 p-semibase">
            <div class="card bg-grey rounded text-center px-12 py-5">
              <strong class="font-sub text-6xl font-medium">156€</strong>
              <cta-button href="https://paypal.com" blank small>
                Choisir moi-même
              </cta-button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="container mx-auto px-5 md:flex items-center py-20">
      <div class="md:w-1/2">
        <h2 class="text-h1 max-w-col-4 mb-base">
          A quoi mon don va t-il exactement servir ?
        </h2>
        <p class="text-p-600 mb-base">
          Les solutions proposées pour héberger le courrier des personnes sans
          domicile fixe par les CCAS<small class="align-top text-xs">1</small>,
          les CIAS<small class="align-top text-xs">2</small> ou les associations
          sont actuellement saturées. De ce fait, beaucoup de personnes
          nécessiteux d’une adresse ne peuvent avoir accès à ce droit
          primordial.
        </p>
        <p class="text-p-600 mb-base">
          Une Adresse Pour Tous offre une solution à ce problème en proposant
          une plateforme permettant de mettre en relation les associations et
          les entreprises de domiciliation privés. C’est grâce à vos dons que ce
          projet est financé étant donné que la location des services de ces
          entreprises est payante.
        </p>
        <div class="text-p-200 mb-1">
          <small class="align-top text-3xs">1</small> centres communaux d'action
          sociale
        </div>
        <div class="text-p-200">
          <small class="align-top text-3xs">2</small> centres intercommunaux
          d'action sociale
        </div>
      </div>
      <img-donate
        class="max-w-full md:w-1/2 px-semibase mx-auto mt-10 md:mt-0"
      />
    </section>
    <section class="container mx-auto px-5 md:flex items-center py-20">
      <img-taxes
        class="hidden md:block max-w-full md:w-1/2 px-semibase mx-auto mt-10 md:mt-0"
      />
      <div class="md:w-1/2 md:text-right">
        <h3 class="text-h1 max-w-col-4 mb-base md:ml-auto">
          Réduction d’impôts grâce aux dons
        </h3>
        <p class="text-p-600 mb-10">
          Si vous avez effectué des dons à des associations qui assurent la
          fourniture gratuite de repas ou de soins médicaux ou qui favorisent le
          logement de personnes en difficulté, en France et à l’étranger vous
          bénéficiez alors d’une réduction d’impôt égale à 75% des versements
          retenus.
        </p>
        <p class="text-p-600">
          Pour plus d’information :
          <smart-link
            href="https://www.service-public.fr/particuliers/vosdroits/F426"
            blank
            class="underline"
            v-text="`cliquez-ici`"
          />.
        </p>
      </div>
      <img-taxes
        class="md:hidden max-w-full md:w-1/2 px-semibase mx-auto mt-10 md:mt-0"
      />
    </section>
  </div>
</template>

<script>
import CtaButton from "~/components/controls/CtaButton.vue";

import ImgMailbox from "~/assets/img/mailbox.svg";
import ImgMailboxDouble from "~/assets/img/mailboxDouble.svg";
import ImgDonate from "~/assets/img/donate.svg";
import ImgTaxes from "~/assets/img/taxes.svg";

export default {
  head: {
    title: "Faire un don"
  },
  components: {
    CtaButton,
    ImgMailbox,
    ImgMailboxDouble,
    ImgDonate,
    ImgTaxes
  }
};
</script>

<style lang="sass" scoped>
.donate
  .card
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.15)
</style>

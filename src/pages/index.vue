<template>
  <div class="home">
    <section class="container mx-auto px-5 md:flex items-center py-20">
      <div class="md:w-1/2">
        <h1 class="text-h1 max-w-col-4 mb-base">
          Offrez une adresse à une personne sans domicile fixe
        </h1>
        <p class="text-p-600">
          Saviez vous que 40% des personnes sans-abri ne touchent pas les
          allocations auxquelles elles auraient droit car elles n’ont pas
          d’adresse ? Avoir une adresse c’est pouvoir ouvrir un compte bancaire,
          profiter d’une abonnement téléphonique, disposer d’une carte
          électorale ou encore pouvoir recevoir ses papiers d’identités !
        </p>
      </div>
      <img-sending-mail
        class="max-w-full md:w-1/2 px-semibase mx-auto mt-10 md:mt-0"
      />
    </section>
    <section class="bg-white py-20">
      <div class="container mx-auto px-5 text-center">
        <h2 class="text-h1 mb-base">
          Avoir une adresse, le premier pas pour avoir des droits.
        </h2>
        <p class="text-p-600 mb-10">
          Aidez les personnes sans domicile fixe d’une manière durable en leur
          offrant une boite aux lettres.
        </p>
        <cta-button href="/donate" class="max-w-col-4 mx-auto">
          Offrir une adresse
        </cta-button>
      </div>
    </section>
    <section class="container mx-auto px-5 text-center py-20">
      <h2 class="inline-block text-h1 px-2 pb-1 border-b-4 border-cyan mb-20">
        Qui sommes-nous ?
      </h2>
      <img-about-us class="max-w-full mx-auto hidden md:block" />
      <ul class="md:hidden text-left -my-semibase">
        <li class="my-semibase">
          <h4 class="text-h2">
            Les personnes sans domicile fixe
          </h4>
          <p class="text-p">
            Ont besoin d’une adresse pour bénéficier de leurs droits.
          </p>
        </li>
        <li class="my-semibase">
          <h4 class="text-h2">
            Les associations
          </h4>
          <p class="text-p">
            S’occupent des démarchent administratives, des demandes et du suivi
            de la personne.
          </p>
        </li>
        <li class="my-semibase">
          <h4 class="text-h2">
            Les sociétés de domiciliation
          </h4>
          <p class="text-p">
            Fournissent l’adresse de domiciliation postale, reçoivent et gèrent
            le courrier.
          </p>
        </li>
        <li class="my-semibase">
          <h4 class="text-h2">
            Et nous ?
          </h4>
          <p class="text-p">
            Nous faisons le lien entre ces trois acteurs !
          </p>
        </li>
      </ul>
    </section>
    <section class="bg-white py-20">
      <div class="container mx-auto px-5 text-center">
        <h3 class="inline-block text-h1 px-2 pb-1 border-b-4 border-cyan mb-20">
          Notre impact
        </h3>
        <div class="md:flex justify-around">
          <div
            class="md:w-1/2 max-w-col-4 mx-base-2 md:mx-base mb-base-2 md:mb-0"
          >
            <figure
              class="testimony relative rounded-lg overflow-hidden w-full"
            >
              <img
                src="/assets/img/testimony1.jpg"
                alt="Alice"
                class="w-full object-cover"
              />
              <div
                class="absolute left-50p transform-center-x bottom-semibase text-white text-xl"
              >
                Alice, 28 ans
              </div>
            </figure>
            <blockquote class="text-p-600 mt-5">
              “ Ce qui m’a plus c’est de faire un don et de savoir qu’on a un
              réel impact ! ”
            </blockquote>
          </div>
          <div class="md:w-1/2 max-w-col-4 mx-base-2 md:mx-base">
            <figure
              class="testimony relative rounded-lg overflow-hidden w-full"
            >
              <img
                src="/assets/img/testimony2.jpg"
                alt="Marc"
                class="w-full object-cover"
              />
              <div
                class="absolute left-50p transform-center-x bottom-semibase text-white text-xl"
              >
                Marc, 53 ans
              </div>
            </figure>
            <blockquote class="text-p-600 mt-5">
              “ Grâce à ma donatrice, j’ai regagné mes droits et trouvé un
              travail ! ”
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import CtaButton from "~/components/controls/CtaButton.vue";

import ImgSendingMail from "~/assets/img/sendingMail.svg";
import ImgAboutUs from "~/assets/img/aboutUs.svg";

export default {
  components: {
    CtaButton,
    ImgSendingMail,
    ImgAboutUs
  }
};
</script>

<style lang="sass" scoped>
.home
  .testimony
    box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.25)
</style>

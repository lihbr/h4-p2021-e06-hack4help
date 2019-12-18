<template>
  <div class="retrieveForm">
    <div class="text-center pb-base">
      <img-mailbox class="mx-auto mb-12" />
      <template v-if="mailbox.status === 'active'">
        <div class="text-7xl font-medium leading-tight">
          {{ mailbox.pending >= 0 ? mailbox.pending : "?" }}
        </div>
        <div class="text-m">
          Courrier{{ mailbox.pending > 1 ? "s" : "" }}
          {{ wording[mailbox.retrieveStatus] }}
        </div>
      </template>
      <div v-else-if="mailbox.status === 'queued'" class="text-m">
        Votre boîte aux lettres est en cours d'ouverture, nous attendons qu'une
        soit disponible pour vous l'attribuer.
      </div>
      <div v-else-if="mailbox.status === 'new'">
        Une boîte aux lettres sera attribuée à la personne dans les meilleurs
        délais une fois que vous aurez créé son compte.
      </div>
      <div v-else class="text-m">
        Votre boîte aux lettres a été suspendue par votre association,
        rapprochez vous de cette dernière pour en savoir plus.
      </div>
    </div>
    <div
      v-if="mailbox.status === 'active'"
      class="pt-8 border-t border-grey-600"
    >
      <h3 class="text-center text-m font-semibold mb-base">
        Retirer mon courrier
      </h3>
      <form
        v-if="mailbox.retrieveStatus === 'available'"
        @submit.prevent="submit"
      >
        <div class="radio text-p mb-semibase">
          <input
            id="retrieveOptionRelay"
            v-model="option"
            type="radio"
            value="relay"
            class="hidden"
          />
          <label for="retrieveOptionRelay">
            Point de retrait
          </label>
        </div>
        <input-select
          v-model="relay"
          class="mb-semibase"
          :options="relayOptions"
          :disabled="option !== 'relay'"
        />
        <div class="radio text-p mb-semibase">
          <input
            id="retrieveOptionPerso"
            v-model="option"
            type="radio"
            value="perso"
            class="hidden"
          />
          <label for="retrieveOptionPerso">
            Adresse personalisée
          </label>
        </div>
        <input-string
          v-model="perso"
          placeholder="La Poste, 27 Rue des Francs Bourgeois..."
          :disabled="option !== 'perso'"
        />
        <cta-button class="mt-5 w-full" :disabled="!canSubmit">
          Récupérer mon courrier
        </cta-button>
      </form>
      <div v-else class="text-center">
        <div class="mb-semibase">
          {{
            mailbox.retrieveStatus === "delivering"
              ? "Votre courrier est en cours d'acheminement vers :"
              : "Votre courrier vous attends à l'adresse suivante :"
          }}
        </div>
        <em>{{ relayOptions[1] }}</em>
      </div>
    </div>
  </div>
</template>

<script>
import faker from "faker";

import InputString from "~/components/controls/InputString.vue";
import InputSelect from "~/components/controls/InputSelect.vue";
import CtaButton from "~/components/controls/CtaButton.vue";

import ImgMailbox from "~/assets/img/mailbox.svg";

export default {
  components: {
    InputString,
    InputSelect,
    CtaButton,

    ImgMailbox
  },
  props: {
    mailbox: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      option: "relay",
      relay: "",
      relayOptions: [""],
      perso: "",
      wording: {
        available: "en attente",
        delivering: "en livraison",
        delivered: "livrés"
      }
    };
  },
  computed: {
    canSubmit() {
      if (this.option === "relay") {
        return !!this.relay;
      } else {
        return !!this.perso;
      }
    }
  },
  created() {
    const totalRelay = faker.random.number({ min: 4, max: 12 });

    const companies = [
      "La Poste",
      "Relai UPS",
      "Dépôt colissimo",
      "Association"
    ];

    const roadTypes = ["Rue", "Allée", "Boulevard", "Impasse", "Avenue"];

    const cities = [
      "Paris",
      "Montreuil",
      "Clichy",
      "Marne la vallée",
      "Fontenay",
      "Puteaux",
      "Suresnes"
    ];

    for (let i = 0; i < totalRelay; i++) {
      const company = faker.random.arrayElement(companies);

      const streetNumber = faker.random.number({
        min: 1,
        max: 200
      });
      const roadType = faker.random.arrayElement(roadTypes);
      const roadName = faker.name.lastName();

      const city = faker.random.arrayElement(cities);

      const address = `${company}, ${streetNumber} ${roadType} ${roadName} - ${city}`;
      this.relayOptions.push(address);
    }
  },
  methods: {
    submit() {
      // TODO: Handle submit
      window.alert("TODO: Handle submit");

      this.$emit("updated");
    },
    clearForm() {
      this.option = "relay";
      this.relay = "";
      this.perso = "";
    }
  }
};
</script>

<style lang="sass" scoped>
.retrieveForm
  .radio
    label
      @apply pl-base relative text-grey-800

      &::before
        @apply block absolute left-2 top-50p transform-center-y h-3 w-3 rounded-full
        content: ""

    input:not(:checked) + label
      &::before
        @apply border border-grey-600

    input:checked + label
      &::before
        @apply bg-black
</style>

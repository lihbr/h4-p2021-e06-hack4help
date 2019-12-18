<template>
  <div class="profileForm">
    <div class="inputWrapper mb-semibase">
      <label for="lastName">Nom</label>
      <input-string
        v-model="cRecipient.lastName"
        link-id="lastName"
        :disabled="!editing && !creating"
        :dark="editing || creating"
      />
    </div>
    <div class="inputWrapper mb-semibase">
      <label for="firstName">Prénom</label>
      <input-string
        v-model="cRecipient.firstName"
        link-id="firstName"
        :disabled="!editing && !creating"
        :dark="editing || creating"
      />
    </div>
    <div class="inputWrapper mb-semibase">
      <label for="mail">Email</label>
      <input-string
        v-model="cRecipient.mail"
        link-id="mail"
        type="mail"
        :disabled="!editing && !creating"
        :dark="editing || creating"
      />
    </div>
    <cta-button
      v-if="isRecipient"
      :disabled="editing && !canSubmit"
      class="mb-semibase w-full"
      @click.native="editing ? submit() : (editing = true)"
    >
      {{ editing ? "Sauvegarder" : "Éditer mon profil" }}
    </cta-button>
    <div class="inputWrapper mb-semibase">
      <label for="street">Adresse postale</label>
      <input-string
        v-model="cMailbox.address.street"
        link-id="street"
        :disabled="!editing && !creating && !isRecipient"
        :dark="(editing || creating) && !isRecipient"
      />
    </div>
    <div class="flex mb-semibase">
      <div class="inputWrapper city w-2/3">
        <label for="city">Ville</label>
        <input-string
          v-model="cMailbox.address.city"
          link-id="city"
          :disabled="!editing && !creating && !isRecipient"
          :dark="(editing || creating) && !isRecipient"
        />
      </div>
      <div class="inputWrapper w-1/3">
        <label for="zip">Code postal</label>
        <input-string
          v-model="cMailbox.address.zip"
          link-id="zip"
          :disabled="!editing && !creating && !isRecipient"
          :dark="(editing || creating) && !isRecipient"
        />
      </div>
    </div>
    <div class="inputWrapper mb-semibase">
      <label for="document">
        <div class="mb-1">Adresse postale</div>
        <input-string
          v-model="cRecipient.document.name"
          link-id="document"
          type="file"
          :disabled="!editing && !creating && !isRecipient"
          :dark="(editing || creating) && !isRecipient"
          class="cursor-pointer"
        >
          <template v-slot:after>
            <div
              v-if="editing && !isRecipient && cRecipient.document.name !== ''"
              class="clearButton"
              @click.prevent="cRecipient.document.name = ''"
            >
              <icon-cross-silhouette class="w-6 h-6 icon" />
            </div>
            <a
              href="/assets/files/id_sample.pdf"
              target="_blank"
              class="downloadButton block border-l border-grey-600 -mr-5"
            >
              <icon-download class="icon" />
            </a>
          </template>
        </input-string>
      </label>
    </div>
    <div v-if="!isRecipient" class="flex -mx-semibase mt-base">
      <cta-button
        v-if="!creating"
        :disabled="editing && !canSubmit"
        class="w-full mx-semibase"
        danger
        @click.native="deleting = true"
      >
        Supprimer
      </cta-button>
      <cta-button
        :disabled="(editing || creating) && !canSubmit"
        class="w-full mx-semibase"
        @click.native="editing || creating ? submit() : (editing = true)"
      >
        <template v-if="editing">
          Sauvegarder
        </template>
        <template v-else-if="creating">
          Créer
        </template>
        <template v-else>
          Éditer
        </template>
      </cta-button>
    </div>
    <transition name="fade">
      <div
        v-if="deleting"
        class="modal fixed w-full h-screen top-0 left-0 bg-black-o-20 z-10"
        @click.self="deleting = false"
      >
        <div
          class="modal__inner absolute top-50p left-50p transform-center max-w-col-4 bg-white rounded text-center"
        >
          <div class="text-h2 mb-base">
            Suppression d'une boîte
          </div>
          <div class="text-p text-grey-800">
            Êtes-vous sûr de bien vouloir supprimer la boîte de
            <strong>{{ recipient | fullName }}</strong>
            , cette action est définitive.
          </div>
          <div v-if="!isRecipient" class="flex -mx-semibase mt-base">
            <cta-button
              :disabled="editing && !canSubmit"
              class="w-full mx-semibase"
              outline
              @click.native="deleting = false"
            >
              Annuler
            </cta-button>
            <cta-button
              :disabled="editing && !canSubmit"
              class="w-full mx-semibase"
              danger
              @click.native="deleteMailbox"
            >
              Confirmer
            </cta-button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import InputString from "~/components/controls/InputString.vue";
import CtaButton from "~/components/controls/CtaButton.vue";

import IconDownload from "~/assets/icons/download.svg";
import IconCrossSilhouette from "~/assets/icons/cross--silhouette.svg";

export default {
  components: {
    InputString,
    CtaButton,
    IconDownload,
    IconCrossSilhouette
  },
  props: {
    recipient: {
      type: Object,
      default: () => {}
    },
    mailbox: {
      type: Object,
      default: () => {}
    },
    isRecipient: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      editing: false,
      deleting: false,
      cRecipient: {
        firstName: "",
        lastName: "",
        mail: "",
        document: {
          name: ""
        }
      },
      cMailbox: {
        address: {
          street: "",
          city: "",
          zip: 0
        }
      }
    };
  },
  computed: {
    canSubmit() {
      if (this.cRecipient.firstName.trim() === "") return false;
      if (this.cRecipient.lastName.trim() === "") return false;
      if (this.cRecipient.mail.trim() === "") return false;

      if (this.cMailbox.address.street.trim() === "") return false;
      if (this.cMailbox.address.city.trim() === "") return false;
      if (new String(this.cMailbox.address.zip).trim() === "") return false;

      if (this.cRecipient.document) {
        if (this.cRecipient.document.name.trim() === "") return false;
      } else {
        return false;
      }

      return true;
    },
    creating() {
      return this.mailbox.status === "new";
    }
  },
  watch: {
    recipient: {
      handler() {
        this.cRecipient = this.recipient;
      },
      deep: true
    },
    mailbox: {
      handler() {
        this.cMailbox = this.mailbox;
      },
      deep: true
    }
  },
  mounted() {
    this.cRecipient = this.recipient;
    this.cMailbox = this.mailbox;
  },
  methods: {
    submit() {
      // TODO: Handle submit
      window.alert("TODO: Handle submit");

      console.log(this.creating);

      if (this.creating) {
        // creating
        console.log("oui");

        const { id } = { id: "636cb36d-ddc5-4bd8-860f-4d2f769a057e" }; // await...
        this.$router.push(`/app/mailbox/${id}`);
      } else {
        // update
        this.editing = false;
        this.$emit("updated");
      }
    },
    deleteMailbox() {
      // TODO: Handle submit
      window.alert("TODO: Handle submit");

      this.deleting = false;
      this.$router.push("/app/dashboard");
    }
  }
};
</script>

<style lang="sass" scoped>
.profileForm
  .inputWrapper
    label
      @apply text-xsAlt text-grey-800

    &.city
      margin-right: 10px

    .clearButton, .downloadButton
      @apply h-full relative transition-bg transition-quarter cursor-pointer
      width: 60px

      &:hover
        @apply bg-grey

      .icon
        @apply absolute transform-center top-50p left-50p

  .modal
    &__inner
      padding: 50px 60px

  .fade-enter-active, .fade-leave-active
    @apply transition-opacity will-change-opacity transition-quarter

  .fade-enter, .fade-leave-to
    @apply opacity-0
</style>

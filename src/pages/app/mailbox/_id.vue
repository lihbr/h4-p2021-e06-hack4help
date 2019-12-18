<template>
  <div class="singleMailbox container mx-auto px-5 pt-base">
    <div class="shadow absolute inset-0 bg-black opacity-15 -z-1" />
    <section class="bg-white rounded">
      <header
        class="flex justify-between items-center border-b border-grey-600 px-10 text-l font-medium"
      >
        <h1>
          <icon-user-green class="icon inline-block" />
          <span v-if="isRecipient">Ma boîte postale</span>
          <span v-else>{{ recipient | fullName }}</span>
        </h1>
        <smart-link
          v-if="!isRecipient"
          class="close px-10 -mx-10 h-full flex items-center"
          href="/app/dashboard"
          title="Retour dashboard"
        >
          <icon-cross
            class="icon transition-bg transition-half rounded-full p-1"
          />
        </smart-link>
      </header>
      <div class="forms lg:flex py-12 pb-24">
        <retrieve-form :mailbox="mailbox" @updated="refreshInfo" />
        <profile-form
          class="relative"
          :recipient="recipient"
          :mailbox="mailbox"
          :is-recipient="isRecipient"
          @updated="refreshInfo"
        />
      </div>
    </section>
  </div>
</template>

<script>
import faker from "faker";

import RetrieveForm from "~/components/sections/mailbox/RetrieveForm.vue";
import ProfileForm from "~/components/sections/mailbox/ProfileForm.vue";

import IconUserGreen from "~/assets/icons/user--green.svg";
import IconCross from "~/assets/icons/cross.svg";

export default {
  // middleware: "isAuth",
  layout: "app",
  components: {
    RetrieveForm,
    ProfileForm,

    IconUserGreen,
    IconCross
  },
  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    },
    isRecipient() {
      return this.currentUser.group === "recipient";
    }
  },
  async asyncData({ params }) {
    // TODO: Perform actual query
    console.log(params);

    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const mail = `${firstName}.${lastName}@adresse-pour-tous.fr`.toLowerCase();

    const recipient = {
      id: faker.random.uuid(),
      firstName,
      lastName,
      mail,
      document: {
        file: `${faker.random.uuid()}.pdf`,
        name: `${lastName}.pdf`
      }
    };

    const streetNumber = faker.random.number({
      min: 1,
      max: 200
    });
    const roadType = faker.random.arrayElement([
      "Rue",
      "Allée",
      "Boulevard",
      "Impasse",
      "Avenue"
    ]);
    const roadName = faker.name.lastName();
    const city = faker.random.arrayElement([
      "Paris",
      "Montreuil",
      "Clichy",
      "Marne la vallée",
      "Fontenay",
      "Puteaux",
      "Suresnes"
    ]);
    const zip =
      faker.random.number({
        min: 7500,
        max: 9500
      }) * 10;

    const mailbox = {
      status: faker.random.arrayElement(["queued", "active", "suspended"]),

      address: {
        street: `${streetNumber} ${roadType} ${roadName}`,
        city,
        zip
      },

      pending: faker.random.number(20),
      sendToMail: faker.random.boolean(),

      retrieveStatus: faker.random.arrayElement([
        "available",
        "delivering",
        "delivered"
      ])
    };

    return { recipient, mailbox };
  },
  created() {
    // TODO: Actually fetch user
    this.$store.commit("currentUser/setFake");
  },
  methods: {
    async refreshInfo() {
      // TODO: Handle refresh
      window.alert("TODO: Handle refresh");

      const refreshedRecipient = {}; // await...
      const refreshedMailbox = {}; // await...

      // this.recipient = refreshedRecipient;
      // this.mailbox = refreshedMailbox;
    }
  }
};
</script>

<style lang="sass" scoped>
.singleMailbox
  padding-bottom: 45px

  header
    height: 89px

    h1 .icon
      margin-right: 10px

    .close
      .icon
        height: 28px
        width: 28px

      &:hover
        .icon
          @apply bg-grey

  .forms
    .retrieveForm, .profileForm
      @apply px-semibase

      @screen sm
        @apply px-base

      @screen lg
        @apply w-1/2 px-12

      @screen xl
        @apply px-24

      @screen 2xl
        @apply px-col

    .profileForm
      @screen lg
        &::before
          @apply block absolute top-5p left-0 w-px h-90p bg-grey-600
          content: ""
</style>

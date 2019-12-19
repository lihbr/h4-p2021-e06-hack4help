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
          <span v-else>
            <!-- eslint-disable -->
            <template v-if="mailBox.status === 'new'">Nouvelle adresse...</template>
            <template v-else>{{ recipient | fullName }}</template>
          </span>
        </h1>
        <smart-link
          v-if="!isRecipient"
          class="close px-10 -mx-10 h-full flex items-center"
          href="/app/dashboard"
          title="Retour dashboard"
        >
          <icon-cross class="icon transition-bg transition-half rounded-full p-1" />
        </smart-link>
      </header>
      <div class="forms lg:flex py-12 pb-24">
        <retrieve-form :mailbox="mailBox" @updated="refreshInfo" />
        <profile-form
          class="relative"
          :recipient="recipient"
          :mailbox="mailBox"
          :is-recipient="isRecipient"
          @update="refreshInfo"
          @delete="deleteInfo"
          @create="createInfo"
        />
      </div>
    </section>
  </div>
</template>

<script>
import {
  MeQuery,
  MailBoxQuery,
  UpdateMailBoxMutation,
  UpdateUserMutation,
  DeleteMailBoxMutation,
  DeleteUserMutation,
  CreateMailBoxMutation,
  CreateUserMutation
} from "../../../graphql";

import RetrieveForm from "~/components/sections/mailbox/RetrieveForm.vue";
import ProfileForm from "~/components/sections/mailbox/ProfileForm.vue";

import IconUserGreen from "~/assets/icons/user--green.svg";
import IconCross from "~/assets/icons/cross.svg";

export default {
  middleware: "isAuth",
  layout: "app",
  head: {
    title: "Adresse"
  },
  components: {
    RetrieveForm,
    ProfileForm,

    IconUserGreen,
    IconCross
  },
  data() {
    return {
      recipient: {
        firstName: "",
        lastName: "",
        mail: "",
        document: {
          name: ""
        }
      },
      mailBox: {
        address: {
          street: "",
          city: "",
          zip: 0
        }
      }
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    },
    isRecipient() {
      return this.currentUser.group.toLowerCase() === "recipient";
    },
    mailBoxId() {
      return this.$nuxt.$router.currentRoute.params.id;
    }
  },
  async created() {
    try {
      if (!this.$store.state.currentUser.id) {
        const {
          data: { me }
        } = await this.$apollo.query({
          query: MeQuery
        });

        this.$store.commit("currentUser/set", me);

        const currentUser = this.$store.state.currentUser;

        if (currentUser.group === "RECIPIENT") {
          if (currentUser.id !== this.$route.params.id)
            this.$router.push(`/app/mailbox/${currentUser.id}`);
        }
      }
    } catch (e) {
      window.alert("Something went wrong while getting data");
      console.error(e);
    }

    try {
      if (this.mailBoxId !== "new") {
        const {
          data: { mailBox }
        } = await this.$apollo.query({
          query: MailBoxQuery,
          variables: {
            id: this.mailBoxId
          }
        });

        mailBox.status = mailBox.status.toLowerCase();

        delete mailBox.__typename;
        delete mailBox.address.__typename;
        delete mailBox.recipient.document.__typename;
        delete mailBox.recipient.__typename;

        const cleanedMailBox = {};

        Object.keys(mailBox).map(key =>
          key === "recipient" ? false : (cleanedMailBox[key] = mailBox[key])
        );

        this.mailBox = cleanedMailBox;
        this.recipient = mailBox.recipient;
      }
    } catch (e) {
      window.alert("Something went wrong while getting data");
      console.error(e);
    }
  },
  mounted() {
    const currentUser = this.$store.state.currentUser;

    if (currentUser.group === "RECIPIENT") {
      if (currentUser.id !== this.$route.params.id)
        this.$router.push(`/app/mailbox/${currentUser.id}`);
    }
  },
  methods: {
    async refreshInfo({ recipient, mailBox }) {
      try {
        const data = {};
        Object.keys(recipient).map(key =>
          key === "id" ? false : (data[key] = recipient[key])
        );

        await this.$apollo.mutate({
          mutation: UpdateUserMutation,
          variables: {
            id: this.recipient.id,
            data
          }
        });

        mailBox.status = mailBox.status.toUpperCase();
        mailBox.address.zip = parseInt(mailBox.address.zip);

        await this.$apollo.mutate({
          mutation: UpdateMailBoxMutation,
          variables: {
            id: this.mailBoxId,
            data: mailBox
          }
        });
      } catch (e) {
        window.alert("Somthing went wrong while updating data");
        console.error(e);
      }
    },
    async deleteInfo() {
      await this.$apollo.mutate({
        mutation: DeleteMailBoxMutation,
        variables: {
          id: this.mailBoxId
        }
      });

      await this.$apollo.mutate({
        mutation: DeleteUserMutation,
        variables: {
          id: this.recipient.id
        }
      });

      this.$router.push("/app/dashboard");
    },
    async createInfo({ mailBox, recipient }) {
      // Vraiment pas opti, j'aurai du faire une requête qui regroupe ces 3 :'(
      const {
        data: {
          createUser: { user }
        }
      } = await this.$apollo.mutate({
        mutation: CreateUserMutation,
        variables: {
          data: {
            ...recipient,
            password: "azerty",
            group: "RECIPIENT",
            document: {
              file: "file",
              name: "name"
            }
          }
        }
      });

      mailBox.address.zip = parseInt(mailBox.address.zip);

      const {
        data: { createMailBox: createdMailBox }
      } = await this.$apollo.mutate({
        mutation: CreateMailBoxMutation,
        variables: {
          data: {
            recipient: user.id,
            ...mailBox
          }
        }
      });

      await this.$apollo.mutate({
        mutation: UpdateUserMutation,
        variables: {
          id: user.id,
          data: {
            mailBox: createdMailBox.id
          }
        }
      });

      this.$router.push(`/app/mailbox/${createdMailBox.id}`);
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

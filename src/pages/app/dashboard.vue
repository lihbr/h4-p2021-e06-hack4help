<template>
  <div class="dashboard container mx-auto px-5 pt-5 pb-semibase">
    <header class="lg:flex justify-between items-center mt-5 mb-base">
      <h1 class="text-h2 mb-semibase lg:mb-0">
        Mes boites
        <small
          class="inline-block rounded-full border border-cyan text-cyan px-2 font-main text-xs"
        >
          {{ mailBoxes.length }}
        </small>
      </h1>
      <div class="actions -mx-semibase sm:-my-semibase sm:flex">
        <cta-button
          href="/app/mailbox/new"
          blank
          small
          class="px-10 m-semibase"
        >
          Ajouter un bénéficiaire
        </cta-button>
        <input-string
          v-model="query"
          placeholder="Rechercher un bénéficiaire..."
          class="m-semibase flex-1 max-w-full lg:w-col-3"
          small
          dark
        >
          <template v-slot:before>
            <icon-search class="iconSearch" />
          </template>
        </input-string>
      </div>
    </header>
    <div class="dataTable bg-white rounded py-semibase sm:pt-0">
      <table class="desktopTable w-full text-left hidden sm:table">
        <thead>
          <tr>
            <app-th
              v-model="sort.fullName"
              class="pl-10"
              @click.native="resetOtherSort('fullName')"
            >
              Nom du bénéficiaire
            </app-th>
            <app-th
              v-model="sort.pending"
              @click.native="resetOtherSort('pending')"
            >
              Courriers en attente
            </app-th>
            <app-th
              v-model="sort.lastLogin"
              @click.native="resetOtherSort('lastLogin')"
            >
              Dernière connexion
            </app-th>
            <app-th
              v-model="sort.status"
              class="pr-10"
              @click.native="resetOtherSort('status')"
            >
              Statut
            </app-th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(result, index) in paginatedAndFilteredResults"
            :key="`${index}-${result.firstName}-${result.lastName}`"
            class="text-p cursor-pointer hover:bg-grey"
            :title="result | fullName"
            @click="$router.push(`/app/mailbox/${result.id}`)"
          >
            <td class="pl-10">
              {{ result | fullName }}
            </td>
            <td>
              {{ result.pending }}
            </td>
            <td>
              {{ result.lastLogin }}
            </td>
            <td
              class="status pl-5 pr-16 relative"
              :class="{
                'status--green': result.status === 'active',
                'status--orange': result.status === 'queued',
                'status--red': result.status === 'suspended'
              }"
            >
              {{ result.status | ucFirst }}
            </td>
          </tr>
        </tbody>
      </table>
      <div class="mobileTable sm:hidden">
        <div
          v-for="(result, index) in paginatedAndFilteredResults"
          :key="`${index}-${result.firstName}-${result.lastName}`"
          class="row text-p cursor-pointer hover:bg-grey p-semibase relative"
          :title="result | fullName"
          @click="$router.push(`/app/mailbox/${result.id}`)"
        >
          <strong>
            {{ result | fullName }}
          </strong>
          <div
            class="status px-5 relative"
            :class="{
              'status--green': result.status === 'active',
              'status--orange': result.status === 'queued',
              'status--red': result.status === 'suspended'
            }"
          >
            {{ result.status | ucFirst }}
          </div>
          <div>
            Courriers en attente : <em>{{ result.pending }}</em>
          </div>
          <div>
            Dernière connexion :
            <em>{{ result.lastLogin }}</em>
          </div>
        </div>
      </div>
    </div>
    <ul class="pagination my-10 flex justify-center select-none">
      <li
        class="icon"
        :class="{ 'icon--active': currentPage > 1 }"
        @click="currentPage = Math.max(currentPage - 1, 1)"
      >
        <icon-arrow-left />
      </li>
      <li
        v-if="currentPage > 2 && currentPage > totalPages - 1"
        class="page"
        @click="currentPage = currentPage - 2"
      >
        {{ currentPage - 2 }}
      </li>
      <li
        v-if="currentPage > 1"
        class="page"
        @click="currentPage = currentPage - 1"
      >
        {{ currentPage - 1 }}
      </li>
      <li class="page page--active">
        {{ currentPage }}
      </li>
      <li
        v-if="currentPage < totalPages"
        class="page"
        @click="currentPage = currentPage + 1"
      >
        {{ currentPage + 1 }}
      </li>
      <li
        v-if="currentPage < totalPages - 1 && currentPage < 2"
        class="page"
        @click="currentPage = currentPage + 2"
      >
        {{ currentPage + 2 }}
      </li>
      <li
        class="icon"
        :class="{ 'icon--active': currentPage < totalPages }"
        @click="currentPage = Math.min(currentPage + 1, totalPages)"
      >
        <icon-arrow-right />
      </li>
    </ul>
  </div>
</template>

<script>
import faker from "faker";
import { MeQuery, MailBoxesQuery } from "../../graphql";

import CtaButton from "~/components/controls/CtaButton.vue";
import InputString from "~/components/controls/InputString.vue";
import AppTh from "~/components/controls/dataTable/AppTh.vue";

import IconSearch from "~/assets/icons/search.svg";
import IconArrowLeft from "~/assets/icons/arrow--left.svg";
import IconArrowRight from "~/assets/icons/arrow--right.svg";

export default {
  middleware: "isAuth",
  layout: "app",
  head: {
    title: "Dashboard"
  },
  components: {
    CtaButton,
    InputString,
    AppTh,

    IconSearch,
    IconArrowLeft,
    IconArrowRight
  },
  data() {
    return {
      query: "",
      sort: {
        fullName: "none",
        pending: "none",
        lastLogin: "none",
        status: "none"
      },
      resultsPerPage: 16,
      currentPage: 1,
      loading: true,
      mailBoxes: []
    };
  },
  computed: {
    filteredResults() {
      let results = this.mailBoxes.map(mailBox => {
        const res = {
          ...mailBox,
          ...mailBox.recipient
        };

        res.status = res.status.toLowerCase();
        res.lastLogin = new Date(parseInt(res.lastLogin)).toDateString();

        return res;
      });

      if (this.query.trim() !== "") {
        results = results.filter(result =>
          `${result.firstName.trim()} ${result.lastName.trim()}`
            .trim()
            .toLowerCase()
            .includes(this.query.trim().toLowerCase())
        );
      }

      for (const key in this.sort) {
        if (this.sort[key] !== "none") {
          const asc = this.sort[key] === "asc" ? 1 : -1;

          results = results.sort((a, b) => {
            if (key === "fullName") {
              return (
                (`${a.firstName.trim()} ${a.lastName.trim()}`
                  .trim()
                  .toLowerCase() >
                `${b.firstName.trim()} ${b.lastName.trim()}`
                  .trim()
                  .toLowerCase()
                  ? 1
                  : -1) * asc
              );
            } else {
              return (a[key] > b[key] ? 1 : -1) * asc;
            }
          });
        }
      }
      return results;
    },
    paginatedAndFilteredResults() {
      const start = (this.currentPage - 1) * this.resultsPerPage;
      return this.filteredResults.slice(start, start + this.resultsPerPage);
    },
    totalPages() {
      return Math.ceil(this.filteredResults.length / this.resultsPerPage);
    }
  },
  watch: {
    query() {
      this.currentPage = 1;
    }
  },
  async asyncData({ app }) {
    const client = app.apolloProvider.defaultClient;

    try {
      const {
        data: { mailBoxes }
      } = await client.query({
        query: MailBoxesQuery,
        fetchPolicy: "network-only"
      });

      return { mailBoxes };
    } catch (e) {
      window.alert("Something went wrong while getting data");
      console.error(e);
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
          this.$router.push(`/app/mailbox/${currentUser.mailbox}`);
        }
      }
    } catch (e) {
      window.alert("Something went wrong while getting data");
      console.error(e);
    }
  },
  mounted() {
    const currentUser = this.$store.state.currentUser;

    if (currentUser.group === "RECIPIENT") {
      this.$router.push(`/app/mailbox/${currentUser.mailbox}`);
    }
  },
  methods: {
    resetOtherSort(ignore) {
      for (const key in this.sort) {
        if (key !== ignore) {
          this.sort[key] = "none";
        }
      }
    }
  }
};
</script>

<style lang="sass" scoped>
.dashboard
  header
    small
      vertical-align: text-top

    .actions
      .iconSearch
        margin-left: -5px
        margin-right: 10px

  .dataTable
    box-shadow: 6px 0px 18px rgba(0, 0, 0, 0.06)

    .desktopTable
      thead tr
        height: 60px

      tbody tr
        height: 42px

    .status
      &::before
        @apply block absolute rounded-full transform-center top-50p left-2 bg-black
        content: ""
        height: 6px
        width: 6px

      &::after
        @apply block absolute transform-center-y top-50p right-10 h-5 w-5
        content: ""
        background: url("/assets/icons/arrow--right.svg")

      &--green::before
        @apply bg-green

      &--orange::before
        @apply bg-orange

      &--red::before
        @apply bg-red

    .mobileTable
      .status
        &::after
          @apply hidden

      .row
        &::after
          @apply block absolute top-4 right-10 h-5 w-5
          content: ""
          background: url("/assets/icons/arrow--right.svg")

  .pagination
    li
      @apply h-5 w-5 rounded-full transition-bg transition-quarter font-medium text-s text-center
      margin: 0 5px

      &:hover:not(.page--active)
        @apply bg-grey-600

    .page
      @apply cursor-pointer

      &--active
        @apply bg-cyan text-white

        &:hover
          @apply bg-cyan-800

    .icon
      @apply pointer-events-none opacity-50
      padding: 0.125rem

      &--active
        @apply pointer-events-auto cursor-pointer opacity-100

      svg
        @apply w-4 h-4
</style>

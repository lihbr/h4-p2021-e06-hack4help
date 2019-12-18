<template>
  <div class="dashboard container mx-auto p-5">
    <header class="lg:flex justify-between items-center mt-5 mb-base">
      <h2 class="text-h2 mb-semibase md:mb-0">
        Mes boites
        <small
          class="inline-block rounded-full border border-cyan text-cyan px-2 font-main text-xs"
        >
          77
        </small>
      </h2>
      <div class="actions -mx-semibase flex">
        <cta-button href="https://google.com" blank class="px-10 mx-semibase">
          Ajouter un bénéficiaire
        </cta-button>
        <input-string
          v-model="query"
          placeholder="Rechercher un bénéficiaire..."
          class="mx-semibase flex-1 max-w-full md:w-col-3"
        >
          <template v-slot:before>
            <icon-search class="iconSearch" />
          </template>
        </input-string>
      </div>
    </header>
    <div class="dataTable bg-white rounded px-10">
      <table class="w-full text-left">
        <thead>
          <tr>
            <app-th v-model="sort.fullName">
              Nom du bénéficiaire
            </app-th>
            <app-th v-model="sort.pending">
              Courriers en attente
            </app-th>
            <app-th v-model="sort.lastLogin">
              Dernière connexion
            </app-th>
            <app-th v-model="sort.status">
              Statut
            </app-th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(result, index) in results"
            :key="`${index}-${fullName}`"
            class="text-p"
          >
            <td>
              {{ result.fullName }}
            </td>
            <td>
              {{ result.pending }}
            </td>
            <td>
              {{ new Date(result.lastLogin) }}
            </td>
            <td>
              {{ result.status }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import CtaButton from "~/components/controls/CtaButton.vue";
import InputString from "~/components/controls/InputString.vue";
import appTh from "~/components/controls/dataTable/appTh.vue";

import IconSearch from "~/assets/icons/search.svg";

import sample from "./sample.json";

export default {
  // middleware: "isAuth",
  layout: "app",
  components: {
    CtaButton,
    InputString,
    IconSearch,
    appTh
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
      results: [...sample]
    };
  },
  created() {
    this.$store.commit("currentUser/setFake");
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

    table
      thead tr
        height: 60px

      tbody tr
        height: 42px
</style>

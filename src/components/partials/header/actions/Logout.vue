<template>
  <button
    class="logout flex items-center px-2 -mx-2 rounded-full hover:bg-grey-600 cursor-pointer transition-bg transition-half min-w-10 justify-center"
    title="Déconnexion"
    @click="logout"
  >
    <icon-logout />
    <span class="hidden sm:inline-block ml-2 text-p-200">Déconnexion</span>
  </button>
</template>

<script>
import IconLogout from "~/assets/icons/logout.svg";

export default {
  components: {
    IconLogout
  },
  methods: {
    logout() {
      this.$apolloHelpers.onLogout();
      this.$router.push("/app/login");
    }
  }
};
</script>

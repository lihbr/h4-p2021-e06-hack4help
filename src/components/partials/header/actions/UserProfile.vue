<template>
  <smart-link href="/app/dashboard" class="block userProfile flex items-center">
    <span class="text-p hidden sm:inline-block mr-semibase">{{
      currentUser | fullName
    }}</span>
    <img
      :src="gravatar"
      :alt="currentUser | fullName"
      class="w-10 h-10 rounded-full"
    />
  </smart-link>
</template>

<script>
import md5 from "md5";

export default {
  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    },
    gravatar() {
      const hash = md5(this.currentUser.email);

      return `https://s.gravatar.com/avatar/${hash}?s=80`;
    }
  }
};
</script>

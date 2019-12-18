<template>
  <div class="userProfile flex items-center">
    <span class="text-p hidden sm:inline-block mr-semibase">{{
      fullName
    }}</span>
    <img :src="gravatar" :alt="fullName" class="w-10 h-10 rounded-full" />
  </div>
</template>

<script>
import md5 from "md5";

export default {
  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    },
    fullName() {
      return `${this.currentUser.firstName.trim()} ${this.currentUser.lastName.trim()}`.trim();
    },
    gravatar() {
      const hash = md5(this.currentUser.email);

      return `https://s.gravatar.com/avatar/${hash}?s=80`;
    }
  }
};
</script>

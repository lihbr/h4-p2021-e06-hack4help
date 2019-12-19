<template>
  <footer class="appFooter bg-white">
    <div
      class="lg:flex justify-between items-center container mx-auto p-5 h-full text-center overflow-hidden"
    >
      <ul class="text-p-600 text-grey-800 links">
        <li>
          <smart-link href="/donate">
            Offrir une adresse
          </smart-link>
        </li>
        <li>
          <smart-link href="/app/login">
            Se connecter
          </smart-link>
        </li>
        <li>
          <smart-link href="/app/login">
            Contact
          </smart-link>
        </li>
        <li>
          <smart-link href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
            Mentions légales
          </smart-link>
        </li>
      </ul>
      <ul class="socials mt-semibase lg:mt-0">
        <li>
          <smart-link href="https://facebook.com" blank>
            <icon-facebook />
          </smart-link>
        </li>
        <li>
          <smart-link href="https://www.instagram.com/uneadressepourtous" blank>
            <icon-instagram />
          </smart-link>
        </li>
        <li>
          <smart-link href="https://twitter.com" blank>
            <icon-twitter />
          </smart-link>
        </li>
      </ul>
    </div>
  </footer>
</template>

<script>
import IconFacebook from "~/assets/icons/facebook.svg";
import IconInstagram from "~/assets/icons/instagram.svg";
import IconTwitter from "~/assets/icons/twitter.svg";

export default {
  components: {
    IconFacebook,
    IconInstagram,
    IconTwitter
  }
};
</script>

<style lang="sass" scoped>
.appFooter
  margin-top: 5px
  @screen lg
    height: 100px

  .links
    margin: 0 -25px

    li
      margin: 0 25px
      @apply block my-1

      @screen md
        @apply inline-block my-0

  .socials
    @apply -mx-4

    li
      @apply mx-4 inline-block
</style>

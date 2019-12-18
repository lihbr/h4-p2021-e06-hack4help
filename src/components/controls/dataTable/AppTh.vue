<template>
  <th class="appTh text-strong cursor-pointer select-none" @click="cycle">
    <slot />
    <component :is="icon" class="sortIcon inline-block" />
  </th>
</template>

<script>
import iconSort from "~/assets/icons/sort.svg";
import iconSortAsc from "~/assets/icons/sort--asc.svg";
import iconSortDesc from "~/assets/icons/sort--desc.svg";

export default {
  components: {
    iconSort,
    iconSortAsc,
    iconSortDesc
  },
  props: {
    value: {
      type: String,
      default: "none"
    }
  },
  data() {
    return {
      cValue: ""
    };
  },
  computed: {
    icon() {
      switch (this.value) {
        case "asc":
          return "iconSortAsc";
        case "desc":
          return "iconSortDesc";
        default:
          return "iconSort";
      }
    }
  },
  watch: {
    value() {
      this.cValue = this.value;
    }
  },
  methods: {
    cycle() {
      let newValue = "none";

      switch (this.value) {
        case "asc":
          newValue = "desc";
          break;
        case "desc":
          newValue = "none";
          break;
        default:
          newValue = "asc";
          break;
      }

      this.$emit("input", newValue);
    }
  }
};
</script>

<style lang="sass" scoped>
.appTh
  .sortIcon
    vertical-align: text-bottom
</style>

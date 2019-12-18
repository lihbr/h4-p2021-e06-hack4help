<template>
  <div
    class="inputSelect flex rounded border items-center relative"
    :class="[{ small }, dark ? 'border-grey-800' : 'border-grey-600']"
  >
    <select
      :id="linkId"
      v-model="cValue"
      class="bg-none text-p h-full outline-none w-full appearance-none pl-5 pr-10"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
    >
      <option
        v-for="(option, index) in options"
        :key="`${index}-${option ? option.toLowerCase() : 'empty'}`"
      >
        {{ option | ucFirst }}
      </option>
    </select>
    <icon-arrow-down class="absolute right-5 top-50p transform-center-y" />
  </div>
</template>

<script>
import IconArrowDown from "~/assets/icons/arrow--down.svg";

export default {
  components: {
    IconArrowDown
  },
  props: {
    type: {
      type: String,
      default: "text"
    },
    placeholder: {
      type: String,
      default: ""
    },
    value: {
      type: String,
      default: ""
    },
    options: {
      type: Array,
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: false
    },
    dark: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    linkId: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      cValue: ""
    };
  },
  watch: {
    cValue() {
      this.$emit("input", this.cValue);
    },
    value() {
      this.cValue = this.value;
    }
  }
};
</script>

<style lang="sass" scoped>
.inputSelect
  height: 50px

  &.small
    height: 40px

  &:focus-within
    @apply border-black
</style>

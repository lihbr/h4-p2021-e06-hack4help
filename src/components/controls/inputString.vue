<template>
  <div
    class="inputString flex px-5 rounded border border-grey-800 h-10 items-center"
  >
    <slot name="before" />
    <input
      v-model="cValue"
      class="bg-none text-p h-full outline-none w-full"
      :type="type"
      :placeholder="placeholder"
    />
    <slot name="after" />
  </div>
</template>

<script>
export default {
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
.inputString
  &:focus-within
    @apply border-black
</style>

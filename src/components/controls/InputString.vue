<template>
  <div
    class="inputString flex px-5 rounded border items-center"
    :class="[{ small }, dark ? 'border-grey-800' : 'border-grey-600']"
  >
    <slot name="before" />
    <input
      :id="type === 'file' ? '' : linkId"
      v-model="cValue"
      class="bg-none text-p h-full outline-none w-full"
      :class="{ 'pointer-events-none': type === 'file' }"
      :type="type === 'file' ? 'text' : type"
      :placeholder="placeholder"
      :disabled="disabled || type === 'file'"
    />
    <input
      v-if="type === 'file'"
      :id="linkId"
      ref="file"
      type="file"
      class="hidden"
      :disabled="disabled"
      @input="fileSelected"
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
      type: [String, Number],
      default: ""
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
  },
  methods: {
    fileSelected() {
      const path = this.$refs.file.value
        .split("/")
        .map(i => i.split("\\"))
        .flat();
      this.$emit("input", path[path.length - 1]);
    }
  }
};
</script>

<style lang="sass" scoped>
.inputString
  height: 50px

  &.small
    height: 40px

  &:focus-within
    @apply border-black
</style>

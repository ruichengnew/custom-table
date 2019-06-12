<template lang="html">
  <span v-text="cell.value"></span>
</template>

<script>
export default {
  name: "CellElement",
  props: {
    cell: {
      type: Object,
      required: true,
      default: () => {
        return { value: "cell" };
      }
    }
  }
};
</script>

<style lang="css" scoped></style>

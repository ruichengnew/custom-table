<template lang="html">
  <font-awesome-icon class="pointer" :icon="sortIcons[0]" @click="orderBy()" />
</template>

<script>
export default {
  name: "SortElement",
  data() {
    return {
      sortIcons: ["sort", "sort-down", "sort-up"]
    };
  },
  props: {
    columnData: {
      type: Array,
      required: false,
      default: () => {
        return [["0", "r1"], ["1", "r2"]];
      }
    },
    isActive: {
      type: Boolean,
      required: true,
      default: () => {
        return false;
      }
    }
  },
  watch: {
    isActive: function() {
      if (!this.isActive) {
        this.sortIcons = ["sort", "sort-down", "sort-up"];
      }
    }
  },
  methods: {
    orderBy: function() {
      this.sortIcons.push(this.sortIcons.shift());
      let asecFunc = function(a, b) {
        if (parseFloat(a[1]) < parseFloat(b[1])) {
          return -1;
        } else {
          return 1;
        }
      };
      let descFunc = function(a, b) {
        if (parseFloat(a[1]) < parseFloat(b[1])) {
          return 1;
        } else {
          return -1;
        }
      };
      let tmpArray = Array.from(this.columnData);
      if (this.sortIcons[0].includes("up")) {
        tmpArray.sort(asecFunc);
      } else if (this.sortIcons[0].includes("down")) {
        tmpArray.sort(descFunc);
      }
      this.$emit("sortRows", tmpArray.map(item => item[0]));
    }
  }
};
</script>

<style lang="css" scoped>
.pointer {
  cursor: pointer;
}
</style>

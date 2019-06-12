<template lang="html">
  <div class="inline-block">
    <button
      id="filterEle"
      class="btn dropdown-toggle like-text-btn"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    />
    <div class="dropdown-menu fit-view" aria-labelledby="filterEle" @click.stop>
      <div
        class="dropdown-item"
        v-for="(column, index) in allDataSet"
        :key="index"
      >
        <input :value="column" v-model="checkValue" type="checkbox" />
        <span v-text="column" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FilterElement",
  components: {},
  props: {
    columnData: {
      type: Array,
      required: true,
      default: () => {
        return [["0", "r1"], ["1", "r2"]];
      }
    }
  },
  data() {
    return {
      checkValue: []
    };
  },
  computed: {
    allDataArray: function() {
      let tmpArray = [];
      for (let i = 0; i < this.columnData.length; i++) {
        tmpArray.push(this.columnData[i][1]);
      }
      return tmpArray;
    },
    allDataSet: function() {
      return Array.from(new Set(this.allDataArray));
    },
    filteredRowIndexes: function() {
      let tmpArray = [];
      for (let i = 0; i < this.columnData.length; i++) {
        if (this.checkValue.includes(this.allDataArray[i])) {
          tmpArray.push(this.columnData[i][0]);
        }
      }
      return tmpArray;
    }
  },
  watch: {
    // 监听用户的点击事件
    checkValue: function() {
      this.$emit("filterRows", this.filteredRowIndexes);
    }
  },
  mounted: function() {
    // 初始化时，默认全选
    this.checkValue = this.allDataSet;
  }
};
</script>

<style lang="css" scoped>
.like-text-btn {
  font-weight: bold;
  padding: 0;
}
.inline-block {
  display: inline;
}
.fit-view {
  max-height: 75vh;
  overflow-y: auto;
}
.fit-view::-webkit-scrollbar {
  width: 0 !important;
}
</style>

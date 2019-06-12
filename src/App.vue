<template>
  <div id="app">
    <table class="table table-hover">
      <thead>
        <th></th>
        <th v-for="(cell, colIndex) in header" :key="colIndex">
          <span v-text="cell.value"></span>
          <info-element v-if="cell.info" :info="cell.info" />
          <filter-element
            v-if="cell.filter"
            :column-data="getAllColumnData(colIndex)"
            @filterRows="filterRows(colIndex, $event)"
          />
          <sort-element
            v-if="cell.sort"
            :column-data="getAllColumnData(colIndex)"
            :is-active="isActiveSortColumn(colIndex)"
            @sortRows="sortRows(colIndex, $event)"
          />
        </th>
      </thead>
      <tbody>
        <tr v-for="(rowIndex, index) in rowIndexes" :key="index">
          <td v-text="rowIndex"></td>
          <td v-for="(cell, colIndex) in body[rowIndex]" :key="colIndex">
            <cell-element :cell="cell" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import FilterElement from "./components/FilterElement";
import SortElement from "./components/SortElement";
import CellElement from "./components/CellElement";
import InfoElement from "./components/InfoElement";
export default {
  name: "app",
  components: {
    CellElement,
    FilterElement,
    SortElement,
    InfoElement
  },
  props: {
    header: {
      type: Array,
      require: true,
      default: () => {
        return [
          { value: "col1", info: "这是第一列" },
          { value: "col2", filter: true },
          { value: "col3", sort: true }
        ];
      }
    },
    body: {
      type: Array,
      require: true,
      default: () => {
        return [
          [{ value: "r1col1" }, { value: "r1col2" }, { value: "r1col3" }],
          [{ value: "r2col1" }, { value: "r2col2" }, { value: "r2col3" }]
        ];
      }
    }
  },
  data() {
    return {
      filterBuffer: {},
      sortedRowIndexes: [],
      activeSortColumn: 0
    };
  },
  computed: {
    rowIndexes: function() {
      let compareFunc = (a, b) => {
        return (
          this.sortedRowIndexes.indexOf(a) - this.sortedRowIndexes.indexOf(b)
        );
      };
      let tmpArray = [...Array(this.body.length).keys()];
      for (let key in this.filterBuffer) {
        tmpArray = [
          ...tmpArray.filter(ele => this.filterBuffer[key].includes(ele))
        ];
      }
      tmpArray.sort(compareFunc);
      return tmpArray;
    }
  },
  mounted: function() {},
  methods: {
    getAllColumnData: function(colIndex) {
      let tmpArray = [];
      for (let rowIndex = 0; rowIndex < this.body.length; rowIndex++) {
        tmpArray.push([rowIndex, this.body[rowIndex][colIndex].value]);
      }
      return tmpArray;
    },
    // 复位非当前排序列图标的方法
    isActiveSortColumn: function(colIndex) {
      if (colIndex == this.activeSortColumn) {
        return true;
      } else {
        return false;
      }
    },
    filterRows: function(colIndex, filteredRowIndexes) {
      this.$set(this.filterBuffer, colIndex, filteredRowIndexes);
    },
    sortRows: function(colIndex, sortedRowIndexes) {
      this.activeSortColumn = colIndex;
      this.sortedRowIndexes = sortedRowIndexes;
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

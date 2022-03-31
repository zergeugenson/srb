<template>
  <table v-if="cols" class="gr-table">
    <tr>
      <th :colspan="cols" class="jopa">{{ header }}</th>
    </tr>
    <tr v-for="(row, rowindex) in data" :key="rowindex">
      <td
        v-for="(col, colindex) in row"
        :key="colindex"
        :class="{ subhead: rowindex === 0 }"
        v-html="col"
      />
    </tr>
  </table>
</template>

<script>
export default {
  name: "GrTable",
  data() {
    return {};
  },
  props: {
    data: { type: [Array, Object], default: () => [] },
    header: { type: String, default: "" }
  },
  computed: {
    cols() {
      return this.$props.data[0].length || 0;
    }
  },
  mounted() {},
  methods: {},
  filters: {}
};
</script>

<style lang="scss">
@import "../styles/_variables.scss";
table.gr-table tr td {
  span {
    background: $yellow;
    padding: 0 3px;
  }
  p {
    background: $red;
    display: inline;
    color: $white;
    padding: 0 3px;
  }
}
</style>

<style scoped lang="scss">
@import "../styles/_variables.scss";
table {
  border: none;
  padding: 0;
  margin: 0;
  border-collapse: collapse;
}
th {
  border: 1px solid $red;
  background: $red;
  color: $white;
  text-align: center;
}
td {
  border: 1px solid $red;
  &.subhead {
    font-weight: 700;
  }
}
</style>

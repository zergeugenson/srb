<template>
  <table v-if="cols" :class="['gr-table', [rootClass]]">
    <tr>
      <th :colspan="cols" v-html="header" />
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
    header: { type: String, default: "" },
    rootClass: { type: String, default: "" }
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
table.gr-table tr th {
  b {
    font-weight: 700;
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
  th {
    border: 1px solid $grey;
    background: $grey;
    color: $white;
    text-align: center;
    font-weight: 400;
  }
  td {
    border: 1px solid $grey;
    font-size: 0.9em;
    &.subhead {
      font-weight: 700;
    }
  }
  &.red {
    td,
    th {
      border: 1px solid $red;
    }
    th {
      background: $red;
    }
  }
  &.margenta {
    td,
    th {
      border: 1px solid $margenta;
    }
    th {
      background: $margenta;
    }
  }
}
</style>

<template>
  <div class="grammar-page">
    <button class="small-button cards" @click="$router.push({ name: 'Cards' })">
      cards
    </button>
    <div v-if="grammar && grammar.glagola">
      <gr-table :header="grammar.glagola.pie.header" :data="grammar.glagola.pie.data" />
    </div>
  </div>
</template>

<script>
import GrTable from "./GrTable";

export default {
  name: "Grammar",
  data() {
    return {

    };
  },
  computed: {
    grammar() {
      return this.$store.getters["getGrammar"];
    }
  },
  mounted() {
    this.GetGrammar();
  },
  methods: {
    async GetGrammar() {
      await this.$store.dispatch("_getgrammar");
    },
  },
  filters: {

  },
  components: {
    GrTable
  }
};
</script>

<style scoped lang="scss">
.grammar-page {
  position: relative;
  padding: 15px;
  max-width: 640px;
  margin: auto;
  min-height: 500px;
}
</style>

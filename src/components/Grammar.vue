<template>
  <div class="grammar-page">
    <button class="small-button cards" @click="$router.push({ name: 'Cards' })">
      cards
    </button>
    <div v-if="grammar && grammar.glagola">
      <gr-table
        :header="grammar.glagola.pie.header"
        :data="grammar.glagola.pie.data"
      />
      <gr-table
        :header="grammar.glagola.paju.header"
        :data="grammar.glagola.paju.data"
      />
      <gr-table
        :header="grammar.glagola.peu.header"
        :data="grammar.glagola.peu.data"
      />
    </div>
  </div>
</template>

<script>
import GrTable from "./GrTable";

export default {
  name: "Grammar",
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
    }
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
  .gr-table {
    margin-bottom: 30px;
  }
}
</style>

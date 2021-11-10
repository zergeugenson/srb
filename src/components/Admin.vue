<template>
  <div class="administration">
    <button
      onClick="window.location.replace('/')"
      class="small-button perecluc"
    >
      Назад
    </button>
    <p v-if="rechnik.length < 1" class="empty-table">
      Нет слов!
    </p>
    <table v-else>
      <thead>
        <tr>
          <th @click="SortRechnik('srb')">Srb</th>
          <th @click="SortRechnik('rus')">Rus</th>
          <th @click="SortRechnik('eng')">Eng</th>
          <th class="actions">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr :key="word.id" v-for="word in rechnik">
          <td>
            <input type="text" v-model="word.srb" />
          </td>
          <td>
            <input type="text" v-model="word.rus" />
          </td>
          <td>
            <input type="text" v-model="word.eng" />
          </td>
          <td class="actions">
            <button class="small-button" @click="DeleteWord(word)">
              Delete
            </button>
            <button class="small-button perecluc" @click="EditWord(word)">
              Edit
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { SerbLowerCase } from "./Cards.vue";

export default {
  name: "Admin",
  data() {
    return {
      sort: false
    };
  },
  computed: {
    rechnik() {
      return this.$store.getters["getRechnik"];
    }
  },
  mounted() {
    this.GetRechnik();
    setTimeout(() => {
      this.SortRechnik("srb");
    }, 250);
  },
  methods: {
    async GetRechnik() {
      await this.$store.dispatch("_get");
    },
    async DeleteWord(word) {
      this.$store.commit("deleteWord", word);
      await this.$store.dispatch("_post");
    },
    async EditWord(word) {
      word.srb = SerbLowerCase(word.srb);
      this.$store.commit("editWord", word);
      await this.$store.dispatch("_post");
    },
    SortRechnik(field = "srb") {
      this.rechnik.sort((a, b) => a[field].localeCompare(b[field]));
      if (this.sort) this.rechnik.reverse();
      this.sort = !this.sort;
    }
  }
};
</script>

<style scoped lang="scss">
.administration {
  .actions {
    white-space: nowrap;
    max-width: 60px;
    button {
      margin: 0 0.5rem 0 0;
    }
  }
  th {
    cursor: pointer;
  }
  .empty-table {
    text-align: center;
  }
}
</style>

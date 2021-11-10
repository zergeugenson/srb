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
          <th @click="SortRechnik('srb')"><span class="sorted">Srpski</span></th>
          <th @click="SortRechnik('rus')"><span class="sorted">Русский</span></th>
          <th @click="SortRechnik('eng')"><span class="sorted">English</span></th>
          <th class="actions">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="word in rechnik" :class="{ 'hidden': hiddenWords.includes(word.id) }" :key="word.id" >
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
            <button class="small-button off" @click="HideWord(word)">
              {{ hiddenWords.includes(word.id) ? "Hide" : "Show" }}
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
      return this.$store.getters["getFullRechnik"];
    },
    hiddenWords() {
      return this.$store.getters["getHiddenWords"];
    },
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
      await this.$store.dispatch("_hide");
    },
    async EditWord(word) {
      word.srb = SerbLowerCase(word.srb);
      this.$store.commit("editWord", word);
      await this.$store.dispatch("_post");
    },
    async HideWord(word) {
      this.$store.commit("hideWord", word.id);
      await this.$store.dispatch("_hide");
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
    max-width: 85px;
    button {
      margin: 0 0.5rem 0 0;
    }
  }
  th {
    .sorted {
      color: #0366ee;
      border-bottom: 1px dashed #0366ee;
      cursor: pointer;
    }
  }
  .empty-table {
    text-align: center;
  }
  .hidden {
    background: #e6e0d6;
  }
}
</style>

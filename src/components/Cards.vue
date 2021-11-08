<template>
  <div class="rechnik-page">
    <div v-if="!adding">
      <button
        @click="lang('rus')"
        :class="['small-button', 'perecluc', { on: q_lang === 'rus' }]"
      >
        rus
      </button>
      <button
        @click="lang('srb')"
        :class="['small-button', 'perecluc', { on: q_lang === 'srb' }]"
      >
        srb
      </button>
      <button @click="adding = true" class="small-button">add</button>
      <div class="picture">
        <iframe
          :src="src"
          v-if="src"
          style="width: 200px; height: 200px; border: 0;"
          allowfullscreen
          scrolling="no"
          allow="encrypted-media;"
        ></iframe>
      </div>
      <div v-if="visualRechnik && visualRechnik.length">
        <div class="question">
          {{ visualRechnik[current][c_lang] | ucFirst }}
        </div>
        <div class="reply">
          <div class="reply-input">
            <span v-if="showReply">{{ visualRechnik[current][q_lang] | ucFirst }}</span>
            &nbsp;
          </div>
          <button @click="remember" class="default">Напомни</button>
          <button @click="nextWord(true)" v-if="!showReply">Помню</button>
          <button @click="nextWord(false)" class="default" v-else>
            Дальше
          </button>
        </div>
      </div>
    </div>
    <div v-else class="adding">
      <input
        type="text"
        placeholder="По-сербски"
        v-model="newWord.srb"
        :class="['reply-input', { error: error }]"
      />
      <input
        type="text"
        placeholder="По-русски"
        v-model="newWord.rus"
        :class="['reply-input', { error: error }]"
      />
      <input
        type="text"
        placeholder="По-английски"
        v-model="newWord.eng"
        style="margin-bottom: 50px;"
      />
      <button @click="post">Сохранить</button>
      <button @click="close">Закончить</button>
    </div>
  </div>
</template>

<script>
//I9UZB7EukaGizTaAfND8ABvgASj8kWfm

import { shaffle } from "../js/common.js";

const SerbLowerCase = str => {
  return Array.from(str).reduce((word, letter) => {
    switch (letter) {
      case "C":
        letter = "ć";
        break;
      case "D":
        letter = "đ";
        break;
      case "S":
        letter = "ŝ";
      case "Z":
        letter = "ž";
    }
    // ć U+0107 &#263;
    // đ U+0111 &#273;
    // ŝ U+015D &#349;
    // ž U+017D &#382;
    return (word += letter);
  }, "");
};

export default {
  name: "Cards",
  data() {
    return {
      newWord: { srb: "", rus: "", eng: "" },
      adding: false,
      visualRechnik: [],
      src: "",
      current: 0,
      q_lang: "srb",
      c_lang: "rus",
      error: false,
      showReply: false,
    };
  },
  computed: {
    rechnik() {
      return this.$store.getters["getShaffledRechnik"];
    }
  },
  mounted() {
    this.GetRechnik();
  },
  methods: {
    async GetRechnik() {
      await this.$store.dispatch("_get").then(() => {
        this.visualRechnik = [...this.rechnik];
        this.nextWord();
      });
    },
    remember() {
      this.showReply = true;
    },
    close() {
      this.error = false;
      this.adding = false;
      this.visualRechnik = [...this.rechnik];
    },
    lang(lang) {
      this.q_lang = "srb";
      this.c_lang = "rus";
      if (lang === "rus") {
        this.q_lang = "rus";
        this.c_lang = "srb";
      }
    },
    nextWord(next = false) {
      this.showReply = false;
      if (next) {
        this.visualRechnik.splice(this.current, 1);
      } else {
        this.visualRechnik = shaffle(this.visualRechnik);
      }
      if (!this.visualRechnik.length) {
        this.visualRechnik = [...this.$store.getters["getShaffledRechnik"]];
      }
      this._pic();
    },
    async _pic() {
      let name = this.visualRechnik[this.current].eng;
      if (!name) {
        this.src = "";
        return;
      } else {
        name.replace(/\s/g, "%20");
      }
      try {
        const response = await fetch(
          "http://api.giphy.com/v1/gifs/search?api_key=I9UZB7EukaGizTaAfND8ABvgASj8kWfm&limit=1&q=" +
            name
        );
        let q = await response.json();
        this.src = q.data[0].embed_url;
      } catch (error) {
        console.error(error);
      }
    },
    async post() {
      if (!this.newWord.srb || !this.newWord.rus) {
        this.error = true;
        return;
      }

      this.$store.commit("addWord", {
        srb: SerbLowerCase(this.newWord.srb),
        rus: this.newWord.rus,
        eng: this.newWord.eng,
        id: Date.now()
      });
      const success = await this.$store.dispatch("_post");
      if (success) {
        this.newWord = { srb: "", rus: "", eng: "" };
        this.error = false;
      } else {
        console.error("Ошибка записи");
      }
    }
  },
  filters: {
    ucFirst: str => {
      if (!str) return str;
      return str[0].toUpperCase() + str.slice(1);
    }
  }
};
</script>

<style scoped lang="scss">
.rechnik-page {
  padding: 15px;
  max-width: 640px;
  margin: auto;
  .adding {
    text-align: center;
    padding-top: 50px;
  }
  .picture {
    width: 100%;
    height: 200px;
    text-align: center;
    margin-top: 20px;
  }
  .question {
    font-weight: 500;
    font-size: 24px;
    text-align: center;
    margin: 20px auto;
  }
  .reply {
    text-align: center;
    .default {
      background: #0366ee;
    }
    .danger {
      background: #dd2234;
    }
    .reply-input {
      height: 54px;
      padding: 13px;
      margin-bottom: 20px;
    }
  }

}
</style>

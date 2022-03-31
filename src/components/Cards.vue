<template>
  <div class="rechnik-page">
    <div class="loader-container" v-show="!adding && newTurn">
      <div class="loader">...</div>
    </div>
    <div v-if="!adding">
      <button
        @click="Lang('rus')"
        :class="['small-button', 'perecluc', { on: q_lang === 'rus' }]"
      >
        rus
      </button>
      <button
        @click="Lang('srb')"
        :class="['small-button', 'perecluc', { on: q_lang === 'srb' }]"
      >
        srb
      </button>
      <button @click="adding = true" class="small-button">add</button>
      <button class="small-button grammar" @click="$router.push({name: 'Grammar'})">grammar</button>
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
        <h3 class="question">{{ visualRechnik[0][c_lang] | ucFirst }}</h3>
        <div class="reply">
          <h3 class="reply-input">
            <span v-if="showReply">{{
                visualRechnik[0][q_lang] | ucFirst
              }}</span>
            &nbsp;
          </h3>
          <button @click="Remember(true)" class="default">Напомни</button>
          <button @click="Remember(false)" v-if="!showReply">Помню</button>
          <button @click="NextWord(false)" class="default" v-else>
            Дальше
          </button>
          <br />
          <button @click="HideWord(visualRechnik[0])" class="button-hide">
            Больше не показывай
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
      <button @click="Close">Закончить</button>
    </div>
  </div>
</template>

<script>
//I9UZB7EukaGizTaAfND8ABvgASj8kWfm

import { shaffle } from "../js/common.js";

export const SerbLowerCase = str => {
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
        break;
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
      q_lang: "srb",
      c_lang: "rus",
      error: false,
      showReply: false,
      newTurn: false
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
        this.NextWord();
      });
    },
    Remember(stop) {
      this.showReply = true;
      if (!stop) {
        setTimeout(() => {
          this.visualRechnik.splice(0, 1);
          this.NextWord();
        }, 1500);
      }
    },
    Close() {
      this.error = false;
      this.adding = false;
      this.visualRechnik = [...this.rechnik];
    },
    Lang(lang) {
      this.q_lang = "srb";
      this.c_lang = "rus";
      if (lang === "rus") {
        this.q_lang = "rus";
        this.c_lang = "srb";
      }
    },
    NextWord() {
      this.showReply = false;
      if (!this.visualRechnik.length) {
        this.newTurn = true;
        setTimeout(() => {
          this.visualRechnik = [...this.$store.getters["getShaffledRechnik"]];
          this.newTurn = false;
        }, 1600);
      }
      this.visualRechnik = shaffle(this.visualRechnik);
      this._pic();
    },
    async HideWord(word) {
      this.$store.commit("hideWord", word.id);
      await this.$store.dispatch("_hide");
      this.NextWord(true);
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
    },
    async _pic() {
      let name = this.visualRechnik[0].eng;
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
  position: relative;
  padding: 15px;
  max-width: 640px;
  margin: auto;
  min-height: 500px;
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
    text-align: center;
  }
  .reply {
    text-align: center;
    .default {
      background: #0366ee;
    }
    .danger {
      background: #dd2234;
    }
    button {
      width: 120px;
      &.button-hide {
        width: 246px;
      }
    }
    .reply-input {
      height: 54px;
      padding: 13px;
      margin-bottom: 20px;
      font-weight: 400;
    }
  }
  .loader-container {
    border: 1px solid rgba(255, 255, 255, 0.2);
    float: left;
    overflow: hidden;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    position: absolute;
    background: white;
    z-index: 1;
    width: 100%;
    height: 100%;
  }
  .loader,
  .loader:after {
    border-radius: 50%;
    width: 10em;
    height: 10em;
  }
  .loader {
    margin: calc(50% - 100px) auto;
    font-size: 10px;
    position: relative;
    text-indent: -9999em;
    border-top: 1.1em solid rgba(13, 197, 193, 0.2);
    border-right: 1.1em solid rgba(13, 197, 193, 0.2);
    border-bottom: 1.1em solid rgba(13, 197, 193, 0.2);
    border-left: 1.1em solid #ffffff;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-animation: load8 1.1s infinite linear;
    animation: load8 0.75s infinite linear;
  }
  @-webkit-keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  .error {
    border: 1px solid red;
  }
}
</style>

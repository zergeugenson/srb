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
          {{ visualRechnik[current][q_lang] }}
        </div>
        <div class="reply">
          <input
            type="text"
            placeholder="Ответ"
            v-model="reply"
            :class="['reply-input', { error: error }]"
          />
          <button @click="wrong" class="default">Напомни</button>
          <button @click="check(true)" v-if="!reply">Помню</button>
          <button @click="check(false)" class="default" v-if="reply">
            Дальше
          </button>
          <!--          <button @click="wrong" class="danger">Не помню</button>-->
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
      <button @click="_post">Сохранить</button>
      <button @click="close">Закончить</button>
    </div>
  </div>
</template>

<script>
//I9UZB7EukaGizTaAfND8ABvgASj8kWfm
const randomInteger = function(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};
export default {
  name: "AppHome",
  data() {
    return {
      newWord: { srb: "", rus: "", eng: "" },
      adding: false,
      rechnik: [],
      visualRechnik: [],
      src: "",
      reply: "",
      current: 0,
      c_lang: "srb",
      q_lang: "rus",
      error: false
    };
  },
  mounted() {
    this.start();
  },
  methods: {
    wrong() {
      this.reply = this.visualRechnik[this.current][this.c_lang];
    },
    close() {
      this.error = false;
      this.adding = false;
    },
    lang(lang) {
      this.q_lang = "srb";
      this.c_lang = "rus";
      if (lang === "rus") {
        this.q_lang = "rus";
        this.c_lang = "srb";
      }
    },
    start() {
      this._get().then(data => {
        this.rechnik = data;
        this.visualRechnik = [...this.rechnik];
        this.nextWord();
      });
    },
    check(next = false) {
      if (next) {
        this.visualRechnik.splice(this.current, 1);
      } else if (this.visualRechnik[this.current][this.c_lang] !== this.reply) {
        this.error = true;
        return;
      }
      this.nextWord();
    },
    nextWord() {
      this.reply = "";
      this.error = false;
      if (this.visualRechnik.length) {
        this.current = randomInteger(0, this.visualRechnik.length - 1);
      } else {
        this.visualRechnik = [...this.rechnik];
      }
      this._pic();
    },
    async _get() {
      try {
        const response = await fetch("/assets/data.json");
        return await response.json();
      } catch (error) {
        console.error(error);
      }
    },
    async _pic() {
      let name = this.visualRechnik[this.current].eng;
      if (!name) {
        this.src = "";
        return;
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
    async _post() {
      if (!this.newWord.srb || !this.newWord.rus) {
        this.error = true;
        return;
      }
      this.rechnik.push({
        srb: this.newWord.srb,
        rus: this.newWord.rus,
        eng: this.newWord.eng,
        id: Date.now()
      });
      try {
        const response = await fetch("/assets/replace.php", {
          method: "POST",
          body: JSON.stringify(this.rechnik),
          headers: { "Content-type": "application/json; charset=UTF-8" }
        });
        this.rechnik = await response.json();
        this.newWord = { srb: "", rus: "", eng: "" };
        this.error = false;
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>

<style scoped lang="scss">
.rechnik-page {
  .adding {
    text-align: center;
    padding-top: 50px;
  }
  .small-button {
    border: none;
    background: red;
    font-size: 12px;
    padding: 4px 5px;
    margin: 10px 3px;
    &.perecluc {
      background: #0366ee;
    }
    &.on {
      opacity: 0.3;
    }
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
  }
  .reply-input {
    margin-bottom: 20px;
    &.error {
      border: 1px solid #dd2234;
    }
  }
}
</style>

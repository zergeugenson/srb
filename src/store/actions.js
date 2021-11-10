export default {
  async _get({ commit }) {
    try {
      const r = await fetch("/assets/data.json");
      let rechnik = await r.json();
      const h = await fetch("/assets/hide.json");
      let hidden_words = await h.json();
      commit("setRechnik", rechnik);
      commit("setHidden", hidden_words);
      return rechnik;
    } catch (error) {
      console.error(error);
    }
  },
  async _post({ commit, state }) {
    try {
      const response = await fetch("/assets/replace.php", {
        method: "POST",
        body: JSON.stringify(state.rechnik),
        headers: { "Content-type": "application/json; charset=UTF-8" }
      });
      let res = await response.json();
      commit("setRechnik", res);
      return res;
    } catch (error) {
      console.error(error);
    }
  },
  async _hide({ commit, state }) {
    try {
      const response = await fetch("/assets/hide.php", {
        method: "POST",
        body: JSON.stringify(state.hiddenWords),
        headers: { "Content-type": "application/json; charset=UTF-8" }
      });
      return await response.json();
      // commit("setHidden", res);
    } catch (error) {
      console.error(error);
    }
  }
};

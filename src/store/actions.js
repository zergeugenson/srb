export default {
  async _get({ commit }) {
    try {
      const response = await fetch("/assets/data.json");
      let res = await response.json();
      commit("setRechnik", res);
      return res;
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
  }
};

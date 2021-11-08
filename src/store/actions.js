export default {
  async _get({ commit }) {
    try {
      const response = await fetch("/assets/data.json");
      let res = await response.json();
      commit("setRechnik", res);
    } catch (error) {
      console.error(error);
    }
  },
  async _post({ commit, getters }, payload) {
    console.log("payload", payload);
    return;

    if (!this.newWord.srb || !this.newWord.rus) {
      this.error = true;
      return;
    }
    this.rechnik.push({
      srb: SerbLowerCase(this.newWord.srb),
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
};

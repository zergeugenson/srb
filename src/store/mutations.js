export default {
  setRechnik: (state, rechnik) => {
    return (state.rechnik = rechnik);
  },
  addWord: (state, word) => {
    let q = state.rechnik.concat(word);
    state.rechnik = [].concat(q);
    return state.rechnik;
  }
};

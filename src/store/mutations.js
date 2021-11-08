export default {
  setRechnik: (state, rechnik) => {
    return (state.rechnik = rechnik);
  },
  addWord: (state, word) => {
    state.rechnik.push(word);
    return state.rechnik;
  }
};

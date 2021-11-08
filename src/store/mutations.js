export default {
  setRechnik: (state, rechnik) => {
    return (state.rechnik = rechnik);
  },
  addWord: (state, word) => {
    state.rechnik.push(word);
    return state.rechnik;
  },
  deleteWord: (state, word) => {
    state.rechnik = state.rechnik.filter(w => {
      return w.id !== word.id;
    });
  },
  editWord: (state, word) => {
    state.rechnik = state.rechnik.map(w => {
      if(w.id === word.id) {
        return word
      }
      return w
    });
  }
};

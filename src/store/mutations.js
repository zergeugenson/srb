export default {
  setRechnik: (state, rechnik) => {
    return (state.rechnik = rechnik);
  },
  setHidden: (state, hidden_words) => {
    return (state.hiddenWords = hidden_words);
  },
  addWord: (state, word) => {
    state.rechnik.push(word);
    return state.rechnik;
  },
  hideWord: (state, id) => {
    if (state.hiddenWords.includes(id)) {
      const index = state.hiddenWords.indexOf(id);
      if (index > -1) {
        state.hiddenWords.splice(index, 1);
      }
    } else {
      state.hiddenWords.push(id);
    }
    return state.hiddenWords;
  },
  deleteWord: (state, word) => {
    state.rechnik = state.rechnik.filter(w => {
      return w.id !== word.id;
    });
    const index = state.hiddenWords.indexOf(word.id);
    if (index > -1) {
      state.hiddenWords.splice(index, 1);
    }
  },
  editWord: (state, word) => {
    state.rechnik = state.rechnik.map(w => {
      if (w.id === word.id) {
        return word;
      }
      return w;
    });
  }
};

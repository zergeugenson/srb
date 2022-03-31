export default {
  setRechnik: (state, rechnik) => {
    return (state.rechnik = rechnik);
  },
  setGrammar: (state, grammar) => {
    return (state.grammar = grammar);
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
      state.hiddenWords = state.hiddenWords.filter(item => item !== id);
    } else {
      state.hiddenWords.push(id);
    }
    return state.hiddenWords;
  },
  deleteWord: (state, word) => {
    state.rechnik = state.rechnik.filter(w => w.id !== word.id);
    state.hiddenWords = state.hiddenWords.filter(item => item !== word.id);
  },
  editWord: (state, word) => {
    state.rechnik = state.rechnik.map(w => (w.id === word.id ? word : w));
  }
};

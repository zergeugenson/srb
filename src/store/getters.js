import { shaffle } from "../js/common.js";

export default {
  getRechnik: state => {
    return state.rechnik.filter(word => {
      if (!state.hiddenWords.includes(word.id)) return word;
    });
  },
  getHiddenWords: state => {
    return state.hiddenWords;
  },
  getFullRechnik: state => {
    return state.rechnik;
  },
  getShaffledRechnik: state => {
    return shaffle(state.rechnik);
  }
};

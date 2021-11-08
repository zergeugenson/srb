import { shaffle } from "../js/common.js";

export default {
  getRechnik: state => {
    return state.rechnik;
    return shaffle(state.rechnik);
  },
};

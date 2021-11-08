import { shaffle } from "../js/common.js";

export default {
  getRechnik: state => {
    return state.rechnik;
  },
  getShaffledRechnik: state => {
    return shaffle(state.rechnik);
  },
};

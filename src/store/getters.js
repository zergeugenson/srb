import { shaffle } from "../js/common.js";

export default {
  getRechnik: state => {
    return shaffle(state.rechnik);
  },
};

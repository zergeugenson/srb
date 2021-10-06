import Vue from "vue";
import Vuex from "vuex";
import "es6-promise/auto";
import lang from "./modules/lang";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isAuthExceptionCaught: false
  },
  modules: {
    lang,
  },
  mutations: {
    setAuthExceptionCaught: function(state, isCaught) {
      return (state.isAuthExceptionCaught = isCaught);
    },
    resetStore(state) {
      for (let key in this._modulesNamespaceMap) {
        if (
          this._modulesNamespaceMap[key] &&
          this._modulesNamespaceMap[key]._rawModule &&
          this._modulesNamespaceMap[key]._rawModule.initialState
        ) {
          state[key.slice(0, -1)] = Object.assign(
            {},
            this._modulesNamespaceMap[key]._rawModule.initialState
          );
        }
      }
    }
  }
});

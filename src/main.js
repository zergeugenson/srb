// Import Vue
import Vue from "vue";
import VueRouter from "vue-router";
import "styles/index.scss";
import App from "./App.vue";
import routes from "./routes";
import store from "./store";

Vue.use(VueRouter);
const router = new VueRouter({
  routes,
  linkActiveClass: "active",
  mode: "history"
});

new Vue({
  el: "#app",
  namespaced: true,
  render: h => h(App),
  router,
  store
});

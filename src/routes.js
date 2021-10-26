import AppHome from "./components/AppHome.vue";
import AppList from "./components/AppList.vue";

import AppError from "./components/AppError.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: AppHome
  },
  {
    path: "/employee",
    name: "Web API",
    component: AppList
  },
  {
    path: "/*",
    name: "Secret",
    component: AppError
  }
];

export default routes;

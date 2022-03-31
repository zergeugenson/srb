import Cards from "./components/Cards";
import Admin from "./components/Admin";
import Grammar from "./components/Grammar";
import Err404 from "./components/Err404";

const routes = [
  {
    path: "/",
    name: "Cards",
    component: Cards
  },
  {
    path: "/grammar",
    name: "Grammar",
    component: Grammar
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin
  },
  {
    path: "/*",
    name: "Err404",
    component: Err404
  }
];

export default routes;

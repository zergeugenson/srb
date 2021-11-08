import Cards from "./components/Cards";
import Admin from "./components/Admin";
import Err404 from "./components/Err404";

const routes = [
  {
    path: "/",
    name: "Cards",
    component: Cards
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

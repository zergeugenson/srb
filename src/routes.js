import Cards from "./components/Cards";
import Admin from "./components/Admin";
import Grammar from "./components/Grammar";
import Err404 from "./components/Err404";

const routes = [
  {
    path: "/",
    name: "Cards",
    component: Cards,
    meta: { title: "Карточки для изучения сербского" }
  },
  {
    path: "/grammar",
    name: "Grammar",
    component: Grammar,
    meta: { title: "Шпаргалка по грамматике" }
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    meta: { title: "админка" }
  },
  {
    path: "/*",
    name: "Err404",
    component: Err404,
    meta: { title: "Страница не найдена" }
  }
];

export default routes;

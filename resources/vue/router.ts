import { createRouter, createWebHistory } from "vue-router";
import HistoryPage from "./pages/HistoryPage.vue";
import IndexPage from "./pages/IndexPage.vue";
import LoginPage from "./pages/LoginPage.vue";
import TransactionPage from "./pages/TransactionPage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "index",
      component: IndexPage,
    },
    {
      path: "/transaction",
      name: "transaction",
      component: TransactionPage,
    },
    {
      path: "/history",
      name: "history",
      component: HistoryPage,
    },
    {
      path: "/login",
      name: "login",
      component: LoginPage,
    },
  ],
});

router.beforeEach((to, _from, next) => {
  const isAuthenticated = true;

  if (to.name !== "login" && !isAuthenticated) {
    next({ name: "login" });
  } else if (to.name === "login" && isAuthenticated) {
    next({ name: "index" });
  } else {
    next();
  }
});

export default router;

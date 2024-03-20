import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "index",
      component: () => import("./pages/index/index.vue"),
      meta: { layout: "main" },
    },
    {
      path: "/transaction",
      name: "transaction",
      component: import("./pages/transaction/index.vue"),
      meta: { layout: "main" },
    },
    {
      path: "/history",
      name: "history",
      component: () => import("./pages/history/index.vue"),
      meta: { layout: "main" },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./pages/login/index.vue"),
      meta: { layout: "sign" },
    },
    {
      path: "/register",
      name: "register",
      component: () => import("./pages/register/index.vue"),
      meta: { layout: "sign" },
    },
  ],
});

router.beforeEach((to, _from, next) => {
  const isAuthenticated = false;

  if (to.name === "register") {
    return next();
  }

  if (to.name !== "login" && !isAuthenticated) {
    next({ name: "login" });
  } else if (to.name === "login" && isAuthenticated) {
    next({ name: "index" });
  } else {
    next();
  }
});

export default router;

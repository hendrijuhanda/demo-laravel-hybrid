import { createRouter, createWebHistory } from "vue-router";
import { useAuth } from "./stores/auth";
import { useInitial } from "./stores/initial";
import { sessionRequest } from "./utils/api-client";

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

router.beforeEach(async (to, _from, next) => {
  const { initToken, setToken, setIsAuthenticated, setUser } = useAuth();
  const { isInitialized, setIsInitialized } = useInitial();

  if (!isInitialized) {
    initToken();

    const res = await sessionRequest().catch((e) => {
      if (e?.response?.status === 401) {
        setToken(null);
      }
    });

    if (res) {
      const { data } = res;

      setIsAuthenticated(true);
      setUser({
        name: data?.data?.name,
        email: data?.data?.email,
      });
    }

    setIsInitialized(true);
  }

  const { isAuthenticated } = useAuth();

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

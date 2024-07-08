import { useAuthStore } from "@/stores";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/app",
      alias: "/",
      name: "app",
      component: () => import("@/views/app.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/auth/login",
      alias: "/login",
      name: "auth",
      component: () => import("@/views/auth/login.vue"),
      meta: { requiresAuth: false },
    },
    {
      path: "/dashboard",
      component: () => import("@/views/dashboard/index.vue"),
      redirect: "/dashboard/users",
      meta: { requiresAuth: true, isAdmin: true },
      children: [
        {
          path: "users",
          component: () => import("@/views/dashboard/users.vue"),
        },
        {
          path: "tasks",
          component: () => import("@/views/dashboard/tasks.vue"),
        },
      ],
    },
    {
      path: "/logout",
      name: "logout",
      meta: { requiresAuth: true },
      component: () => import("@/views/auth/logout.vue"),
    },
  ],
});

router.beforeResolve(async (to, from, next) => {
  const token = useAuthStore().token;
  const isAdmin = useAuthStore().user.isAdmin;

  // se a rota não precisa estar autenticado e eu tenho token
  if (!to.meta.requiresAuth && token) next({ name: "app" });
  // se a rota é para admin e user não é admin
  else if (to.meta.isAdmin && isAdmin == 0) next({ name: "app" });
  // se a rota precisa estar autenticado e eu não tenho token
  else if (to.meta.requiresAuth && !token) next({ name: "auth" });
  else next();
});
export default router;

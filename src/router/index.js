import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
// import { shouldRedirectToLogin } from "./utils";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/form",
      name: "userForm",
      component: () => import("../views/FormView.vue"),
    },
    {
      path: "/publications",
      name: "publications",
      component: () => import("../views/PublicationsView.vue"),
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/contact",
      name: "contact",
      component: () => import("../views/ContactView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/admin",
      name: "admin",
      // beforeEnter: shouldRedirectToLogin(),
      component: () => import("../views/AdminView.vue"),
    },
  ],
});

export default router;

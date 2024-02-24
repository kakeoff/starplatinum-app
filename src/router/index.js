import { createRouter, createWebHistory } from "vue-router";
import { isAuthenticated } from "../js/helpers";
import HomeView from "../views/HomeView.vue";


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
      path: "/review",
      name: "review",
      component: () => import("../views/ReviewView.vue"),
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    {
      meta: { requiresAuth: true },
      path: "/admin-applications",
      name: "adminApplications",
      component: () => import("../views/AdminApplicationsView.vue"),
    },
    {
      meta: { requiresAuth: true },
      path: "/admin-publications",
      name: "adminPublications",
      component: () => import("../views/AdminPublicationsView.vue"),
    },
    {
      meta: { requiresAuth: true },
      path: "/admin-users",
      name: "adminUsers",
      component: () => import("../views/AdminUsersView.vue"),
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import("../views/NotFoundPage.vue"),
    }
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next('/')
  } else {
    next()
  }
})

export default router;

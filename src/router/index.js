import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import SignupView from "../views/SignupView.vue";
import LoginView from "../views/LoginView.vue";

import { auth } from "../plugins/firebase";
import { onAuthStateChanged } from "firebase/auth";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      requiresAuth: true, // 「認証が必要」ということを示すフラグ
    },
  },
  {
    path: "/signup",
    name: "signup",
    component: SignupView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  onAuthStateChanged(auth, (user) => {
    const isRequiresAuth = to.matched.some(
      (record) => record.meta.requiresAuth
    );

    if (isRequiresAuth && !user) {
      // ログインしていない場合、/loginページに遷移させる
      next({ path: "/login", query: { redirect: to.fullPath } });
    } else {
      next();
    }
  });
});

export default router;

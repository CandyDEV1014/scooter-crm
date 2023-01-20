import Vue from "vue";
import VueRouter from "vue-router";
import AuthLayout from "@/layouts/Auth";
import Login from "@/views/auth/Login";
import admin from "./admin";
import i18n from "../../helpers/i18n";
import store from "../store/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "",
    redirect: "login",
    component: AuthLayout,
    children: [
      {
        path: "/login",
        name: "login",
        component: Login,
        meta: {
          title: i18n.t("routes.login"),
        },
      },
    ],
  },
  admin,
];

export default new VueRouter({
  mode: process.env.IS_ELECTRON ? "hash" : "history",
  base: process.env.BASE_URL,
  routes,
});

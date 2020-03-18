import Vue from "vue";
import Router from "vue-router";
import login from "../components/login";
import register from "../components/register";
import Home from "../components/Home";
import store from "../store/index"
import User from "../components/User";

Vue.use(Router);

const ifNotAuthenticated = (to, from, next) => {
    if (!store.getters.isAuthenticated) {
        next()
        return
    }
    next('/')
}

const ifAuthenticated = (to, from, next) => {
    if (store.getters.isAuthenticated) {
        next()
        return
    }
    next('/')
}

const router = new Router({
    routes: [{
            path: "/login",
            component: login,
            name: "login",
            props: true,
            beforeEnter: ifNotAuthenticated
        },
        {
            path: "/register",
            component: register,
            name: "register",
            beforeEnter: ifNotAuthenticated
        },
        {
            path: "/user/:id",
            component: User,
            props: true,
            name: "user",
            beforeEnter: ifAuthenticated
        },
        {
            path: "/",
            component: Home,
            name: "home"
        }
    ]
});

export default router;
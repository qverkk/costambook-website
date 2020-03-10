import Vue from "vue";
import Router from "vue-router";
import login from "../components/login";
import register from "../components/register";
import Home from "../components/Home";

Vue.use(Router);

const router = new Router({
    routes: [{
            path: "/login",
            component: login,
            name: "login"
        },
        {
            path: "/register",
            component: register,
            name: "register"
        },
        {
            path: "/",
            component: Home,
            name: "Home"
        }
    ]
});

export default router;
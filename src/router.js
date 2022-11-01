import {
    createWebHistory,
    createRouter
} from "vue-router";

const routes = [{
        path: "/",
        alias: "/home",
        name: "home",
        component: () =>
            import ("./components/Home")
    }, {
        path: "/summary",
        alias: "/summary",
        name: "summary",
        component: () =>
            import ("./components/Summary")
    },
    {
        path: "/input",
        alias: "/input",
        name: "input",
        component: () =>
            import ("./components/Input")
    },
    {
        path: "/",
        alias: "/investment/open",
        name: "open-position",
        component: () =>
            import ("./components/OpenPosition")
    },
    {
        path: "/investment/close",
        alias: "/investment/close",
        name: "close-position",
        component: () =>
            import ("./components/ClosePosition")
    },
    {
        path: "/login",
        alias: "/login",
        name: "login",
        component: () =>
            import ("./components/Login")
    },
    {
        path: "/register",
        alias: "/register",
        name: "register",
        component: () =>
            import ("./components/Register")
    },
    {
        path: "/forgot-password",
        alias: "/forgot-password",
        name: "forgot-password",
        component: () =>
            import ("./components/ForgotPassword")
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
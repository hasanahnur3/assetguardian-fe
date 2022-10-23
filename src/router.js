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
        path: "/",
        alias: "/summary",
        name: "summary",
        component: () =>
            import ("./components/Summary")
    },
    {
        path: "/",
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
        path: "/",
        alias: "/investment/close",
        name: "close-position",
        component: () =>
            import ("./components/ClosePosition")
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
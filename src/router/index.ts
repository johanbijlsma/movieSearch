import { createRouter, createWebHistory } from 'vue-router';

import Detail from "@/views/Detail.vue";
import Home from "@/views/Home.vue";

const routes = [
    { path: "/", name: 'home', component: Home },
    { path: "/detail/:id", name: 'detail', component: Detail, props: { id: 11 } },
]
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
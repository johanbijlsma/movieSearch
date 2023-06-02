import { createRouter, createWebHistory } from 'vue-router';

import Detail from "@/views/Detail.vue";
import Home from "@/views/Home.vue";

const routes = [
    { path: "/", name: 'home', component: Home },
    { path: "/detail", name: 'detail', component: Detail },
]
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
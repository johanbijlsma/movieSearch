import { createRouter, createWebHistory } from 'vue-router';


import Home from "./../views/Home.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", name: 'home', component: Home, },
        {
            path: "/detail/:id", name: 'detail',
            component: () => import('@/views/Detail.vue'),

        },
    ]
})

export default router
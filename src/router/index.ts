// import { createRouter, createWebHistory } from 'vue-router';


// const router = createRouter({
//     history: createWebHistory(),
//     routes: [
//         { path: "/", name: 'home', component: () => import('../views/Home.vue') },
//         {
//             path: "/detail/:id", name: 'detail', props: true,
//             component: () => import('../views/Detail.vue'),

//         },
//     ]
// })

// export default router


import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/Home.vue')
    },
    {
        path: '/detail/:id',
        name: 'detail',
        component: () => import('../views/Detail.vue'),
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
import "./assets/main.css";

import { createRouter, createWebHistory } from 'vue-router';

import App from "./App.vue";
import Detail from "./views/Detail.vue";
import Home from "./views/Home.vue";
import { createApp } from "vue";
import { createPinia } from "pinia";

const app = createApp(App);

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", name: 'home', component: Home },
        { path: "/detail", name: 'detail', component: Detail },
    ]
})

app.use(createPinia());
app.use(router);

app.mount("#app");

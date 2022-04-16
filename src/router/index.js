import { createWebHistory, createRouter } from "vue-router";

import AllPosts from "../views/AllPosts.vue";
import AddPost from "../views/AddPost.vue"
import OnePost from "../views/OnePost.vue"
const routes = [
    {
        path: '/',
        name: 'AllPosts',
        component: AllPosts
    },
    {
        path: '/add',
        name: 'AddPost',
        component: AddPost
    },
    {
        path: '/post/:id',
        name: 'OnePost',
        component: OnePost
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});
export default router;
import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from "@/components/Login.vue";
import Registration from "@/components/Registration.vue";
import Cart from "@/components/Cart.vue";
import Orders from "@/components/Orders.vue";

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/registration',
        name: 'registration',
        component: Registration
    },
    {
        path: '/cart',
        name: 'cart',
        component: Cart
    },
    {
        path: '/orders',
        name: 'orders',
        component: Orders
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router

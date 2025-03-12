import api from "@/api";

export default defineNuxtRouteMiddleware((to, from) => {
    const token = sessionStorage.getItem('@token');

    if (!token) {
        return navigateTo('/');
    }

    api.user.get(token);
})
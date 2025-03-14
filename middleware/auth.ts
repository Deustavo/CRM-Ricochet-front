import api from "@/api";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const token = sessionStorage.getItem('@token');

    if (!token) {
        return navigateTo('/');
    }

    await api.user.get(token);
    api.meetings.getAll(token);
})
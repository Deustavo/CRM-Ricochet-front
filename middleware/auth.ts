import { useSession } from "@/store/useSession";

export default defineNuxtRouteMiddleware((to, from) => {
    const { fetchUserData } = useSession();
    const token = sessionStorage.getItem('@token');

    if (!token) {
        return navigateTo('/');
    }

    fetchUserData(token);
})
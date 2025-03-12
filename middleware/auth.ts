import { useSession } from "@/store/useSession";

export default defineNuxtRouteMiddleware((to, from) => {
    const { user } = useSession();

    if (!user.isAuthenticated) {
        return navigateTo('/');
    }
})
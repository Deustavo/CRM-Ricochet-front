import { useSession } from "@/store/useSession";
// import { toast } from 'vue3-toastify';

export default defineNuxtRouteMiddleware((to, from) => {
    const { user } = useSession();

    if (!user.isAuthenticated) {
        // toast.info('É necessário fazer o login para acessar as reuniões');
        return navigateTo('/login');
    }
})
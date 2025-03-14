import { ref } from 'vue';
import api from '@/api';

interface UserSession {
    id: number | null;
    token: string | null;
    name: string | null,
    email: string | null
}

const emptyUser = {
    id: null,
    token: null,
    name: null,
    email: null
}

const user = ref<UserSession>(emptyUser);

export const useSession = () => {
    const setUser = (newUser: UserSession) => {
        user.value = {
            ...user.value,
            ...newUser
        }

        sessionStorage.setItem('@token', newUser.token || '');
    };

    const logout = async () => {
        await api.auth.logout();
        user.value = emptyUser;
        sessionStorage.removeItem('@token');
        window.location.href = '/';
    };

    return {
        user,
        setUser,
        logout,
    };
};
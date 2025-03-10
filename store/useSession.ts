import { reactive } from 'vue';

interface UserSession {
    id: string | null;
    token: string | null;
    isAuthenticated: boolean;
}

const user = reactive<UserSession>({
    id: null,
    token: null,
    isAuthenticated: false,
});

export const useSession = () => {
    const login = (userId: string, token: string) => {
        user.id = userId;
        user.token = token;
        user.isAuthenticated = true;
    };

    const logout = () => {
        user.id = null;
        user.token = null;
        user.isAuthenticated = false;
    };

    return {
        user,
        login,
        logout,
    };
};
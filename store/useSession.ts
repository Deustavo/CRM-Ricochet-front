import { reactive } from 'vue';

interface UserSession {
    token: string | null;
    isAuthenticated: boolean;
}

const user = reactive<UserSession>({
    token: null,
    isAuthenticated: false,
});

export const useSession = () => {
    const setUser = (newUser: UserSession) => {
        user.token = newUser.token;
        user.isAuthenticated = newUser.isAuthenticated;
    };

    const logout = () => {
        user.token = null;
        user.isAuthenticated = false;
        window.location.href = '/';
    };

    return {
        user,
        setUser,
        logout,
    };
};
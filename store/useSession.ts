import { reactive } from 'vue';
import store from "store2";

interface UserSession {
    id: string | null;
    token: string | null;
    isAuthenticated: boolean;
}

const getSavedUser = () => {
    const savedUser = JSON.parse(store.session("@user"));

    console.log(savedUser);

    if (savedUser?.isAuthenticated) {
        return savedUser;
    };

    return {
        id: null,
        token: null,
        isAuthenticated: false,
    };
};

const user = reactive<UserSession>(getSavedUser());

export const useSession = () => {
    const setUser = (newUser: UserSession) => {
        user.id = newUser.id;
        user.token = newUser.token;
        user.isAuthenticated = true;

        store.session("@user", JSON.stringify(user));
    };

    const logout = () => {
        user.id = null;
        user.token = null;
        user.isAuthenticated = false;
        store.session("@user", null);
        window.location.href = '/';
    };

    return {
        user,
        setUser,
        logout,
    };
};
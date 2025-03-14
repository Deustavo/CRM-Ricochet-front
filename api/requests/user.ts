import { useSession } from "@/store/useSession";
const { setUser, logout } = useSession();

interface UserSession {
    id: number | null;
    token: string | null;
    name: string | null,
    email: string | null
}

const get = async (token: string) => {
    try {
        const data: UserSession = await $fetch('http://localhost:8000/api/user', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        setUser({
            token: token,
            name: data.name,
            email: data.email,
            id: data.id,
        });
    } catch (error) {
        logout();
    }
};

export default {
    get
}
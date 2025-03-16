import { http } from '../http';

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
        const data: UserSession = await http('/api/user', {
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

const getAllUsers = async () => {
    try {
        const data: { users: UserSession[] } = await http('/api/users', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('@token')}`,
            },
        });

        return data.users;
    } catch (error) {
        console.log('Houve um erro ao buscar os usuários!');
    }
};

export default {
    get,
    getAllUsers,
}
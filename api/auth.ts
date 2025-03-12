import { toast } from 'vue3-toastify';

import { useSession } from "@/store/useSession";
const { setUser } = useSession();

interface ResponseLoginType {
    token: string;
    name: string;
    email: string;
}

interface BodyLoginType {
    email: string;
    password: string;
}

export const login = async (body: BodyLoginType) => {
    try {
        const data: ResponseLoginType = await $fetch('http://localhost:8000/api/login', {
            method: 'POST',
            body,
        });

        setUser({
            token: data.token,
            name: data.name,
            email: data.email,
        });

        navigateTo('/dashboard');
    } catch (error) {
        toast.error('Houve um erro ao fazer o login!');
    }
};

interface ResponseRegisterType {
    message: string;
    user: object;
    status: number;
}

interface BodyRegisterType {
    name: string;
    email: string;
    password: string;
}

export const register = async (body: BodyRegisterType) => {
    try {
        const data: ResponseRegisterType = await $fetch('http://localhost:8000/api/register', {
            method: 'POST',
            body,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });

        if (data.status === 201) {
            login({ email: body.email, password: body.password });
        }
    } catch (error) {
        toast.error('Houve um erro ao fazer o cadastro!');
    }
}
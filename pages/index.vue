<script setup lang="ts">
import { ref } from 'vue';
import { toast } from 'vue3-toastify';
import { useSession } from "@/store/useSession";

const email = ref('teste@teste.com');
const password = ref('teste@teste.com');
const loading = ref(true);
const { setUser } = useSession();

onMounted(() => {
    if (hasValidToken()) {
        return navigateTo('/dashboard');
    }

    loading.value = false;
});

/**
 * Check if user has a saved session
 */
const hasValidToken = (): boolean => {
    return false;
}

const handleSubmit = async (event: Event) => {
    event.preventDefault();

    try {
        const data: { token: string } = await $fetch('http://localhost:8000/api/login', {
            method: 'POST',
            body: {
                email: email.value,
                password: password.value,
            }
        });

        console.log(data);

        setUser({
            token: `Bearer ${data.token}`,
            isAuthenticated: true,
        });

        navigateTo('/dashboard');
    } catch (error) {
        toast.error('Houve um erro ao fazer o login!');
        // toast.error('Email ou senha inválidos!');
    }
};
</script>

<template>
    <NuxtLayout name="login">
        <div class="login__container" v-if="!loading">
            <img class="w-100 mb-5" src="/public/img/logo-ricochet360-sm.png" />
            
            <form @submit.prevent="handleSubmit">
                <div class="d-flex flex-column mb-3">
                    <label for="email">Email:</label>
                    <input type="email" id="email" v-model="email" required />
                </div>
                <div class="d-flex flex-column mb-5">
                    <label for="password">Password:</label>
                    <input type="password" id="password" v-model="password" required />
                </div>
                <button class="button--1 mb-4" type="submit">Login</button>
            </form>

            <a href="/register" class="d-block text-center">Ou cadastre-se aqui</a>
        </div>

        <div class="loading-dots" v-else />
    </NuxtLayout>
</template>

<style scoped>
    @import "@/public/sass/login.scss";
</style>
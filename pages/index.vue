<script setup lang="ts">
import { ref } from 'vue';
import api from "@/api";

import { useRouter } from 'vue-router';
const router = useRouter();

const email = ref('gustavo@gustavo.com');
const password = ref('gustavo@gustavo.com');
const loading = ref(true);

onMounted(async () => {
    const token = sessionStorage.getItem('@token');
    
    if (!token) {
        loading.value = false;
        return;
    }

    try {
        await api.user.get(token);
        router.push('/dashboard');
    } catch (error) {
        loading.value = false;
    }
});

const handleSubmit = async (event: Event) => {
    event.preventDefault();

    const body = {
        email: email.value,
        password: password.value,
    };

    await api.auth.login(body);
};
</script>

<template>
    <NuxtLayout name="login">
        <div class="login__container" v-if="!loading">
            <img class="w-100 mb-5" src="/public/img/logo-ricochet360-sm.png" />
            
            <form @submit.prevent="handleSubmit">
                <div class="input__container">
                    <label for="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        v-model="email"
                        placeholder="exemplo@email.com"
                        required
                    />
                </div>
                <div class="input__container mb-4">
                    <label for="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        v-model="password"
                        required
                    />
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
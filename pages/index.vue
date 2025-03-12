<script setup lang="ts">
import { ref } from 'vue';
import { useSession } from "@/store/useSession";
import api from "@/api";

const email = ref('teste@teste.com');
const password = ref('teste@teste.com');
const loading = ref(true);
const { fetchUserData } = useSession();

onMounted(async () => {
    const token = sessionStorage.getItem('@token');
    
    if (!token) {
        loading.value = false;
        return;
    }

    fetchUserData(token);
});

const handleSubmit = async (event: Event) => {
    event.preventDefault();

    const body = {
        email: email.value,
        password: password.value,
    };

    await api.login(body);
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
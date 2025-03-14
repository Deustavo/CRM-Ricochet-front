<script setup lang="ts">
import { ref } from 'vue';
import api from "@/api";

import { useRouter } from 'vue-router';
const router = useRouter();

const email = ref('gustavo@gustavo.com');
const password = ref('gustavo@gustavo.com');
const loadingPage = ref(true);
const loadingRequest = ref(false);

onMounted(async () => {
    const token = sessionStorage.getItem('@token');
    
    if (!token) {
        loadingPage.value = false;
        return;
    }

    try {
        await api.user.get(token);
        router.push('/dashboard');
    } catch (error) {
        loadingPage.value = false;
    }
});

const handleSubmit = async (event: Event) => {
    loadingRequest.value = true;
    event.preventDefault();

    const body = {
        email: email.value,
        password: password.value,
    };

    const successLogin = await api.auth.login(body);
    if (!successLogin) {
        loadingRequest.value = false;
    }
};
</script>

<template>
    <NuxtLayout name="login">
        <div class="login__container" v-if="!loadingPage">
            <img class="w-100 mb-5" src="/public/img/logo-ricochet360-sm.png" />
            
            <form @submit.prevent="handleSubmit">
                <div class="input__container">
                    <label for="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        v-model="email"
                        placeholder="exemplo@email.com"
                        :disabled="loadingRequest"
                        required
                    />
                </div>
                <div class="input__container mb-4">
                    <label for="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        v-model="password"
                        :disabled="loadingRequest"
                        required
                    />
                </div>
                <button
                    class="button--1 mb-4"
                    type="submit"
                    :disabled="loadingRequest"
                >
                    <i
                        v-if="loadingRequest"
                        class="pi pi-spin pi-spinner"
                        style="min-width: 92px;"
                    />
                    <span v-else>Login</span>
                </button>
            </form>

            <NuxtLink 
                href="/register" 
                class="d-block text-center" 
                :class="{ 'disabled-link': loadingRequest }"
                :aria-disabled="loadingRequest"
                @click.prevent="loadingRequest && $event.preventDefault()"
            >
                Ou cadastre-se aqui
            </NuxtLink>
        </div>

        <div class="loading-dots" v-else />
    </NuxtLayout>
</template>

<style scoped>
    @import "@/public/sass/login.scss";
</style>
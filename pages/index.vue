<script setup lang="ts">
import { ref } from 'vue';

const email = ref('');
const password = ref('');

const handleSubmit = (event: Event) => {
    event.preventDefault();
    console.log(email);
};
</script>

<template>
    <NuxtLayout name="login">
        <div class="login__container">
            <img class="w-100 mb-5" src="/public/img/logo-ricochet360-sm.png" />
            
            <form @submit.prevent="handleSubmit">
                <div class="d-flex flex-column mb-3">
                    <label for="email">Email:</label>
                    <input type="text" id="email" v-model="email" required />
                </div>
                <div class="d-flex flex-column mb-5">
                    <label for="password">Password:</label>
                    <input type="password" id="password" v-model="password" required />
                </div>
                <button class="login__button mb-4" type="submit">Login</button>
            </form>

            <a href="/register" class="d-block text-center">Ou cadastre-se aqui</a>
        </div>
    </NuxtLayout>
</template>

<style scoped>
    @import "@/public/sass/login.scss";
</style>
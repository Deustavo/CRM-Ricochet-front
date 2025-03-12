<script setup lang="ts">
import { ref, computed } from 'vue';

const newUser = ref({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
});

const registerUser = () => {
    // Add your registration logic here
    console.log(newUser.value);
};

const isDisabled = computed(() => {
    const hasEmptyField = (
        !newUser.value.name ||
        !newUser.value.email ||
        !newUser.value.password ||
        !newUser.value.password_confirmation
    );

    const passwordMismatch = (
        newUser.value.password !== newUser.value.password_confirmation
    );

    return hasEmptyField || passwordMismatch;
});
</script>

<template>
    <NuxtLayout name="login">
        <div class="login__container">
            <h1>Cadastrar usuário</h1>

            <form @submit.prevent="registerUser">
                <div class="input__container">
                    <label for="name">Nome:</label>
                    <input type="text" id="name" v-model="newUser.name" placeholder="Digite seu nome" required />
                </div>
                <div class="input__container">
                    <label for="email">Email:</label>
                    <input type="email" id="email" v-model="newUser.email" placeholder="exemplo@email.com" required />
                </div>
                <div class="input__container">
                    <label for="password">Senha:</label>
                    <input type="password" id="password" v-model="newUser.password" required />
                </div>
                <div class="input__container mb-4">
                    <label for="password_confirmation">Confirme a Senha:</label>
                    <input type="password" id="password_confirmation" v-model="newUser.password_confirmation" required />
                </div>
                <button class="button--1 mb-4" type="submit" :disabled="isDisabled">Cadastrar</button>
            </form>

            <a href="/" class="d-block text-center">Já tem uma conta? faça o login aqui</a>
        </div>
    </NuxtLayout>
</template>

<style scoped>
    @import "@/public/sass/login.scss";
</style>
<script setup lang="ts">
import { ref, computed } from 'vue';
import api from "@/api";

const newUser = ref({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
});

const loading = ref(false);
const setLoading = (value: boolean) => {
    loading.value = value;
};

const registerUser = async (event: Event) => {
    setLoading(true);
    event.preventDefault();

    const body = {
        name: newUser.value.name,
        email: newUser.value.email,
        password: newUser.value.password,
    };

    await api.auth.register(body);
    setLoading(false);
};

const hasEmptyField = computed(() => (
    !newUser.value.name ||
    !newUser.value.email ||
    !newUser.value.password ||
    !newUser.value.password_confirmation
));

const passwordMismatch = computed(() =>(
    newUser.value.password !== newUser.value.password_confirmation
));

const isDisabled = computed(() => {
    return (
        hasEmptyField.value ||
        passwordMismatch.value ||
        loading.value
    );
});
</script>

<template>
    <NuxtLayout name="login">
        <div class="login__container">
            <h1>Cadastrar usuário</h1>

            <form @submit.prevent="registerUser">
                <div class="input__container">
                    <label for="name">Nome:</label>
                    <input type="text" id="name" v-model="newUser.name" placeholder="Digite seu nome" required :disabled="loading" />
                </div>
                <div class="input__container">
                    <label for="email">Email:</label>
                    <input type="email" id="email" v-model="newUser.email" placeholder="exemplo@email.com" required :disabled="loading" />
                </div>
                <div class="input__container">
                    <label for="password">Senha:</label>
                    <input type="password" id="password" v-model="newUser.password" required :disabled="loading" />
                </div>
                <div class="input__container mb-2">
                    <label for="password_confirmation">Confirme a Senha:</label>
                    <input type="password" id="password_confirmation" v-model="newUser.password_confirmation" required :disabled="loading" />
                    <p v-if="passwordMismatch" class="text-danger">As senhas não coincidem</p>
                    <p v-else class="mb-4"></p> 
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
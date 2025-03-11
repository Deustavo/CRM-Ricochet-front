<script setup lang="ts">
import { useSession } from "@/store/useSession";
const { logout } = useSession();

definePageMeta({
    middleware: ['auth'],
});
</script>

<template>
    <main>
        <div
            class="d-flex justify-content-between align-items-center p-4 border-bottom"
            style="border-color: gray;"
        >
            <img
                class="dashboard__logo"
                src="/public/img/logo-ricochet360-sm.png"
            />

            <div>
                <button
                    class="button-1"
                    @click="() => logout()"
                >
                    Sair
                </button>
            </div>
        </div>

        <div class="p-4">
            Lista de reuniões
        </div>
    </main>
</template>

<style scoped>
@import '@/public/sass/dashboard.scss';
</style>

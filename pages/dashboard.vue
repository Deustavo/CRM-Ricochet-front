<script setup lang="ts">
import api from '@/api';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

import { useSession } from "@/store/useSession";
const { logout, user } = useSession();

import { useMeetings } from "@/store/useMeetings";
const { 
    todayMeetings,
    pastMeetings,
    futureMeetings
} = useMeetings();

/**
 * Modo de vizualização dos compromissos
 */
const meetingsView = ref("grid");

const setMeetingView = (value: string) => {
    meetingsView.value = value;
}

definePageMeta({
    middleware: ['auth'],
});

onMounted(() => {
    const token = sessionStorage.getItem('@token');

    if (!token) {
        return router.push('/login');
    }

    api.meetings.getAll(token);
});
</script>

<template>
    <main>
        <NewMeetingModal />

        <div
            class="d-flex justify-content-between align-items-center p-4 border-bottom"
            style="border-color: gray;"
        >
            <h1>
                <img
                    class="dashboard__logo"
                    src="/public/img/logo-ricochet360-sm.png"
                />
            </h1>

            <div class="d-flex">
                <button
                    class="button--2 me-4"
                    @click="() => logout()"
                >
                    Sair
                </button>

                <button
                    class="button--1"
                    data-bs-toggle="modal"
                    data-bs-target="#newMeetingModal"
                >
                    Nova reunião
                </button>
            </div>
        </div>

        <div class="pt-4 pb-4">
            <div class="d-flex justify-content-between align-items-center">
                <h2>Olá, {{ user.name }}</h2>
                <div class="dashboard__views">
                    <p class="me-2">Visualização:</p>
                    <div class="dashboard__views__types">
                        <div
                            class="dashboard__views__type"
                            :class="{ 'dashboard__views__type__selected': meetingsView === 'grid' }"
                            @click="setMeetingView('grid')"
                        >
                            <i class="pi pi-th-large" />
                        </div>
                        <div
                            class="dashboard__views__type"
                            :class="{ 'dashboard__views__type__selected': meetingsView === 'list' }"
                            @click="setMeetingView('list')"    
                        >
                            <i class="pi pi-list" />
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="meetingsView === 'grid'">
                <div>
                    <h3>Compromissos de hoje</h3>
                    <MeetingGrid
                        :meetings="todayMeetings"
                        type="today"
                    />
                </div>

                <div>
                    <h3>Compromissos futuros</h3>
                    <MeetingGrid
                        :meetings="futureMeetings"
                        type="future"
                    />
                </div>

                <div>
                    <h3>Compromissos passados</h3>
                    <MeetingGrid
                        :meetings="pastMeetings"
                        type="past"
                        style="opacity: 0.5;"
                    />
                </div>
            </div>

            <div v-if="meetingsView === 'list'">
                <div>
                    <h3>Compromissos de hoje</h3>
                    <MeetingList
                        :meetings="todayMeetings"
                        type="today"
                    />
                </div>

                <div class="mt-4">
                    <h3>Compromissos futuros</h3>
                    <MeetingList
                        :meetings="futureMeetings"
                        type="future"
                    />
                </div>

                <div class="mt-4">
                    <h3>Compromissos passados</h3>
                    <MeetingList
                        :meetings="pastMeetings"
                        type="past"
                        style="opacity: 0.5;"
                    />
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped>
@import '@/public/sass/dashboard.scss';
</style>

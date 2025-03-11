<script setup lang="ts">
import { useSession } from "@/store/useSession";
const { logout } = useSession();

import { useMeetings } from "@/store/useMeetings";
const { 
    todayMeetings,
    pastMeetings,
    futureMeetings
} = useMeetings();

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
            <h1>
                <img
                    class="dashboard__logo"
                    src="/public/img/logo-ricochet360-sm.png"
                />
            </h1>

            <div class="d-flex">
                <button
                    class="button-2 me-4"
                    @click="() => logout()"
                >
                    Sair
                </button>

                <button
                    class="button-1"
                    @click="() => console.log('Nova reunião')"
                >
                    Nova reunião
                </button>
            </div>
        </div>

        <div class="pt-4 pb-4">
            <div class="pb-4">
                <h2>Compromissos de hoje</h2>
                <MeetingList
                    :meetings="todayMeetings"
                    type="today"
                />
            </div>

            <div class="pb-4">
                <h2>Compromissos futuros</h2>
                <MeetingList
                    :meetings="futureMeetings"
                    type="future"
                />
            </div>

            <div class="pb-4">
                <h2>Compromissos passados</h2>
                <MeetingList
                    :meetings="pastMeetings"
                    style="opacity: 0.5;"
                    type="past"
                />
            </div>
        </div>
    </main>
</template>

<style scoped>
@import '@/public/sass/dashboard.scss';
</style>

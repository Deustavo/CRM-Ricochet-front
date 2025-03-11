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
<!-- 
            <div>
                <button
                    class="button-1"
                    @click="() => logout()"
                >
                    Sair
                </button>
            </div> -->
            <div>
                <button
                    class="button-1"
                    @click="() => console.log('Nova reunião')"
                >
                    Nova reunião
                </button>
            </div>
        </div>

        <div class="p-4">
            <div>
                <h2>Compromissos de hoje</h2>

                <MeetingList :meetings="todayMeetings"/>
            </div>

            <div>
                <h2>Compromissos futuros</h2>

                <MeetingList :meetings="futureMeetings"/>
            </div>

            <div>
                <h2>Compromissos passados</h2>

                <MeetingList :meetings="futureMeetings"/>
            </div>
        </div>
    </main>
</template>

<style scoped>
@import '@/public/sass/dashboard.scss';
</style>

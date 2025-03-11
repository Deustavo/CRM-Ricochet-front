<script setup lang="ts">
import { defineProps } from 'vue';

export interface MeetingType {
    id: number;
    title: string;
    date: string;
    location: string;
    link: string;
}

const props = defineProps({
    meetings: {
        type: Array as MeetingType[],
        required: true
    }
});

const getHour = (date: string) => {
    return new Date(date).toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
    });
};

const getDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
};
</script>

<template>
    <ul class="meeting__list">
        <li
            class="meeting__item"
            v-for="meeting in props.meetings" :key="meeting.id"
        >
            <h3>{{ meeting.title }}</h3>

            <p>
                <i class="pi pi-clock" />
                <span>{{ getHour(meeting.date) }}</span>
            </p>

            <p>
                <i class="pi pi-calendar" />
                <span>{{ getDate(meeting.date) }}</span>
            </p>
            
            <p>
                <i class="pi pi-map" />
                <span>{{ meeting.location }}</span>
            </p>

            <button
                class="button-1"
                v-if="meeting.link"
            >
                Acessar reunião
            </button>
        </li>
    </ul>
</template>

<style scoped>
@import '@/public/sass/meetings.scss';
</style>
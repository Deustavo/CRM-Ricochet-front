<script setup lang="ts">
import { defineProps } from 'vue';

import { useMeetings } from "@/store/useMeetings";
const { timeUntilEvent } = useMeetings();

export interface MeetingType {
    id: number;
    title: string;
    date: string;
    location: string;
    link: string;
    endDate: string;
}

const props = defineProps({
    meetings: {
        type: Array as () => MeetingType[],
        required: true
    },
    type: {
        type: String,
        required: false
    }
});

const getHour = (date: string): string => {
    return new Date(date).toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
    });
};

const getDate = (date: string): string => {
    return new Date(date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
};

/**
 * Valida se deve exibir o link da reunião
 * @param link 
 */
const showLink = (link: string): boolean => {
    return !!link && props.type === 'today';
};

const openLink = (link: string): void => {
    window.open(link, '_blank');
};
</script>

<template>
    <ul class="meeting__grid">
        <li
            class="meeting__item"
            v-for="meeting in props.meetings" :key="meeting.id"
        >
            <b>
                <span class="badge rounded-pill bg-secondary">
                    {{ timeUntilEvent(meeting.date, meeting.endDate) }}
                </span>
            </b>

            <h4 class="meeting__title">{{ meeting.title }}</h4>

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
                class="button--2 mb-2 mt-1"
                v-if="showLink(meeting.link)"
                @click="() => openLink(meeting.link)"
            >
                Acessar reunião online
            </button>
        </li>
    </ul>
</template>

<style scoped>
@import '@/public/sass/meetingGrid.scss';
</style>
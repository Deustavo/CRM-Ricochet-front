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
const showLink = (meeting: MeetingType): boolean => {
    console.log(timeUntilEvent(meeting.date, meeting.endDate))
    return (timeUntilEvent(meeting.date, meeting.endDate) === 'Em andamento');
};

const openLink = (link: string): void => {
    window.open(link, '_blank');
};
</script>

<template>
    <ul class="meeting__list">
        <li
            class="meeting__item"
            v-for="meeting in props.meetings" :key="meeting.id"
        >
            <div class="meeting__title">
                <h4>{{ meeting.title }}</h4>
                <b>
                    <button
                        v-if="showLink(meeting)"
                        class="badge rounded-pill bg-primary"
                        style="border: none;"
                        @click="() => openLink(meeting.link)"
                    >
                        Acessar reunião online
                    </button>
                    <span
                    v-else
                        class="badge rounded-pill bg-secondary"
                    >
                        {{ timeUntilEvent(meeting.date, meeting.endDate) }}
                    </span>
                </b>
            </div>

            <div class="meeting__details">
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
            </div>
        </li>
    </ul>
</template>

<style scoped>
@import '@/public/sass/meetingList.scss';
</style>
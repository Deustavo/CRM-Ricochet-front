<script setup lang="ts">
import { defineProps } from 'vue';

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
        type: Array as MeetingType[],
        required: true
    },
    type: {
        type: String as [ 'today' | 'future' | 'past' ],
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
    return link && props.type === 'today';
};

/**
 * contagem de horas para o evento
 * @param date 
 * @param endDate 
 */
const timeUntilEvent = (date: string, endDate: string): string => {
    const eventDate = new Date(date);
    const eventEndDate = new Date(endDate);
    const now = new Date();

    if (now > eventEndDate) {
        return 'Já terminou';
    }

    const timeDifference = eventDate.getTime() - now.getTime();
    const hoursDifference = Math.ceil(timeDifference / (1000 * 3600));

    if (hoursDifference <= 0) {
        return 'Em andamento';
    }

    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

    if (daysDifference === 1) {
        return 'Amanhã';
    }

    if (daysDifference > 1) {
        return `Em ${daysDifference} dias`;
    }

    return `Em ${hoursDifference} horas`;
};
</script>

<template>
    <ul class="meeting__list">
        <li
            class="meeting__item"
            v-for="meeting in props.meetings" :key="meeting.id"
        >
            <b>
                <span class="badge rounded-pill bg-secondary">
                    {{ timeUntilEvent(meeting.date, meeting.endDate) }}
                </span>
            </b>

            <h3 class="meeting__title">{{ meeting.title }}</h3>

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
                class="button-2 mb-2 mt-1"
                v-if="showLink(meeting.link)"
                @click="() => window.open(meeting.link)"
            >
                Acessar reunião online
            </button>
        </li>
    </ul>
</template>

<style scoped>
@import '@/public/sass/meetings.scss';
</style>
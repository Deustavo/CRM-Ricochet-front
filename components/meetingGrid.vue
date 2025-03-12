<script setup lang="ts">
import { useMeetings } from "@/store/useMeetings";
const { timeUntilEvent } = useMeetings();

export interface MeetingType {
    id: number;
    title: string;
    description: string;
    start_time: string;
    end_time: string;
    meeting_link: string;
    attendees: AttendeesType[];
}

type AttendeesType = {
    id: number;
    name: string;
    email: string;
}

const props = defineProps({
    meetings: {
        type: Array as () => MeetingType[],
        required: true
    },
    type: {
        type: String as () => 'today' | 'future' | 'past',
        required: true
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

const typeText = {
    today: 'hoje',
    future: 'programadas',
    past: 'passadas'
}
</script>

<template>
    <ul class="meeting__grid" v-if="props.meetings.length">
        <li
            class="meeting__item"
            v-for="meeting in props.meetings" :key="meeting.id"
        >
            <b>
                <span class="badge rounded-pill bg-secondary">
                    {{ timeUntilEvent(meeting.start_time, meeting.end_time) }}
                </span>
            </b>

            <h4 class="meeting__title">{{ meeting.title }}</h4>

            <p>
                <i class="pi pi-clock" />
                <span>{{ getHour(meeting.start_time) }}</span>
            </p>

            <p>
                <i class="pi pi-calendar" />
                <span>{{ getDate(meeting.start_time) }}</span>
            </p>
            
            <!-- <p>
                <i class="pi pi-map" />
                <span>{{ meeting.location }}</span>
            </p> -->

            <button
                class="button--2 mb-2 mt-1"
                v-if="showLink(meeting.meeting_link)"
                @click="() => openLink(meeting.meeting_link)"
            >
                Acessar reunião
            </button>
        </li>
    </ul>
    <div
        class="d-flex justify-content-center align-items-center pt-4 pb-5"
        v-else
    >
        <p>Você não possui reuniões {{ typeText[props.type] }}</p>
    </div>
</template>

<style scoped>
@import '@/public/sass/meetingGrid.scss';
</style>
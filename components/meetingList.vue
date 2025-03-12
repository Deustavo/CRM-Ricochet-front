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
const showLink = (meeting: MeetingType): boolean => {
    return (timeUntilEvent(meeting.start_time, meeting.end_time) === 'Em andamento');
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
    <ul class="meeting__list" v-if="props.meetings.length">
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
                        @click="() => openLink(meeting.meeting_link)"
                    >
                        Acessar reunião online
                    </button>
                    <span
                    v-else
                        class="badge rounded-pill bg-secondary"
                    >
                        {{ timeUntilEvent(meeting.start_time, meeting.end_time) }}
                    </span>
                </b>
            </div>

            <div class="meeting__details">
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
            </div>
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
@import '@/public/sass/meetingList.scss';
</style>
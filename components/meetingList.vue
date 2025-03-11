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
                <span>{{  }}</span>
            </p>

            <p>
                <i class="pi pi-calendar" />
                <span>{{  }}</span>
            </p>
            
            <p>
                <i class="pi pi-map" />
                <span>{{  }}</span>
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
<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
    meetings: { id: number; title: string; date: string }[];
}>();
</script>

<template>
    <ul>
        <li v-for="meeting in props.meetings" :key="meeting.id">
            {{ meeting.title }} - {{ meeting.date }}
        </li>
    </ul>
</template>

<style scoped>
</style>
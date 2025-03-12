<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
router.push('/');
</script>

<template>
    <div class="d-flex justify-content-center align-items-center vh-100">
        <div class="loading-dots" />
    </div>
</template>

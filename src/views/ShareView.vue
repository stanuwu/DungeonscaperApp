<script setup lang="ts">
import { useGameStore } from '@/stores/game';
import router from '@/router';

const store = useGameStore();
const join = async (id: string) => {
    store.invite = id;
    router.push(router.getRoutes().find((r) => r.name == 'home'));
};

join(router.currentRoute.value.params.sessionid);
</script>

<template>
    <div>Redirecting...</div>
</template>

<style scoped></style>

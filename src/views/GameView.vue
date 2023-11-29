<script setup lang="ts">
import {useGameStore} from "@/stores/game";

const store = useGameStore();

</script>

<template>
  <div>
    <h1>Game</h1>
    <span>{{store.identity!.name}} - {{store.identity!.identifier}}</span>
  </div>
</template>

<style scoped>

</style>
<script setup lang="ts">
import { ref } from 'vue';
import {useGameStore} from "@/stores/game";
import router from "@/router";
const text = ref('');

const store = useGameStore();
const play = async () => {
  if (text.value) {
    await store.login(text.value);
    if (!store.identity) return;
    await router.push({path: 'game'})
  }
}
</script>

<template>
  <div class="q-ma-md text-center">
    <h2>Welcome!</h2>
    <div class="row justify-center q-mt-lg">
      <div class="col-6 flex">
        <q-input class="col q-pr-md" label-color="dark" bg-color="primary" standout v-model="text" label="Username"></q-input>
        <q-btn class="col-2" @click="play" size="21.5px" text-color="dark" color="primary">Play</q-btn>
      </div>
    </div>
  </div>
</template>

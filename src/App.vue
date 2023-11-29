<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="fullscreen">
    <div class="bg-primary row no-wrap q-pa-md text-dark">
      <h4>Dungeonscaper</h4>
      <q-space/>
      <RouterLink to="/" class="q-mr-lg text-dark text-h5" active-class="text-weight-bold">Home</RouterLink>
      <RouterLink to="/about" class="q-mr-xs text-dark text-h5" active-class="text-weight-bold">About</RouterLink>
    </div>
    <RouterView />
  </div>
</template>

<style lang="scss">
#app {
  padding: 0;
}
</style>

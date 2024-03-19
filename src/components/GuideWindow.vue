<script setup lang="ts">
import {ref} from 'vue';

const dialog = ref(false);
const maximized = ref(true);
</script>

<template>
  <div>
    <q-btn color="primary" @click="dialog = true">How to play</q-btn>

    <q-dialog
        v-model="dialog"
        persistent
        maximized="maximized"
        transition-show="slide-up"
        transition-hide="slide-down"
    >
      <q-card class="bg-primary text-white">
        <q-bar>
          <q-space/>

          <q-btn dense flat icon="minimize" @click="maximized = false" :disable="!maximized">
            <q-tooltip v-if="maximized" class="bg-white text-primary">Minimize</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="crop_square" @click="maximized = true" :disable="maximized">
            <q-tooltip v-if="!maximized" class="bg-white text-primary">Maximize</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <div class="text-h6">Guide</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet
          porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro
          labore.
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<style scoped>

</style>
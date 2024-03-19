<script setup lang="ts">
import {ref} from 'vue';
import {useGameStore} from '@/stores/game';
import router from '@/router';
import GuideWindow from "@/components/GuideWindow.vue";

const store = useGameStore();

if (!store.identity) {
  router.push(router.getRoutes().find((r) => r.name == 'home'));
}

if (store.invite) {
  store.joinSession(store.invite);
  store.invite = undefined;
}

const name = ref('');
const desc = ref('');
const id = ref('');
const join = async () => {
  await store.joinSession(id.value);
  start();
};

const create = async () => {
  await store.createSession(name.value, desc.value);
  start();
};

const start = async () => {
  store.updateUsers();
}

const kick = async (id: number) => {
  store.kickUser(id);
}

const copyInvite = (link: string) => {
  navigator.clipboard.writeText(link);
}
</script>

<template>
  <div class="q-ma-md">
    <div v-if="store.session">
      <div class="flex items-center q-my-md">
        <div class="q-badge q-pa-sm q-pt-md q-pr-lg">
          <h4>Lobby: {{ store.session?.name }}</h4>
          <p>{{ store.session?.description }}</p>
        </div>

        <div class="q-ml-md">
          <q-btn color="primary" @click="copyInvite(`${store.page}share/${store.session?.identifier}`)">Copy Invite
          </q-btn>
          <br>
          <q-btn class="q-mt-sm" color="primary" @click="copyInvite(`${store.session?.identifier}`)">
            Copy ID
          </q-btn>
        </div>
      </div>

      <q-list bordered separator dark style="max-width: 350px">
        <q-item-label header class="text-h6 bg-primary text-white">Users</q-item-label>
        <q-item v-for="(user, index) in store.users" v-bind:key="index">
          <q-item-section>
            <q-item-label>{{ user }}</q-item-label>
            <q-item-label caption lines="1" v-if="store.isOwner() && user == store.identity.name">Host</q-item-label>
          </q-item-section>

          <q-item-section side v-if="store.isOwner() && user != store.identity.name">
            <q-btn color="warning" class="q-ml-md" @click="kick(index)">Kick</q-btn>
          </q-item-section>
          <q-separator color="primary" size="100%"></q-separator>
        </q-item>
      </q-list>

      <div class="q-mt-md flex">
        <q-btn color="primary" class="q-mr-md" to="/play">Join</q-btn>
        <GuideWindow></GuideWindow>
      </div>

    </div>
    <div v-if="!store.session">
      <h4>Sessions</h4>
      <div class="row q-mt-lg">
        <div class="col-6 flex">
          <q-input
              class="col q-pr-md"
              label-color="dark"
              bg-color="primary"
              standout
              v-model="id"
              label="Session ID"
          ></q-input>
          <q-btn class="col-2" @click="join" size="21.5px" text-color="dark" color="primary">Join</q-btn>
        </div>
      </div>
      <div class="row q-mt-lg">
        <div class="col-6 flex">
          <q-input
              class="col q-pr-md"
              label-color="dark"
              bg-color="primary"
              standout
              v-model="name"
              label="Session Name"
          ></q-input>
          <q-input
              class="col q-pr-md"
              label-color="dark"
              bg-color="primary"
              standout
              v-model="desc"
              label="Session Description"
          ></q-input>
          <q-btn class="col-2" @click="create" size="21.5px" text-color="dark" color="primary">Create</q-btn>
        </div>
      </div>
    </div>

    <footer>
      <div class="q-mt-md">Logged in as: "{{ store.identity?.name }}"</div>
    </footer>
  </div>
</template>

<style scoped></style>

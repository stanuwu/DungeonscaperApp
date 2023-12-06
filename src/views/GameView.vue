<script setup lang="ts">
import { ref } from 'vue';
import { useGameStore } from '@/stores/game';
import router from '@/router';

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
    store.joinSession(id.value);
};

const create = async () => {
    store.createSession(name.value, desc.value);
};
</script>

<template>
    <div>
        <h4>Game</h4>
        <span>Logged in as: "{{ store.identity?.name }}" ({{ store.identity?.identifier }})</span>
        <div v-if="store.session">
            <h3>Session View<span v-if="store.isOwner()"> (host)</span></h3>
            <h4>
                Invite: <span>{{ store.page }}</span
                >share/{{ store.session?.identifier }}
            </h4>
            <span>"{{ store.session?.name }}"</span>
            <p>{{ store.session?.description }}</p>
        </div>
        <div v-if="!store.session">
            <h3>Hub View</h3>
            <div class="row justify-center q-mt-lg">
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
            <div class="row justify-center q-mt-lg">
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
    </div>
</template>

<style scoped></style>

<script setup lang="ts">
import router from "@/router";
import {useGameStore} from "@/stores/game";
import GuideWindow from "@/components/GuideWindow.vue";
import {Ref, ref} from "vue";
import SocketManager from "@/network/SocketManager";

const store = useGameStore();

if (!store.session) {
    router.push(router.getRoutes().find((r) => r.name == 'home'));
}

const d1 = ref(1);
const d2 = ref(6);

const rolls: Ref<Array<{ name: string, die: string, results: Array<number> }>> = ref([]);

const listRoll = (roll: { name: string, die: string, results: Array<number> }) => {
    rolls.value.unshift(roll);
    rolls.value.splice(5, rolls.value.length - 5);
}

store.addRoll = listRoll;

const addRoll = () => {
    const roll: { name: string, die: string, results: Array<number> } = {name: store.identity?.name, die: `${d1.value}d${d2.value}`, results: []};
    for (let i = 0; i < d1.value; i++) {
        roll.results.push(Math.round(Math.random() * d2.value))
    }
    SocketManager.Instance.SendRoll(roll);
}
</script>

<template>
    <div class="flex q-ma-md">
        <div>
            <q-btn class="q-mb-sm" color="primary" to="/game">Players</q-btn>
            <br>
            <q-btn class="q-mb-sm" color="primary">Character Sheet</q-btn>
            <br>
            <q-btn class="q-mb-sm" color="primary">Session Info</q-btn>
            <br>
            <GuideWindow class="q-mb-sm"></GuideWindow>
        </div>

        <div class="q-ml-lg">
            <q-btn class="q-mr-sm" color="primary">Add Object</q-btn>
            <q-btn class="q-mr-sm" color="primary">Remove Object</q-btn>
            <q-btn class="q-mr-sm" color="primary">Remove All</q-btn>
            <br>
            <div class="bg-white q-mt-md" style="width: 600px; height: 400px"></div>
        </div>

        <div class="q-ml-lg">
            <q-list dark bordered separator style="min-width: 300px">
                <q-item-label header class="bg-primary text-white">Inventory</q-item-label>
                <q-item>
                    <q-item-section>
                        <q-item-label>Example 1</q-item-label>
                    </q-item-section>
                </q-item>
                <q-item>
                    <q-item-section>
                        <q-item-label>Example 2</q-item-label>
                    </q-item-section>
                </q-item>
                <q-item>
                    <q-item-section>
                        <q-item-label>Example 3</q-item-label>
                    </q-item-section>
                </q-item>
            </q-list>

            <br>

            <q-list dark bordered separator style="min-width: 300px">
                <q-item-label header class="bg-primary text-white">Roll Log</q-item-label>
                <q-item v-for="(roll, idx) in rolls" v-bind:key="idx"
                        :class="idx == 0 ? 'bg-warning text-dark' : 'text-white'">
                    <q-item-section>
                        <q-item-label>{{ roll.name }}</q-item-label>
                        <q-item-label :class="idx == 0 ? 'bg-warning text-dark' : 'text-white'" caption lines="1">{{
                                roll.die
                            }}
                        </q-item-label>
                    </q-item-section>
                    <q-item-section side>
                        <q-item-label :class="idx == 0 ? 'bg-warning text-dark' : 'text-white'">{{
                                roll.results.join(', ')
                            }}
                        </q-item-label>
                    </q-item-section>
                </q-item>
            </q-list>

            <br>

            <div class="flex">
                <q-input outlined style="width: 70px" type="number" dark v-model="d1"></q-input>
                <q-btn class="text-h6 text-bold" color="primary" flat>d</q-btn>
                <q-input outlined style="width: 70px" type="number" dark v-model="d2"></q-input>
                <q-btn class="q-ml-md" color="primary" @click="addRoll()">Roll</q-btn>
            </div>
        </div>
    </div>
</template>
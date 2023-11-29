import {ref} from 'vue'
import type { Ref } from 'vue';
import axios from 'axios';
import { defineStore } from 'pinia'
import type ApiIdentity from "@/api/ApiIdentity";
import type ApiSession from "@/api/ApiSession";

export const useGameStore = defineStore('counter', () => {
  const identity: Ref<ApiIdentity | undefined> = ref(undefined);
  const session: Ref<ApiSession | undefined>  = ref(undefined);

  const login = async (name: string) => {
    identity.value = (await axios.post<ApiIdentity>('user/get', {name: name})).data;
    console.log(identity.value);
  }
  return { identity, session, login }
})

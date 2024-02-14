import type { Ref } from 'vue';
import { ref } from 'vue';
import axios from 'axios';
import { defineStore } from 'pinia';
import type ApiIdentity from '@/api/ApiIdentity';
import type ApiSession from '@/api/ApiSession';
import SocketManager from '@/network/SocketManager';

export const useGameStore = defineStore('counter', () => {
    const page = 'http://localhost:5173/';
    const invite: string | undefined = undefined;

    const identity: Ref<ApiIdentity | undefined> = ref(undefined);
    const session: Ref<ApiSession | undefined> = ref(undefined);
    const users: Ref<string[]> = ref([]);

    const login = async (name: string) => {
        identity.value = (await axios.post<ApiIdentity>('user/get', { name: name })).data;
        axios.defaults.headers.get.Authorization = identity.value?.identifier;
        axios.defaults.headers.post.Authorization = identity.value?.identifier;
        SocketManager.Instance.Auth(identity.value?.identifier);
    };

    const createSession = async (name: string, description: string) => {
        session.value = (await axios.post<ApiSession>('user/session', { name: name, description: description })).data;
    };

    const joinSession = async (id: string) => {
        session.value = (await axios.get<ApiSession>('user/join/' + id)).data;
    };

    const isOwner = (): boolean => {
        return identity.value?.identifier == session.value?.owner;
    };

    const setUsers = (u: string[]) => {
        users.value = u;
    };

    const updateUsers = () => {
        SocketManager.Instance.UpdateUsers();
    };

    const kickUser = (id: number) => {
        SocketManager.Instance.KickUser(id);
    };

    return {
        page,
        invite,
        identity,
        session,
        users,
        login,
        createSession,
        joinSession,
        isOwner,
        setUsers,
        updateUsers,
        kickUser,
    };
});

import {io, Socket} from "socket.io-client";
import type {ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData} from "./Packets";
import {useGameStore} from "@/stores/game";
import router from "@/router";

export default class SocketManager {
    public static Instance: SocketManager = new SocketManager();

    private socket: Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>;

    constructor() {
        const ws = 'http://localhost:3001/';
        this.socket = io(ws);

        this.socket.on("test", this.ReceiveTestPacket);

        // ReAuth on Disconnect
        this.socket.on("requestAuth", (callback: Function) => {
            const gameStore = useGameStore();
            callback({
                auth: gameStore.identity === undefined ? "" : gameStore.identity.identifier,
            })
        })

        // Handle Update Users
        this.socket.on('sendUsers', (users: string[]) => {
            const gameStore = useGameStore();
            gameStore.setUsers(users);
        });

        // Handle Kick
        this.socket.on('kick', () => {
            router.push(router.getRoutes().find((r) => r.name == 'home'));
        });

        // Handle Rolls
        this.socket.on('roll', (roll: any) => {
            const gameStore = useGameStore();
            gameStore.addRoll(roll);
        })
    }

    private ReceiveTestPacket(): void {
        console.log("Socket Test");
    }

    public SendTestPacket(): void {
        this.socket.emit("test");
    }

    public Auth(auth: string): void {
        this.socket.emit("auth", auth);
    }

    public UpdateUsers(): void {
        this.socket.emit("requestUsers");
    }

    public KickUser(id: number): void {
        this.socket.emit('kickUser', id);
    }

    public SendRoll(roll: any): void {
        this.socket.emit('roll', roll);
    }
}
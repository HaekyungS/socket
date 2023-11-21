import { Server } from 'socket.io';
export declare class ChatGateway {
    server: Server;
    handleMessage(message: string): void;
}

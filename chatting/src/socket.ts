import { io } from "socket.io-client";

const URL = process.env.NODE_ENV === "production" ? undefined : "http://localhost:4000";

export const socket = io(URL);
// type에러같은데.
// JS 로 할땐 express 로 만든 서버에 연결해서 하면 되는데 react 는 달라서 그런건가

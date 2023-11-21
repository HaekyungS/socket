import io from "socket.io-client";

export const socketServer = () => {
  // 소켓서버가 있는 nest가 3000번 맞다.
  const socket = io("http://localhost:3000", { transports: ["websocket"] });

  socket.on("connect", () => {
    console.log("socket connected");

    // 다른 유저의 채팅이 온 경우
    // return type 문제로 막힘 막힘
    socket.on("message", (data: string) => {
      socket.emit("otherChat", data);
    });
  });
};

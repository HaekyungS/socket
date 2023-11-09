import express from "express";
import path from "path";
import { createServer } from "node:http";
import { Server } from "socket.io";

// 절대경로 사용을 위한 경로 설정
const __dirname = path.resolve("..");

const app = express();
// 소켓연결을 위한 서버
const server = createServer(app);
// 소켓서버
const io = new Server(server);

// 정적 파일 사용을 위한 express.static 경로 설정
app.use(express.static(path.join(__dirname, "view")));
app.use(express.static(path.join(__dirname, "module")));

// 접속 html
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: path.join(__dirname, "view") });
});

// index.js
app.get("/index.js", (req, res) => {
  res.sendFile("index.js", { root: path.join(__dirname, "view") });
});

// module/tagMaker.js
app.get("/module/tagMaker.js", (req, res) => {
  res.sendFile("tagMaker.js", { root: path.join(__dirname, "module") });
});

let onlineUser = [];
let room = ["one", "two"];

// 소켓입장 시
io.on("connection", (socket) => {
  console.log("socket server is on");

  // 입장한 유저를 온라인유저 배열에 추가.
  onlineUser.push(socket.id);

  if (onlineUser.length % 2 === 1) {
    socket.join(room[0]);

    //socket 에 room 추가
    socket.room = room[0];
  } else {
    socket.join(room[1]);
    socket.room = room[1];
  }

  // 입장한 소켓의 아이디를 전달한다.
  io.to(socket.room).emit("come", { user: socket.id, room: socket.room });

  // 전달받은 메세지를 나 제외한 다른 유저에게 전달한다.
  socket.on("message", (data) => {
    socket.to(socket.room).emit("anotherMessage", data);
  });

  socket.on("leaveRoom", () => {
    // 기존 방 떠나기
    socket.leave(socket.room);

    // 잘가라고 인사보내주기
    io.to(socket.room).emit("bye", socket.id);

    let otherroom = room.filter((data) => data !== socket.room);

    socket.room = otherroom[0];

    socket.join(socket.room);

    io.to(socket.room).emit("otherRoomIn", { user: socket.id, room: socket.room });
  });

  socket.on("disconnect", () => {
    console.log("byebye");
    io.to(socket.room).emit("getOut", socket.id);
    onlineUser = onlineUser.filter((user) => user !== socket.id);
  });
});

server.listen(3000, () => {
  console.log("port 3000 실행중");
});

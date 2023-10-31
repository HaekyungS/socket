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

// 소켓입장 시
io.on("connection", (socket) => {
  console.log("socket server is on");
  console.dir(socket);

  socket.on("disconnect", () => {
    console.log("byebye");
  });
});

server.listen(3000, () => {
  console.log("port 3000 실행중");
});

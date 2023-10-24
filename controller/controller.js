import express from "express";
import path from "path";

// 절대경로 사용을 위한 경로 설정
const __dirname = path.resolve("..");

const app = express();

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

app.listen(3000, () => {
  console.log("port 3000 실행중");
});

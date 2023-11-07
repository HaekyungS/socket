import { TagMaker } from "../module/tagMaker.js";

const socket = io();

Object.assign(document.body, { style: "width:100vw; height:100vh;" });

// 컨테이너
const container = TagMaker("div", document.body, {
  style:
    "width:100%; height:100%; display:flex; flex-direction:column; justify-content:center; align-items:center; background-color:#FBEFEF",
});

// 메신저 화면
const chatBox = TagMaker("div", container, {
  style: "width:50%; height:60%; display:flex; flex-direction:column; background-color:#F6CECE",
});

// 메신저 상단부
const chatTop = TagMaker("div", chatBox, {
  style:
    "width:100%; height:10%; display:flex; align-items:center; border-bottom:0.5px solid lightpink;",
});

// 채팅방 이름
const chatRoomName = TagMaker("div", chatTop, {
  style: "width:65%; height:50%; text-align:center; font-size:20px; ",
});

// 채팅방 이동버튼
const chatLeave = TagMaker("div", chatTop, {
  style: "width:30%; height:50%; text-align:center; font-size:16px;background-color:lightpink",
  innerText: "다른방가기",
});

// 메신저 본문
const chatTextBox = TagMaker("div", chatBox, {
  style: "width:100%; height:75%; border-bottom:0.5px solid lightpink; overflow:auto; padding:5px",
});

// 메신저 전송부
const chatTextSend = TagMaker("form", chatBox, {
  method: "post",
  style: "width:100%; height:15%; display:flex; align-items:center; justify-content:center",
});

const textbox = TagMaker("input", chatTextSend, {
  type: "text",
  style: "width:75%; height:80%; background-color:#F8E0E0; border:0px",
});

const textSend = TagMaker("input", chatTextSend, {
  type: "submit",
  style:
    "width:15%; height:80%; background-color:lightpink; border:0px; display:flex; justify-content:center; align-items:center",
});

TagMaker("p", textSend, {
  style: "font-size:13px; text-align:center",
  innerText: "전송",
});

// 입장한 소켓아이디를 채팅창 상단부에 텍스트로 넣어준다.
socket.on("come", (data) => {
  chatRoomName.innerText = data.room + "의 room";

  const newTextBox = TagMaker("div", chatTextBox, {
    style: "width:90%; height:auto; display:flex; margin:7px;background-color:#F8E0E0",
  });
  TagMaker("div", newTextBox, {
    style: "width:100%; height:auto; font-size:13px; text-align:center; ",
    innerText: data.user + "님이 들어오셨습니다. 하이하이~",
  });
});

// 내가 작성된 메세지 생성 이벤트
chatTextSend.addEventListener("submit", (e) => {
  e.preventDefault();

  console.log(socket.room);

  // 내가 입력한 값을 서버로 전달해준다.
  socket.emit("message", textbox.value);

  const newTextBox = TagMaker("div", chatTextBox, {
    style: "width:90%; height:auto; display:flex; flex-direction:row-reverse; margin:5px",
  });
  TagMaker("div", newTextBox, {
    style: "max-width:40%; height:auto; background-color:#F8E0E0; font-size:13px; ",
    innerText: textbox.value,
  });

  textbox.value = "";
});

// 다른 유저의 메세지
socket.on("anotherMessage", (data) => {
  const newTextBox = TagMaker("div", chatTextBox, {
    style: "width:90%; height:auto; display:flex; margin:7px",
  });
  TagMaker("div", newTextBox, {
    style: "max-width:40%; height:auto; background-color:#F8E0E0; font-size:13px; ",
    innerText: data,
  });
});

// 유저 퇴장 안내
socket.on("getOut", (data) => {
  const newTextBox = TagMaker("div", chatTextBox, {
    style: "width:90%; height:auto; display:flex; margin:5px; background-color:#F8E0E0",
  });
  TagMaker("div", newTextBox, {
    style: "width:100%; height:auto; text-align:center; font-size:13px; ",
    innerText: data + "님이 퇴장하셨습니다! 바이바이~",
  });
});

chatLeave.addEventListener("click", () => {
  socket.emit(leaveRoom, socket);
});

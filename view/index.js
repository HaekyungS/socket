import { TagMaker } from "../module/tagMaker.js";

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
  style: "width:100%; height:10%; border-bottom:0.5px solid lightpink",
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

// 내가 작성된 메세지 생성 이벤트
chatTextSend.addEventListener("submit", (e) => {
  e.preventDefault();

  const newTextBox = TagMaker("div", chatTextBox, {
    style: "width:90%; height:auto; display:flex; flex-direction:row-reverse; margin:5px",
  });
  TagMaker("div", newTextBox, {
    style: "max-width:40%; height:auto; background-color:#F8E0E0; font-size:13px; ",
    innerText: textbox.value,
  });

  textbox.value = "";
});

console.log(textSend);

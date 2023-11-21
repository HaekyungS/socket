import React, { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";

export const App = () => {
  // 입력될 채팅
  const [chatText, setChatText] = useState("");
  // 내가 쓴 채팅
  const [chatList, setChatList] = useState<string[]>([]);
  // 남이 쓴 채팅
  const [otherChat, setOtherChat] = useState<string[]>([]);

  const socket = io("http://localhost:3000", { transports: ["websocket"] });

  useEffect(() => {
    socket.on("connect", () => {
      console.log("socket connected");

      // 내 채팅을 다른 유저들에게 전달.
      socket.emit("message", chatText);

      socket.on("message", (data: string) => {
        setOtherChat([...otherChat, data]);
      });
    });
  }, [chatText, otherChat, socket]);

  // text 입력받으면 추가시킬 함수
  const chatInput = (text: string) => {
    return <li>{text}</li>;
  };

  const chatOtherInput = (text: string) => {
    return <li className="otherChat">{text}</li>;
  };

  const chatChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChatText(event.target.value);
  };

  // 내가 쓴 채팅
  const chatAdd = () => {
    socket.emit("message", chatText);

    setChatList([...chatList, chatText]);
    setChatText("");
  };

  return (
    // 전체 컨테이너
    <div className="chatContainer flexColumnCenter">
      {/* 채팅박스 */}
      <div className="chatbox">
        {/* 상단부 */}
        <div className="chatTop flexCenter">
          <div>채팅방 이름 들어갈 곳</div>
          <div className="otherRoom">다른 방 가기</div>
        </div>

        {/* 메인채팅 */}
        <ol className="chatMain">
          {/* 아래 전송 누르면 여기 생겨야함 */}
          {/* 내 채팅뜨는거고 */}
          {chatList.map(chatInput)}
          {/* 남의채팅뜨는건데 */}
          {otherChat.map(chatOtherInput)}
        </ol>

        {/* 하단입력부 */}
        <div className="chatMessage flexCenter">
          <input
            type="text"
            placeholder="채팅을 입력하세요"
            className="chatInput"
            value={chatText}
            onChange={chatChange}
          />
          <input type="submit" value="전송" className="chatSummitButton" onClick={chatAdd} />
        </div>
      </div>
    </div>
  );
};

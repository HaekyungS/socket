import React, { useState } from "react";
import "./App.css";

function App() {
  // 입력될 채팅
  const [chatText, setChatText] = useState("");

  // text 입력받으면 추가시킬 함수
  const chatInput = (text: string) => {
    return <div>{text}</div>;
  };

  const chatChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChatText(event.target.value);
    console.log(chatText);
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
        <div className="chatMain">
          {/* 아래 전송 누르면 여기 생겨야함 */}
          {}
        </div>

        {/* 하단입력부 */}
        <div className="chatMessage flexCenter">
          <input
            type="text"
            placeholder="채팅을 입력하세요"
            className="chatInput"
            value={chatText}
            onChange={chatChange}
          />
          <input type="submit" value="전송" className="chatSummitButton" />
        </div>
      </div>
    </div>
  );
}

export default App;

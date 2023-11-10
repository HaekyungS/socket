import React from "react";
import "./App.css";

function App() {
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
        <div className="chatMain"></div>

        {/* 하단입력부 */}
        <div className="chatMessage flexCenter">
          <input type="text" placeholder="채팅을 입력하세요" className="chatInput" />
          <input type="submit" value="전송" className="chatSummitButton" />
        </div>
      </div>
    </div>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import { socket } from "./socket";

export const Chat = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvent, setFooEvent] = useState([]);

  useEffect(() => {
    // 연결
    function onConnect() {
      setIsConnected(true);
    }

    // 연결해제
    function onDisconnect() {
      setIsConnected(false);
    }

    // 이건 뭐지
    function onFooEvent(value: any) {
      // type선언해주면됨
      setFooEvent((previous) => [...previous, value]);
    }

    // 소켓이 연결되면 연결함수실행
    socket.on("connect", onConnect);

    // 소켓이 해제되면 연결해제함수실행
    socket.on("disconnect", onDisconnect);

    // foo 가 뭔데 그래서
    socket.on("foo", onFooEvent);
  }, []);

  return <div></div>;
};

import { useEffect, useState } from "react";

export const useWebSocket = () => {
  const [ws, setWs] = useState(null);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    const socket = new WebSocket(import.meta.env.VITE_WS_URI);

    socket.onopen = () => {
      console.log("Connected to WebSocket");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setResponse(data);
    };

    setWs(socket);

    return () => socket.close();
  }, []);

  const sendMessage = (sentence) => {
    if (!ws) return;
    ws.send(JSON.stringify({ sentence }));
  };

  return { sendMessage, response };
};
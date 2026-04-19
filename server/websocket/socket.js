import { WebSocketServer } from "ws";
import { getCorrection } from "../services/aiService.js";

export const setupWebSocket = (server) => {
  const wss = new WebSocketServer({ server });
  console.log(`websocket Server is running `);
  
  wss.on("connection", (ws) => {
    console.log("Client connected");

    ws.on("message", async (message) => {
      try {
        const data = JSON.parse(message);
        const sentence = data.sentence;

        const result = await getCorrection(sentence);

        ws.send(JSON.stringify(result));
      } catch (err) {
        ws.send(JSON.stringify({ error: err.message }));
      }
    });

    ws.on("close", () => {
      console.log("Client disconnected");
    });
  });
};
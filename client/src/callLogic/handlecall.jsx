import { useState, useEffect } from "react";
import { useWebSocket } from "../hooks/wshook.jsx";
import { startListening } from "../components/VoiceInput.jsx";
import { speakText } from "../utils/speech.jsx";

export default function useHandleCalling(callState, setMessages) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isTalking, setIsTalking] = useState(false);

  const { sendMessage, response } = useWebSocket();

  const startConversation = () => {
    startListening(async (speechText) => {
      setInput(speechText);
      setLoading(true);

      sendMessage(speechText); // WebSocket send
      setMessages((prev) => [...prev, { role: "user", text: speechText }]);
    }, () => {
      console.log("Stopping due to silence");
      setIsTalking(false);
    });
  };

  useEffect(() => {
    if (!response) return;

    const fullResponse = `
    Corrected:${response.corrected},
    Explain:${response.explanation},
    Response:${response.myResponce},
    FollowUp:${response.followUpQuestion}
    `;

    setMessages((prev) => [...prev, { role: "ai", text: fullResponse }]);
    setLoading(false);

    speakText(fullResponse, () => {
      if (isTalking) {
        startConversation();
      }
    });
  }, [response, isTalking, setMessages]);

  useEffect(() => {
    if (callState) {
      setIsTalking(true);
      startConversation();
    } else {
      setIsTalking(false);
    }
  }, [callState]);

  return {
    input,
    loading,
    isTalking,
  };
}

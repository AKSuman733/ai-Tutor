import { useState, useEffect , useRef} from "react";
import { useWebSocket } from "../hooks/wshook.jsx";
import { startListening } from "../components/VoiceInput.jsx";
import { speakText } from "../utils/speech.jsx";

export default function useHandleCalling(callActive, setCallActive, setMessages) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  
  const recognitionRef = useRef(null);
  const { sendMessage, response } = useWebSocket();

  const startConversation = () => {
    if (recognitionRef.current) recognitionRef.current.stop(); // Stop any existing instance
    recognitionRef.current = startListening(async (speechText) => {
      setInput(speechText);
      setLoading(true);
      setMessages((prev) => [...prev, { role: "user", text: speechText }]);
      sendMessage(speechText); // send to WebSocket
  
    }, () => {
      console.log("Stopping due to silence");
      setCallActive(false);
    });
  };

  useEffect(() => {
    if (!callActive && recognitionRef.current) {
      console.log("🛑 Stopping recognition because call ended");
      recognitionRef.current.stop();
      recognitionRef.current = null; // Clean up ref
    }
  }, [callActive]);

  useEffect(() => {
    if (!response || !callActive) return;

    setLoading(false);
    const mistake = response.mistakeExplanation;
    const corrected = response.correctedOrBetter;
    const aiRes = response.aiResponse;

    // Check if corrected text exists and isn't just an empty string
    const chatResponse = (corrected && corrected.trim().length > 0) ? `You should say : ${corrected}. ${aiRes}` : aiRes;

    // Update state once
    setMessages((prev) => [...prev, { role: "ai", text: chatResponse }]);

    speakText(`${mistake} ${aiRes}`, () => {
      if (!callActive) return;
        startConversation();
      
    });
  }, [response]);

  useEffect(() => {
    if (callActive) {
      startConversation();
    } 
  }, [callActive]);

  return {
    input,
    loading,
    callActive
  };
}

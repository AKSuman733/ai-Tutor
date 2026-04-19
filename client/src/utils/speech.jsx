export const speakText = (text, onEnd) => {
  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = "en-US";

  speech.onend = () => {
    console.log("AI finished speaking");
    if (onEnd) onEnd(); // 🔥 trigger next step
  };
  speechSynthesis.speak(speech);
};
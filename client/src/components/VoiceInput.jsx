
export const startListening = (onResult, onTimeout) => {
  const recognition = new window.webkitSpeechRecognition();

  recognition.lang = "en-US";
  recognition.continuous = false; // important
  recognition.interimResults = false;

  let silenceTimer;

  recognition.start();
  console.log("🎤 Listening started");

  // ⏳ Start 10 sec timeout immediately
  silenceTimer = setTimeout(() => {
    console.log("⏹ No speech for 10 sec → stopping mic");
    recognition.stop();
    if (onTimeout) onTimeout();
  }, 10000);

  // 🎤 When user speaks
  recognition.onresult = (event) => {
    clearTimeout(silenceTimer); // ✅ user spoke → cancel timeout

    const speechText = event.results[0][0].transcript;
    onResult(speechText);
  };

  return recognition;
};
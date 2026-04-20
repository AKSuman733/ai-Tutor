// export const speakText = (text, onEnd) => {
//   const speech = new SpeechSynthesisUtterance(text);
//   speech.lang = "en-US";

//   speech.onend = () => {
//     console.log("AI finished speaking");
//     if (onEnd) onEnd(); // 🔥 trigger next step
//   };
//   speechSynthesis.speak(speech);
// };
export const speakText = (text, onEnd) => {
  const speech = new SpeechSynthesisUtterance(text);

  const voices = speechSynthesis.getVoices();

  // 🎯 select Heera voice
  const Voice = voices.find(
    (v) => v.name === "Google UK English Female"
  );

  if (!voices.length) {
  speechSynthesis.onvoiceschanged = () => {
    speakText(text, onEnd); // retry
  };
  return;
}

  if (Voice) {
    speech.voice = Voice;
  }

  // 🔥 make it sound more human
  // speech.rate = 0.9;   // slower = natural
  // speech.pitch = 1;    // keep normal
  // speech.volume = 1;

  speech.onend = () => {
    console.log("AI finished speaking");
    if (onEnd) onEnd();
  };

  speechSynthesis.speak(speech);
};
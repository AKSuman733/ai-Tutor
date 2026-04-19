import { useState, useRef, useEffect } from "react";
import useHandleCalling from "../callLogic/handlecall";

export default function PhoneCard({
  aiName = "Aria",
  aiRole = "AI conversation partner",
  messages: initialMessages = [
    { role: "ai", text: "Hi! Let's talk about your weekend plans. What did you do?" },
    { role: "user", text: "I went to a park with friends!" },
    { role: "ai", text: "That sounds lovely! Did you try any outdoor activities there?" },
  ],
}) {
  const [callActive, setCallActive] = useState(false);
  const [muted, setMuted] = useState(false);
  const [speaker, setSpeaker] = useState(true);
  const [messages, setMessages] = useState(initialMessages);
  const [callDuration, setCallDuration] = useState(0);
  const bottomRef = useRef(null);
  const timerRef = useRef(null);
  
  useHandleCalling(callActive, setMessages);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (callActive) {
      timerRef.current = setInterval(() => setCallDuration((d) => d + 1), 1000);
    } else {
      clearInterval(timerRef.current);
      setCallDuration(0);
    }
    return () => clearInterval(timerRef.current);
  }, [callActive]);

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  const handleStart = () => {
    setCallActive(true);
  };

  const handleEnd = () => {
    setCallActive(false);
    setMuted(false);
  };

  return (
    <>
      <style>{`
  .pc-wrap {
    width: 560px;
    background: #fff;
    border-radius: 28px;
    border: 0.5px solid #E5E7EB;
    overflow: hidden;
    font-family: system-ui, -apple-system, sans-serif;
    box-shadow: 0 4px 24px rgba(0,0,0,0.06);
  }
  .pc-header {
    background: #0F0A2E;
    padding: 20px 24px;
    display: flex;
    align-items: center;
    gap: 14px;
  }
  .pc-avatar {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    background: #EEEDFE;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    position: relative;
  }
  .pc-pulse {
    position: absolute;
    inset: -5px;
    border-radius: 50%;
    border: 1.5px solid #7F77DD;
    opacity: 0;
    animation: pc-pulse 2s ease-out infinite;
  }
  .pc-pulse-2 { animation-delay: 0.7s; }
  @keyframes pc-pulse {
    0% { opacity: 0.7; transform: scale(1); }
    100% { opacity: 0; transform: scale(1.5); }
  }
  .pc-ai-name { font-size: 18px; font-weight: 700; color: #fff; }
  .pc-ai-role { font-size: 13px; color: #7F77DD; margin-top: 2px; }
  .pc-call-timer {
    margin-left: auto;
    font-size: 15px;
    font-weight: 600;
    color: #1D9E75;
    font-variant-numeric: tabular-nums;
  }
  .pc-status-bar {
    background: #1A1456;
    padding: 8px 24px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .pc-status-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #1D9E75;
    animation: pc-blink 2s ease-in-out infinite;
  }
  @keyframes pc-blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
  .pc-status-text { font-size: 13px; color: #7F77DD; font-weight: 500; }
  .pc-messages {
    padding: 20px 24px;
    min-height: 220px;
    max-height: 300px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 12px;
    background: #FAFAFA;
  }
  .pc-messages::-webkit-scrollbar { width: 4px; }
  .pc-messages::-webkit-scrollbar-thumb { background: #E5E7EB; border-radius: 4px; }
  .pc-msg-ai { display: flex; gap: 10px; align-items: flex-end; }
  .pc-msg-icon {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: #EEEDFE;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .pc-bubble-ai {
    background: #fff;
    border: 0.5px solid #E5E7EB;
    color: #111827;
    padding: 12px 16px;
    border-radius: 16px 16px 16px 4px;
    font-size: 14px;
    line-height: 1.6;
    max-width: 80%;
  }
  .pc-msg-user { display: flex; justify-content: flex-end; }
  .pc-bubble-user {
    background: #534AB7;
    color: #fff;
    padding: 12px 16px;
    border-radius: 16px 16px 4px 16px;
    font-size: 14px;
    line-height: 1.6;
    max-width: 80%;
  }
  .pc-typing {
    display: flex;
    align-items: flex-end;
    gap: 10px;
  }
  .pc-typing-dots {
    display: flex;
    gap: 5px;
    align-items: center;
    background: #fff;
    border: 0.5px solid #E5E7EB;
    padding: 12px 16px;
    border-radius: 16px 16px 16px 4px;
  }
  .pc-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #9CA3AF;
    animation: pc-bounce 1.2s infinite;
  }
  .pc-dot:nth-child(2) { animation-delay: 0.2s; }
  .pc-dot:nth-child(3) { animation-delay: 0.4s; }
  @keyframes pc-bounce {
    0%,80%,100%{transform:translateY(0);opacity:0.4}
    40%{transform:translateY(-5px);opacity:1}
  }
  .pc-controls {
    background: #fff;
    border-top: 0.5px solid #E5E7EB;
    padding: 20px 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .pc-ctrl-btn {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    border: 0.5px solid #E5E7EB;
    background: #F9FAFB;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.15s;
  }
  .pc-ctrl-btn:hover { background: #F3F4F6; }
  .pc-ctrl-btn.active { background: #EEEDFE; border-color: #AFA9EC; }
  .pc-call-btn {
    width: 68px;
    height: 68px;
    border-radius: 50%;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.2s, transform 0.1s;
  }
  .pc-call-btn:active { transform: scale(0.95); }
  .pc-call-btn.start { background: #1D9E75; }
  .pc-call-btn.start:hover { background: #0F6E56; }
  .pc-call-btn.end { background: #E24B4A; }
  .pc-call-btn.end:hover { background: #A32D2D; }
  .pc-call-btn:disabled { opacity: 0.5; cursor: default; }
  .pc-label { font-size: 11px; color: #9CA3AF; text-align: center; margin-top: 5px; }
  .pc-footer {
    background: #FAFAFA;
    border-top: 0.5px solid #E5E7EB;
    padding: 12px 24px;
    text-align: center;
    font-size: 12px;
    color: #9CA3AF;
  }
`}</style>

      <div className="pc-wrap">
        <div className="pc-header">
          <div className="pc-avatar">
            {callActive && (
              <>
                <div className="pc-pulse" />
                <div className="pc-pulse pc-pulse-2" />
              </>
            )}
            <svg width="26" height="26" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="7" r="4" fill="#7F77DD" />
              <path d="M2 19c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="#7F77DD" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <div className="pc-ai-info">
            <div className="pc-ai-name">{aiName}</div>
            <div className="pc-ai-role">{aiRole}</div>
          </div>
          {callActive && (
            <div className="pc-call-timer">{formatTime(callDuration)}</div>
          )}
        </div>

        <div className="pc-status-bar">
          <div className="pc-status-dot" />
          <span className="pc-status-text">
            {callActive ? "Call in progress" : "Available now"}
          </span>
        </div>

        <div className="pc-messages">
          {messages.map((msg, i) =>
            msg.role === "user" ? (
              <div className="pc-msg-user" key={i}>
                <div className="pc-bubble-user">{msg.text}</div>
              </div>
            ) : (
              <div className="pc-msg-ai" key={i}>
                <div className="pc-msg-icon">
                  <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="5" r="3.5" fill="#7F77DD" />
                    <path d="M1 15c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="#7F77DD" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="pc-bubble-ai">{msg.text}</div>
              </div>
            )
          )}
          {callActive && (
            <div className="pc-typing">
              <div className="pc-msg-icon">
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="5" r="3.5" fill="#7F77DD" />
                  <path d="M1 15c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="#7F77DD" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <div className="pc-typing-dots">
                <div className="pc-dot" />
                <div className="pc-dot" />
                <div className="pc-dot" />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div className="pc-controls">
          <div>
            <div
              className={`pc-ctrl-btn ${muted ? "active" : ""}`}
              onClick={() => setMuted((v) => !v)}
              title={muted ? "Unmute" : "Mute"}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke={muted ? "#534AB7" : "#9CA3AF"} strokeWidth="2" strokeLinecap="round">
                <path d="M12 1a3 3 0 0 1 3 3v8a3 3 0 0 1-6 0V4a3 3 0 0 1 3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" />
                {muted && <line x1="3" y1="3" x2="21" y2="21" stroke="#E24B4A" />}
              </svg>
            </div>
            <div className="pc-label">{muted ? "Muted" : "Mute"}</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            {!callActive ? (
              <button className="pc-call-btn start" onClick={handleStart}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.5 12.08 19.79 19.79 0 0 1 1.41 3.4 2 2 0 0 1 3.4 1.21h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.16a16 16 0 0 0 6.93 6.93l1.32-1.32a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </button>
            ) : (
              <button className="pc-call-btn end" onClick={handleEnd} style={{ transform: "rotate(135deg)" }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.5 12.08 19.79 19.79 0 0 1 1.41 3.4 2 2 0 0 1 3.4 1.21h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.16a16 16 0 0 0 6.93 6.93l1.32-1.32a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </button>
            )}
            <div className="pc-label">{callActive ? "End call" : "Start call"}</div>
          </div>

          <div>
            <div
              className={`pc-ctrl-btn ${speaker ? "active" : ""}`}
              onClick={() => setSpeaker((v) => !v)}
              title="Speaker"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke={speaker ? "#534AB7" : "#9CA3AF"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                {speaker
                  ? <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                  : <line x1="23" y1="9" x2="17" y2="15" />
                }
              </svg>
            </div>
            <div className="pc-label">Speaker</div>
          </div>
        </div>

        <div className="pc-footer">
          English only · Powered by Speakly AI
        </div>
      </div>
    </>
  );
}

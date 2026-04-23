import { useState , Fragment} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from './AuthContext';

const path = import.meta.env.VITE_BACKEND_URI;

export default function SignUp() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",email: "",password: "",goal: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const {login} = useAuth();

  const goals = [
    { id: "work", label: "Work & career", icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
      </svg>
    )},
    { id: "travel", label: "Travel", icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    )},
    { id: "study", label: "Study abroad", icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    )},
    { id: "daily", label: "Daily life", icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    )},
  ];

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleStep1 = (e) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email) {
      setError("Please fill in all fields.");
      return;
    }
    if (!form.email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    setStep(2);
  };

  const handleStep2 = (e) => {
    e.preventDefault();
    setError("");
    if (!form.password) {
      setError("Please enter a password.");
      return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setStep(3);
  };

  const handleStep3 = async () => {
    const email = form.email;
    const name = form.name;
    const password = form.password;
    if (!form.goal) {
      setError("Please select your goal.");
      return;
    }
    setError("");
    setLoading(true);
    
    try {
    setLoading(true); // Assuming you have a loading state
    const res = await axios.post(`${path}/api/auth/signup`, {
        email,
        name,
        password
    });
    localStorage.setItem("token", res.data.token);
    login(); // Updates your Auth context/Header
    navigate("/dashboard");
    
} catch (error) {
    if (error.response && error.response.data) {
        setError(error.response.data.msg || "An error occurred");
    } else {
        setError("Connection failed. Please try again.");
    }
} finally {
    // This runs whether the request succeeded OR failed
    setLoading(false);
}
  };

  const strength = (() => {
    const p = form.password;
    if (!p) return 0;
    let s = 0;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  })();

  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strength];
  const strengthColor = ["", "#E24B4A", "#EF9F27", "#1D9E75", "#1D9E75"][strength];

  return (
    <>
      <style>{`
        .su-root {
          min-height: 100vh;
          display: flex;
          font-family: system-ui, -apple-system, sans-serif;
          background: #FAFAFA;
        }

        /* Left panel */
        .su-left {
          width: 42%;
          background: #0F0A2E;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 40px 48px;
          position: relative;
          overflow: hidden;
        }
        .su-left-pattern {
          position: absolute;
          inset: 0;
          background-image:
            radial-gradient(circle at 75% 15%, rgba(83,74,183,0.4) 0%, transparent 50%),
            radial-gradient(circle at 20% 85%, rgba(29,158,117,0.25) 0%, transparent 50%);
          pointer-events: none;
        }
        .su-left-dots {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 28px 28px;
          pointer-events: none;
        }
        .su-brand {
          display: flex;
          align-items: center;
          gap: 9px;
          position: relative;
          z-index: 1;
        }
        .su-brand-dot { width: 10px; height: 10px; border-radius: 50%; background: #7F77DD; }
        .su-brand-name { font-size: 20px; font-weight: 800; color: #fff; letter-spacing: -0.5px; }
        .su-left-content { position: relative; z-index: 1; }
        .su-left-title {
          font-size: 34px;
          font-weight: 900;
          color: #fff;
          line-height: 1.1;
          letter-spacing: -1px;
          margin-bottom: 16px;
        }
        .su-left-title span { color: #7F77DD; }
        .su-left-sub {
          font-size: 14px;
          color: #7F77DD;
          line-height: 1.7;
          margin-bottom: 36px;
        }

        /* Feature list */
        .su-features { display: flex; flex-direction: column; gap: 16px; }
        .su-feature {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }
        .su-feature-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: rgba(255,255,255,0.07);
          border: 0.5px solid rgba(255,255,255,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: #7F77DD;
        }
        .su-feature-title { font-size: 13px; font-weight: 600; color: #fff; margin-bottom: 2px; }
        .su-feature-desc { font-size: 12px; color: #7F77DD; line-height: 1.5; }
        .su-left-footer { position: relative; z-index: 1; font-size: 12px; color: rgba(255,255,255,0.2); }

        /* Right panel */
        .su-right {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 32px;
        }
        .su-form-box { width: 100%; max-width: 420px; }

        /* Progress steps */
        .su-progress {
          display: flex;
          align-items: center;
          gap: 0;
          margin-bottom: 32px;
        }
        .su-progress-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          flex: 1;
        }
        .su-progress-circle {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 700;
          transition: all 0.2s;
        }
        .su-progress-circle.done { background: #1D9E75; color: #fff; }
        .su-progress-circle.active { background: #534AB7; color: #fff; }
        .su-progress-circle.idle { background: #F3F4F6; color: #9CA3AF; border: 0.5px solid #E5E7EB; }
        .su-progress-label { font-size: 10px; color: #9CA3AF; font-weight: 500; white-space: nowrap; }
        .su-progress-label.active { color: #534AB7; font-weight: 600; }
        .su-progress-line {
          flex: 1;
          height: 1px;
          background: #E5E7EB;
          margin-bottom: 18px;
          margin-left: -4px;
          margin-right: -4px;
          transition: background 0.3s;
        }
        .su-progress-line.done { background: #1D9E75; }

        .su-form-title {
          font-size: 24px;
          font-weight: 800;
          color: #0F0A2E;
          letter-spacing: -0.5px;
          margin-bottom: 6px;
        }
        .su-form-sub {
          font-size: 14px;
          color: #6B7280;
          margin-bottom: 28px;
          line-height: 1.6;
        }
        .su-form-sub a {
          color: #534AB7;
          font-weight: 600;
          cursor: pointer;
          text-decoration: none;
        }
        .su-form-sub a:hover { text-decoration: underline; }

        /* Social */
        .su-socials {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-bottom: 20px;
        }
        .su-social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 11px 16px;
          border-radius: 10px;
          border: 0.5px solid #E5E7EB;
          background: #fff;
          font-size: 13px;
          font-weight: 500;
          color: #374151;
          cursor: pointer;
          transition: background 0.15s;
          font-family: inherit;
        }
        .su-social-btn:hover { background: #F9FAFB; }

        /* Divider */
        .su-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }
        .su-divider-line { flex: 1; height: 0.5px; background: #E5E7EB; }
        .su-divider-text { font-size: 12px; color: #9CA3AF; white-space: nowrap; }

        /* Fields */
        .su-field { margin-bottom: 14px; }
        .su-label { display: block; font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 6px; }
        .su-input-wrap { position: relative; }
        .su-input {
          width: 100%;
          padding: 11px 14px;
          border-radius: 10px;
          border: 0.5px solid #E5E7EB;
          background: #fff;
          font-size: 14px;
          color: #111827;
          outline: none;
          font-family: inherit;
          transition: border-color 0.15s, box-shadow 0.15s;
          box-sizing: border-box;
        }
        .su-input:focus { border-color: #534AB7; box-shadow: 0 0 0 3px rgba(83,74,183,0.1); }
        .su-input::placeholder { color: #9CA3AF; }
        .su-input.has-icon { padding-right: 44px; }
        .su-input-icon {
          position: absolute;
          right: 13px;
          top: 50%;
          transform: translateY(-50%);
          cursor: pointer;
          color: #9CA3AF;
          display: flex;
          align-items: center;
        }
        .su-input-icon:hover { color: #534AB7; }

        /* Strength bar */
        .su-strength {
          display: flex;
          gap: 4px;
          margin-top: 8px;
          align-items: center;
        }
        .su-strength-bar {
          flex: 1;
          height: 3px;
          border-radius: 3px;
          background: #F3F4F6;
          overflow: hidden;
        }
        .su-strength-fill {
          height: 100%;
          border-radius: 3px;
          transition: width 0.3s, background 0.3s;
        }
        .su-strength-label {
          font-size: 11px;
          font-weight: 600;
          min-width: 36px;
          text-align: right;
        }

        /* Goal grid */
        .su-goal-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-bottom: 20px;
        }
        .su-goal-card {
          border: 0.5px solid #E5E7EB;
          border-radius: 12px;
          padding: 16px 14px;
          cursor: pointer;
          background: #fff;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: border-color 0.15s, background 0.15s;
          font-size: 13px;
          font-weight: 500;
          color: #374151;
        }
        .su-goal-card:hover { border-color: #AFA9EC; background: #FBFAFF; }
        .su-goal-card.selected { border: 1.5px solid #534AB7; background: #EEEDFE; color: #3C3489; }
        .su-goal-icon {
          width: 34px;
          height: 34px;
          border-radius: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #F3F4F6;
          flex-shrink: 0;
          transition: background 0.15s;
        }
        .su-goal-card.selected .su-goal-icon { background: #EEEDFE; color: #534AB7; }

        /* Buttons */
        .su-submit {
          width: 100%;
          padding: 13px;
          border-radius: 10px;
          background: #534AB7;
          color: #fff;
          font-size: 15px;
          font-weight: 700;
          border: none;
          cursor: pointer;
          transition: background 0.15s, transform 0.1s;
          font-family: inherit;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-bottom: 12px;
        }
        .su-submit:hover:not(:disabled) { background: #3C3489; }
        .su-submit:active:not(:disabled) { transform: scale(0.99); }
        .su-submit:disabled { opacity: 0.7; cursor: not-allowed; }
        .su-back {
          width: 100%;
          padding: 11px;
          border-radius: 10px;
          background: transparent;
          color: #6B7280;
          font-size: 14px;
          font-weight: 500;
          border: 0.5px solid #E5E7EB;
          cursor: pointer;
          font-family: inherit;
          transition: background 0.15s;
          margin-bottom: 16px;
        }
        .su-back:hover { background: #F9FAFB; }

        /* Spinner */
        .su-spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: su-spin 0.7s linear infinite;
        }
        @keyframes su-spin { to { transform: rotate(360deg); } }

        /* Error */
        .su-error {
          background: #FCEBEB;
          border: 0.5px solid #F09595;
          color: #791F1F;
          font-size: 13px;
          padding: 10px 14px;
          border-radius: 9px;
          margin-bottom: 14px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        /* Terms */
        .su-terms {
          font-size: 12px;
          color: #9CA3AF;
          text-align: center;
          line-height: 1.6;
        }
        .su-terms a { color: #534AB7; cursor: pointer; text-decoration: none; }
        .su-terms a:hover { text-decoration: underline; }

        /* Success */
        .su-success-icon {
          width: 64px; height: 64px;
          border-radius: 50%;
          background: #E1F5EE;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
        }

        @media (max-width: 768px) {
          .su-left { display: none; }
          .su-right { padding: 32px 20px; }
        }
      `}</style>

      <div className="su-root">

        {/* Left panel */}
        <div className="su-left">
          <div className="su-left-pattern" />
          <div className="su-left-dots" />

          <div className="su-brand">
            <div className="su-brand-dot" />
            <span className="su-brand-name">Speakly</span>
          </div>

          <div className="su-left-content">
            <div className="su-left-title">
              Start your<br />
              <span>English journey</span><br />
              today
            </div>
            <p className="su-left-sub">
              Everything you need to go from hesitant to fluent — all in one place.
            </p>

            <div className="su-features">
              {[
                {
                  icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 1a3 3 0 0 1 3 3v8a3 3 0 0 1-6 0V4a3 3 0 0 1 3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/></svg>,
                  title: "Real voice conversations",
                  desc: "Talk with Aria anytime — no scheduling, no awkward silences.",
                },
                {
                  icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
                  title: "Smart grammar feedback",
                  desc: "Get corrections after each session with clear explanations.",
                },
                {
                  icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>,
                  title: "Track your progress",
                  desc: "Watch your fluency score grow week over week.",
                },
              ].map((f) => (
                <div className="su-feature" key={f.title}>
                  <div className="su-feature-icon">{f.icon}</div>
                  <div>
                    <div className="su-feature-title">{f.title}</div>
                    <div className="su-feature-desc">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="su-left-footer">© 2026 Speakly. All rights reserved.</div>
        </div>

        {/* Right form panel */}
        <div className="su-right">
          <div className="su-form-box">

            {/* Progress indicator */}
            {/* <div className="su-progress">
              {["Account", "Password", "Goal"].map((label, i) => {
                const n = i + 1;
                const isDone = step > n;
                const isActive = step === n;
                return (
                  <>
                    <div className="su-progress-step" key={label}>
                      <div className={`su-progress-circle ${isDone ? "done" : isActive ? "active" : "idle"}`}>
                        {isDone ? (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        ) : n}
                      </div>
                      <span className={`su-progress-label ${isActive ? "active" : ""}`}>{label}</span>
                    </div>
                    {i < 2 && (
                      <div className={`su-progress-line ${step > n ? "done" : ""}`} key={`line-${i}`} />
                    )}
                  </>
                );
              })}
            </div> */}
            <div className="su-progress">
  {["Account", "Password", "Goal"].map((label, i) => {
    const n = i + 1;
    const isDone = step > n;
    const isActive = step === n;
    
    // 2. Attach the key to the Fragment itself
    return (
      <Fragment key={label}> 
        <div className="su-progress-step">
          <div className={`su-progress-circle ${isDone ? "done" : isActive ? "active" : "idle"}`}>
            {isDone ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : n}
          </div>
          <span className={`su-progress-label ${isActive ? "active" : ""}`}>{label}</span>
        </div>
        
        {i < 2 && (
          <div className={`su-progress-line ${step > n ? "done" : ""}`} />
        )}
      </Fragment>
    );
  })}
            </div>

            {/* ── Step 1: Account details ── */}
            {step === 1 && (
              <>
                <div className="su-form-title">Create your account</div>
                <p className="su-form-sub">
                  Already have one? <a onClick={() => navigate("/signin")}>Sign in</a>
                </p>

                <div className="su-socials">
                  <button className="su-social-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    Google
                  </button>
                  <button className="su-social-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#1877F2">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Facebook
                  </button>
                </div>

                <div className="su-divider">
                  <div className="su-divider-line" />
                  <span className="su-divider-text">or sign up with email</span>
                  <div className="su-divider-line" />
                </div>

                <form onSubmit={handleStep1}>
                  {error && (
                    <div className="su-error">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A32D2D" strokeWidth="2" strokeLinecap="round">
                        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                      </svg>
                      {error}
                    </div>
                  )}
                  <div className="su-field">
                    <label className="su-label">Full name</label>
                    <input className="su-input" type="text" placeholder="Your name"
                      value={form.name} onChange={(e) => update("name", e.target.value)} autoComplete="name" />
                  </div>
                  <div className="su-field">
                    <label className="su-label">Email address</label>
                    <input className="su-input" type="email" placeholder="you@example.com"
                      value={form.email} onChange={(e) => update("email", e.target.value)} autoComplete="email" />
                  </div>
                  <button className="su-submit" type="submit">
                    Continue
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </button>
                  <div className="su-terms">
                    By continuing, you agree to our <a>Terms</a> and <a>Privacy Policy</a>.
                  </div>
                </form>
              </>
            )}

            {/* ── Step 2: Password ── */}
            {step === 2 && (
              <>
                <div className="su-form-title">Set your password</div>
                <p className="su-form-sub">Make it strong — you'll use it every time you sign in.</p>

                <form onSubmit={handleStep2}>
                  {error && (
                    <div className="su-error">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A32D2D" strokeWidth="2" strokeLinecap="round">
                        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                      </svg>
                      {error}
                    </div>
                  )}
                  <div className="su-field">
                    <label className="su-label">Password</label>
                    <div className="su-input-wrap">
                      <input
                        className="su-input has-icon"
                        type={showPass ? "text" : "password"}
                        placeholder="At least 8 characters"
                        value={form.password}
                        onChange={(e) => update("password", e.target.value)}
                        autoComplete="new-password"
                      />
                      <div className="su-input-icon" onClick={() => setShowPass((v) => !v)}>
                        {showPass ? (
                          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                            <line x1="1" y1="1" x2="23" y2="23"/>
                          </svg>
                        ) : (
                          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                            <circle cx="12" cy="12" r="3"/>
                          </svg>
                        )}
                      </div>
                    </div>

                    {form.password.length > 0 && (
                      <div className="su-strength">
                        {[1, 2, 3, 4].map((i) => (
                          <div className="su-strength-bar" key={i}>
                            <div className="su-strength-fill" style={{
                              width: strength >= i ? "100%" : "0%",
                              background: strengthColor,
                            }} />
                          </div>
                        ))}
                        <span className="su-strength-label" style={{ color: strengthColor }}>
                          {strengthLabel}
                        </span>
                      </div>
                    )}
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    {[
                      ["At least 8 characters", form.password.length >= 8],
                      ["One uppercase letter", /[A-Z]/.test(form.password)],
                      ["One number", /[0-9]/.test(form.password)],
                    ].map(([label, met]) => (
                      <div key={label} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                        <div style={{
                          width: 16, height: 16, borderRadius: "50%",
                          background: met ? "#E1F5EE" : "#F3F4F6",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          flexShrink: 0, transition: "background 0.2s",
                        }}>
                          <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
                            <path d="M2 6l3 3 5-5" stroke={met ? "#0F6E56" : "#D1D5DB"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <span style={{ fontSize: 12, color: met ? "#374151" : "#9CA3AF" }}>{label}</span>
                      </div>
                    ))}
                  </div>

                  <button className="su-submit" type="submit">
                    Continue
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </button>
                  <button className="su-back" type="button" onClick={() => { setStep(1); setError(""); }}>
                    ← Go back
                  </button>
                </form>
              </>
            )}

            {/* ── Step 3: Goal ── */}
            {step === 3 && (
              <>
                <div className="su-form-title">What's your goal?</div>
                <p className="su-form-sub">Help Aria personalise your conversations from day one.</p>

                {error && (
                  <div className="su-error">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A32D2D" strokeWidth="2" strokeLinecap="round">
                      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                    {error}
                  </div>
                )}

                <div className="su-goal-grid">
                  {goals.map((g) => (
                    <div
                      key={g.id}
                      className={`su-goal-card ${form.goal === g.id ? "selected" : ""}`}
                      onClick={() => update("goal", g.id)}
                    >
                      <div className="su-goal-icon">{g.icon}</div>
                      {g.label}
                    </div>
                  ))}
                </div>

                <button className="su-submit" onClick={handleStep3} disabled={loading}>
                  {loading ? (
                    <>
                      <div className="su-spinner" />
                      Creating account...
                    </>
                  ) : (
                    <>
                      Create my account
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                      </svg>
                    </>
                  )}
                </button>
                <button className="su-back" onClick={() => { setStep(2); setError(""); }}>
                  ← Go back
                </button>
                <div className="su-terms">
                  By creating an account, you agree to our <a>Terms</a> and <a>Privacy Policy</a>.
                </div>
              </>
            )}

          </div>
        </div>

      </div>
    </>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from './AuthContext';
import dotenv from "dotenv";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    const res = await axios.post(`${process.env.VITE_BACKEND_URI}/api/auth/signin`, {
       email,
       password,
    });
    setLoading(false);
    localStorage.setItem("token", res.data.token);
    const success = true; 
    if (success) {
      login(); // This updates the Header state instantly!
    }
    navigate("/dashboard");
  };

  return (
    <>
      <style>{`
        .si-root {
          min-height: 100vh;
          display: flex;
          font-family: system-ui, -apple-system, sans-serif;
          background: #FAFAFA;
        }

        /* Left panel */
        .si-left {
          width: 45%;
          background: #0F0A2E;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 40px 48px;
          position: relative;
          overflow: hidden;
        }
        .si-left-pattern {
          position: absolute;
          inset: 0;
          background-image:
            radial-gradient(circle at 20% 20%, rgba(83,74,183,0.35) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(29,158,117,0.2) 0%, transparent 50%);
          pointer-events: none;
        }
        .si-left-dots {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 28px 28px;
          pointer-events: none;
        }
        .si-brand {
          display: flex;
          align-items: center;
          gap: 9px;
          position: relative;
          z-index: 1;
        }
        .si-brand-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #7F77DD;
        }
        .si-brand-name {
          font-size: 20px;
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.5px;
        }
        .si-left-content {
          position: relative;
          z-index: 1;
        }
        .si-left-title {
          font-size: 36px;
          font-weight: 900;
          color: #fff;
          line-height: 1.1;
          letter-spacing: -1px;
          margin-bottom: 16px;
        }
        .si-left-title span { color: #7F77DD; }
        .si-left-sub {
          font-size: 15px;
          color: #7F77DD;
          line-height: 1.7;
          margin-bottom: 36px;
          max-width: 320px;
        }
        .si-testimonial {
          background: rgba(255,255,255,0.05);
          border: 0.5px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 20px 22px;
          max-width: 340px;
        }
        .si-testimonial-quote {
          font-size: 13px;
          color: rgba(255,255,255,0.8);
          line-height: 1.7;
          margin-bottom: 14px;
        }
        .si-testimonial-author {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .si-testimonial-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #EEEDFE;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 700;
          color: #534AB7;
          flex-shrink: 0;
        }
        .si-testimonial-name {
          font-size: 13px;
          font-weight: 600;
          color: #fff;
        }
        .si-testimonial-loc {
          font-size: 11px;
          color: #7F77DD;
        }
        .si-left-footer {
          position: relative;
          z-index: 1;
          font-size: 12px;
          color: rgba(255,255,255,0.2);
        }

        /* Stats row */
        .si-stats {
          display: flex;
          gap: 28px;
          margin-bottom: 32px;
        }
        .si-stat-val {
          font-size: 22px;
          font-weight: 900;
          color: #fff;
          letter-spacing: -0.5px;
        }
        .si-stat-lbl {
          font-size: 11px;
          color: #7F77DD;
          margin-top: 2px;
        }

        /* Right panel */
        .si-right {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 32px;
        }
        .si-form-box {
          width: 100%;
          max-width: 400px;
        }
        .si-form-title {
          font-size: 26px;
          font-weight: 800;
          color: #0F0A2E;
          letter-spacing: -0.6px;
          margin-bottom: 6px;
        }
        .si-form-sub {
          font-size: 14px;
          color: #6B7280;
          margin-bottom: 32px;
          line-height: 1.6;
        }
        .si-form-sub a {
          color: #534AB7;
          font-weight: 600;
          cursor: pointer;
          text-decoration: none;
        }
        .si-form-sub a:hover { text-decoration: underline; }

        /* Social buttons */
        .si-socials {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-bottom: 24px;
        }
        .si-social-btn {
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
          transition: background 0.15s, border-color 0.15s;
          font-family: inherit;
        }
        .si-social-btn:hover {
          background: #F9FAFB;
          border-color: #D1D5DB;
        }

        /* Divider */
        .si-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
        }
        .si-divider-line {
          flex: 1;
          height: 0.5px;
          background: #E5E7EB;
        }
        .si-divider-text {
          font-size: 12px;
          color: #9CA3AF;
          white-space: nowrap;
        }

        /* Form fields */
        .si-field {
          margin-bottom: 16px;
        }
        .si-label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: #374151;
          margin-bottom: 6px;
        }
        .si-input-wrap {
          position: relative;
        }
        .si-input {
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
        .si-input:focus {
          border-color: #534AB7;
          box-shadow: 0 0 0 3px rgba(83,74,183,0.1);
        }
        .si-input::placeholder { color: #9CA3AF; }
        .si-input.has-icon { padding-right: 44px; }
        .si-input-icon {
          position: absolute;
          right: 13px;
          top: 50%;
          transform: translateY(-50%);
          cursor: pointer;
          color: #9CA3AF;
          display: flex;
          align-items: center;
        }
        .si-input-icon:hover { color: #534AB7; }

        /* Forgot password */
        .si-forgot {
          display: flex;
          justify-content: flex-end;
          margin-top: -8px;
          margin-bottom: 20px;
        }
        .si-forgot a {
          font-size: 12px;
          color: #534AB7;
          cursor: pointer;
          text-decoration: none;
          font-weight: 500;
        }
        .si-forgot a:hover { text-decoration: underline; }

        /* Submit button */
        .si-submit {
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
          margin-bottom: 20px;
        }
        .si-submit:hover:not(:disabled) { background: #3C3489; }
        .si-submit:active:not(:disabled) { transform: scale(0.99); }
        .si-submit:disabled { opacity: 0.7; cursor: not-allowed; }

        /* Spinner */
        .si-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: si-spin 0.7s linear infinite;
        }
        @keyframes si-spin { to { transform: rotate(360deg); } }

        /* Error */
        .si-error {
          background: #FCEBEB;
          border: 0.5px solid #F09595;
          color: #791F1F;
          font-size: 13px;
          padding: 10px 14px;
          border-radius: 9px;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        /* Terms */
        .si-terms {
          font-size: 12px;
          color: #9CA3AF;
          text-align: center;
          line-height: 1.6;
        }
        .si-terms a {
          color: #534AB7;
          cursor: pointer;
          text-decoration: none;
        }
        .si-terms a:hover { text-decoration: underline; }

        @media (max-width: 768px) {
          .si-left { display: none; }
          .si-right { padding: 32px 20px; }
        }
      `}</style>

      <div className="si-root">

        {/* Left decorative panel */}
        <div className="si-left">
          <div className="si-left-pattern" />
          <div className="si-left-dots" />

          <div className="si-brand">
            <div className="si-brand-dot" />
            <span className="si-brand-name">Speakly</span>
          </div>

          <div className="si-left-content">
            <div className="si-left-title">
              Speak English<br />
              with <span>confidence</span>
            </div>
            <p className="si-left-sub">
              Join thousands of learners having real AI conversations to build fluency faster than any app or textbook.
            </p>

            <div className="si-stats">
              {[["200+", "Active learners"], ["4.9★", "User rating"], ["98%", "Uptime"]].map(([v, l]) => (
                <div key={l}>
                  <div className="si-stat-val">{v}</div>
                  <div className="si-stat-lbl">{l}</div>
                </div>
              ))}
            </div>

            <div className="si-testimonial">
              <div className="si-testimonial-quote">
                "After just two weeks with Speakly, I gave a full presentation in English at work. It completely changed my confidence."
              </div>
              <div className="si-testimonial-author">
                <div className="si-testimonial-avatar">RK</div>
                <div>
                  <div className="si-testimonial-name">Rahul K.</div>
                  <div className="si-testimonial-loc">Software engineer, India</div>
                </div>
              </div>
            </div>
          </div>

          <div className="si-left-footer">© 2026 Speakly. All rights reserved.</div>
        </div>

        {/* Right form panel */}
        <div className="si-right">
          <div className="si-form-box">
            <div className="si-form-title">Welcome back</div>
            <p className="si-form-sub">
              Don't have an account?{" "}
              <a onClick={()=>navigate("/signup")}>Sign up for free</a>
            </p>

            {/* Social login */}
            <div className="si-socials">
              <button className="si-social-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Google
              </button>
              <button className="si-social-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </button>
            </div>

            <div className="si-divider">
              <div className="si-divider-line" />
              <span className="si-divider-text">or sign in with email</span>
              <div className="si-divider-line" />
            </div>

            <form onSubmit={handleSubmit}>
              {error && (
                <div className="si-error">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A32D2D" strokeWidth="2" strokeLinecap="round">
                    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  {error}
                </div>
              )}

              <div className="si-field">
                <label className="si-label">Email address</label>
                <div className="si-input-wrap">
                  <input
                    className="si-input"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="si-field">
                <label className="si-label">Password</label>
                <div className="si-input-wrap">
                  <input
                    className={`si-input has-icon`}
                    type={showPass ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                  />
                  <div className="si-input-icon" onClick={() => setShowPass((v) => !v)}>
                    {showPass ? (
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </div>
                </div>
              </div>

              <div className="si-forgot">
                <a>Forgot password?</a>
              </div>

              <button className="si-submit" type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <div className="si-spinner" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                    </svg>
                  </>
                )}
              </button>

              <div className="si-terms">
                By signing in, you agree to our{" "}
                <a>Terms of Service</a> and <a>Privacy Policy</a>.
              </div>
            </form>
          </div>
        </div>

      </div>
    </>
  );
}

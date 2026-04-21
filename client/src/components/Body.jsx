import PhoneCard from "./PhoneCard";

const CheckIcon = () => (
  <div style={{
    width: 18, height: 18, borderRadius: "50%",
    background: "#E1F5EE", display: "flex",
    alignItems: "center", justifyContent: "center", flexShrink: 0,
  }}>
    <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
      <path d="M2 6l3 3 5-5" stroke="#0F6E56" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

const features = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#534AB7" strokeWidth="2" strokeLinecap="round">
        <path d="M12 1a3 3 0 0 1 3 3v8a3 3 0 0 1-6 0V4a3 3 0 0 1 3-3z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" />
      </svg>
    ),
    bg: "#EEEDFE",
    title: "Live voice calls",
    desc: "Speak naturally with Aria, your AI partner who responds in real time — like a real conversation.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0F6E56" strokeWidth="2" strokeLinecap="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    bg: "#E1F5EE",
    title: "Instant feedback",
    desc: "Get grammar corrections and vocabulary tips right after each session, not days later.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#854F0B" strokeWidth="2" strokeLinecap="round">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    bg: "#FAEEDA",
    title: "Any time, any topic",
    desc: "Travel, work, small talk, interviews — pick a topic or go free-form. Aria adapts to you.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#993C1D" strokeWidth="2" strokeLinecap="round">
        <path d="M18 20V10M12 20V4M6 20v-6" />
      </svg>
    ),
    bg: "#FAECE7",
    title: "Progress tracking",
    desc: "Watch your fluency score rise over time with weekly reports and streak milestones.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#534AB7" strokeWidth="2" strokeLinecap="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    bg: "#EEEDFE",
    title: "Zero judgment",
    desc: "Make mistakes freely. Aria is patient, encouraging, and available 24 hours a day.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0F6E56" strokeWidth="2" strokeLinecap="round">
        <rect x="5" y="2" width="14" height="20" rx="2" /><line x1="12" y1="18" x2="12" y2="18" />
      </svg>
    ),
    bg: "#E1F5EE",
    title: "Works on any device",
    desc: "Browser-based — no app download needed. Open and talk from your phone or laptop instantly.",
  },
];

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "/ month",
    desc: "Perfect for getting started.",
    features: ["5 calls per month", "Basic session feedback", "2 topics available"],
    cta: "Get started free",
    featured: false,
  },
  {
    name: "Pro",
    price: "$9",
    period: "/ month",
    desc: "For serious learners who want to improve fast.",
    features: ["Unlimited calls", "Deep grammar feedback", "All topics + custom", "Weekly progress report"],
    cta: "Start 7-day free trial",
    featured: true,
  },
];

const testimonials = [
  {
    quote: "I was embarrassed to speak English at work. After two weeks with Speakly, I gave a presentation to my team. It actually works.",
    name: "Rahul K.",
    loc: "Software engineer, India",
    initials: "RK",
    avatarBg: "#EEEDFE",
    avatarColor: "#534AB7",
  },
  {
    quote: "I practice every morning for 10 minutes. My confidence has gone up a lot. Aria is so patient compared to real tutors.",
    name: "María L.",
    loc: "Student, Mexico",
    initials: "ML",
    avatarBg: "#E1F5EE",
    avatarColor: "#085041",
  },
  {
    quote: "Much better than apps where you just tap words. This is real speaking practice and the feedback is actually useful.",
    name: "Yuki T.",
    loc: "Marketing manager, Japan",
    initials: "YT",
    avatarBg: "#FAEEDA",
    avatarColor: "#633806",
  },
];

export default function Body() {
  return (
    <>
      <style>{`
        .sp-body { font-family: system-ui, -apple-system, sans-serif; color: #111827; }
        .sp-section { padding: 72px 40px; }
        .sp-section-label {
          font-size: 11px; font-weight: 700; color: #534AB7;
          letter-spacing: 1.5px; text-transform: uppercase;
          margin-bottom: 12px; text-align: center;
        }
        .sp-section-title {
          font-size: 32px; font-weight: 800; color: #0F0A2E;
          letter-spacing: -0.8px; margin-bottom: 12px; text-align: center;
        }
        .sp-section-sub {
          font-size: 15px; color: #6B7280; max-width: 440px;
          margin: 0 auto 48px; line-height: 1.7; text-align: center;
        }
        .sp-divider { height: 0.5px; background: #F3F4F6; margin: 0 40px; }
        .sp-badge {
          display: inline-flex; align-items: center; gap: 6px;
          background: #EEEDFE; color: #3C3489;
          font-size: 12px; font-weight: 600;
          padding: 5px 14px; border-radius: 20px; margin-bottom: 22px;
        }
        .sp-badge-dot { width: 7px; height: 7px; border-radius: 50%; background: #534AB7; }
        .sp-btn-primary {
          background: #534AB7; color: #fff; font-size: 15px;
          font-weight: 600; padding: 13px 28px; border-radius: 10px;
          cursor: pointer; border: none;
          transition: background 0.15s, transform 0.1s;
        }
        .sp-btn-primary:hover { background: #3C3489; }
        .sp-btn-primary:active { transform: scale(0.98); }
        .sp-btn-outline {
          background: #fff; color: #374151; font-size: 15px;
          font-weight: 500; padding: 13px 24px; border-radius: 10px;
          cursor: pointer; border: 0.5px solid #D1D5DB;
          display: flex; align-items: center; gap: 7px;
          transition: background 0.15s;
        }
        .sp-btn-outline:hover { background: #F9FAFB; }

        /* Hero */
        .sp-hero {
          background: #FAFAFA;
          border-bottom: 0.5px solid #E5E7EB;
          padding: 80px 40px 72px;
          text-align: center;
        }
        .sp-hero h1 {
          font-size: 52px; font-weight: 900; line-height: 1.08;
          color: #0F0A2E; letter-spacing: -2px;
          max-width: 580px; margin: 0 auto 20px;
        }
        .sp-hero h1 span { color: #534AB7; }
        .sp-hero-sub {
          font-size: 17px; color: #6B7280;
          line-height: 1.7; max-width: 420px;
          margin: 0 auto 36px;
        }
        .sp-hero-btns {
          display: flex; align-items: center;
          justify-content: center; gap: 12px;
          flex-wrap: wrap; margin-bottom: 20px;
        }
        .sp-hero-trust {
          display: flex; align-items: center;
          justify-content: center; gap: 8px;
          font-size: 13px; color: #9CA3AF;
          flex-wrap: wrap;
        }
        .sp-stars { color: #F59E0B; letter-spacing: 1px; }
        .sp-trust-sep { color: #E5E7EB; }

        /* Features */
        .sp-features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 16px; max-width: 800px; margin: 0 auto;
        }
        .sp-feat-card {
          background: #FAFAFA; border: 0.5px solid #E5E7EB;
          border-radius: 16px; padding: 22px; text-align: left;
          transition: border-color 0.15s;
        }
        .sp-feat-card:hover { border-color: #AFA9EC; }
        .sp-feat-icon {
          width: 40px; height: 40px; border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 16px;
        }
        .sp-feat-title { font-size: 14px; font-weight: 700; color: #111827; margin-bottom: 7px; }
        .sp-feat-desc { font-size: 13px; color: #6B7280; line-height: 1.65; }

        /* How it works */
        .sp-steps {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px; max-width: 800px; margin: 0 auto;
        }
        .sp-step {
          background: #fff; border: 0.5px solid #E5E7EB;
          border-radius: 16px; padding: 24px; text-align: left;
        }
        .sp-step-num {
          width: 32px; height: 32px; border-radius: 50%;
          background: #534AB7; color: #fff; font-size: 14px;
          font-weight: 800; display: flex; align-items: center;
          justify-content: center; margin-bottom: 16px;
        }
        .sp-step-title { font-size: 15px; font-weight: 700; color: #111827; margin-bottom: 8px; }
        .sp-step-desc { font-size: 13px; color: #6B7280; line-height: 1.65; }

        /* Pricing */
        .sp-pricing-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 16px; max-width: 560px; margin: 0 auto;
        }
        .sp-plan {
          background: #fff; border: 0.5px solid #E5E7EB;
          border-radius: 18px; padding: 28px; text-align: left;
        }
        .sp-plan.featured { border: 1.5px solid #534AB7; background: #FBFAFF; }
        .sp-plan-badge {
          display: inline-block; font-size: 10px; font-weight: 700;
          background: #EEEDFE; color: #3C3489;
          padding: 3px 10px; border-radius: 20px; margin-bottom: 14px;
        }
        .sp-plan-name { font-size: 15px; font-weight: 700; color: #111827; margin-bottom: 4px; }
        .sp-plan-price { font-size: 36px; font-weight: 900; color: #0F0A2E; letter-spacing: -1.5px; }
        .sp-plan-period { font-size: 13px; font-weight: 400; color: #9CA3AF; }
        .sp-plan-desc { font-size: 13px; color: #6B7280; margin: 10px 0 18px; line-height: 1.5; }
        .sp-plan-feature {
          display: flex; align-items: center; gap: 9px;
          font-size: 13px; color: #374151; margin-bottom: 10px;
        }
        .sp-plan-btn {
          width: 100%; padding: 11px; border-radius: 9px;
          font-size: 14px; font-weight: 600; cursor: pointer;
          border: none; margin-top: 10px;
          transition: opacity 0.15s, transform 0.1s;
        }
        .sp-plan-btn:hover { opacity: 0.88; }
        .sp-plan-btn:active { transform: scale(0.98); }

        /* Testimonials */
        .sp-testi-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
          gap: 14px; max-width: 800px; margin: 0 auto;
        }
        .sp-testi {
          background: #fff; border: 0.5px solid #E5E7EB;
          border-radius: 16px; padding: 20px;
        }
        .sp-testi-stars { color: #F59E0B; font-size: 13px; margin-bottom: 12px; letter-spacing: 1px; }
        .sp-testi-quote { font-size: 13px; color: #374151; line-height: 1.7; margin-bottom: 14px; }
        .sp-testi-author { display: flex; align-items: center; gap: 10px; }
        .sp-testi-avatar {
          width: 32px; height: 32px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 700; flex-shrink: 0;
        }
        .sp-testi-name { font-size: 13px; font-weight: 600; color: #111827; }
        .sp-testi-loc { font-size: 11px; color: #9CA3AF; }

        /* CTA */
        .sp-cta {
          background: #0F0A2E;
          padding: 80px 40px;
          text-align: center;
        }
        .sp-cta h2 { font-size: 36px; font-weight: 900; color: #fff; letter-spacing: -1px; margin-bottom: 14px; }
        .sp-cta p { font-size: 15px; color: #7F77DD; margin-bottom: 32px; line-height: 1.7; }
        .sp-cta-row { display: flex; gap: 8px; max-width: 380px; margin: 0 auto 14px; }
        .sp-cta-input {
          flex: 1; padding: 12px 16px; border-radius: 9px;
          border: 0.5px solid #3C3489; background: #1A1456;
          color: #fff; font-size: 14px; outline: none;
          font-family: inherit;
        }
        .sp-cta-input::placeholder { color: #534AB7; }
        .sp-cta-btn {
          background: #534AB7; color: #fff; padding: 12px 22px;
          border-radius: 9px; border: none; font-size: 14px;
          font-weight: 600; cursor: pointer; white-space: nowrap;
          transition: background 0.15s;
        }
        .sp-cta-btn:hover { background: #7F77DD; }
        .sp-cta-note { font-size: 11px; color: #534AB7; }

        /* Phone mock positioning in hero */
        .sp-hero-phone { margin: 52px auto 0; display: flex; justify-content: center; }

        @media (max-width: 768px) {
          .sp-hero h1 { font-size: 34px; letter-spacing: -1px; }
          .sp-section { padding: 52px 20px; }
          .sp-hero { padding: 56px 20px 52px; }
          .sp-cta { padding: 56px 20px; }
          .sp-divider { margin: 0 20px; }
          .sp-cta-row { flex-direction: column; }
        }
      `}</style>

      <div className="sp-body">

        {/* ── Hero ── */}
        <section className="sp-hero">
          <div className="sp-badge">
            <div className="sp-badge-dot" />
            Now in early access
          </div>
          <h1>Practice English with your <span>AI partner</span> anytime</h1>
          <p className="sp-hero-sub">
            Real conversations. Instant feedback. No judgment. Build English fluency by speaking — not just studying.
          </p>
          <div className="sp-hero-btns">
            <button className="sp-btn-primary">Start talking for free</button>
            <button className="sp-btn-outline">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              Watch demo
            </button>
          </div>
          <div className="sp-hero-trust">
            <span className="sp-stars">★★★★★</span>
            <span>4.3 / 5 from 200+ early users</span>
            <span className="sp-trust-sep">·</span>
          </div>
          
        
            <div className="sp-hero-phone">
            <PhoneCard />
          </div>
          
          
        </section>
        
        {/* ── How it works ── */}
        <section className="sp-section" style={{ background: "#FAFAFA" }}>
          <div className="sp-section-label">How it works</div>
          <div className="sp-section-title">Up and talking in 10 seconds</div>
          <div className="sp-section-sub">
            No setup. No downloads. Just open Speakly and start your first call.
          </div>
          <div className="sp-steps">
            {[
              { n: "1", title: "Create your free account", desc: "Sign up with your email. No credit card, no trial period tricks." },
              { n: "2", title: "Choose a topic or go free", desc: "Pick a conversation theme or just start talking. Aria figures out the rest." },
              { n: "3", title: "Make a Call to your AI friend", desc: "After making a call, Aria is waiting for your greetings."},
              { n: "4", title: "Talk, get feedback, improve", desc: "After each call you get a session summary with tips to sharpen your English." },
            ].map((s) => (
              <div className="sp-step" key={s.n}>
                <div className="sp-step-num">{s.n}</div>
                <div className="sp-step-title">{s.title}</div>
                <div className="sp-step-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <div className="sp-divider" />

        {/* ── Features ── */}
        <section className="sp-section" style={{ background: "#fff" }}>
          <div className="sp-section-label">Features</div>
          <div className="sp-section-title">Everything you need to speak with confidence</div>
          <div className="sp-section-sub">
            Speakly combines voice AI with smart feedback to help you improve faster than any textbook.
          </div>
          <div className="sp-features-grid">
            {features.map((f) => (
              <div className="sp-feat-card" key={f.title}>
                <div className="sp-feat-icon" style={{ background: f.bg }}>{f.icon}</div>
                <div className="sp-feat-title">{f.title}</div>
                <div className="sp-feat-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <div className="sp-divider" />


        {/* ── Pricing ── */}
        <section className="sp-section" style={{ background: "#fff" }}>
          <div className="sp-section-label">Pricing</div>
          <div className="sp-section-title">Simple, honest pricing</div>
          <div className="sp-section-sub">Start free. Upgrade when you're ready.</div>
          <div className="sp-pricing-grid">
            {plans.map((plan) => (
              <div className={`sp-plan ${plan.featured ? "featured" : ""}`} key={plan.name}>
                {plan.featured && <div className="sp-plan-badge">Most popular</div>}
                <div className="sp-plan-name">{plan.name}</div>
                <div>
                  <span className="sp-plan-price">{plan.price}</span>
                  <span className="sp-plan-period"> {plan.period}</span>
                </div>
                <div className="sp-plan-desc">{plan.desc}</div>
                {plan.features.map((f) => (
                  <div className="sp-plan-feature" key={f}>
                    <CheckIcon />
                    {f}
                  </div>
                ))}
                <button
                  className="sp-plan-btn"
                  style={{
                    background: plan.featured ? "#534AB7" : "#F3F4F6",
                    color: plan.featured ? "#fff" : "#374151",
                  }}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* ── Testimonials ── */}
        <section className="sp-section" style={{ background: "#FAFAFA", borderTop: "0.5px solid #E5E7EB", borderBottom: "0.5px solid #E5E7EB" }}>
          <div className="sp-section-label">Testimonials</div>
          <div className="sp-section-title">What early users are saying</div>
          <div className="sp-testi-grid" style={{ marginTop: 40 }}>
            {testimonials.map((t) => (
              <div className="sp-testi" key={t.name}>
                <div className="sp-testi-stars">★★★★★</div>
                <div className="sp-testi-quote">"{t.quote}"</div>
                <div className="sp-testi-author">
                  <div className="sp-testi-avatar" style={{ background: t.avatarBg, color: t.avatarColor }}>
                    {t.initials}
                  </div>
                  <div>
                    <div className="sp-testi-name">{t.name}</div>
                    <div className="sp-testi-loc">{t.loc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="sp-cta">
          <h2>Start speaking today.</h2>
          <p>
            Join 200+ learners already practicing with Aria.<br />
            Free forever. No credit card needed.
          </p>
          <div className="sp-cta-row">
            <input className="sp-cta-input" type="email" placeholder="your feedback" />
            <button className="sp-cta-btn">Submit Feedback</button>
          </div>
          <div className="sp-cta-note">Your feedback gives us a chance to improve. Hope you visit us Soon.. </div>
        </section>

      </div>
    </>
  );
}

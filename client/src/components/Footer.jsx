export default function Footer() {
  const footerSections = [
    {
      title: "Product",
      links: ["Features", "How it works", "Pricing", "Changelog"],
    },
    {
      title: "Company",
      links: ["About", "Blog", "Careers", "Press"],
    },
    {
      title: "Support",
      links: ["Help center", "Contact us", "Privacy policy", "Terms of service"],
    },
  ];

  return (
    <>
      <style>{`
        .sp-footer {
          background: #0F0A2E;
          font-family: system-ui, -apple-system, sans-serif;
          padding: 56px 40px 28px;
          color: #fff;
        }
        .sp-footer-top {
          display: grid;
          grid-template-columns: 1.5fr repeat(3, 1fr);
          gap: 40px;
          margin-bottom: 48px;
          padding-bottom: 40px;
          border-bottom: 0.5px solid rgba(255,255,255,0.08);
        }
        .sp-footer-brand-col {}
        .sp-footer-logo {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 17px;
          font-weight: 800;
          color: #fff;
          margin-bottom: 14px;
          letter-spacing: -0.3px;
        }
        .sp-footer-logo-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #7F77DD;
        }
        .sp-footer-tagline {
          font-size: 13px;
          color: #7F77DD;
          line-height: 1.7;
          max-width: 220px;
          margin-bottom: 20px;
        }
        .sp-footer-socials {
          display: flex;
          gap: 10px;
        }
        .sp-social-btn {
          width: 34px;
          height: 34px;
          border-radius: 8px;
          background: rgba(255,255,255,0.06);
          border: 0.5px solid rgba(255,255,255,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.15s;
        }
        .sp-social-btn:hover { background: rgba(255,255,255,0.12); }
        .sp-footer-section-title {
          font-size: 12px;
          font-weight: 700;
          color: #fff;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin-bottom: 16px;
        }
        .sp-footer-links {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .sp-footer-link {
          font-size: 13px;
          color: #7F77DD;
          cursor: pointer;
          text-decoration: none;
          transition: color 0.15s;
        }
        .sp-footer-link:hover { color: #fff; }
        .sp-footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }
        .sp-footer-copy {
          font-size: 12px;
          color: rgba(255,255,255,0.25);
        }
        .sp-footer-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(255,255,255,0.05);
          border: 0.5px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 5px 12px;
          font-size: 11px;
          color: #7F77DD;
        }
        .sp-footer-badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #1D9E75;
          animation: sp-blink 2s ease-in-out infinite;
        }
        @keyframes sp-blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @media (max-width: 768px) {
          .sp-footer { padding: 40px 20px 24px; }
          .sp-footer-top {
            grid-template-columns: 1fr 1fr;
            gap: 28px;
          }
          .sp-footer-brand-col { grid-column: 1 / -1; }
          .sp-footer-bottom { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      <footer className="sp-footer">
        <div className="sp-footer-top">
          <div className="sp-footer-brand-col">
            <div className="sp-footer-logo">
              <div className="sp-footer-logo-dot" />
              Speakly
            </div>
            <p className="sp-footer-tagline">
              Practice English through real conversations with your AI partner, anytime.
            </p>
            <div className="sp-footer-socials">
              {/* Twitter/X */}
              <div className="sp-social-btn">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#7F77DD" strokeWidth="2" strokeLinecap="round">
                  <path d="M4 4l16 16M4 20L20 4" />
                </svg>
              </div>
              {/* LinkedIn */}
              <div className="sp-social-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7F77DD" strokeWidth="2" strokeLinecap="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </div>
              {/* Instagram */}
              <div className="sp-social-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7F77DD" strokeWidth="2" strokeLinecap="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </div>
            </div>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <div className="sp-footer-section-title">{section.title}</div>
              <ul className="sp-footer-links">
                {section.links.map((link) => (
                  <li key={link}>
                    <a className="sp-footer-link">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="sp-footer-bottom">
          <span className="sp-footer-copy">© 2026 Speakly. All rights reserved.</span>
          <div className="sp-footer-badge">
            <div className="sp-footer-badge-dot" />
            Under Construction.
          </div>
        </div>
      </footer>
    </>
  );
}

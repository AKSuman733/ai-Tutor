import { useState } from "react";
import {useNavigate} from "react-router-dom";
import { useAuth } from './AuthContext';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn , login, logout} = useAuth();

  const navLinks = ["Features", "How it works", "Pricing", "Blog"];

  const handleAuthAction = () => {
  if (isLoggedIn) {
    // Perform logout logic here
    localStorage.removeItem('token');
    console.log("Logging out...");
    logout();
  } else {
    // Perform login logic here
    navigate("/signin");
    console.log("Logging in...");
  }
};

  return (
    <>
      <style>{`
        .sp-header {
          background: #fff;
          border-bottom: 0.5px solid #E5E7EB;
          padding: 0 40px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0;
          z-index: 100;
          font-family: system-ui, -apple-system, sans-serif;
        }
        .sp-logo {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 18px;
          font-weight: 800;
          color: #0F0A2E;
          letter-spacing: -0.5px;
          text-decoration: none;
          cursor: pointer;
        }
        .sp-logo-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #534AB7;
        }
        .sp-nav-links {
          display: flex;
          align-items: center;
          gap: 32px;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .sp-nav-link {
          font-size: 14px;
          color: #6B7280;
          cursor: pointer;
          text-decoration: none;
          transition: color 0.15s;
          font-weight: 400;
        }
        .sp-nav-link:hover { color: #111827; }
        .sp-header-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .sp-btn-ghost {
          background: transparent;
          color: #374151;
          font-size: 14px;
          font-weight: 500;
          padding: 8px 16px;
          border-radius: 8px;
          cursor: pointer;
          border: 0.5px solid #E5E7EB;
          transition: background 0.15s;
        }
        .sp-btn-ghost:hover { background: #F9FAFB; }
        .sp-btn-primary {
          background: #534AB7;
          color: #fff;
          font-size: 14px;
          font-weight: 600;
          padding: 9px 20px;
          border-radius: 8px;
          cursor: pointer;
          border: none;
          transition: background 0.15s, transform 0.1s;
        }
        .sp-btn-primary:hover { background: #3C3489; }
        .sp-btn-primary:active { transform: scale(0.98); }
        .sp-mobile-toggle {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
        }
        .sp-mobile-menu {
          display: none;
          flex-direction: column;
          background: #fff;
          border-bottom: 0.5px solid #E5E7EB;
          padding: 16px 24px 20px;
          gap: 16px;
          font-family: system-ui, -apple-system, sans-serif;
        }
        .sp-mobile-link {
          font-size: 15px;
          color: #374151;
          cursor: pointer;
          padding: 4px 0;
          text-decoration: none;
        }
        @media (max-width: 768px) {
          .sp-nav-links { display: none; }
          .sp-btn-ghost { display: none; }
          .sp-mobile-toggle { display: block; }
          .sp-mobile-menu { display: ${menuOpen ? "flex" : "none"}; }
          .sp-header { padding: 0 20px; }
        }
      `}</style>

      <header className="sp-header">
        <div className="sp-logo">
          <div className="sp-logo-dot" />
          Speakly
        </div>

        <nav>
          <ul className="sp-nav-links">
            {navLinks.map((link) => (
              <li key={link}>
                <span className="sp-nav-link">{link}</span>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sp-header-right">
          {/* //<button className="sp-btn-ghost" onClick={handleLogOut}>Log out</button> */}
          <button className="sp-btn-primary" onClick={handleAuthAction}>
              {isLoggedIn ? 'Log out' : 'Sign In'}
          </button>
          {/* <button className="sp-btn-primary">Your Free Trial Started</button> */}
          <button
            className="sp-mobile-toggle"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round">
              {menuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="8" x2="21" y2="8" />
                  <line x1="3" y1="16" x2="21" y2="16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="sp-mobile-menu">
          {navLinks.map((link) => (
            <span key={link} className="sp-mobile-link">{link}</span>
          ))}
          <button className="sp-btn-primary" style={{ marginTop: 8 }}>
            Get started free
          </button>
        </div>
      )}
    </>
  );
}

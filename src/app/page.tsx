"use client";

import PerformanceMode from "./components/performance-mode";
import AnalyzeSong from "./components/analyze-song";
import { useState } from "react";

const navigationItems = [
  { label: "Dashboard", icon: "⌂" },
  { label: "Analyze", icon: "♫" },
  { label: "Performance", icon: "▶" },
  { label: "Technique Lab", icon: "♬" },
  { label: "Library", icon: "▣" },
];

export default function Home() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [isPremium, setIsPremium] = useState(false);

  return (
    <main className={isPremium ? "app premium-theme" : "app"}>
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">H</div>

          <div>
            <p className="brand-name">Harmivo</p>
            <p className="brand-caption">Musical companion</p>
          </div>
        </div>

        <nav className="navigation" aria-label="Primary navigation">
          {navigationItems.map((item) => {
            const isActive = activePage === item.label;

            return (
              <button
                key={item.label}
                type="button"
                className={
                  isActive
                    ? "navigation-item navigation-item-active"
                    : "navigation-item"
                }
                onClick={() => setActivePage(item.label)}
              >
                <span className="navigation-icon">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <button
            type="button"
            className="premium-switch"
            onClick={() => setIsPremium((current) => !current)}
            aria-pressed={isPremium}
          >
            <span>
              <strong>{isPremium ? "Premium" : "Free plan"}</strong>
              <small>
                {isPremium
                  ? "VVIP experience active"
                  : "Preview premium mode"}
              </small>
            </span>

            <span
              className={
                isPremium
                  ? "switch-track switch-track-active"
                  : "switch-track"
              }
            >
              <span className="switch-thumb" />
            </span>
          </button>

          <button
            type="button"
            className="profile-card"
            onClick={() => setActivePage("Profile")}
          >
            <span className="avatar">J</span>

            <span>
              <strong>Joseph</strong>
              <small>Keyboardist</small>
            </span>

            <span className="profile-arrow">›</span>
          </button>
        </div>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div>
            <p className="eyebrow">YOUR MUSICAL WORKSPACE</p>
            <h1>{activePage}</h1>
          </div>

          <div className="topbar-actions">
            <button type="button" className="notification-button">
              <span>●</span>
              <span className="sr-only">Notifications</span>
            </button>

            <button
              type="button"
              className="primary-button"
              onClick={() => setActivePage("Analyze")}
            >
              <span>＋</span>
              Analyze a song
            </button>
          </div>
        </header>

        <div className="content">
          {activePage === "Analyze" ? (
            <AnalyzeSong
              onBack={() => setActivePage("Dashboard")}
              onOpenPerformance={() =>
                setActivePage("Performance")
              }
            />
          ) : activePage === "Performance" ? (
            <PerformanceMode
              onBack={() => setActivePage("Analyze")}
              onAnalyzeAnother={() =>
                setActivePage("Analyze")
              }
            />
          ) : (
            <>
          <section className="hero-card">
            <div className="hero-copy">
              <span className="status-pill">
                <span className="status-dot" />
                Harmivo is ready
              </span>

              <h2>
                Hear the music.
                <br />
                Play it your way.
              </h2>

              <p>
                Analyze a song, follow live musical guidance and receive
                personalized harmonic ideas shaped around your instrument,
                skill and musical style.
              </p>

              <div className="hero-actions">
                <button
                  type="button"
                  className="primary-button large-button"
                  onClick={() => setActivePage("Analyze")}
                >
                  Upload your first song
                </button>

                <button
                  type="button"
                  className="secondary-button large-button"
                  onClick={() => setActivePage("Performance")}
                >
                  Open performance mode
                </button>
              </div>
            </div>

            <div className="live-preview" aria-label="Live performance preview">
              <div className="preview-header">
                <span>LIVE PREVIEW</span>
                <span className="live-indicator">Playing</span>
              </div>

              <div className="current-chord">
                <small>NOW</small>
                <strong>Fmaj9</strong>
                <span>Suggested harmony</span>
              </div>

              <div className="journey">
                <div className="journey-step">
                  <span className="journey-label">PASSING</span>
                  <strong>Gm9</strong>
                </div>

                <div className="journey-line">
                  <span />
                </div>

                <div className="journey-step">
                  <span className="journey-label">TARGET</span>
                  <strong>B♭maj9</strong>
                </div>
              </div>

              <div className="countdown">
                <span>Next change</span>
                <strong>1.3s</strong>
              </div>
            </div>
          </section>

          <section className="quick-grid">
            <article className="feature-card analyze-card">
              <span className="card-icon">♫</span>
              <div>
                <p className="card-kicker">START HERE</p>
                <h3>Analyze a song</h3>
                <p>
                  Upload audio and let Harmivo build its chord,
                  phrase and tonal journey.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActivePage("Analyze")}
              >
                Upload audio
                <span>→</span>
              </button>
            </article>

            <article className="feature-card performance-card">
              <span className="card-icon">▶</span>
              <div>
                <p className="card-kicker">PLAY LIVE</p>
                <h3>Performance mode</h3>
                <p>
                  Follow live chord guidance, passing movements and
                  upcoming modulations.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActivePage("Performance")}
              >
                Open player
                <span>→</span>
              </button>
            </article>

            <article className="feature-card technique-card">
              <span className="card-icon">♬</span>
              <div>
                <p className="card-kicker">KEEP GROWING</p>
                <h3>Technique Lab</h3>
                <p>
                  Learn new keyboard and guitar concepts tailored to
                  your level and style.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActivePage("Technique Lab")}
              >
                Explore techniques
                <span>→</span>
              </button>
            </article>
          </section>

          <section className="bottom-grid">
            <article className="panel">
              <div className="panel-heading">
                <div>
                  <p className="card-kicker">YOUR JOURNEY</p>
                  <h3>Recent sessions</h3>
                </div>

                <button
                  type="button"
                  className="text-button"
                  onClick={() => setActivePage("Library")}
                >
                  View library
                </button>
              </div>

              <div className="empty-state">
                <span>♫</span>
                <h4>No sessions yet</h4>
                <p>
                  Songs you analyze will appear here for quick access.
                </p>
              </div>
            </article>

            <article className="panel daily-technique">
              <div className="panel-heading">
                <div>
                  <p className="card-kicker">DAILY TECHNIQUE</p>
                  <h3>Gospel ii–V–I fill</h3>
                </div>

                <span className="level-pill">Intermediate</span>
              </div>

              <div className="technique-path">
                <strong>Gm9</strong>
                <span>→</span>
                <strong>C13</strong>
                <span>→</span>
                <strong>Fmaj9</strong>
              </div>

              <p>
                Build smoother resolutions using a rich
                predominant–dominant–tonic movement.
              </p>

              <button
                type="button"
                className="secondary-button"
                onClick={() => setActivePage("Technique Lab")}
              >
                Practise technique
              </button>
            </article>
          </section>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
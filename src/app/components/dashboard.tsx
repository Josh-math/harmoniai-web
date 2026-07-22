"use client";

import type {
  AppScreen,
} from "../types/app-navigation";
import {
  useHarmivo,
} from "../context/harmivo-context";

type DashboardProps = {
  goTo: (screen: AppScreen) => void;
};

export default function Dashboard({
  goTo,
}: DashboardProps) {
  const {
    songs,
    musicianProfile,
  } = useHarmivo();    
  return (
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
            Analyze a song, follow live musical
            guidance and receive personalized
            harmonic ideas shaped around your
            instrument, skill and musical style.
          </p>

          <div className="hero-actions">
            <button
              type="button"
              className={
                "primary-button large-button"
              }
              onClick={() => {
                goTo("analyze");
              }}
            >
              Upload your first song
            </button>

            <button
              type="button"
              className={
                "secondary-button large-button"
              }
              onClick={() => {
                goTo("performance");
              }}
            >
              Open performance mode
            </button>
          </div>
        </div>

        <div
          className="live-preview"
          aria-label="Live performance preview"
        >
          <div className="preview-header">
            <span>LIVE PREVIEW</span>

            <span className="live-indicator">
              Playing
            </span>
          </div>

          <div className="current-chord">
            <small>NOW</small>

            <strong>Fmaj9</strong>

            <span>
              Suggested harmony
            </span>
          </div>

          <div className="journey">
            <div className="journey-step">
              <span className="journey-label">
                PASSING
              </span>

              <strong>Gm9</strong>
            </div>

            <div className="journey-line">
              <span />
            </div>

            <div className="journey-step">
              <span className="journey-label">
                TARGET
              </span>

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
        <article
          className={
            "feature-card analyze-card"
          }
        >
          <span className="card-icon">
            ♫
          </span>

          <div>
            <p className="card-kicker">
              START HERE
            </p>

            <h3>Analyze a song</h3>

            <p>
              Upload audio and let Harmivo
              build its chord, phrase, and
              tonal journey.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              goTo("analyze");
            }}
          >
            Upload audio
            <span>→</span>
          </button>
        </article>

        <article
          className={
            "feature-card performance-card"
          }
        >
          <span className="card-icon">
            ▶
          </span>

          <div>
            <p className="card-kicker">
              PLAY LIVE
            </p>

            <h3>Performance mode</h3>

            <p>
              Follow live chord guidance,
              passing movements, and upcoming
              modulations.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              goTo("performance");
            }}
          >
            Open player
            <span>→</span>
          </button>
        </article>

        <article
          className={
            "feature-card technique-card"
          }
        >
          <span className="card-icon">
            ♬
          </span>

          <div>
            <p className="card-kicker">
              KEEP GROWING
            </p>

            <h3>Technique Lab</h3>

            <p>
              Learn new keyboard and guitar
              concepts tailored to your level
              and style.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              goTo("technique-lab");
            }}
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
              <p className="card-kicker">
                YOUR JOURNEY
              </p>

              <h3>Recent sessions</h3>
            </div>

            <button
              type="button"
              className="text-button"
              onClick={() => {
                goTo("library");
              }}
            >
              View library
            </button>
          </div>

          <div className="dashboard-session-preview">
            <div className="dashboard-session-icon">
              ♫
            </div>

            <div>
              <strong>
                {songs[0]?.metadata.title
                  ?? "No sessions yet"}
              </strong>

              <small>
                {songs.length > 0
                  ? (
                    `${songs.length} saved `
                    + (
                      songs.length === 1
                        ? "session"
                        : "sessions"
                    )
                  )
                  : (
                    "Songs you analyze "
                    + "will appear here."
                  )}
              </small>
            </div>

            <button
              type="button"
              className="text-button"
              onClick={() => {
                goTo("library");
              }}
            >
              Open
            </button>
          </div>
        </article>

        <article
          className={
            "panel daily-technique"
          }
        >
          <div className="panel-heading">
            <div>
              <p className="card-kicker">
                DAILY TECHNIQUE
              </p>

              <h3>
                Gospel ii–V–I fill
              </h3>
            </div>

            <span className="level-pill">
              Intermediate
            </span>
          </div>

          <div className="technique-path">
            <strong>Gm9</strong>
            <span>→</span>
            <strong>C13</strong>
            <span>→</span>
            <strong>Fmaj9</strong>
          </div>

          <p>
            Build smoother resolutions using
            a rich predominant–dominant–tonic
            movement.
          </p>

          <button
            type="button"
            className="secondary-button"
            onClick={() => {
              goTo("technique-lab");
            }}
          >
            Practise technique
          </button>
        </article>
      </section>
    </>
  );
}
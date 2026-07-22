"use client";

type AnalysisResultProps = {
  fileName: string;
  onAnalyzeAnother: () => void;
  onOpenAnalysis: () => void;
  onOpenPerformance: () => void;
};

export default function AnalysisResult({
  fileName,
  onAnalyzeAnother,
  onOpenAnalysis,
  onOpenPerformance,
}: AnalysisResultProps) {
  return (
    <section className="analysis-result-page">
      <div className="analysis-result-hero">
        <span className="result-success-icon">✓</span>

        <p className="card-kicker">
          ANALYSIS COMPLETE
        </p>

        <h2>Your song is ready</h2>

        <p className="result-file-name">
          {fileName}
        </p>

        <p className="result-intro">
          Harmivo has prepared the song’s
          tonal journey, chord movement,
          performance guidance, and
          personalized musical suggestions.
        </p>
      </div>

      <section className="result-summary-grid">
        <article className="result-summary-card">
          <span>KEY JOURNEY</span>

          <strong>
            F Major → G Major
          </strong>

          <small>
            One modulation detected
          </small>
        </article>

        <article className="result-summary-card">
          <span>TEMPO</span>

          <strong>96 BPM</strong>

          <small>
            Steady performance tempo
          </small>
        </article>

        <article className="result-summary-card">
          <span>MAIN CHORD</span>

          <strong>F Major</strong>

          <small>
            Opening tonal centre
          </small>
        </article>

        <article className="result-summary-card">
          <span>SONG LENGTH</span>

          <strong>1:30</strong>

          <small>
            Prototype analysis duration
          </small>
        </article>
      </section>

      <section className="result-actions-grid">
        <button
          type="button"
          className="result-action-card"
          onClick={onOpenAnalysis}
        >
          <span className="result-action-icon">
            ♫
          </span>

          <div>
            <strong>View analysis</strong>

            <small>
              Explore the tonal journey,
              chords, phrases, and sections.
            </small>
          </div>

          <span className="result-action-arrow">
            →
          </span>
        </button>

        <button
          type="button"
          className={
            "result-action-card "
            + "result-action-primary"
          }
          onClick={onOpenPerformance}
        >
          <span className="result-action-icon">
            ▶
          </span>

          <div>
            <strong>
              Open performance mode
            </strong>

            <small>
              Follow live guidance, passing
              chords, and upcoming changes.
            </small>
          </div>

          <span className="result-action-arrow">
            →
          </span>
        </button>

        <button
          type="button"
          className="result-action-card"
        >
          <span className="result-action-icon">
            ♬
          </span>

          <div>
            <strong>Learn this song</strong>

            <small>
              Practise techniques and harmonic
              movements found here.
            </small>
          </div>

          <span className="result-action-arrow">
            →
          </span>
        </button>

        <button
          type="button"
          className="result-action-card"
        >
          <span className="result-action-icon">
            ✦
          </span>

          <div>
            <strong>Reharmonize</strong>

            <small>
              Discover personalized performance
              paths and alternatives.
            </small>
          </div>

          <span className="result-action-arrow">
            →
          </span>
        </button>
      </section>

      <div className="result-footer-actions">
        <button
          type="button"
          className="secondary-button"
          onClick={onAnalyzeAnother}
        >
          Analyze another song
        </button>

        <button
          type="button"
          className="primary-button"
          onClick={onOpenPerformance}
        >
          Continue to performance
        </button>
      </div>
    </section>
  );
}
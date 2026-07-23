"use client";

import { mockSongIntelligence } from "../mock";

type AnalysisResultProps = {
  fileName: string;
  onAnalyzeAnother: () => void;
  onOpenAnalysis: () => void;
  onOpenPerformance: () => void;
};

function formatTime(seconds: number) {
  const safeSeconds = Math.max(
    0,
    Math.floor(seconds),
  );

  const minutes = Math.floor(
    safeSeconds / 60,
  );

  const remainingSeconds =
    safeSeconds % 60;

  return `${minutes}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
}

export default function AnalysisResult({
  fileName,
  onAnalyzeAnother,
  onOpenAnalysis,
  onOpenPerformance,
}: AnalysisResultProps) {
  const song = mockSongIntelligence;

  const keyJourney =
    song.keyRegions.length > 0
      ? song.keyRegions
          .map((region) => region.key)
          .join(" → ")
      : song.globalKey.value ?? "Unknown";

  const modulationCount =
    song.modulations.length;

  const openingKey =
    song.keyRegions[0]?.key
    ?? song.globalKey.value
    ?? "Unknown";

  const mainChord =
    song.chords[0]?.chord
    ?? "Unknown";

  const confirmedChordCount =
    song.chords.filter(
      (chord) =>
        chord.status === "confirmed",
    ).length;

  const estimatedChordCount =
    song.chords.filter(
      (chord) =>
        chord.status === "estimated",
    ).length;

  const modulationSummary =
    modulationCount === 0
      ? "No modulation detected"
      : modulationCount === 1
        ? "One modulation detected"
        : `${modulationCount} modulations detected`;

  const chordSummary =
    estimatedChordCount > 0
      ? (
        `${confirmedChordCount} confirmed`
        + ` • ${estimatedChordCount} estimated`
      )
      : `${confirmedChordCount} confirmed chords`;

  return (
    <section className="analysis-result-page">
      <div className="analysis-result-hero">
        <span className="result-success-icon">
          ✓
        </span>

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
            {keyJourney}
          </strong>

          <small>
            {modulationSummary}
          </small>
        </article>

        <article className="result-summary-card">
          <span>TEMPO</span>

          <strong>
            {Math.round(song.tempo.bpm)} BPM
          </strong>

          <small>
            {Math.round(
              song.tempo.confidence * 100,
            )}
            % confidence
          </small>
        </article>

        <article className="result-summary-card">
          <span>OPENING HARMONY</span>

          <strong>
            {mainChord}
          </strong>

          <small>
            {openingKey}
            {" • "}
            {chordSummary}
          </small>
        </article>

        <article className="result-summary-card">
          <span>SONG LENGTH</span>

          <strong>
            {formatTime(
              song.metadata.duration,
            )}
          </strong>

          <small>
            {song.phrases.length}
            {" "}
            {song.phrases.length === 1
              ? "section detected"
              : "sections detected"}
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
          disabled={
            !song.publicationPolicy
              .allowLiveGuidance
          }
        >
          <span className="result-action-icon">
            ▶
          </span>

          <div>
            <strong>
              Open performance mode
            </strong>

            <small>
              {song.publicationPolicy
                .allowLiveGuidance
                ? (
                  "Follow live guidance, "
                  + "passing chords, and "
                  + "upcoming changes."
                )
                : (
                  "Live guidance is unavailable "
                  + "for this analysis."
                )}
            </small>
          </div>

          <span className="result-action-arrow">
            →
          </span>
        </button>

        <button
          type="button"
          className="result-action-card"
          disabled={
            song.techniqueOpportunities
              .length === 0
          }
        >
          <span className="result-action-icon">
            ♬
          </span>

          <div>
            <strong>Learn this song</strong>

            <small>
              {song.techniqueOpportunities
                .length > 0
                ? (
                  `${song.techniqueOpportunities.length} `
                  + (
                    song.techniqueOpportunities
                      .length === 1
                      ? "technique opportunity found."
                      : "technique opportunities found."
                  )
                )
                : (
                  "No technique opportunities "
                  + "are available yet."
                )}
            </small>
          </div>

          <span className="result-action-arrow">
            →
          </span>
        </button>

        <button
          type="button"
          className="result-action-card"
          disabled={
            song.performancePaths.length
            === 0
          }
        >
          <span className="result-action-icon">
            ✦
          </span>

          <div>
            <strong>Reharmonize</strong>

            <small>
              {song.performancePaths.length
                > 0
                ? (
                  `${song.performancePaths.length} `
                  + (
                    song.performancePaths
                      .length === 1
                      ? "performance path available."
                      : "performance paths available."
                  )
                )
                : (
                  "No safe reharmonization "
                  + "path is available."
                )}
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
          disabled={
            !song.publicationPolicy
              .allowLiveGuidance
          }
        >
          Continue to performance
        </button>
      </div>
    </section>
  );
}
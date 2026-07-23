"use client";

import { useMemo, useState } from "react";

import { mockSongIntelligence } from "../mock";
import InteractiveAnalysis from "./interactive-analysis";

type AnalysisWorkspaceProps = {
  fileName: string;
  onBack: () => void;
  onOpenPerformance: () => void;
};

type AnalysisView =
  | "song-map"
  | "written-analysis";

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

function formatConfidence(
  confidence: number,
) {
  return `${Math.round(
    confidence * 100,
  )}%`;
}

export default function AnalysisWorkspace({
  fileName,
  onBack,
  onOpenPerformance,
}: AnalysisWorkspaceProps) {
  const song = mockSongIntelligence;

  const [
    activeView,
    setActiveView,
  ] = useState<AnalysisView>(
    "song-map",
  );

  const confirmedChords = useMemo(
    () =>
      song.chords.filter(
        (chord) =>
          chord.status === "confirmed",
      ),
    [song.chords],
  );

  const estimatedChords = useMemo(
    () =>
      song.chords.filter(
        (chord) =>
          chord.status === "estimated",
      ),
    [song.chords],
  );

  const structuralChords = useMemo(
    () =>
      song.chords.filter(
        (chord) =>
          !chord.isPassingChord,
      ),
    [song.chords],
  );

  const passingChords = useMemo(
    () =>
      song.chords.filter(
        (chord) =>
          chord.isPassingChord,
      ),
    [song.chords],
  );

  const averageChordConfidence =
    song.chords.length > 0
      ? (
          song.chords.reduce(
            (
              total,
              chord,
            ) =>
              total
              + chord.confidence,
            0,
          )
          / song.chords.length
        )
      : 0;

  const keyJourney =
    song.keyRegions.length > 0
      ? song.keyRegions
          .map(
            (region) =>
              region.key,
          )
          .join(" → ")
      : (
          song.globalKey.value
          ?? "Unknown"
        );

  if (
    activeView === "song-map"
  ) {
    return (
      <section className="analysis-workspace-page">
        <div className="analysis-workspace-switch">
          <button
            type="button"
            className="analysis-workspace-tab analysis-workspace-tab-active"
          >
            Song Map
          </button>

          <button
            type="button"
            className="analysis-workspace-tab"
            onClick={() => {
              setActiveView(
                "written-analysis",
              );
            }}
          >
            Musical Insights
          </button>
        </div>

        <InteractiveAnalysis
          fileName={fileName}
          onBack={onBack}
          onOpenPerformance={
            onOpenPerformance
          }
        />
      </section>
    );
  }

  return (
    <section className="analysis-workspace-page">
      <div className="analysis-workspace-toolbar">
        <button
          type="button"
          className="back-button"
          onClick={onBack}
        >
          ← Back to results
        </button>

        <button
          type="button"
          className="primary-button"
          onClick={onOpenPerformance}
        >
          Open performance mode
        </button>
      </div>

      <header className="written-analysis-heading">
        <div>
          <p className="card-kicker">
            SONG INTELLIGENCE
          </p>

          <h2>
            Understand your music
          </h2>

          <p>{fileName}</p>
        </div>

        <div className="analysis-workspace-switch">
          <button
            type="button"
            className="analysis-workspace-tab"
            onClick={() => {
              setActiveView(
                "song-map",
              );
            }}
          >
            Song Map
          </button>

          <button
            type="button"
            className="analysis-workspace-tab analysis-workspace-tab-active"
          >
            Musical Insights
          </button>
        </div>
      </header>

      <section className="written-analysis-summary">
        <article className="written-summary-card written-summary-primary">
          <small>
            TONAL JOURNEY
          </small>

          <strong>
            {keyJourney}
          </strong>

          <span>
            {song.keyRegions.length}
            {" "}
            {song.keyRegions.length === 1
              ? "tonal region"
              : "tonal regions"}
          </span>
        </article>

        <article className="written-summary-card">
          <small>TEMPO</small>

          <strong>
            {Math.round(
              song.tempo.bpm,
            )}
            {" BPM"}
          </strong>

          <span>
            {formatConfidence(
              song.tempo.confidence,
            )}
            {" confidence"}
          </span>
        </article>

        <article className="written-summary-card">
          <small>
            CHORD RELIABILITY
          </small>

          <strong>
            {formatConfidence(
              averageChordConfidence,
            )}
          </strong>

          <span>
            {confirmedChords.length}
            {" confirmed • "}
            {estimatedChords.length}
            {" estimated"}
          </span>
        </article>

        <article className="written-summary-card">
          <small>SONG LENGTH</small>

          <strong>
            {formatTime(
              song.metadata.duration,
            )}
          </strong>

          <span>
            {song.phrases.length}
            {" sections"}
          </span>
        </article>
      </section>

      <section className="written-analysis-grid">
        <article className="written-analysis-card">
          <div className="written-card-heading">
            <div>
              <p className="card-kicker">
                TONAL STRUCTURE
              </p>

              <h3>Key regions</h3>
            </div>

            <span className="analysis-count-pill">
              {song.keyRegions.length}
            </span>
          </div>

          <div className="written-region-list">
            {song.keyRegions.map(
              (
                region,
                index,
              ) => (
                <div
                  key={region.id}
                  className="written-region-item"
                >
                  <span>
                    {index + 1}
                  </span>

                  <div>
                    <strong>
                      {region.key}
                    </strong>

                    <small>
                      {formatTime(
                        region.start,
                      )}
                      {" – "}
                      {formatTime(
                        region.end,
                      )}
                    </small>
                  </div>

                  <em>
                    {formatConfidence(
                      region.confidence,
                    )}
                  </em>
                </div>
              ),
            )}
          </div>
        </article>

        <article className="written-analysis-card">
          <div className="written-card-heading">
            <div>
              <p className="card-kicker">
                MODULATION
              </p>

              <h3>
                Key movements
              </h3>
            </div>

            <span className="analysis-count-pill">
              {
                song.modulations
                  .length
              }
            </span>
          </div>

          {song.modulations.length
            > 0 ? (
              <div className="written-modulation-list">
                {song.modulations.map(
                  (modulation) => (
                    <div
                      key={
                        modulation.id
                      }
                      className="written-modulation-item"
                    >
                      <span>↗</span>

                      <div>
                        <strong>
                          {
                            modulation.fromKey
                          }
                          {" → "}
                          {
                            modulation.toKey
                          }
                        </strong>

                        <small>
                          At{" "}
                          {formatTime(
                            modulation.time,
                          )}
                          {" • "}
                          {formatConfidence(
                            modulation.confidence,
                          )}
                        </small>
                      </div>

                      <em>
                        {
                          modulation.status
                        }
                      </em>
                    </div>
                  ),
                )}
              </div>
            ) : (
              <p className="written-empty-message">
                No confirmed
                modulation was detected.
              </p>
            )}
        </article>

        <article className="written-analysis-card">
          <div className="written-card-heading">
            <div>
              <p className="card-kicker">
                CHORD MOVEMENT
              </p>

              <h3>
                Detected harmony
              </h3>
            </div>

            <span className="analysis-count-pill">
              {song.chords.length}
            </span>
          </div>

          <div className="written-chord-flow">
            {song.chords.map(
              (
                chord,
                index,
              ) => (
                <div
                  key={chord.id}
                  className={
                    chord.status
                    === "estimated"
                      ? (
                        "written-chord-item "
                        + "written-chord-item-estimated"
                      )
                      : "written-chord-item"
                  }
                >
                  <strong>
                    {chord.chord}
                  </strong>

                  <small>
                    {chord.roman}
                  </small>

                  {index
                    < song.chords
                        .length
                        - 1 && (
                      <span>→</span>
                    )}
                </div>
              ),
            )}
          </div>

          <div className="written-chord-statistics">
            <div>
              <span>
                Structural
              </span>

              <strong>
                {
                  structuralChords.length
                }
              </strong>
            </div>

            <div>
              <span>
                Passing
              </span>

              <strong>
                {
                  passingChords.length
                }
              </strong>
            </div>

            <div>
              <span>
                Estimated
              </span>

              <strong>
                {
                  estimatedChords.length
                }
              </strong>
            </div>
          </div>
        </article>

        <article className="written-analysis-card">
          <div className="written-card-heading">
            <div>
              <p className="card-kicker">
                SONG STRUCTURE
              </p>

              <h3>
                Detected sections
              </h3>
            </div>

            <span className="analysis-count-pill">
              {song.phrases.length}
            </span>
          </div>

          <div className="written-section-list">
            {song.phrases.map(
              (
                phrase,
                index,
              ) => (
                <div
                  key={phrase.id}
                  className="written-section-item"
                >
                  <span>
                    {index + 1}
                  </span>

                  <div>
                    <strong>
                      {phrase.label}
                    </strong>

                    <small>
                      {formatTime(
                        phrase.start,
                      )}
                      {" – "}
                      {formatTime(
                        phrase.end,
                      )}
                    </small>
                  </div>

                  <em>
                    {formatConfidence(
                      phrase.confidence,
                    )}
                  </em>
                </div>
              ),
            )}
          </div>
        </article>

        <article className="written-analysis-card">
          <div className="written-card-heading">
            <div>
              <p className="card-kicker">
                PERFORMANCE
              </p>

              <h3>
                Available paths
              </h3>
            </div>

            <span className="analysis-count-pill">
              {
                song.performancePaths
                  .length
              }
            </span>
          </div>

          {song.performancePaths.length
            > 0 ? (
              <div className="written-performance-list">
                {song.performancePaths.map(
                  (path) => (
                    <button
                      key={path.id}
                      type="button"
                      className="written-performance-item"
                      onClick={
                        onOpenPerformance
                      }
                    >
                      <div>
                        <strong>
                          {path.name}
                        </strong>

                        <small>
                          {path.style}
                          {" • "}
                          {
                            path.difficulty
                          }
                        </small>
                      </div>

                      <span>
                        {formatConfidence(
                          path.confidence,
                        )}
                        {" →"}
                      </span>
                    </button>
                  ),
                )}
              </div>
            ) : (
              <p className="written-empty-message">
                No safe performance
                path is available.
              </p>
            )}
        </article>

        <article className="written-analysis-card">
          <div className="written-card-heading">
            <div>
              <p className="card-kicker">
                LEARNING
              </p>

              <h3>
                Technique opportunities
              </h3>
            </div>

            <span className="analysis-count-pill">
              {
                song
                  .techniqueOpportunities
                  .length
              }
            </span>
          </div>

          <div className="written-technique-list">
            {song.techniqueOpportunities
              .slice(0, 4)
              .map(
                (technique) => (
                  <div
                    key={
                      technique.id
                    }
                    className="written-technique-item"
                  >
                    <span>♬</span>

                    <div>
                      <strong>
                        {
                          technique.title
                        }
                      </strong>

                      <small>
                        {
                          technique.instrument
                        }
                        {" • "}
                        {
                          technique.difficulty
                        }
                      </small>
                    </div>
                  </div>
                ),
              )}
          </div>
        </article>
      </section>

      <section className="written-analysis-policy">
        <div>
          <p className="card-kicker">
            AVAILABLE EXPERIENCES
          </p>

          <h3>
            Ready for your next step
          </h3>
        </div>

        <div className="written-policy-items">
          <span>
            {song.publicationPolicy
              .publishRegionalKeys
              ? "✓"
              : "—"}
            {" Regional keys"}
          </span>

          <span>
            {song.publicationPolicy
              .publishChords
              ? "✓"
              : "—"}
            {" Chords"}
          </span>

          <span>
            {song.publicationPolicy
              .publishModulations
              ? "✓"
              : "—"}
            {" Modulations"}
          </span>

          <span>
            {song.publicationPolicy
              .allowLiveGuidance
              ? "✓"
              : "—"}
            {" Live guidance"}
          </span>
        </div>

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
      </section>
    </section>
  );
}
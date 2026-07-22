"use client";

import {
  ChangeEvent,
  useEffect,
  useMemo,
  useState,
} from "react";

import { mockSongIntelligence } from "../data/mock-song-intelligence";

type InteractiveAnalysisProps = {
  fileName: string;
  onBack: () => void;
  onOpenPerformance: () => void;
};

type DisplayMode =
  | "chords"
  | "roman";

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

function getStatusLabel(
  status:
    | "confirmed"
    | "estimated"
    | "withheld",
) {
  if (status === "confirmed") {
    return "Confirmed";
  }

  if (status === "estimated") {
    return "Estimated";
  }

  return "Withheld";
}

export default function InteractiveAnalysis({
  fileName,
  onBack,
  onOpenPerformance,
}: InteractiveAnalysisProps) {
  const song = mockSongIntelligence;

  const duration =
    song.metadata.duration;

  const chordEvents =
    song.chords;

  const keyRegions =
    song.keyRegions;

  const phraseRegions =
    song.phrases;

  const modulations =
    song.modulations;

  const [position, setPosition] =
    useState(0);

  const [isPlaying, setIsPlaying] =
    useState(false);

  const [displayMode, setDisplayMode] =
    useState<DisplayMode>("chords");

  const [selectedPhraseId, setSelectedPhraseId] =
    useState<string | null>(null);

  useEffect(() => {
    if (!isPlaying) {
      return;
    }

    const interval =
      window.setInterval(() => {
        setPosition((current) => {
          const nextPosition =
            current + 0.1;

          if (nextPosition >= duration) {
            setIsPlaying(false);
            return duration;
          }

          return nextPosition;
        });
      }, 100);

    return () => {
      window.clearInterval(interval);
    };
  }, [
    duration,
    isPlaying,
  ]);

  const currentChord = useMemo(() => {
    return (
      chordEvents.find(
        (event) =>
          position >= event.start
          && position < event.end,
      )
      ?? chordEvents[
        chordEvents.length - 1
      ]
    );
  }, [
    chordEvents,
    position,
  ]);

  const currentPhrase = useMemo(() => {
    return (
      phraseRegions.find(
        (phrase) =>
          position >= phrase.start
          && position < phrase.end,
      )
      ?? phraseRegions[
        phraseRegions.length - 1
      ]
    );
  }, [
    phraseRegions,
    position,
  ]);

  const currentRegion = useMemo(() => {
    return (
      keyRegions.find(
        (region) =>
          position >= region.start
          && position < region.end,
      )
      ?? keyRegions[
        keyRegions.length - 1
      ]
    );
  }, [
    keyRegions,
    position,
  ]);

  const nextChord = useMemo(() => {
    const currentIndex =
      chordEvents.findIndex(
        (event) =>
          event.id === currentChord.id,
      );

    return (
      chordEvents[
        currentIndex + 1
      ]
      ?? null
    );
  }, [
    chordEvents,
    currentChord.id,
  ]);

  const nextModulation = useMemo(() => {
    return (
      modulations.find(
        (modulation) =>
          modulation.time > position,
      )
      ?? null
    );
  }, [
    modulations,
    position,
  ]);

  const selectedPhrase = useMemo(() => {
    if (!selectedPhraseId) {
      return null;
    }

    return (
      phraseRegions.find(
        (phrase) =>
          phrase.id === selectedPhraseId,
      )
      ?? null
    );
  }, [
    phraseRegions,
    selectedPhraseId,
  ]);

  const progress =
    duration > 0
      ? (
        position / duration
      ) * 100
      : 0;

  const secondsUntilNextChord =
    nextChord
      ? Math.max(
          0,
          nextChord.start - position,
        )
      : 0;

  function handleSeek(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    setPosition(
      Number(event.target.value),
    );
  }

  function togglePlayback() {
    if (position >= duration) {
      setPosition(0);
      setIsPlaying(true);
      return;
    }

    setIsPlaying(
      (current) => !current,
    );
  }

  function restart() {
    setPosition(0);
    setIsPlaying(false);
    setSelectedPhraseId(null);
  }

  function openPhrase(
    phraseId: string,
    phraseStart: number,
  ) {
    setSelectedPhraseId(phraseId);
    setPosition(phraseStart);
  }

  function clearPhraseSelection() {
    setSelectedPhraseId(null);
  }

  return (
    <section className="interactive-analysis-page">
      <div className="analysis-page-toolbar">
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

      <header className="interactive-analysis-heading">
        <div>
          <p className="card-kicker">
            INTERACTIVE SONG MAP
          </p>

          <h2>Explore your music</h2>

          <p>{fileName}</p>
        </div>

        <div className="analysis-display-switch">
          <button
            type="button"
            className={
              displayMode === "chords"
                ? "analysis-switch-active"
                : ""
            }
            onClick={() => {
              setDisplayMode("chords");
            }}
          >
            Chords
          </button>

          <button
            type="button"
            className={
              displayMode === "roman"
                ? "analysis-switch-active"
                : ""
            }
            onClick={() => {
              setDisplayMode("roman");
            }}
          >
            Roman numerals
          </button>
        </div>
      </header>

      <section className="song-map-now-grid">
        <article className="song-map-now-card song-map-current-chord">
          <small>
            PLAYING AT {formatTime(position)}
          </small>

          <strong>
            {displayMode === "chords"
              ? currentChord.chord
              : currentChord.roman}
          </strong>

          <span>
            {getStatusLabel(
              currentChord.status,
            )}
            {" • "}
            {Math.round(
              currentChord.confidence * 100,
            )}
            % confidence
          </span>
        </article>

        <article className="song-map-now-card">
          <small>CURRENT KEY</small>

          <strong>
            {currentRegion.key}
          </strong>

          <span>
            Regional tonal centre
          </span>
        </article>

        <article className="song-map-now-card">
          <small>SONG SECTION</small>

          <strong>
            {currentPhrase.label}
          </strong>

          <span>
            {formatTime(
              currentPhrase.start,
            )}
            {" – "}
            {formatTime(
              currentPhrase.end,
            )}
          </span>
        </article>

        <article className="song-map-now-card">
          <small>NEXT CHANGE</small>

          <strong>
            {nextChord
              ? (
                displayMode === "chords"
                  ? nextChord.chord
                  : nextChord.roman
              )
              : "End"}
          </strong>

          <span>
            {nextChord
              ? `${secondsUntilNextChord.toFixed(
                  1,
                )} seconds`
              : "Song complete"}
          </span>
        </article>
      </section>

      <section className="song-map-panel">
        <div className="song-map-panel-heading">
          <div>
            <p className="card-kicker">
              SONG JOURNEY
            </p>

            <h3>
              Chords, keys, and sections
            </h3>
          </div>

          <div className="song-map-time-display">
            <strong>
              {formatTime(position)}
            </strong>

            <span>
              / {formatTime(duration)}
            </span>
          </div>
        </div>

        <div className="song-map-player-row">
          <button
            type="button"
            className="song-map-restart-button"
            onClick={restart}
          >
            ↺

            <span className="sr-only">
              Restart song map
            </span>
          </button>

          <button
            type="button"
            className="song-map-play-button"
            onClick={togglePlayback}
          >
            {isPlaying
              ? "❚❚"
              : "▶"}
          </button>

          <input
            className="song-map-seek"
            type="range"
            min="0"
            max={duration}
            step="0.1"
            value={position}
            onChange={handleSeek}
            aria-label="Song map position"
          />
        </div>

        <div className="song-map-canvas">
          <div
            className="song-map-playhead"
            style={{
              left: `${progress}%`,
            }}
          >
            <span />
          </div>

          <div className="song-map-row">
            <div className="song-map-row-label">
              Keys
            </div>

            <div className="song-map-row-content">
              {keyRegions.map((region) => {
                const isActive =
                  currentRegion.id
                  === region.id;

                return (
                  <button
                    key={region.id}
                    type="button"
                    className={
                      isActive
                        ? (
                          "song-map-key-block "
                          + "song-map-key-block-active"
                        )
                        : "song-map-key-block"
                    }
                    style={{
                      width: `${
                        (
                          (
                            region.end
                            - region.start
                          )
                          / duration
                        )
                        * 100
                      }%`,
                    }}
                    onClick={() => {
                      setPosition(
                        region.start,
                      );
                    }}
                  >
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
                  </button>
                );
              })}
            </div>
          </div>

          <div className="song-map-row">
            <div className="song-map-row-label">
              Chords
            </div>

            <div className="song-map-row-content">
              {chordEvents.map((event) => {
                const isActive =
                  currentChord.id
                  === event.id;

                let className =
                  "song-map-chord-block";

                if (isActive) {
                  className +=
                    " song-map-chord-block-active";
                } else if (
                  event.status === "estimated"
                ) {
                  className +=
                    " song-map-chord-block-estimated";
                }

                return (
                  <button
                    key={event.id}
                    type="button"
                    className={className}
                    style={{
                      width: `${
                        (
                          (
                            event.end
                            - event.start
                          )
                          / duration
                        )
                        * 100
                      }%`,
                    }}
                    onClick={() => {
                      setPosition(
                        event.start,
                      );
                    }}
                  >
                    <strong>
                      {displayMode === "chords"
                        ? event.chord
                        : event.roman}
                    </strong>

                    <small>
                      {formatTime(
                        event.start,
                      )}
                    </small>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="song-map-row">
            <div className="song-map-row-label">
              Sections
            </div>

            <div className="song-map-row-content">
              {phraseRegions.map((phrase) => {
                const isActive =
                  currentPhrase.id
                  === phrase.id;

                const isSelected =
                  selectedPhraseId
                  === phrase.id;

                return (
                  <button
                    key={phrase.id}
                    type="button"
                    className={
                      isSelected
                        ? (
                          "song-map-phrase-block "
                          + "song-map-phrase-block-selected"
                        )
                        : isActive
                          ? (
                            "song-map-phrase-block "
                            + "song-map-phrase-block-active"
                          )
                          : "song-map-phrase-block"
                    }
                    style={{
                      width: `${
                        (
                          (
                            phrase.end
                            - phrase.start
                          )
                          / duration
                        )
                        * 100
                      }%`,
                    }}
                    onClick={() => {
                      openPhrase(
                        phrase.id,
                        phrase.start,
                      );
                    }}
                  >
                    <strong>
                      {phrase.label}
                    </strong>

                    <small>
                      {formatTime(
                        phrase.start,
                      )}
                    </small>
                  </button>
                );
              })}
            </div>
          </div>

          {modulations.map(
            (modulation) => (
              <button
                key={modulation.id}
                type="button"
                className="song-map-modulation-marker"
                style={{
                  left: `${
                    (
                      modulation.time
                      / duration
                    )
                    * 100
                  }%`,
                }}
                onClick={() => {
                  setPosition(
                    modulation.time,
                  );
                }}
                title={
                  `${modulation.fromKey} → `
                  + modulation.toKey
                }
              >
                <span>↗</span>
              </button>
            ),
          )}
        </div>

        <div className="song-map-legend">
          <span>
            <i className="legend-confirmed" />
            Confirmed chord
          </span>

          <span>
            <i className="legend-estimated" />
            Estimated chord
          </span>

          <span>
            <i className="legend-modulation" />
            Modulation
          </span>
        </div>
      </section>

      <section className="song-map-detail-grid">
        <article className="song-map-detail-card">
          <p className="card-kicker">
            CURRENT MOMENT
          </p>

          <h3>
            {currentChord.chord}
            {" in "}
            {currentRegion.key}
          </h3>

          <dl className="current-moment-details">
            <div>
              <dt>Roman numeral</dt>

              <dd>
                {currentChord.roman}
              </dd>
            </div>

            <div>
              <dt>Section</dt>

              <dd>
                {currentPhrase.label}
              </dd>
            </div>

            <div>
              <dt>Chord type</dt>

              <dd>
                {currentChord.isPassingChord
                  ? "Passing chord"
                  : "Structural chord"}
              </dd>
            </div>

            <div>
              <dt>Confidence</dt>

              <dd>
                {Math.round(
                  currentChord.confidence
                  * 100,
                )}
                %
              </dd>
            </div>
          </dl>
        </article>

        <article className="song-map-detail-card">
          <p className="card-kicker">
            TONAL JOURNEY
          </p>

          <h3>
            {keyRegions.length}
            {" "}
            {keyRegions.length === 1
              ? "key region"
              : "key regions"}
          </h3>

          <div className="song-map-tonal-list">
            {keyRegions.map(
              (region, index) => (
                <button
                  key={region.id}
                  type="button"
                  className={
                    currentRegion.id
                    === region.id
                      ? (
                        "song-map-tonal-item "
                        + "song-map-tonal-item-active"
                      )
                      : "song-map-tonal-item"
                  }
                  onClick={() => {
                    setPosition(
                      region.start,
                    );
                  }}
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
                </button>
              ),
            )}
          </div>

          {nextModulation && (
            <div className="song-map-next-modulation">
              <small>
                MODULATION AHEAD
              </small>

              <strong>
                {nextModulation.fromKey}
                {" → "}
                {nextModulation.toKey}
              </strong>

              <span>
                In{" "}
                {Math.max(
                  0,
                  nextModulation.time
                  - position,
                ).toFixed(1)}
                s
              </span>
            </div>
          )}
        </article>
      </section>

      {selectedPhrase && (
        <section className="song-map-selected-section">
          <div>
            <p className="card-kicker">
              SELECTED SECTION
            </p>

            <h3>
              {selectedPhrase.label}
            </h3>

            <span>
              {formatTime(
                selectedPhrase.start,
              )}
              {" – "}
              {formatTime(
                selectedPhrase.end,
              )}
            </span>
          </div>

          <div className="selected-section-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={() => {
                setPosition(
                  selectedPhrase.start,
                );

                setIsPlaying(true);
              }}
            >
              Play section
            </button>

            <button
              type="button"
              className="text-button"
              onClick={
                clearPhraseSelection
              }
            >
              Close
            </button>
          </div>
        </section>
      )}
    </section>
  );
}
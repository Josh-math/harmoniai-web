"use client";

import {
  ChangeEvent,
  useMemo,
  useState,
} from "react";

type InteractiveAnalysisProps = {
  fileName: string;
  onBack: () => void;
  onOpenPerformance: () => void;
};

type ChordEvent = {
  start: number;
  end: number;
  chord: string;
  roman: string;
  key: string;
  status: "confirmed" | "estimated";
};

type KeyRegion = {
  start: number;
  end: number;
  key: string;
};

type PhraseRegion = {
  start: number;
  end: number;
  label: string;
};

const duration = 90;

const chordEvents: ChordEvent[] = [
  {
    start: 0,
    end: 8,
    chord: "F",
    roman: "I",
    key: "F Major",
    status: "confirmed",
  },
  {
    start: 8,
    end: 16,
    chord: "Bb",
    roman: "IV",
    key: "F Major",
    status: "confirmed",
  },
  {
    start: 16,
    end: 24,
    chord: "C",
    roman: "V",
    key: "F Major",
    status: "confirmed",
  },
  {
    start: 24,
    end: 32,
    chord: "Dm",
    roman: "vi",
    key: "F Major",
    status: "estimated",
  },
  {
    start: 32,
    end: 40,
    chord: "Gm",
    roman: "ii",
    key: "F Major",
    status: "confirmed",
  },
  {
    start: 40,
    end: 48,
    chord: "C",
    roman: "V",
    key: "F Major",
    status: "confirmed",
  },
  {
    start: 48,
    end: 58,
    chord: "F",
    roman: "I",
    key: "F Major",
    status: "confirmed",
  },
  {
    start: 58,
    end: 64,
    chord: "D",
    roman: "V",
    key: "G Major",
    status: "estimated",
  },
  {
    start: 64,
    end: 73,
    chord: "G",
    roman: "I",
    key: "G Major",
    status: "confirmed",
  },
  {
    start: 73,
    end: 81,
    chord: "C",
    roman: "IV",
    key: "G Major",
    status: "confirmed",
  },
  {
    start: 81,
    end: 90,
    chord: "D",
    roman: "V",
    key: "G Major",
    status: "confirmed",
  },
];

const keyRegions: KeyRegion[] = [
  {
    start: 0,
    end: 62.5,
    key: "F Major",
  },
  {
    start: 62.5,
    end: 90,
    key: "G Major",
  },
];

const phraseRegions: PhraseRegion[] = [
  {
    start: 0,
    end: 24,
    label: "Intro",
  },
  {
    start: 24,
    end: 48,
    label: "Verse",
  },
  {
    start: 48,
    end: 64,
    label: "Build",
  },
  {
    start: 64,
    end: 90,
    label: "Chorus",
  },
];

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

export default function InteractiveAnalysis({
  fileName,
  onBack,
  onOpenPerformance,
}: InteractiveAnalysisProps) {
  const [position, setPosition] =
    useState(0);

  const [displayMode, setDisplayMode] =
    useState<"chords" | "roman">(
      "chords",
    );

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
  }, [position]);

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
  }, [position]);

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
  }, [position]);

  function handleSeek(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    setPosition(
      Number(event.target.value),
    );
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
            SONG ANALYSIS
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

      <section className="analysis-overview-grid">
        <article className="analysis-overview-card analysis-current-card">
          <small>AT {formatTime(position)}</small>

          <strong>
            {displayMode === "chords"
              ? currentChord.chord
              : currentChord.roman}
          </strong>

          <span>
            {currentChord.status
              === "confirmed"
              ? "Confirmed"
              : "Estimated"}
          </span>
        </article>

        <article className="analysis-overview-card">
          <small>CURRENT KEY</small>

          <strong>
            {currentRegion.key}
          </strong>

          <span>Regional tonal centre</span>
        </article>

        <article className="analysis-overview-card">
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

        <article className="analysis-overview-card">
          <small>MODULATION</small>

          <strong>1:03</strong>

          <span>F Major → G Major</span>
        </article>
      </section>

      <section className="analysis-timeline-panel">
        <div className="timeline-panel-heading">
          <div>
            <p className="card-kicker">
              INTERACTIVE TIMELINE
            </p>

            <h3>Chord journey</h3>
          </div>

          <span>
            {formatTime(position)}
            {" / "}
            {formatTime(duration)}
          </span>
        </div>

        <input
          className="analysis-master-seek"
          type="range"
          min="0"
          max={duration}
          step="0.1"
          value={position}
          onChange={handleSeek}
          aria-label="Song position"
        />

        <div className="key-region-track">
          {keyRegions.map((region) => (
            <button
              key={`${region.start}-${region.key}`}
              type="button"
              className={
                currentRegion.key
                  === region.key
                  ? "key-region key-region-active"
                  : "key-region"
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
                setPosition(region.start);
              }}
            >
              <strong>{region.key}</strong>

              <small>
                {formatTime(region.start)}
                {" – "}
                {formatTime(region.end)}
              </small>
            </button>
          ))}
        </div>

        <div className="chord-event-track">
          {chordEvents.map((event) => {
            const isActive =
              currentChord.start
              === event.start;

            return (
              <button
                key={`${event.start}-${event.chord}`}
                type="button"
                className={
                  isActive
                    ? "analysis-chord-event analysis-chord-event-active"
                    : event.status
                        === "estimated"
                      ? "analysis-chord-event analysis-chord-event-estimated"
                      : "analysis-chord-event"
                }
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
                  setPosition(event.start);
                }}
              >
                <strong>
                  {displayMode === "chords"
                    ? event.chord
                    : event.roman}
                </strong>

                <small>
                  {formatTime(event.start)}
                </small>
              </button>
            );
          })}
        </div>

        <div className="phrase-region-track">
          {phraseRegions.map((phrase) => (
            <button
              key={`${phrase.start}-${phrase.label}`}
              type="button"
              className={
                currentPhrase.label
                  === phrase.label
                  ? "phrase-region phrase-region-active"
                  : "phrase-region"
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
                setPosition(phrase.start);
              }}
            >
              {phrase.label}
            </button>
          ))}
        </div>
      </section>

      <section className="analysis-detail-grid">
        <article className="analysis-detail-card">
          <p className="card-kicker">
            TONAL JOURNEY
          </p>

          <h3>Two key regions</h3>

          <div className="tonal-journey-list">
            {keyRegions.map(
              (region, index) => (
                <div
                  key={region.key}
                  className={
                    currentRegion.key
                      === region.key
                      ? "tonal-region-item tonal-region-item-active"
                      : "tonal-region-item"
                  }
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
                </div>
              ),
            )}
          </div>
        </article>

        <article className="analysis-detail-card">
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
              <dt>Status</dt>
              <dd>
                {currentChord.status
                  === "confirmed"
                  ? "Confirmed"
                  : "Estimated"}
              </dd>
            </div>
          </dl>
        </article>
      </section>
    </section>
  );
}
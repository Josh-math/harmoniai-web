"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

type PerformanceModeProps = {
  onBack: () => void;
  onAnalyzeAnother: () => void;
};

type TimelineEvent = {
  start: number;
  end: number;
  original: string;
  suggestion: string | null;
  suggestionRole:
    | "current"
    | "passing"
    | "target"
    | null;
  key: string;
  nextChord: string | null;
  modulation?: {
    fromKey: string;
    toKey: string;
    time: number;
  };
};

const duration = 48;

const timeline: TimelineEvent[] = [
  {
    start: 0,
    end: 6,
    original: "F",
    suggestion: "Fmaj9",
    suggestionRole: "current",
    key: "F Major",
    nextChord: "Gm9",
  },
  {
    start: 6,
    end: 12,
    original: "Gm",
    suggestion: "Gm9",
    suggestionRole: "passing",
    key: "F Major",
    nextChord: "C13",
  },
  {
    start: 12,
    end: 18,
    original: "C",
    suggestion: "C13",
    suggestionRole: "passing",
    key: "F Major",
    nextChord: "Fmaj9",
  },
  {
    start: 18,
    end: 24,
    original: "F",
    suggestion: "Fmaj9",
    suggestionRole: "target",
    key: "F Major",
    nextChord: "G",
  },
  {
    start: 24,
    end: 30,
    original: "F",
    suggestion: null,
    suggestionRole: null,
    key: "F Major",
    nextChord: "G",
    modulation: {
      fromKey: "F Major",
      toKey: "G Major",
      time: 30,
    },
  },
  {
    start: 30,
    end: 36,
    original: "G",
    suggestion: "Gmaj9",
    suggestionRole: "current",
    key: "G Major",
    nextChord: "Am9",
  },
  {
    start: 36,
    end: 42,
    original: "Am",
    suggestion: "Am9",
    suggestionRole: "passing",
    key: "G Major",
    nextChord: "D13",
  },
  {
    start: 42,
    end: 48,
    original: "D",
    suggestion: "D13",
    suggestionRole: "passing",
    key: "G Major",
    nextChord: "Gmaj9",
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

export default function PerformanceMode({
  onBack,
  onAnalyzeAnother,
}: PerformanceModeProps) {
  const [position, setPosition] =
    useState(0);

  const [isPlaying, setIsPlaying] =
    useState(false);

  useEffect(() => {
    if (!isPlaying) {
      return;
    }

    const interval = window.setInterval(
      () => {
        setPosition((current) => {
          const nextPosition =
            current + 0.2;

          if (nextPosition >= duration) {
            setIsPlaying(false);
            return duration;
          }

          return nextPosition;
        });
      },
      200,
    );

    return () => {
      window.clearInterval(interval);
    };
  }, [isPlaying]);

  const currentIndex = useMemo(() => {
    const index = timeline.findIndex(
      (event) =>
        position >= event.start
        && position < event.end,
    );

    if (index >= 0) {
      return index;
    }

    return timeline.length - 1;
  }, [position]);

  const currentEvent =
    timeline[currentIndex];

  const nextEvent =
    timeline[currentIndex + 1] ?? null;

  const progress =
    (position / duration) * 100;

  const secondsUntilNext =
    nextEvent
      ? Math.max(
          0,
          nextEvent.start - position,
        )
      : 0;

  const modulation =
    currentEvent.modulation;

  const secondsUntilModulation =
    modulation
      ? Math.max(
          0,
          modulation.time - position,
        )
      : null;

  function togglePlayback() {
    if (position >= duration) {
      setPosition(0);
      setIsPlaying(true);
      return;
    }

    setIsPlaying((current) => !current);
  }

  function restart() {
    setPosition(0);
    setIsPlaying(false);
  }

  function seekTo(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    setPosition(
      Number(event.target.value),
    );
  }

  return (
    <section className="performance-page">
      <div className="performance-toolbar">
        <button
          type="button"
          className="back-button"
          onClick={onBack}
        >
          ← Back to results
        </button>

        <button
          type="button"
          className="text-button"
          onClick={onAnalyzeAnother}
        >
          Analyze another song
        </button>
      </div>

      <header className="performance-heading">
        <div>
          <p className="card-kicker">
            LIVE PERFORMANCE
          </p>

          <h2>Play with Harmivo</h2>

          <p>
            Follow one clear musical path
            while Harmivo prepares you for
            each upcoming change.
          </p>
        </div>

        <div className="performance-status">
          <span
            className={
              isPlaying
                ? "performance-live-dot performance-live-dot-active"
                : "performance-live-dot"
            }
          />

          <span>
            {isPlaying
              ? "Playing"
              : "Paused"}
          </span>
        </div>
      </header>

      <div className="performance-layout">
        <section className="performance-main-card">
          <div className="performance-key-row">
            <div>
              <small>CURRENT KEY</small>
              <strong>
                {currentEvent.key}
              </strong>
            </div>

            <div>
              <small>PLAYBACK</small>
              <strong>
                {formatTime(position)}
              </strong>
            </div>
          </div>

          <div className="performance-now">
            <p>PLAY NOW</p>

            <strong>
              {currentEvent.suggestion
                ?? currentEvent.original}
            </strong>

            <span>
              {currentEvent.suggestionRole
                === "passing"
                ? "Passing chord"
                : currentEvent.suggestionRole
                    === "target"
                  ? "Target harmony"
                  : currentEvent.suggestion
                    ? "Suggested harmony"
                    : "Original harmony"}
            </span>
          </div>

          <div className="performance-path">
            <div>
              <small>ORIGINAL</small>
              <strong>
                {currentEvent.original}
              </strong>
            </div>

            <span className="performance-path-line">
              →
            </span>

            <div>
              <small>NEXT</small>
              <strong>
                {nextEvent?.suggestion
                  ?? currentEvent.nextChord
                  ?? "End"}
              </strong>
            </div>
          </div>

          {nextEvent && (
            <div className="performance-countdown-card">
              <span>Prepare next change</span>

              <strong>
                {secondsUntilNext.toFixed(1)}s
              </strong>
            </div>
          )}

          {modulation && (
            <div className="modulation-warning-card">
              <span className="modulation-icon">
                ↗
              </span>

              <div>
                <small>
                  MODULATION AHEAD
                </small>

                <strong>
                  {modulation.fromKey}
                  {" → "}
                  {modulation.toKey}
                </strong>
              </div>

              <span>
                {secondsUntilModulation?.toFixed(
                  1,
                )}
                s
              </span>
            </div>
          )}
        </section>

        <aside className="performance-side-panel">
          <div className="performance-side-heading">
            <p className="card-kicker">
              UPCOMING JOURNEY
            </p>

            <h3>Next movements</h3>
          </div>

          <div className="performance-queue">
            {timeline
              .slice(
                currentIndex,
                currentIndex + 4,
              )
              .map((event, index) => (
                <article
                  key={`${event.start}-${event.original}`}
                  className={
                    index === 0
                      ? "queue-item queue-item-active"
                      : "queue-item"
                  }
                >
                  <span>
                    {index === 0
                      ? "NOW"
                      : `+${Math.max(
                          0,
                          event.start
                          - position,
                        ).toFixed(1)}s`}
                  </span>

                  <div>
                    <strong>
                      {event.suggestion
                        ?? event.original}
                    </strong>

                    <small>
                      {event.suggestionRole
                        === "passing"
                        ? "Passing"
                        : event.suggestionRole
                            === "target"
                          ? "Target"
                          : "Current"}
                    </small>
                  </div>
                </article>
              ))}
          </div>
        </aside>
      </div>

      <section className="performance-player">
        <div className="performance-player-controls">
          <button
            type="button"
            className="player-secondary-button"
            onClick={restart}
          >
            ↺
            <span className="sr-only">
              Restart
            </span>
          </button>

          <button
            type="button"
            className="player-main-button"
            onClick={togglePlayback}
          >
            {isPlaying ? "❚❚" : "▶"}
          </button>

          <div className="player-time">
            <span>
              {formatTime(position)}
            </span>

            <span>
              {formatTime(duration)}
            </span>
          </div>
        </div>

        <input
          className="performance-seek"
          type="range"
          min="0"
          max={duration}
          step="0.1"
          value={position}
          onChange={seekTo}
          aria-label="Playback position"
        />

        <div className="performance-progress-track">
          <span
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

        <div className="performance-timeline">
          {timeline.map((event) => (
            <button
              key={`${event.start}-${event.original}`}
              type="button"
              className={
                position >= event.start
                && position < event.end
                  ? "timeline-chord timeline-chord-active"
                  : "timeline-chord"
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
                {event.suggestion
                  ?? event.original}
              </strong>

              <small>
                {formatTime(event.start)}
              </small>
            </button>
          ))}
        </div>
      </section>
    </section>
  );
}
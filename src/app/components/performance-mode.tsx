"use client";

import {
  ChangeEvent,
  useEffect,
  useMemo,
  useState,
} from "react";

import { mockSongIntelligence } from "../data/mock-song-intelligence";

type PerformanceModeProps = {
  onBack: () => void;
  onAnalyzeAnother: () => void;
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

export default function PerformanceMode({
  onBack,
  onAnalyzeAnother,
}: PerformanceModeProps) {
  const song = mockSongIntelligence;

  const duration =
    song.metadata.duration;

  const chordEvents =
    song.chords;

  const performancePath =
    song.performancePaths[0] ?? null;

  const [position, setPosition] =
    useState(0);

  const [isPlaying, setIsPlaying] =
    useState(false);

  useEffect(() => {
    if (!isPlaying) {
      return;
    }

    const interval =
      window.setInterval(() => {
        setPosition((current) => {
          const nextPosition =
            current + 0.2;

          if (
            nextPosition >= duration
          ) {
            setIsPlaying(false);
            return duration;
          }

          return nextPosition;
        });
      }, 200);

    return () => {
      window.clearInterval(interval);
    };
  }, [
    duration,
    isPlaying,
  ]);

  const currentChordIndex =
    useMemo(() => {
      const index =
        chordEvents.findIndex(
          (event) =>
            position >= event.start
            && position < event.end,
        );

      if (index >= 0) {
        return index;
      }

      return chordEvents.length - 1;
    }, [
      chordEvents,
      position,
    ]);

  const currentChord =
    chordEvents[currentChordIndex];

  const nextChord =
    chordEvents[
      currentChordIndex + 1
    ] ?? null;

  const currentRegion =
    useMemo(() => {
      return (
        song.keyRegions.find(
          (region) =>
            position >= region.start
            && position < region.end,
        )
        ?? song.keyRegions[
          song.keyRegions.length - 1
        ]
      );
    }, [
      position,
      song.keyRegions,
    ]);

  const currentPhrase =
    useMemo(() => {
      return (
        song.phrases.find(
          (phrase) =>
            position >= phrase.start
            && position < phrase.end,
        )
        ?? song.phrases[
          song.phrases.length - 1
        ]
      );
    }, [
      position,
      song.phrases,
    ]);

  const currentPerformanceStep =
    useMemo(() => {
      if (!performancePath) {
        return null;
      }

      return (
        performancePath.steps.find(
          (step) =>
            position >= step.start
            && position < step.end,
        )
        ?? null
      );
    }, [
      performancePath,
      position,
    ]);

  const nextPerformanceStep =
    useMemo(() => {
      if (!performancePath) {
        return null;
      }

      return (
        performancePath.steps.find(
          (step) =>
            step.start > position,
        )
        ?? null
      );
    }, [
      performancePath,
      position,
    ]);

  const nextModulation =
    useMemo(() => {
      return (
        song.modulations.find(
          (modulation) =>
            modulation.time
            > position,
        )
        ?? null
      );
    }, [
      position,
      song.modulations,
    ]);

  const displayedChord =
    currentPerformanceStep?.chord
    ?? currentChord.chord;

  const displayedRole =
    currentPerformanceStep?.role
    ?? (
      currentChord.isPassingChord
        ? "passing"
        : "current"
    );

  const upcomingChord =
    nextPerformanceStep?.chord
    ?? nextChord?.chord
    ?? null;

  const nextChangeTime =
    nextPerformanceStep?.start
    ?? nextChord?.start
    ?? duration;

  const secondsUntilNext =
    Math.max(
      0,
      nextChangeTime - position,
    );

  const secondsUntilModulation =
    nextModulation
      ? Math.max(
          0,
          nextModulation.time
          - position,
        )
      : null;

  const progress =
    duration > 0
      ? (
        position / duration
      ) * 100
      : 0;

  const upcomingJourney =
    useMemo(() => {
      if (
        performancePath
        && performancePath.steps.length
      ) {
        return performancePath.steps
          .filter(
            (step) =>
              step.end > position,
          )
          .slice(0, 4)
          .map((step) => ({
            id: step.id,
            start: step.start,
            chord: step.chord,
            role: step.role,
            confidence:
              step.confidence,
          }));
      }

      return chordEvents
        .filter(
          (event) =>
            event.end > position,
        )
        .slice(0, 4)
        .map((event) => ({
          id: event.id,
          start: event.start,
          chord: event.chord,
          role: event.isPassingChord
            ? "passing"
            : "current",
          confidence:
            event.confidence,
        }));
    }, [
      chordEvents,
      performancePath,
      position,
    ]);

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
  }

  function seekTo(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    setPosition(
      Number(event.target.value),
    );
  }

  function getRoleLabel(
    role:
      | "current"
      | "passing"
      | "target"
      | "substitution"
      | "colour"
      | null,
  ) {
    if (role === "passing") {
      return "Passing chord";
    }

    if (role === "target") {
      return "Target harmony";
    }

    if (role === "substitution") {
      return "Substitution";
    }

    if (role === "colour") {
      return "Colour harmony";
    }

    return currentPerformanceStep
      ? "Suggested harmony"
      : "Original harmony";
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

          <h2>
            Play with Harmivo
          </h2>

          <p>
            Follow one clear musical
            path while Harmivo prepares
            you for each upcoming
            change.
          </p>
        </div>

        <div className="performance-status">
          <span
            className={
              isPlaying
                ? (
                  "performance-live-dot "
                  + "performance-live-dot-active"
                )
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
              <small>
                CURRENT KEY
              </small>

              <strong>
                {currentRegion.key}
              </strong>
            </div>

            <div>
              <small>
                SONG SECTION
              </small>

              <strong>
                {currentPhrase.label}
              </strong>
            </div>

            <div>
              <small>
                PLAYBACK
              </small>

              <strong>
                {formatTime(position)}
              </strong>
            </div>
          </div>

          <div className="performance-now">
            <p>PLAY NOW</p>

            <strong>
              {displayedChord}
            </strong>

            <span>
              {getRoleLabel(
                displayedRole,
              )}
            </span>
          </div>

          <div className="performance-path">
            <div>
              <small>
                ORIGINAL
              </small>

              <strong>
                {currentChord.chord}
              </strong>
            </div>

            <span className="performance-path-line">
              →
            </span>

            <div>
              <small>
                NEXT
              </small>

              <strong>
                {upcomingChord
                  ?? "End"}
              </strong>
            </div>
          </div>

          {upcomingChord && (
            <div className="performance-countdown-card">
              <span>
                Prepare next change
              </span>

              <strong>
                {secondsUntilNext.toFixed(
                  1,
                )}
                s
              </strong>
            </div>
          )}

          {nextModulation && (
            <div className="modulation-warning-card">
              <span className="modulation-icon">
                ↗
              </span>

              <div>
                <small>
                  MODULATION AHEAD
                </small>

                <strong>
                  {nextModulation.fromKey}
                  {" → "}
                  {nextModulation.toKey}
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

            <h3>
              Next movements
            </h3>
          </div>

          <div className="performance-queue">
            {upcomingJourney.map(
              (event, index) => {
                const isNow =
                  position
                  >= event.start;

                return (
                  <article
                    key={event.id}
                    className={
                      index === 0
                        ? (
                          "queue-item "
                          + "queue-item-active"
                        )
                        : "queue-item"
                    }
                  >
                    <span>
                      {isNow
                        ? "NOW"
                        : `+${Math.max(
                            0,
                            event.start
                            - position,
                          ).toFixed(1)}s`}
                    </span>

                    <div>
                      <strong>
                        {event.chord}
                      </strong>

                      <small>
                        {event.role
                          === "passing"
                          ? "Passing"
                          : event.role
                              === "target"
                            ? "Target"
                            : event.role
                                === "substitution"
                              ? "Substitution"
                              : event.role
                                  === "colour"
                                ? "Colour"
                                : "Current"}
                      </small>
                    </div>
                  </article>
                );
              },
            )}
          </div>

          {performancePath && (
            <div className="performance-path-summary">
              <p className="card-kicker">
                SELECTED PATH
              </p>

              <strong>
                {performancePath.name}
              </strong>

              <small>
                {performancePath.style}
                {" • "}
                {performancePath.difficulty}
                {" • "}
                {Math.round(
                  performancePath.confidence
                  * 100,
                )}
                % match
              </small>
            </div>
          )}
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
            {isPlaying
              ? "❚❚"
              : "▶"}
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
          aria-label={
            "Playback position"
          }
        />

        <div className="performance-progress-track">
          <span
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

        <div className="performance-timeline">
          {chordEvents.map(
            (event) => {
              const isActive =
                currentChord.id
                === event.id;

              return (
                <button
                  key={event.id}
                  type="button"
                  className={
                    isActive
                      ? (
                        "timeline-chord "
                        + "timeline-chord-active"
                      )
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
                    setPosition(
                      event.start,
                    );
                  }}
                >
                  <strong>
                    {event.chord}
                  </strong>

                  <small>
                    {formatTime(
                      event.start,
                    )}
                  </small>
                </button>
              );
            },
          )}
        </div>
      </section>
    </section>
  );
}
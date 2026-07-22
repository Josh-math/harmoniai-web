"use client";

import {
  ChangeEvent,
  useMemo,
  useState,
} from "react";

import { mockSongIntelligence } from "../data/mock-song-intelligence";

type InteractiveAnalysisProps = {
  fileName: string;
  onBack: () => void;
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

  const modulation =
    song.modulations[0] ?? null;

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
          <small>
            AT {formatTime(position)}
          </small>

          <strong>
            {displayMode === "chords"
              ? currentChord.chord
              : currentChord.roman}
          </strong>

          <span>
            {currentChord.status
              === "confirmed"
              ? "Confirmed"
              : currentChord.status
                === "estimated"
                ? "Estimated"
                : "Withheld"}
          </span>
        </article>

        <article className="analysis-overview-card">
          <small>CURRENT KEY</small>

          <strong>
            {currentRegion.key}
          </strong>

          <span>
            Regional tonal centre
          </span>
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

          {modulation ? (
            <>
              <strong>
                {formatTime(
                  modulation.time,
                )}
              </strong>

              <span>
                {modulation.fromKey}
                {" → "}
                {modulation.toKey}
              </span>
            </>
          ) : (
            <>
              <strong>None</strong>

              <span>
                No confirmed modulation
              </span>
            </>
          )}
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

        <div className="chord-event-track">
          {chordEvents.map((event) => {
            const isActive =
              currentChord.id
              === event.id;

            let className =
              "analysis-chord-event";

            if (isActive) {
              className +=
                " analysis-chord-event-active";
            } else if (
              event.status === "estimated"
            ) {
              className +=
                " analysis-chord-event-estimated";
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

        <div className="phrase-region-track">
          {phraseRegions.map((phrase) => {
            const isActive =
              currentPhrase.id
              === phrase.id;

            return (
              <button
                key={phrase.id}
                type="button"
                className={
                  isActive
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
                  setPosition(
                    phrase.start,
                  );
                }}
              >
                {phrase.label}
              </button>
            );
          })}
        </div>
      </section>

      <section className="analysis-detail-grid">
        <article className="analysis-detail-card">
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

          <div className="tonal-journey-list">
            {keyRegions.map(
              (region, index) => {
                const isActive =
                  currentRegion.id
                  === region.id;

                return (
                  <div
                    key={region.id}
                    className={
                      isActive
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
                        {" • "}
                        {Math.round(
                          region.confidence
                          * 100,
                        )}
                        % confidence
                      </small>
                    </div>
                  </div>
                );
              },
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
                  : currentChord.status
                    === "estimated"
                    ? "Estimated"
                    : "Withheld"}
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

            <div>
              <dt>Musical role</dt>

              <dd>
                {currentChord.isPassingChord
                  ? "Passing chord"
                  : "Structural chord"}
              </dd>
            </div>
          </dl>
        </article>
      </section>
    </section>
  );
}
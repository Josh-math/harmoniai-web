"use client";

import {
  useMemo,
  useState,
} from "react";

import { mockSongIntelligence } from "../mock";

type ReharmonizationStudioProps = {
  onBack: () => void;
  onOpenPerformance: () => void;
};

type StyleOption =
  | "Original"
  | "Gospel"
  | "Worship"
  | "Jazz"
  | "Neo Soul"
  | "Pop";

type ComplexityOption =
  | "Safe"
  | "Rich"
  | "Professional";

type ReharmonizationOption = {
  id: string;
  title: string;
  style: StyleOption;
  complexity: ComplexityOption;
  confidence: number;
  effect: string;
  chords: string[];
};

const styleOptions: StyleOption[] = [
  "Original",
  "Gospel",
  "Worship",
  "Jazz",
  "Neo Soul",
  "Pop",
];

const complexityOptions: ComplexityOption[] = [
  "Safe",
  "Rich",
  "Professional",
];

const reharmonizationOptions: ReharmonizationOption[] = [
  {
    id: "original-safe",
    title: "Original Resolution",
    style: "Original",
    complexity: "Safe",
    confidence: 0.98,
    effect: "Preserves the song’s original harmonic movement.",
    chords: [
      "Gm",
      "C",
      "F",
    ],
  },
  {
    id: "gospel-safe",
    title: "Extended Gospel Resolution",
    style: "Gospel",
    complexity: "Safe",
    confidence: 0.94,
    effect: "Adds gentle gospel colour without changing the movement.",
    chords: [
      "Gm7",
      "C7",
      "Fmaj7",
    ],
  },
  {
    id: "gospel-rich",
    title: "Gospel ii–V–I Expansion",
    style: "Gospel",
    complexity: "Rich",
    confidence: 0.9456,
    effect: "Creates a fuller dominant-to-tonic resolution.",
    chords: [
      "Gm9",
      "C13",
      "Fmaj9",
    ],
  },
  {
    id: "gospel-professional",
    title: "Secondary Dominant Turnaround",
    style: "Gospel",
    complexity: "Professional",
    confidence: 0.8931,
    effect: "Builds momentum with a longer professional turnaround.",
    chords: [
      "Dm7",
      "G7",
      "Gm9",
      "C13",
      "Fmaj9",
    ],
  },
  {
    id: "worship-safe",
    title: "Open Worship Resolution",
    style: "Worship",
    complexity: "Safe",
    confidence: 0.91,
    effect: "Keeps the harmony open, spacious, and easy to play.",
    chords: [
      "Gm7",
      "Csus4",
      "Fadd9",
    ],
  },
  {
    id: "worship-rich",
    title: "Suspended Worship Lift",
    style: "Worship",
    complexity: "Rich",
    confidence: 0.89,
    effect: "Adds suspended movement before the final resolution.",
    chords: [
      "Gm9",
      "Bb/C",
      "C13sus",
      "Fmaj9",
    ],
  },
  {
    id: "jazz-safe",
    title: "Jazz Extension Path",
    style: "Jazz",
    complexity: "Safe",
    confidence: 0.9,
    effect: "Introduces tasteful seventh and ninth extensions.",
    chords: [
      "Gm9",
      "C9",
      "Fmaj9",
    ],
  },
  {
    id: "jazz-rich",
    title: "Chromatic Jazz Resolution",
    style: "Jazz",
    complexity: "Rich",
    confidence: 0.87,
    effect: "Uses chromatic dominant colour for a stronger arrival.",
    chords: [
      "Gm11",
      "Db13",
      "C13",
      "Fmaj9",
    ],
  },
  {
    id: "jazz-professional",
    title: "Tritone Resolution",
    style: "Jazz",
    complexity: "Professional",
    confidence: 0.84,
    effect: "Creates high tension through tritone substitution.",
    chords: [
      "Gm9",
      "Db13",
      "Fmaj9",
    ],
  },
  {
    id: "neo-soul-safe",
    title: "Neo Soul Colour Path",
    style: "Neo Soul",
    complexity: "Safe",
    confidence: 0.92,
    effect: "Adds smooth extensions while preserving the progression.",
    chords: [
      "Gm9",
      "C13sus",
      "Fmaj9",
    ],
  },
  {
    id: "neo-soul-rich",
    title: "Minor IV Colour Movement",
    style: "Neo Soul",
    complexity: "Rich",
    confidence: 0.9,
    effect: "Adds emotional chromatic colour before returning home.",
    chords: [
      "Bbmaj9",
      "Bbm9",
      "F/A",
      "Fmaj9",
    ],
  },
  {
    id: "neo-soul-professional",
    title: "Chromatic Neo Soul Journey",
    style: "Neo Soul",
    complexity: "Professional",
    confidence: 0.86,
    effect: "Creates a sophisticated descending voice-leading path.",
    chords: [
      "Gm9",
      "Gbmaj7",
      "Fmaj9",
      "E7alt",
      "Fmaj9",
    ],
  },
  {
    id: "pop-safe",
    title: "Clean Pop Resolution",
    style: "Pop",
    complexity: "Safe",
    confidence: 0.95,
    effect: "Keeps the movement simple, familiar, and accessible.",
    chords: [
      "Gm",
      "C",
      "F",
    ],
  },
  {
    id: "pop-rich",
    title: "Modern Pop Colour",
    style: "Pop",
    complexity: "Rich",
    confidence: 0.88,
    effect: "Adds modern suspended and add-note colour.",
    chords: [
      "Gm7",
      "Csus2",
      "Fadd9",
    ],
  },
];

export default function ReharmonizationStudio({
  onBack,
  onOpenPerformance,
}: ReharmonizationStudioProps) {
  const song = mockSongIntelligence;

  const [selectedStyle, setSelectedStyle] =
    useState<StyleOption>("Gospel");

  const [selectedComplexity, setSelectedComplexity] =
    useState<ComplexityOption>("Rich");

  const [selectedOptionId, setSelectedOptionId] =
    useState<string | null>("gospel-rich");

  const availableOptions = useMemo(() => {
    return reharmonizationOptions.filter(
      (option) =>
        option.style === selectedStyle
        && option.complexity === selectedComplexity,
    );
  }, [
    selectedComplexity,
    selectedStyle,
  ]);

  const selectedOption = useMemo(() => {
    return (
      availableOptions.find(
        (option) =>
          option.id === selectedOptionId,
      )
      ?? availableOptions[0]
      ?? null
    );
  }, [
    availableOptions,
    selectedOptionId,
  ]);

  function selectStyle(style: StyleOption) {
    setSelectedStyle(style);

    const nextOption =
      reharmonizationOptions.find(
        (option) =>
          option.style === style
          && option.complexity === selectedComplexity,
      );

    setSelectedOptionId(
      nextOption?.id ?? null,
    );
  }

  function selectComplexity(
    complexity: ComplexityOption,
  ) {
    setSelectedComplexity(complexity);

    const nextOption =
      reharmonizationOptions.find(
        (option) =>
          option.style === selectedStyle
          && option.complexity === complexity,
      );

    setSelectedOptionId(
      nextOption?.id ?? null,
    );
  }

  return (
    <section className="reharmonization-page">
      <div className="reharmonization-toolbar">
        <button
          type="button"
          className="back-button"
          onClick={onBack}
        >
          ← Back to dashboard
        </button>

        <button
          type="button"
          className="primary-button"
          onClick={onOpenPerformance}
        >
          Open performance mode
        </button>
      </div>

      <header className="reharmonization-heading">
        <div>
          <p className="card-kicker">
            REHARMONIZATION STUDIO
          </p>

          <h2>
            Play another possibility
          </h2>

          <p>
            Explore alternative harmonic
            treatments shaped around your
            style, skill, and musical taste.
          </p>
        </div>

        <div className="reharmonization-profile">
          <span>
            {song.musicianProfile.instrument}
          </span>

          <span>
            {song.musicianProfile.skillLevel}
          </span>
        </div>
      </header>

      <section className="reharmonization-controls">
        <div>
          <p className="card-kicker">
            MUSICAL STYLE
          </p>

          <div className="reharmonization-option-row">
            {styleOptions.map((style) => (
              <button
                key={style}
                type="button"
                className={
                  selectedStyle === style
                    ? "reharmonization-choice reharmonization-choice-active"
                    : "reharmonization-choice"
                }
                onClick={() => {
                  selectStyle(style);
                }}
              >
                {style}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="card-kicker">
            COMPLEXITY
          </p>

          <div className="reharmonization-option-row">
            {complexityOptions.map(
              (complexity) => (
                <button
                  key={complexity}
                  type="button"
                  className={
                    selectedComplexity
                    === complexity
                      ? "reharmonization-choice reharmonization-choice-active"
                      : "reharmonization-choice"
                  }
                  onClick={() => {
                    selectComplexity(
                      complexity,
                    );
                  }}
                >
                  {complexity}
                </button>
              ),
            )}
          </div>
        </div>
      </section>

      <div className="reharmonization-layout">
        <aside className="reharmonization-original-card">
          <p className="card-kicker">
            ORIGINAL MOMENT
          </p>

          <h3>
            Original harmony
          </h3>

          <div className="reharmonization-original-path">
            <strong>Gm</strong>
            <span>→</span>
            <strong>C</strong>
            <span>→</span>
            <strong>F</strong>
          </div>

          <dl className="reharmonization-original-details">
            <div>
              <dt>Key</dt>
              <dd>F Major</dd>
            </div>

            <div>
              <dt>Roman numerals</dt>
              <dd>ii → V → I</dd>
            </div>

            <div>
              <dt>Song moment</dt>
              <dd>0:32 – 0:58</dd>
            </div>
          </dl>
        </aside>

        <section className="reharmonization-result-card">
          {selectedOption ? (
            <>
              <div className="reharmonization-result-heading">
                <div>
                  <p className="card-kicker">
                    HARMIVO SUGGESTION
                  </p>

                  <h3>
                    {selectedOption.title}
                  </h3>
                </div>

                <span className="level-pill">
                  {selectedOption.complexity}
                </span>
              </div>

              <div className="reharmonization-path">
                {selectedOption.chords.map(
                  (chord, index) => (
                    <div
                      key={`${chord}-${index}`}
                    >
                      <strong>
                        {chord}
                      </strong>

                      {index
                        < selectedOption.chords.length
                          - 1 && (
                          <span>→</span>
                        )}
                    </div>
                  ),
                )}
              </div>

              <div className="reharmonization-result-meta">
                <article>
                  <small>STYLE</small>
                  <strong>
                    {selectedOption.style}
                  </strong>
                </article>

                <article>
                  <small>MATCH</small>
                  <strong>
                    {Math.round(
                      selectedOption.confidence
                      * 100,
                    )}
                    %
                  </strong>
                </article>

                <article>
                  <small>LEVEL</small>
                  <strong>
                    {selectedOption.complexity}
                  </strong>
                </article>
              </div>

              <div className="reharmonization-effect">
                <small>MUSICAL EFFECT</small>

                <p>
                  {selectedOption.effect}
                </p>
              </div>

              <div className="reharmonization-actions">
                <button
                  type="button"
                  className="primary-button"
                  onClick={onOpenPerformance}
                >
                  Use in performance
                </button>

                <button
                  type="button"
                  className="secondary-button"
                >
                  Practise this path
                </button>
              </div>
            </>
          ) : (
            <div className="reharmonization-empty">
              <span>✦</span>

              <h3>
                No matching path yet
              </h3>

              <p>
                This style and complexity
                combination does not yet have
                a safe suggestion.
              </p>
            </div>
          )}
        </section>
      </div>

      <section className="reharmonization-comparison">
        <div>
          <p className="card-kicker">
            SIDE-BY-SIDE
          </p>

          <h3>
            Compare the movement
          </h3>
        </div>

        <div className="reharmonization-comparison-grid">
          <article>
            <small>ORIGINAL</small>
            <strong>
              Gm → C → F
            </strong>
          </article>

          <span>versus</span>

          <article>
            <small>HARMIVO</small>
            <strong>
              {selectedOption
                ? selectedOption.chords.join(
                    " → ",
                  )
                : "No suggestion"}
            </strong>
          </article>
        </div>
      </section>
    </section>
  );
}
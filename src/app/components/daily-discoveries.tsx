"use client";

import {
  useMemo,
  useState,
} from "react";

import {
  useHarmivo,
} from "../context/harmivo-context";

type DailyDiscoveriesProps = {
  onBack: () => void;
  onOpenTechniqueLab: () => void;
  onOpenPerformance: () => void;
};

type DiscoveryCategory =
  | "All"
  | "Harmony"
  | "Keyboard"
  | "Guitar"
  | "Rhythm";

type Discovery = {
  id: string;
  title: string;
  category: Exclude<
    DiscoveryCategory,
    "All"
  >;
  difficulty:
    | "Beginner"
    | "Intermediate"
    | "Advanced"
    | "Professional";
  duration: number;
  description: string;
  path: string[];
  instrument:
    | "Keyboard"
    | "Guitar"
    | "Both";
  style: string;
  isOriginal: boolean;
};

const discoveryCategories: DiscoveryCategory[] = [
  "All",
  "Harmony",
  "Keyboard",
  "Guitar",
  "Rhythm",
];

const discoveries: Discovery[] = [
  {
    id: "discovery-1",
    title: "Minor IV Colour Movement",
    category: "Harmony",
    difficulty: "Intermediate",
    duration: 5,
    description:
      "Introduce emotional colour by moving from the major IV chord to its minor form before resolving home.",
    path: [
      "Bbmaj9",
      "Bbm9",
      "Fmaj9",
    ],
    instrument: "Both",
    style: "Gospel / Neo Soul",
    isOriginal: false,
  },
  {
    id: "discovery-2",
    title: "Reverse Chromatic Lift",
    category: "Keyboard",
    difficulty: "Advanced",
    duration: 8,
    description:
      "A Harmivo-generated movement that approaches the target harmony through descending upper structures.",
    path: [
      "Gm9",
      "Gbmaj7",
      "Fmaj9",
    ],
    instrument: "Keyboard",
    style: "Neo Soul",
    isOriginal: true,
  },
  {
    id: "discovery-3",
    title: "Diminished Dominant Approach",
    category: "Harmony",
    difficulty: "Advanced",
    duration: 7,
    description:
      "Use a diminished passing chord to intensify the movement into a dominant or tonic chord.",
    path: [
      "Dm7",
      "Db°7",
      "C13",
      "Fmaj9",
    ],
    instrument: "Both",
    style: "Gospel / Jazz",
    isOriginal: false,
  },
  {
    id: "discovery-4",
    title: "Open String Voice Leading",
    category: "Guitar",
    difficulty: "Intermediate",
    duration: 6,
    description:
      "Preserve ringing open strings while the inner chord voices move smoothly.",
    path: [
      "G",
      "G/B",
      "Cadd9",
      "Dsus4",
    ],
    instrument: "Guitar",
    style: "Worship / Pop",
    isOriginal: false,
  },
  {
    id: "discovery-5",
    title: "Anticipated Chord Push",
    category: "Rhythm",
    difficulty: "Intermediate",
    duration: 4,
    description:
      "Play the next harmony slightly before the strong beat to add forward movement and energy.",
    path: [
      "F",
      "Gm7",
      "C7",
      "F",
    ],
    instrument: "Both",
    style: "Gospel / Pop",
    isOriginal: false,
  },
  {
    id: "discovery-6",
    title: "Suspended Resolution Fold",
    category: "Keyboard",
    difficulty: "Professional",
    duration: 10,
    description:
      "A Harmivo-generated suspended dominant movement with compact inner voice resolution.",
    path: [
      "Gm11",
      "Bb/C",
      "C13sus",
      "C13",
      "Fmaj9",
    ],
    instrument: "Keyboard",
    style: "Gospel / Worship",
    isOriginal: true,
  },
];

function getTodayLabel() {
  return new Intl.DateTimeFormat(
    "en",
    {
      weekday: "long",
      month: "long",
      day: "numeric",
    },
  ).format(new Date());
}

export default function DailyDiscoveries({
  onBack,
  onOpenTechniqueLab,
  onOpenPerformance,
}: DailyDiscoveriesProps) {
  const {
    musicianProfile,
  } = useHarmivo();

  const [
    activeCategory,
    setActiveCategory,
  ] = useState<DiscoveryCategory>("All");

  const [
    selectedDiscoveryId,
    setSelectedDiscoveryId,
  ] = useState(
    discoveries[0].id,
  );

  const [
    savedDiscoveryIds,
    setSavedDiscoveryIds,
  ] = useState<string[]>([]);

  const filteredDiscoveries =
    useMemo(() => {
      if (
        activeCategory === "All"
      ) {
        return discoveries;
      }

      return discoveries.filter(
        (discovery) =>
          discovery.category
          === activeCategory,
      );
    }, [
      activeCategory,
    ]);

  const selectedDiscovery =
    useMemo(() => {
      return (
        filteredDiscoveries.find(
          (discovery) =>
            discovery.id
            === selectedDiscoveryId,
        )
        ?? filteredDiscoveries[0]
        ?? null
      );
    }, [
      filteredDiscoveries,
      selectedDiscoveryId,
    ]);

  function selectCategory(
    category: DiscoveryCategory,
  ) {
    setActiveCategory(category);

    const firstMatchingDiscovery =
      category === "All"
        ? discoveries[0]
        : discoveries.find(
            (discovery) =>
              discovery.category
              === category,
          );

    setSelectedDiscoveryId(
      firstMatchingDiscovery?.id
      ?? "",
    );
  }

  function toggleSaved(
    discoveryId: string,
  ) {
    setSavedDiscoveryIds(
      (currentIds) =>
        currentIds.includes(
          discoveryId,
        )
          ? currentIds.filter(
              (id) =>
                id !== discoveryId,
            )
          : [
              ...currentIds,
              discoveryId,
            ],
    );
  }

  return (
    <section className="discoveries-page">
      <div className="discoveries-toolbar">
        <button
          type="button"
          className="back-button"
          onClick={onBack}
        >
          ← Back
        </button>

        <button
          type="button"
          className="primary-button"
          onClick={onOpenTechniqueLab}
        >
          Open Technique Lab
        </button>
      </div>

      <header className="discoveries-heading">
        <div>
          <p className="card-kicker">
            DAILY DISCOVERIES
          </p>

          <h2>
            Find something new to play
          </h2>

          <p>
            Explore fresh musical ideas,
            reusable movements, and
            Harmivo-generated concepts
            selected for your growth.
          </p>
        </div>

        <div className="discoveries-date-card">
          <small>TODAY</small>

          <strong>
            {getTodayLabel()}
          </strong>

          <span>
            Personalized for{" "}
            {
              musicianProfile.instrument
            }
          </span>
        </div>
      </header>

      <section className="discoveries-summary-grid">
        <article className="discovery-summary-card discovery-summary-primary">
          <small>
            AVAILABLE TODAY
          </small>

          <strong>
            {discoveries.length}
          </strong>

          <span>
            Musical discoveries
          </span>
        </article>

        <article className="discovery-summary-card">
          <small>
            HARMIVO ORIGINALS
          </small>

          <strong>
            {
              discoveries.filter(
                (discovery) =>
                  discovery.isOriginal,
              ).length
            }
          </strong>

          <span>
            Newly generated concepts
          </span>
        </article>

        <article className="discovery-summary-card">
          <small>SAVED</small>

          <strong>
            {
              savedDiscoveryIds.length
            }
          </strong>

          <span>
            Ideas kept for later
          </span>
        </article>

        <article className="discovery-summary-card">
          <small>
            CURRENT STYLE
          </small>

          <strong>
            {
              musicianProfile.style
            }
          </strong>

          <span>
            Profile preference
          </span>
        </article>
      </section>

      <section className="discoveries-category-row">
        {discoveryCategories.map(
          (category) => (
            <button
              key={category}
              type="button"
              className={
                activeCategory
                === category
                  ? "discovery-category discovery-category-active"
                  : "discovery-category"
              }
              onClick={() => {
                selectCategory(
                  category,
                );
              }}
            >
              {category}
            </button>
          ),
        )}
      </section>

      {selectedDiscovery ? (
        <div className="discoveries-layout">
          <aside className="discoveries-list-panel">
            <p className="card-kicker">
              EXPLORE
            </p>

            <div className="discoveries-list">
              {filteredDiscoveries.map(
                (discovery) => {
                  const isActive =
                    selectedDiscovery.id
                    === discovery.id;

                  return (
                    <button
                      key={discovery.id}
                      type="button"
                      className={
                        isActive
                          ? "discovery-list-item discovery-list-item-active"
                          : "discovery-list-item"
                      }
                      onClick={() => {
                        setSelectedDiscoveryId(
                          discovery.id,
                        );
                      }}
                    >
                      <span className="discovery-list-icon">
                        {
                          discovery.category
                          === "Guitar"
                            ? "♩"
                            : discovery.category
                              === "Rhythm"
                              ? "◉"
                              : "♬"
                        }
                      </span>

                      <div>
                        <strong>
                          {
                            discovery.title
                          }
                        </strong>

                        <small>
                          {
                            discovery.difficulty
                          }
                          {" • "}
                          {
                            discovery.duration
                          }
                          {" min"}
                        </small>
                      </div>

                      {discovery.isOriginal && (
                        <span className="discovery-original-badge">
                          Original
                        </span>
                      )}
                    </button>
                  );
                },
              )}
            </div>
          </aside>

          <section className="discovery-focus-card">
            <div className="discovery-focus-heading">
              <div>
                <p className="card-kicker">
                  {
                    selectedDiscovery.isOriginal
                      ? "HARMIVO ORIGINAL"
                      : "TODAY’S DISCOVERY"
                  }
                </p>

                <h3>
                  {
                    selectedDiscovery.title
                  }
                </h3>
              </div>

              <button
                type="button"
                className={
                  savedDiscoveryIds.includes(
                    selectedDiscovery.id,
                  )
                    ? "discovery-save-button discovery-save-button-active"
                    : "discovery-save-button"
                }
                onClick={() => {
                  toggleSaved(
                    selectedDiscovery.id,
                  );
                }}
              >
                {savedDiscoveryIds.includes(
                  selectedDiscovery.id,
                )
                  ? "★ Saved"
                  : "☆ Save"}
              </button>
            </div>

            <div className="discovery-meta-grid">
              <article>
                <small>
                  INSTRUMENT
                </small>

                <strong>
                  {
                    selectedDiscovery.instrument
                  }
                </strong>
              </article>

              <article>
                <small>
                  DIFFICULTY
                </small>

                <strong>
                  {
                    selectedDiscovery.difficulty
                  }
                </strong>
              </article>

              <article>
                <small>STYLE</small>

                <strong>
                  {
                    selectedDiscovery.style
                  }
                </strong>
              </article>

              <article>
                <small>
                  PRACTICE TIME
                </small>

                <strong>
                  {
                    selectedDiscovery.duration
                  }
                  {" min"}
                </strong>
              </article>
            </div>

            <div className="discovery-description">
              <small>
                THE IDEA
              </small>

              <p>
                {
                  selectedDiscovery.description
                }
              </p>
            </div>

            <div className="discovery-practice-area">
              <p className="card-kicker">
                TRY THIS MOVEMENT
              </p>

              <div className="discovery-practice-path">
                {
                  selectedDiscovery.path.map(
                    (
                      chord,
                      index,
                    ) => (
                      <div
                        key={
                          `${chord}-${index}`
                        }
                      >
                        <strong>
                          {chord}
                        </strong>

                        {index
                          < selectedDiscovery
                              .path
                              .length
                              - 1 && (
                            <span>→</span>
                          )}
                      </div>
                    ),
                  )
                }
              </div>
            </div>

            <div className="discovery-actions">
              <button
                type="button"
                className="primary-button"
                onClick={
                  onOpenTechniqueLab
                }
              >
                Practise this concept
              </button>

              <button
                type="button"
                className="secondary-button"
                onClick={
                  onOpenPerformance
                }
              >
                Use in performance
              </button>
            </div>
          </section>
        </div>
      ) : (
        <section className="discovery-empty-state">
          <span>♬</span>

          <h3>
            No discoveries found
          </h3>

          <p>
            Select another category to
            explore more musical ideas.
          </p>
        </section>
      )}

      <section className="daily-challenge-card">
        <div>
          <p className="card-kicker">
            TODAY’S CHALLENGE
          </p>

          <h3>
            Play one movement in three keys
          </h3>

          <p>
            Move the selected concept through
            F Major, G Major, and A Major.
          </p>
        </div>

        <div className="daily-challenge-keys">
          <span>F</span>
          <span>G</span>
          <span>A</span>
        </div>

        <button
          type="button"
          className="secondary-button"
          onClick={
            onOpenTechniqueLab
          }
        >
          Start challenge
        </button>
      </section>
    </section>
  );
}
"use client";

import {
  useMemo,
  useState,
} from "react";

import { mockSongIntelligence } from "../mock";

type TechniqueLabProps = {
  onBack: () => void;
  onOpenPerformance: () => void;
};

export default function TechniqueLab({
  onBack,
  onOpenPerformance,
}: TechniqueLabProps) {
  const song = mockSongIntelligence;

  const techniques =
    song.techniqueOpportunities;

  const [selectedTechniqueId, setSelectedTechniqueId] =
    useState(
      techniques[0]?.id ?? null,
    );

  const selectedTechnique =
    useMemo(() => {
      return (
        techniques.find(
          (technique) =>
            technique.id
            === selectedTechniqueId,
        )
        ?? techniques[0]
        ?? null
      );
    }, [
      selectedTechniqueId,
      techniques,
    ]);

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

  return (
    <section className="technique-lab-page">
      <div className="technique-lab-toolbar">
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

      <header className="technique-lab-heading">
        <div>
          <p className="card-kicker">
            TECHNIQUE LAB
          </p>

          <h2>Grow through the music</h2>

          <p>
            Learn techniques discovered in
            your song and practise them as
            reusable musical ideas.
          </p>
        </div>

        <div className="technique-lab-count">
          <strong>
            {techniques.length}
          </strong>

          <span>
            {techniques.length === 1
              ? "Technique"
              : "Techniques"}
          </span>
        </div>
      </header>

      {selectedTechnique ? (
        <div className="technique-lab-layout">
          <aside className="technique-list-panel">
            <p className="card-kicker">
              FOUND IN THIS SONG
            </p>

            <div className="technique-list">
              {techniques.map(
                (technique) => {
                  const isActive =
                    technique.id
                    === selectedTechnique.id;

                  return (
                    <button
                      key={technique.id}
                      type="button"
                      className={
                        isActive
                          ? (
                            "technique-list-item "
                            + "technique-list-item-active"
                          )
                          : "technique-list-item"
                      }
                      onClick={() => {
                        setSelectedTechniqueId(
                          technique.id,
                        );
                      }}
                    >
                      <span className="technique-list-icon">
                        ♬
                      </span>

                      <div>
                        <strong>
                          {technique.title}
                        </strong>

                        <small>
                          {technique.instrument}
                          {" • "}
                          {technique.difficulty}
                        </small>
                      </div>

                      <span>→</span>
                    </button>
                  );
                },
              )}
            </div>
          </aside>

          <section className="technique-focus-card">
            <div className="technique-focus-heading">
              <div>
                <p className="card-kicker">
                  SELECTED TECHNIQUE
                </p>

                <h3>
                  {selectedTechnique.title}
                </h3>
              </div>

              <span className="level-pill">
                {selectedTechnique.difficulty}
              </span>
            </div>

            <div className="technique-meta-grid">
              <article>
                <small>INSTRUMENT</small>
                <strong>
                  {selectedTechnique.instrument}
                </strong>
              </article>

              <article>
                <small>STYLE</small>
                <strong>
                  {selectedTechnique.style}
                </strong>
              </article>

              <article>
                <small>SONG MOMENT</small>
                <strong>
                  {formatTime(
                    selectedTechnique.start,
                  )}
                  {" – "}
                  {formatTime(
                    selectedTechnique.end,
                  )}
                </strong>
              </article>
            </div>

            <div className="technique-practice-section">
              <p className="card-kicker">
                PRACTICE PATH
              </p>

              <div className="technique-practice-path">
                {selectedTechnique.practicePath.map(
                  (chord, index) => (
                    <div
                      key={`${chord}-${index}`}
                    >
                      <strong>
                        {chord}
                      </strong>

                      {index
                        < selectedTechnique
                          .practicePath
                          .length - 1 && (
                          <span>→</span>
                        )}
                    </div>
                  ),
                )}
              </div>
            </div>

            <div className="technique-action-grid">
              <button
                type="button"
                className="primary-button"
              >
                Practise now
              </button>

              <button
                type="button"
                className="secondary-button"
                onClick={onOpenPerformance}
              >
                Hear it in performance
              </button>
            </div>
          </section>
        </div>
      ) : (
        <section className="technique-empty-state">
          <span>♬</span>

          <h3>
            No technique opportunities yet
          </h3>

          <p>
            Harmivo will surface useful
            keyboard and guitar concepts
            when they appear in the analyzed
            song.
          </p>
        </section>
      )}

      <section className="technique-discovery-panel">
        <div>
          <p className="card-kicker">
            TODAY’S DISCOVERY
          </p>

          <h3>
            Minor IV colour movement
          </h3>

          <p>
            Add emotional colour before
            returning to the tonic with:
          </p>
        </div>

        <div className="technique-discovery-path">
          <strong>IVmaj9</strong>
          <span>→</span>
          <strong>iv9</strong>
          <span>→</span>
          <strong>Imaj9</strong>
        </div>

        <button
          type="button"
          className="secondary-button"
        >
          Explore discovery
        </button>
      </section>
    </section>
  );
}
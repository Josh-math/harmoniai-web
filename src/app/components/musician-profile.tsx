"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useHarmivo,
} from "../context/harmivo-context";

import type {
  MusicianProfile as MusicianProfileData,
} from "../types/song-intelligence";

type MusicianProfileProps = {
  onBack: () => void;
};

const instruments: MusicianProfileData["instrument"][] = [
  "Keyboard",
  "Guitar",
];

const skillLevels: MusicianProfileData["skillLevel"][] = [
  "Beginner",
  "Intermediate",
  "Advanced",
  "Professional",
];

const styles: MusicianProfileData["style"][] = [
  "Original",
  "Gospel",
  "Worship",
  "Jazz",
  "Neo Soul",
  "Pop",
];

const complexityOptions: MusicianProfileData["preferredComplexity"][] = [
  "basic",
  "subtle",
  "rich",
  "complex",
];

export default function MusicianProfile({
  onBack,
}: MusicianProfileProps) {
  const {
    musicianProfile,
    updateMusicianProfile,
    songs,
  } = useHarmivo();

  const [
    draftProfile,
    setDraftProfile,
  ] = useState<MusicianProfileData>(
    musicianProfile,
  );

  const [
    hasSaved,
    setHasSaved,
  ] = useState(false);

  useEffect(() => {
    setDraftProfile(
      musicianProfile,
    );
  }, [
    musicianProfile,
  ]);

  const favoriteStyleCount =
    songs.filter(
      (song) =>
        song.musicianProfile.style
        === musicianProfile.style,
    ).length;

  const totalTechniqueCount =
    songs.reduce(
      (
        total,
        song,
      ) =>
        total
        + song
          .techniqueOpportunities
          .length,
      0,
    );

  const averageTempo =
    songs.length > 0
      ? Math.round(
          songs.reduce(
            (
              total,
              song,
            ) =>
              total
              + song.tempo.bpm,
            0,
          )
          / songs.length,
        )
      : 0;

  function updateDraft<
    Key extends keyof MusicianProfileData,
  >(
    key: Key,
    value: MusicianProfileData[Key],
  ) {
    setDraftProfile(
      (current) => ({
        ...current,
        [key]: value,
      }),
    );

    setHasSaved(false);
  }

  function saveProfile() {
    updateMusicianProfile(
      draftProfile,
    );

    setHasSaved(true);

    window.setTimeout(() => {
      setHasSaved(false);
    }, 2500);
  }

  return (
    <section className="musician-profile-page">
      <div className="musician-profile-toolbar">
        <button
          type="button"
          className="back-button"
          onClick={onBack}
        >
          ← Back
        </button>
      </div>

      <header className="musician-profile-heading">
        <div>
          <p className="card-kicker">
            MUSICIAN PROFILE
          </p>

          <h2>
            Shape your Harmivo experience
          </h2>

          <p>
            Harmivo uses these preferences
            to personalize learning,
            performance guidance, and
            reharmonization suggestions.
          </p>
        </div>

        <div className="musician-profile-avatar">
          <span>J</span>

          <div>
            <strong>Joseph</strong>
            <small>
              {musicianProfile.instrument}
            </small>
          </div>
        </div>
      </header>

      <section className="musician-profile-summary">
        <article className="profile-summary-card profile-summary-primary">
          <small>
            PRIMARY INSTRUMENT
          </small>

          <strong>
            {musicianProfile.instrument}
          </strong>

          <span>
            Personalized playing guidance
          </span>
        </article>

        <article className="profile-summary-card">
          <small>
            SKILL LEVEL
          </small>

          <strong>
            {musicianProfile.skillLevel}
          </strong>

          <span>
            Adaptive lesson difficulty
          </span>
        </article>

        <article className="profile-summary-card">
          <small>
            PREFERRED STYLE
          </small>

          <strong>
            {musicianProfile.style}
          </strong>

          <span>
            {favoriteStyleCount}
            {" matching "}
            {favoriteStyleCount === 1
              ? "song"
              : "songs"}
          </span>
        </article>

        <article className="profile-summary-card">
          <small>
            AVERAGE TEMPO
          </small>

          <strong>
            {averageTempo}
            {" BPM"}
          </strong>

          <span>
            Across saved sessions
          </span>
        </article>
      </section>

      <div className="musician-profile-layout">
        <section className="profile-settings-card">
          <div className="profile-card-heading">
            <div>
              <p className="card-kicker">
                PERSONALIZATION
              </p>

              <h3>
                Musical preferences
              </h3>
            </div>

            {hasSaved && (
              <span className="profile-saved-badge">
                ✓ Saved
              </span>
            )}
          </div>

          <div className="profile-setting-group">
            <label>
              Primary instrument

              <select
                value={
                  draftProfile.instrument
                }
                onChange={(event) => {
                  updateDraft(
                    "instrument",
                    event.target
                      .value as MusicianProfileData["instrument"],
                  );
                }}
              >
                {instruments.map(
                  (instrument) => (
                    <option
                      key={instrument}
                      value={instrument}
                    >
                      {instrument}
                    </option>
                  ),
                )}
              </select>
            </label>

            <label>
              Skill level

              <select
                value={
                  draftProfile.skillLevel
                }
                onChange={(event) => {
                  updateDraft(
                    "skillLevel",
                    event.target
                      .value as MusicianProfileData["skillLevel"],
                  );
                }}
              >
                {skillLevels.map(
                  (level) => (
                    <option
                      key={level}
                      value={level}
                    >
                      {level}
                    </option>
                  ),
                )}
              </select>
            </label>

            <label>
              Preferred musical style

              <select
                value={
                  draftProfile.style
                }
                onChange={(event) => {
                  updateDraft(
                    "style",
                    event.target
                      .value as MusicianProfileData["style"],
                  );
                }}
              >
                {styles.map(
                  (style) => (
                    <option
                      key={style}
                      value={style}
                    >
                      {style}
                    </option>
                  ),
                )}
              </select>
            </label>

            <label>
              Preferred complexity

              <select
                value={
                  draftProfile
                    .preferredComplexity
                }
                onChange={(event) => {
                  updateDraft(
                    "preferredComplexity",
                    event.target
                      .value as MusicianProfileData["preferredComplexity"],
                  );
                }}
              >
                {complexityOptions.map(
                  (complexity) => (
                    <option
                      key={complexity}
                      value={complexity}
                    >
                      {
                        complexity
                          .charAt(0)
                          .toUpperCase()
                        + complexity.slice(1)
                      }
                    </option>
                  ),
                )}
              </select>
            </label>
          </div>

          <div className="profile-tension-setting">
            <div>
              <label
                htmlFor="preferred-tension"
              >
                Preferred harmonic tension
              </label>

              <span>
                {Math.round(
                  draftProfile
                    .preferredTension
                  * 100,
                )}
                %
              </span>
            </div>

            <input
              id="preferred-tension"
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={
                draftProfile
                  .preferredTension
              }
              onChange={(event) => {
                updateDraft(
                  "preferredTension",
                  Number(
                    event.target.value,
                  ),
                );
              }}
            />

            <div className="profile-tension-labels">
              <span>Gentle</span>
              <span>Balanced</span>
              <span>Adventurous</span>
            </div>
          </div>

          <div className="profile-save-actions">
            <button
              type="button"
              className="primary-button"
              onClick={saveProfile}
            >
              Save preferences
            </button>

            <button
              type="button"
              className="secondary-button"
              onClick={() => {
                setDraftProfile(
                  musicianProfile,
                );

                setHasSaved(false);
              }}
            >
              Reset changes
            </button>
          </div>
        </section>

        <aside className="profile-insights-card">
          <p className="card-kicker">
            YOUR MUSICAL SNAPSHOT
          </p>

          <h3>
            Growing with Harmivo
          </h3>

          <div className="profile-insight-list">
            <article>
              <span>♫</span>

              <div>
                <strong>
                  {songs.length}
                  {" "}
                  {songs.length === 1
                    ? "saved song"
                    : "saved songs"}
                </strong>

                <small>
                  In your Harmivo library
                </small>
              </div>
            </article>

            <article>
              <span>♬</span>

              <div>
                <strong>
                  {totalTechniqueCount}
                  {" techniques"}
                </strong>

                <small>
                  Available for practice
                </small>
              </div>
            </article>

            <article>
              <span>✦</span>

              <div>
                <strong>
                  {
                    musicianProfile
                      .preferredComplexity
                  }
                  {" harmony"}
                </strong>

                <small>
                  Current suggestion preference
                </small>
              </div>
            </article>

            <article>
              <span>↗</span>

              <div>
                <strong>
                  {Math.round(
                    musicianProfile
                      .preferredTension
                    * 100,
                  )}
                  % tension
                </strong>

                <small>
                  Harmonic colour preference
                </small>
              </div>
            </article>
          </div>

          <div className="profile-preview">
            <small>
              HARMIVO WILL PERSONALIZE FOR
            </small>

            <strong>
              {
                draftProfile
                  .skillLevel
              }
              {" "}
              {
                draftProfile
                  .style
              }
              {" "}
              {
                draftProfile
                  .instrument
              }
            </strong>

            <p>
              Suggestions will follow your
              selected complexity and
              harmonic tension preferences.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
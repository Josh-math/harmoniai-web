"use client";

import {
  useMemo,
  useState,
} from "react";

import {
  useHarmivo,
} from "../context/harmivo-context";

import type {
  AppScreen,
} from "../types/app-navigation";

type LibraryProps = {
  goTo: (screen: AppScreen) => void;
};

type LibraryFilter =
  | "all"
  | "favorites"
  | "recent";

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

function formatDate(dateValue: string) {
  const parsedDate =
    new Date(dateValue);

  if (
    Number.isNaN(
      parsedDate.getTime(),
    )
  ) {
    return "Recently analyzed";
  }

  return new Intl.DateTimeFormat(
    "en",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    },
  ).format(parsedDate);
}

export default function Library({
  goTo,
}: LibraryProps) {
  const {
    songs,
    activeSong,
    selectSong,
    toggleFavorite,
    removeSong,
  } = useHarmivo();

  const [
    activeFilter,
    setActiveFilter,
  ] = useState<LibraryFilter>(
    "all",
  );

  const [
    searchText,
    setSearchText,
  ] = useState("");

  const filteredSongs =
    useMemo(() => {
      const normalizedSearch =
        searchText
          .trim()
          .toLowerCase();

      return songs.filter(
        (song) => {
          if (
            activeFilter === "favorites"
            && !song.isFavorite
          ) {
            return false;
          }

          if (
            normalizedSearch
            && !song.metadata.title
              .toLowerCase()
              .includes(
                normalizedSearch,
              )
            && !song.metadata.fileName
              .toLowerCase()
              .includes(
                normalizedSearch,
              )
          ) {
            return false;
          }

          return true;
        },
      );
    }, [
      activeFilter,
      searchText,
      songs,
    ]);

  const favoriteCount =
    songs.filter(
      (song) =>
        song.isFavorite,
    ).length;

  const techniqueCount =
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

  const modulationCount =
    songs.reduce(
      (
        total,
        song,
      ) =>
        total
        + song.modulations.length,
      0,
    );

  function openSong(
    songId: string,
    screen: AppScreen,
  ) {
    selectSong(songId);
    goTo(screen);
  }

  return (
    <section className="library-page">
      <header className="library-heading">
        <div>
          <p className="card-kicker">
            MY LIBRARY
          </p>

          <h2>
            Your musical workspace
          </h2>

          <p>
            Return to analyzed songs,
            performance paths, techniques,
            and saved musical discoveries.
          </p>
        </div>

        <button
          type="button"
          className="primary-button"
          onClick={() => {
            goTo("analyze");
          }}
        >
          ＋ Analyze a song
        </button>
      </header>

      <section className="library-summary-grid">
        <article className="library-summary-card library-summary-primary">
          <small>
            SAVED SONGS
          </small>

          <strong>
            {songs.length}
          </strong>

          <span>
            {songs.length === 1
              ? "Song in your library"
              : "Songs in your library"}
          </span>
        </article>

        <article className="library-summary-card">
          <small>
            FAVORITES
          </small>

          <strong>
            {favoriteCount}
          </strong>

          <span>
            Pinned for quick access
          </span>
        </article>

        <article className="library-summary-card">
          <small>
            TECHNIQUES
          </small>

          <strong>
            {techniqueCount}
          </strong>

          <span>
            Learning opportunities
          </span>
        </article>

        <article className="library-summary-card">
          <small>
            MODULATIONS
          </small>

          <strong>
            {modulationCount}
          </strong>

          <span>
            Key changes discovered
          </span>
        </article>
      </section>

      <section className="library-controls">
        <div className="library-filter-row">
          <button
            type="button"
            className={
              activeFilter === "all"
                ? "library-filter library-filter-active"
                : "library-filter"
            }
            onClick={() => {
              setActiveFilter("all");
            }}
          >
            All songs
          </button>

          <button
            type="button"
            className={
              activeFilter === "favorites"
                ? "library-filter library-filter-active"
                : "library-filter"
            }
            onClick={() => {
              setActiveFilter(
                "favorites",
              );
            }}
          >
            Favorites
          </button>

          <button
            type="button"
            className={
              activeFilter === "recent"
                ? "library-filter library-filter-active"
                : "library-filter"
            }
            onClick={() => {
              setActiveFilter(
                "recent",
              );
            }}
          >
            Recent
          </button>
        </div>

        <label className="library-search">
          <span className="sr-only">
            Search library
          </span>

          <input
            type="search"
            value={searchText}
            placeholder="Search songs"
            onChange={(event) => {
              setSearchText(
                event.target.value,
              );
            }}
          />
        </label>
      </section>

      {filteredSongs.length > 0 ? (
        <section className="library-song-grid">
          {filteredSongs.map(
            (song) => {
              const openingKey =
                song.keyRegions[0]?.key
                ?? song.globalKey.value
                ?? "Unknown";

              const finalKey =
                song.keyRegions[
                  song.keyRegions.length
                  - 1
                ]?.key
                ?? openingKey;

              const isActive =
                activeSong?.metadata.id
                === song.metadata.id;

              return (
                <article
                  key={
                    song.metadata.id
                  }
                  className={
                    isActive
                      ? "library-song-card library-song-card-active"
                      : "library-song-card"
                  }
                >
                  <div className="library-song-top">
                    <div className="library-song-icon">
                      ♫
                    </div>

                    <button
                      type="button"
                      className={
                        song.isFavorite
                          ? "library-favorite-button library-favorite-button-active"
                          : "library-favorite-button"
                      }
                      onClick={() => {
                        toggleFavorite(
                          song.metadata.id,
                        );
                      }}
                      aria-label={
                        song.isFavorite
                          ? "Remove from favorites"
                          : "Add to favorites"
                      }
                    >
                      {song.isFavorite
                        ? "★"
                        : "☆"}
                    </button>
                  </div>

                  <div className="library-song-title">
                    <h3>
                      {song.metadata.title}
                    </h3>

                    <p>
                      {song.metadata.fileName}
                    </p>
                  </div>

                  <div className="library-song-meta">
                    <span>
                      {formatDate(
                        song.metadata.createdAt,
                      )}
                    </span>

                    <span>
                      {formatTime(
                        song.metadata.duration,
                      )}
                    </span>
                  </div>

                  <div className="library-song-data">
                    <article>
                      <small>
                        KEY JOURNEY
                      </small>

                      <strong>
                        {openingKey
                          === finalKey
                          ? openingKey
                          : `${openingKey} → ${finalKey}`}
                      </strong>
                    </article>

                    <article>
                      <small>
                        TEMPO
                      </small>

                      <strong>
                        {Math.round(
                          song.tempo.bpm,
                        )}
                        {" BPM"}
                      </strong>
                    </article>

                    <article>
                      <small>
                        TECHNIQUES
                      </small>

                      <strong>
                        {
                          song
                            .techniqueOpportunities
                            .length
                        }
                      </strong>
                    </article>

                    <article>
                      <small>
                        MODULATIONS
                      </small>

                      <strong>
                        {
                          song.modulations
                            .length
                        }
                      </strong>
                    </article>
                  </div>

                  <div className="library-song-actions">
                    <button
                      type="button"
                      className="primary-button"
                      onClick={() => {
                        openSong(
                          song.metadata.id,
                          "analyze",
                        );
                      }}
                    >
                      Open analysis
                    </button>

                    <button
                      type="button"
                      className="secondary-button"
                      onClick={() => {
                        openSong(
                          song.metadata.id,
                          "performance",
                        );
                      }}
                    >
                      Performance
                    </button>
                  </div>

                  <div className="library-song-secondary-actions">
                    <button
                      type="button"
                      className="text-button"
                      onClick={() => {
                        openSong(
                          song.metadata.id,
                          "technique-lab",
                        );
                      }}
                    >
                      Techniques
                    </button>

                    <button
                      type="button"
                      className="text-button"
                      onClick={() => {
                        openSong(
                          song.metadata.id,
                          "reharmonization",
                        );
                      }}
                    >
                      Reharmonize
                    </button>

                    <button
                      type="button"
                      className="library-delete-button"
                      onClick={() => {
                        const shouldDelete =
                          window.confirm(
                            `Remove "${song.metadata.title}" from your library?`,
                          );

                        if (
                          shouldDelete
                        ) {
                          removeSong(
                            song.metadata.id,
                          );
                        }
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </article>
              );
            },
          )}
        </section>
      ) : (
        <section className="library-empty-state">
          <span>▣</span>

          <h3>
            No songs found
          </h3>

          <p>
            Try a different search or
            analyze a new song to grow
            your Harmivo library.
          </p>

          <button
            type="button"
            className="primary-button"
            onClick={() => {
              setSearchText("");
              setActiveFilter("all");
              goTo("analyze");
            }}
          >
            Analyze a song
          </button>
        </section>
      )}
    </section>
  );
}
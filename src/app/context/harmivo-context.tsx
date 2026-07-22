"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";

import { mockSongIntelligence } from "../data/mock-song-intelligence";

import type {
  MusicianProfile,
  SongIntelligence,
} from "../types/song-intelligence";

type SavedSong = SongIntelligence & {
  isFavorite: boolean;
};

type HarmivoContextValue = {
  songs: SavedSong[];
  activeSong: SavedSong | null;
  musicianProfile: MusicianProfile;

  selectSong: (songId: string) => void;
  addSong: (song: SongIntelligence) => void;
  removeSong: (songId: string) => void;
  toggleFavorite: (songId: string) => void;
  updateMusicianProfile: (
    profile: MusicianProfile,
  ) => void;
};

type HarmivoProviderProps = {
  children: ReactNode;
};

const HarmivoContext =
  createContext<HarmivoContextValue | null>(
    null,
  );

const initialSong: SavedSong = {
  ...mockSongIntelligence,
  isFavorite: false,
};

export function HarmivoProvider({
  children,
}: HarmivoProviderProps) {
  const [songs, setSongs] =
    useState<SavedSong[]>([
      initialSong,
    ]);

  const [
    activeSongId,
    setActiveSongId,
  ] = useState<string | null>(
    initialSong.metadata.id,
  );

  const [
    musicianProfile,
    setMusicianProfile,
  ] = useState<MusicianProfile>(
    initialSong.musicianProfile,
  );

  const activeSong =
    useMemo(() => {
      if (!activeSongId) {
        return null;
      }

      return (
        songs.find(
          (song) =>
            song.metadata.id
            === activeSongId,
        )
        ?? null
      );
    }, [
      activeSongId,
      songs,
    ]);

  function selectSong(
    songId: string,
  ) {
    const songExists =
      songs.some(
        (song) =>
          song.metadata.id
          === songId,
      );

    if (!songExists) {
      return;
    }

    setActiveSongId(songId);
  }

  function addSong(
    song: SongIntelligence,
  ) {
    setSongs((currentSongs) => {
      const existingSong =
        currentSongs.find(
          (currentSong) =>
            currentSong.metadata.id
            === song.metadata.id,
        );

      if (existingSong) {
        return currentSongs.map(
          (currentSong) =>
            currentSong.metadata.id
            === song.metadata.id
              ? {
                  ...song,
                  isFavorite:
                    currentSong.isFavorite,
                }
              : currentSong,
        );
      }

      return [
        {
          ...song,
          isFavorite: false,
        },
        ...currentSongs,
      ];
    });

    setActiveSongId(
      song.metadata.id,
    );
  }

  function removeSong(
    songId: string,
  ) {
    setSongs((currentSongs) =>
      currentSongs.filter(
        (song) =>
          song.metadata.id
          !== songId,
      ),
    );

    if (
      activeSongId === songId
    ) {
      setActiveSongId(null);
    }
  }

  function toggleFavorite(
    songId: string,
  ) {
    setSongs((currentSongs) =>
      currentSongs.map((song) =>
        song.metadata.id === songId
          ? {
              ...song,
              isFavorite:
                !song.isFavorite,
            }
          : song,
      ),
    );
  }

  function updateMusicianProfile(
    profile: MusicianProfile,
  ) {
    setMusicianProfile(profile);
  }

  const value =
    useMemo<HarmivoContextValue>(
      () => ({
        songs,
        activeSong,
        musicianProfile,
        selectSong,
        addSong,
        removeSong,
        toggleFavorite,
        updateMusicianProfile,
      }),
      [
        activeSong,
        musicianProfile,
        songs,
      ],
    );

  return (
    <HarmivoContext.Provider
      value={value}
    >
      {children}
    </HarmivoContext.Provider>
  );
}

export function useHarmivo() {
  const context =
    useContext(HarmivoContext);

  if (!context) {
    throw new Error(
      "useHarmivo must be used inside HarmivoProvider.",
    );
  }

  return context;
}
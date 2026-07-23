"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";

import type {
  AppScreen,
} from "../types/app-navigation";

type NavigationContextValue = {
  activeScreen: AppScreen;
  navigationHistory: AppScreen[];
  canGoBack: boolean;
  goTo: (screen: AppScreen) => void;
  goBack: () => void;
  resetNavigation: (
    screen?: AppScreen,
  ) => void;
};

type NavigationProviderProps = {
  children: ReactNode;
};

const NavigationContext =
  createContext<NavigationContextValue | null>(
    null,
  );

export function NavigationProvider({
  children,
}: NavigationProviderProps) {
  const [
    activeScreen,
    setActiveScreen,
  ] = useState<AppScreen>(
    "dashboard",
  );

  const [
    navigationHistory,
    setNavigationHistory,
  ] = useState<AppScreen[]>([]);

  function goTo(
    screen: AppScreen,
  ) {
    if (screen === activeScreen) {
      return;
    }

    setNavigationHistory(
      (currentHistory) => [
        ...currentHistory,
        activeScreen,
      ],
    );

    setActiveScreen(screen);
  }

  function goBack() {
    setNavigationHistory(
      (currentHistory) => {
        if (
          currentHistory.length === 0
        ) {
          setActiveScreen(
            "dashboard",
          );

          return [];
        }

        const previousScreen =
          currentHistory[
            currentHistory.length - 1
          ];

        setActiveScreen(
          previousScreen,
        );

        return currentHistory.slice(
          0,
          -1,
        );
      },
    );
  }

  function resetNavigation(
    screen: AppScreen = "dashboard",
  ) {
    setNavigationHistory([]);
    setActiveScreen(screen);
  }

  const value =
    useMemo<NavigationContextValue>(
      () => ({
        activeScreen,
        navigationHistory,
        canGoBack:
          activeScreen !== "dashboard"
          || navigationHistory.length > 0,
        goTo,
        goBack,
        resetNavigation,
      }),
      [
        activeScreen,
        navigationHistory,
      ],
    );

  return (
    <NavigationContext.Provider
      value={value}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context =
    useContext(NavigationContext);

  if (!context) {
    throw new Error(
      "useNavigation must be used inside NavigationProvider.",
    );
  }

  return context;
}
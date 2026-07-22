"use client";

import {
  useState,
} from "react";

import AnalyzeSong from "./components/analyze-song";
import Dashboard from "./components/dashboard";
import PerformanceMode from "./components/performance-mode";
import TechniqueLab from "./components/technique-lab";
import ReharmonizationStudio from "./components/reharmonization-studio";
import Library from "./components/library";
import MusicianProfile from "./components/musician-profile";
import {
  useHarmivo,
} from "./context/harmivo-context";

import type {
  AppScreen,
} from "./types/app-navigation";

import {
  screenTitles,
} from "./types/app-navigation";

type NavigationItem = {
  screen: AppScreen;
  label: string;
  icon: string;
};

const navigationItems: NavigationItem[] = [
  {
    screen: "dashboard",
    label: "Dashboard",
    icon: "⌂",
  },
  {
    screen: "analyze",
    label: "Analyze",
    icon: "♫",
  },
  {
    screen: "performance",
    label: "Performance",
    icon: "▶",
  },
  {
    screen: "technique-lab",
    label: "Technique Lab",
    icon: "♬",
  },
  {
    screen: "reharmonization",
    label: "Reharmonize",
    icon: "✦",
  },
  {
    screen: "library",
    label: "Library",
    icon: "▣",
  },
];

export default function Home() {
  const [
    activeScreen,
    setActiveScreen,
  ] = useState<AppScreen>(
    "dashboard",
  );

  const {
    musicianProfile,
  } = useHarmivo();

  const [
    navigationHistory,
    setNavigationHistory,
  ] = useState<AppScreen[]>([]);

  const [
    isPremium,
    setIsPremium,
  ] = useState(false);

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

  function renderScreen() {
    if (
      activeScreen === "analyze"
    ) {
      return (
        <AnalyzeSong
          onBack={() => {
            goTo("dashboard");
          }}
          onOpenPerformance={() => {
            goTo("performance");
          }}
        />
      );
    }

    if (
      activeScreen === "performance"
    ) {
      return (
        <PerformanceMode
          onBack={goBack}
          onAnalyzeAnother={() => {
            goTo("analyze");
          }}
        />
      );
    }

    if (
      activeScreen
      === "technique-lab"
    ) {
      return (
        <TechniqueLab
          onBack={() => {
            goTo("dashboard");
          }}
          onOpenPerformance={() => {
            goTo("performance");
          }}
        />
      );
    }

    if (
      activeScreen === "library"
    ) {
      return (
      <Library goTo={goTo} />
    );
  }

    if (
      activeScreen === "profile"
    ) {
      return (
        <MusicianProfile
          onBack={goBack}
        />
      );
    }

    if (
      activeScreen
      === "reharmonization"
    ) {
      return (
        <ReharmonizationStudio
          onBack={() => {
            goTo("dashboard");
          }}
          onOpenPerformance={() => {
            goTo("performance");
          }}
        />
      );
    }

    return (
      <Dashboard goTo={goTo} />
    );
  }

  return (
    <main
      className={
        isPremium
          ? "app premium-theme"
          : "app"
      }
    >
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">
            H
          </div>

          <div>
            <p className="brand-name">
              Harmivo
            </p>

            <p className="brand-caption">
              Musical companion
            </p>
          </div>
        </div>

        <nav
          className="navigation"
          aria-label={
            "Primary navigation"
          }
        >
          {navigationItems.map(
            (item) => {
              const isActive =
                activeScreen
                === item.screen;

              return (
                <button
                  key={item.screen}
                  type="button"
                  className={
                    isActive
                      ? (
                        "navigation-item "
                        + "navigation-item-active"
                      )
                      : "navigation-item"
                  }
                  onClick={() => {
                    goTo(
                      item.screen,
                    );
                  }}
                >
                  <span
                    className={
                      "navigation-icon"
                    }
                  >
                    {item.icon}
                  </span>

                  <span>
                    {item.label}
                  </span>
                </button>
              );
            },
          )}
        </nav>

        <div className="sidebar-footer">
          <button
            type="button"
            className="premium-switch"
            onClick={() => {
              setIsPremium(
                (current) =>
                  !current,
              );
            }}
            aria-pressed={isPremium}
          >
            <span>
              <strong>
                {isPremium
                  ? "Premium"
                  : "Free plan"}
              </strong>

              <small>
                {isPremium
                  ? "VVIP experience active"
                  : "Preview premium mode"}
              </small>
            </span>

            <span
              className={
                isPremium
                  ? (
                    "switch-track "
                    + "switch-track-active"
                  )
                  : "switch-track"
              }
            >
              <span
                className="switch-thumb"
              />
            </span>
          </button>

          <button
            type="button"
            className="profile-card"
            onClick={() => {
              goTo("profile");
            }}
          >
            <span className="avatar">
              J
            </span>

            <span>
              <strong>Joseph</strong>
              <small>
                {musicianProfile.instrument}
              </small>
            </span>

            <span className="profile-arrow">
              ›
            </span>
          </button>
        </div>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div className="topbar-title-area">
            {(
              activeScreen !== "dashboard"
              || navigationHistory.length > 0
            ) && (
              <button
                type="button"
                className="global-back-button"
                onClick={goBack}
                aria-label="Go back to previous page"
                title="Go back"
              >
                ←
              </button>
            )}

            <div>
              <p className="eyebrow">
                YOUR MUSICAL WORKSPACE
              </p>

              <h1>
                {screenTitles[activeScreen]}
              </h1>
            </div>
          </div>

          <div className="topbar-actions">
            <button
              type="button"
              className={
                "notification-button"
              }
            >
              <span>●</span>

              <span className="sr-only">
                Notifications
              </span>
            </button>

            <button
              type="button"
              className="primary-button"
              onClick={() => {
                goTo("analyze");
              }}
            >
              <span>＋</span>
              Analyze a song
            </button>
          </div>
        </header>

        <div className="content">
          {renderScreen()}
        </div>
      </section>
    </main>
  );
}
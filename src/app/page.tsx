"use client";

import {
  useState,
} from "react";

import AnalyzeSong from "./components/analyze-song";
import Dashboard from "./components/dashboard";
import PerformanceMode from "./components/performance-mode";
import TechniqueLab from "./components/technique-lab";

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

  const [
    previousScreen,
    setPreviousScreen,
  ] = useState<AppScreen>(
    "dashboard",
  );

  const [
    isPremium,
    setIsPremium,
  ] = useState(false);

  function goTo(
    screen: AppScreen,
  ) {
    setPreviousScreen(activeScreen);
    setActiveScreen(screen);
  }

  function goBack() {
    setActiveScreen(previousScreen);
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
        <section className="empty-state">
          <span>▣</span>

          <h3>Your library</h3>

          <p>
            Saved songs, sessions,
            techniques, and performance
            paths will appear here.
          </p>

          <button
            type="button"
            className="primary-button"
            onClick={() => {
              goTo("analyze");
            }}
          >
            Analyze your first song
          </button>
        </section>
      );
    }

    if (
      activeScreen === "profile"
    ) {
      return (
        <section className="empty-state">
          <span>J</span>

          <h3>Musician profile</h3>

          <p>
            Your instrument, skill level,
            style, and musical preferences
            will be managed here.
          </p>

          <button
            type="button"
            className="secondary-button"
            onClick={() => {
              goTo("dashboard");
            }}
          >
            Back to dashboard
          </button>
        </section>
      );
    }

    if (
      activeScreen
      === "reharmonization"
    ) {
      return (
        <section className="empty-state">
          <span>✦</span>

          <h3>
            Reharmonization Studio
          </h3>

          <p>
            Personalized harmonic paths
            will be built here next.
          </p>

          <button
            type="button"
            className="secondary-button"
            onClick={() => {
              goTo("dashboard");
            }}
          >
            Back to dashboard
          </button>
        </section>
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
              <small>Keyboardist</small>
            </span>

            <span className="profile-arrow">
              ›
            </span>
          </button>
        </div>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div>
            <p className="eyebrow">
              YOUR MUSICAL WORKSPACE
            </p>

            <h1>
              {
                screenTitles[
                  activeScreen
                ]
              }
            </h1>
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
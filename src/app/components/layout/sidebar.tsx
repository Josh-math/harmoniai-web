"use client";

import type {
  Dispatch,
  SetStateAction,
} from "react";

import {
  useHarmivo,
} from "../../context/harmivo-context";

import {
  useNavigation,
} from "../../context/navigation-context";

import type {
  AppScreen,
} from "../../types/app-navigation";

type NavigationItem = {
  screen: AppScreen;
  label: string;
  icon: string;
};

type SidebarProps = {
  isPremium: boolean;
  setIsPremium: Dispatch<
    SetStateAction<boolean>
  >;
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
    screen: "discoveries",
    label: "Discoveries",
    icon: "✧",
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

export default function Sidebar({
  isPremium,
  setIsPremium,
}: SidebarProps) {
  const {
    musicianProfile,
  } = useHarmivo();

  const {
    activeScreen,
    goTo,
  } = useNavigation();

  return (
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
        aria-label="Primary navigation"
      >
        {navigationItems.map(
          (item) => {
            const isActive =
              activeScreen === item.screen;

            return (
              <button
                key={item.screen}
                type="button"
                className={
                  isActive
                    ? "navigation-item navigation-item-active"
                    : "navigation-item"
                }
                onClick={() => {
                  goTo(item.screen);
                }}
              >
                <span className="navigation-icon">
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
              (current) => !current,
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
                ? "switch-track switch-track-active"
                : "switch-track"
            }
          >
            <span className="switch-thumb" />
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
  );
}
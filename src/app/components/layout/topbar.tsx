"use client";

import {
  useNavigation,
} from "../../context/navigation-context";

import {
  screenTitles,
} from "../../types/app-navigation";

export default function Topbar() {
  const {
    activeScreen,
    canGoBack,
    goBack,
    goTo,
  } = useNavigation();

  return (
    <header className="topbar">
      <div className="topbar-title-area">
        {canGoBack && (
          <button
            type="button"
            className="global-back-button"
            onClick={goBack}
            aria-label="Go back"
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
          className="notification-button"
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
  );
}
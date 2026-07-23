"use client";

import AnalyzeSong from "../analyze-song";
import DailyDiscoveries from "../daily-discoveries";
import Dashboard from "../dashboard";
import Library from "../library";
import MusicianProfile from "../musician-profile";
import PerformanceMode from "../performance-mode";
import ReharmonizationStudio from "../reharmonization-studio";
import TechniqueLab from "../technique-lab";

import {
  useNavigation,
} from "../../context/navigation-context";

export default function ScreenRenderer() {
  const {
    activeScreen,
    goTo,
    goBack,
  } = useNavigation();

  if (activeScreen === "analyze") {
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

  if (activeScreen === "performance") {
    return (
      <PerformanceMode
        onBack={goBack}
        onAnalyzeAnother={() => {
          goTo("analyze");
        }}
      />
    );
  }

  if (activeScreen === "technique-lab") {
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

  if (activeScreen === "discoveries") {
    return (
      <DailyDiscoveries
        onBack={goBack}
        onOpenTechniqueLab={() => {
          goTo("technique-lab");
        }}
        onOpenPerformance={() => {
          goTo("performance");
        }}
      />
    );
  }

  if (activeScreen === "reharmonization") {
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

  if (activeScreen === "library") {
    return (
      <Library
        goTo={goTo}
      />
    );
  }

  if (activeScreen === "profile") {
    return (
      <MusicianProfile
        onBack={goBack}
      />
    );
  }

  return (
    <Dashboard
      goTo={goTo}
    />
  );
}
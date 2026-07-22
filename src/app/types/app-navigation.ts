export type AppScreen =
  | "dashboard"
  | "analyze"
  | "performance"
  | "technique-lab"
  | "discoveries"
  | "reharmonization"
  | "library"
  | "profile";

export const screenTitles: Record<
  AppScreen,
  string
> = {
  dashboard: "Dashboard",
  analyze: "Analyze",
  performance: "Performance",
  "technique-lab": "Technique Lab",
  discoveries: "Discoveries",
  reharmonization: "Reharmonization",
  library: "Library",
  profile: "Profile",
};
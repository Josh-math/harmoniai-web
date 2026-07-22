export type AppScreen =
  | "dashboard"
  | "analyze"
  | "performance"
  | "technique-lab"
  | "library"
  | "profile"
  | "reharmonization";

export const screenTitles: Record<
  AppScreen,
  string
> = {
  dashboard: "Dashboard",
  analyze: "Analyze",
  performance: "Performance",
  "technique-lab": "Technique Lab",
  library: "Library",
  profile: "Profile",
  reharmonization: "Reharmonization",
};
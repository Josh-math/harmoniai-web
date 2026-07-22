export type ConfidenceStatus =
  | "confirmed"
  | "estimated"
  | "withheld";

export type SuggestionRole =
  | "current"
  | "passing"
  | "target"
  | "substitution"
  | "colour"
  | null;

export type SongMetadata = {
  id: string;
  title: string;
  fileName: string;
  duration: number;
  createdAt: string;
};

export type MusicianProfile = {
  instrument: "Keyboard" | "Guitar";
  skillLevel:
    | "Beginner"
    | "Intermediate"
    | "Advanced"
    | "Professional";
  style:
    | "Original"
    | "Gospel"
    | "Worship"
    | "Jazz"
    | "Neo Soul"
    | "Pop";
  preferredComplexity:
    | "basic"
    | "subtle"
    | "rich"
    | "complex";
  preferredTension: number;
};

export type TempoAnalysis = {
  bpm: number;
  confidence: number;
};

export type KeyRegion = {
  id: string;
  start: number;
  end: number;
  key: string;
  confidence: number;
};

export type ModulationEvent = {
  id: string;
  time: number;
  fromKey: string;
  toKey: string;
  confidence: number;
  status: ConfidenceStatus;
};

export type PhraseRegion = {
  id: string;
  start: number;
  end: number;
  label: string;
  confidence: number;
};

export type ChordEvent = {
  id: string;
  start: number;
  end: number;
  chord: string;
  roman: string;
  key: string;
  confidence: number;
  status: ConfidenceStatus;
  isPassingChord: boolean;
};

export type PerformanceStep = {
  id: string;
  chord: string;
  roman: string;
  role: SuggestionRole;
  start: number;
  end: number;
  confidence: number;
  optional: boolean;
};

export type PerformancePath = {
  id: string;
  name: string;
  style: string;
  difficulty: string;
  sourceChordEventIds: string[];
  confidence: number;
  steps: PerformanceStep[];
};

export type TechniqueOpportunity = {
  id: string;
  title: string;
  instrument: "Keyboard" | "Guitar" | "Both";
  difficulty:
    | "Beginner"
    | "Intermediate"
    | "Advanced"
    | "Professional";
  style: string;
  start: number;
  end: number;
  relatedChordEventIds: string[];
  practicePath: string[];
};

export type PublicationPolicy = {
  publishGlobalKey: boolean;
  publishRegionalKeys: boolean;
  publishChords: boolean;
  markChordsWithCaution: boolean;
  publishModulations: boolean;
  publishEnhancements: boolean;
  confirmedEnhancementsOnly: boolean;
  allowLiveGuidance: boolean;
  allowAutomaticAccompaniment: boolean;
};

export type SongIntelligence = {
  schemaVersion: "1.0";
  metadata: SongMetadata;
  musicianProfile: MusicianProfile;
  tempo: TempoAnalysis;
  globalKey: {
    value: string | null;
    confidence: number;
    published: boolean;
  };
  keyRegions: KeyRegion[];
  modulations: ModulationEvent[];
  phrases: PhraseRegion[];
  chords: ChordEvent[];
  performancePaths: PerformancePath[];
  techniqueOpportunities: TechniqueOpportunity[];
  publicationPolicy: PublicationPolicy;
};
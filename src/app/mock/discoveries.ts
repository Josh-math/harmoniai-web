export type Discovery = {
  id: string;
  title: string;
  category:
    | "Harmony"
    | "Keyboard"
    | "Guitar"
    | "Rhythm";
  difficulty:
    | "Beginner"
    | "Intermediate"
    | "Advanced"
    | "Professional";
  duration: number;
  description: string;
  path: string[];
  instrument:
    | "Keyboard"
    | "Guitar"
    | "Both";
  style: string;
  isOriginal: boolean;
};

export const mockDiscoveries: Discovery[] = [
  {
    id: "discovery-1",
    title: "Minor IV Colour Movement",
    category: "Harmony",
    difficulty: "Intermediate",
    duration: 5,
    description:
      "Introduce emotional colour by moving from the major IV chord to its minor form before resolving home.",
    path: [
      "Bbmaj9",
      "Bbm9",
      "Fmaj9",
    ],
    instrument: "Both",
    style: "Gospel / Neo Soul",
    isOriginal: false,
  },

  {
    id: "discovery-2",
    title: "Reverse Chromatic Lift",
    category: "Keyboard",
    difficulty: "Advanced",
    duration: 8,
    description:
      "A Harmivo-generated movement that approaches the target harmony through descending upper structures.",
    path: [
      "Gm9",
      "Gbmaj7",
      "Fmaj9",
    ],
    instrument: "Keyboard",
    style: "Neo Soul",
    isOriginal: true,
  },

  {
    id: "discovery-3",
    title: "Diminished Dominant Approach",
    category: "Harmony",
    difficulty: "Advanced",
    duration: 7,
    description:
      "Use a diminished passing chord to intensify the movement into a dominant or tonic chord.",
    path: [
      "Dm7",
      "Db°7",
      "C13",
      "Fmaj9",
    ],
    instrument: "Both",
    style: "Gospel / Jazz",
    isOriginal: false,
  },

  {
    id: "discovery-4",
    title: "Open String Voice Leading",
    category: "Guitar",
    difficulty: "Intermediate",
    duration: 6,
    description:
      "Preserve ringing open strings while the inner chord voices move smoothly.",
    path: [
      "G",
      "G/B",
      "Cadd9",
      "Dsus4",
    ],
    instrument: "Guitar",
    style: "Worship / Pop",
    isOriginal: false,
  },

  {
    id: "discovery-5",
    title: "Anticipated Chord Push",
    category: "Rhythm",
    difficulty: "Intermediate",
    duration: 4,
    description:
      "Play the next harmony slightly before the strong beat to add forward movement and energy.",
    path: [
      "F",
      "Gm7",
      "C7",
      "F",
    ],
    instrument: "Both",
    style: "Gospel / Pop",
    isOriginal: false,
  },

  {
    id: "discovery-6",
    title: "Suspended Resolution Fold",
    category: "Keyboard",
    difficulty: "Professional",
    duration: 10,
    description:
      "A Harmivo-generated suspended dominant movement with compact inner voice resolution.",
    path: [
      "Gm11",
      "Bb/C",
      "C13sus",
      "C13",
      "Fmaj9",
    ],
    instrument: "Keyboard",
    style: "Gospel / Worship",
    isOriginal: true,
  },
];
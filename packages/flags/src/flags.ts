/**
 * FLOW Design System — Flag Registry
 * ────────────────────────────────────
 * Canonical registry of country flags imported from the Figma Edenred flag library.
 * Each entry maps an ISO 3166-1 alpha-2 code to its sprite position in Frame8.
 *
 * Architecture: sprite-clip model
 *   Frame8.tsx contains all 48 flags rendered in a 16×3 absolute grid.
 *   FlowFlag clips to a single flag's (left, top) cell.
 *   Each cell is 40×40px with column spacing=89px, row spacing≈80px.
 *
 * STATUS: Initial import — some flags marked "??" pending visual identification.
 * The explorer page renders all flags for manual mapping.
 *
 * NOTE: The FlowFlag render component lives in primitives.tsx.
 * This file is pure data — no JSX, no React dependency.
 */

export interface FlagEntry {
  /** ISO 3166-1 alpha-2 code (uppercase). "??" = unidentified */
  code: string;
  /** Country name (English) */
  name: string;
  /** International dial code (e.g. "+33") */
  dial: string;
  /** Sprite position: left offset in px */
  x: number;
  /** Sprite position: top offset in px */
  y: number;
}

/**
 * All 48 flags from the Figma Edenred flag library.
 * Ordered row-by-row, left-to-right (reading order).
 *
 * Grid layout: 16 columns × 3 rows
 *   Column spacing: 89px (40px flag + 49px gap)
 *   Row 0: top=0, Row 1: top=80, Row 2: top=162
 *
 * Identification key (colors → country):
 *   Green #496E2D + red circle → BD (Bangladesh)
 *   Blue #0052B4 + yellow #FFDA44 + black trident → BB (Barbados)
 *   White + red #A2001D stripes + green → BY (Belarus)
 *   Black + yellow + red vertical → BE (Belgium)
 *   Green left + yellow top-right + red bottom-right → BJ (Benin)
 *   Yellow + red diagonal + orange details → BT (Bhutan)
 *   White + yellow + blue triangles → BA (Bosnia & Herzegovina)
 *   Blue + black/white center stripe → BW (Botswana)
 *   Green + yellow diamond + blue circle → BR (Brazil)
 *   White + black + yellow + red ornaments → BN (Brunei)
 *   White + green + red horizontal → BG (Bulgaria)
 *   Red top + green bottom + yellow star → BF (Burkina Faso)
 */
export const flagRegistry: FlagEntry[] = [
  // ── Row 0 (top = 0) ─────────────────────────────────────
  { code: "BD", name: "Bangladesh", dial: "+880", x: 0, y: 0 },
  { code: "BB", name: "Barbados", dial: "+1", x: 89, y: 0 },
  { code: "BY", name: "Belarus", dial: "+375", x: 178, y: 0 },
  { code: "BE", name: "Belgium", dial: "+32", x: 267, y: 0 },
  { code: "BJ", name: "Benin", dial: "+229", x: 356, y: 0 },
  { code: "BT", name: "Bhutan", dial: "+975", x: 445, y: 0 },
  { code: "RO", name: "Romania", dial: "+40", x: 534, y: 0 }, // blue-yellow-red vertical
  { code: "ML", name: "Mali", dial: "+223", x: 623, y: 0 }, // green-yellow-red vertical
  { code: "ID", name: "Indonesia", dial: "+62", x: 712, y: 0 }, // red-white horizontal
  { code: "MD", name: "Moldova", dial: "+373", x: 801, y: 0 }, // blue-yellow-red + emblem
  { code: "MN", name: "Mongolia", dial: "+976", x: 890, y: 0 }, // red-blue-red + soyombo
  { code: "VN", name: "Vietnam", dial: "+84", x: 979, y: 0 }, // red + yellow star
  { code: "CN", name: "China", dial: "+86", x: 1068, y: 0 }, // red + yellow stars
  { code: "NA", name: "Namibia", dial: "+264", x: 1157, y: 0 }, // blue-green diagonal + sun
  { code: "WS", name: "Samoa", dial: "+685", x: 1246, y: 0 }, // red + blue canton w/ stars
  { code: "NO", name: "Norway", dial: "+47", x: 1335, y: 0 }, // red + blue/white cross

  // ── Row 1 (top = 80) ────────────────────────────────────
  { code: "BA", name: "Bosnia & Herzegovina", dial: "+387", x: 0, y: 80 },
  { code: "BW", name: "Botswana", dial: "+267", x: 89, y: 80 },
  { code: "BR", name: "Brazil", dial: "+55", x: 178, y: 80 },
  { code: "BN", name: "Brunei", dial: "+673", x: 267, y: 80 },
  { code: "BG", name: "Bulgaria", dial: "+359", x: 356, y: 80 },
  { code: "BF", name: "Burkina Faso", dial: "+226", x: 445, y: 80 },
  { code: "NP", name: "Nepal", dial: "+977", x: 534, y: 80 }, // unique pennant shape
  { code: "NI", name: "Nicaragua", dial: "+505", x: 623, y: 80 }, // blue-white-blue + emblem
  { code: "AU", name: "Australia", dial: "+61", x: 712, y: 80 }, // blue + Union Jack + stars
  { code: "AR", name: "Argentina", dial: "+54", x: 801, y: 80 }, // blue-white-blue + sun
  { code: "IN", name: "India", dial: "+91", x: 890, y: 80 }, // orange-white-green + wheel
  { code: "NG", name: "Nigeria", dial: "+234", x: 979, y: 80 }, // green-white-green
  { code: "UA", name: "Ukraine", dial: "+380", x: 1068, y: 80 }, // blue-yellow horizontal
  { code: "LV", name: "Latvia", dial: "+371", x: 1157, y: 80 }, // maroon-white-maroon
  { code: "CY", name: "Cyprus", dial: "+357", x: 1246, y: 80 }, // white + island outline
  { code: "ES", name: "Spain", dial: "+34", x: 1335, y: 82 }, // red-yellow-red + emblem

  // ── Row 2 (top = 162) ───────────────────────────────────
  { code: "BI", name: "Burundi", dial: "+257", x: 0, y: 162 }, // white cross + green/red + stars
  { code: "KH", name: "Cambodia", dial: "+855", x: 89, y: 162 }, // blue-red-blue + temple
  { code: "CM", name: "Cameroon", dial: "+237", x: 178, y: 162 }, // green-red-yellow vertical + star
  { code: "CA", name: "Canada", dial: "+1", x: 267, y: 162 }, // red-white-red + maple leaf
  { code: "CV", name: "Cape Verde", dial: "+238", x: 356, y: 162 }, // blue + white/red stripes + stars
  { code: "DZ", name: "Algeria", dial: "+213", x: 445, y: 162 }, // green-white + crescent/star
  { code: "TD", name: "Chad", dial: "+235", x: 534, y: 162 }, // blue-yellow-red vertical
  { code: "FR", name: "France", dial: "+33", x: 623, y: 162 }, // blue-white-red vertical
  { code: "DK", name: "Denmark", dial: "+45", x: 712, y: 162 }, // red + white cross
  { code: "PL", name: "Poland", dial: "+48", x: 801, y: 162 }, // white-red horizontal
  { code: "PK", name: "Pakistan", dial: "+92", x: 890, y: 162 }, // green + white crescent/star
  { code: "PW", name: "Palau", dial: "+680", x: 979, y: 162 }, // blue + yellow circle
  { code: "HN", name: "Honduras", dial: "+504", x: 1068, y: 160 }, // blue-white-blue + stars
  { code: "MK", name: "North Macedonia", dial: "+389", x: 1157, y: 162 }, // red + yellow sun
  { code: "GR", name: "Greece", dial: "+30", x: 1246, y: 162 }, // blue-white stripes + cross
  { code: "VE", name: "Venezuela", dial: "+58", x: 1335, y: 162 }, // red-yellow-blue + stars
];

/** Total flags in the sprite */
export const FLAG_COUNT = flagRegistry.length;

/** Sprite cell size in px */
export const FLAG_CELL_SIZE = 40;

/** Lookup map: ISO code → FlagEntry */
export const flagByCode: Record<string, FlagEntry> = {};
for (const entry of flagRegistry) {
  flagByCode[entry.code] = entry;
}

/** All unique codes for iteration */
export const flagCodes = flagRegistry.map((f) => f.code);

/** Flag size presets (circular, in px) */
export const flagSizeMap = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32,
  xl: 40,
} as const;

export type FlagSize = keyof typeof flagSizeMap;

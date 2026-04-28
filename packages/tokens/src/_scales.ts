// Pre-defined scales — shared by ref tokens

export const _space = {
  0: "0px",
  1: "4px",
  2: "8px",
  3: "12px",
  4: "16px",
  5: "20px",
  6: "24px",
  7: "28px",
  8: "32px",
  9: "36px",
  10: "40px",
  11: "44px",
  12: "48px",
  16: "64px",
  20: "80px",
  24: "96px",
  32: "128px",
  40: "160px",
  /** Sub-grid micro step — 2px. Used for tight structural gaps (label↔value in
   *  compact inputs) where 4px (step 1) is too large. Not a scale break —
   *  the 4px base grid remains canonical. Named to avoid fractional keys. */
  micro: "2px",
} as const;

export const _contentMax = "1440px";

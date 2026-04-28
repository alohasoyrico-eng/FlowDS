/**
 * EnergyExplorer — Interactive color system explorer
 * Ref Palette + Sys Mappings as flat sections (desktop) or FlowAccordion (mobile).
 * Embedded within the Energy foundation detail page (like VoiceExplorer).
 */
import { useCallback, useEffect, useState } from "react";

import { Divider, Inline, Stack, Text } from "@flow/primitives";
import { FlowAccordion } from "@flow/components";

// ── Contrast helpers ──────────────────────────────────
function hexToLinear(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  const toLinear = (c: number) => (c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  return [toLinear(r), toLinear(g), toLinear(b)];
}

function relativeLuminance(hex: string): number {
  const [r, g, b] = hexToLinear(hex);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

// ── Palette data ──────────────────────────────────────
type PaletteScale = { step: string; hex: string }[];

const palettes: { name: string; key: string; steps: PaletteScale }[] = [
  {
    name: "Neutral (Slate)",
    key: "neutral",
    steps: [
      { step: "50", hex: "#F8FAFC" },
      { step: "100", hex: "#F1F5F9" },
      { step: "200", hex: "#E2E8F0" },
      { step: "300", hex: "#CBD5E1" },
      { step: "400", hex: "#94A3B8" },
      { step: "500", hex: "#64748B" },
      { step: "600", hex: "#475569" },
      { step: "700", hex: "#334155" },
      { step: "800", hex: "#1E293B" },
      { step: "900", hex: "#0F172A" },
    ],
  },
  {
    name: "Blue (Vivid)",
    key: "blue",
    steps: [
      { step: "50", hex: "#E0EEFF" },
      { step: "100", hex: "#C7DFFF" },
      { step: "200", hex: "#8ABCFF" },
      { step: "300", hex: "#529CFF" },
      { step: "400", hex: "#1A7CFF" },
      { step: "500", hex: "#0060DF" },
      { step: "600", hex: "#004DB3" },
      { step: "700", hex: "#003985" },
      { step: "800", hex: "#002557" },
      { step: "900", hex: "#00142E" },
    ],
  },
  {
    name: "Red",
    key: "red",
    steps: [
      { step: "50", hex: "#FFE3E0" },
      { step: "ST", hex: "#FFEEED" },
      { step: "100", hex: "#FFC6C2" },
      { step: "200", hex: "#FF8D85" },
      { step: "300", hex: "#FF5447" },
      { step: "400", hex: "#FF1B0A" },
      { step: "500", hex: "#CA0E00" },
      { step: "600", hex: "#A30B00" },
      { step: "700", hex: "#7A0800" },
      { step: "800", hex: "#520600" },
      { step: "900", hex: "#290300" },
    ],
  },
  {
    name: "Green",
    key: "green",
    steps: [
      { step: "50", hex: "#E1F4EB" },
      { step: "100", hex: "#C3EFDA" },
      { step: "200", hex: "#79E6B4" },
      { step: "300", hex: "#2EE590" },
      { step: "400", hex: "#0DBA69" },
      { step: "500", hex: "#007840" },
      { step: "600", hex: "#065B33" },
      { step: "700", hex: "#084026" },
      { step: "800", hex: "#072718" },
      { step: "900", hex: "#05140D" },
    ],
  },
  {
    name: "Orange",
    key: "orange",
    steps: [
      { step: "50", hex: "#FDEAE3" },
      { step: "100", hex: "#FBD5C6" },
      { step: "200", hex: "#F6AB8E" },
      { step: "300", hex: "#F28155" },
      { step: "400", hex: "#ED571C" },
      { step: "500", hex: "#BF410F" },
      { step: "600", hex: "#97330C" },
      { step: "700", hex: "#712709" },
      { step: "800", hex: "#4C1A06" },
      { step: "900", hex: "#260D03" },
    ],
  },
  {
    name: "Purple (Extended)",
    key: "purple",
    steps: [
      { step: "50", hex: "#F3EEFB" },
      { step: "100", hex: "#DDD2F3" },
      { step: "200", hex: "#C4B5E8" },
      { step: "300", hex: "#A88FDB" },
      { step: "400", hex: "#8D6DD1" },
      { step: "500", hex: "#6B4DC7" },
      { step: "600", hex: "#5A43A8" },
      { step: "700", hex: "#503A99" },
      { step: "800", hex: "#3A2B6E" },
      { step: "900", hex: "#241A42" },
    ],
  },
  {
    name: "Teal (Extended)",
    key: "teal",
    steps: [
      { step: "50", hex: "#E8F7F7" },
      { step: "100", hex: "#C0EBEB" },
      { step: "200", hex: "#8BD9D9" },
      { step: "300", hex: "#52C4C4" },
      { step: "400", hex: "#1AAFAF" },
      { step: "500", hex: "#0A7A7A" },
      { step: "600", hex: "#096B6B" },
      { step: "700", hex: "#075C5C" },
      { step: "800", hex: "#053E3E" },
      { step: "900", hex: "#032121" },
    ],
  },
  {
    name: "Yellow",
    key: "yellow",
    steps: [
      { step: "50", hex: "#FFFBEB" },
      { step: "100", hex: "#FEF3C7" },
      { step: "200", hex: "#FDE68A" },
      { step: "300", hex: "#FCD34D" },
      { step: "400", hex: "#FBBF24" },
      { step: "500", hex: "#F59E0B" },
      { step: "600", hex: "#D97706" },
      { step: "700", hex: "#B45309" },
      { step: "800", hex: "#92400E" },
      { step: "900", hex: "#78350F" },
    ],
  },
  {
    name: "Pink",
    key: "pink",
    steps: [
      { step: "50", hex: "#FDF2F8" },
      { step: "100", hex: "#FCE7F3" },
      { step: "200", hex: "#FBCFE8" },
      { step: "300", hex: "#F9A8D4" },
      { step: "400", hex: "#F472B6" },
      { step: "500", hex: "#EC4899" },
      { step: "600", hex: "#DB2777" },
      { step: "700", hex: "#BE185D" },
      { step: "800", hex: "#9D174D" },
      { step: "900", hex: "#831843" },
    ],
  },
];

// ── Semantic mapping data ─────────────────────────────
interface SemanticEntry {
  token: string;
  lightRef: string;
  lightHex: string;
  darkRef: string;
  darkHex: string;
  usage: string;
}

const coreSemanticMappings: SemanticEntry[] = [
  // surface
  {
    token: "surface.primary",
    lightRef: "neutral.50",
    lightHex: "#F8FAFC",
    darkRef: "neutral.900",
    darkHex: "#0F172A",
    usage: "Main background",
  },
  {
    token: "surface.secondary",
    lightRef: "neutral.100",
    lightHex: "#F1F5F9",
    darkRef: "neutral.800",
    darkHex: "#1E293B",
    usage: "Cards, sidebars",
  },
  {
    token: "surface.tertiary",
    lightRef: "neutral.200",
    lightHex: "#E2E8F0",
    darkRef: "neutral.700",
    darkHex: "#334155",
    usage: "Input bg, hover fills",
  },
  {
    token: "surface.sunken",
    lightRef: "neutral.100",
    lightHex: "#F1F5F9",
    darkRef: "neutral.800",
    darkHex: "#1E293B",
    usage: "Recessed areas",
  },
  {
    token: "surface.inverse",
    lightRef: "neutral.900",
    lightHex: "#0F172A",
    darkRef: "neutral.100",
    darkHex: "#F1F5F9",
    usage: "Tooltips, toasts",
  },
  {
    token: "surface.accent",
    lightRef: "blue.50",
    lightHex: "#E0EEFF",
    darkRef: "blue.900",
    darkHex: "#00142E",
    usage: "Accent surface",
  },
  {
    token: "surface.accentSubtle",
    lightRef: "blue.50",
    lightHex: "#E0EEFF",
    darkRef: "blue.900",
    darkHex: "#00142E",
    usage: "Subtle accent (alias)",
  },
  {
    token: "surface.danger",
    lightRef: "red.50",
    lightHex: "#FFE3E0",
    darkRef: "red.900",
    darkHex: "#290300",
    usage: "Error surface",
  },
  {
    token: "surface.success",
    lightRef: "green.50",
    lightHex: "#E1F4EB",
    darkRef: "green.900",
    darkHex: "#05140D",
    usage: "Success surface",
  },
  {
    token: "surface.warning",
    lightRef: "yellow.50",
    lightHex: "#FFFBEB",
    darkRef: "yellow.900",
    darkHex: "#78350F",
    usage: "Warning surface",
  },
  // text
  {
    token: "text.primary",
    lightRef: "neutral.800",
    lightHex: "#1E293B",
    darkRef: "neutral.100",
    darkHex: "#F1F5F9",
    usage: "Body text",
  },
  {
    token: "text.secondary",
    lightRef: "neutral.600",
    lightHex: "#475569",
    darkRef: "neutral.400",
    darkHex: "#94A3B8",
    usage: "Supporting text",
  },
  {
    token: "text.tertiary",
    lightRef: "neutral.400",
    lightHex: "#94A3B8",
    darkRef: "neutral.500",
    darkHex: "#64748B",
    usage: "Placeholders",
  },
  {
    token: "text.inverse",
    lightRef: "neutral.50",
    lightHex: "#F8FAFC",
    darkRef: "neutral.900",
    darkHex: "#0F172A",
    usage: "Text on inverse bg",
  },
  {
    token: "text.onAction",
    lightRef: "neutral.50",
    lightHex: "#F8FAFC",
    darkRef: "neutral.900",
    darkHex: "#0F172A",
    usage: "Text on action bg",
  },
  {
    token: "text.link",
    lightRef: "blue.600",
    lightHex: "#004DB3",
    darkRef: "blue.200",
    darkHex: "#8ABCFF",
    usage: "Hyperlinks",
  },
  {
    token: "text.accent",
    lightRef: "blue.500",
    lightHex: "#0060DF",
    darkRef: "blue.200",
    darkHex: "#8ABCFF",
    usage: "Accent text",
  },
  {
    token: "text.danger",
    lightRef: "red.500",
    lightHex: "#CA0E00",
    darkRef: "red.200",
    darkHex: "#FF8D85",
    usage: "Error text",
  },
  {
    token: "text.success",
    lightRef: "green.500",
    lightHex: "#007840",
    darkRef: "green.200",
    darkHex: "#79E6B4",
    usage: "Success text",
  },
  {
    token: "text.warning",
    lightRef: "yellow.700",
    lightHex: "#B45309",
    darkRef: "yellow.200",
    darkHex: "#FDE68A",
    usage: "Warning text",
  },
  {
    token: "text.disabled",
    lightRef: "neutral.300",
    lightHex: "#CBD5E1",
    darkRef: "neutral.600",
    darkHex: "#475569",
    usage: "Disabled text (comp)",
  },
  // border
  {
    token: "border.focus",
    lightRef: "blue.500",
    lightHex: "#0060DF",
    darkRef: "blue.200",
    darkHex: "#8ABCFF",
    usage: "Focus ring",
  },
  {
    token: "border.accent",
    lightRef: "blue.200",
    lightHex: "#8ABCFF",
    darkRef: "blue.700",
    darkHex: "#003985",
    usage: "Accent border",
  },
  {
    token: "border.danger",
    lightRef: "red.200",
    lightHex: "#FF8D85",
    darkRef: "red.700",
    darkHex: "#7A0800",
    usage: "Error border",
  },
  {
    token: "border.success",
    lightRef: "green.200",
    lightHex: "#79E6B4",
    darkRef: "green.700",
    darkHex: "#084026",
    usage: "Success border",
  },
  {
    token: "border.warning",
    lightRef: "yellow.300",
    lightHex: "#FCD34D",
    darkRef: "yellow.700",
    darkHex: "#B45309",
    usage: "Warning border",
  },
  {
    token: "border.control",
    lightRef: "neutral.600",
    lightHex: "#475569",
    darkRef: "neutral.400",
    darkHex: "#94A3B8",
    usage: "Form control border",
  },
  {
    token: "border.controlError",
    lightRef: "red.600",
    lightHex: "#A30B00",
    darkRef: "red.300",
    darkHex: "#FF5447",
    usage: "Error control border",
  },
  {
    token: "border.controlDisabled",
    lightRef: "neutral.300",
    lightHex: "#CBD5E1",
    darkRef: "neutral.700",
    darkHex: "#334155",
    usage: "Disabled control border",
  },
  // action
  {
    token: "action.primary",
    lightRef: "blue.500",
    lightHex: "#0060DF",
    darkRef: "blue.200",
    darkHex: "#8ABCFF",
    usage: "Primary CTA",
  },
  {
    token: "action.primaryHover",
    lightRef: "blue.700",
    lightHex: "#003985",
    darkRef: "blue.100",
    darkHex: "#C7DFFF",
    usage: "Primary hover",
  },
  {
    token: "action.primaryActive",
    lightRef: "blue.600",
    lightHex: "#004DB3",
    darkRef: "blue.300",
    darkHex: "#529CFF",
    usage: "Primary pressed",
  },
  {
    token: "action.secondary",
    lightRef: "neutral.100",
    lightHex: "#F1F5F9",
    darkRef: "neutral.800",
    darkHex: "#1E293B",
    usage: "Secondary action bg",
  },
  {
    token: "action.secondaryHover",
    lightRef: "neutral.200",
    lightHex: "#E2E8F0",
    darkRef: "neutral.700",
    darkHex: "#334155",
    usage: "Secondary hover",
  },
  {
    token: "action.ghost",
    lightRef: "transparent",
    lightHex: "transparent",
    darkRef: "transparent",
    darkHex: "transparent",
    usage: "Ghost action bg",
  },
  {
    token: "action.ghostHover",
    lightRef: "neutral.100",
    lightHex: "#F1F5F9",
    darkRef: "neutral.800",
    darkHex: "#1E293B",
    usage: "Ghost hover",
  },
  {
    token: "action.high",
    lightRef: "neutral.900",
    lightHex: "#0F172A",
    darkRef: "neutral.100",
    darkHex: "#F1F5F9",
    usage: "High emphasis CTA",
  },
  {
    token: "action.highHover",
    lightRef: "neutral.700",
    lightHex: "#334155",
    darkRef: "neutral.300",
    darkHex: "#CBD5E1",
    usage: "High emphasis hover",
  },
  {
    token: "action.highActive",
    lightRef: "neutral.800",
    lightHex: "#1E293B",
    darkRef: "neutral.200",
    darkHex: "#E2E8F0",
    usage: "High emphasis active",
  },
  {
    token: "action.mediumBorder",
    lightRef: "neutral.900",
    lightHex: "#0F172A",
    darkRef: "neutral.100",
    darkHex: "#F1F5F9",
    usage: "Medium emphasis border",
  },
  {
    token: "action.mediumActive",
    lightRef: "neutral.300",
    lightHex: "#CBD5E1",
    darkRef: "neutral.600",
    darkHex: "#475569",
    usage: "Medium active",
  },
  {
    token: "action.lowActive",
    lightRef: "blue.600",
    lightHex: "#004DB3",
    darkRef: "blue.300",
    darkHex: "#529CFF",
    usage: "Low emphasis active",
  },
  {
    token: "action.destructive",
    lightRef: "red.500",
    lightHex: "#CA0E00",
    darkRef: "red.200",
    darkHex: "#FF8D85",
    usage: "Destructive CTA",
  },
  {
    token: "action.destructiveHover",
    lightRef: "red.700",
    lightHex: "#7A0800",
    darkRef: "red.100",
    darkHex: "#FFC6C2",
    usage: "Destructive hover",
  },
  {
    token: "action.destructiveSubtle",
    lightRef: "red.subtleTint",
    lightHex: "#FFEEED",
    darkRef: "red.900",
    darkHex: "#290300",
    usage: "Subtle destructive bg",
  },
  {
    token: "action.destructiveActive",
    lightRef: "red.600",
    lightHex: "#A30B00",
    darkRef: "red.300",
    darkHex: "#FF5447",
    usage: "Destructive pressed",
  },
  // state
  {
    token: "state.disabledBg",
    lightRef: "neutral.300",
    lightHex: "#CBD5E1",
    darkRef: "neutral.600",
    darkHex: "#475569",
    usage: "Disabled background",
  },
  {
    token: "state.disabledText",
    lightRef: "neutral.500",
    lightHex: "#64748B",
    darkRef: "neutral.400",
    darkHex: "#94A3B8",
    usage: "Disabled text",
  },
  {
    token: "state.disabledBorder",
    lightRef: "neutral.300",
    lightHex: "#CBD5E1",
    darkRef: "neutral.600",
    darkHex: "#475569",
    usage: "Disabled border",
  },
  // status
  {
    token: "status.success",
    lightRef: "green.500",
    lightHex: "#007840",
    darkRef: "green.200",
    darkHex: "#79E6B4",
    usage: "Success status",
  },
  {
    token: "status.successSubtle",
    lightRef: "green.50",
    lightHex: "#E1F4EB",
    darkRef: "green.900",
    darkHex: "#05140D",
    usage: "Success subtle bg",
  },
  {
    token: "status.successMuted",
    lightRef: "green.100",
    lightHex: "#C3EFDA",
    darkRef: "green.800",
    darkHex: "#072718",
    usage: "Success muted bg",
  },
  {
    token: "status.warning",
    lightRef: "yellow.600",
    lightHex: "#D97706",
    darkRef: "yellow.200",
    darkHex: "#FDE68A",
    usage: "Warning status",
  },
  {
    token: "status.warningSubtle",
    lightRef: "yellow.50",
    lightHex: "#FFFBEB",
    darkRef: "yellow.900",
    darkHex: "#78350F",
    usage: "Warning subtle bg",
  },
  {
    token: "status.warningMuted",
    lightRef: "yellow.100",
    lightHex: "#FEF3C7",
    darkRef: "yellow.800",
    darkHex: "#92400E",
    usage: "Warning muted bg",
  },
  {
    token: "status.error",
    lightRef: "red.500",
    lightHex: "#CA0E00",
    darkRef: "red.200",
    darkHex: "#FF8D85",
    usage: "Error status",
  },
  {
    token: "status.errorSubtle",
    lightRef: "red.50",
    lightHex: "#FFE3E0",
    darkRef: "red.900",
    darkHex: "#290300",
    usage: "Error subtle bg",
  },
  {
    token: "status.errorMuted",
    lightRef: "red.100",
    lightHex: "#FFC6C2",
    darkRef: "red.800",
    darkHex: "#520600",
    usage: "Error muted bg",
  },
  {
    token: "status.info",
    lightRef: "blue.500",
    lightHex: "#0060DF",
    darkRef: "blue.200",
    darkHex: "#8ABCFF",
    usage: "Info status",
  },
  {
    token: "status.infoSubtle",
    lightRef: "blue.50",
    lightHex: "#E0EEFF",
    darkRef: "blue.900",
    darkHex: "#00142E",
    usage: "Info subtle bg",
  },
  {
    token: "status.infoMuted",
    lightRef: "blue.100",
    lightHex: "#C7DFFF",
    darkRef: "blue.800",
    darkHex: "#002557",
    usage: "Info muted bg",
  },
  // icon
  {
    token: "icon.default",
    lightRef: "neutral.900",
    lightHex: "#0F172A",
    darkRef: "neutral.100",
    darkHex: "#F1F5F9",
    usage: "Default icon",
  },
  {
    token: "icon.secondary",
    lightRef: "neutral.500",
    lightHex: "#64748B",
    darkRef: "neutral.400",
    darkHex: "#94A3B8",
    usage: "Secondary icon",
  },
  {
    token: "icon.tertiary",
    lightRef: "neutral.400",
    lightHex: "#94A3B8",
    darkRef: "neutral.500",
    darkHex: "#64748B",
    usage: "Subtle icon",
  },
  {
    token: "icon.action",
    lightRef: "blue.500",
    lightHex: "#0060DF",
    darkRef: "blue.200",
    darkHex: "#8ABCFF",
    usage: "Action icon",
  },
  {
    token: "icon.inverse",
    lightRef: "neutral.50",
    lightHex: "#F8FAFC",
    darkRef: "neutral.900",
    darkHex: "#0F172A",
    usage: "Icon on dark bg",
  },
  {
    token: "icon.onAction",
    lightRef: "neutral.50",
    lightHex: "#F8FAFC",
    darkRef: "neutral.900",
    darkHex: "#0F172A",
    usage: "Icon on action bg",
  },
  {
    token: "icon.disabled",
    lightRef: "neutral.300",
    lightHex: "#CBD5E1",
    darkRef: "neutral.600",
    darkHex: "#475569",
    usage: "Disabled icon",
  },
  {
    token: "icon.success",
    lightRef: "green.500",
    lightHex: "#007840",
    darkRef: "green.200",
    darkHex: "#79E6B4",
    usage: "Success icon",
  },
  {
    token: "icon.warning",
    lightRef: "yellow.600",
    lightHex: "#D97706",
    darkRef: "yellow.200",
    darkHex: "#FDE68A",
    usage: "Warning icon",
  },
  {
    token: "icon.error",
    lightRef: "red.500",
    lightHex: "#CA0E00",
    darkRef: "red.200",
    darkHex: "#FF8D85",
    usage: "Error icon",
  },
  {
    token: "icon.info",
    lightRef: "blue.500",
    lightHex: "#0060DF",
    darkRef: "blue.200",
    darkHex: "#8ABCFF",
    usage: "Info icon",
  },
];

// ── Extended semantic mappings (separate for cleaner rendering) ──
const extendedSemanticMappings: SemanticEntry[] = [
  // Purple
  {
    token: "surface.purple",
    lightRef: "purple.50",
    lightHex: "#F3EEFB",
    darkRef: "purple.900",
    darkHex: "#241A42",
    usage: "Purple surface",
  },
  {
    token: "text.purple",
    lightRef: "purple.500",
    lightHex: "#6B4DC7",
    darkRef: "purple.200",
    darkHex: "#C4B5E8",
    usage: "Purple text",
  },
  {
    token: "border.purple",
    lightRef: "purple.200",
    lightHex: "#C4B5E8",
    darkRef: "purple.700",
    darkHex: "#503A99",
    usage: "Purple border",
  },
  {
    token: "status.purple",
    lightRef: "purple.500",
    lightHex: "#6B4DC7",
    darkRef: "purple.200",
    darkHex: "#C4B5E8",
    usage: "Purple status",
  },
  {
    token: "status.purpleSubtle",
    lightRef: "purple.50",
    lightHex: "#F3EEFB",
    darkRef: "purple.900",
    darkHex: "#241A42",
    usage: "Purple subtle bg",
  },
  {
    token: "status.purpleMuted",
    lightRef: "purple.100",
    lightHex: "#DDD2F3",
    darkRef: "purple.800",
    darkHex: "#3A2B6E",
    usage: "Purple muted bg",
  },
  // Teal
  {
    token: "surface.teal",
    lightRef: "teal.50",
    lightHex: "#E8F7F7",
    darkRef: "teal.900",
    darkHex: "#032121",
    usage: "Teal surface",
  },
  {
    token: "text.teal",
    lightRef: "teal.500",
    lightHex: "#0A7A7A",
    darkRef: "teal.200",
    darkHex: "#8BD9D9",
    usage: "Teal text",
  },
  {
    token: "border.teal",
    lightRef: "teal.200",
    lightHex: "#8BD9D9",
    darkRef: "teal.700",
    darkHex: "#075C5C",
    usage: "Teal border",
  },
  {
    token: "status.teal",
    lightRef: "teal.500",
    lightHex: "#0A7A7A",
    darkRef: "teal.200",
    darkHex: "#8BD9D9",
    usage: "Teal status",
  },
  {
    token: "status.tealSubtle",
    lightRef: "teal.50",
    lightHex: "#E8F7F7",
    darkRef: "teal.900",
    darkHex: "#032121",
    usage: "Teal subtle bg",
  },
  {
    token: "status.tealMuted",
    lightRef: "teal.100",
    lightHex: "#C0EBEB",
    darkRef: "teal.800",
    darkHex: "#053E3E",
    usage: "Teal muted bg",
  },
  // Orange
  {
    token: "surface.orange",
    lightRef: "orange.50",
    lightHex: "#FDEAE3",
    darkRef: "orange.900",
    darkHex: "#260D03",
    usage: "Orange surface",
  },
  {
    token: "text.orange",
    lightRef: "orange.500",
    lightHex: "#BF410F",
    darkRef: "orange.200",
    darkHex: "#F6AB8E",
    usage: "Orange text",
  },
  {
    token: "border.orange",
    lightRef: "orange.200",
    lightHex: "#F6AB8E",
    darkRef: "orange.700",
    darkHex: "#712709",
    usage: "Orange border",
  },
  {
    token: "status.orange",
    lightRef: "orange.500",
    lightHex: "#BF410F",
    darkRef: "orange.200",
    darkHex: "#F6AB8E",
    usage: "Orange status",
  },
  {
    token: "status.orangeSubtle",
    lightRef: "orange.50",
    lightHex: "#FDEAE3",
    darkRef: "orange.900",
    darkHex: "#260D03",
    usage: "Orange subtle bg",
  },
  {
    token: "status.orangeMuted",
    lightRef: "orange.100",
    lightHex: "#FBD5C6",
    darkRef: "orange.800",
    darkHex: "#4C1A06",
    usage: "Orange muted bg",
  },
  // Pink
  {
    token: "surface.pink",
    lightRef: "pink.50",
    lightHex: "#FDF2F8",
    darkRef: "pink.900",
    darkHex: "#831843",
    usage: "Pink surface",
  },
  {
    token: "text.pink",
    lightRef: "pink.500",
    lightHex: "#EC4899",
    darkRef: "pink.200",
    darkHex: "#FBCFE8",
    usage: "Pink text",
  },
  {
    token: "border.pink",
    lightRef: "pink.200",
    lightHex: "#FBCFE8",
    darkRef: "pink.700",
    darkHex: "#BE185D",
    usage: "Pink border",
  },
  {
    token: "status.pink",
    lightRef: "pink.500",
    lightHex: "#EC4899",
    darkRef: "pink.200",
    darkHex: "#FBCFE8",
    usage: "Pink status",
  },
  {
    token: "status.pinkSubtle",
    lightRef: "pink.50",
    lightHex: "#FDF2F8",
    darkRef: "pink.900",
    darkHex: "#831843",
    usage: "Pink subtle bg",
  },
  {
    token: "status.pinkMuted",
    lightRef: "pink.100",
    lightHex: "#FCE7F3",
    darkRef: "pink.800",
    darkHex: "#9D174D",
    usage: "Pink muted bg",
  },
];

// ── Responsive helper ─────────────────────────────────
function useIsMobile(breakpoint = 768) {
  const [mobile, setMobile] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia(`(max-width: ${breakpoint - 1}px)`).matches,
  );
  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const h = (e: MediaQueryListEvent) => setMobile(e.matches);
    mql.addEventListener("change", h);
    return () => mql.removeEventListener("change", h);
  }, [breakpoint]);
  return mobile;
}

// ── Clipboard helper ──────────────────────────────────
function useCopyFeedback() {
  const [copied, setCopied] = useState<string | null>(null);
  // "Copied!" feedback duration — intentionally longer than motion tokens
  // to give users time to read the confirmation. Not a CSS transition.
  const COPY_FEEDBACK_DURATION_MS = 1500;
  const copy = useCallback((text: string) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(text);
    setTimeout(() => setCopied(null), COPY_FEEDBACK_DURATION_MS);
  }, []);
  return { copied, copy };
}

// ── Sub-components ────────────────────────────────────
function Swatch({ hex, label, onClick }: { hex: string; label: string; onClick: () => void }) {
  const lum = relativeLuminance(hex);
  const textColor = lum > 0.18 ? "var(--ref-energy-neutral-800)" : "var(--ref-energy-neutral-100)";
  return (
    <button
      onClick={onClick}
      title={`Click to copy ${hex}`}
      style={{
        background: hex,
        color: textColor,
        border: "1px solid var(--sys-energy-border-default)",
        borderRadius: "var(--ref-frame-radius-1)",
        padding: "var(--ref-frame-space-2)",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "var(--ref-frame-space-micro)",
        minHeight: "var(--ref-frame-space-14)",
        minWidth: 0,
        transition:
          "transform var(--ref-momentum-duration-fast) var(--ref-momentum-easing-standard)",
        flex: "1 1 0",
      }}
      onMouseEnter={(e) => {
        (e.target as HTMLElement).style.transform = "scale(1.08)";
      }}
      onMouseLeave={(e) => {
        (e.target as HTMLElement).style.transform = "scale(1)";
      }}
    >
      <span
        style={{
          fontFamily: "var(--ref-voice-family-mono)",
          fontSize: "var(--ref-voice-size-1)",
          opacity: 0.7,
        }}
      >
        {label}
      </span>
      <span
        style={{ fontFamily: "var(--ref-voice-family-mono)", fontSize: "var(--ref-voice-size-2)" }}
      >
        {hex}
      </span>
    </button>
  );
}

// ── Mobile swatch row (single-column, full-width) ─────
function SwatchRow({ hex, label, onClick }: { hex: string; label: string; onClick: () => void }) {
  const lum = relativeLuminance(hex);
  const textColor = lum > 0.18 ? "var(--ref-energy-neutral-800)" : "var(--ref-energy-neutral-100)";
  return (
    <button
      onClick={onClick}
      title={`Copy ${hex}`}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        padding: "var(--ref-frame-space-3)",
        background: hex,
        color: textColor,
        border: "1px solid var(--sys-energy-border-default)",
        borderRadius: "var(--ref-frame-radius-1)",
        cursor: "pointer",
        fontFamily: "var(--ref-voice-family-mono)",
      }}
    >
      <span style={{ fontSize: "var(--ref-voice-size-3)", opacity: 0.8 }}>{label}</span>
      <span style={{ fontSize: "var(--ref-voice-size-3)" }}>{hex}</span>
    </button>
  );
}

// ── Palette steps grid (shared rendering, mode-aware) ──
function PaletteSteps({
  steps,
  copy,
  compact,
}: {
  steps: PaletteScale;
  copy: (t: string) => void;
  compact: boolean;
}) {
  if (compact) {
    return (
      <div
        style={{ display: "flex", flexDirection: "column", gap: "var(--ref-frame-space-micro)" }}
      >
        {steps.map((s) => (
          <SwatchRow key={s.step} hex={s.hex} label={s.step} onClick={() => copy(s.hex)} />
        ))}
      </div>
    );
  }
  return (
    <div style={{ display: "flex", gap: "var(--ref-frame-space-1)" }}>
      {steps.map((s) => (
        <Swatch key={s.step} hex={s.hex} label={s.step} onClick={() => copy(s.hex)} />
      ))}
    </div>
  );
}

// ── Semantic mapping row (responsive) ─────────────────
function SemanticRow({
  entry,
  copy,
  compact,
}: {
  entry: SemanticEntry;
  copy: (t: string) => void;
  compact: boolean;
}) {
  const swatchStyle = {
    width: "var(--ref-frame-space-6)",
    height: "var(--ref-frame-space-6)",
    borderRadius: "var(--ref-frame-radius-1)",
    border: "1px solid var(--sys-energy-border-default)",
    cursor: "pointer",
    flexShrink: 0 as const,
  };

  if (compact) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column" as const,
          gap: "var(--ref-frame-space-2)",
          padding: "var(--ref-frame-space-2) var(--ref-frame-space-3)",
          borderRadius: "var(--ref-frame-radius-1)",
          background: "var(--sys-energy-surface-secondary)",
        }}
      >
        <span
          style={{
            fontFamily: "var(--ref-voice-family-mono)",
            fontSize: "var(--ref-voice-size-3)",
          }}
        >
          {entry.token}
        </span>
        <Inline gap={3} align="center">
          <Inline gap={2} align="center">
            <div
              role="button"
              tabIndex={0}
              style={{ ...swatchStyle, background: entry.lightHex }}
              onClick={() => copy(entry.lightHex)}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && copy(entry.lightHex)}
              title={`Light: ${entry.lightHex}`}
            />
            <span
              style={{
                fontFamily: "var(--ref-voice-family-mono)",
                fontSize: "var(--ref-voice-size-2)",
                color: "var(--sys-energy-text-secondary)",
              }}
            >
              {entry.lightRef}
            </span>
          </Inline>
          <Inline gap={2} align="center">
            <div
              role="button"
              tabIndex={0}
              style={{ ...swatchStyle, background: entry.darkHex }}
              onClick={() => copy(entry.darkHex)}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && copy(entry.darkHex)}
              title={`Dark: ${entry.darkHex}`}
            />
            <span
              style={{
                fontFamily: "var(--ref-voice-family-mono)",
                fontSize: "var(--ref-voice-size-2)",
                color: "var(--sys-energy-text-secondary)",
              }}
            >
              {entry.darkRef}
            </span>
          </Inline>
        </Inline>
        <span
          style={{ fontSize: "var(--ref-voice-size-2)", color: "var(--sys-energy-text-tertiary)" }}
        >
          {entry.usage}
        </span>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "200px 1fr 1fr 180px",
        gap: "var(--ref-frame-space-3)",
        alignItems: "center",
        padding: "var(--ref-frame-space-2) var(--ref-frame-space-3)",
        borderRadius: "var(--ref-frame-radius-1)",
        background: "var(--sys-energy-surface-secondary)",
      }}
    >
      <span
        style={{ fontFamily: "var(--ref-voice-family-mono)", fontSize: "var(--ref-voice-size-3)" }}
      >
        {entry.token}
      </span>
      <Inline gap={2} align="center">
        <div
          role="button"
          tabIndex={0}
          style={{ ...swatchStyle, background: entry.lightHex }}
          onClick={() => copy(entry.lightHex)}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && copy(entry.lightHex)}
          title={`Light: ${entry.lightHex}`}
        />
        <span
          style={{
            fontFamily: "var(--ref-voice-family-mono)",
            fontSize: "var(--ref-voice-size-2)",
            color: "var(--sys-energy-text-secondary)",
          }}
        >
          {entry.lightRef}
        </span>
      </Inline>
      <Inline gap={2} align="center">
        <div
          role="button"
          tabIndex={0}
          style={{ ...swatchStyle, background: entry.darkHex }}
          onClick={() => copy(entry.darkHex)}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && copy(entry.darkHex)}
          title={`Dark: ${entry.darkHex}`}
        />
        <span
          style={{
            fontFamily: "var(--ref-voice-family-mono)",
            fontSize: "var(--ref-voice-size-2)",
            color: "var(--sys-energy-text-secondary)",
          }}
        >
          {entry.darkRef}
        </span>
      </Inline>
      <span
        style={{ fontSize: "var(--ref-voice-size-3)", color: "var(--sys-energy-text-tertiary)" }}
      >
        {entry.usage}
      </span>
    </div>
  );
}

// ── Content sections ──────────────────────────────────
const refPaletteIntro = (
  <>
    <Text variant="paragraph-s" color="secondary">
      Click any swatch to copy its hex value. All values sourced from the canonical{" "}
      <code>ref.energy</code> palette aligned with Figma Edenred.
    </Text>
  </>
);

const sysMappingsIntro = (
  <>
    <Text variant="paragraph-s" color="secondary">
      Each sys.energy token maps to a ref step. Light and dark themes remap to different steps.
    </Text>
  </>
);

function RefPaletteSection({ copy, isMobile }: { copy: (t: string) => void; isMobile: boolean }) {
  if (isMobile) {
    return (
      <Stack gap="component">
        {refPaletteIntro}
        <FlowAccordion
          multiple
          bordered={false}
          size="sm"
          aria-label="Ref palette scales"
          items={palettes.map((pal) => ({
            id: pal.key,
            label: `${pal.name} (${pal.steps.length})`,
            content: <PaletteSteps steps={pal.steps} copy={copy} compact />,
          }))}
        />
      </Stack>
    );
  }

  return (
    <Stack gap="subsection">
      {refPaletteIntro}
      {palettes.map((pal) => (
        <Stack key={pal.key} gap={3}>
          <Text variant="display-s" as="h4">
            {pal.name}
          </Text>
          <PaletteSteps steps={pal.steps} copy={copy} compact={false} />
        </Stack>
      ))}
    </Stack>
  );
}

function SysMappingsSection({ copy, isMobile }: { copy: (t: string) => void; isMobile: boolean }) {
  // Build core category items
  const coreCategories = ["surface", "text", "border", "action", "state", "status", "icon"]
    .map((category) => {
      const entries = coreSemanticMappings.filter((e) => e.token.startsWith(category));
      if (entries.length === 0) return null;
      return { key: category, label: category, entries };
    })
    .filter(Boolean) as { key: string; label: string; entries: SemanticEntry[] }[];

  // Build extended category items
  const extendedCategories = ["purple", "teal", "orange", "pink"]
    .map((color) => {
      const entries = extendedSemanticMappings.filter((e) => e.token.includes(color));
      if (entries.length === 0) return null;
      return { key: color, label: color, entries };
    })
    .filter(Boolean) as { key: string; label: string; entries: SemanticEntry[] }[];

  const compact = isMobile;

  const renderEntries = (entries: SemanticEntry[]) => (
    <div
      style={{ display: "grid", gridTemplateColumns: "1fr", gap: "var(--ref-frame-space-micro)" }}
    >
      {entries.map((entry) => (
        <SemanticRow key={entry.token} entry={entry} copy={copy} compact={compact} />
      ))}
    </div>
  );

  if (isMobile) {
    return (
      <Stack gap="component">
        {sysMappingsIntro}

        <Text variant="label-l">Core Semantic Mappings</Text>
        <FlowAccordion
          multiple
          bordered={false}
          size="sm"
          aria-label="Core semantic categories"
          items={coreCategories.map((cat) => ({
            id: cat.key,
            label: `${cat.label.charAt(0).toUpperCase() + cat.label.slice(1)} (${cat.entries.length})`,
            content: renderEntries(cat.entries),
          }))}
        />

        <Divider spacing={0} />

        <Text variant="label-l">Extended Palette Mappings</Text>
        <FlowAccordion
          multiple
          bordered={false}
          size="sm"
          aria-label="Extended semantic categories"
          items={extendedCategories.map((cat) => ({
            id: cat.key,
            label: `${cat.label.charAt(0).toUpperCase() + cat.label.slice(1)} (${cat.entries.length})`,
            content: renderEntries(cat.entries),
          }))}
        />
      </Stack>
    );
  }

  return (
    <Stack gap="component">
      {sysMappingsIntro}

      <Text variant="display-s">Core Semantic Mappings</Text>
      {coreCategories.map((cat) => (
        <Stack key={cat.key} gap={3}>
          <Text variant="heading-xl" className="flow-text-capitalize">
            {cat.label}
          </Text>
          {renderEntries(cat.entries)}
        </Stack>
      ))}

      <Divider spacing={0} />

      <Text variant="display-s">Extended Palette Mappings</Text>
      {extendedCategories.map((cat) => (
        <Stack key={cat.key} gap={3}>
          <Text variant="heading-xl" className="flow-text-capitalize">
            {cat.label}
          </Text>
          {renderEntries(cat.entries)}
        </Stack>
      ))}
    </Stack>
  );
}

// ── Main component ────────────────────────────────────
export function EnergyExplorer() {
  const { copied, copy } = useCopyFeedback();
  const isMobile = useIsMobile();

  return (
    <Stack gap="subsection">
      {/* Copied feedback toast */}
      {copied && (
        <div
          style={{
            position: "fixed",
            bottom: "var(--ref-frame-space-6)",
            right: "var(--ref-frame-space-6)",
            background: "var(--sys-energy-surface-inverse)",
            color: "var(--sys-energy-text-inverse)",
            padding: "var(--ref-frame-space-2) var(--ref-frame-space-4)",
            borderRadius: "var(--ref-frame-radius-2)",
            fontFamily: "var(--ref-voice-family-mono)",
            fontSize: "var(--ref-voice-size-4)",
            zIndex: 1000,
            boxShadow: "var(--ref-depth-shadow-3)",
          }}
        >
          Copied: {copied}
        </div>
      )}

      {/* ── Ref Palette ── */}
      <Stack gap="component">
        <Text variant="display-m">Ref Palette</Text>
        <RefPaletteSection copy={copy} isMobile={isMobile} />
      </Stack>

      <Divider spacing={0} />

      {/* ── Sys Mappings ── */}
      <Stack gap="component">
        <Text variant="display-m">Sys Mappings</Text>
        <SysMappingsSection copy={copy} isMobile={isMobile} />
      </Stack>
    </Stack>
  );
}

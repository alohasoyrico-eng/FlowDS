 
 
 
/**
 * FLOW — Pattern Registry (barrel)
 *
 * This file assembles the full PATTERN_REGISTRY from per-category slices.
 * Each category lives in ./pattern-registry/<category>.tsx.
 *
 * To add a new pattern:
 *   1. Add its demo functions + PatternEntry const to the matching category file.
 *   2. Export it in that file's `*Patterns` object.
 *   3. The PATTERN_REGISTRY here updates automatically via the spread.
 */
import type { ReactNode } from "react";

// ── Type re-exports ──────────────────────────────────────────────────────────
export type { PropEntry, GuidelineEntry } from "../components/doc-primitives";

// ── Shared interfaces ────────────────────────────────────────────────────────

export interface AnatomyEntry {
  part: string;
  description: string;
  tokens: string[];
  note?: string;
}

export interface AccessibilitySpec {
  handled: string[];
  required?: string[];
  keyboard?: string[];
}

export interface PatternSpec {
  name: string;
  purpose: string;
  platform: "shared" | "desktop" | "mobile";
  composesL3: string[];
  orchestrates: string[];
  doesNotOwn?: string[];
  anatomy?: AnatomyEntry[];
  variants?: string[];
  states?: string[];
  accessibility?: AccessibilitySpec;
  source?: string;
}

export interface CompositionEntry {
  component: string;
  role: string;
  tokens?: string[];
}

export interface PatternDeveloperGuide {
  reactImport: string;
  reactUsage: string;
  flutterImport: string;
  flutterUsage: string;
  props?: PropEntry[];
  guidelines?: GuidelineEntry[];
}

export interface PatternEntry {
  category: string;
  spec: PatternSpec;
  composition?: CompositionEntry[];
  demos: {
    overview?: (ctx?: { patternName: string }) => ReactNode;
    variants?: (ctx?: { patternName: string }) => ReactNode;
    useCases?: (ctx?: { patternName: string }) => ReactNode;
  };
  developer: PatternDeveloperGuide;
}

import type { GuidelineEntry, PropEntry } from "../components/doc-primitives";
// ── Category slices ──────────────────────────────────────────────────────────
import { feedbackPatterns } from "./pattern-registry/feedback";
import { displayPatterns } from "./pattern-registry/display";
import { inputPatternsPatterns } from "./pattern-registry/input-patterns";
import { contentPatterns } from "./pattern-registry/content";
import { overlayPatterns } from "./pattern-registry/overlay";
import { layoutPatterns } from "./pattern-registry/layout";
import { navigationPatterns } from "./pattern-registry/navigation";
import { dataPatterns } from "./pattern-registry/data";

// ── Master registry ──────────────────────────────────────────────────────────

export const PATTERN_REGISTRY: Record<string, PatternEntry> = {
  ...feedbackPatterns,
  ...displayPatterns,
  ...inputPatternsPatterns,
  ...contentPatterns,
  ...overlayPatterns,
  ...layoutPatterns,
  ...navigationPatterns,
  ...dataPatterns,
};

/**
 * Get pattern entry by category and slug
 */
export function getPatternEntry(category: string, slug: string): PatternEntry | undefined {
  return PATTERN_REGISTRY[`${category}/${slug}`];
}

/**
 * Get all patterns in a category
 */
export function getPatternsByCategory(category: string): PatternEntry[] {
  return Object.entries(PATTERN_REGISTRY)
    .filter(([key]) => key.startsWith(`${category}/`))
    .map(([, entry]) => entry);
}

/**
 * FLOW - Component Registry Types
 * Shared types and interfaces for the component registry system.
 */
import type { ReactNode } from "react";

import type { GuidelineEntry, PropEntry } from "../../components/doc-primitives";
import type { PlaygroundConfig } from "../../components/prop-playground";

export interface ComponentSpec {
  name: string;
  purpose: string;
  platform: "shared" | "desktop" | "mobile";
  anatomy?: AnatomyEntry[];
  variants?: string[];
  states?: string[];
  accessibility?: AccessibilitySpec;
}

/** Structured accessibility spec - separates FLOW's responsibilities from consumer's */
export interface AccessibilitySpec {
  /** What FLOW handles automatically - the consumer gets this for free */
  handled: string[];
  /** What the consumer must provide for the component to be accessible */
  required?: string[];
  /** Keyboard interaction patterns */
  keyboard?: string[];
}

export interface AnatomyEntry {
  part: string;
  description: string;
  tokens: string[];
  note?: string;
}

export interface DeveloperGuide {
  reactImport: string;
  reactUsage: string;
  flutterImport: string;
  flutterUsage: string;
  /** @deprecated Use `guidelines` for structured notes. Still rendered as fallback. */
  notes?: string;
  /** Structured props/API reference table */
  props?: PropEntry[];
  /** Structured guidelines - rendered as bullet list with intent icons */
  guidelines?: GuidelineEntry[];
}

export interface ComponentEntry {
  domain: string;
  spec: ComponentSpec;
  demos: {
    overview?: () => ReactNode;
    variants?: () => ReactNode;
  };
  developer: DeveloperGuide;
  /** Optional interactive playground config for the Usage tab */
  playground?: PlaygroundConfig;
}

// PropEntry & GuidelineEntry are defined in doc-primitives
export type { PropEntry, GuidelineEntry } from "../../components/doc-primitives";

// ========================================
// Shared constants
// ========================================

export const SIZES = ["sm", "md", "lg", "xl"] as const;
export const BUTTON_VARIANTS = ["high", "medium", "low", "outline", "danger", "warning", "ghost"] as const;

/** Canonical icon per variant - used across all FlowButton demos for consistency */
export const VARIANT_ICON: Record<string, string> = {
  high: "plus",
  medium: "edit",
  low: "copy",
  outline: "download",
  danger: "trash",
  warning: "alert-triangle",
  ghost: "settings",
};

export const CHIP_VARIANTS = [
  "default",
  "accent",
  "success",
  "warning",
  "danger",
  "outlined",
  "tonal",
] as const;
export const CHIP_SIZES = ["sm", "md", "lg", "xl"] as const;
export const TAG_VARIANTS = ["default", "accent", "success", "warning", "danger", "code"] as const;
export const TAG_SIZES = ["sm", "md", "lg", "xl"] as const;

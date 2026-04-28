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

/** Structured keyboard interaction for accessibility docs */
export interface KeyboardInteraction {
  /** Key or key combination, e.g. "Tab", "Enter / Space", "← → Arrow keys" */
  key: string;
  /** What the key does, e.g. "Move focus to next element" */
  action: string;
}

/** Structured accessibility spec - separates FLOW's responsibilities from consumer's */
export interface AccessibilitySpec {
  /** What FLOW handles automatically - the consumer gets this for free */
  handled: string[];
  /** What the consumer must provide for the component to be accessible */
  required?: string[];
  /** Keyboard interaction patterns */
  keyboard?: KeyboardInteraction[];
  /** WCAG 2.1 success criteria IDs, e.g. ["2.1.1", "4.1.2"] */
  wcag?: string[];
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
export const BUTTON_VARIANTS = ["primary", "secondary", "tertiary", "outlined", "ghost"] as const;

/** Canonical icon per variant - used across all FlowButton demos for consistency */
export const VARIANT_ICON: Record<string, string> = {
  primary: "plus",
  secondary: "edit",
  tertiary: "copy",
  outlined: "download",
  ghost: "settings",
};

export const CHIP_VARIANTS = ["filled", "outlined", "tonal"] as const;
export const CHIP_SIZES = ["sm", "md", "lg", "xl"] as const;
export const TAG_VARIANTS = ["default", "accent", "success", "warning", "danger", "code"] as const;
export const TAG_SIZES = ["sm", "md", "lg", "xl"] as const;

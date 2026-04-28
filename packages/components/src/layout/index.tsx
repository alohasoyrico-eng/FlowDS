/**
 * FLOW Domain: Layout (L3)
 * Atomic structural composition: accordions, split panes, fieldsets.
 * Compound layout patterns (Toolbar suite, SwipeActions, QuickActions)
 * promoted to '../patterns' (L4).
 *
 * @domain layout
 * @layer L3
 * @since FLOW v2.2 — L3/L4 separation
 */

// ── Accordion ──
/** @platform shared */
export { FlowAccordion } from "./FlowAccordion";
export type { AccordionProps, AccordionItem } from "./FlowAccordion";

// ── Split Pane ──
/** @platform desktop */
export { FlowSplitPane } from "./FlowSplitPane";
export type { SplitPaneProps } from "./FlowSplitPane";

// ── Form Field Wrapper ──
/** @platform shared */
export { FlowFieldset } from "./FlowFieldset";
export type { FieldsetProps } from "./FlowFieldset";

// ── Shortcut Grid ──
/** @platform mobile — inline grid of icon+label action shortcuts */
export { FlowShortcutGrid } from "./FlowShortcutGrid";
export type { ShortcutGridProps } from "./FlowShortcutGrid";

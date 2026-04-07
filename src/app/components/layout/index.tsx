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

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Deprecated aliases — promoted to patterns/ (L4)
// Will be removed after Q4 2026
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/** @deprecated Since FLOW v2.2 — Import from '../patterns' instead (compound toolbar pattern) */
export {
  FlowToolbar,
  FlowToolbarDivider,
  FlowToolbarGroup,
  FlowToolbarSpacer,
} from "../patterns/FlowToolbar";
/** @deprecated Since FLOW v2.2 — Import from '../patterns' instead */
export { FlowSwipeActions } from "../patterns/FlowSwipeActions";
// ── Shortcut Grid ──
/** @platform mobile — inline grid of icon+label action shortcuts */
export { FlowShortcutGrid } from "./FlowShortcutGrid";
export type { ShortcutGridProps } from "./FlowShortcutGrid";

/** @deprecated Since FLOW v2.2 — Import from '../patterns' instead */
export { FlowFormSection } from "../patterns/FlowFormSection";

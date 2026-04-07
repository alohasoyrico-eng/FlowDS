/**
 * FLOW Domain: Controls (L3)
 * Pure action triggers — fire-and-forget interactions.
 * Selection controls (Radio, Checkbox, Switch, SegmentedControl, ToggleButton)
 * moved to '../selection' in FLOW v2.2.
 *
 * @domain controls
 * @layer L3
 * @since FLOW v2.2 — Controls / Selection / Inputs split
 */

// ── Buttons ──
/** @platform shared */
export { FlowButton } from "./FlowButton";
export type { ButtonProps } from "./FlowButton";
/** @platform shared */
export { FlowIconButton } from "./FlowIconButton";
export type { IconButtonProps } from "./FlowIconButton";

// ── Floating Action Button ──
/** @platform mobile */
export { FlowFAB } from "./FlowFAB";
export type { FABProps } from "./FlowFAB";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Deprecated aliases — migrated to selection/
// Will be removed after Q4 2026
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/** @deprecated Since FLOW v2.2 — Import from '../selection' instead */
export { FlowSegmentedControl } from "../selection/FlowSegmentedControl";
/** @deprecated Since FLOW v2.2 — Import from '../selection' instead */
export { FlowToggleButton, FlowToggleButtonGroup } from "../selection/FlowToggleButton";

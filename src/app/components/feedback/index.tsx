/**
 * FLOW Domain: Feedback (L3)
 * Atomic progress indicators, loading states, and validation messages.
 * Compound feedback patterns (SnackbarProvider, PullToRefresh)
 * promoted to '../patterns' (L4).
 *
 * @domain feedback
 * @layer L3
 * @since FLOW v2.2 — L3/L4 separation
 */

// ── Loading / Progress ──
/** @platform shared */
export { FlowSkeleton } from "./FlowSkeleton";
export type { SkeletonProps } from "./FlowSkeleton";
/** @platform shared */
export { FlowProgressBar } from "./FlowProgressBar";
export type { ProgressBarProps } from "./FlowProgressBar";
/** @platform shared */
export { FlowCircularProgress } from "./FlowCircularProgress";
export type { CircularProgressProps } from "./FlowCircularProgress";

// ── Validation ──
/** @platform shared */
export { FlowInlineValidationMessage } from "./FlowInlineValidationMessage";
export type { InlineValidationMessageProps } from "./FlowInlineValidationMessage";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Deprecated aliases — promoted to patterns/ (L4)
// Will be removed after Q4 2026
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/** @deprecated Since FLOW v2.2 — Import from '../patterns' instead (compound toast queue) */
export { FlowSnackbarProvider, useSnackbar } from "../patterns/FlowSnackbar";
/** @deprecated Since FLOW v2.2 — Import from '../patterns' instead (compound gesture pattern) */
export { FlowPullToRefresh } from "../patterns/FlowPullToRefresh";
/** @deprecated Since FLOW v2.2 — Import from '../patterns' instead */
export { FlowEmptyState } from "../patterns/FlowEmptyState";
/** @deprecated Since FLOW v2.2 — Import from '../patterns' instead */
export { FlowNotificationPanel } from "../patterns/FlowNotificationPanel";
/** @deprecated Since FLOW v2.2 — Import type from '../patterns' instead */
export type { NotificationItem } from "../patterns/FlowNotificationPanel";

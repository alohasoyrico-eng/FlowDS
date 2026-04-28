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

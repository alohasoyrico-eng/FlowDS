/**
 * FLOW Design System — Meta-Package Entry Point
 * ──────────────────────────────────────────────
 * Re-exports everything from all @flow/* packages.
 * Backwards-compatible with the original single-package API.
 *
 * Usage:
 *   import { FlowButton, Surface, Text } from "@flow/design-system";
 *   import "@flow/design-system/styles";
 *
 * @package @flow/design-system
 */

// ── CSS side-effect import ─────────────────────────────────────────────────────
import "./flow.css";

// ── Tokens ─────────────────────────────────────────────────────────────────────
export { ref, sysLight, sysDark, compLight, compDark, foundationColors } from "@flow/tokens";

// ── Icons & Flags ──────────────────────────────────────────────────────────────
export { flowIcons } from "@flow/icons";
export type { FlowIcon } from "@flow/icons";
export {
  flagRegistry,
  FLAG_COUNT,
  FLAG_CELL_SIZE,
  flagByCode,
  flagCodes,
  flagSizeMap,
} from "@flow/flags";
export type { FlagEntry, FlagSize } from "@flow/flags";

// ── L2 Primitives ──────────────────────────────────────────────────────────────
export * from "@flow/primitives";

// ── L3 Components ──────────────────────────────────────────────────────────────
export * from "@flow/components";

// ── L4 Patterns ────────────────────────────────────────────────────────────────
export * from "@flow/patterns";

/**
 * FLOW Domain: Overlays (L3)
 * Atomic floating layers: dialogs, sheets, menus, popovers, tooltips.
 * Compound overlay patterns (FullscreenSheet) promoted to '../patterns' (L4).
 *
 * @domain overlays
 * @layer L3
 * @since FLOW v2.2 — L3/L4 separation
 */

// ── Dialog ──
/** @platform shared */
export { FlowDialog } from "./FlowDialog";
export type { DialogProps } from "./FlowDialog";

// ── Sheet ──
/** @platform mobile */
export { FlowBottomSheet } from "./FlowBottomSheet";
export type { BottomSheetProps } from "./FlowBottomSheet";

// ── Menu ──
/** @platform desktop — right-click triggered context menu */
export { FlowContextMenu } from "./FlowContextMenu";
export type { ContextMenuProps, ContextMenuItem } from "./FlowContextMenu";
/** @platform shared — click-triggered dropdown menu */
export { FlowMenu } from "./FlowMenu";
export type { MenuProps, MenuItem } from "./FlowMenu";

// ── Popover / Tooltip ──
/** @platform shared */
export { FlowPopover } from "./FlowPopover";
export type { PopoverProps } from "./FlowPopover";
/** @platform desktop — hover interaction, no hover on touch */
export { FlowTooltip } from "./FlowTooltip";
export type { TooltipProps } from "./FlowTooltip";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Deprecated aliases — promoted to patterns/ (L4)
// Will be removed after Q4 2026
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/** @deprecated Since FLOW v2.2 — Import from '../patterns' instead (compound multi-step sheet) */
export { FlowFullscreenSheet } from "../patterns/FlowFullscreenSheet";
/** @deprecated Since FLOW v2.2 — Import from '../patterns' instead */
export { FlowConfirmationDialog } from "../patterns/FlowConfirmationDialog";
/** @deprecated Since FLOW v2.2 — Import from '../patterns' instead */
export { FlowCommandPalette } from "../patterns/FlowCommandPalette";
/** @deprecated Since FLOW v2.2 — Import type from '../patterns' instead */
export type { CommandItem } from "../patterns/FlowCommandPalette";

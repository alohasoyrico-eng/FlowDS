/**
 * FLOW - Component Registry (v3.0 - Modular Architecture)
 *
 * This file re-exports all component registry entries from domain-specific modules.
 * Each domain now lives in its own file for better performance and maintainability.
 *
 * Architecture:
 * - /registry/types.tsx - Shared types and constants
 * - /registry/display/* - Display domain (FlowList, FlowChip, FlowTag, FlowBadge, FlowCard, FlowAvatar, FlowTable, FlowKPITrendIndicator, FlowTreeView)
 * - /registry/navigation/* - Navigation domain (FlowBreadcrumbs, FlowTabs, FlowPagination, FlowStepper, FlowBottomNav, FlowSidebar)
 * - /registry/controls/* - Controls domain (FlowButton, FlowIconButton, FlowFAB)
 * - /registry/selection/* - Selection domain (FlowSwitch, FlowRadio, FlowCheckbox, FlowSelect, etc.)
 * - /registry/inputs/* - Inputs domain (FlowTextInput, FlowTextArea)
 * - /registry/overlays/* - Overlays domain (FlowTooltip, FlowDialog, FlowBottomSheet, FlowContextMenu, FlowMenu, FlowPopover)
 * - /registry/layout/* - Layout domain (FlowAccordion, FlowSplitPane, FlowFieldset)
 * - /registry/feedback/* - Feedback domain (FlowSkeleton, FlowProgressBar, FlowCircularProgress, FlowInlineValidationMessage)
 * - /registry/data/* - Data domain (FlowSortControl, FlowChartLegendItem)
 */

// Re-export types
export type {
  ComponentEntry,
  ComponentSpec,
  DeveloperGuide,
  AccessibilitySpec,
  AnatomyEntry,
  PropEntry,
  GuidelineEntry,
} from "./registry/types";

// Import all domain registries
import { DISPLAY_REGISTRY } from "./registry/display/registry";
import { NAVIGATION_REGISTRY } from "./registry/navigation/registry";
import { CONTROLS_REGISTRY } from "./registry/controls/registry";
import { SELECTION_REGISTRY } from "./registry/selection/registry";
import { INPUTS_REGISTRY } from "./registry/inputs/registry";
import { OVERLAYS_REGISTRY } from "./registry/overlays/registry";
import { LAYOUT_REGISTRY } from "./registry/layout/registry";
import { FEEDBACK_REGISTRY } from "./registry/feedback/registry";
import { DATA_REGISTRY } from "./registry/data/registry";
import type { ComponentEntry } from "./registry/types";

// Unified component registry - merges all domain registries
export const COMPONENT_REGISTRY: Record<string, ComponentEntry> = {
  ...DISPLAY_REGISTRY,
  ...NAVIGATION_REGISTRY,
  ...CONTROLS_REGISTRY,
  ...SELECTION_REGISTRY,
  ...INPUTS_REGISTRY,
  ...OVERLAYS_REGISTRY,
  ...LAYOUT_REGISTRY,
  ...FEEDBACK_REGISTRY,
  ...DATA_REGISTRY,
};

// Legacy export alias for backward compatibility
export const registry = COMPONENT_REGISTRY;

/**
 * FLOW Design System — Interactive Component Demos
 * ─────────────────────────────────────────────────
 * Exercises ALL 78 L3 components from phases 1–12 through live, interactive demos.
 * This page is the doc-site's primary dogfooding surface for L3.
 *
 * Core demos are split into sub-modules; extended demos (p2–p11) live in ../demos-extended.tsx
 * and are rendered via <ExtendedDemos />.
 */
import { Divider, FlowChip, Inline, Text } from "../../../lib";
import ExtendedDemos from "../demos-extended";
import { ControlsDemos } from "./controls";
import { DisplayDemos } from "./display";
import { FeedbackDemos } from "./feedback";
import { InputsDemos } from "./inputs";
import { OverlaysNavDemos } from "./overlays-nav";
import { SelectionDemos } from "./selection";

export function DemosPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--sys-frame-gap-page)",
        minWidth: 0,
      }}
    >
      {/* ── Page Header ── */}
      <header
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--sys-frame-gap-component)",
          minWidth: 0,
        }}
      >
        <Text role="overline">Dogfooding — Interactive</Text>
        <Text role="display-xl">L3 Component Demos</Text>
        <Text style={{ maxWidth: "var(--sys-frame-content-prose)" }}>
          Live, interactive demos exercising all L3 components in the Flow design system. Every
          component from phases 1–12 — 78 components in total — no mock HTML or CSS classes.
        </Text>
        <Inline wrap gap={2}>
          {[
            "FlowButton",
            "FlowIconButton",
            "FlowTextInput",
            "FlowPhoneInput",
            "FlowCountrySelect",
            "FlowRadioButton",
            "FlowCheckbox",
            "FlowSwitch",
            "FlowCard",
            "FlowDialog",
            "FlowChip",
            "FlowTable",
            "FlowSelect",
            "FlowTextArea",
            "FlowTooltip",
            "FlowSnackbar",
            "FlowSkeleton",
            "FlowProgressBar",
            "FlowEmptyState",
            "FlowAvatar",
            "FlowBadge",
            "FlowTabs",
            "FlowList",
            "FlowSlider",
            "FlowCircularProgress",
            "FlowAccordion",
            "FlowPagination",
            "FlowSegmentedControl",
            "FlowStepper",
            "FlowPopover",
            "FlowMenu",
            "FlowToggleButton",
            "FlowSearch",
            "FlowPullToRefresh",
            "FlowSwipeActions",
            "FlowTopbar",
            "FlowAutocomplete",
            "FlowDrawerAdapter",
            "FlowFullscreenSheet",
            "FlowDatePicker",
            "FlowKPICard",
            "FlowAdvancedFilters",
            "FlowChartWrapper",
            "FlowTimeline",
            "FlowFieldset",
            "FlowFormSection",
            "FlowInlineEditable",
            "FlowHoverCard",
            "FlowFilterChipGroup",
            "FlowSortControl",
            "FlowColumnConfigurator",
            "FlowConfirmationDialog",
            "FlowMultiSelect",
            "FlowDateRangePicker",
            "FlowVirtualDataTable",
            "FlowBottomNav",
            "FlowBottomSheet",
            "FlowFAB",
            "FlowOTPInput",
            "FlowShortcutGrid",
            "FlowSidebar",
            "FlowDataTable",
            "FlowToolbar",
            "FlowBreadcrumbs",
            "FlowContextMenu",
          ].map((name) => (
            <FlowChip key={name} variant="accent">
              {name}
            </FlowChip>
          ))}
        </Inline>
      </header>

      <Divider spacing={0} />

      <ControlsDemos />

      <Divider spacing={0} />

      <InputsDemos />

      <Divider spacing={0} />

      <SelectionDemos />

      <Divider spacing={0} />

      <DisplayDemos />

      <Divider spacing={0} />

      <FeedbackDemos />

      <Divider />

      <OverlaysNavDemos />
      <ExtendedDemos />
    </div>
  );
}

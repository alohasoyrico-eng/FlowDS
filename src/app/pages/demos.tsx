/**
 * FLOW Design System — Interactive Component Demos
 * ─────────────────────────────────────────────────
 * Exercises ALL 78 L3 components from phases 1–12 through live, interactive demos.
 * This page is the doc-site's primary dogfooding surface for L3.
 *
 * Core demos are inline below; extended demos (p2–p11) live in ./demos-extended.tsx
 * and are rendered via <ExtendedDemos />.
 */
import { type CSSProperties, type ReactNode, useState } from "react";

import {
  Code,
  Divider,
  flagByCode,
  FlowBottomNav,
  FlowBottomSheet,
  FlowBreadcrumbs,
  FlowButton,
  FlowCard,
  FlowCheckbox,
  FlowCheckboxGroup,
  FlowChip,
  FlowContextMenu,
  FlowCountrySelect,
  FlowDialog,
  FlowEmptyState,
  FlowFAB,
  FlowIconButton,
  FlowOTPInput,
  FlowPhoneInput,
  FlowProgressBar,
  FlowRadioButton,
  FlowRadioGroup,
  FlowSelect,
  FlowSidebar,
  FlowSkeleton,
  FlowSnackbarProvider,
  FlowSwitch,
  FlowTable,
  type FlowTableColumn,
  FlowTextArea,
  FlowTextInput,
  FlowToolbar,
  FlowTooltip,
  Grid,
  Inline,
  Stack,
  Surface,
  Text,
  useSnackbar,
} from "../../lib";
import { FlowDataTable } from "../components/patterns";
import { FlowShortcutGrid } from "../components/layout";
import ExtendedDemos from "./demos-extended";

type Density = "compact" | "default" | "comfortable";

// Responsive grid helpers — using Grid's minItemWidth for auto-fit responsive columns
const GRID_2_MIN = "280px";
const GRID_3_MIN = "240px";

// ── DemoSection — consistent section wrapper ──
// Uses sys-level spacing tokens so padding & gaps respond to density.
// Structure: title area → Surface (grouped content separated from background)

/** Density-responsive group inside DemoSection. Replaces <Stack gap={2}> for subsection wrappers. */
function DemoGroup({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--sys-frame-gap-component)",
        minWidth: 0,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function DemoSection({
  title,
  description,
  children,
  surfaceProps,
  noSurface = false,
}: {
  title: string;
  description?: ReactNode;
  children: ReactNode;
  /** Extra props for the Surface wrapper (e.g. style overrides) */
  surfaceProps?: { style?: CSSProperties; className?: string };
  /** Render children without a Surface (for demos that ARE surfaces, like FlowCard) */
  noSurface?: boolean;
}) {
  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--sys-frame-gap-subsection)",
        minWidth: 0,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--sys-frame-gap-component)",
        }}
      >
        <Text role="heading-l">{title}</Text>
        {description && (
          <Text style={{ maxWidth: "var(--sys-frame-content-prose)" }}>{description}</Text>
        )}
      </div>

      {noSurface ? (
        children
      ) : (
        <Surface
          padding={0}
          radius="surface"
          border
          style={{
            padding: "var(--sys-frame-padding-surface)",
            overflow: "clip",
            ...surfaceProps?.style,
          }}
          className={surfaceProps?.className}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--sys-frame-gap-subsection)",
            }}
          >
            {children}
          </div>
        </Surface>
      )}
    </section>
  );
}

export function DemosPage() {
  // ── FlowButton state ──
  const [btnLoading, setBtnLoading] = useState(false);
  const [btnClicks, setBtnClicks] = useState(0);

  // ── FlowTextInput state ──
  const [textInputValue, setTextInputValue] = useState("");
  const [textInputError, setTextInputError] = useState("");
  const [textInputDisabled, setTextInputDisabled] = useState(false);

  const validateTextInput = (v: string) => {
    setTextInputValue(v);
    if (v.length > 0 && v.length < 3) {
      setTextInputError("Minimum 3 characters required");
    } else if (v.includes("@") && !v.includes(".")) {
      setTextInputError("Enter a valid email address");
    } else {
      setTextInputError("");
    }
  };

  // ── FlowIconButton selected state ──
  const [boldActive, setBoldActive] = useState(false);
  const [italicActive, setItalicActive] = useState(true);
  const [underlineActive, setUnderlineActive] = useState(false);

  // ── FlowDialog state ──
  const [alertOpen, setAlertOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [dialogSizeDemo, setDialogSizeDemo] = useState<"sm" | "md" | "lg" | "xl" | null>(null);
  const [formDialogSizeDemo, setFormDialogSizeDemo] = useState<"sm" | "md" | "lg" | "xl" | null>(
    null,
  );

  // ── FlowCard state ──
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  // ── FlowChip state ──
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set(["Active", "Energy"]));

  // ── FlowPhoneInput state ──
  const [phone, setPhone] = useState("");
  const [phoneCountry, setPhoneCountry] = useState("FR");
  const [phoneError, setPhoneError] = useState("");

  const handlePhoneChange = (value: string) => {
    setPhone(value);
    if (phoneError && value.length > 0) setPhoneError("");
  };

  const handlePhoneValidate = () => {
    if (phone.length === 0) {
      setPhoneError("Phone number is required");
    } else if (phone.length < 6) {
      setPhoneError("Phone number is too short");
    } else {
      setPhoneError("");
    }
  };

  // ── FlowCountrySelect state ──
  const [selectedCountry, setSelectedCountry] = useState("FR");
  const [countrySelectError, setCountrySelectError] = useState("");

  // ── FlowSelect state ──
  const [fruit, setFruit] = useState("");

  // ── FlowRadioButton state ──
  const [plan, setPlan] = useState("standard");
  const [radioSize, setRadioSize] = useState("md");
  const [standalone, setStandalone] = useState("a");

  // ── FlowCheckbox state ──
  const [terms, setTerms] = useState(false);
  const [newsletter, setNewsletter] = useState(true);
  const [marketing, setMarketing] = useState(false);

  const childChecked = [terms, newsletter, marketing];
  const allChecked = childChecked.every(Boolean);
  const someChecked = childChecked.some(Boolean) && !allChecked;

  const handleParentCheckbox = (checked: boolean) => {
    setTerms(checked);
    setNewsletter(checked);
    setMarketing(checked);
  };

  // ── FlowSwitch state ──
  const [wifi, setWifi] = useState(true);
  const [bluetooth, setBluetooth] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  // ── FlowTextArea state ──
  const [bio, setBio] = useState("");

  // ── FlowProgressBar state ──
  const [progress, setProgress] = useState(65);

  // ── Mobile Components state ──
  const [bottomNavActive, setBottomNavActive] = useState("home");
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [otpError, setOtpError] = useState(false);

  // ── Desktop Components state ──
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarActive, setSidebarActive] = useState("dashboard");
  const [dataTableSelected, setDataTableSelected] = useState(0);

  // ── Dynamic height hints per density × size ──
  const heightMap: Record<Density, Record<string, string>> = {
    compact: { sm: "40px", md: "50px", lg: "60px", xl: "74px" },
    default: { sm: "48px", md: "60px", lg: "72px", xl: "88px" },
    comfortable: { sm: "58px", md: "72px", lg: "86px", xl: "106px" },
  };
  const labelMap: Record<Density, Record<string, string>> = {
    compact: { sm: "11px", md: "12px", lg: "14px", xl: "18px" },
    default: { sm: "12px", md: "14px", lg: "18px", xl: "24px" },
    comfortable: { sm: "14px", md: "18px", lg: "24px", xl: "28px" },
  };
  const _sizeHint = (s: string) => `${heightMap["default"][s]} · ${labelMap["default"][s]}`;

  const handleLoadingClick = () => {
    setBtnLoading(true);
    setTimeout(() => setBtnLoading(false), 2000);
  };

  const toggleFilter = (f: string) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(f)) next.delete(f);
      else next.add(f);
      return next;
    });
  };

  // ── FlowSelect demo data ──
  const fruitOptions = [
    { value: "apple", label: "Apple", icon: "check" },
    { value: "banana", label: "Banana" },
    { value: "cherry", label: "Cherry" },
    { value: "grape", label: "Grape" },
    { value: "mango", label: "Mango" },
    { value: "unavailable", label: "Unavailable (disabled)", disabled: true },
    { value: "orange", label: "Orange" },
    { value: "peach", label: "Peach" },
  ];

  const roleOptions = [
    { value: "admin", label: "Administrator" },
    { value: "editor", label: "Editor" },
    { value: "viewer", label: "Viewer" },
    { value: "guest", label: "Guest" },
  ];

  // ── FlowTable demo data ──
  const tokenData = [
    {
      name: "comp.button.radius",
      value: "var(--sys-frame-radius-control)",
      layer: "comp",
      usage: "Button corner radius",
    },
    {
      name: "comp.button.height.md",
      value: "var(--sys-frame-height-control-md)",
      layer: "comp",
      usage: "Medium button height (60px default)",
    },
    {
      name: "comp.card.radius",
      value: "var(--sys-frame-radius-container)",
      layer: "comp",
      usage: "Card corner radius",
    },
    {
      name: "sys.energy.text.primary",
      value: "#1E293B",
      layer: "sys",
      usage: "Primary text color (neutral-800)",
    },
    {
      name: "sys.energy.surface.primary",
      value: "#ffffff",
      layer: "sys",
      usage: "Primary surface",
    },
    { name: "ref.frame.space.4", value: "16px", layer: "ref", usage: "Standard spacing unit" },
    { name: "ref.voice.size.5", value: "14px", layer: "ref", usage: "Voice size step 5" },
    {
      name: "sys.momentum.transition.fast",
      value: "100ms ease",
      layer: "sys",
      usage: "Fast UI transitions",
    },
  ];

  const tokenColumns: FlowTableColumn<(typeof tokenData)[number]>[] = [
    { key: "name", header: "Token", cellRole: "code" },
    { key: "value", header: "Value", cellRole: "code" },
    {
      key: "layer",
      header: "Layer",
      render: (row) => (
        <FlowChip
          variant={row.layer === "ref" ? "default" : row.layer === "sys" ? "accent" : "default"}
          size="sm"
        >
          {row.layer}
        </FlowChip>
      ),
    },
    { key: "usage", header: "Usage" },
  ];

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

      {/* ═══════════════════════════════════════════════ */}
      {/* ── 1. FlowButton ── */}
      {/* ═══════════════════════════════════════════════ */}
      <DemoSection
        title="FlowButton"
        description="All 7 emphasis levels (v2), 4 sizes (sm/md/lg/xl), loading state, and disabled state — fully interactive."
      >
        {/* v2 Emphasis Model */}
        <DemoGroup>
          <Text role="overline">v2 Emphasis Model (D1-D8)</Text>
          <Text role="caption" color="tertiary">
            New Figma-aligned taxonomy: high → medium → low → outline → danger → warning → ghost. Hover and press each to see
            state transitions.
          </Text>
          <Inline gap={3} wrap style={{ alignItems: "center" }}>
            <FlowButton variant="high" onClick={() => setBtnClicks((c) => c + 1)}>
              High
            </FlowButton>
            <FlowButton variant="medium" onClick={() => setBtnClicks((c) => c + 1)}>
              Medium
            </FlowButton>
            <FlowButton variant="outline" onClick={() => setBtnClicks((c) => c + 1)}>
              Outline
            </FlowButton>
            <FlowButton variant="low" onClick={() => setBtnClicks((c) => c + 1)}>
              Low
            </FlowButton>
            <FlowButton variant="danger" onClick={() => setBtnClicks((c) => c + 1)}>
              Danger
            </FlowButton>
            <FlowButton variant="warning" onClick={() => setBtnClicks((c) => c + 1)}>
              Warning
            </FlowButton>
            <FlowButton variant="ghost" onClick={() => setBtnClicks((c) => c + 1)}>
              Ghost
            </FlowButton>
          </Inline>
          <Text role="caption" color="tertiary">
            Click count: {btnClicks}
          </Text>
        </DemoGroup>

        {/* v2 Sizes */}
        <DemoGroup>
          <Text role="overline">Sizes × Emphasis</Text>
          <Inline gap={3} wrap style={{ alignItems: "center" }}>
            <FlowButton variant="high" size="sm">
              Small High
            </FlowButton>
            <FlowButton variant="high" size="md">
              Medium High
            </FlowButton>
            <FlowButton variant="high" size="lg">
              Large High
            </FlowButton>
            <FlowButton variant="high" size="xl">
              XL High
            </FlowButton>
          </Inline>
          <Inline gap={3} wrap style={{ alignItems: "center" }}>
            <FlowButton variant="medium" size="sm">
              Small Medium
            </FlowButton>
            <FlowButton variant="medium" size="md">
              Medium Medium
            </FlowButton>
            <FlowButton variant="medium" size="lg">
              Large Medium
            </FlowButton>
            <FlowButton variant="medium" size="xl">
              XL Medium
            </FlowButton>
          </Inline>
        </DemoGroup>

        {/* State Showcase */}
        <DemoGroup>
          <Text role="overline">State Showcase</Text>
          <Text role="caption" color="tertiary">
            All interaction states — hover over each to see transitions
          </Text>
          <Inline gap="component" align="center" wrap>
            <Stack gap={1} style={{ alignItems: "center" }}>
              <FlowButton variant="high">Default</FlowButton>
              <Text role="caption" color="tertiary">
                Default
              </Text>
            </Stack>
            <Stack gap={1} style={{ alignItems: "center" }}>
              <FlowButton variant="high" disabled>
                Disabled
              </FlowButton>
              <Text role="caption" color="tertiary">
                Disabled
              </Text>
            </Stack>
            <Stack gap={1} style={{ alignItems: "center" }}>
              <FlowButton variant="high" loading loadingLabel="Loading...">
                Save
              </FlowButton>
              <Text role="caption" color="tertiary">
                Loading
              </Text>
            </Stack>
            <Stack gap={1} style={{ alignItems: "center" }}>
              <FlowButton variant="medium">Default</FlowButton>
              <Text role="caption" color="tertiary">
                Medium
              </Text>
            </Stack>
            <Stack gap={1} style={{ alignItems: "center" }}>
              <FlowButton variant="medium" disabled>
                Disabled
              </FlowButton>
              <Text role="caption" color="tertiary">
                Medium Dis
              </Text>
            </Stack>
            <Stack gap={1} style={{ alignItems: "center" }}>
              <FlowButton variant="low">Default</FlowButton>
              <Text role="caption" color="tertiary">
                Low
              </Text>
            </Stack>
            <Stack gap={1} style={{ alignItems: "center" }}>
              <FlowButton variant="danger">Danger</FlowButton>
              <Text role="caption" color="tertiary">
                Danger
              </Text>
            </Stack>
            <Stack gap={1} style={{ alignItems: "center" }}>
              <FlowButton variant="danger" disabled>
                Disabled
              </FlowButton>
              <Text role="caption" color="tertiary">
                Danger Dis
              </Text>
            </Stack>
          </Inline>
        </DemoGroup>

        {/* Interactive Loading */}
        <DemoGroup>
          <Text role="overline">Interactive Loading</Text>
          <Text role="caption" color="tertiary">
            Click any button to trigger 2-second loading state with pulsing dots animation.
          </Text>
          <Inline gap={3} wrap style={{ alignItems: "center" }}>
            <FlowButton
              variant="high"
              loading={btnLoading}
              loadingLabel="Loading..."
              onClick={handleLoadingClick}
            >
              High — click to load
            </FlowButton>
            <FlowButton
              variant="medium"
              loading={btnLoading}
              loadingLabel="Loading..."
              onClick={handleLoadingClick}
            >
              Medium — click to load
            </FlowButton>
            <FlowButton
              variant="danger"
              loading={btnLoading}
              loadingLabel="Deleting..."
              onClick={handleLoadingClick}
            >
              Danger — click to load
            </FlowButton>
            <FlowButton
              variant="low"
              loading={btnLoading}
              loadingLabel="Loading..."
              onClick={handleLoadingClick}
            >
              Low — click to load
            </FlowButton>
          </Inline>
        </DemoGroup>

        {/* With Icons */}
        <DemoGroup>
          <Text role="overline">With Leading Icons</Text>
          <Text role="caption" color="tertiary">
            Icons scale with size: sm/md → 16px, lg → 20px, xl → 24px.
          </Text>
          <Inline gap={3} wrap style={{ alignItems: "center" }}>
            <FlowButton variant="high" leadingIcon="check">
              Confirm
            </FlowButton>
            <FlowButton variant="medium" leadingIcon="edit">
              Edit
            </FlowButton>
            <FlowButton variant="danger" leadingIcon="trash">
              Delete
            </FlowButton>
            <FlowButton variant="low" leadingIcon="download">
              Download
            </FlowButton>
          </Inline>
          <Inline gap={3} wrap style={{ alignItems: "center" }}>
            <FlowButton variant="high" size="sm" leadingIcon="check">
              Small
            </FlowButton>
            <FlowButton variant="high" size="md" leadingIcon="check">
              Medium
            </FlowButton>
            <FlowButton variant="high" size="lg" leadingIcon="check">
              Large
            </FlowButton>
            <FlowButton variant="high" size="xl" leadingIcon="check">
              Extra Large
            </FlowButton>
          </Inline>
        </DemoGroup>
      </DemoSection>

      <Divider spacing={0} />

      {/* ═══════════════════════════════════════════════ */}
      {/* ── 1b. FlowIconButton ── */}
      {/* ═══════════════════════════════════════════════ */}
      <DemoSection
        title="FlowIconButton"
        description="Compact, square icon-only action trigger. Always requires aria-label. Tooltip on hover/focus via CSS."
      >
        {/* All 5 variants */}
        <DemoGroup>
          <Text role="overline">Emphasis Levels</Text>
          <Inline gap={3} wrap style={{ alignItems: "center" }}>
            <FlowIconButton icon="edit" variant="high" aria-label="Edit" tooltip="High" />
            <FlowIconButton
              icon="settings"
              variant="medium"
              aria-label="Settings"
              tooltip="Medium"
            />
            <FlowIconButton icon="copy" variant="low" aria-label="Copy" tooltip="Low" />
            <FlowIconButton icon="trash" variant="danger" aria-label="Delete" tooltip="Danger" />
          </Inline>
          <Text role="caption" color="tertiary">
            high (dark filled) · medium (outlined) · low (ghost) · outline (border) · danger
            (subtle→filled) · warning (subtle→filled) · ghost (minimal) — same emphasis model as
            FlowButton
          </Text>
        </DemoGroup>

        {/* Sizes */}
        <DemoGroup>
          <Text role="overline">Sizes</Text>
          <Inline gap={3} wrap style={{ alignItems: "center" }}>
            <FlowIconButton
              icon="check"
              variant="high"
              size="sm"
              aria-label="Small"
              tooltip="32px"
            />
            <FlowIconButton
              icon="check"
              variant="high"
              size="md"
              aria-label="Medium"
              tooltip="40px"
            />
            <FlowIconButton
              icon="check"
              variant="high"
              size="lg"
              aria-label="Large"
              tooltip="48px"
            />
          </Inline>
          <Inline gap={3} wrap style={{ alignItems: "center" }}>
            <FlowIconButton icon="check" variant="medium" size="sm" aria-label="Small medium" />
            <FlowIconButton icon="check" variant="medium" size="md" aria-label="Medium medium" />
            <FlowIconButton icon="check" variant="medium" size="lg" aria-label="Large medium" />
          </Inline>
        </DemoGroup>

        {/* State Showcase */}
        <DemoGroup>
          <Text role="overline">State Showcase</Text>
          <Text role="caption" color="tertiary">
            All interaction states — hover over each to see transitions
          </Text>
          <Inline gap="component" align="center" wrap>
            <Stack gap={1} style={{ alignItems: "center" }}>
              <FlowIconButton icon="star" variant="high" aria-label="Default" />
              <Text role="caption" color="tertiary">
                Default
              </Text>
            </Stack>
            <Stack gap={1} style={{ alignItems: "center" }}>
              <FlowIconButton icon="star" variant="high" selected aria-label="Selected" />
              <Text role="caption" color="tertiary">
                Selected
              </Text>
            </Stack>
            <Stack gap={1} style={{ alignItems: "center" }}>
              <FlowIconButton icon="star" variant="high" disabled aria-label="Disabled" />
              <Text role="caption" color="tertiary">
                Disabled
              </Text>
            </Stack>
            <Stack gap={1} style={{ alignItems: "center" }}>
              <FlowIconButton icon="star" variant="high" loading aria-label="Loading" />
              <Text role="caption" color="tertiary">
                Loading
              </Text>
            </Stack>
            <Stack gap={1} style={{ alignItems: "center" }}>
              <FlowIconButton icon="star" variant="medium" aria-label="Medium" />
              <Text role="caption" color="tertiary">
                Medium
              </Text>
            </Stack>
            <Stack gap={1} style={{ alignItems: "center" }}>
              <FlowIconButton icon="star" variant="low" aria-label="Low" />
              <Text role="caption" color="tertiary">
                Low
              </Text>
            </Stack>
            <Stack gap={1} style={{ alignItems: "center" }}>
              <FlowIconButton icon="trash" variant="danger" aria-label="Danger" />
              <Text role="caption" color="tertiary">
                Danger
              </Text>
            </Stack>
            <Stack gap={1} style={{ alignItems: "center" }}>
              <FlowIconButton
                icon="trash"
                variant="danger"
                disabled
                aria-label="Danger disabled"
              />
              <Text role="caption" color="tertiary">
                Danger Dis
              </Text>
            </Stack>
          </Inline>
        </DemoGroup>

        {/* Interactive Patterns */}
        <DemoGroup>
          <Text role="overline">Interactive Patterns — Toolbar & Toggle</Text>
          <Text role="caption" color="tertiary">
            Common patterns: toolbar grouping with dividers, and toggleable selected state
            (aria-pressed).
          </Text>
          <Stack gap={3}>
            <div
              style={{
                display: "inline-flex",
                gap: "var(--ref-frame-space-1)",
                padding: "var(--ref-frame-space-1)",
                borderRadius: "var(--ref-frame-radius-2)",
                border: "var(--ref-frame-border-thin) solid var(--sys-energy-border-default)",
                background: "var(--sys-energy-surface-secondary)",
              }}
            >
              <FlowIconButton
                icon="edit"
                variant="low"
                size="sm"
                aria-label="Edit"
                tooltip="Edit"
              />
              <FlowIconButton
                icon="copy"
                variant="low"
                size="sm"
                aria-label="Copy"
                tooltip="Copy"
              />
              <FlowIconButton
                icon="download"
                variant="low"
                size="sm"
                aria-label="Download"
                tooltip="Download"
              />
              <div
                style={{
                  width: "var(--ref-frame-border-thin)",
                  background: "var(--sys-energy-border-default)",
                  margin: "var(--ref-frame-space-1) 0",
                }}
              />
              <FlowIconButton
                icon="trash"
                variant="danger"
                size="sm"
                aria-label="Delete"
                tooltip="Delete"
              />
            </div>
            <Inline gap={3} wrap style={{ alignItems: "center" }}>
              <FlowIconButton
                icon="type"
                variant="low"
                selected={boldActive}
                onClick={() => setBoldActive(!boldActive)}
                aria-label="Bold"
                tooltip="Bold"
              />
              <FlowIconButton
                icon="edit"
                variant="low"
                selected={italicActive}
                onClick={() => setItalicActive(!italicActive)}
                aria-label="Italic"
                tooltip="Italic"
              />
              <FlowIconButton
                icon="layers"
                variant="low"
                selected={underlineActive}
                onClick={() => setUnderlineActive(!underlineActive)}
                aria-label="Underline"
                tooltip="Underline"
              />
              <FlowIconButton
                icon="check"
                variant="medium"
                selected
                aria-label="Approved"
                tooltip="Medium selected"
              />
              <FlowIconButton
                icon="star"
                variant="high"
                selected
                aria-label="Favorited"
                tooltip="High selected"
              />
            </Inline>
          </Stack>
        </DemoGroup>
      </DemoSection>

      <Divider spacing={0} />

      {/* ═══════════════════════════════════════════════ */}
      {/* ── 2. FlowTextInput ── */}
      {/* ═══════════════════════════════════════════════ */}
      <DemoSection
        title="FlowTextInput"
        description={
          <>
            Floating-label input from Figma Edenred. 4 sizes (sm/md/lg/xl → 48/60/72/88px default),
            animated label via CSS transform, progressive border-width (1.5px→2px), clearable
            button, and hint/error with warning icon.
          </>
        }
      >
        {/* Sizes — sm/md/lg/xl */}
        <DemoGroup>
          <Text role="overline">Sizes — sm / md / lg / xl</Text>
          <Text role="caption" color="tertiary">
            All 4 sizes share the same label/value font — only height, padding, label offset, and
            input bottom change per size. Density scales all uniformly.
          </Text>
          <Inline gap="component" align="end" style={{ flexWrap: "wrap" }}>
            <div style={{ flex: "1 1 160px" }}>
              <FlowTextInput size="sm" label="Small" placeholder="sm" hint="48px · 12px label" />
            </div>
            <div style={{ flex: "1 1 160px" }}>
              <FlowTextInput size="md" label="Medium" placeholder="md" hint="60px · 14px label" />
            </div>
            <div style={{ flex: "1 1 160px" }}>
              <FlowTextInput size="lg" label="Large" placeholder="lg" hint="72px · 18px label" />
            </div>
            <div style={{ flex: "1 1 160px" }}>
              <FlowTextInput
                size="xl"
                label="Extra Large"
                placeholder="xl"
                hint="88px · 24px label"
                clearable
              />
            </div>
          </Inline>
        </DemoGroup>

        {/* Default + Hint + Clearable */}
        <DemoGroup>
          <Text role="overline">Default / Hint / Clearable</Text>
          <Text role="caption" color="tertiary">
            Click to focus — label floats up. Type to see clear button appear. Hover the container
            to see 2px border.
          </Text>
          <Grid minItemWidth={GRID_2_MIN} gap="component">
            <FlowTextInput label="Full name" hint="As it appears on your ID" />
            <FlowTextInput
              label="Email address"
              hint="We'll never share your email"
              clearable
              type="email"
              placeholder="john@example.com"
            />
          </Grid>
        </DemoGroup>

        {/* Live validation */}
        <DemoGroup>
          <Text role="overline">Live Validation</Text>
          <Text role="caption" color="tertiary">
            Type to trigger validation — under 3 chars shows error, &quot;@&quot; without &quot;.&quot; shows error.
            Clear to reset.
          </Text>
          <Grid minItemWidth={GRID_2_MIN} gap="component">
            <FlowTextInput
              label="Username"
              hint="Must be at least 3 characters"
              error={textInputError || undefined}
              value={textInputValue}
              onChange={validateTextInput}
              clearable
              onClear={() => {
                setTextInputValue("");
                setTextInputError("");
              }}
            />
            <FlowTextInput label="Password" type="password" hint="At least 8 characters" />
          </Grid>
        </DemoGroup>

        {/* State Showcase */}
        <DemoGroup>
          <Text role="overline">State Showcase</Text>
          <Text role="caption" color="tertiary">
            All visual states — focus, error, success, loading, disabled
          </Text>
          <Grid minItemWidth={GRID_3_MIN} gap="component">
            <FlowTextInput label="Default" hint="Default state" />
            <FlowTextInput label="With value" defaultValue="Hello World" hint="Label floated" />
            <FlowTextInput label="Error" error="This field is required" defaultValue="Invalid" />
            <FlowTextInput
              label="Success"
              defaultValue="user@example.com"
              success
              hint="Email verified"
            />
            <FlowTextInput label="Loading" defaultValue="checking..." loading hint="Validating" />
            <FlowTextInput label="Disabled" defaultValue="Cannot edit" disabled hint="Read-only" />
          </Grid>
        </DemoGroup>

        <Inline gap={3}>
          <FlowButton
            variant="low"
            size="sm"
            onClick={() => setTextInputDisabled(!textInputDisabled)}
          >
            Toggle disabled
          </FlowButton>
          <FlowButton
            variant="low"
            size="sm"
            onClick={() => {
              setTextInputValue("");
              setTextInputError("");
            }}
          >
            Clear validation
          </FlowButton>
        </Inline>
      </DemoSection>

      <Divider spacing={0} />

      {/* ═══════════════════���═══════════════════════════ */}
      {/* ── 2b. FlowPhoneInput ── */}
      {/* ═══════════════════════════════════════════════ */}
      <DemoSection
        title="FlowPhoneInput"
        description="Composes FlowTextInput anatomy + FlowFlag. 4 sizes (sm/md/lg/xl). Includes flag prefix with country selector dropdown, dial code, floating label, and all standard input states."
      >
        {/* Sizes */}
        <DemoGroup>
          <Text role="overline">Sizes — sm / md / lg / xl</Text>
          <Grid columns="repeat(auto-fill, minmax(260px, 1fr))" gap="component">
            <FlowPhoneInput size="sm" label="Small" hint="48px · 12px" country="FR" />
            <FlowPhoneInput size="md" label="Medium" hint="60px · 14px" country="BR" />
            <FlowPhoneInput size="lg" label="Large" hint="72px · 18px" country="ES" />
            <FlowPhoneInput size="xl" label="Extra Large" hint="88px · 24px" country="AU" />
          </Grid>
        </DemoGroup>

        {/* Default */}
        <DemoGroup>
          <Text role="overline">Interactive Example</Text>
          <div style={{ maxWidth: "var(--ref-frame-content-form)" }}>
            <FlowPhoneInput
              label="Phone number"
              hint="Enter your mobile number"
              value={phone}
              country={phoneCountry}
              onChange={(val) => handlePhoneChange(val)}
              onCountryChange={(c) => setPhoneCountry(c.code)}
              error={phoneError}
            />
          </div>
          <Inline gap={2}>
            <FlowButton variant="medium" size="sm" onClick={handlePhoneValidate}>
              Validate
            </FlowButton>
            <FlowButton
              variant="low"
              size="sm"
              onClick={() => {
                setPhone("");
                setPhoneError("");
                setPhoneCountry("FR");
              }}
            >
              Reset
            </FlowButton>
          </Inline>
          {phone && (
            <Text role="caption" color="secondary">
              Full number: {flagByCode[phoneCountry]?.dial} {phone}
            </Text>
          )}
        </DemoGroup>

        {/* Pre-filled countries */}
        <DemoGroup>
          <Text role="overline">Pre-filled with Different Countries</Text>
          <Grid columns="repeat(auto-fill, minmax(280px, 1fr))" gap="component">
            <FlowPhoneInput
              label="Phone number"
              hint="Brazil office"
              country="BR"
              defaultValue="11 9876 5432"
            />
            <FlowPhoneInput
              label="Phone number"
              hint="Belgium office"
              country="BE"
              defaultValue="2 123 45 67"
            />
            <FlowPhoneInput
              label="Phone number"
              hint="Spain office"
              country="ES"
              defaultValue="912 345 678"
            />
          </Grid>
        </DemoGroup>

        {/* State Showcase */}
        <DemoGroup>
          <Text role="overline">State Showcase</Text>
          <Grid columns="repeat(auto-fill, minmax(280px, 1fr))" gap="component">
            <FlowPhoneInput
              label="Error state"
              error="Invalid phone number format"
              country="FR"
              defaultValue="123"
            />
            <FlowPhoneInput
              label="Success state"
              country="FR"
              defaultValue="6 12 34 56 78"
              success
              hint="Number verified"
            />
            <FlowPhoneInput
              label="Loading state"
              country="BR"
              defaultValue="555 123 4567"
              loading
              hint="Checking number"
            />
            <FlowPhoneInput
              label="Disabled"
              hint="This field is disabled"
              country="FR"
              defaultValue="6 12 34 56 78"
              disabled
            />
          </Grid>
        </DemoGroup>
      </DemoSection>

      <Divider spacing={0} />

      {/* ═══════════════���═══════════════════════════════ */}
      {/* ── 2c. FlowCountrySelect ── */}
      {/* ═══════════════════════════════════════════════ */}
      <DemoSection
        title="FlowCountrySelect"
        description="Combobox country picker — 4 sizes (sm/md/lg/xl). Click or focus to open the dropdown and type to search/filter countries inline. Keyboard navigation (Arrow + Enter) supported."
      >
        <DemoGroup>
          <Text role="overline">Sizes — sm / md / lg / xl</Text>
          <Grid columns="repeat(auto-fill, minmax(260px, 1fr))" gap="component">
            <FlowCountrySelect size="sm" label="Small" hint="48px · 12px" defaultValue="FR" />
            <FlowCountrySelect size="md" label="Medium" hint="60px · 14px" defaultValue="BR" />
            <FlowCountrySelect size="lg" label="Large" hint="72px · 18px" defaultValue="ES" />
            <FlowCountrySelect size="xl" label="Extra Large" hint="88px · 24px" defaultValue="AU" />
          </Grid>
        </DemoGroup>

        <DemoGroup>
          <Text role="overline">Interactive Example</Text>
          <div style={{ maxWidth: "var(--ref-frame-content-form)" }}>
            <FlowCountrySelect
              label="Country"
              hint="Select your country of residence"
              value={selectedCountry}
              onChange={(c) => {
                setSelectedCountry(c.code);
                if (countrySelectError) setCountrySelectError("");
              }}
              error={countrySelectError || undefined}
            />
          </div>
          <Inline gap={2}>
            <FlowButton
              variant="medium"
              size="sm"
              onClick={() => {
                if (!selectedCountry) setCountrySelectError("Country is required");
                else setCountrySelectError("");
              }}
            >
              Validate
            </FlowButton>
            <FlowButton
              variant="low"
              size="sm"
              onClick={() => {
                setSelectedCountry("FR");
                setCountrySelectError("");
              }}
            >
              Reset
            </FlowButton>
          </Inline>
          {selectedCountry && (
            <Text role="caption" color="secondary">
              Selected: {selectedCountry} — {flagByCode[selectedCountry]?.name}
            </Text>
          )}
        </DemoGroup>

        <DemoGroup>
          <Text role="overline">Pre-filled with Different Countries</Text>
          <Grid columns="repeat(auto-fill, minmax(280px, 1fr))" gap="component">
            <FlowCountrySelect label="Country" hint="Brazil office" defaultValue="BR" />
            <FlowCountrySelect label="Nationality" hint="Belgium HQ" defaultValue="BE" />
            <FlowCountrySelect label="Tax residence" hint="Spain branch" defaultValue="ES" />
          </Grid>
        </DemoGroup>

        <DemoGroup>
          <Text role="overline">State Showcase</Text>
          <Grid columns="repeat(auto-fill, minmax(280px, 1fr))" gap="component">
            <FlowCountrySelect
              label="Error state"
              error="Please select a valid country"
              defaultValue="FR"
            />
            <FlowCountrySelect
              label="Success state"
              defaultValue="FR"
              success
              hint="Country confirmed"
            />
            <FlowCountrySelect
              label="Loading state"
              defaultValue="BR"
              loading
              hint="Verifying eligibility"
            />
            <FlowCountrySelect
              label="Disabled"
              hint="This field is disabled"
              defaultValue="FR"
              disabled
            />
          </Grid>
        </DemoGroup>
      </DemoSection>

      <Divider spacing={0} />

      {/* ═══════════════════════════════════════════════ */}
      {/* ── 2d. FlowSelect ── */}
      {/* ═══════════════════════════════════════════════ */}
      <DemoSection
        title="FlowSelect"
        description="Generic dropdown select with floating label, keyboard navigation, and full ARIA combobox pattern. Shares textInput comp tokens for visual consistency. Supports icons, disabled options, error/hint states."
      >
        <DemoGroup>
          <Text role="overline">Interactive Example</Text>
          <Grid minItemWidth={GRID_3_MIN} gap="component">
            <FlowSelect label="Role" options={roleOptions} hint="Choose your access level" />
            <FlowSelect
              label="Favourite fruit"
              options={fruitOptions}
              value={fruit}
              onChange={(v) => setFruit(v)}
              hint="Some options have icons"
            />
            <FlowSelect
              label="Department"
              options={[
                { value: "eng", label: "Engineering" },
                { value: "design", label: "Design" },
                { value: "marketing", label: "Marketing" },
              ]}
              error="Selection required"
              required
            />
          </Grid>
        </DemoGroup>

        <DemoGroup>
          <Text role="overline">Sizes — sm / md / lg / xl</Text>
          <Inline gap="component" align="end" style={{ flexWrap: "wrap" }}>
            <div style={{ flex: "1 1 160px" }}>
              <FlowSelect label="Small" size="sm" options={roleOptions} />
            </div>
            <div style={{ flex: "1 1 160px" }}>
              <FlowSelect label="Medium" size="md" options={roleOptions} />
            </div>
            <div style={{ flex: "1 1 160px" }}>
              <FlowSelect label="Large" size="lg" options={roleOptions} />
            </div>
            <div style={{ flex: "1 1 160px" }}>
              <FlowSelect label="Extra Large" size="xl" options={roleOptions} />
            </div>
          </Inline>
        </DemoGroup>

        <DemoGroup>
          <Text role="overline">State Showcase</Text>
          <Text role="caption" color="tertiary">
            All visual states — error, success, loading, disabled
          </Text>
          <Grid minItemWidth={GRID_3_MIN} gap="component">
            <FlowSelect label="Default" options={roleOptions} hint="No state applied" />
            <FlowSelect label="Error" options={roleOptions} error="Selection required" />
            <FlowSelect
              label="Success"
              options={roleOptions}
              defaultValue="admin"
              success
              hint="Role assigned"
            />
            <FlowSelect label="Loading" options={roleOptions} loading hint="Fetching options..." />
            <FlowSelect label="Disabled" options={roleOptions} defaultValue="viewer" disabled />
          </Grid>
        </DemoGroup>
      </DemoSection>

      <Divider spacing={0} />

      {/* ═══════════════════════════════════════════════ */}
      {/* ── 2e. FlowRadioButton ── */}
      {/* ═══════════════════════════════════════════════ */}
      <DemoSection
        title="FlowRadioButton"
        description={
          <>
            Figma-aligned radio button with CSS-driven state-layer, border progression (1.5→2px),
            and dot scale animation. Uses native <Code>&lt;input type=&quot;radio&quot;&gt;</Code>{" "}
            for full accessibility (keyboard, form submission, screen reader).
          </>
        }
      >
        <DemoGroup>
          <Text role="overline">RadioGroup — Subscription Plan</Text>
          <FlowRadioGroup name="plan" value={plan} onChange={setPlan} direction="column">
            <FlowRadioButton value="free" label="Free — Basic features" />
            <FlowRadioButton value="standard" label="Standard — Most popular" />
            <FlowRadioButton value="premium" label="Premium — Full access" />
            <FlowRadioButton value="enterprise" label="Enterprise" disabled />
          </FlowRadioGroup>
          <Text role="caption" color="secondary">
            Selected: <Code>{plan}</Code>
          </Text>
        </DemoGroup>

        <DemoGroup>
          <Text role="overline">Horizontal Group</Text>
          <FlowRadioGroup
            name="size-pref"
            value={radioSize}
            onChange={setRadioSize}
            direction="row"
          >
            <FlowRadioButton value="sm" label="Small" />
            <FlowRadioButton value="md" label="Medium" />
            <FlowRadioButton value="lg" label="Large" />
          </FlowRadioGroup>
          <Text role="caption" color="secondary">
            Selected: <Code>{radioSize}</Code>
          </Text>
        </DemoGroup>

        <DemoGroup>
          <Text role="overline">State Showcase</Text>
          <Inline gap="component" align="center">
            <Stack gap={1} style={{ alignItems: "center" }}>
              <FlowRadioButton
                name="state-demo"
                value="a"
                checked={standalone === "a"}
                onChange={setStandalone}
              />
              <Text role="caption" color="tertiary">
                Checked
              </Text>
            </Stack>
            <Stack gap={1} style={{ alignItems: "center" }}>
              <FlowRadioButton
                name="state-demo"
                value="b"
                checked={standalone === "b"}
                onChange={setStandalone}
              />
              <Text role="caption" color="tertiary">
                Unchecked
              </Text>
            </Stack>
            <Stack gap={1} style={{ alignItems: "center" }}>
              <FlowRadioButton
                name="disabled-unselected"
                value="x"
                disabled
                aria-label="Disabled unselected"
              />
              <Text role="caption" color="tertiary">
                Disabled
              </Text>
            </Stack>
            <Stack gap={1} style={{ alignItems: "center" }}>
              <FlowRadioButton
                name="disabled-selected"
                value="y"
                checked
                disabled
                onChange={() => {}}
                aria-label="Disabled selected"
              />
              <Text role="caption" color="tertiary">
                Disabled Checked
              </Text>
            </Stack>
          </Inline>
        </DemoGroup>

        <DemoGroup>
          <Text role="overline">Size Variants</Text>
          <Inline gap="component" align="center">
            {(["sm", "md", "lg", "xl"] as const).map((s) => (
              <Stack key={s} gap={1} style={{ alignItems: "center" }}>
                <FlowRadioButton
                  name="size-demo-radio"
                  value={s}
                  size={s}
                  checked={s === "md"}
                  onChange={() => {}}
                  label={s.toUpperCase()}
                />
              </Stack>
            ))}
          </Inline>
        </DemoGroup>
      </DemoSection>

      <Divider spacing={0} />

      {/* ═══════════════════════════════════════════════ */}
      {/* ── 2f. FlowCheckbox ── */}
      {/* ═══════════════════════════════════════════════ */}
      <DemoSection
        title="FlowCheckbox"
        description={
          <>
            Checkbox with 3 sub-states: unchecked, checked, and indeterminate. Uses native{" "}
            <Code>&lt;input type=&quot;checkbox&quot;&gt;</Code> with indeterminate set via ref. SVG
            check and dash icons with scale animation.
          </>
        }
      >
        <DemoGroup>
          <Text role="overline">Parent/Child — Indeterminate Pattern</Text>
          <Stack gap={1}>
            <FlowCheckbox
              label="Select all preferences"
              checked={allChecked}
              indeterminate={someChecked}
              onChange={handleParentCheckbox}
            />
            <div style={{ paddingLeft: "var(--ref-frame-space-8)" }}>
              <Stack gap={1}>
                <FlowCheckbox
                  label="Accept terms & conditions"
                  checked={terms}
                  onChange={setTerms}
                />
                <FlowCheckbox
                  label="Subscribe to newsletter"
                  checked={newsletter}
                  onChange={setNewsletter}
                />
                <FlowCheckbox
                  label="Receive marketing emails"
                  checked={marketing}
                  onChange={setMarketing}
                />
              </Stack>
            </div>
          </Stack>
        </DemoGroup>

        <DemoGroup>
          <Text role="overline">State Showcase</Text>
          <Inline gap="component" align="center">
            <Stack gap={1} style={{ alignItems: "center" }}>
              <FlowCheckbox aria-label="Unchecked" />
              <Text role="caption" color="tertiary">
                Unchecked
              </Text>
            </Stack>
            <Stack gap={1} style={{ alignItems: "center" }}>
              <FlowCheckbox checked onChange={() => {}} aria-label="Checked" />
              <Text role="caption" color="tertiary">
                Checked
              </Text>
            </Stack>
            <Stack gap={1} style={{ alignItems: "center" }}>
              <FlowCheckbox indeterminate aria-label="Indeterminate" />
              <Text role="caption" color="tertiary">
                Indeterminate
              </Text>
            </Stack>
            <Stack gap={1} style={{ alignItems: "center" }}>
              <FlowCheckbox disabled aria-label="Disabled" />
              <Text role="caption" color="tertiary">
                Disabled
              </Text>
            </Stack>
            <Stack gap={1} style={{ alignItems: "center" }}>
              <FlowCheckbox checked disabled onChange={() => {}} aria-label="Disabled checked" />
              <Text role="caption" color="tertiary">
                Disabled Chk
              </Text>
            </Stack>
            <Stack gap={1} style={{ alignItems: "center" }}>
              <FlowCheckbox indeterminate disabled aria-label="Disabled indeterminate" />
              <Text role="caption" color="tertiary">
                Disabled Ind
              </Text>
            </Stack>
          </Inline>
        </DemoGroup>

        <DemoGroup>
          <Text role="overline">Size Variants</Text>
          <Inline gap="component" align="center">
            {(["sm", "md", "lg", "xl"] as const).map((s) => (
              <Stack key={s} gap={1} style={{ alignItems: "center" }}>
                <FlowCheckbox size={s} checked onChange={() => {}} label={s.toUpperCase()} />
              </Stack>
            ))}
          </Inline>
        </DemoGroup>

        <DemoGroup>
          <Text role="overline">FlowCheckboxGroup (L4 wrapper)</Text>
          <Inline gap="subsection">
            <Stack gap={1}>
              <Text role="caption" color="secondary">
                Column (default)
              </Text>
              <FlowCheckboxGroup aria-label="Column group">
                <FlowCheckbox label="Option A" defaultChecked />
                <FlowCheckbox label="Option B" />
                <FlowCheckbox label="Option C" />
              </FlowCheckboxGroup>
            </Stack>
            <Stack gap={1}>
              <Text role="caption" color="secondary">
                Row
              </Text>
              <FlowCheckboxGroup direction="row" aria-label="Row group">
                <FlowCheckbox label="Red" />
                <FlowCheckbox label="Green" defaultChecked />
                <FlowCheckbox label="Blue" defaultChecked />
              </FlowCheckboxGroup>
            </Stack>
            <Stack gap={1}>
              <Text role="caption" color="secondary">
                Disabled group
              </Text>
              <FlowCheckboxGroup disabled aria-label="Disabled group">
                <FlowCheckbox label="Locked A" defaultChecked />
                <FlowCheckbox label="Locked B" />
              </FlowCheckboxGroup>
            </Stack>
          </Inline>
        </DemoGroup>
      </DemoSection>

      <Divider spacing={0} />

      {/* ═══════════════════════════════════════════════ */}
      {/* ── 2g. FlowSwitch ── */}
      {/* ═══════════════════════════════════════════════ */}
      <DemoSection
        title="FlowSwitch"
        description={
          <>
            Toggle switch with sliding thumb, track color change, icon swap, and thumb grow
            animation (16 to 18px) on press. Uses{" "}
            <Code>&lt;button role=&quot;switch&quot;&gt;</Code> for full keyboard and screen reader
            accessibility.
          </>
        }
      >
        <DemoGroup>
          <Text role="overline">Settings Panel</Text>
          <Stack gap={3}>
            <FlowSwitch label="Wi-Fi" checked={wifi} onChange={setWifi} />
            <FlowSwitch label="Bluetooth" checked={bluetooth} onChange={setBluetooth} />
            <FlowSwitch label="Dark mode" checked={darkMode} onChange={setDarkMode} />
            <FlowSwitch label="Notifications" checked={notifications} onChange={setNotifications} />
            <FlowSwitch label="Airplane mode (disabled)" disabled />
            <FlowSwitch label="VPN (disabled on)" checked disabled onChange={() => {}} />
          </Stack>
          <Text role="caption" color="secondary">
            Wi-Fi: {wifi ? "on" : "off"} | Bluetooth: {bluetooth ? "on" : "off"} | Dark:{" "}
            {darkMode ? "on" : "off"} | Notifs: {notifications ? "on" : "off"}
          </Text>
        </DemoGroup>

        <DemoGroup>
          <Text role="overline">State Showcase</Text>
          <Inline gap="component" align="center">
            <Stack gap={1} style={{ alignItems: "center" }}>
              <FlowSwitch aria-label="Off" />
              <Text role="caption" color="tertiary">
                Off
              </Text>
            </Stack>
            <Stack gap={1} style={{ alignItems: "center" }}>
              <FlowSwitch checked onChange={() => {}} aria-label="On" />
              <Text role="caption" color="tertiary">
                On
              </Text>
            </Stack>
            <Stack gap={1} style={{ alignItems: "center" }}>
              <FlowSwitch disabled aria-label="Disabled off" />
              <Text role="caption" color="tertiary">
                Disabled Off
              </Text>
            </Stack>
            <Stack gap={1} style={{ alignItems: "center" }}>
              <FlowSwitch checked disabled onChange={() => {}} aria-label="Disabled on" />
              <Text role="caption" color="tertiary">
                Disabled On
              </Text>
            </Stack>
          </Inline>
        </DemoGroup>

        <DemoGroup>
          <Text role="overline">Label Position</Text>
          <Stack gap={3}>
            <FlowSwitch
              label="Label at end (default)"
              checked
              onChange={() => {}}
              labelPosition="end"
            />
            <FlowSwitch label="Label at start" checked onChange={() => {}} labelPosition="start" />
          </Stack>
        </DemoGroup>

        <DemoGroup>
          <Text role="overline">Size Variants</Text>
          <Inline gap="component" align="center">
            {(["sm", "md", "lg", "xl"] as const).map((s) => (
              <Stack key={s} gap={1} style={{ alignItems: "center" }}>
                <FlowSwitch size={s} checked onChange={() => {}} aria-label={s} />
                <Text role="caption" color="tertiary">
                  {s.toUpperCase()}
                </Text>
              </Stack>
            ))}
          </Inline>
        </DemoGroup>
      </DemoSection>

      <Divider spacing={0} />

      {/* ═══════════════════════════════════════════════ */}
      {/* ── 3. FlowCard ── */}
      {/* ═══════════════════════════════════════════════ */}
      <DemoSection
        title="FlowCard"
        description="Static, interactive, and selected states. Click a card to select it. Loading state available for async content."
      >
        <DemoGroup>
          <Text role="overline">Variants — Elevated / Outlined / Interactive</Text>
          <Grid minItemWidth={GRID_3_MIN} gap="component">
            {[
              {
                id: "elevation",
                title: "Elevated Card",
                desc: "Uses shadow-based depth. Default variant for content containers.",
                elevation: 1 as const,
              },
              {
                id: "outlined",
                title: "Outlined Card",
                desc: "Uses border instead of shadow. Lower visual weight.",
                elevation: 0 as const,
              },
              {
                id: "interactive",
                title: "Interactive Card",
                desc: "Clickable with hover/press states. Shows selection state.",
                elevation: 1 as const,
              },
            ].map((card) => (
              <FlowCard
                key={card.id}
                elevation={card.elevation}
                interactive={card.id === "interactive" || undefined}
                selected={selectedCard === card.id}
                onClick={() => setSelectedCard(selectedCard === card.id ? null : card.id)}
                padding="lg"
              >
                <Stack gap={3}>
                  <Text role="heading-m">{card.title}</Text>
                  <Text role="paragraph-s">{card.desc}</Text>
                  <Inline gap={2}>
                    <FlowChip size="sm">{card.id}</FlowChip>
                    {selectedCard === card.id && (
                      <FlowChip variant="accent" size="sm">
                        selected
                      </FlowChip>
                    )}
                  </Inline>
                </Stack>
              </FlowCard>
            ))}
          </Grid>
        </DemoGroup>

        <DemoGroup>
          <Text role="overline">Size Variants — sm / md / lg / xl</Text>
          <Grid minItemWidth={GRID_2_MIN} gap="component">
            {(["sm", "md", "lg", "xl"] as const).map((s) => (
              <FlowCard key={s} elevation={1} size={s}>
                <Stack gap={1}>
                  <Text role="label-s" color="tertiary">
                    size=&quot;{s}&quot;
                  </Text>
                  <Text role="paragraph-s">Padding and radius scale with size.</Text>
                </Stack>
              </FlowCard>
            ))}
          </Grid>
        </DemoGroup>

        <DemoGroup>
          <Text role="overline">State Showcase</Text>
          <Text role="caption" color="tertiary">
            All card states — default, interactive, selected, loading
          </Text>
          <Grid minItemWidth={GRID_3_MIN} gap="component">
            <FlowCard elevation={1} padding="lg">
              <Stack gap={2}>
                <Text role="label-m">Default State</Text>
                <Text role="paragraph-s">Standard card appearance with elevation.</Text>
              </Stack>
            </FlowCard>
            <FlowCard elevation={1} padding="lg" interactive>
              <Stack gap={2}>
                <Text role="label-m">Interactive</Text>
                <Text role="paragraph-s">Hover to see interactive state transition.</Text>
              </Stack>
            </FlowCard>
            <FlowCard elevation={1} padding="lg" interactive selected>
              <Stack gap={2}>
                <Text role="label-m">Selected</Text>
                <Text role="paragraph-s">Shows accent border when selected.</Text>
              </Stack>
            </FlowCard>
            <FlowCard elevation={1} padding="lg">
              <Stack gap={2}>
                <FlowSkeleton variant="text" lines={1} />
                <FlowSkeleton variant="text" lines={2} />
              </Stack>
            </FlowCard>
            <FlowCard elevation={0} padding="lg">
              <Stack gap={2}>
                <Text role="label-m">Outlined</Text>
                <Text role="paragraph-s">Uses border instead of shadow (elevation=0).</Text>
              </Stack>
            </FlowCard>
          </Grid>
        </DemoGroup>
      </DemoSection>

      <Divider spacing={0} />

      {/* ═══════════════════════════════════════════════ */}
      {/* ── 4. FlowDialog ── */}
      {/* ═══════════════════════════════════════════════ */}
      <DemoSection
        title="FlowDialog"
        description="Alert and form dialog variants with size control (sm/md/lg/xl). Focus trapping, Escape to close, overlay backdrop."
      >
        <Inline gap={3}>
          <FlowButton variant="high" onClick={() => setAlertOpen(true)}>
            Open alert dialog
          </FlowButton>
          <FlowButton variant="medium" onClick={() => setFormOpen(true)}>
            Open form dialog
          </FlowButton>
        </Inline>

        <FlowDialog
          open={alertOpen}
          onClose={() => setAlertOpen(false)}
          title="Delete this project?"
          description="This action cannot be undone. All data associated with this project will be permanently removed."
          variant="alert"
          actions={
            <>
              <FlowButton variant="low" onClick={() => setAlertOpen(false)}>
                Cancel
              </FlowButton>
              <FlowButton variant="danger" onClick={() => setAlertOpen(false)}>
                Delete project
              </FlowButton>
            </>
          }
        />

        <FlowDialog
          open={formOpen}
          onClose={() => setFormOpen(false)}
          title="Create new token"
          description="Define a new design token for the Flow system."
          variant="form"
          actions={
            <>
              <FlowButton variant="low" onClick={() => setFormOpen(false)}>
                Cancel
              </FlowButton>
              <FlowButton variant="high" onClick={() => setFormOpen(false)}>
                Create token
              </FlowButton>
            </>
          }
        >
          <Stack gap="component">
            <FlowTextInput label="Token name" placeholder="comp.button.radius" />
            <FlowTextInput label="Value" placeholder="var(--ref-frame-radius-3)" />
            <FlowTextInput label="Description" placeholder="Corner radius for buttons" />
          </Stack>
        </FlowDialog>

        {/* Size variant buttons */}
        <DemoGroup>
          <Text role="overline">Dialog Size Variants</Text>
          <Inline gap={3}>
            {(["sm", "md", "lg", "xl"] as const).map((s) => (
              <FlowButton key={s} variant="low" size="sm" onClick={() => setDialogSizeDemo(s)}>
                size=&quot;{s}&quot;
              </FlowButton>
            ))}
          </Inline>
        </DemoGroup>

        {dialogSizeDemo && (
          <FlowDialog
            open
            onClose={() => setDialogSizeDemo(null)}
            title={`Dialog — size="${dialogSizeDemo}"`}
            description={`This dialog uses size="${dialogSizeDemo}" which maps to --comp-dialog-max-width.`}
            size={dialogSizeDemo}
            actions={
              <FlowButton variant="high" onClick={() => setDialogSizeDemo(null)}>
                Close
              </FlowButton>
            }
          />
        )}

        {/* Form Dialog Size Variants */}
        <DemoGroup>
          <Text role="overline">Form Dialog Size Variants</Text>
          <Inline gap={3}>
            {(["sm", "md", "lg", "xl"] as const).map((s) => (
              <FlowButton
                key={s}
                variant="medium"
                size="sm"
                onClick={() => setFormDialogSizeDemo(s)}
              >
                Form size=&quot;{s}&quot;
              </FlowButton>
            ))}
          </Inline>
        </DemoGroup>

        {formDialogSizeDemo && (
          <FlowDialog
            open
            onClose={() => setFormDialogSizeDemo(null)}
            title={`Form Dialog — size="${formDialogSizeDemo}"`}
            description={`Fase 4 validation: title (headline), description (body), inputs (body/caption), select, and buttons all inherit size="${formDialogSizeDemo}" via [data-size] cascade.`}
            variant="form"
            size={formDialogSizeDemo}
            actions={
              <>
                <FlowButton variant="low" onClick={() => setFormDialogSizeDemo(null)}>
                  Cancel
                </FlowButton>
                <FlowButton variant="high" onClick={() => setFormDialogSizeDemo(null)}>
                  Submit
                </FlowButton>
              </>
            }
          >
            <Stack gap="component">
              <FlowTextInput
                label="Token name"
                placeholder="comp.button.radius"
                hint="sys.size.voice.body for value text"
              />
              <FlowSelect
                label="Layer"
                options={[
                  { value: "ref", label: "L1 — Reference" },
                  { value: "sys", label: "L2 — System" },
                  { value: "comp", label: "L3 — Component" },
                ]}
                hint="sys.size.voice.caption for label & hint"
              />
              <FlowTextInput label="Value" placeholder="var(--ref-frame-radius-3)" />
              <FlowTextArea
                label="Description"
                placeholder="Corner radius for buttons"
                rows={2}
                hint="All typography scales uniformly with size"
              />
            </Stack>
          </FlowDialog>
        )}
      </DemoSection>

      <Divider spacing={0} />

      {/* ═══════════════════════════════════════════════ */}
      {/* ── 5. FlowChip ── */}
      {/* ═══════════════════════════════════════════════ */}
      <DemoSection
        title="FlowChip"
        description="Interactive filter chips — click to toggle. Demonstrates selectable chip behavior and all visual states."
      >
        <DemoGroup>
          <Text role="overline">Variants — Default / Accent / Tonal</Text>
          <Inline gap={2} wrap>
            <FlowChip variant="default">Default</FlowChip>
            <FlowChip variant="accent">Accent</FlowChip>
            <FlowChip variant="tonal">Tonal</FlowChip>
            <FlowChip variant="default" removable onRemove={() => {}}>
              Removable
            </FlowChip>
            <FlowChip variant="accent" removable onRemove={() => {}}>
              Removable Accent
            </FlowChip>
            <FlowChip variant="tonal" removable onRemove={() => {}}>
              Removable Tonal
            </FlowChip>
          </Inline>
        </DemoGroup>

        {/* State Showcase */}
        <DemoGroup>
          <Text role="overline">State Showcase</Text>
          <Text role="caption" color="tertiary">
            All interaction states — default, selected, disabled, removable
          </Text>
          <Inline gap="component" align="center" wrap>
            <Stack gap={1} style={{ alignItems: "center" }}>
              <FlowChip variant="default">Default</FlowChip>
              <Text role="caption" color="tertiary">
                Default
              </Text>
            </Stack>
            <Stack gap={1} style={{ alignItems: "center" }}>
              <FlowChip variant="accent">Selected</FlowChip>
              <Text role="caption" color="tertiary">
                Selected
              </Text>
            </Stack>
            <Stack gap={1} style={{ alignItems: "center" }}>
              <FlowChip variant="tonal">Tonal</FlowChip>
              <Text role="caption" color="tertiary">
                Tonal
              </Text>
            </Stack>
            <Stack gap={1} style={{ alignItems: "center" }}>
              <FlowChip variant="default" removable onRemove={() => {}}>
                Removable
              </FlowChip>
              <Text role="caption" color="tertiary">
                Removable
              </Text>
            </Stack>
            <Stack gap={1} style={{ alignItems: "center" }}>
              <FlowChip variant="accent" removable onRemove={() => {}}>
                Rem Accent
              </FlowChip>
              <Text role="caption" color="tertiary">
                Rem Select
              </Text>
            </Stack>
          </Inline>
        </DemoGroup>

        <DemoGroup>
          <Text role="overline">Interactive Filter Demo</Text>
          <Inline gap={2} wrap>
            {[
              "Energy",
              "Voice",
              "Frame",
              "State",
              "Momentum",
              "Depth",
              "Iconography",
              "Active",
              "Resolved",
            ].map((f) => (
              <FlowChip
                key={f}
                variant={activeFilters.has(f) ? "accent" : "default"}
                onClick={() => toggleFilter(f)}
                style={{ cursor: "pointer" }}
              >
                {activeFilters.has(f) ? `✓ ${f}` : f}
              </FlowChip>
            ))}
          </Inline>
          <Text role="caption" color="tertiary">
            Active filters:{" "}
            {activeFilters.size === 0 ? "none" : Array.from(activeFilters).join(", ")}
          </Text>
        </DemoGroup>

        <DemoGroup>
          <Text role="overline">Size Variants — sm / md / lg / xl</Text>
          <Inline gap={3} align="center">
            {(["sm", "md", "lg", "xl"] as const).map((s) => (
              <FlowChip key={s} size={s} variant="accent">
                {s.toUpperCase()}
              </FlowChip>
            ))}
          </Inline>
          <Inline gap={3} align="center">
            {(["sm", "md", "lg", "xl"] as const).map((s) => (
              <FlowChip key={s} size={s} variant="tonal">{`Tonal ${s}`}</FlowChip>
            ))}
          </Inline>
          <Inline gap={3} align="center">
            {(["sm", "md", "lg", "xl"] as const).map((s) => (
              <FlowChip key={s} size={s} removable onRemove={() => {}}>{`Remove ${s}`}</FlowChip>
            ))}
          </Inline>
        </DemoGroup>
      </DemoSection>

      <Divider spacing={0} />

      {/* ═══════════════════════════════════════════════ */}
      {/* ── 6. FlowTable ── */}
      {/* ═══════════════════════════════════════════════ */}
      <DemoSection
        title="FlowTable"
        description={
          <>
            New L3 component replacing <Code>flow-table</Code> CSS class. Data-driven, token-styled,
            with custom cell renderers. Size variants (sm/md/lg/xl) scale cell padding, body font,
            and header font via <Code>--sys-size-table-*</Code> tokens.
          </>
        }
      >
        <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
          <FlowTable
            columns={tokenColumns}
            data={tokenData}
            rowKey={(r) => r.name}
            caption="Sample of Flow design tokens across all 3 layers"
          />
        </div>

        {/* Size variants */}
        <DemoGroup>
          <Text role="overline">Size Variants</Text>
          <Grid minItemWidth={GRID_2_MIN} gap="component">
            {(["sm", "md", "lg", "xl"] as const).map((s) => (
              <div key={s}>
                <Text
                  role="label-s"
                  color="tertiary"
                  style={{ marginBottom: "var(--ref-frame-space-2)" }}
                >
                  size=&quot;{s}&quot;
                </Text>
                <FlowTable
                  columns={[
                    { key: "name", header: "State", cellRole: "bold" },
                    { key: "priority", header: "Priority", align: "center" },
                  ]}
                  data={[
                    { name: "default", priority: "0" },
                    { name: "hover", priority: "1" },
                    { name: "disabled", priority: "10" },
                  ]}
                  size={s}
                  hoverable
                  rowKey={(r) => r.name}
                />
              </div>
            ))}
          </Grid>
        </DemoGroup>
      </DemoSection>

      <Divider spacing={0} />

      {/* ═══════════════════════════════════════════════ */}
      {/* ── 7. FlowTextArea ── */}
      {/* ═══════════════════════════════════════════════ */}
      <DemoSection
        title="FlowTextArea"
        description="Multi-line floating-label textarea. Shares textInput comp tokens for size-responsive padding, label, and value font. Size variants (sm/md/lg/xl) scale container padding, label size, and field text. Supports error, success, loading, disabled, read-only. Character counter via maxLength."
      >
        <DemoGroup>
          <Text role="overline">State Showcase</Text>
          <Grid minItemWidth={GRID_2_MIN} gap="component">
            <FlowTextArea
              label="Bio"
              hint="Tell us about yourself"
              value={bio}
              onChange={setBio}
              maxLength={200}
            />
            <FlowTextArea label="Description" error="Description is required" defaultValue="" />
            <FlowTextArea
              label="Notes"
              success
              hint="Saved successfully"
              defaultValue="This is a note that has been saved."
            />
            <FlowTextArea
              label="Processing..."
              loading
              hint="Validating content"
              defaultValue="Content being validated server-side."
            />
          </Grid>
        </DemoGroup>

        <DemoGroup>
          <Text role="overline">Size Variants — sm / md / lg / xl</Text>
          <Grid minItemWidth={GRID_2_MIN} gap="component">
            {(["sm", "md", "lg", "xl"] as const).map((s) => (
              <FlowTextArea
                key={s}
                label={`Size: ${s.toUpperCase()}`}
                size={s}
                hint={`size="${s}"`}
                rows={2}
                placeholder={`Textarea at ${s} size`}
              />
            ))}
          </Grid>
        </DemoGroup>

        <DemoGroup>
          <Text role="overline">Disabled / Read-only</Text>
          <Grid minItemWidth={GRID_2_MIN} gap="component">
            <FlowTextArea label="Disabled" disabled defaultValue="This textarea is disabled" />
            <FlowTextArea
              label="Read-only"
              readOnly
              defaultValue="This textarea is read-only"
              hint="Cannot be edited"
            />
          </Grid>
        </DemoGroup>
      </DemoSection>

      <Divider spacing={0} />

      {/* ═════════════════════════════════════════���═════ */}
      {/* ── 11. FlowTooltip ── */}
      {/* ═══════════════════════════════════════════════ */}
      <DemoSection
        title="FlowTooltip"
        description={
          <>
            Accessible tooltip on hover/focus. Uses <Code>role=&quot;tooltip&quot;</Code> and{" "}
            <Code>aria-describedby</Code>. 4 positions, configurable delay. Pure CSS animation via
            Momentum tokens.
          </>
        }
      >
        <DemoGroup>
          <Text role="overline">Positions — Top / Bottom / Left / Right</Text>
          <Inline gap="component" align="center" style={{ padding: "var(--ref-frame-space-8) 0" }}>
            <FlowTooltip content="Tooltip on top" position="top">
              <FlowButton variant="medium">Top</FlowButton>
            </FlowTooltip>
            <FlowTooltip content="Tooltip on bottom" position="bottom">
              <FlowButton variant="medium">Bottom</FlowButton>
            </FlowTooltip>
            <FlowTooltip content="Tooltip on left" position="left">
              <FlowButton variant="medium">Left</FlowButton>
            </FlowTooltip>
            <FlowTooltip content="Tooltip on right" position="right">
              <FlowButton variant="medium">Right</FlowButton>
            </FlowTooltip>
            <FlowTooltip content="I'm disabled" disabled>
              <FlowButton variant="low">Disabled tooltip</FlowButton>
            </FlowTooltip>
          </Inline>
        </DemoGroup>

        <DemoGroup>
          <Text role="overline">Rich Content / Delayed</Text>
          <Inline gap="component" align="center" style={{ padding: "var(--ref-frame-space-4) 0" }}>
            <FlowTooltip
              content={
                <>
                  <strong>Bold text</strong> with details
                </>
              }
              position="top"
            >
              <FlowChip variant="accent">Rich tooltip</FlowChip>
            </FlowTooltip>
            <FlowTooltip content="Appears after 500ms" delay={500} position="bottom">
              <FlowChip variant="tonal">Slow delay (500ms)</FlowChip>
            </FlowTooltip>
            <FlowTooltip content="Instant!" delay={0} position="top">
              <FlowChip>No delay</FlowChip>
            </FlowTooltip>
          </Inline>
        </DemoGroup>

        <DemoGroup>
          <Text role="overline">Size Variants</Text>
          <Inline gap="component" align="center" style={{ padding: "var(--ref-frame-space-4) 0" }}>
            {(["sm", "md", "lg", "xl"] as const).map((s) => (
              <FlowTooltip key={s} content={`Size: ${s}`} position="top" size={s}>
                <FlowChip size="sm">{s}</FlowChip>
              </FlowTooltip>
            ))}
          </Inline>
        </DemoGroup>
      </DemoSection>

      <Divider spacing={0} />

      {/* ═══════════════════════════════════════════════ */}
      {/* ── 12. FlowSnackbar ── */}
      {/* ═══════════════════════════════════════════════ */}
      <FlowSnackbarProvider>
        <SnackbarDemoInner />
      </FlowSnackbarProvider>

      <Divider spacing={0} />

      {/* ═══════════════════════════════════════════════ */}
      {/* ── 13. FlowSkeleton ── */}
      {/* ═══════════════════════════════════════════════ */}
      <DemoSection
        title="FlowSkeleton"
        description="Loading placeholder with pulse animation. 4 variants: text (single/multi-line), circle (avatar), rect (image), card (container). Width/height customizable."
      >
        <DemoGroup>
          <Text role="overline">Variants — Text / Circle / Rect / Card</Text>
          <Grid minItemWidth={GRID_2_MIN} gap="component">
            <Surface padding="control" border>
              <Stack gap={3}>
                <Text role="caption" color="tertiary">
                  Text (3 lines)
                </Text>
                <FlowSkeleton variant="text" lines={3} />
              </Stack>
            </Surface>
            <Surface padding="control" border>
              <Stack gap={3}>
                <Text role="caption" color="tertiary">
                  Circle (Avatar)
                </Text>
                <Inline gap={3} align="center">
                  <FlowSkeleton
                    variant="circle"
                    width="var(--ref-frame-space-12)"
                    height="var(--ref-frame-space-12)"
                  />
                  <Stack gap={1} style={{ flex: 1 }}>
                    <FlowSkeleton variant="text" width="60%" />
                    <FlowSkeleton variant="text" width="40%" />
                  </Stack>
                </Inline>
              </Stack>
            </Surface>
            <Surface padding="control" border>
              <Stack gap={3}>
                <Text role="caption" color="tertiary">
                  Rectangle (Image)
                </Text>
                <FlowSkeleton variant="rect" height="var(--ref-frame-space-24)" />
              </Stack>
            </Surface>
            <Surface padding="control" border>
              <Stack gap={3}>
                <Text role="caption" color="tertiary">
                  Card Skeleton
                </Text>
                <FlowSkeleton variant="card" height="var(--ref-frame-space-24)" />
              </Stack>
            </Surface>
          </Grid>
        </DemoGroup>

        <DemoGroup>
          <Text role="overline">Composite — Card Loading Pattern</Text>
          <Grid minItemWidth={GRID_3_MIN} gap="component">
            {[0, 1, 2].map((i) => (
              <Surface key={i} padding="control" border>
                <Stack gap={3}>
                  <FlowSkeleton variant="rect" height="var(--ref-frame-space-20)" />
                  <FlowSkeleton variant="text" width="75%" />
                  <FlowSkeleton variant="text" lines={2} />
                  <Inline gap={2}>
                    <FlowSkeleton variant="text" width="var(--ref-frame-space-16)" />
                    <FlowSkeleton variant="text" width="var(--ref-frame-space-12)" />
                  </Inline>
                </Stack>
              </Surface>
            ))}
          </Grid>
        </DemoGroup>

        <DemoGroup>
          <Text role="overline">Text Size Variants — sm / md / lg / xl</Text>
          <Stack gap={3} style={{ maxWidth: "var(--ref-frame-content-compact)" }}>
            {(["sm", "md", "lg", "xl"] as const).map((s) => (
              <Inline key={s} gap={3} align="center">
                <Text role="caption" color="tertiary" style={{ width: 24 }}>
                  {s}
                </Text>
                <FlowSkeleton variant="text" size={s} />
              </Inline>
            ))}
          </Stack>
        </DemoGroup>
      </DemoSection>

      <Divider spacing={0} />

      {/* ═══════════════════════════════════════════════ */}
      {/* ── 14. FlowProgressBar ── */}
      {/* ═══════════════════════════════════════════════ */}
      <DemoSection
        title="FlowProgressBar"
        description={
          <>
            Determinate and indeterminate progress bars. 4 sizes (sm/md/lg/xl), 4 color variants
            (default/success/warning/error). <Code>role=&quot;progressbar&quot;</Code> with proper
            ARIA attributes.
          </>
        }
      >
        <DemoGroup>
          <Text role="overline">Determinate — Variants</Text>
          <Stack gap="component" style={{ maxWidth: "var(--ref-frame-content-dialog)" }}>
            <Stack gap={1}>
              <Text role="caption" color="secondary">
                Default ({progress}%)
              </Text>
              <FlowProgressBar value={progress} showLabel />
            </Stack>
            <Stack gap={1}>
              <Text role="caption" color="secondary">
                Success
              </Text>
              <FlowProgressBar value={100} variant="success" showLabel />
            </Stack>
            <Stack gap={1}>
              <Text role="caption" color="secondary">
                Warning
              </Text>
              <FlowProgressBar value={78} variant="warning" showLabel />
            </Stack>
            <Stack gap={1}>
              <Text role="caption" color="secondary">
                Error
              </Text>
              <FlowProgressBar value={30} variant="error" showLabel />
            </Stack>
          </Stack>
          <Inline gap={3} style={{ marginTop: "var(--ref-frame-space-3)" }}>
            <FlowButton
              variant="low"
              size="sm"
              onClick={() => setProgress(Math.max(0, progress - 10))}
            >
              -10
            </FlowButton>
            <FlowButton
              variant="low"
              size="sm"
              onClick={() => setProgress(Math.min(100, progress + 10))}
            >
              +10
            </FlowButton>
            <FlowButton variant="low" size="sm" onClick={() => setProgress(0)}>
              Reset
            </FlowButton>
          </Inline>
        </DemoGroup>

        <DemoGroup>
          <Text role="overline">Sizes — sm / md / lg / xl</Text>
          <Stack gap="component" style={{ maxWidth: "var(--ref-frame-content-dialog)" }}>
            <Stack gap={1}>
              <Text role="caption" color="secondary">
                Small
              </Text>
              <FlowProgressBar value={45} size="sm" />
            </Stack>
            <Stack gap={1}>
              <Text role="caption" color="secondary">
                Medium (default)
              </Text>
              <FlowProgressBar value={45} size="md" />
            </Stack>
            <Stack gap={1}>
              <Text role="caption" color="secondary">
                Large
              </Text>
              <FlowProgressBar value={45} size="lg" />
            </Stack>
            <Stack gap={1}>
              <Text role="caption" color="secondary">
                Extra Large
              </Text>
              <FlowProgressBar value={45} size="xl" />
            </Stack>
          </Stack>
        </DemoGroup>

        <DemoGroup>
          <Text role="overline">Indeterminate</Text>
          <Stack gap="component" style={{ maxWidth: "var(--ref-frame-content-dialog)" }}>
            <FlowProgressBar aria-label="Loading data" />
            <FlowProgressBar size="sm" aria-label="Processing" />
          </Stack>
        </DemoGroup>
      </DemoSection>

      <Divider spacing={0} />

      {/* ═══════════════════════════════════════════════ */}
      {/* ── 15. FlowEmptyState ── */}
      {/* ═══��═══════════════════════════════════════════ */}
      <DemoSection
        title="FlowEmptyState"
        description="Zero-data placeholder with icon, title, description, and optional actions. Compact mode for inline empty areas. Composes Stack, FlowIcon, Text, and Inline primitives."
      >
        <DemoGroup>
          <Text role="overline">Default / With Actions / Compact</Text>
          <Grid minItemWidth={GRID_3_MIN} gap="component">
            <Surface padding={0} border>
              <FlowEmptyState
                icon="search"
                title="No results found"
                description="Try adjusting your search terms or filters to find what you're looking for."
              />
            </Surface>
            <Surface padding={0} border>
              <FlowEmptyState
                icon="plus"
                title="No items yet"
                description="Create your first item to get started."
                action={
                  <FlowButton variant="high" size="sm">
                    Create Item
                  </FlowButton>
                }
                secondaryAction={
                  <FlowButton variant="low" size="sm">
                    Learn More
                  </FlowButton>
                }
              />
            </Surface>
            <Surface padding={0} border>
              <FlowEmptyState
                icon="info"
                title="No notifications"
                description="You're all caught up."
                compact
              />
            </Surface>
          </Grid>
        </DemoGroup>

        <DemoGroup>
          <Text role="overline">Size Variants — sm / md / lg / xl</Text>
          <Grid minItemWidth={GRID_3_MIN} gap="component">
            {(["sm", "md", "lg", "xl"] as const).map((s) => (
              <Surface key={s} padding={0} border>
                <FlowEmptyState
                  icon="search"
                  title={`size="${s}"`}
                  description="Icon, padding, and gap scale with size."
                  size={s}
                />
              </Surface>
            ))}
          </Grid>
        </DemoGroup>
      </DemoSection>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* MOBILE COMPONENTS                                                  */}
      {/* ══════════════════════════════════════════════════════════════════ */}

      <Divider />

      <DemoSection
        title="FlowBottomNav"
        description="Mobile-first navigation bar for touch interfaces. Persistent at bottom of screen with 3-5 items."
      >
        <DemoGroup>
          <Text role="overline">Interactive Example — Labeled Variant</Text>
          <Surface padding={0} border style={{ borderRadius: "var(--ref-frame-radius-4)", overflow: "hidden" }}>
            <FlowBottomNav
              items={[
                { key: "home", icon: "home", label: "Home" },
                { key: "search", icon: "search", label: "Search" },
                { key: "activity", icon: "bell", label: "Activity", badge: 3 },
                { key: "profile", icon: "user", label: "Profile" },
              ]}
              activeKey={bottomNavActive}
              onChange={setBottomNavActive}
            />
          </Surface>
        </DemoGroup>

        <DemoGroup>
          <Text role="overline">Icon-Only Variant</Text>
          <Surface padding={0} border style={{ borderRadius: "var(--ref-frame-radius-4)", overflow: "hidden" }}>
            <FlowBottomNav
              items={[
                { key: "home", icon: "home", label: "Home" },
                { key: "search", icon: "search", label: "Search" },
                { key: "activity", icon: "bell", label: "Activity", badge: 12 },
                { key: "profile", icon: "user", label: "Profile" },
              ]}
              activeKey="search"
              onChange={() => {}}
              showLabels={false}
            />
          </Surface>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="FlowBottomSheet"
        description="A panel that slides up from bottom of screen. Used for contextual content without leaving the view."
      >
        <DemoGroup>
          <Text role="overline">Interactive Example</Text>
          <FlowButton variant="medium" onClick={() => setBottomSheetOpen(true)}>
            Open Bottom Sheet
          </FlowButton>

          <FlowBottomSheet
            open={bottomSheetOpen}
            onClose={() => setBottomSheetOpen(false)}
            title="Share with friends"
            snapPoints={["half", "full"]}
          >
            <Stack gap={3}>
              <Text>Select how you&apos;d like to share this content.</Text>
              <FlowShortcutGrid
                actions={[
                  { icon: "search", label: "Message" },
                  { icon: "copy", label: "Copy Link" },
                  { icon: "download", label: "Save" },
                ]}
                columns={3}
              />
            </Stack>
          </FlowBottomSheet>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="FlowFAB"
        description="Floating Action Button for the primary action on a screen. Used sparingly — one per screen maximum."
      >
        <DemoGroup>
          <Text role="overline">Variants</Text>
          <Inline gap={4} style={{ flexWrap: "wrap" }}>
            <FlowFAB
              icon="plus"
              label="Standard"
              size="standard"
              variant="standard"
              contained={true}
            />
            <FlowFAB icon="plus" label="Small" size="small" variant="standard" contained={true} />
            <FlowFAB icon="plus" label="New Message" variant="extended" contained={true} />
          </Inline>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="FlowOTPInput"
        description="Specialized input for one-time password entry with individual character boxes."
      >
        <DemoGroup>
          <Text role="overline">6-Digit Code</Text>
          <FlowOTPInput
            length={6}
            value={otpValue}
            onChange={(v) => {
              setOtpValue(v);
              setOtpError(false);
            }}
            error={otpError}
          />
          <Inline gap={2}>
            <FlowButton variant="medium" size="sm" onClick={() => setOtpError(true)}>
              Trigger Error
            </FlowButton>
            <FlowButton
              variant="low"
              size="sm"
              onClick={() => {
                setOtpValue("");
                setOtpError(false);
              }}
            >
              Clear
            </FlowButton>
          </Inline>
          <Text role="caption" color="secondary">
            Current value: {otpValue || "(empty)"}
          </Text>
        </DemoGroup>

        <DemoGroup>
          <Text role="overline">4-Digit Code</Text>
          <FlowOTPInput length={4} />
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="FlowShortcutGrid"
        description="Grid of shortcut actions with large touch targets. Often used on home screens or dashboards."
      >
        <DemoGroup>
          <Text role="overline">3-Column Grid</Text>
          <FlowShortcutGrid
            actions={[
              { icon: "send", label: "Transfer" },
              { icon: "credit-card", label: "Pay Bills" },
              { icon: "bar-chart", label: "Statements" },
              { icon: "file-text", label: "Documents" },
              { icon: "bell", label: "Alerts" },
              { icon: "user", label: "Support" },
            ]}
            columns={3}
          />
        </DemoGroup>

        <DemoGroup>
          <Text role="overline">4-Column Layout</Text>
          <FlowShortcutGrid
            actions={[
              { icon: "home", label: "Home" },
              { icon: "search", label: "Search" },
              { icon: "settings", label: "Settings" },
              { icon: "user", label: "Profile" },
            ]}
            columns={4}
          />
        </DemoGroup>
      </DemoSection>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* DESKTOP COMPONENTS                                                 */}
      {/* ══════════════════════════════════════════════════════════════════ */}

      <Divider />

      <DemoSection
        title="FlowSidebar"
        description="Persistent vertical navigation for desktop applications. Supports collapsed icon-only mode."
      >
        <DemoGroup>
          <Text role="overline">Interactive Example — Collapsible</Text>
          <Surface
            padding={0}
            border
            style={{ borderRadius: "var(--ref-frame-radius-4)", overflow: "hidden", height: "var(--ref-frame-content-sidebar-demo)" }}
          >
            <FlowSidebar
              groups={[
                {
                  items: [
                    {
                      key: "dashboard",
                      icon: "home",
                      label: "Dashboard",
                      active: sidebarActive === "dashboard",
                      onClick: () => setSidebarActive("dashboard"),
                    },
                    {
                      key: "customers",
                      icon: "users",
                      label: "Customers",
                      active: sidebarActive === "customers",
                      onClick: () => setSidebarActive("customers"),
                    },
                    {
                      key: "documents",
                      icon: "file-text",
                      label: "Documents",
                      active: sidebarActive === "documents",
                      onClick: () => setSidebarActive("documents"),
                    },
                    {
                      key: "analytics",
                      icon: "bar-chart",
                      label: "Analytics",
                      active: sidebarActive === "analytics",
                      onClick: () => setSidebarActive("analytics"),
                    },
                    {
                      key: "settings",
                      icon: "settings",
                      label: "Settings",
                      active: sidebarActive === "settings",
                      onClick: () => setSidebarActive("settings"),
                    },
                  ],
                },
              ]}
              collapsed={sidebarCollapsed}
              onCollapsedChange={setSidebarCollapsed}
            />
          </Surface>
          <Text role="caption" color="secondary">
            Try clicking the collapse button to see icon-only mode
          </Text>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="FlowDataTable"
        description="Structured table with sorting, selection, and row actions. Optimized for desktop viewports."
      >
        <DemoGroup>
          <Text role="overline">Sortable & Selectable</Text>
          <FlowDataTable
            columns={[
              { key: "name", label: "Name", sortable: true },
              { key: "email", label: "Email", sortable: true },
              { key: "role", label: "Role", sortable: true },
              { key: "status", label: "Status", sortable: true },
            ]}
            data={[
              {
                id: "1",
                name: "John Doe",
                email: "john@example.com",
                role: "Admin",
                status: "Active",
              },
              {
                id: "2",
                name: "Jane Smith",
                email: "jane@example.com",
                role: "Editor",
                status: "Active",
              },
              {
                id: "3",
                name: "Bob Johnson",
                email: "bob@example.com",
                role: "Viewer",
                status: "Inactive",
              },
              {
                id: "4",
                name: "Alice Williams",
                email: "alice@example.com",
                role: "Editor",
                status: "Active",
              },
              {
                id: "5",
                name: "Charlie Brown",
                email: "charlie@example.com",
                role: "Viewer",
                status: "Active",
              },
            ]}
            selectable
          />
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="FlowToolbar"
        description="Horizontal bar of contextual actions. Switches to bulk action mode when items are selected."
      >
        <DemoGroup>
          <Text role="overline">Standard Actions</Text>
          <FlowToolbar
            leftActions={
              <>
                <FlowButton variant="low" size="sm" leadingIcon="plus">
                  Create
                </FlowButton>
                <FlowButton variant="low" size="sm" leadingIcon="edit">
                  Edit
                </FlowButton>
                <FlowButton variant="low" size="sm" leadingIcon="download">
                  Archive
                </FlowButton>
              </>
            }
          />
        </DemoGroup>

        <DemoGroup>
          <Text role="overline">With Selection (Bulk Actions)</Text>
          <Stack gap={2}>
            <FlowToolbar
              leftActions={
                <>
                  <Text role="label-m">
                    {dataTableSelected} {dataTableSelected === 1 ? "item" : "items"} selected
                  </Text>
                </>
              }
              rightActions={
                <>
                  <FlowIconButton icon="trash" variant="low" aria-label="Delete selected" />
                  <FlowIconButton icon="download" variant="low" aria-label="Download selected" />
                </>
              }
            />
            <Inline gap={2}>
              {[0, 1, 3, 5].map((count) => (
                <FlowButton
                  key={count}
                  variant="low"
                  size="sm"
                  onClick={() => setDataTableSelected(count)}
                >
                  Select {count}
                </FlowButton>
              ))}
            </Inline>
          </Stack>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="FlowBreadcrumbs"
        description="Horizontal trail showing location within hierarchical structure. Enables navigation to parent levels."
      >
        <DemoGroup>
          <Text role="overline">Navigation Path</Text>
          <FlowBreadcrumbs
            items={[
              { label: "Home" },
              { label: "Documents" },
              { label: "Projects" },
              { label: "Q1 Report" },
            ]}
          />
        </DemoGroup>

        <DemoGroup>
          <Text role="overline">Shorter Path</Text>
          <FlowBreadcrumbs items={[{ label: "Dashboard" }, { label: "Settings" }]} />
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="FlowContextMenu"
        description="Right-click menu with contextual actions. Desktop-only interaction pattern."
      >
        <DemoGroup>
          <Text role="overline">Click Button to Open Menu</Text>
          <FlowContextMenu
            items={[
              { icon: "copy", label: "Copy", action: "copy" },
              { icon: "edit", label: "Edit", action: "edit" },
              { type: "divider" },
              { icon: "download", label: "Archive", action: "archive" },
              { type: "divider" },
              { icon: "trash", label: "Delete", action: "delete", variant: "danger" },
            ]}
            onSelect={(action) => {
              console.log("Action:", action);
            }}
          />
        </DemoGroup>

        <DemoGroup>
          <Text role="overline">Custom Trigger</Text>
          <FlowContextMenu
            trigger={
              <FlowButton variant="low" size="sm">
                Options Menu
              </FlowButton>
            }
            items={[
              { icon: "settings", label: "Preferences", action: "preferences" },
              { icon: "user", label: "Account", action: "account" },
              { type: "divider" },
              { icon: "info", label: "Help", action: "help" },
            ]}
            onSelect={(action) => {
              console.log("Action:", action);
            }}
          />
        </DemoGroup>
      </DemoSection>

      {/* ═══════════════════════════════════════════════ */}
      {/* ── Extended Demos (p2–p11 components) ── */}
      {/* ═══════════════════════════════════════════════ */}
      <ExtendedDemos />
    </div>
  );
}

// ── SnackbarDemoInner (helper for Provider pattern) ──
function SnackbarDemoInner() {
  const snackbar = useSnackbar();

  return (
    <DemoSection
      title="FlowSnackbar"
      description={
        <>
          Stackable toast notifications with <Code>aria-live=&quot;polite&quot;</Code>. 4 variants
          (info, success, warning, error). Auto-dismiss with configurable duration. Action button
          support.
        </>
      }
    >
      <DemoGroup>
        <Text role="overline">Trigger Variants</Text>
        <Inline gap={3} style={{ flexWrap: "wrap" }}>
          <FlowButton
            variant="medium"
            onClick={() =>
              snackbar.show({ message: "This is an informational message.", variant: "info" })
            }
          >
            Info Toast
          </FlowButton>
          <FlowButton
            variant="medium"
            onClick={() =>
              snackbar.show({ message: "Changes saved successfully!", variant: "success" })
            }
          >
            Success Toast
          </FlowButton>
          <FlowButton
            variant="medium"
            onClick={() =>
              snackbar.show({ message: "Your session will expire soon.", variant: "warning" })
            }
          >
            Warning Toast
          </FlowButton>
          <FlowButton
            variant="medium"
            onClick={() => snackbar.show({ message: "Failed to save changes.", variant: "error" })}
          >
            Error Toast
          </FlowButton>
          <FlowButton
            variant="low"
            onClick={() =>
              snackbar.show({
                message: "Item deleted.",
                variant: "info",
                action: {
                  label: "Undo",
                  onClick: () => snackbar.show({ message: "Undo successful!", variant: "success" }),
                },
                duration: 6000,
              })
            }
          >
            With Action
          </FlowButton>
        </Inline>
      </DemoGroup>

      <DemoGroup>
        <Text role="overline">Size Variants</Text>
        <Inline gap={3}>
          {(["sm", "md", "lg", "xl"] as const).map((s) => (
            <FlowButton
              key={s}
              variant="low"
              size="sm"
              onClick={() =>
                snackbar.show({ message: `Snackbar size="${s}"`, variant: "info", size: s })
              }
            >
              size=&quot;{s}&quot;
            </FlowButton>
          ))}
        </Inline>
      </DemoGroup>
    </DemoSection>
  );
}

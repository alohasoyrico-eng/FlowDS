/**
 * Preview registry — maps componentId/variant → render function.
 * Used by PreviewPage (/preview/:componentId/:variant) for VRT and interaction tests.
 * IDs derived from Storybook titles: "Controls/FlowButton" → "controls-flowbutton"
 */
import { type ReactNode, useState } from "react";

import {
  FlowAccordion,
  FlowAvatar,
  FlowAvatarGroup,
  FlowBadge,
  FlowBottomNav,
  FlowBottomSheet,
  FlowBreadcrumbs,
  FlowButton,
  FlowCard,
  FlowChartLegendItem,
  FlowCheckbox,
  FlowCheckboxGroup,
  FlowChip,
  FlowCircularProgress,
  FlowContextMenu,
  FlowCountrySelect,
  FlowDialog,
  FlowFAB,
  FlowFieldset,
  FlowIconButton,
  FlowInlineValidationMessage,
  FlowKPITrendIndicator,
  FlowList,
  FlowListItem,
  FlowMenu,
  FlowOTPInput,
  FlowPagination,
  FlowPhoneInput,
  FlowPopover,
  FlowProgressBar,
  FlowRadioButton,
  FlowRadioGroup,
  FlowSegmentedControl,
  FlowSelect,
  FlowSidebar,
  FlowSkeleton,
  FlowSlider,
  FlowSortControl,
  FlowSplitPane,
  FlowStepper,
  FlowSwitch,
  FlowTabs,
  FlowTag,
  FlowTextArea,
  FlowTextInput,
  FlowToggleButton,
  FlowToggleButtonGroup,
  FlowTooltip,
  FlowTreeView,
} from "@flow/components";
import {
  FlowActionSheet,
  FlowAdvancedFilters,
  FlowCalendarView,
  FlowChartWrapper,
  FlowColorPicker,
  FlowColumnConfigurator,
  FlowCommandPalette,
  FlowConfirmationDialog,
  FlowDatePicker,
  FlowDateRangePicker,
  FlowDragSortableList,
  FlowDrawerAdapter,
  FlowEmptyState,
  FlowFileUpload,
  FlowFilterChipGroup,
  FlowFormSection,
  FlowFullscreenSheet,
  FlowHoverCard,
  FlowInlineEditable,
  FlowKPICard,
  FlowMultiSelect,
  FlowNotificationPanel,
  FlowPullToRefresh,
  FlowAutocomplete,
  FlowSearch,
  FlowSectionHeader,
  FlowSnackbarProvider,
  FlowSwipeActions,
  FlowTimeline,
  FlowToolbar,
  FlowToolbarDivider,
  FlowToolbarGroup,
  FlowTopbar,
  FlowTransferList,
  FlowVirtualDataTable,
  useSnackbar,
} from "@flow/patterns";

// ─────────────────────────────────────────────
// Demo wrappers for stateful/overlay components
// ─────────────────────────────────────────────

function DialogDemo({ variant = "default", size = "md" }: { variant?: "default" | "alert"; size?: "sm" | "md" | "lg" | "xl" }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <FlowButton onClick={() => setOpen(true)}>Open Dialog</FlowButton>
      <FlowDialog
        open={open}
        onClose={() => setOpen(false)}
        title="Dialog Title"
        variant={variant}
        size={size}
        description={variant === "alert" ? "This action cannot be undone." : undefined}
        actions={
          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
            <FlowButton variant="tertiary" onClick={() => setOpen(false)}>Cancel</FlowButton>
            <FlowButton variant={variant === "alert" ? undefined : "primary"} intent={variant === "alert" ? "danger" : undefined} onClick={() => setOpen(false)}>
              {variant === "alert" ? "Delete" : "Save"}
            </FlowButton>
          </div>
        }
      >
        <p>Dialog body content.</p>
      </FlowDialog>
    </>
  );
}

function BottomSheetDemo({ title }: { title?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <FlowButton onClick={() => setOpen(true)}>Open Sheet</FlowButton>
      <FlowBottomSheet open={open} onClose={() => setOpen(false)} title={title}>
        <p style={{ padding: 16 }}>Sheet content goes here.</p>
      </FlowBottomSheet>
    </>
  );
}

function MenuDemo({ label, trigger = "Open Menu" }: { label?: string; trigger?: string }) {
  return (
    <FlowMenu
      trigger={trigger}
      label={label}
      items={[
        { id: "edit", label: "Edit", icon: "pencil" },
        { id: "duplicate", label: "Duplicate", icon: "copy" },
        { id: "delete", label: "Delete", icon: "trash", danger: true, separator: true },
      ]}
      onSelect={() => {}}
    />
  );
}

function PopoverDemo() {
  const [open, setOpen] = useState(false);
  return (
    <FlowPopover
      open={open}
      onOpenChange={setOpen}
      trigger={<FlowButton onClick={() => setOpen(!open)}>Open Popover</FlowButton>}
    >
      <div style={{ padding: 16 }}>Popover content</div>
    </FlowPopover>
  );
}

function SnackbarDemo({ status = "info" }: { status?: "info" | "success" | "warning" | "error" }) {
  function Inner() {
    const { show } = useSnackbar();
    return (
      <FlowButton variant="secondary" size="sm" onClick={() => show({ message: `${status} notification`, status })}>
        Show {status}
      </FlowButton>
    );
  }
  return <FlowSnackbarProvider><Inner /></FlowSnackbarProvider>;
}

function ConfirmationDialogDemo({ intent = "default" }: { intent?: "default" | "danger" }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <FlowButton intent={intent === "danger" ? "danger" : undefined} onClick={() => setOpen(true)}>
        {intent === "danger" ? "Delete" : "Confirm"}
      </FlowButton>
      <FlowConfirmationDialog
        open={open}
        onCancel={() => setOpen(false)}
        onConfirm={() => setOpen(false)}
        title={intent === "danger" ? "Delete item?" : "Confirm action"}
        message={intent === "danger" ? "This cannot be undone." : "Do you want to proceed?"}
        intent={intent}
      />
    </>
  );
}

function CommandPaletteDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <FlowButton onClick={() => setOpen(true)}>Open Palette</FlowButton>
      <FlowCommandPalette
        open={open}
        onClose={() => setOpen(false)}
        commands={[
          { id: "home", label: "Go to Home", group: "Navigation" },
          { id: "settings", label: "Open Settings", group: "Navigation" },
          { id: "new-doc", label: "New Document", group: "Actions" },
        ]}
        onSelect={() => setOpen(false)}
      />
    </>
  );
}

function DrawerDemo({ side = "left" }: { side?: "left" | "right" }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <FlowButton onClick={() => setOpen(true)}>Open Drawer</FlowButton>
      <FlowDrawerAdapter
        open={open}
        onClose={() => setOpen(false)}
        side={side}
        title="Drawer"
      >
        <p style={{ padding: 16 }}>Drawer content.</p>
      </FlowDrawerAdapter>
    </>
  );
}

function FullscreenSheetDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <FlowButton onClick={() => setOpen(true)}>Open Sheet</FlowButton>
      <FlowFullscreenSheet open={open} onClose={() => setOpen(false)} title="Fullscreen Sheet">
        <p style={{ padding: 16 }}>Sheet content.</p>
      </FlowFullscreenSheet>
    </>
  );
}

// ─────────────────────────────────────────────
// Static data for complex patterns
// ─────────────────────────────────────────────

const selectOptions = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "mx", label: "Mexico" },
  { value: "gb", label: "United Kingdom" },
  { value: "de", label: "Germany" },
];

const sidebarItems = [
  { id: "home", label: "Home", icon: "home" },
  { id: "analytics", label: "Analytics", icon: "chart-square" },
  { id: "settings", label: "Settings", icon: "settings" },
];

const tableColumns = [
  { key: "name", header: "Name", width: "200px", sortable: true },
  { key: "email", header: "Email", width: "250px", sortable: true },
  { key: "role", header: "Role", width: "150px" },
];
const tableRows = Array.from({ length: 50 }, (_, i) => ({
  id: String(i + 1),
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: i % 3 === 0 ? "Admin" : i % 3 === 1 ? "Editor" : "Viewer",
}));

const transferItems = [
  { id: "1", label: "Item One" },
  { id: "2", label: "Item Two" },
  { id: "3", label: "Item Three" },
  { id: "4", label: "Item Four" },
];

const sortableItems = [
  { id: "a", content: "First item" },
  { id: "b", content: "Second item" },
  { id: "c", content: "Third item" },
];

const timelineItems = [
  { id: "1", label: "Created", description: "Item was created", timestamp: "2024-01-01", status: "success" as const },
  { id: "2", label: "Updated", description: "Details updated", timestamp: "2024-01-05", status: "info" as const },
  { id: "3", label: "Pending review", description: "Awaiting approval", timestamp: "2024-01-10", status: "warning" as const },
];

const notificationItems = [
  { id: "1", title: "New message", message: "You have a new message", timestamp: "5m ago", read: false },
  { id: "2", title: "Update complete", message: "System update finished", timestamp: "1h ago", read: true },
];

// ─────────────────────────────────────────────
// Registry
// ─────────────────────────────────────────────

export const previewRegistry: Record<string, Record<string, () => ReactNode>> = {
  // ── Controls ──────────────────────────────────────────
  "controls-flowbutton": {
    default: () => <FlowButton variant="primary">Primary Action</FlowButton>,
    secondary: () => <FlowButton variant="secondary">Secondary</FlowButton>,
    danger: () => <FlowButton intent="danger">Delete</FlowButton>,
    warning: () => <FlowButton intent="warning">Proceed</FlowButton>,
    loading: () => <FlowButton variant="primary" loading loadingLabel="Submitting...">Submit</FlowButton>,
    disabled: () => <FlowButton variant="primary" disabled>Disabled</FlowButton>,
    "all-sizes": () => (
      <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
        <FlowButton variant="primary" size="sm">Small</FlowButton>
        <FlowButton variant="primary" size="md">Medium</FlowButton>
        <FlowButton variant="primary" size="lg">Large</FlowButton>
        <FlowButton variant="primary" size="xl">X-Large</FlowButton>
      </div>
    ),
    "all-variants": () => (
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {(["primary", "secondary", "tertiary", "outlined", "ghost"] as const).map((v) => (
          <FlowButton key={v} variant={v}>{v}</FlowButton>
        ))}
      </div>
    ),
  },

  "controls-flowfab": {
    default: () => <FlowFAB icon="plus" aria-label="Create" />,
    extended: () => <FlowFAB icon="plus" label="Create new" />,
    loading: () => <FlowFAB icon="plus" label="Creating" loading />,
    disabled: () => <FlowFAB icon="plus" aria-label="Create" disabled />,
  },

  "controls-flowiconbutton": {
    default: () => <FlowIconButton icon="pencil" aria-label="Edit" />,
    "all-emphases": () => (
      <div style={{ display: "flex", gap: 8 }}>
        {(["primary", "secondary", "tertiary", "outlined", "ghost"] as const).map((v) => (
          <FlowIconButton key={v} icon="pencil" aria-label={v} variant={v} />
        ))}
      </div>
    ),
    "all-sizes": () => (
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        {(["sm", "md", "lg", "xl"] as const).map((s) => (
          <FlowIconButton key={s} icon="pencil" aria-label={s} size={s} />
        ))}
      </div>
    ),
    disabled: () => <FlowIconButton icon="pencil" aria-label="Edit" disabled />,
  },

  // ── Inputs ────────────────────────────────────────────
  "inputs-flowtextinput": {
    default: () => <FlowTextInput label="Email" placeholder="you@example.com" size="md" />,
    "with-hint": () => <FlowTextInput label="Password" placeholder="Enter password" hint="Minimum 8 characters" />,
    "with-error": () => <FlowTextInput label="Email" placeholder="you@example.com" error="Invalid email address" />,
    disabled: () => <FlowTextInput label="Username" placeholder="Disabled" disabled />,
    "all-sizes": () => (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {(["sm", "md", "lg", "xl"] as const).map((s) => (
          <FlowTextInput key={s} label={s.toUpperCase()} placeholder={s} size={s} />
        ))}
      </div>
    ),
  },

  "inputs-flowtextarea": {
    default: () => <FlowTextArea label="Message" placeholder="Enter your message..." />,
    "with-hint": () => <FlowTextArea label="Bio" hint="Max 200 characters" maxLength={200} />,
    "with-error": () => <FlowTextArea label="Description" error="Description is required" />,
    disabled: () => <FlowTextArea label="Notes" placeholder="Disabled" disabled />,
  },

  // ── Selection ─────────────────────────────────────────
  "selection-flowselect": {
    default: () => <FlowSelect label="Country" options={selectOptions} />,
    "with-hint": () => <FlowSelect label="Country" options={selectOptions} hint="Select your country" />,
    "with-error": () => <FlowSelect label="Country" options={selectOptions} error="Please select a country" />,
    disabled: () => <FlowSelect label="Country" options={selectOptions} disabled />,
    loading: () => <FlowSelect label="Country" options={selectOptions} loading />,
    "all-sizes": () => (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {(["sm", "md", "lg", "xl"] as const).map((s) => (
          <FlowSelect key={s} label={s.toUpperCase()} options={selectOptions} size={s} />
        ))}
      </div>
    ),
  },

  "selection-flowcheckbox": {
    default: () => <FlowCheckbox label="Accept terms" />,
    checked: () => <FlowCheckbox label="Accepted" defaultChecked />,
    indeterminate: () => <FlowCheckbox label="Select all" indeterminate />,
    "with-error": () => <FlowCheckbox label="Required field" error />,
    disabled: () => <FlowCheckbox label="Disabled" disabled />,
    group: () => (
      <FlowCheckboxGroup aria-label="Preferences">
        <FlowCheckbox label="Email notifications" />
        <FlowCheckbox label="SMS notifications" />
        <FlowCheckbox label="Push notifications" defaultChecked />
      </FlowCheckboxGroup>
    ),
  },

  "selection-flowradiobutton": {
    default: () => (
      <FlowRadioGroup aria-label="Plan" name="plan">
        <FlowRadioButton value="free" label="Free" name="plan" />
        <FlowRadioButton value="pro" label="Pro" name="plan" defaultChecked />
        <FlowRadioButton value="enterprise" label="Enterprise" name="plan" />
      </FlowRadioGroup>
    ),
    horizontal: () => (
      <FlowRadioGroup aria-label="Size" name="size" direction="row">
        <FlowRadioButton value="sm" label="Small" name="size" />
        <FlowRadioButton value="md" label="Medium" name="size" defaultChecked />
        <FlowRadioButton value="lg" label="Large" name="size" />
      </FlowRadioGroup>
    ),
    disabled: () => (
      <FlowRadioGroup aria-label="Status" name="status" disabled>
        <FlowRadioButton value="active" label="Active" name="status" defaultChecked />
        <FlowRadioButton value="inactive" label="Inactive" name="status" />
      </FlowRadioGroup>
    ),
  },

  "selection-flowswitch": {
    default: () => <FlowSwitch label="Enable notifications" />,
    checked: () => <FlowSwitch label="Enabled" checked onChange={() => {}} />,
    disabled: () => <FlowSwitch label="Disabled" disabled />,
  },

  "selection-flowslider": {
    default: () => <FlowSlider label="Volume" defaultValue={50} />,
    "with-marks": () => <FlowSlider label="Quality" defaultValue={2} min={0} max={4} step={1} showMarks />,
    disabled: () => <FlowSlider label="Disabled" defaultValue={30} disabled />,
  },

  "selection-flowsegmentedcontrol": {
    default: () => (
      <FlowSegmentedControl
        options={[{ value: "day", label: "Day" }, { value: "week", label: "Week" }, { value: "month", label: "Month" }]}
        defaultValue="week"
      />
    ),
    "with-icons": () => (
      <FlowSegmentedControl
        options={[{ value: "grid", label: "Grid", icon: "grid" }, { value: "list", label: "List", icon: "list" }]}
        defaultValue="grid"
      />
    ),
    "full-width": () => (
      <FlowSegmentedControl
        options={[{ value: "a", label: "Option A" }, { value: "b", label: "Option B" }, { value: "c", label: "Option C" }]}
        defaultValue="a"
        fullWidth
      />
    ),
  },

  "selection-flowtogglebutton": {
    default: () => <FlowToggleButton icon="bold" aria-label="Bold">B</FlowToggleButton>,
    group: () => (
      <FlowToggleButtonGroup>
        <FlowToggleButton icon="bold" aria-label="Bold">B</FlowToggleButton>
        <FlowToggleButton icon="italic" aria-label="Italic">I</FlowToggleButton>
        <FlowToggleButton icon="underline" aria-label="Underline">U</FlowToggleButton>
      </FlowToggleButtonGroup>
    ),
  },

  "selection-flowotpinput": {
    default: () => <FlowOTPInput aria-label="Verification code" length={6} />,
    "four-digit": () => <FlowOTPInput aria-label="PIN" length={4} />,
    "with-error": () => <FlowOTPInput aria-label="Code" length={6} error errorMessage="Invalid code" />,
    disabled: () => <FlowOTPInput aria-label="Code" length={6} disabled />,
  },

  "selection-flowphoneinput": {
    default: () => <FlowPhoneInput label="Phone number" />,
    "with-error": () => <FlowPhoneInput label="Phone number" error="Invalid phone number" />,
    disabled: () => <FlowPhoneInput label="Phone number" disabled />,
  },

  "selection-flowcountryselect": {
    default: () => <FlowCountrySelect label="Country" />,
    "with-error": () => <FlowCountrySelect label="Country" error="Please select a country" />,
  },

  "selection-flowmultiselect": {
    default: () => (
      <FlowMultiSelect
        label="Tags"
        options={selectOptions}
        placeholder="Select countries..."
      />
    ),
    "with-preselected": () => (
      <FlowMultiSelect
        label="Tags"
        options={selectOptions}
        defaultValue={["us", "ca"]}
      />
    ),
    "with-error": () => (
      <FlowMultiSelect
        label="Tags"
        options={selectOptions}
        error="Please select at least one option"
      />
    ),
    disabled: () => (
      <FlowMultiSelect
        label="Tags"
        options={selectOptions}
        disabled
      />
    ),
  },

  // ── Display ───────────────────────────────────────────
  "display-flowavatar": {
    default: () => <FlowAvatar src="https://i.pravatar.cc/80" alt="User" />,
    "with-initials": () => <FlowAvatar initials="AB" />,
    "with-status": () => <FlowAvatar initials="JD" status="online" />,
    "all-sizes": () => (
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        {(["sm", "md", "lg", "xl"] as const).map((s) => (
          <FlowAvatar key={s} initials="AB" size={s} />
        ))}
      </div>
    ),
  },

  "display-flowavatargroup": {
    default: () => (
      <FlowAvatarGroup>
        <FlowAvatar initials="AB" />
        <FlowAvatar initials="CD" />
        <FlowAvatar initials="EF" />
      </FlowAvatarGroup>
    ),
    "with-overflow": () => (
      <FlowAvatarGroup max={3}>
        {Array.from({ length: 6 }, (_, i) => (
          <FlowAvatar key={i} initials={String.fromCharCode(65 + i * 2) + String.fromCharCode(66 + i * 2)} />
        ))}
      </FlowAvatarGroup>
    ),
  },

  "display-flowbadge": {
    default: () => <FlowBadge content={5}><FlowIconButton icon="bell" aria-label="Notifications" /></FlowBadge>,
    dot: () => <FlowBadge variant="dot"><FlowIconButton icon="bell" aria-label="Notifications" /></FlowBadge>,
    "all-statuses": () => (
      <div style={{ display: "flex", gap: 16 }}>
        {(["neutral", "info", "success", "warning", "error"] as const).map((s) => (
          <FlowBadge key={s} content={3} status={s}><FlowIconButton icon="bell" aria-label={s} /></FlowBadge>
        ))}
      </div>
    ),
  },

  "display-flowcard": {
    default: () => (
      <FlowCard style={{ padding: 16, width: 240 }}>
        <p style={{ margin: 0 }}>Card content</p>
      </FlowCard>
    ),
    "elevation-levels": () => (
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        {([0, 1, 2, 3, 4] as const).map((e) => (
          <FlowCard key={e} elevation={e} style={{ padding: 16, width: 120, textAlign: "center" }}>
            Level {e}
          </FlowCard>
        ))}
      </div>
    ),
  },

  "display-flowchip": {
    default: () => <FlowChip>React</FlowChip>,
    "with-icon": () => <FlowChip icon="code">TypeScript</FlowChip>,
    removable: () => <FlowChip onRemove={() => {}}>Removable</FlowChip>,
    selected: () => <FlowChip selected>Selected</FlowChip>,
    disabled: () => <FlowChip disabled>Disabled</FlowChip>,
    "all-variants": () => (
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {(["filled", "outlined", "tonal", "filter"] as const).map((v) => (
          <FlowChip key={v} variant={v}>{v}</FlowChip>
        ))}
      </div>
    ),
  },

  "display-flowkpitrendindicator": {
    default: () => <FlowKPITrendIndicator value="+12.5%" direction="up" />,
    downtrend: () => <FlowKPITrendIndicator value="-3.2%" direction="down" />,
    neutral: () => <FlowKPITrendIndicator value="0%" direction="neutral" />,
  },

  "display-flowlist": {
    default: () => (
      <FlowList>
        <FlowListItem primary="First item" />
        <FlowListItem primary="Second item" />
        <FlowListItem primary="Third item" />
      </FlowList>
    ),
    "with-dividers": () => (
      <FlowList dividers>
        <FlowListItem primary="First item" />
        <FlowListItem primary="Second item" />
        <FlowListItem primary="Third item" />
      </FlowList>
    ),
  },

  "display-flowtag": {
    default: () => <FlowTag>neutral</FlowTag>,
    "all-statuses": () => (
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <FlowTag>neutral</FlowTag>
        <FlowTag status="info">info</FlowTag>
        <FlowTag status="success">success</FlowTag>
        <FlowTag status="warning">warning</FlowTag>
        <FlowTag status="error">error</FlowTag>
        <FlowTag variant="code">code</FlowTag>
      </div>
    ),
  },

  "display-flowtreeview": {
    default: () => (
      <FlowTreeView
        nodes={[
          {
            id: "root", label: "Root", children: [
              { id: "child1", label: "Child 1" },
              { id: "child2", label: "Child 2", children: [{ id: "grandchild", label: "Grandchild" }] },
            ],
          },
        ]}
      />
    ),
  },

  "display-flowchartlegenditem": {
    default: () => <FlowChartLegendItem color="#0060DF" label="Revenue" />,
    "with-value": () => <FlowChartLegendItem color="#007840" label="Growth" value="12.5%" />,
  },

  // ── Feedback ──────────────────────────────────────────
  "feedback-flowcircularprogress": {
    default: () => <FlowCircularProgress value={65} />,
    indeterminate: () => <FlowCircularProgress indeterminate />,
    "all-variants": () => (
      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        {(["neutral", "info", "success", "warning", "error"] as const).map((s) => (
          <FlowCircularProgress key={s} value={65} status={s} />
        ))}
      </div>
    ),
    "with-label": () => <FlowCircularProgress value={75} showLabel />,
  },

  "feedback-flowinlinevalidationmessage": {
    default: () => <FlowInlineValidationMessage message="This field is required" />,
    "all-variants": () => (
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <FlowInlineValidationMessage message="Error message" status="error" />
        <FlowInlineValidationMessage message="Success message" status="success" />
        <FlowInlineValidationMessage message="Warning message" status="warning" />
        <FlowInlineValidationMessage message="Info message" status="info" />
      </div>
    ),
  },

  "feedback-flowprogressbar": {
    default: () => <FlowProgressBar value={65} />,
    indeterminate: () => <FlowProgressBar indeterminate />,
    "all-variants": () => (
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {(["neutral", "info", "success", "warning", "error"] as const).map((s) => (
          <FlowProgressBar key={s} value={65} status={s} />
        ))}
      </div>
    ),
    "with-label": () => <FlowProgressBar value={75} showLabel />,
  },

  "feedback-flowskeleton": {
    default: () => <FlowSkeleton />,
    "text-lines": () => (
      <div style={{ display: "flex", flexDirection: "column", gap: 8, width: 240 }}>
        <FlowSkeleton variant="text" />
        <FlowSkeleton variant="text" width="80%" />
        <FlowSkeleton variant="text" width="60%" />
      </div>
    ),
    circle: () => <FlowSkeleton variant="circle" width={48} height={48} />,
    card: () => (
      <div style={{ width: 240 }}>
        <FlowSkeleton variant="rect" height={120} />
        <div style={{ padding: 12, display: "flex", flexDirection: "column", gap: 8 }}>
          <FlowSkeleton variant="text" />
          <FlowSkeleton variant="text" width="70%" />
        </div>
      </div>
    ),
  },

  // ── Navigation ────────────────────────────────────────
  "navigation-flowbottomnav": {
    default: () => (
      <FlowBottomNav
        items={[
          { key: "home", label: "Home", icon: "home" },
          { key: "search", label: "Search", icon: "search" },
          { key: "profile", label: "Profile", icon: "user" },
        ]}
        activeKey="home"
        onChange={() => {}}
      />
    ),
    "with-badge": () => (
      <FlowBottomNav
        items={[
          { key: "home", label: "Home", icon: "home" },
          { key: "inbox", label: "Inbox", icon: "mail", badge: 3 },
          { key: "profile", label: "Profile", icon: "user" },
        ]}
        activeKey="home"
        onChange={() => {}}
      />
    ),
  },

  "navigation-flowbreadcrumbs": {
    default: () => (
      <FlowBreadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Components", href: "/components" },
          { label: "Button" },
        ]}
      />
    ),
    "with-icons": () => (
      <FlowBreadcrumbs
        items={[
          { label: "Home", href: "/", icon: "home" },
          { label: "Settings", href: "/settings", icon: "settings" },
          { label: "Profile" },
        ]}
      />
    ),
  },

  "navigation-flowpagination": {
    default: () => <FlowPagination page={3} totalPages={10} onChange={() => {}} />,
    "first-page": () => <FlowPagination page={1} totalPages={10} onChange={() => {}} />,
    "last-page": () => <FlowPagination page={10} totalPages={10} onChange={() => {}} />,
  },

  "navigation-flowsidebar": {
    default: () => (
      <div style={{ height: 400 }}>
        <FlowSidebar items={sidebarItems} activeItem="home" onItemClick={() => {}} />
      </div>
    ),
    collapsed: () => (
      <div style={{ height: 400 }}>
        <FlowSidebar items={sidebarItems} activeItem="home" onItemClick={() => {}} collapsed />
      </div>
    ),
  },

  "navigation-flowstepper": {
    default: () => (
      <FlowStepper
        activeStep={1}
        steps={[
          { id: "1", label: "Account", description: "Create your account" },
          { id: "2", label: "Profile", description: "Set up your profile" },
          { id: "3", label: "Confirm", description: "Review and confirm" },
        ]}
      />
    ),
    "with-error": () => (
      <FlowStepper
        activeStep={1}
        steps={[
          { id: "1", label: "Account", error: true, description: "Email already exists" },
          { id: "2", label: "Profile" },
          { id: "3", label: "Confirm" },
        ]}
      />
    ),
    vertical: () => (
      <FlowStepper
        activeStep={1}
        orientation="vertical"
        steps={[
          { id: "1", label: "Step 1", description: "First step" },
          { id: "2", label: "Step 2", description: "Second step" },
          { id: "3", label: "Step 3", description: "Third step" },
        ]}
      />
    ),
  },

  "navigation-flowtabs": {
    default: () => (
      <FlowTabs
        defaultActiveKey="tab1"
        tabs={[
          { id: "tab1", label: "Overview", content: <p>Overview content</p> },
          { id: "tab2", label: "Details", content: <p>Details content</p> },
          { id: "tab3", label: "History", content: <p>History content</p> },
        ]}
      />
    ),
    "with-icons": () => (
      <FlowTabs
        defaultActiveKey="tab1"
        tabs={[
          { id: "tab1", label: "Overview", icon: "home", content: <p>Overview</p> },
          { id: "tab2", label: "Analytics", icon: "chart-square", content: <p>Analytics</p> },
        ]}
      />
    ),
    filled: () => (
      <FlowTabs
        defaultActiveKey="tab1"
        variant="filled"
        tabs={[
          { id: "tab1", label: "Tab 1", content: <p>Tab 1 content</p> },
          { id: "tab2", label: "Tab 2", content: <p>Tab 2 content</p> },
        ]}
      />
    ),
  },

  // ── Overlays ──────────────────────────────────────────
  "overlays-flowdialog": {
    default: () => <DialogDemo />,
    "with-actions": () => <DialogDemo size="md" />,
    "alert-variant": () => <DialogDemo variant="alert" />,
  },

  "overlays-flowbottomsheet": {
    default: () => <BottomSheetDemo />,
    "with-title": () => <BottomSheetDemo title="Sheet Title" />,
  },

  "overlays-flowmenu": {
    default: () => <MenuDemo />,
    "with-label": () => <MenuDemo label="Actions" trigger="Actions" />,
    "with-shortcuts": () => (
      <FlowMenu
        trigger="Edit"
        label="Edit"
        items={[
          { id: "cut", label: "Cut", icon: "scissors", trailing: "Ctrl+X" },
          { id: "copy", label: "Copy", icon: "copy", trailing: "Ctrl+C" },
          { id: "paste", label: "Paste", icon: "clipboard", trailing: "Ctrl+V" },
        ]}
        onSelect={() => {}}
      />
    ),
  },

  "overlays-flowcontextmenu": {
    default: () => (
      <FlowContextMenu
        items={[
          { key: "open", label: "Open" },
          { key: "copy", label: "Copy link" },
          { key: "delete", label: "Delete", danger: true, separator: true },
        ]}
        onSelect={() => {}}
      >
        <div style={{ padding: 24, border: "2px dashed #ccc", borderRadius: 8, userSelect: "none" }}>
          Right-click here
        </div>
      </FlowContextMenu>
    ),
  },

  "overlays-flowpopover": {
    default: () => <PopoverDemo />,
  },

  "overlays-flowtooltip": {
    default: () => (
      <FlowTooltip content="This is a tooltip">
        <FlowButton variant="secondary">Hover me</FlowButton>
      </FlowTooltip>
    ),
    positions: () => (
      <div style={{ display: "flex", gap: 16, padding: 40, flexWrap: "wrap" }}>
        {(["top", "bottom", "left", "right"] as const).map((p) => (
          <FlowTooltip key={p} content={`${p} tooltip`} position={p}>
            <FlowButton variant="outlined" size="sm">{p}</FlowButton>
          </FlowTooltip>
        ))}
      </div>
    ),
  },

  // ── Layout ────────────────────────────────────────────
  "layout-flowaccordion": {
    default: () => (
      <FlowAccordion
        items={[
          { id: "1", label: "What is Flow?", content: "Flow is a design system." },
          { id: "2", label: "How do I install it?", content: "Run npm install @flow/components." },
          { id: "3", label: "Is it accessible?", content: "Yes, all components meet WCAG 2.1 AA." },
        ]}
      />
    ),
    "single-item": () => (
      <FlowAccordion
        items={[
          { id: "1", label: "Section 1", content: "Only one open at a time." },
          { id: "2", label: "Section 2", content: "Open to see content." },
        ]}
      />
    ),
  },

  "layout-flowfieldset": {
    default: () => (
      <FlowFieldset legend="Personal Information">
        <FlowTextInput label="Name" placeholder="Enter name" />
        <FlowTextInput label="Email" placeholder="Enter email" />
      </FlowFieldset>
    ),
    disabled: () => (
      <FlowFieldset legend="Disabled Fieldset" disabled>
        <FlowTextInput label="Name" placeholder="Disabled" />
      </FlowFieldset>
    ),
    "with-description": () => (
      <FlowFieldset legend="Notifications" description="Choose how you receive notifications">
        <FlowCheckbox label="Email" />
        <FlowCheckbox label="SMS" />
      </FlowFieldset>
    ),
  },

  "layout-flowsplitpane": {
    default: () => (
      <div style={{ height: 300 }}>
        <FlowSplitPane
          first={<div style={{ padding: 16 }}>Left panel</div>}
          second={<div style={{ padding: 16 }}>Right panel</div>}
        />
      </div>
    ),
    vertical: () => (
      <div style={{ height: 300 }}>
        <FlowSplitPane
          direction="vertical"
          first={<div style={{ padding: 16 }}>Top panel</div>}
          second={<div style={{ padding: 16 }}>Bottom panel</div>}
        />
      </div>
    ),
  },

  // ── Data ──────────────────────────────────────────────
  "data-flowchartlegenditem": {
    default: () => <FlowChartLegendItem color="#0060DF" label="Revenue" />,
    "with-value": () => <FlowChartLegendItem color="#007840" label="Growth" value="12.5%" />,
    toggleable: () => <FlowChartLegendItem color="#CA0E00" label="Expenses" toggleable />,
  },

  "data-flowsortcontrol": {
    default: () => <FlowSortControl options={[{ key: "name", label: "Name" }, { key: "date", label: "Date" }]} sortKey={null} sortDirection={null} onSortChange={() => {}} />,
    "active-sort": () => <FlowSortControl options={[{ key: "name", label: "Name" }, { key: "date", label: "Date" }]} sortKey="name" sortDirection="asc" onSortChange={() => {}} />,
  },

  // ── Patterns ─────────────────────────────────────────
  "patterns-flowsnackbar": {
    info: () => <SnackbarDemo status="info" />,
    success: () => <SnackbarDemo status="success" />,
    warning: () => <SnackbarDemo status="warning" />,
    error: () => <SnackbarDemo status="error" />,
  },

  "patterns-flowsearch": {
    default: () => <FlowSearch placeholder="Search..." />,
    "with-shortcut": () => <FlowSearch placeholder="Search" shortcut="⌘K" />,
    loading: () => <FlowSearch placeholder="Search..." loading />,
    disabled: () => <FlowSearch placeholder="Search..." disabled />,
  },

  "patterns-flowautocomplete": {
    default: () => (
      <FlowAutocomplete
        label="Search users"
        options={[
          { value: "alice", label: "Alice Smith" },
          { value: "bob", label: "Bob Johnson" },
          { value: "carol", label: "Carol White" },
        ]}
      />
    ),
    "with-error": () => (
      <FlowAutocomplete
        label="Search users"
        options={[]}
        error="User not found"
      />
    ),
    disabled: () => (
      <FlowAutocomplete
        label="Search users"
        options={[]}
        disabled
      />
    ),
  },

  "patterns-flowdatepicker": {
    default: () => <FlowDatePicker label="Select date" />,
    "with-error": () => <FlowDatePicker label="Select date" error="Date is required" />,
    disabled: () => <FlowDatePicker label="Select date" disabled />,
  },

  "patterns-flowdaterangepicker": {
    default: () => <FlowDateRangePicker label="Date range" />,
  },

  "patterns-flowcolorpicker": {
    default: () => <FlowColorPicker label="Pick a color" />,
    "custom-swatches": () => (
      <FlowColorPicker
        label="Brand color"
        swatches={["#0060DF", "#007840", "#CA0E00", "#ED571C", "#6B4DC7"]}
      />
    ),
  },

  "patterns-flowinlineeditable": {
    default: () => <FlowInlineEditable value="Click to edit this text" onChange={() => {}} />,
    empty: () => <FlowInlineEditable value="" placeholder="Click to add text" onChange={() => {}} />,
    disabled: () => <FlowInlineEditable value="Cannot edit" onChange={() => {}} disabled />,
  },

  "patterns-flowfileupload": {
    default: () => <FlowFileUpload label="Upload files" />,
    "single-file": () => <FlowFileUpload label="Upload file" maxFiles={1} />,
    disabled: () => <FlowFileUpload label="Upload files" disabled />,
  },

  "patterns-flowemptystate": {
    default: () => <FlowEmptyState title="No results found" description="Try adjusting your search filters." />,
    "with-action": () => (
      <FlowEmptyState
        title="No items yet"
        description="Get started by creating your first item."
        action={<FlowButton variant="primary">Create item</FlowButton>}
      />
    ),
    compact: () => <FlowEmptyState title="Empty" compact />,
  },

  "patterns-flownotificationpanel": {
    default: () => <FlowNotificationPanel notifications={notificationItems} />,
    empty: () => <FlowNotificationPanel notifications={[]} />,
  },

  "patterns-flowfilterchipgroup": {
    default: () => (
      <FlowFilterChipGroup
        chips={[
          { id: "all", label: "All" },
          { id: "active", label: "Active" },
          { id: "inactive", label: "Inactive" },
          { id: "pending", label: "Pending" },
        ]}
        selected={new Set(["all"])}
        onSelectionChange={() => {}}
      />
    ),
  },

  "patterns-flowtimeline": {
    default: () => <FlowTimeline items={timelineItems} />,
  },

  "patterns-flowsectionheader": {
    default: () => <FlowSectionHeader title="Section Title" />,
    "with-subtitle": () => <FlowSectionHeader title="Section Title" description="Section description text" />,
    "no-divider": () => <FlowSectionHeader title="No Divider" divider={false} />,
  },

  "patterns-flowkpicard": {
    default: () => <FlowKPICard label="Total Revenue" value="$48,294" trend="up" trendValue="+12.5%" />,
    "trend-down": () => <FlowKPICard label="Expenses" value="$12,300" trend="down" trendValue="-3.2%" />,
    loading: () => <FlowKPICard label="Revenue" value="" loading />,
    neutral: () => <FlowKPICard label="Users" value="1,240" trend="neutral" trendValue="0%" />,
  },

  "patterns-flowhovercard": {
    default: () => (
      <div style={{ padding: 40 }}>
        <FlowHoverCard
          trigger={<FlowButton variant="outlined">Hover me</FlowButton>}
        >
          <div style={{ padding: 12 }}><strong>Hover card content</strong><p>Details appear here</p></div>
        </FlowHoverCard>
      </div>
    ),
  },

  "patterns-flowconfirmationdialog": {
    default: () => <ConfirmationDialogDemo />,
    danger: () => <ConfirmationDialogDemo intent="danger" />,
  },

  "patterns-flowcommandpalette": {
    default: () => <CommandPaletteDemo />,
  },

  "patterns-flowactionsheet": {
    default: () => {
      // FlowActionSheet is FlowQuickActions — uses a trigger + sheet pattern
      function Demo() {
        const [open, setOpen] = useState(false);
        return (
          <>
            <FlowButton onClick={() => setOpen(true)}>Open Actions</FlowButton>
            <FlowActionSheet
              open={open}
              onClose={() => setOpen(false)}
              title="Actions"
              actions={[
                { id: "share", label: "Share", icon: "share" },
                { id: "copy", label: "Copy link", icon: "copy" },
                { id: "delete", label: "Delete", icon: "trash", intent: "danger" },
              ]}
              onAction={() => setOpen(false)}
            />
          </>
        );
      }
      return <Demo />;
    },
  },

  "patterns-flowfullscreensheet": {
    default: () => <FullscreenSheetDemo />,
  },

  "patterns-flowformsection": {
    default: () => (
      <FlowFormSection title="Personal Information">
        <FlowTextInput label="First name" placeholder="Enter first name" />
        <FlowTextInput label="Last name" placeholder="Enter last name" />
      </FlowFormSection>
    ),
    collapsible: () => (
      <FlowFormSection title="Address" collapsible defaultOpen>
        <FlowTextInput label="Street" placeholder="Enter street" />
        <FlowTextInput label="City" placeholder="Enter city" />
      </FlowFormSection>
    ),
  },

  "patterns-flowtoolbar": {
    default: () => (
      <FlowToolbar>
        <FlowToolbarGroup>
          <FlowIconButton icon="bold" aria-label="Bold" size="sm" />
          <FlowIconButton icon="italic" aria-label="Italic" size="sm" />
          <FlowIconButton icon="underline" aria-label="Underline" size="sm" />
        </FlowToolbarGroup>
        <FlowToolbarDivider />
        <FlowToolbarGroup>
          <FlowIconButton icon="align-left" aria-label="Left" size="sm" />
          <FlowIconButton icon="align-center" aria-label="Center" size="sm" />
        </FlowToolbarGroup>
      </FlowToolbar>
    ),
  },

  "patterns-flowswipeactions": {
    default: () => (
      <FlowSwipeActions
        leftActions={[{ key: "archive", label: "Archive", icon: "archive", intent: "success" }]}
        rightActions={[{ key: "delete", label: "Delete", icon: "trash", intent: "danger" }]}
      >
        <div style={{ padding: 16, background: "white" }}>Swipe this item</div>
      </FlowSwipeActions>
    ),
  },

  "patterns-flowtopbar": {
    default: () => (
      <FlowTopbar
        title="App Name"
        actions={<FlowIconButton icon="bell" aria-label="Notifications" size="sm" />}
      />
    ),
  },

  "patterns-flowdraweradapter": {
    default: () => <DrawerDemo side="left" />,
    "right-side": () => <DrawerDemo side="right" />,
  },

  "patterns-flowvirtualdatatable": {
    default: () => (
      <div style={{ height: 400 }}>
        <FlowVirtualDataTable columns={tableColumns} data={tableRows} rowKey={(row) => row.id} />
      </div>
    ),
    selectable: () => (
      <div style={{ height: 400 }}>
        <FlowVirtualDataTable columns={tableColumns} data={tableRows} rowKey={(row) => row.id} selectable />
      </div>
    ),
  },

  "patterns-flowtransferlist": {
    default: () => (
      <FlowTransferList
        items={transferItems}
        defaultTargetIds={[transferItems[2].id, transferItems[3].id]}
        onChange={() => {}}
      />
    ),
    searchable: () => (
      <FlowTransferList
        items={transferItems}
        defaultTargetIds={[transferItems[2].id]}
        onChange={() => {}}
        searchable
      />
    ),
  },

  "patterns-flowdragsortablelist": {
    default: () => (
      <FlowDragSortableList
        items={sortableItems}
        onReorder={() => {}}
      />
    ),
  },

  "patterns-flowadvancedfilters": {
    default: () => (
      <FlowAdvancedFilters
        fields={[
          { key: "name", label: "Name", type: "text" },
          { key: "status", label: "Status", type: "select", options: [{ value: "active", label: "Active" }, { value: "inactive", label: "Inactive" }] },
          { key: "amount", label: "Amount", type: "number" },
        ]}
        filters={[]}
        onFiltersChange={() => {}}
      />
    ),
  },

  "patterns-flowcolumnconfigurator": {
    default: () => (
      <FlowColumnConfigurator
        columns={[
          { key: "name", label: "Name", visible: true },
          { key: "email", label: "Email", visible: true },
          { key: "role", label: "Role", visible: false },
          { key: "created", label: "Created", visible: true },
        ]}
        onColumnsChange={() => {}}
      />
    ),
  },

  "patterns-flowcalendarview": {
    default: () => (
      <FlowCalendarView
        events={[
          { id: "1", title: "Team meeting", date: new Date().toISOString().slice(0, 10), color: "#0060DF" },
        ]}
      />
    ),
  },

  "patterns-flowchartwrapper": {
    default: () => (
      <FlowChartWrapper title="Monthly Revenue" subtitle="Last 12 months">
        <div style={{ height: 200, display: "flex", alignItems: "center", justifyContent: "center", color: "#94A3B8" }}>
          Chart placeholder
        </div>
      </FlowChartWrapper>
    ),
    loading: () => <FlowChartWrapper title="Revenue" loading height={200} />,
    empty: () => <FlowChartWrapper title="Revenue" empty emptyMessage="No data available" height={200} />,
  },

  "patterns-flowpulltorefresh": {
    default: () => (
      <div style={{ height: 200, overflow: "auto" }}>
        <FlowPullToRefresh refreshing={false} onRefresh={() => {}}>
          <div style={{ padding: 16 }}>Pull down to refresh</div>
        </FlowPullToRefresh>
      </div>
    ),
  },

  "patterns-flowmultiselect": {
    default: () => (
      <FlowMultiSelect
        label="Countries"
        options={selectOptions}
        placeholder="Select countries..."
      />
    ),
  },

  // ── Foundation ────────────────────────────────────────
  "foundation-densitycomparison": {
    default: () => (
      <div style={{ display: "flex", gap: 24 }}>
        {(["compact", "default", "comfortable"] as const).map((d) => (
          <div key={d} data-density={d} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <p style={{ margin: 0, fontSize: 12, fontWeight: 600, textTransform: "uppercase", opacity: 0.6 }}>{d}</p>
            <FlowButton variant="primary" size="md">Button</FlowButton>
            <FlowTextInput label="Input" placeholder="Value" size="md" />
          </div>
        ))}
      </div>
    ),
  },
};

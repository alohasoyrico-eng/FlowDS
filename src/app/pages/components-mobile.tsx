import { FlowChip, Inline, Stack, Surface } from "@flow/design-system";
import { type ComponentSpec, ComponentSpecAccordion } from "../components/component-accordion";
import { PAGE_GAP, PageHeader } from "../components/doc-primitives";
import { LayoutGrid } from "../components/layout-grid";

const mobileComponents: ComponentSpec[] = [
  {
    name: "BottomNav",
    purpose:
      "Primary navigation for mobile applications. Persists at the bottom of the screen, providing access to top-level destinations (3-5 items).",
    anatomy: [
      "Container (Surface, elevated, full-width at bottom)",
      "Nav items (ActionSurface each)",
      "Icon per item",
      "Label per item (optional in compact mode)",
      "Active indicator (filled shape behind active icon)",
      "Badge (optional, on icon)",
    ],
    variants: [
      "Labeled — icon + text for all items",
      "Icon-only — labels hidden, shown only for active item",
      "With FAB cutout — notched to accommodate a centered FAB",
      "Shifting — active item expands, inactive items shrink",
    ],
    states: ["default", "active (selected destination)", "hover (web fallback)", "pressed"],
    tokens: [
      "comp.bottomnav.bg",
      "comp.bottomnav.elevation",
      "comp.bottomnav.height",
      "comp.bottomnav.item.*",
      "comp.bottomnav.indicator.*",
      "comp.bottomnav.badge.*",
    ],
    foundations: ["Energy", "Iconography", "Voice", "Frame", "State", "Depth"],
    accessibility: [
      "role='navigation' with aria-label",
      "Each item: role='tab' or role='link'",
      "aria-current='page' on active item",
      "Items are focusable with visible focus ring",
    ],
    tone: "Labels are single-word destinations: 'Home', 'Search', 'Activity', 'Profile'.",
    growth: "Track navigation distribution to identify underused destinations.",
    platformNotes:
      "Mobile-only component. On web, replaced by Sidebar or Topbar. Safe area insets respected on iOS/Android.",
  },
  {
    name: "BottomSheet",
    purpose:
      "A panel that slides up from the bottom of the screen to present contextual content or actions without leaving the current view.",
    anatomy: [
      "Overlay backdrop",
      "Sheet surface (Surface, elevated, rounded top corners)",
      "Drag handle (grab indicator at top)",
      "Header (optional: title + close)",
      "Content area (scrollable)",
      "Footer (optional: action buttons)",
    ],
    variants: [
      "Peek — shows partial content, draggable to expand",
      "Modal — full overlay, must be dismissed",
      "Persistent — stays open, pushes content up (rare)",
      "Expandable — multiple snap points (peek → half → full)",
    ],
    states: ["closed", "peeking", "half-expanded", "fully-expanded", "closing"],
    tokens: [
      "comp.bottomsheet.bg",
      "comp.bottomsheet.elevation",
      "comp.bottomsheet.radius",
      "comp.bottomsheet.handle.*",
      "comp.bottomsheet.overlay.*",
      "comp.bottomsheet.snapPoints.*",
    ],
    foundations: ["Depth", "Energy", "Frame", "Momentum", "State"],
    accessibility: [
      "role='dialog' when modal",
      "aria-label or aria-labelledby",
      "Focus trapped when modal",
      "Drag handle: role='slider' with aria-label 'Resize sheet'",
      "Escape/back button closes",
    ],
    tone: "Title describes the sheet's purpose: 'Filter transactions', 'Share with...'",
    growth:
      "Track sheet open → action completion rate. Track which snap point users most commonly use.",
    platformNotes:
      "Spring-based drag physics on mobile. Web fallback: Dialog or Drawer. Gesture velocity determines snap target.",
  },
  {
    name: "FullscreenSheet",
    purpose:
      "A full-viewport modal for complex tasks on mobile (forms, multi-step flows). Replaces Dialog for mobile when content is too complex for a BottomSheet.",
    anatomy: [
      "Full-viewport surface",
      "Top bar (close button + title + optional action)",
      "Content area (scrollable)",
      "Bottom action bar (sticky)",
    ],
    variants: [
      "Form — contains form fields with sticky submit",
      "Multi-step — includes progress indicator",
      "Preview — read-only content view",
    ],
    states: ["entering", "open", "exiting"],
    tokens: [
      "comp.fullsheet.bg",
      "comp.fullsheet.topbar.*",
      "comp.fullsheet.content.padding",
      "comp.fullsheet.action.*",
    ],
    foundations: ["Energy", "Voice", "Frame", "Momentum", "Depth"],
    accessibility: [
      "role='dialog'",
      "Focus trapped",
      "Close button accessible",
      "Back gesture or button returns to previous view",
    ],
    tone: "Title is the task: 'New Transaction', 'Edit Profile'. Action button is the completion verb: 'Submit', 'Save'.",
    growth: "Track completion vs abandonment rate. Track time-to-complete for optimization.",
    platformNotes:
      "Mobile-only. Slides up from bottom on iOS, slides in from right on Android (platform convention). Web equivalent: Dialog.",
  },
  {
    name: "FAB (Floating Action Button)",
    purpose:
      "A prominent circular button for the primary action on a screen. Floats above content. Used sparingly — one per screen maximum.",
    anatomy: [
      "Circular container (Surface, elevated)",
      "Icon",
      "StateLayer",
      "Extended label (optional, pill shape)",
    ],
    variants: [
      "Standard — icon only, 56px",
      "Small — icon only, 40px",
      "Extended — icon + label, pill shape",
      "Animated — morphs between standard and extended on scroll",
    ],
    states: ["default", "hover", "focus-visible", "pressed"],
    tokens: [
      "comp.fab.size.*",
      "comp.fab.bg",
      "comp.fab.icon.*",
      "comp.fab.elevation",
      "comp.fab.label.*",
    ],
    foundations: ["Energy", "Iconography", "Voice", "Depth", "State", "Momentum"],
    accessibility: [
      "aria-label required (icon is not self-describing)",
      "Must be reachable via keyboard",
      "Extended variant: label is visual + accessible",
    ],
    tone: "Label (extended): verb phrase 'New message', 'Create task'. Tooltip (standard): same verb phrase.",
    growth: "Track FAB click rate. Low rates may indicate wrong primary action or poor placement.",
    platformNotes:
      "Positioned above BottomNav with safe area. Collapses on scroll (optional). Web: rare, usually replaced by a primary button in layout.",
  },
  {
    name: "PullToRefresh",
    purpose:
      "A gesture-driven refresh indicator. User pulls down on scrollable content to trigger a data refresh.",
    anatomy: [
      "Pull indicator (circular progress or custom animation)",
      "Threshold line (invisible, triggers refresh)",
      "Content container (scrollable)",
    ],
    variants: [
      "Standard — circular spinner appears on pull",
      "Custom — branded animation during pull",
      "With status — shows 'Updated just now' after refresh",
    ],
    states: [
      "idle",
      "pulling (finger down, not yet threshold)",
      "triggered (past threshold, will refresh on release)",
      "refreshing (data loading)",
      "complete",
    ],
    tokens: [
      "comp.pullrefresh.indicator.*",
      "comp.pullrefresh.threshold",
      "comp.pullrefresh.offset",
    ],
    foundations: ["Momentum", "Energy", "State"],
    accessibility: [
      "aria-live='polite' announces refresh state",
      "'Refreshing' and 'Updated' announced to screen readers",
      "Not a visual-only interaction — provide manual refresh button as alternative",
    ],
    tone: "'Pull to refresh' (hint), 'Refreshing...' (during), 'Updated just now' (after).",
    growth: "Track refresh frequency to understand data freshness expectations.",
    platformNotes:
      "Mobile-only. Native overscroll behavior on each platform. Web: not used (use manual refresh button or auto-refresh).",
  },
  {
    name: "DatePicker",
    purpose:
      "A mobile-optimized date selection interface. Can select single dates, date ranges, or dates with time.",
    anatomy: [
      "Trigger (ActionSurface showing selected date)",
      "Calendar grid (month view)",
      "Month/year navigation",
      "Day cells (ActionSurface each)",
      "Time selector (optional, wheels or input)",
      "Action bar (Cancel/Confirm)",
    ],
    variants: [
      "Single date — pick one date",
      "Range — pick start and end dates",
      "Date + time — date picker followed by time selector",
      "Inline — calendar embedded in page, not in a sheet",
    ],
    states: [
      "closed",
      "open",
      "date-selected",
      "range-start-selected",
      "range-complete",
      "error (invalid date)",
    ],
    tokens: [
      "comp.datepicker.trigger.*",
      "comp.datepicker.calendar.*",
      "comp.datepicker.day.*",
      "comp.datepicker.selected.*",
      "comp.datepicker.range.*",
      "comp.datepicker.navigation.*",
    ],
    foundations: ["Energy", "Voice", "Frame", "State", "Momentum", "Depth", "Tone"],
    accessibility: [
      "role='dialog' for picker overlay",
      "Calendar grid: role='grid' with aria-label",
      "Day cells: role='gridcell' with aria-selected",
      "Keyboard: arrows navigate days, Enter selects, Escape closes",
    ],
    tone: "Trigger shows formatted date: 'Feb 25, 2026'. Range: 'Feb 25 – Mar 5, 2026'.",
    growth: "Track date selection patterns (how far into future/past users typically select).",
    platformNotes:
      "Mobile: opens in BottomSheet. Web: opens in Popover. Date formatting respects locale.",
  },
  {
    name: "OTP Input",
    purpose:
      "A specialized input for one-time password entry. Renders individual character boxes for verification codes.",
    anatomy: [
      "Container (horizontal row)",
      "Character boxes (individual inputs or segments)",
      "Cursor indicator",
      "Error message area",
    ],
    variants: [
      "4-digit — short verification codes",
      "6-digit — standard OTP",
      "Alphanumeric — mixed character codes",
      "With timer — shows countdown for code expiry",
    ],
    states: [
      "default",
      "focus (active box highlighted)",
      "filled (all boxes have values)",
      "error (invalid code)",
      "success (verified)",
      "disabled",
    ],
    tokens: [
      "comp.otp.box.*",
      "comp.otp.gap",
      "comp.otp.text.*",
      "comp.otp.cursor.*",
      "comp.otp.error.*",
      "comp.otp.timer.*",
    ],
    foundations: ["Energy", "Voice", "Frame", "State", "Tone"],
    accessibility: [
      "aria-label='One-time password'",
      "Each box is part of a single logical input",
      "Auto-focus first box on mount",
      "Paste support for full code",
      "Error announced via aria-live",
    ],
    tone: "Helper: 'Enter the 6-digit code sent to your phone'. Error: 'Invalid code. Please try again.' Timer: 'Resend code in 0:42'.",
    growth:
      "Track completion rate, error rate, and time-to-enter. High error rates may indicate UX issues.",
    platformNotes:
      "Mobile: auto-fill from SMS (autocomplete='one-time-code'). Number keyboard on mobile. Web: supports paste.",
  },
  {
    name: "QuickActions",
    purpose:
      "A grid of shortcut actions presented prominently — often on a home screen or dashboard. Each action is a large touch target with icon and label.",
    anatomy: [
      "Grid container",
      "Action cells (ActionSurface, square or rounded)",
      "Icon (large)",
      "Label (short)",
      "Optional badge or status indicator",
    ],
    variants: [
      "Grid — 2×2, 3×3, or 4×2 layout",
      "Scrollable row — horizontal scroll for many actions",
      "Customizable — user can reorder/hide actions",
    ],
    states: ["default", "hover", "pressed", "disabled (if action unavailable)"],
    tokens: [
      "comp.quickactions.grid.*",
      "comp.quickactions.cell.*",
      "comp.quickactions.icon.*",
      "comp.quickactions.label.*",
    ],
    foundations: ["Energy", "Iconography", "Voice", "Frame", "State"],
    accessibility: [
      "role='list' on grid, role='listitem' on cells",
      "Each cell has aria-label combining icon meaning and label",
      "Keyboard navigable",
    ],
    tone: "Labels are action verbs or nouns: 'Transfer', 'Pay Bills', 'Statements', 'Support'.",
    growth:
      "Track which quick actions are used most/least. Inform default ordering and prominence.",
    platformNotes:
      "Mobile-primary. On web, may appear as a horizontal card row. Touch targets minimum 64px.",
  },
];

export function ComponentsMobilePage() {
  return (
    <LayoutGrid>
      <LayoutGrid.Item span={12} className="component-detail-surface-wrapper">
        <Surface variant="secondary" radius="surface" className="component-detail-surface">
          <Stack gap={PAGE_GAP}>
            <PageHeader chapter="Chapter 05 — Mobile" title="Mobile-First Components">
              Mobile-first components are designed for touch interaction, gesture-driven navigation,
              and mobile viewport constraints. They may have web equivalents but their primary
              implementation targets mobile platforms (React Native / Flutter).
            </PageHeader>

            <Inline gap={2} wrap>
              {mobileComponents.map((c) => (
                <FlowChip key={c.name}>{c.name}</FlowChip>
              ))}
            </Inline>

            <ComponentSpecAccordion items={mobileComponents} badge="MOBILE" layout="compact" />
          </Stack>
        </Surface>
      </LayoutGrid.Item>
    </LayoutGrid>
  );
}

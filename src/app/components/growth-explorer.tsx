/**
 * GrowthExplorer — Interactive analytics & event tracking explorer
 * ────────────────────────────────────────────────────────────────
 * Visualizes FLOW's Growth (analytics) integration layer:
 * - Event taxonomy tree (5 event types)
 * - Interactive payload builder for 10+ components
 * - Coverage matrix across 67 documented components
 * - Live event monitor with simulated console output
 *
 * Embedded within the Growth foundation detail page.
 */
import { useRef, useState } from "react";

import { Divider, Inline, Stack, Surface, Text } from "@flow/primitives";

// ── Event types ──
interface EventType {
  suffix: string;
  label: string;
  description: string;
  example: string;
}

const EVENT_TYPES: EventType[] = [
  {
    suffix: ".impression",
    label: "Impression",
    description: "Component entered viewport",
    example: "User scrolled to a KPICard",
  },
  {
    suffix: ".interaction",
    label: "Interaction",
    description: "User interacted (click, toggle, type)",
    example: "User clicked a Button or toggled a Switch",
  },
  {
    suffix: ".completion",
    label: "Completion",
    description: "Form submitted, flow completed",
    example: "User submitted a Wizard or completed OTP entry",
  },
  {
    suffix: ".abandonment",
    label: "Abandonment",
    description: "Form abandoned, flow exited",
    example: "User dismissed a Dialog mid-flow",
  },
  {
    suffix: ".error",
    label: "Error",
    description: "Error state triggered",
    example: "TextField validation failed on blur",
  },
];

// ── Component payloads ──
interface ComponentPayload {
  name: string;
  eventType: string;
  action: string;
  properties: Record<string, unknown>;
  autoCaptured: string[];
  developerDefined: string[];
}

const COMPONENT_PAYLOADS: ComponentPayload[] = [
  {
    name: "Button",
    eventType: "flow.component.interaction",
    action: "click",
    properties: { label: "Submit Payment", variant: "primary", loadingDuration: null },
    autoCaptured: ["variant", "action", "loadingDuration"],
    developerDefined: ["label"],
  },
  {
    name: "TextField",
    eventType: "flow.component.interaction",
    action: "change",
    properties: { hasError: false, charCount: 24, fieldName: "email" },
    autoCaptured: ["hasError", "charCount", "action"],
    developerDefined: ["fieldName"],
  },
  {
    name: "Checkbox",
    eventType: "flow.component.interaction",
    action: "toggle",
    properties: { checked: true, groupName: "preferences", indeterminate: false },
    autoCaptured: ["checked", "indeterminate", "action"],
    developerDefined: ["groupName"],
  },
  {
    name: "Switch",
    eventType: "flow.component.interaction",
    action: "toggle",
    properties: { checked: true, label: "Dark mode", disabled: false },
    autoCaptured: ["checked", "disabled", "action"],
    developerDefined: ["label"],
  },
  {
    name: "Dialog",
    eventType: "flow.component.completion",
    action: "confirm",
    properties: { variant: "confirmation", openDuration: 3200, dismissMethod: "primary-action" },
    autoCaptured: ["variant", "openDuration", "dismissMethod"],
    developerDefined: [],
  },
  {
    name: "Table",
    eventType: "flow.component.interaction",
    action: "sort",
    properties: { column: "created_at", direction: "desc", rowCount: 142, pageIndex: 0 },
    autoCaptured: ["direction", "rowCount", "pageIndex", "action"],
    developerDefined: ["column"],
  },
  {
    name: "Select",
    eventType: "flow.component.interaction",
    action: "select",
    properties: { selectedValue: "us-east-1", optionCount: 12, searchUsed: false },
    autoCaptured: ["optionCount", "searchUsed", "action"],
    developerDefined: ["selectedValue"],
  },
  {
    name: "Tabs",
    eventType: "flow.component.interaction",
    action: "switch",
    properties: { fromIndex: 0, toIndex: 2, tabLabel: "Settings", tabCount: 4 },
    autoCaptured: ["fromIndex", "toIndex", "tabCount", "action"],
    developerDefined: ["tabLabel"],
  },
  {
    name: "Search",
    eventType: "flow.component.interaction",
    action: "query",
    properties: { queryLength: 18, resultCount: 7, latency: 120, hasFilters: true },
    autoCaptured: ["queryLength", "resultCount", "latency", "action"],
    developerDefined: ["hasFilters"],
  },
  {
    name: "Slider",
    eventType: "flow.component.interaction",
    action: "change",
    properties: { value: 75, min: 0, max: 100, step: 5, label: "Volume" },
    autoCaptured: ["value", "min", "max", "step", "action"],
    developerDefined: ["label"],
  },
  {
    name: "OTPInput",
    eventType: "flow.component.completion",
    action: "submit",
    properties: { length: 6, duration: 8400, autoFilled: false, attempts: 1 },
    autoCaptured: ["length", "duration", "autoFilled", "attempts"],
    developerDefined: [],
  },
  {
    name: "Wizard",
    eventType: "flow.component.completion",
    action: "finish",
    properties: { stepCount: 4, completedSteps: 4, totalDuration: 45000, abandoned: false },
    autoCaptured: ["stepCount", "completedSteps", "totalDuration", "abandoned"],
    developerDefined: [],
  },
  {
    name: "DatePicker",
    eventType: "flow.component.interaction",
    action: "select",
    properties: { selectedDate: "2026-03-15", rangeMode: false, inputMethod: "calendar" },
    autoCaptured: ["rangeMode", "inputMethod", "action"],
    developerDefined: ["selectedDate"],
  },
  {
    name: "Accordion",
    eventType: "flow.component.interaction",
    action: "expand",
    properties: { panelIndex: 2, isOpen: true, panelCount: 5 },
    autoCaptured: ["panelIndex", "isOpen", "panelCount", "action"],
    developerDefined: [],
  },
];

// ── Coverage matrix ──
const WITH_GROWTH = [
  "Button",
  "IconButton",
  "ToggleButton",
  "SegmentedControl",
  "TextField",
  "Textarea",
  "Select",
  "Combobox",
  "Tabs",
  "Menu",
  "ContextMenu",
  "Search",
  "Sidebar",
  "BottomNav",
  "BottomSheet",
  "FullscreenSheet",
  "FAB",
  "FilterChipGroup",
  "SortControl",
  "InlineEditable",
  "OTPInput",
  "Toast",
  "QuickActions",
  "HoverCard",
  "Slider",
  "List",
  "Chip",
  "Dialog",
  "Popover",
  "Table",
  "StatusChip",
  "AdvancedFilters",
  "Alert",
  "Snackbar",
  "EmptyState",
  "KPICard",
  "Wizard",
  "ConfirmationDialog",
  "DatePicker",
  "DrawerAdapter",
  "Accordion",
  "Breadcrumb",
  "Pagination",
];

const WITHOUT_GROWTH = [
  "Avatar",
  "Badge",
  "Divider",
  "Progress",
  "Skeleton",
  "Card",
  "Tooltip",
  "Timeline",
  "ResponsiveGrid",
  "SectionHeader",
  "KPITrendIndicator",
  "ChartWrapper",
  "Fieldset",
  "FormSection",
  "InlineValidationMessage",
  "Radio",
  "Checkbox",
  "Switch",
  "Topbar",
  "Toolbar",
];

// ── Monitor event type ──
interface MonitorEvent {
  id: number;
  timestamp: string;
  event: string;
  component: string;
  action: string;
  payload: Record<string, unknown>;
}

// ── Shared styles ──
const codeFont: React.CSSProperties = {
  fontFamily: "var(--ref-voice-family-mono)",
  fontSize: "var(--ref-voice-size-4)",
};

const pillBase: React.CSSProperties = {
  padding: "var(--ref-frame-space-1) var(--ref-frame-space-3)",
  borderRadius: "var(--ref-frame-radius-full)",
  fontSize: "var(--ref-voice-size-4)",
  fontFamily: "var(--ref-voice-family-sans)",
  fontWeight: "var(--ref-voice-weight-medium)",
  display: "inline-block",
  whiteSpace: "nowrap",
};

let eventCounter = 0;
function makeTimestamp(): string {
  const d = new Date();
  return (
    d.toLocaleTimeString("en-US", { hour12: false }) +
    "." +
    String(d.getMilliseconds()).padStart(3, "0")
  );
}

// ══════════════════════════════════════════════════════════════
// Main component
// ══════════════════════════════════════════════════════════════
export function GrowthExplorer() {
  const [selectedComponent, setSelectedComponent] = useState(0);
  const [monitorEvents, setMonitorEvents] = useState<MonitorEvent[]>([]);
  const [demoToggle, setDemoToggle] = useState(false);
  const [demoText, setDemoText] = useState("");
  const monitorRef = useRef<HTMLDivElement>(null);

  const pushEvent = (
    component: string,
    action: string,
    eventType: string,
    extra: Record<string, unknown> = {},
  ) => {
    const evt: MonitorEvent = {
      id: ++eventCounter,
      timestamp: makeTimestamp(),
      event: eventType,
      component,
      action,
      payload: extra,
    };
    setMonitorEvents((prev) => [...prev, evt]);
    requestAnimationFrame(() => {
      if (monitorRef.current) monitorRef.current.scrollTop = monitorRef.current.scrollHeight;
    });
  };

  const clearMonitor = () => setMonitorEvents([]);

  const total = WITH_GROWTH.length + WITHOUT_GROWTH.length;
  const covered = WITH_GROWTH.length;
  const pct = Math.round((covered / total) * 100);
  const comp = COMPONENT_PAYLOADS[selectedComponent];

  return (
    <Stack gap="component">
      <Divider spacing={0} />

      <Stack gap={2}>
        <Text variant="overline">Interactive Explorer</Text>
        <Text variant="heading-l">Growth Event System</Text>
        <Text color="secondary">
          Automatic analytics instrumentation across {covered} components. Five event types,
          structured payloads, and {pct}% coverage of the component library.
        </Text>
      </Stack>

      {/* ── Section 1: Event Taxonomy ── */}
      <Stack gap="component">
        <Stack gap={2}>
          <Text variant="heading-m">Event Taxonomy</Text>
          <Text color="secondary">
            Every trackable component emits events under the{" "}
            <span style={codeFont}>flow.component</span> namespace with one of five suffixes.
          </Text>
        </Stack>

        <Stack gap={3}>
          {/* Root node */}
          <Surface
            style={{
              padding: "var(--ref-frame-space-3) var(--ref-frame-space-4)",
              borderRadius: "var(--ref-frame-radius-2)",
              background: "var(--sys-energy-surface-accent)",
            }}
          >
            <Text variant="label-l" style={codeFont}>
              flow.component
            </Text>
          </Surface>

          {/* Child nodes */}
          <Stack gap={2} style={{ paddingLeft: "var(--ref-frame-space-6)" }}>
            {EVENT_TYPES.map((evt, i) => {
              const isLast = i === EVENT_TYPES.length - 1;
              return (
                <Inline key={evt.suffix} gap={3} align="stretch">
                  {/* Tree branch character */}
                  <Text
                    style={{
                      ...codeFont,
                      color: "var(--sys-energy-text-tertiary)",
                      flexShrink: 0,
                      width: "var(--ref-frame-space-5)",
                      textAlign: "center",
                    }}
                  >
                    {isLast ? "└" : "├"}
                  </Text>
                  <Surface
                    style={{
                      flex: 1,
                      padding: "var(--ref-frame-space-3) var(--ref-frame-space-4)",
                      borderRadius: "var(--ref-frame-radius-2)",
                    }}
                  >
                    <Stack gap={1}>
                      <Inline gap={2} align="center">
                        <Text variant="label-l" style={codeFont}>
                          {evt.suffix}
                        </Text>
                        <Text color="secondary" variant="paragraph-s">
                          {evt.description}
                        </Text>
                      </Inline>
                      <Text color="tertiary" variant="paragraph-s" style={{ fontStyle: "italic" }}>
                        e.g. {evt.example}
                      </Text>
                    </Stack>
                  </Surface>
                </Inline>
              );
            })}
          </Stack>
        </Stack>
      </Stack>

      <Divider spacing={0} />

      {/* ── Section 2: Event Payload Builder ── */}
      <Stack gap="component">
        <Stack gap={2}>
          <Text variant="heading-m">Event Payload Builder</Text>
          <Text color="secondary">
            Select a component to inspect its event payload structure. Properties are split between
            auto-captured and developer-defined.
          </Text>
        </Stack>

        {/* Component selector */}
        <Inline gap={2} wrap>
          {COMPONENT_PAYLOADS.map((c, i) => (
            <button
              key={c.name}
              onClick={() => setSelectedComponent(i)}
              style={{
                ...pillBase,
                border:
                  i === selectedComponent
                    ? "1px solid var(--sys-energy-border-focus)"
                    : "1px solid var(--sys-energy-border-default)",
                background:
                  i === selectedComponent
                    ? "var(--sys-energy-surface-accent)"
                    : "var(--sys-energy-surface-primary)",
                color:
                  i === selectedComponent
                    ? "var(--sys-energy-text-accent)"
                    : "var(--sys-energy-text-secondary)",
                cursor: "pointer",
              }}
            >
              {c.name}
            </button>
          ))}
        </Inline>

        {/* Payload display */}
        <Surface
          style={{ padding: "var(--ref-frame-space-4)", borderRadius: "var(--ref-frame-radius-3)" }}
        >
          <Stack gap={4}>
            {/* Event name */}
            <Inline gap={2} align="center">
              <Text variant="label-s" color="secondary">
                Event:
              </Text>
              <Text
                variant="label-l"
                style={{ ...codeFont, color: "var(--sys-energy-text-accent)" }}
              >
                {comp.eventType}
              </Text>
            </Inline>

            {/* JSON payload */}
            <pre
              style={{
                ...codeFont,
                margin: 0,
                padding: "var(--ref-frame-space-4)",
                borderRadius: "var(--ref-frame-radius-2)",
                background: "var(--ref-energy-neutral-950)",
                color: "var(--ref-energy-jade-400)",
                overflow: "auto",
                lineHeight: 1.6,
              }}
            >
              {JSON.stringify(
                {
                  event: comp.eventType,
                  component: comp.name,
                  variant: comp.name === "Button" ? "primary" : undefined,
                  action: comp.action,
                  properties: comp.properties,
                },
                null,
                2,
              )}
            </pre>

            {/* Auto-captured vs developer-defined */}
            <Inline gap={6} wrap>
              <Stack gap={1}>
                <Text variant="label-s" color="secondary">
                  Auto-captured
                </Text>
                <Inline gap={1} wrap>
                  {comp.autoCaptured.map((p) => (
                    <span
                      key={p}
                      style={{
                        ...pillBase,
                        background: "var(--ref-energy-jade-100)",
                        color: "var(--ref-energy-jade-700)",
                      }}
                    >
                      {p}
                    </span>
                  ))}
                </Inline>
              </Stack>
              <Stack gap={1}>
                <Text variant="label-s" color="secondary">
                  Developer-defined
                </Text>
                <Inline gap={1} wrap>
                  {comp.developerDefined.length > 0 ? (
                    comp.developerDefined.map((p) => (
                      <span
                        key={p}
                        style={{
                          ...pillBase,
                          background: "var(--sys-energy-surface-tertiary)",
                          color: "var(--sys-energy-text-secondary)",
                        }}
                      >
                        {p}
                      </span>
                    ))
                  ) : (
                    <Text color="tertiary" variant="paragraph-s">
                      None required
                    </Text>
                  )}
                </Inline>
              </Stack>
            </Inline>
          </Stack>
        </Surface>
      </Stack>

      <Divider spacing={0} />

      {/* ── Section 3: Integration Coverage Matrix ── */}
      <Stack gap="component">
        <Stack gap={2}>
          <Text variant="heading-m">Integration Coverage Matrix</Text>
          <Text color="secondary">
            Growth instrumentation status across all {total} documented components.
          </Text>
        </Stack>

        {/* Stat bar */}
        <Inline gap={3} align="center">
          <Text variant="heading-s" style={{ ...codeFont, color: "var(--ref-energy-jade-700)" }}>
            {covered}/{total} = {pct}% coverage
          </Text>
          <div
            style={{
              flex: 1,
              height: "var(--ref-frame-space-2)",
              borderRadius: "var(--ref-frame-radius-full)",
              background: "var(--sys-energy-surface-tertiary)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${pct}%`,
                height: "100%",
                borderRadius: "var(--ref-frame-radius-full)",
                background: "var(--ref-energy-jade-400)",
                transition: "width 0.5s ease",
              }}
            />
          </div>
        </Inline>

        {/* With Growth */}
        <Stack gap={2}>
          <Text variant="label-s" color="secondary">
            With Growth integration
          </Text>
          <Inline gap={1} wrap>
            {WITH_GROWTH.map((name) => (
              <span
                key={name}
                style={{
                  ...pillBase,
                  background: "var(--ref-energy-jade-100)",
                  color: "var(--ref-energy-jade-700)",
                }}
              >
                {name}
              </span>
            ))}
          </Inline>
        </Stack>

        {/* Without Growth */}
        <Stack gap={2}>
          <Text variant="label-s" color="secondary">
            Without Growth integration
          </Text>
          <Inline gap={1} wrap>
            {WITHOUT_GROWTH.map((name) => (
              <span
                key={name}
                style={{
                  ...pillBase,
                  background: "var(--sys-energy-surface-tertiary)",
                  color: "var(--sys-energy-text-tertiary)",
                }}
              >
                {name}
              </span>
            ))}
          </Inline>
        </Stack>
      </Stack>

      <Divider spacing={0} />

      {/* ── Section 4: Live Event Monitor ── */}
      <Stack gap="component">
        <Stack gap={2}>
          <Text variant="heading-m">Live Event Monitor</Text>
          <Text color="secondary">
            Interact with the demo components below. Each interaction emits a structured event
            visible in the monitor console.
          </Text>
        </Stack>

        {/* Demo components */}
        <Surface
          style={{ padding: "var(--ref-frame-space-4)", borderRadius: "var(--ref-frame-radius-3)" }}
        >
          <Inline gap={4} wrap align="center">
            {/* Demo Button */}
            <Stack gap={1} align="center">
              <Text variant="label-s" color="secondary">
                Button
              </Text>
              <button
                onClick={() =>
                  pushEvent("Button", "click", "flow.component.interaction", {
                    label: "Submit",
                    variant: "primary",
                    loadingDuration: null,
                  })
                }
                style={{
                  padding: "var(--ref-frame-space-2) var(--ref-frame-space-5)",
                  borderRadius: "var(--ref-frame-radius-2)",
                  background: "var(--sys-energy-action-primary)",
                  color: "var(--sys-energy-text-on-action)",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "var(--ref-voice-family-sans)",
                  fontSize: "var(--ref-voice-size-5)",
                  fontWeight: "var(--ref-voice-weight-medium)",
                }}
              >
                Submit
              </button>
            </Stack>

            {/* Demo Toggle */}
            <Stack gap={1} align="center">
              <Text variant="label-s" color="secondary">
                Switch
              </Text>
              <button
                onClick={() => {
                  const next = !demoToggle;
                  setDemoToggle(next);
                  pushEvent("Switch", "toggle", "flow.component.interaction", {
                    checked: next,
                    label: "Dark mode",
                    disabled: false,
                  });
                }}
                style={{
                  width: "var(--ref-frame-space-12)",
                  height: 26,
                  borderRadius: "var(--ref-frame-radius-full)",
                  border: "none",
                  cursor: "pointer",
                  background: demoToggle
                    ? "var(--ref-energy-jade-400)"
                    : "var(--sys-energy-surface-tertiary)",
                  position: "relative",
                  transition: "background 0.2s ease",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    top: 3,
                    left: demoToggle ? 24 : 3,
                    width: "var(--ref-frame-space-5)",
                    height: "var(--ref-frame-space-5)",
                    borderRadius: "50%",
                    background: "var(--sys-energy-surface-primary)",
                    transition: "left 0.2s ease",
                    boxShadow: "var(--sys-depth-elevation-1)",
                  }}
                />
              </button>
            </Stack>

            {/* Demo Text Input */}
            <Stack gap={1} align="center">
              <Text variant="label-s" color="secondary">
                TextField
              </Text>
              <input
                type="text"
                placeholder="Type something..."
                value={demoText}
                onChange={(e) => {
                  const val = e.target.value;
                  setDemoText(val);
                  pushEvent("TextField", "change", "flow.component.interaction", {
                    hasError: false,
                    charCount: val.length,
                    fieldName: "demo-input",
                  });
                }}
                style={{
                  padding: "var(--ref-frame-space-2) var(--ref-frame-space-3)",
                  borderRadius: "var(--ref-frame-radius-2)",
                  border: "1px solid var(--sys-energy-border-default)",
                  background: "var(--sys-energy-surface-primary)",
                  color: "var(--sys-energy-text-primary)",
                  fontFamily: "var(--ref-voice-family-sans)",
                  fontSize: "var(--ref-voice-size-5)",
                  width: 180,
                  outline: "none",
                }}
                onFocus={() =>
                  pushEvent("TextField", "focus", "flow.component.impression", {
                    fieldName: "demo-input",
                  })
                }
              />
            </Stack>

            {/* Demo Select */}
            <Stack gap={1} align="center">
              <Text variant="label-s" color="secondary">
                Select
              </Text>
              <select
                onChange={(e) =>
                  pushEvent("Select", "select", "flow.component.interaction", {
                    selectedValue: e.target.value,
                    optionCount: 4,
                    searchUsed: false,
                  })
                }
                style={{
                  padding: "var(--ref-frame-space-2) var(--ref-frame-space-3)",
                  borderRadius: "var(--ref-frame-radius-2)",
                  border: "1px solid var(--sys-energy-border-default)",
                  background: "var(--sys-energy-surface-primary)",
                  color: "var(--sys-energy-text-primary)",
                  fontFamily: "var(--ref-voice-family-sans)",
                  fontSize: "var(--ref-voice-size-5)",
                  cursor: "pointer",
                  outline: "none",
                }}
              >
                <option value="">Choose...</option>
                <option value="us-east-1">US East</option>
                <option value="eu-west-1">EU West</option>
                <option value="ap-south-1">AP South</option>
              </select>
            </Stack>
          </Inline>
        </Surface>

        {/* Monitor console */}
        <div style={{ position: "relative" }}>
          <div
            ref={monitorRef}
            style={{
              background: "var(--ref-energy-neutral-950)",
              borderRadius: "var(--ref-frame-radius-3)",
              padding: "var(--ref-frame-space-4)",
              minHeight: 200,
              maxHeight: 320,
              overflow: "auto",
              ...codeFont,
              fontSize: "var(--ref-voice-size-3)",
              lineHeight: 1.7,
            }}
          >
            {monitorEvents.length === 0 ? (
              <Text
                style={{
                  color: "var(--sys-energy-text-tertiary)",
                  fontFamily: "var(--ref-voice-family-mono)",
                  fontSize: "var(--ref-voice-size-3)",
                }}
              >
                {}
                {"// Interact with the demo components above to see events here..."}
              </Text>
            ) : (
              monitorEvents.map((evt) => (
                <div key={evt.id} style={{ marginBottom: "var(--ref-frame-space-2)" }}>
                  <span style={{ color: "var(--sys-energy-text-tertiary)" }}>
                    [{evt.timestamp}]{" "}
                  </span>
                  <span style={{ color: "var(--ref-energy-jade-400)" }}>{evt.event}</span>
                  <span style={{ color: "var(--sys-energy-text-tertiary)" }}>{" → "}</span>
                  <span style={{ color: "var(--ref-energy-jade-400)" }}>{evt.component}</span>
                  <span style={{ color: "var(--sys-energy-text-tertiary)" }}>.{evt.action}(</span>
                  <span style={{ color: "var(--ref-energy-neutral-400, #a1a1aa)" }}>
                    {JSON.stringify(evt.payload)}
                  </span>
                  <span style={{ color: "var(--sys-energy-text-tertiary)" }}>)</span>
                </div>
              ))
            )}
          </div>

          {/* Clear button */}
          {monitorEvents.length > 0 && (
            <button
              onClick={clearMonitor}
              style={{
                position: "absolute",
                top: "var(--ref-frame-space-2)",
                right: "var(--ref-frame-space-2)",
                padding: "var(--ref-frame-space-1) var(--ref-frame-space-3)",
                borderRadius: "var(--ref-frame-radius-2)",
                border: "1px solid var(--sys-energy-border-default)",
                background: "var(--ref-energy-neutral-950)",
                color: "var(--sys-energy-text-tertiary)",
                cursor: "pointer",
                fontFamily: "var(--ref-voice-family-mono)",
                fontSize: "var(--ref-voice-size-3)",
              }}
            >
              Clear
            </button>
          )}
        </div>
      </Stack>
    </Stack>
  );
}

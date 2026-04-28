/**
 * FLOW Docs — PropPlayground
 * Interactive prop editor that renders a live component preview alongside auto-generated controls.
 */
import { useCallback, useMemo, useReducer, useState } from "react";

import { Grid, Stack, Surface, Text } from "@flow/primitives";
import type { PropEntry } from "./doc-primitives";
import { CodeBlock } from "./doc-primitives";
import { FlowButton, FlowSwitch } from "@flow/components";
import { FlowTextInput } from "@flow/components";
import { FlowSelect } from "@flow/components";
import { type ControlDescriptor, inferControl } from "./prop-playground-controls";

import type { ReactNode } from "react";

// ── State ──

type PropState = Record<string, unknown>;
type PropAction =
  | { type: "SET"; name: string; value: unknown }
  | { type: "RESET"; defaults: PropState };

function propReducer(state: PropState, action: PropAction): PropState {
  switch (action.type) {
    case "SET":
      return { ...state, [action.name]: action.value };
    case "RESET":
      return { ...action.defaults };
  }
}

// ── Code generation ──

function generateCode(
  componentName: string,
  props: PropState,
  defaults: PropState,
  fixtureKeys: Set<string>,
): string {
  const entries = Object.entries(props)
    .filter(([key, val]) => !fixtureKeys.has(key) && val !== defaults[key] && val !== undefined && val !== "")
    .map(([key, val]) => {
      if (typeof val === "boolean") return val ? key : `${key}={false}`;
      if (typeof val === "string") return `${key}="${val}"`;
      return `${key}={${JSON.stringify(val)}}`;
    });

  // Fixture keys rendered as variable references
  const fixtureEntries = [...fixtureKeys].map((key) => `${key}={${key}}`);
  const allEntries = [...entries, ...fixtureEntries];

  const hasChildren = "children" in props && props.children && props.children !== defaults.children;
  const propsStr = allEntries.join("\n  ");

  if (hasChildren) {
    const childEntries = allEntries.filter((e) => !e.startsWith("children"));
    return `<${componentName}${childEntries.length ? "\n  " + childEntries.join("\n  ") : ""}>\n  ${props.children}\n</${componentName}>`;
  }
  return `<${componentName}${propsStr ? "\n  " + propsStr : ""}\n/>`;
}

// ── Props ──

export interface PlaygroundConfig {
  renderPreview: (props: Record<string, unknown>) => ReactNode;
  defaults?: Record<string, unknown>;
  fixtures?: Record<string, unknown>;
  excludeControls?: string[];
  overlay?: boolean;
}

interface PropPlaygroundProps {
  /** Component name for the generated code */
  componentName: string;
  /** Prop definitions from the registry */
  propDefs: PropEntry[];
  /** Playground configuration from the registry */
  playground: PlaygroundConfig;
}

// ── Control renderer ──

function PlaygroundControl({
  prop,
  control,
  value,
  onChange,
}: {
  prop: PropEntry;
  control: ControlDescriptor;
  value: unknown;
  onChange: (value: unknown) => void;
}) {
  switch (control.kind) {
    case "boolean":
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "var(--ref-frame-space-3)",
          }}
        >
          <Text variant="label-s" style={{ fontFamily: "var(--ref-voice-family-mono)" }}>
            {prop.name}
          </Text>
          <FlowSwitch
            checked={!!value}
            onChange={() => onChange(!value)}
            size="sm"
            aria-label={prop.name}
          />
        </div>
      );

    case "enum":
      return (
        <Stack gap={1}>
          <Text variant="label-s" style={{ fontFamily: "var(--ref-voice-family-mono)" }}>
            {prop.name}
          </Text>
          <FlowSelect
            label={prop.name}
            value={String(value ?? "")}
            onChange={(v) => onChange(v)}
            size="sm"
            options={control.options.map((o) => ({ label: o, value: o }))}
            aria-label={prop.name}
          />
        </Stack>
      );

    case "string":
    case "reactnode":
      return (
        <Stack gap={1}>
          <Text variant="label-s" style={{ fontFamily: "var(--ref-voice-family-mono)" }}>
            {prop.name}
          </Text>
          <FlowTextInput
            value={String(value ?? "")}
            onChange={(v) => onChange(v)}
            size="sm"
            placeholder={prop.description}
          />
        </Stack>
      );

    case "number":
      return (
        <Stack gap={1}>
          <Text variant="label-s" style={{ fontFamily: "var(--ref-voice-family-mono)" }}>
            {prop.name}
          </Text>
          <FlowTextInput
            value={String(value ?? "")}
            onChange={(v) => onChange(Number(v) || 0)}
            size="sm"
            placeholder="0"
          />
        </Stack>
      );

    default:
      return null;
  }
}

// ── Main component ──

export function PropPlayground({ componentName, propDefs, playground }: PropPlaygroundProps) {
  const defaults = playground.defaults ?? {};
  const fixtures = playground.fixtures ?? {};
  const excludeSet = useMemo(
    () => new Set(playground.excludeControls ?? []),
    [playground.excludeControls],
  );
  const fixtureKeys = useMemo(() => new Set(Object.keys(fixtures)), [fixtures]);

  const [state, dispatch] = useReducer(propReducer, defaults);
  const [overlayOpen, setOverlayOpen] = useState(false);

  const controls = useMemo<{ prop: PropEntry; control: ControlDescriptor }[]>(
    () =>
      propDefs
        .map((prop) => ({ prop, control: inferControl(prop.type) }))
        .filter(
          ({ prop, control }) =>
            control.kind !== "unknown" &&
            control.kind !== "fixture" &&
            control.kind !== "callback" &&
            !excludeSet.has(prop.name),
        ),
    [propDefs, excludeSet],
  );

  const handleChange = useCallback((name: string, value: unknown) => {
    dispatch({ type: "SET", name, value });
  }, []);

  // Merge fixtures + editable state for preview
  const previewProps = useMemo(() => {
    const merged = { ...fixtures, ...state };
    if (playground.overlay) {
      merged.open = overlayOpen;
      merged.onClose = () => setOverlayOpen(false);
    }
    return merged;
  }, [fixtures, state, playground.overlay, overlayOpen]);

  const code = generateCode(componentName, state, defaults, fixtureKeys);

  return (
    <Stack gap={3}>
      <Text variant="overline">Interactive Playground</Text>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "var(--ref-frame-space-4)",
        }}
      >
        {/* Preview panel */}
        <Surface
          variant="tertiary"
          padding="container"
          radius="container"
          style={{
            minHeight: "120px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Stack gap={3} align="center">
            {playground.overlay && (
              <FlowButton
                variant="secondary"
                size="sm"
                onClick={() => setOverlayOpen(!overlayOpen)}
              >
                {overlayOpen ? "Hide Preview" : "Show Preview"}
              </FlowButton>
            )}
            {(!playground.overlay || overlayOpen) && playground.renderPreview(previewProps)}
          </Stack>
        </Surface>

        {/* Controls panel */}
        {controls.length > 0 && (
          <Surface variant="secondary" padding="container" radius="container">
            <Stack gap={3}>
              <div
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
              >
                <Text variant="label-m">Props</Text>
                <button
                  onClick={() => dispatch({ type: "RESET", defaults })}
                  style={{
                    background: "none",
                    border: "1px solid var(--sys-energy-border-default)",
                    borderRadius: "var(--ref-frame-radius-2)",
                    padding: "var(--ref-frame-space-1) var(--ref-frame-space-3)",
                    cursor: "pointer",
                    fontSize: "var(--ref-voice-size-2)",
                    fontFamily: "var(--ref-voice-family-sans)",
                    color: "var(--sys-energy-text-secondary)",
                  }}
                >
                  Reset
                </button>
              </div>
              <Grid columns={2} gap="component">
                {controls.map(({ prop, control }) => (
                  <PlaygroundControl
                    key={prop.name}
                    prop={prop}
                    control={control}
                    value={state[prop.name]}
                    onChange={(v) => handleChange(prop.name, v)}
                  />
                ))}
              </Grid>
            </Stack>
          </Surface>
        )}
      </div>

      {/* Generated code */}
      <CodeBlock title="Generated JSX">{code}</CodeBlock>
    </Stack>
  );
}

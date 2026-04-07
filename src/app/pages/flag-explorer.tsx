/**
 * FlowFlag Explorer — Dedicated Page
 * ─────────────────────────────────────────────────
 * 48 circular country flags from the Figma Edenred library,
 * rendered via sprite-clip from Frame8. Interactive search and size selector.
 */

import { useState } from "react";

import { flagRegistry, FlowFlag, FlowTextInput, Inline, Stack, Text } from "../../lib";

type FlagSize = "xs" | "sm" | "md" | "lg" | "xl";

// ── DemoGroup wrapper ──
function DemoGroup({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", gap: "var(--sys-frame-gap-component)" }}
    >
      {children}
    </div>
  );
}

export function FlagExplorerPage() {
  const [selectedSize, setSelectedSize] = useState<FlagSize>("xl");
  const [search, setSearch] = useState("");
  const sizes: FlagSize[] = ["xs", "sm", "md", "lg", "xl"];

  const filtered = search
    ? flagRegistry.filter(
        (f) =>
          f.code.toLowerCase().includes(search.toLowerCase()) ||
          f.name.toLowerCase().includes(search.toLowerCase()) ||
          f.dial.includes(search),
      )
    : flagRegistry;

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
        <Text role="overline">L1 Asset Library</Text>
        <Text role="display-xl">FlowFlag — Country Flag Explorer</Text>
        <Text style={{ maxWidth: "var(--sys-frame-content-prose)" }}>
          48 circular country flags from the Figma Edenred library, rendered via sprite-clip from
          Frame8. Each flag is identified by ISO 3166-1 alpha-2 code. Flags marked &quot;??&quot; are pending
          visual identification.
        </Text>
      </header>

      {/* Controls */}
      <Inline gap="component" align="center" wrap>
        <FlowTextInput
          label="Search flags"
          hint="By country name, code, or dial code"
          value={search}
          onChange={setSearch}
          clearable
          onClear={() => setSearch("")}
          style={{ maxWidth: 300 }}
        />
        <Stack gap={1}>
          <Text role="caption" color="secondary">
            Size
          </Text>
          <Inline gap={1}>
            {sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSize(s)}
                style={{
                  padding: "var(--ref-frame-space-2) var(--ref-frame-space-3)",
                  borderRadius: "var(--ref-frame-radius-2)",
                  border:
                    selectedSize === s
                      ? "2px solid var(--sys-energy-action-primary)"
                      : "1px solid var(--sys-energy-border-default)",
                  background:
                    selectedSize === s
                      ? "var(--sys-energy-status-info-subtle)"
                      : "var(--sys-energy-surface-primary)",
                  fontFamily: "var(--ref-voice-family-mono)",
                  fontSize: "var(--ref-voice-size-3)",
                  cursor: "pointer",
                  color: "var(--sys-energy-text-primary)",
                }}
              >
                {s}
              </button>
            ))}
          </Inline>
        </Stack>
        <Text role="caption" color="tertiary">
          {filtered.length} / {flagRegistry.length} flags
        </Text>
      </Inline>

      {/* Flag grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
          gap: "var(--ref-frame-space-4)",
        }}
      >
        {filtered.map((flag, i) => (
          <div
            key={`${flag.code}-${i}`}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "var(--ref-frame-space-2)",
              padding: "var(--ref-frame-space-3)",
              borderRadius: "var(--ref-frame-radius-2)",
              border: "1px solid var(--sys-energy-border-default)",
              background: "var(--sys-energy-surface-primary)",
              transition: "all var(--sys-momentum-transition-fast)",
            }}
          >
            <FlowFlag code={flag.code} size={selectedSize} />
            <Stack gap={0} style={{ alignItems: "center" }}>
              <Text role="label-m" style={{ fontFamily: "var(--ref-voice-family-mono)" }}>
                {flag.code}
              </Text>
              <Text role="caption" color="secondary" style={{ textAlign: "center" }}>
                {flag.name}
              </Text>
              {flag.dial && (
                <Text role="caption" color="tertiary">
                  {flag.dial}
                </Text>
              )}
            </Stack>
          </div>
        ))}
      </div>

      {/* Size comparison strip */}
      <DemoGroup>
        <Text role="overline">Size Comparison — All Presets</Text>
        <Inline gap="component" align="center">
          {sizes.map((s) => (
            <Stack key={s} gap={1} style={{ alignItems: "center" }}>
              <FlowFlag code="FR" size={s} />
              <Text role="caption" color="tertiary">
                {s}
              </Text>
            </Stack>
          ))}
        </Inline>
      </DemoGroup>

      {/* Inline usage demo */}
      <DemoGroup>
        <Text role="overline">Inline Usage — Phone Input Pattern</Text>
        <Inline gap={3} align="center">
          <Inline gap={2} align="center">
            <FlowFlag code="FR" size="sm" />
            <Text>+33 6 12 34 56 78</Text>
          </Inline>
          <Inline gap={2} align="center">
            <FlowFlag code="BR" size="sm" />
            <Text>+55 11 9876 5432</Text>
          </Inline>
          <Inline gap={2} align="center">
            <FlowFlag code="BE" size="sm" />
            <Text>+32 2 123 45 67</Text>
          </Inline>
          <Inline gap={2} align="center">
            <FlowFlag code="ES" size="sm" />
            <Text>+34 912 345 678</Text>
          </Inline>
        </Inline>
      </DemoGroup>
    </div>
  );
}

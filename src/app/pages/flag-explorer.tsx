/**
 * FlowFlag Explorer — Dedicated Page
 * ─────────────────────────────────────────────────
 * 48 circular country flags from the Figma Edenred library,
 * rendered via sprite-clip from Frame8. Interactive search and size selector.
 */

import { useState } from "react";

import {
  flagRegistry,
  FlowFlag,
  FlowTextInput,
  Inline,
  Stack,
  Surface,
  Text,
} from "@flow/design-system";
import { LayoutGrid } from "../components/layout-grid";
import { PAGE_GAP, PageHeader, Section } from "../components/doc-primitives";

type FlagSize = "xs" | "sm" | "md" | "lg" | "xl";

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
    <LayoutGrid>
      <LayoutGrid.Item span={12} className="component-detail-surface-wrapper">
        <Surface variant="secondary" radius="surface" className="component-detail-surface">
          <Stack gap={PAGE_GAP}>
            <PageHeader chapter="L1 Asset Library" title="FlowFlag — Country Flag Explorer">
              48 circular country flags from the Figma Edenred library, rendered via sprite-clip
              from Frame8. Each flag is identified by ISO 3166-1 alpha-2 code. Flags marked
              &quot;??&quot; are pending visual identification.
            </PageHeader>

            {/* Controls */}
            <Section title="Search & Filter">
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
                  <Text variant="caption" color="secondary">
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
                <Text variant="caption" color="tertiary">
                  {filtered.length} / {flagRegistry.length} flags
                </Text>
              </Inline>
            </Section>

            {/* Flag grid */}
            <Section title="Flag Library">
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
                  gap: "var(--ref-frame-space-4)",
                }}
              >
                {filtered.map((flag, i) => (
                  <Surface key={`${flag.code}-${i}`} padding="control" border>
                    <Stack gap={1} style={{ alignItems: "center" }}>
                      <FlowFlag code={flag.code} size={selectedSize} />
                      <Text
                        variant="label-m"
                        style={{ fontFamily: "var(--ref-voice-family-mono)" }}
                      >
                        {flag.code}
                      </Text>
                      <Text variant="caption" color="secondary" style={{ textAlign: "center" }}>
                        {flag.name}
                      </Text>
                      {flag.dial && (
                        <Text variant="caption" color="tertiary">
                          {flag.dial}
                        </Text>
                      )}
                    </Stack>
                  </Surface>
                ))}
              </div>
            </Section>

            {/* Size comparison strip */}
            <Section title="Size Comparison — All Presets">
              <Inline gap="component" align="center">
                {sizes.map((s) => (
                  <Stack key={s} gap={1} style={{ alignItems: "center" }}>
                    <FlowFlag code="FR" size={s} />
                    <Text variant="caption" color="tertiary">
                      {s}
                    </Text>
                  </Stack>
                ))}
              </Inline>
            </Section>

            {/* Inline usage demo */}
            <Section title="Inline Usage — Phone Input Pattern">
              <Inline gap={3} align="center">
                <Inline gap={2} align="center">
                  <FlowFlag code="FR" size="sm" />
                  <Text variant="paragraph-s">+33 6 12 34 56 78</Text>
                </Inline>
                <Inline gap={2} align="center">
                  <FlowFlag code="BR" size="sm" />
                  <Text variant="paragraph-s">+55 11 9876 5432</Text>
                </Inline>
                <Inline gap={2} align="center">
                  <FlowFlag code="BE" size="sm" />
                  <Text variant="paragraph-s">+32 2 123 45 67</Text>
                </Inline>
                <Inline gap={2} align="center">
                  <FlowFlag code="ES" size="sm" />
                  <Text variant="paragraph-s">+34 912 345 678</Text>
                </Inline>
              </Inline>
            </Section>
          </Stack>
        </Surface>
      </LayoutGrid.Item>
    </LayoutGrid>
  );
}

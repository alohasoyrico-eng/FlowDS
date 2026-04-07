/**
 * LayoutGrid — Dedicated Page
 * ─────────────────────────────────────────────────
 * L4 responsive column system — 12 columns on desktop (≥ 992px),
 * 6 on tablet (≥ 576px), 1 on mobile. Full ref→sys→comp token chain.
 */

import { Code, FlowCard, FlowTable, Inline, Stack, Text } from "../../lib";
import { LayoutGrid } from "../components/layout-grid";

// ── DemoGroup wrapper (same as demos.tsx) ──
function DemoGroup({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", gap: "var(--sys-frame-gap-component)" }}
    >
      {children}
    </div>
  );
}

export function LayoutGridPage() {
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
        <Text role="overline">L4 Foundation</Text>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "var(--sys-frame-gap-component)",
            flexWrap: "wrap",
          }}
        >
          <Text role="display-xl">LayoutGrid</Text>
        </div>
        <Text style={{ maxWidth: "var(--sys-frame-content-prose)" }}>
          L4 responsive column system — 12 columns on desktop ({"≥"} 992px), 6 on tablet ({"≥"}{" "}
          576px), 1 on mobile. Full <Code>ref→sys→comp</Code> token chain. Supports{" "}
          <Code>density</Code> prop for compact/default/comfortable spacing. Use{" "}
          <strong>Show Grid</strong> (top right) to toggle the column overlay — it updates live on
          viewport resize.
        </Text>
      </header>

      {/* 12-column visualization */}
      <DemoGroup>
        <Text role="overline">
          12-column grid — default density (resize viewport to see responsive behavior)
        </Text>
        <LayoutGrid>
          {Array.from({ length: 12 }, (_, i) => (
            <LayoutGrid.Item key={i} span={1}>
              <div
                style={{
                  background: "var(--sys-energy-status-info-subtle)",
                  border: "1px solid var(--sys-energy-status-info-muted)",
                  borderRadius: "var(--ref-frame-radius-1)",
                  padding: "var(--ref-frame-space-3)",
                  textAlign: "center",
                  minHeight: "var(--ref-frame-space-12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text role="caption" color="accent">
                  {i + 1}
                </Text>
              </div>
            </LayoutGrid.Item>
          ))}
        </LayoutGrid>
      </DemoGroup>

      {/* Density comparison */}
      <DemoGroup>
        <Text role="overline">Density comparison — gutter & margin scale ×1.2 per tier</Text>
        {(["compact", "default", "comfortable"] as const).map((d) => {
          const gutterMap = { compact: "24px", default: "32px", comfortable: "40px" };
          const marginMap = { compact: "40px", default: "48px", comfortable: "64px" };
          return (
            <Stack key={d} gap={1}>
              <Inline gap={2} align="center">
                <Text role="caption" color="secondary">
                  {d}
                </Text>
                <Text role="caption" color="tertiary">
                  gutter {gutterMap[d]} · margin {marginMap[d]}
                </Text>
              </Inline>
              <LayoutGrid density={d}>
                {Array.from({ length: 4 }, (_, i) => (
                  <LayoutGrid.Item key={i} span={3}>
                    <div
                      style={{
                        background:
                          d === "compact"
                            ? "var(--sys-energy-status-warning-subtle)"
                            : d === "comfortable"
                              ? "var(--sys-energy-status-success-subtle)"
                              : "var(--sys-energy-status-info-subtle)",
                        border: `1px solid ${d === "compact" ? "var(--sys-energy-status-warning)" : d === "comfortable" ? "var(--sys-energy-status-success)" : "var(--sys-energy-status-info-muted)"}`,
                        borderRadius: "var(--ref-frame-radius-1)",
                        padding: "var(--ref-frame-space-2)",
                        textAlign: "center",
                      }}
                    >
                      <Text role="caption">span 3</Text>
                    </div>
                  </LayoutGrid.Item>
                ))}
              </LayoutGrid>
            </Stack>
          );
        })}
      </DemoGroup>

      {/* Common layout: 8 + 4 */}
      <DemoGroup>
        <Text role="overline">Content + Sidebar (span 8 + span 4)</Text>
        <LayoutGrid>
          <LayoutGrid.Item span={8}>
            <div
              style={{
                background: "var(--sys-energy-surface-tertiary)",
                border: "1px solid var(--sys-energy-border-default)",
                borderRadius: "var(--ref-frame-radius-2)",
                padding: "var(--ref-frame-space-6)",
                minHeight: "120px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text color="secondary">Main content (8 columns)</Text>
            </div>
          </LayoutGrid.Item>
          <LayoutGrid.Item span={4}>
            <div
              style={{
                background: "var(--sys-energy-surface-tertiary)",
                border: "1px solid var(--sys-energy-border-default)",
                borderRadius: "var(--ref-frame-radius-2)",
                padding: "var(--ref-frame-space-6)",
                minHeight: "120px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text color="secondary">Sidebar (4 columns)</Text>
            </div>
          </LayoutGrid.Item>
        </LayoutGrid>
      </DemoGroup>

      {/* 3-column cards */}
      <DemoGroup>
        <Text role="overline">Equal thirds (span 4 + 4 + 4)</Text>
        <LayoutGrid>
          {["Energy", "Frame", "Voice"].map((name) => (
            <LayoutGrid.Item key={name} span={4}>
              <FlowCard elevation={1} padding="md">
                <Stack gap={2}>
                  <Text role="heading-m">{name}</Text>
                  <Text role="paragraph-s">Foundation token group used across all layers.</Text>
                </Stack>
              </FlowCard>
            </LayoutGrid.Item>
          ))}
        </LayoutGrid>
      </DemoGroup>

      {/* Spec table — all 3 densities */}
      <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
        <FlowTable
          columns={[
            { key: "tier", header: "Tier", cellRole: "bold" },
            { key: "breakpoint", header: "Breakpoint" },
            { key: "columns", header: "Cols", align: "center" },
            { key: "gutterCompact", header: "Gutter ⊘", align: "center" },
            { key: "gutterDefault", header: "Gutter ◎", align: "center" },
            { key: "gutterComfy", header: "Gutter ◉", align: "center" },
            { key: "marginCompact", header: "Margin ⊘", align: "center" },
            { key: "marginDefault", header: "Margin ◎", align: "center" },
            { key: "marginComfy", header: "Margin ◉", align: "center" },
            { key: "maxWidth", header: "Max W", align: "center" },
          ]}
          data={[
            {
              tier: "Large",
              breakpoint: "≥ 992px",
              columns: "12",
              gutterCompact: "24",
              gutterDefault: "32",
              gutterComfy: "40",
              marginCompact: "40",
              marginDefault: "48",
              marginComfy: "64",
              maxWidth: "1440",
            },
            {
              tier: "Medium",
              breakpoint: "≥ 576px",
              columns: "6",
              gutterCompact: "20",
              gutterDefault: "24",
              gutterComfy: "28",
              marginCompact: "20",
              marginDefault: "24",
              marginComfy: "28",
              maxWidth: "—",
            },
            {
              tier: "Small",
              breakpoint: "< 576px",
              columns: "1",
              gutterCompact: "0",
              gutterDefault: "0",
              gutterComfy: "0",
              marginCompact: "12",
              marginDefault: "16",
              marginComfy: "20",
              maxWidth: "—",
            },
          ]}
          compact
          rowKey={(r) => r.tier}
          caption="LayoutGrid responsive spec — ×1.2 ratio across densities (⊘ compact · ◎ default · ◉ comfortable). Values in px."
        />
      </div>
    </div>
  );
}

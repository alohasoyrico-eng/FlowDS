import { Divider, FlowBadge, FlowTag, Inline, Stack, Surface, Text } from "@flow/design-system";
import { PAGE_GAP, PageHeader } from "../components/doc-primitives";
import { LayoutGrid } from "../components/layout-grid";

interface ChangeEntry {
  type: "added" | "changed" | "fixed";
  text: string;
}

interface Release {
  version: string;
  date: string;
  current?: boolean;
  changes: ChangeEntry[];
}

const RELEASES: Release[] = [
  {
    version: "1.0.0-rc.3",
    date: "2026-04-23",
    current: true,
    changes: [
      { type: "added", text: "Flutter package with 47 L3 components + 35 L4 patterns" },
      { type: "added", text: "Token parity tests (React ↔ Flutter) — 99 color tokens compared" },
      { type: "added", text: "GrowthObserver instrumentation across all 35 patterns" },
      { type: "added", text: "forced-colors (WHCM) coverage expanded to ~90%+ interactive components" },
      { type: "added", text: "prefers-contrast: more coverage expanded to 40+ selectors" },
      { type: "added", text: "25 L4 pattern tests with axe a11y validation" },
      { type: "changed", text: "Renamed prop `role` → `variant` in Text, FlowButton, FlowIconButton, FlowChip (1219 usages)" },
      { type: "changed", text: "Narrowed FilterField.type to strict union (removed string escape valve)" },
      { type: "changed", text: "MenuItem and StepperStep interfaces: `key` → `id` (required)" },
      { type: "fixed", text: "ARIA roles: removed invalid `paragraph-s` roles, fixed TreeView `aria-selected`" },
      { type: "fixed", text: "Color contrast: text-secondary raised to ~7:1, text-disabled improved to 2.56:1" },
      { type: "fixed", text: "Focus ring color now uses sys token instead of ref token in Autocomplete and Slider" },
      { type: "fixed", text: "TypeScript test compilation: 141 errors → 0 (vitest-axe types, global.d.ts sync, prop renames)" },
      { type: "fixed", text: "ESLint: 770 false positives eliminated (dist/ excluded from scanning)" },
      { type: "fixed", text: "Stylelint: 1291 auto-fixable issues resolved, 9 duplicate custom properties removed" },
      { type: "fixed", text: "CSS deprecated properties: clip → clip-path, word-break → overflow-wrap" },
    ],
  },
  {
    version: "1.0.0-rc.2",
    date: "2026-03-15",
    changes: [
      { type: "added", text: "42 L3 components across 9 domains" },
      { type: "added", text: "37 L4 patterns (input, feedback, layout, data, navigation)" },
      { type: "added", text: "Three-tier token architecture (ref → sys → comp)" },
      { type: "added", text: "Density system: compact / default / comfortable" },
      { type: "added", text: "Dark mode with full token cascade" },
      { type: "added", text: "Storybook integration with 78 stories" },
      { type: "added", text: "83 test files with vitest + axe-core a11y" },
    ],
  },
  {
    version: "1.0.0-rc.1",
    date: "2026-02-01",
    changes: [
      { type: "added", text: "Initial design system architecture" },
      { type: "added", text: "10 design foundations (Energy, Voice, Frame, Depth, Momentum, Density, State, Tone, Growth, Symbol)" },
      { type: "added", text: "12 layout primitives (Stack, Inline, Grid, Surface, Text, ActionSurface, etc.)" },
      { type: "added", text: "Living documentation site with React + Vite" },
    ],
  },
];

const TAG_STATUS: Record<ChangeEntry["type"], "success" | "info" | "warning"> = {
  added: "success",
  changed: "info",
  fixed: "warning",
};

function ReleaseCard({ release }: { release: Release }) {
  return (
    <Stack gap={4}>
      <Inline gap={3} align="center">
        <Text variant="display-s">{release.version}</Text>
        <Text variant="caption" color="secondary">
          {release.date}
        </Text>
        {release.current && <FlowBadge content="Current" variant="label" status="success" standalone />}
      </Inline>
      <Stack gap={2}>
        {release.changes.map((change, i) => (
          <Inline key={i} gap={3} align="start">
            <FlowTag status={TAG_STATUS[change.type]} size="sm" style={{ flexShrink: 0 }}>
              {change.type}
            </FlowTag>
            <Text variant="paragraph-s">{change.text}</Text>
          </Inline>
        ))}
      </Stack>
    </Stack>
  );
}

export function ChangelogPage() {
  return (
    <LayoutGrid>
      <LayoutGrid.Item span={12} className="component-detail-surface-wrapper">
        <Surface variant="secondary" radius="surface" className="component-detail-surface">
          <Stack gap={PAGE_GAP}>
            <PageHeader chapter="Get Started" title="Changelog">
              Release history for the Flow Design System. Each release includes compiled React and
              Flutter SDK packages available on GitHub Releases.
            </PageHeader>

            <Surface padding="surface">
              <Inline gap={3} align="center">
                <Text variant="label-l">Download SDK packages</Text>
                <Text variant="paragraph-s" color="accent">
                  github.com/ER-Mobility-MX/flow/releases
                </Text>
              </Inline>
            </Surface>

            {RELEASES.map((release, i) => (
              <div key={release.version}>
                <ReleaseCard release={release} />
                {i < RELEASES.length - 1 && <Divider spacing={4} />}
              </div>
            ))}
          </Stack>
        </Surface>
      </LayoutGrid.Item>
    </LayoutGrid>
  );
}

import { CodeBlock, FlowChip, Inline, Stack, Surface, Text } from "@flow/design-system";
import { PAGE_GAP, PageHeader, Section } from "../components/doc-primitives";
import { LayoutGrid } from "../components/layout-grid";

export function GovernancePage() {
  return (
    <LayoutGrid>
      <LayoutGrid.Item span={12} className="component-detail-surface-wrapper">
        <Surface variant="secondary" radius="surface" className="component-detail-surface">
          <Stack gap={PAGE_GAP}>
            <PageHeader chapter="Chapter 09" title="Governance & Contribution">
              A design system without governance degrades to a component library — a collection of
              parts without the constraints that make them a system. Flow&apos;s governance model
              ensures consistency, quality, and evolution at organizational scale.
            </PageHeader>

            {/* Design Ops Model */}
            <Section
              title="Design Ops Model"
              description="Flow is maintained by a dedicated Design Systems team operating as an internal platform team. Their responsibilities:"
            >
              <Stack gap={2}>
                {[
                  {
                    role: "Token Stewards",
                    desc: "Own the canonical token JSON. Review all token additions, modifications, and deprecations. Ensure naming consistency and semantic accuracy. Publish token updates to all platform packages.",
                  },
                  {
                    role: "Component Engineers",
                    desc: "Implement and maintain React and Flutter component libraries. Ensure both platforms satisfy the shared component spec. Write and maintain visual regression tests.",
                  },
                  {
                    role: "Quality Auditors",
                    desc: "Run accessibility audits, performance benchmarks, and visual regression checks. Review product team implementations for system compliance. Maintain linting rules and CI checks.",
                  },
                ].map((r) => (
                  <Surface key={r.role} padding="control">
                    <Stack gap={2}>
                      <Text variant="label-l">{r.role}</Text>
                      <Text variant="paragraph-s">{r.desc}</Text>
                    </Stack>
                  </Surface>
                ))}
              </Stack>
            </Section>

            {/* CI Enforcement Rules */}
            <Section
              title="CI Enforcement Rules"
              description="Automated checks run on every pull request to prevent system degradation:"
            >
              <Stack gap={2}>
                {[
                  {
                    check: "Hardcoded Style Detection",
                    desc: "Scans component code for raw color values (hex, rgb, hsl), font-size declarations, margin/padding pixel values, box-shadow declarations, and z-index values that don't reference Flow tokens.",
                    severity: "Block merge",
                    implementation:
                      "ESLint custom rules (React) + Dart analysis rules (Flutter). Regular expressions match against known raw value patterns. Allowlist for rare exceptions (requires DS team approval).",
                  },
                  {
                    check: "Token Drift Detection",
                    desc: "Compares the tokens consumed by each platform's implementation against the canonical tokens.json. Detects tokens that exist in JSON but aren't used (dead tokens) or used in code but not in JSON (rogue tokens).",
                    severity: "Block merge",
                    implementation:
                      "Build-time script that parses token usage from CSS/Dart files and cross-references with tokens.json. Reports additions, removals, and unused tokens.",
                  },
                  {
                    check: "Component Coverage Enforcement",
                    desc: "Every new product feature must use ≥90% Flow components by visual surface area. Pages with >10% custom-styled elements trigger a review.",
                    severity: "Warning → Block after threshold",
                    implementation:
                      "Heuristic analysis of component imports. If a file imports no Flow components but renders UI, it's flagged. Manual review determines if custom UI is justified.",
                  },
                  {
                    check: "Accessibility Compliance",
                    desc: "Automated checks for ARIA attributes, color contrast ratios (WCAG AA minimum), focus management, and keyboard navigation.",
                    severity: "Block merge for new components",
                    implementation:
                      "axe-core for web, Flutter accessibility checker for mobile. Runs against component test suites. Known issues are tracked with timeline for resolution.",
                  },
                  {
                    check: "Visual Regression",
                    desc: "Screenshot comparison of all components across themes (light/dark), density modes (compact/default/comfortable), and states (default through disabled).",
                    severity: "Block merge if unintended changes",
                    implementation:
                      "Playwright screenshots (web) + integration test screenshots (Flutter). Compared against baseline images. Intentional changes update baseline with PR annotation.",
                  },
                  {
                    check: "Bundle Size Guard",
                    desc: "Monitors the size of the Flow package on each platform. Alerts if a PR increases bundle size beyond threshold.",
                    severity: "Warning",
                    implementation:
                      "size-limit (web), Flutter build analyzer (mobile). Tracked over time for trend analysis.",
                  },
                ].map((c) => (
                  <Surface key={c.check} padding="control">
                    <Stack gap={2}>
                      <Inline gap={3}>
                        <Text variant="label-l">{c.check}</Text>
                        <FlowChip
                          size="sm"
                          variant={
                            c.severity === "Block merge" || c.severity.startsWith("Block merge")
                              ? "tonal"
                              : "outlined"
                          }
                        >
                          {c.severity}
                        </FlowChip>
                      </Inline>
                      <Text variant="paragraph-s">{c.desc}</Text>
                      <Surface variant="secondary" padding={3} border={false}>
                        <Inline gap={2}>
                          <Text variant="caption" color="secondary">
                            Implementation:
                          </Text>
                          <Text variant="paragraph-s">{c.implementation}</Text>
                        </Inline>
                      </Surface>
                    </Stack>
                  </Surface>
                ))}
              </Stack>
            </Section>

            {/* Documentation Structure */}
            <Section
              title="Documentation Structure"
              description="Every component in Flow has documentation organized into standardized views:"
            >
              <Stack gap={2}>
                {[
                  {
                    view: "Overview",
                    content:
                      "Purpose, anatomy diagram, when to use / when not to use, visual examples of all variants.",
                  },
                  {
                    view: "API Reference",
                    content:
                      "Complete prop/parameter list with types, defaults, and descriptions. Code examples for each variant.",
                  },
                  {
                    view: "States & Interaction",
                    content:
                      "Visual examples of all states (default through disabled). Precedence rules. Interaction flow diagrams.",
                  },
                  {
                    view: "Accessibility",
                    content:
                      "ARIA roles, keyboard navigation map, screen reader behavior, contrast ratios, focus management details.",
                  },
                  {
                    view: "Tokens",
                    content:
                      "Complete list of comp.* tokens consumed with their sys.* sources. Visual examples of token customization.",
                  },
                  {
                    view: "Tone",
                    content:
                      "Copy guidelines specific to this component. Templates for labels, messages, errors. Do/don't examples.",
                  },
                  {
                    view: "Growth",
                    content:
                      "Events emitted by this component. Event schema. Dashboard showing component usage metrics across the product.",
                  },
                  {
                    view: "Platform Notes",
                    content:
                      "React and Flutter implementation differences. Platform-specific behavior. Known limitations.",
                  },
                ].map((d) => (
                  <Surface key={d.view} padding="control">
                    <Stack gap={2}>
                      <Text variant="label-l">{d.view}</Text>
                      <Text variant="paragraph-s">{d.content}</Text>
                    </Stack>
                  </Surface>
                ))}
              </Stack>
            </Section>

            {/* Safe Evolution Strategy */}
            <Section
              title="Safe Evolution Strategy"
              description="Flow must evolve without breaking existing implementations. The evolution strategy:"
            >
              <Stack gap={3}>
                {[
                  {
                    phase: "1. Proposal",
                    desc: "Any team can propose additions or changes via a structured RFC (Request for Comments). The RFC must include: rationale, affected components, token changes, migration path, and platform impact assessment.",
                  },
                  {
                    phase: "2. Review",
                    desc: "The Design Systems team reviews the RFC. Cross-platform impact is assessed. Accessibility implications are evaluated. Token naming is validated against conventions. Two-week comment period for stakeholder feedback.",
                  },
                  {
                    phase: "3. Implementation",
                    desc: "Approved changes are implemented in a feature branch. Both platforms (React + Flutter) must be updated simultaneously. Visual regression tests are updated. Documentation is written.",
                  },
                  {
                    phase: "4. Deprecation (if replacing)",
                    desc: "Old API is marked deprecated with a console warning pointing to the new API. Deprecated features remain functional for a minimum of 2 major versions. Migration codemods are provided when possible.",
                  },
                  {
                    phase: "5. Release",
                    desc: "Changes are released with semantic versioning. Breaking changes (major version) require migration guide. Additive changes (minor version) are backward-compatible. Token changes include before/after visual comparison.",
                  },
                ].map((p) => (
                  <Surface key={p.phase} padding="control">
                    <Inline gap={4}>
                      <Inline
                        gap={0}
                        justify="center"
                        style={{
                          width: "var(--ref-frame-doc-badge-sm)",
                          height: "var(--ref-frame-doc-badge-sm)",
                          borderRadius: "var(--ref-frame-radius-2)",
                          background: "var(--sys-energy-status-info-subtle)",
                          color: "var(--sys-energy-text-accent)",
                          fontSize: "var(--ref-voice-size-5)",
                          fontWeight: "var(--ref-voice-weight-bold)",
                          flexShrink: 0,
                        }}
                      >
                        {p.phase.split(".")[0]}
                      </Inline>
                      <Stack gap={1}>
                        <Text variant="label-l">{p.phase.split(". ")[1]}</Text>
                        <Text variant="paragraph-s">{p.desc}</Text>
                      </Stack>
                    </Inline>
                  </Surface>
                ))}
              </Stack>
            </Section>

            {/* Versioning */}
            <Section title="Versioning Model">
              <CodeBlock>{`MAJOR (Breaking):
  - Removing a component or variant
  - Renaming tokens (sys or comp level)
  - Changing component API in non-backward-compatible way
  - Removing a foundation
  Migration guide + codemod required.

MINOR (Additive):
  - New components
  - New variants on existing components
  - New tokens (without renaming existing ones)
  - New density modes or themes
  Backward-compatible. No migration needed.

PATCH (Fix):
  - Bug fixes (visual, accessibility, interaction)
  - Token value adjustments (e.g., shadow opacity tweak)
  - Documentation updates
  No API changes. Drop-in replacement.`}</CodeBlock>
            </Section>
          </Stack>
        </Surface>
      </LayoutGrid.Item>
    </LayoutGrid>
  );
}

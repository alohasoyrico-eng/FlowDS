/**
 * FLOW — Pattern Detail Page
 * Route: /patterns/:category/:pattern
 *
 * Dedicated page per pattern (L4) with FlowTabs:
 *   Overview | Use Cases | Developer
 *
 * Mirrors component-detail.tsx structure (FlowButton gold standard):
 *   LayoutGrid > Surface "secondary" > PageHeader + purpose + Divider + FlowTabs
 */
import { useState } from "react";
import { Navigate, useParams } from "react-router";

import {
  Divider,
  FlowBreadcrumbs,
  FlowChip,
  FlowList,
  FlowListItem,
  FlowTabs,
  FlowTag,
  Inline,
  Stack,
  Surface,
  Text,
} from "@flow/design-system";
import {
  CodeBlock,
  GuidelinesColumns,
  PageHeader,
  PropsTable,
  Section,
} from "../components/doc-primitives";
import { getPatternEntry, type PatternEntry } from "./pattern-registry";
import { LayoutGrid } from "../components/layout-grid";
import { DemoErrorBoundary } from "../components/page-error-boundary";
import { DensityDemoWrapper } from "../components/density-demo-wrapper";
import { AccessibilitySection } from "../components/AccessibilitySection";
import { PropPlayground } from "../components/prop-playground";

// ── Platform badge ──
type Platform = "shared" | "desktop" | "mobile";
const platformVariant: Record<Platform, "success" | "info" | "warning"> = {
  shared: "success",
  desktop: "info",
  mobile: "warning",
};
const platformLabel: Record<Platform, string> = {
  shared: "Shared",
  desktop: "Desktop",
  mobile: "Mobile",
};

// ── Category metadata ──
const CATEGORY_LABELS: Record<string, string> = {
  feedback: "Feedback Patterns",
  "input-patterns": "Input Patterns",
  content: "Content Patterns",
  "display-patterns": "Display Patterns",
  overlay: "Overlay Patterns",
  "layout-patterns": "Layout Patterns",
  "navigation-patterns": "Navigation Patterns",
  "data-patterns": "Data Patterns",
};

// ── Tab content builders ──

function OverviewContent({ entry }: { entry: PatternEntry }) {
  const { spec } = entry;

  const hasComposition = entry.composition && entry.composition.length > 0;
  const hasOrchestration = spec.orchestrates && spec.orchestrates.length > 0;
  const hasDelegation = spec.doesNotOwn && spec.doesNotOwn.length > 0;
  const hasAnatomy = spec.anatomy && spec.anatomy.length > 0;
  const hasVariants = spec.variants && spec.variants.length > 0;
  const hasStates = spec.states && spec.states.length > 0;
  const hasAccessibility =
    spec.accessibility &&
    ((spec.accessibility.handled && spec.accessibility.handled.length > 0) ||
      (spec.accessibility.keyboard && spec.accessibility.keyboard.length > 0) ||
      (spec.accessibility.required && spec.accessibility.required.length > 0));

  return (
    <DemoErrorBoundary section="Overview">
      <Stack gap="section">
        {/* Render overview demo if available */}
        {entry.demos.overview && (
          <DensityDemoWrapper>
            {entry.demos.overview({ patternName: spec.name })}
          </DensityDemoWrapper>
        )}

        {/* Anatomy, Variants, States, Accessibility grid */}
        {(hasAnatomy || hasVariants || hasStates || hasAccessibility) && (
          <Stack gap="subsection">
            {/* Anatomy */}
            {hasAnatomy && (
              <Section title="Anatomy" headingRole="display-s">
                <Surface variant="primary" padding="container" radius="surface">
                  <Stack gap="component">
                    <Text variant="paragraph-s" color="secondary">
                      Visual breakdown of the pattern&apos;s structural parts.
                    </Text>
                    <Stack gap="component">
                      {spec.anatomy!.map((part, i) => (
                        <Stack key={i} gap={1}>
                          <Text variant="paragraph-s">{part.part}</Text>
                          <Text
                            variant="paragraph-s"
                            color="secondary"
                            style={{ paddingLeft: "var(--ref-frame-space-2)" }}
                          >
                            {part.description}
                          </Text>
                          {part.tokens && part.tokens.length > 0 && (
                            <Inline
                              gap={2}
                              wrap
                              style={{
                                paddingLeft: "var(--ref-frame-space-2)",
                                paddingTop: "var(--ref-frame-space-1)",
                              }}
                            >
                              {part.tokens.map((t) => (
                                <FlowTag key={t} variant="code">
                                  {t}
                                </FlowTag>
                              ))}
                            </Inline>
                          )}
                          {part.note && (
                            <Text
                              variant="paragraph-s"
                              color="tertiary"
                              style={{
                                paddingLeft: "var(--ref-frame-space-2)",
                                fontStyle: "italic",
                              }}
                            >
                              {part.note}
                            </Text>
                          )}
                        </Stack>
                      ))}
                    </Stack>
                  </Stack>
                </Surface>
              </Section>
            )}

            {/* Variants & States */}
            {(hasVariants || hasStates) && (
              <Section
                title={
                  hasVariants && hasStates
                    ? "Variants & States"
                    : hasVariants
                      ? "Variants"
                      : "States"
                }
                headingRole="display-s"
              >
                <Surface variant="primary" padding="container" radius="surface">
                  <Stack gap="component">
                    {hasVariants && (
                      <Stack gap={2}>
                        <Text variant="overline" color="tertiary">
                          Variants
                        </Text>
                        <FlowList dividers aria-label="Pattern variants">
                          {spec.variants!.map((variant, i) => (
                            <FlowListItem
                              key={i}
                              primary={
                                <Text as="span" variant="paragraph-s">
                                  {variant}
                                </Text>
                              }
                            />
                          ))}
                        </FlowList>
                      </Stack>
                    )}
                    {hasStates && (
                      <Stack gap={2}>
                        <Text variant="overline" color="tertiary">
                          States
                        </Text>
                        <Inline gap={2} wrap>
                          {spec.states!.map((state) => (
                            <FlowTag key={state}>{state}</FlowTag>
                          ))}
                        </Inline>
                      </Stack>
                    )}
                  </Stack>
                </Surface>
              </Section>
            )}

            {/* Accessibility */}
            {hasAccessibility && (
              <Section title="Accessibility" headingRole="display-s">
                <AccessibilitySection spec={spec.accessibility!} />
              </Section>
            )}
          </Stack>
        )}

        {/* Composition + Orchestration */}
        {(hasComposition || hasOrchestration || hasDelegation) && (
          <Stack gap="subsection">
            {hasComposition && (
              <Section title="Composition" headingRole="display-s">
                <Surface variant="primary" padding="container" radius="surface">
                  <Stack gap="component">
                    <Text variant="paragraph-s" color="secondary">
                      This pattern composes the following L3 components:
                    </Text>
                    <Stack gap="component">
                      {entry.composition!.map((comp, i) => (
                        <Stack key={i} gap={1}>
                          <FlowChip
                            variant="filled"
                            status="info"
                            size="sm"
                            style={{ alignSelf: "flex-start" }}
                          >
                            {comp.component}
                          </FlowChip>
                          <Text
                            variant="paragraph-s"
                            color="secondary"
                            style={{ paddingLeft: "var(--ref-frame-space-2)" }}
                          >
                            {comp.role}
                          </Text>
                          {comp.tokens && comp.tokens.length > 0 && (
                            <Inline
                              gap={2}
                              wrap
                              style={{
                                paddingLeft: "var(--ref-frame-space-2)",
                                paddingTop: "var(--ref-frame-space-1)",
                              }}
                            >
                              {comp.tokens.map((t) => (
                                <FlowTag key={t} variant="code">
                                  {t}
                                </FlowTag>
                              ))}
                            </Inline>
                          )}
                        </Stack>
                      ))}
                    </Stack>
                  </Stack>
                </Surface>
              </Section>
            )}

            {(hasOrchestration || hasDelegation) && (
              <Section title="Orchestration" headingRole="display-s">
                <Surface variant="primary" padding="container" radius="surface">
                  <Stack gap="component">
                    {/* Pattern orchestrates */}
                    {hasOrchestration && (
                      <Stack gap={2}>
                        <Text variant="overline" color="tertiary">
                          This pattern orchestrates
                        </Text>
                        <FlowList dividers aria-label="What this pattern orchestrates">
                          {spec.orchestrates.map((item, i) => (
                            <FlowListItem
                              key={i}
                              primary={
                                <Text as="span" variant="paragraph-s" color="secondary">
                                  {item}
                                </Text>
                              }
                            />
                          ))}
                        </FlowList>
                      </Stack>
                    )}

                    {/* Pattern delegates */}
                    {hasDelegation && (
                      <Stack gap={2}>
                        <Text variant="overline" color="tertiary">
                          Delegates to lower layers
                        </Text>
                        <FlowList dividers aria-label="What this pattern does not own">
                          {spec.doesNotOwn!.map((item, i) => (
                            <FlowListItem
                              key={i}
                              primary={
                                <Text as="span" variant="paragraph-s" color="tertiary">
                                  {item}
                                </Text>
                              }
                            />
                          ))}
                        </FlowList>
                      </Stack>
                    )}
                  </Stack>
                </Surface>
              </Section>
            )}
          </Stack>
        )}

        {/* L3 Components Used */}
        {spec.composesL3 && spec.composesL3.length > 0 && (
          <Section title="L3 Components Used" headingRole="display-s">
            <Inline gap={2} wrap>
              {spec.composesL3.map((comp) => (
                <FlowTag key={comp} status="info">
                  {comp}
                </FlowTag>
              ))}
            </Inline>
          </Section>
        )}
      </Stack>
    </DemoErrorBoundary>
  );
}

function VariantsContent({ entry }: { entry: PatternEntry }) {
  if (!entry.demos.variants) {
    return (
      <Surface variant="primary" padding="container" radius="surface">
        <Text variant="paragraph-m" color="tertiary">
          Variants demo coming soon.
        </Text>
      </Surface>
    );
  }

  return (
    <DemoErrorBoundary section="Variants">
      <DensityDemoWrapper>
        <Stack gap="section">{entry.demos.variants({ patternName: entry.spec.name })}</Stack>
      </DensityDemoWrapper>
    </DemoErrorBoundary>
  );
}

function UseCasesContent({ entry }: { entry: PatternEntry }) {
  if (!entry.demos.useCases) {
    return (
      <Surface variant="primary" padding="container" radius="surface">
        <Text variant="paragraph-m" color="tertiary">
          Use cases demo coming soon.
        </Text>
      </Surface>
    );
  }

  return (
    <DemoErrorBoundary section="Use Cases">
      <Stack gap="section">
        <Text variant="paragraph-l" style={{ maxWidth: "var(--sys-frame-content-prose-wide)" }}>
          Real-world scenarios and implementation examples for <strong>{entry.spec.name}</strong>.
        </Text>
        {entry.demos.useCases({ patternName: entry.spec.name })}
      </Stack>
    </DemoErrorBoundary>
  );
}

function DeveloperContent({ entry }: { entry: PatternEntry }) {
  const { developer } = entry;

  return (
    <DemoErrorBoundary section="Developer">
      <Stack gap="subsection">
        {entry.playground && developer.props && developer.props.length > 0 && (
          <Section title="Interactive Playground" headingRole="display-s">
            <PropPlayground
              componentName={entry.spec.name}
              propDefs={developer.props}
              playground={entry.playground}
            />
          </Section>
        )}

        {developer.props && developer.props.length > 0 && (
          <Section title="API Reference" headingRole="display-s">
            <Surface variant="primary" padding="container" radius="surface">
              <PropsTable props={developer.props} />
            </Surface>
          </Section>
        )}

        {developer.guidelines && developer.guidelines.length > 0 && (
          <Section title="Guidelines" headingRole="display-s">
            <GuidelinesColumns guidelines={developer.guidelines} />
          </Section>
        )}

        <Section title="React" headingRole="display-s">
          <Stack gap="component">
            <CodeBlock title="Import">{developer.reactImport}</CodeBlock>
            <CodeBlock title="Usage">{developer.reactUsage}</CodeBlock>
          </Stack>
        </Section>

        <Section title="Flutter" headingRole="display-s">
          <Stack gap="component">
            <CodeBlock title="Import">{developer.flutterImport}</CodeBlock>
            <CodeBlock title="Usage">{developer.flutterUsage}</CodeBlock>
          </Stack>
        </Section>
      </Stack>
    </DemoErrorBoundary>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// PAGE COMPONENT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function PatternDetailPage() {
  const { category, pattern } = useParams<{ category: string; pattern: string }>();
  const [activeTab, setActiveTab] = useState("overview");

  // Always call all hooks first - no early returns
  const paramsValid = !!category && !!pattern;
  const entry = paramsValid ? getPatternEntry(category, pattern) : null;

  // If invalid params or entry not found, show Navigate
  if (!paramsValid || !entry) {
    return <Navigate to="/patterns" replace />;
  }

  const { spec } = entry;
  const categoryLabel = CATEGORY_LABELS[category] || category;

  // Breadcrumbs
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: categoryLabel, href: `/patterns#${category}` },
    { label: spec.name },
  ];

  // Tabs
  const tabs = [
    { key: "overview", label: "Overview", content: <OverviewContent entry={entry} /> },
    ...(entry.demos.variants
      ? [{ key: "variants", label: "Variants", content: <VariantsContent entry={entry} /> }]
      : []),
    { key: "use-cases", label: "Use Cases", content: <UseCasesContent entry={entry} /> },
    { key: "developer", label: "Developer", content: <DeveloperContent entry={entry} /> },
  ];

  // Key forces full remount when switching patterns — prevents hook order
  // mismatches from demos called as functions within OverviewContent.
  const patternKey = `${category}/${pattern}`;

  return (
    <LayoutGrid key={patternKey}>
      <LayoutGrid.Item span={12} className="component-detail-surface-wrapper">
        <Surface variant="secondary" radius="surface" className="component-detail-surface">
          <Stack gap="subsection">
            <PageHeader
              variant="component"
              divider={false}
              breadcrumbs={<FlowBreadcrumbs variant="icon-root" items={breadcrumbItems} />}
              title={spec.name}
              actions={
                <>
                  <FlowChip status={platformVariant[spec.platform]} size="sm">
                    {platformLabel[spec.platform]}
                  </FlowChip>
                  <FlowChip variant="tonal" size="sm">
                    Layer 4
                  </FlowChip>
                </>
              }
            />

            <Text variant="paragraph-xl">{spec.purpose}</Text>

            <Divider spacing={0} />

            <FlowTabs tabs={tabs} activeKey={activeTab} onChange={setActiveTab} />
          </Stack>
        </Surface>
      </LayoutGrid.Item>
    </LayoutGrid>
  );
}

/**
 * FLOW - Component Detail Page
 * Route: /components/:domain/:component
 *
 * Dedicated page per component with FlowTabs:
 *   Overview | Variants | Usage
 */

import { useState } from "react";
import { Navigate, useParams } from "react-router";

import {
  Divider,
  FlowBreadcrumbs,
  FlowChip,
  FlowTabs,
  FlowTag,
  Inline,
  Stack,
  Surface,
  Text,
  useFlowTheme,
} from "@flow/design-system";
import { LayoutGrid } from "../components/layout-grid";
import {
  Callout,
  CodeBlock,
  GuidelinesColumns,
  PageHeader,
  PropsTable,
  Section,
} from "../components/doc-primitives";
import { registry } from "./component-registry";
import { PropPlayground } from "../components/prop-playground";
import { DensityDemoWrapper } from "../components/density-demo-wrapper";
import { DemoErrorBoundary } from "../components/page-error-boundary";
import { AccessibilitySection } from "../components/AccessibilitySection";

// ─── Platform badge ─────────────────────────────────────────────────────────
type Platform = "shared" | "desktop" | "mobile";
const PLATFORM_LABELS: Record<Platform, { label: string; status: "success" | "info" | "warning" }> =
  {
    shared: { label: "Shared", status: "success" },
    desktop: { label: "Desktop", status: "info" },
    mobile: { label: "Mobile", status: "warning" },
  };

export function ComponentDetailPage() {
  const { domain, component } = useParams<{ domain: string; component: string }>();
  const [activeTab, setActiveTab] = useState("overview");
  const { breakpoint: _breakpoint } = useFlowTheme();

  if (!domain || !component) return <Navigate to="/components" replace />;

  const key = `${domain}/${component}`;
  const entry = registry[key];

  // debug log removed

  if (!entry) {
    return (
      <LayoutGrid>
        <LayoutGrid.Item span={12}>
          <Surface variant="secondary" radius="surface" padding="container">
            <Stack gap="component">
              <Text variant="heading-l">Component not found</Text>
              <Text variant="paragraph-m">
                No component registered at <code>{key}</code>
              </Text>
            </Stack>
          </Surface>
        </LayoutGrid.Item>
      </LayoutGrid>
    );
  }

  const { spec, demos, developer, playground } = entry;
  const platformBadge = PLATFORM_LABELS[spec.platform];
  const displayDomain = entry.domain ?? domain.charAt(0).toUpperCase() + domain.slice(1);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: displayDomain, href: `/components#${displayDomain.toLowerCase()}` },
    { label: spec.name },
  ];

  // ─────��─────────────────────────────────────────────────────────────────
  // Overview tab
  // ─────────────────────────────────────────────────────────────────────────
  const renderOverview = () => {
    if (!demos?.overview) {
      return (
        <Surface variant="primary" padding="container" radius="surface">
          <Text variant="paragraph-m" color="tertiary">
            No overview demo available.
          </Text>
        </Surface>
      );
    }

    return (
      <DemoErrorBoundary section="Overview">
        <Stack gap="section">
          {/* Live demo (DemoSection manages its own sections internally) */}
          <DensityDemoWrapper>{demos.overview()}</DensityDemoWrapper>

          {/* ── Anatomy + Accessibility ───────────────────────────────────────
              LayoutGrid span 6+6: side-by-side on desktop (≥992px, 12 cols),
              full-width stacked on tablet/mobile. Token gap via LayoutGrid.
              alignItems via style on each Item to prevent height stretch.
          ─────────────────────────────────────────────────────────────────── */}
          {(spec.anatomy?.length || spec.accessibility) && (
            <Stack gap="subsection">
              {/* ── Anatomy ──────────────────────────────────────── */}
              {spec.anatomy && spec.anatomy.length > 0 && (
                <Section title="Anatomy" headingRole="display-s">
                  <Surface variant="primary" radius="surface" className="flow-anatomy-surface">
                    <Stack gap={0}>
                      {spec.anatomy.map((part, idx) => (
                        <div key={idx} className="flow-anatomy-item">
                          <FlowChip variant="filled" size="sm" className="flow-anatomy-chip">
                            {part.part}
                          </FlowChip>
                          <Stack gap="component">
                            <Text
                              variant="paragraph-m"
                              color="secondary"
                              className="flow-text-pretty"
                            >
                              {part.description}
                            </Text>
                            {part.tokens.length > 0 && (
                              <Inline gap={1} wrap>
                                {part.tokens.map((token, i) => (
                                  <FlowTag key={i} variant="code">
                                    {token}
                                  </FlowTag>
                                ))}
                              </Inline>
                            )}
                          </Stack>
                        </div>
                      ))}
                    </Stack>
                  </Surface>
                </Section>
              )}

              {/* ── Accessibility ─────────────────────────────────── */}
              {spec.accessibility && (
                <Section title="Accessibility" headingRole="display-s">
                  <AccessibilitySection spec={spec.accessibility} />
                </Section>
              )}
            </Stack>
          )}
        </Stack>
      </DemoErrorBoundary>
    );
  };

  // ─────────────────────────────────────────────────────────────────────────
  // Variants tab
  // ─────────────────────────────────────────────────────────────────────────
  const renderVariants = () => {
    if (!demos?.variants) {
      return (
        <Surface variant="primary" padding="container" radius="surface">
          <Text variant="paragraph-m" color="tertiary">
            No variants demo available.
          </Text>
        </Surface>
      );
    }
    return (
      <DemoErrorBoundary section="Variants">
        <DensityDemoWrapper>
          <Stack gap="section">{demos.variants()}</Stack>
        </DensityDemoWrapper>
      </DemoErrorBoundary>
    );
  };

  // ─────────────────────────────────────────────────────────────────────────
  // Developer tab
  // ─────────────────────────────────────────────────────────────────────────
  const renderDeveloper = () => {
    if (!developer) {
      return (
        <Surface variant="primary" padding="container" radius="surface">
          <Text variant="paragraph-m" color="tertiary">
            No developer documentation available.
          </Text>
        </Surface>
      );
    }

    return (
      <DemoErrorBoundary section="Developer">
        <Stack gap="subsection">
          {playground && developer.props && developer.props.length > 0 && (
            <Section title="Interactive Playground" headingRole="display-s">
              <PropPlayground
                componentName={spec.name}
                propDefs={developer.props}
                playground={playground}
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

          {developer.notes && !developer.guidelines && (
            <Section title="Notes" headingRole="display-s">
              <Callout intent="info">
                <Text variant="paragraph-m">{developer.notes}</Text>
              </Callout>
            </Section>
          )}
        </Stack>
      </DemoErrorBoundary>
    );
  };

  // ─────────────────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────────────────
  const tabsData = [
    { key: "overview", label: "Overview", content: renderOverview() },
    { key: "variants", label: "Variants", content: renderVariants() },
    { key: "usage", label: "Usage", content: renderDeveloper() },
  ];

  return (
    <>
      <LayoutGrid>
        <LayoutGrid.Item span={12} className="component-detail-surface-wrapper">
          <Surface variant="secondary" radius="surface" className="component-detail-surface">
            <Stack gap="subsection">
              <PageHeader
                variant="component"
                divider={false}
                breadcrumbs={<FlowBreadcrumbs variant="icon-root" items={breadcrumbItems} />}
                title={spec.name}
                actions={
                  <FlowChip status={platformBadge.status} size="sm">
                    {platformBadge.label}
                  </FlowChip>
                }
              />

              <Text variant="paragraph-xl">{spec.purpose}</Text>

              <Divider spacing={0} />

              <FlowTabs tabs={tabsData} activeKey={activeTab} onChange={setActiveTab} />
            </Stack>
          </Surface>
        </LayoutGrid.Item>
      </LayoutGrid>
    </>
  );
}

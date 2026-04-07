import React, { useState } from "react";
import { Link } from "react-router";

import {
  ActionSurface,
  Divider,
  FlowBadge,
  FlowCard,
  FlowListItem,
  FlowTabs,
  FlowTag,
  Grid,
  Inline,
  Stack,
  Surface,
  Text,
} from "../../lib";
import { FlowIcon } from "../primitives";
import { PAGE_GAP, PageHeader, Section } from "../components/doc-primitives";
import { LayoutGrid } from "../components/layout-grid";

// ── Component Audit Status Data ──
const DOMAIN_SCORES = [
  { domain: "Controls", score: 97.5, components: 3, icon: "zap" },
  { domain: "Selection", score: 96.0, components: 7, icon: "check-square" },
  { domain: "Inputs", score: 97.0, components: 4, icon: "edit" },
  { domain: "Display", score: 98.0, components: 9, icon: "eye" },
  { domain: "Navigation", score: 96.8, components: 6, icon: "compass" },
  { domain: "Overlays", score: 95.5, components: 6, icon: "layers" },
  { domain: "Layout", score: 96.0, components: 1, icon: "grid" },
  { domain: "Feedback", score: 96.5, components: 4, icon: "message-circle" },
  { domain: "Data", score: 95.0, components: 2, icon: "database" },
];

const TOTAL_COMPONENTS = DOMAIN_SCORES.reduce((s, d) => s + d.components, 0);
const TOTAL_FOUNDATIONS = 10;
const TOTAL_PRIMITIVES = 12;
const TOTAL_DOMAINS = DOMAIN_SCORES.length;
const _TOTAL_MOBILE = 5; // BottomNav, BottomSheet, FAB, OTPInput, QuickActions
const TOTAL_PATTERNS = 40; // 26 shared + 6 mobile + 8 desktop
const _AVG_SCORE = +(DOMAIN_SCORES.reduce((s, d) => s + d.score, 0) / DOMAIN_SCORES.length).toFixed(
  1,
);

// ── Pattern Categories ──
const PATTERN_CATEGORIES = [
  {
    platform: "Shared",
    icon: "globe",
    count: 26,
    desc: "Cross-platform patterns",
    groups: [
      {
        name: "Input",
        patterns: [
          "PhoneInput",
          "CountrySelect",
          "Search",
          "Autocomplete",
          "MultiSelect",
          "DatePicker",
          "DateRangePicker",
          "ColorPicker",
          "InlineEditable",
          "RichTextEditor",
          "FileUpload",
        ],
      },
      { name: "Feedback", patterns: ["SnackbarProvider", "EmptyState", "NotificationPanel"] },
      { name: "Content", patterns: ["FilterChipGroup", "Timeline", "SectionHeader", "KPICard"] },
      { name: "Display", patterns: ["AvatarGroup"] },
      { name: "Overlay", patterns: ["ConfirmationDialog"] },
      { name: "Layout", patterns: ["FormSection"] },
      { name: "Navigation", patterns: ["DrawerAdapter"] },
      {
        name: "Data",
        patterns: ["TransferList", "DragSortableList", "CalendarView", "ChartWrapper"],
      },
    ],
  },
  {
    platform: "Mobile",
    icon: "smartphone",
    count: 6,
    desc: "Mobile-specific patterns",
    groups: [
      { name: "Input", patterns: ["OTPInput"] },
      { name: "Feedback", patterns: ["PullToRefresh"] },
      { name: "Overlay", patterns: ["ActionSheet", "FullscreenSheet"] },
      { name: "Layout", patterns: ["SwipeActions", "QuickActions"] },
    ],
  },
  {
    platform: "Desktop",
    icon: "monitor",
    count: 8,
    desc: "Desktop-specific patterns",
    groups: [
      { name: "Display", patterns: ["HoverCard"] },
      { name: "Overlay", patterns: ["CommandPalette"] },
      { name: "Layout", patterns: ["Toolbar"] },
      { name: "Navigation", patterns: ["Topbar"] },
      {
        name: "Data",
        patterns: ["DataTable", "VirtualDataTable", "AdvancedFilters", "ColumnConfigurator"],
      },
    ],
  },
];

const SYSTEM_STATS = [
  {
    label: "Foundations",
    value: String(TOTAL_FOUNDATIONS),
    icon: "layers",
    desc: "Infrastructure layers",
  },
  {
    label: "Primitives",
    value: String(TOTAL_PRIMITIVES),
    icon: "box",
    desc: "Structural building blocks",
  },
  {
    label: "Components",
    value: String(TOTAL_COMPONENTS),
    icon: "shapes",
    desc: "Production-ready units",
  },
  {
    label: "Patterns",
    value: String(TOTAL_PATTERNS),
    icon: "layout",
    desc: "Core · Mobile · Desktop",
  },
];

// ── System Stats Card ──
function SystemStatsCard() {
  return (
    <Section
      title="System Overview"
      description={`${TOTAL_FOUNDATIONS} foundations, ${TOTAL_PRIMITIVES} primitives, and ${TOTAL_COMPONENTS} components — zero external UI dependencies. Platform parity across React and Flutter.`}
    >
      <Surface padding="surface">
        <Grid minItemWidth="140px" gap={4} className="flow-stats-grid">
          {SYSTEM_STATS.map((stat) => (
            <Stack key={stat.label} gap={2} align="center" justify="center">
              <Text role="display-l" color="accent">
                {stat.value}
              </Text>
              <Text role="label-s">{stat.label}</Text>
              <Text role="caption" color="secondary">
                {stat.desc}
              </Text>
            </Stack>
          ))}
        </Grid>
      </Surface>
    </Section>
  );
}

// ── Pattern Group Card (collapsible by tag count) ──
const MAX_VISIBLE_TAGS = 6;

function PatternGroupCard({ cat }: { cat: (typeof PATTERN_CATEGORIES)[number] }) {
  const [expanded, setExpanded] = useState(false);
  const totalTags = cat.groups.reduce((sum, g) => sum + g.patterns.length, 0);
  const hasMore = totalTags > MAX_VISIBLE_TAGS;
  const hiddenCount = totalTags - MAX_VISIBLE_TAGS;

  // Build truncated view: show complete groups until tag budget is exhausted
  let tagBudget = MAX_VISIBLE_TAGS;
  const truncatedGroups: { name: string; patterns: string[] }[] = [];
  if (!expanded && hasMore) {
    for (const g of cat.groups) {
      if (tagBudget <= 0) break;
      const visible = g.patterns.slice(0, tagBudget);
      truncatedGroups.push({ name: g.name, patterns: visible });
      tagBudget -= visible.length;
    }
  }

  const displayGroups = expanded || !hasMore ? cat.groups : truncatedGroups;

  return (
    <Surface padding="surface">
      <Stack gap={3}>
        <FlowIcon name={cat.icon} size="sm" color="accent" />
        {displayGroups.map((g) => (
          <Stack key={g.name} gap={2}>
            <Text role="caption" color="secondary">
              {g.name}
            </Text>
            <Inline gap={2} wrap>
              {g.patterns.map((p) => (
                <FlowTag key={p} status="info" size="sm">
                  {p}
                </FlowTag>
              ))}
            </Inline>
          </Stack>
        ))}
        {hasMore && (
          <Inline gap={1} align="center">
            <ActionSurface
              onPress={() => setExpanded(!expanded)}
              className="flow-pattern-show-more"
            >
              <Inline gap={1} align="center">
                <Text role="caption" color="accent">
                  {expanded ? "Show less" : `+${hiddenCount} more`}
                </Text>
                <FlowIcon
                  name={expanded ? "chevron-up" : "chevron-down"}
                  size="xs"
                  color="accent"
                />
              </Inline>
            </ActionSurface>
          </Inline>
        )}
      </Stack>
    </Surface>
  );
}

// ── Domain Audit Scores ──
function DomainAuditScores() {
  const componentsContent = (
    <Grid minItemWidth="160px" gap={3}>
      {DOMAIN_SCORES.map((d) => (
        <Link
          key={d.domain}
          to={`/components/${d.domain.toLowerCase()}`}
          style={{ textDecoration: "none" }}
        >
          <FlowCard variant="stat">
            <Stack gap={2} align="center">
              <Text role="heading-l" color="accent">
                {d.components}
              </Text>
              <Text role="label-s">{d.domain}</Text>
            </Stack>
          </FlowCard>
        </Link>
      ))}
    </Grid>
  );

  const patternsContent = (
    <Stack gap={4}>
      <Grid columns={3} gap={3}>
        {PATTERN_CATEGORIES.map((cat) => (
          <FlowCard key={cat.platform} variant="stat">
            <Stack gap={2} align="center">
              <Text role="heading-l" color="accent">
                {cat.count}
              </Text>
              <Text role="label-s">{cat.platform}</Text>
            </Stack>
          </FlowCard>
        ))}
      </Grid>
      <Grid columns={3} gap={3}>
        {PATTERN_CATEGORIES.map((cat) => (
          <PatternGroupCard key={cat.platform} cat={cat} />
        ))}
      </Grid>
    </Stack>
  );

  return (
    <Section
      title="System Inventory"
      headingRole="display-s"
      description={`${TOTAL_COMPONENTS} components across ${TOTAL_DOMAINS} domains + ${TOTAL_PATTERNS} patterns across 3 platform tiers.`}
    >
      <FlowTabs
        defaultActiveKey="components"
        tabs={[
          {
            key: "components",
            label: `Components (${TOTAL_COMPONENTS})`,
            icon: "box",
            content: componentsContent,
          },
          {
            key: "patterns",
            label: `Patterns (${TOTAL_PATTERNS})`,
            icon: "layout",
            content: patternsContent,
          },
        ]}
      />
    </Section>
  );
}

// ── Quick Start Section ──
function QuickStartSection() {
  const quickLinks = [
    {
      role: "For Designers",
      desc: "See the gold standard for component documentation",
      link: "/components/controls/flow-button",
      icon: "palette",
    },
    {
      role: "For Developers",
      desc: "Understand token architecture and component APIs",
      link: "/tokens",
      icon: "code",
    },
    {
      role: "For Auditors",
      desc: "Review system quality metrics and governance",
      link: "/system-audit",
      icon: "clipboard",
    },
  ];

  return (
    <Section title="Start Here" description="Navigate to the most relevant content for your role">
      <Grid minItemWidth="280px" gap={4}>
        {quickLinks.map((item) => (
          <Link key={item.role} to={item.link} style={{ textDecoration: "none" }}>
            <Surface
              variant="secondary"
              padding="surface"
              style={{
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              className="quick-link-card"
            >
              <Stack gap={3}>
                <FlowIcon name={item.icon} size="lg" color="accent" />
                <Stack gap={2}>
                  <Text role="label-l">{item.role}</Text>
                  <Text role="paragraph-s" color="secondary">
                    {item.desc}
                  </Text>
                </Stack>
                <Inline gap={2} align="center">
                  <Text
                    role="caption"
                    color="accent"
                    style={{ fontWeight: "var(--ref-voice-weight-medium)" }}
                  >
                    Explore
                  </Text>
                  <FlowIcon name="arrow-right" size="sm" color="accent" />
                </Inline>
              </Stack>
            </Surface>
          </Link>
        ))}
      </Grid>
    </Section>
  );
}

export function PhilosophyPage() {
  return (
    <LayoutGrid>
      <LayoutGrid.Item span={12} className="component-detail-surface-wrapper">
        <Surface variant="secondary" radius="surface" className="component-detail-surface">
          <Stack gap={PAGE_GAP}>
            <PageHeader chapter="V2.0" title="System Philosophy">
              Flow is not a UI kit. It is not a styling layer. It is a scalable product platform — a
              formal system of constraints, tokens, primitives, and components that enables
              consistent, accessible, high-quality product experiences across web and mobile
              platforms for a decade or more.
            </PageHeader>

            {/* ── Core Thesis ── */}
            <Section title="Core Thesis">
              <Text role="paragraph-l">
                Every visual decision in a product is either <em>intentional</em> or{" "}
                <em>accidental</em>. Accidental decisions accumulate as design debt — inconsistency,
                inaccessibility, fragmented brand expression, and engineering overhead. Flow exists
                to eliminate accidental decisions by providing a complete, layered system where
                every output traces back to a named, governed foundation.
              </Text>
            </Section>

            {/* ── Design Principles ── */}
            <Section title="Design Principles" headingRole="display-s">
              <Grid minItemWidth="280px" gap={4}>
                {[
                  {
                    title: "1. Constraint as Freedom",
                    desc: "Fewer choices, better outcomes.\nEvery token, variant, and API boundary acts as a guardrail, reducing ambiguity and freeing teams to focus on product logic — not visual negotiation.",
                  },
                  {
                    title: "2. Platform Parity, Not Uniformity",
                    desc: "React and Flutter share tokens and semantics, not pixels.\nEach platform respects its native behavior. Parity is conceptual — ensuring consistency in meaning, not identical execution.",
                  },
                  {
                    title: "3. Layered Accountability",
                    desc: "Foundations define meaning.\nPrimitives define structure.\nComponents define behavior.\nPatterns define orchestration.\nEach layer owns its domain — and nothing else.",
                  },
                  {
                    title: "4. Accessibility is Structural",
                    desc: "Accessibility is not a layer — it is the system.\nBuilt into primitives: focus, roles, contrast, motion.\nNon-optional, always present, and never deferred.",
                  },
                  {
                    title: "5. Semantic Over Visual",
                    desc: "Tokens are named by intent, not appearance.\n(surface.primary, text.danger — never blue-500).\nThis ensures consistency, portability, and long-term resilience.",
                  },
                  {
                    title: "6. Observable by Default",
                    desc: "Every component emits structured signals.\n(Growth foundation)\nUsage is measurable without extra instrumentation — enabling continuous, data-informed evolution.",
                  },
                ].map((p) => (
                  <Surface key={p.title} padding="surface">
                    <Stack gap={2}>
                      <Text role="heading-xl">{p.title}</Text>
                      <Text role="paragraph-s" style={{ whiteSpace: "pre-line" }}>
                        {p.desc}
                      </Text>
                    </Stack>
                  </Surface>
                ))}
              </Grid>
            </Section>

            <Divider spacing={0} />

            {/* ── Stats ── */}
            <SystemStatsCard />

            {/* ── Architecture Model ── */}
            <Section
              title="Layered Architecture"
              headingRole="display-s"
              description="Flow's architecture is a strict five-layer stack. Dependencies flow downward only. No layer may reach into a layer below its immediate dependency."
            >
              <Stack gap={5}>
                {[
                  {
                    layer: "1",
                    name: "Foundations",
                    color: "var(--ref-energy-neutral-150)",
                    textColor: "var(--sys-energy-text-primary)",
                    secondaryColor: "var(--sys-energy-text-secondary)",
                    icon: "layers" as const,
                    desc: "System by foundational tokens.",
                    minH: "56px",
                    w: "52%",
                  },
                  {
                    layer: "2",
                    name: "Primitives",
                    color: "var(--ref-energy-blue-100)",
                    textColor: "var(--sys-energy-text-primary)",
                    secondaryColor: "var(--sys-energy-text-secondary)",
                    icon: "grid-icon" as const,
                    desc: "Structural building blocks. Platform-agnostic.",
                    minH: "56px",
                    w: "66%",
                  },
                  {
                    layer: "3",
                    name: "Components",
                    color: "var(--ref-energy-blue-400)",
                    textColor: "var(--sys-energy-text-on-action)",
                    secondaryColor: "var(--sys-energy-text-on-action)",
                    icon: "box" as const,
                    desc: "Interactive UI units built and styled with foundational tokens.",
                    minH: "56px",
                    w: "75%",
                  },
                  {
                    layer: "4",
                    name: "Patterns",
                    color: "var(--ref-energy-blue-500)",
                    textColor: "var(--sys-energy-text-on-action)",
                    secondaryColor: "var(--sys-energy-text-on-action)",
                    icon: "shapes" as const,
                    desc: "Behavioral recipes that orchestrate components into cohesive flows.",
                    minH: "56px",
                    w: "88%",
                  },
                  {
                    layer: "5",
                    name: "Templates",
                    color: "var(--ref-energy-blue-600)",
                    textColor: "var(--sys-energy-text-on-action)",
                    secondaryColor: "var(--sys-energy-text-on-action)",
                    icon: "layout" as const,
                    desc: "Page-level blueprints that compose patterns into ready to implement features.",
                    minH: "56px",
                    w: "100%",
                  },
                ].map((l) => (
                  <FlowListItem
                    key={l.layer}
                    leading={<FlowIcon name={l.icon} size="xl" />}
                    primary={l.name}
                    secondary={l.desc}
                    trailing={
                      <FlowBadge
                        content={`L${l.layer}`}
                        variant="label"
                        color="accent"
                        standalone
                      />
                    }
                    style={
                      {
                        background: l.color,
                        borderRadius: "var(--ref-frame-radius-3)",
                        minHeight: l.minH,
                        width: l.w,
                        margin: "0 auto",
                        "--comp-list-text-primary": l.textColor,
                        "--comp-list-text-secondary": l.secondaryColor,
                        "--comp-list-item-bg": "transparent",
                        "--comp-list-content-gap": "4px",
                        "--comp-list-item-gap": "var(--ref-frame-space-7)",
                        "--comp-list-item-padding-y": "var(--ref-frame-space-10)",
                        "--comp-list-item-padding-x": "var(--ref-frame-space-10)",
                      } as React.CSSProperties
                    }
                    className="architecture-layer-item"
                  />
                ))}
              </Stack>
            </Section>

            {/* ── Domain Audit Scores ── */}
            <DomainAuditScores />

            <Divider spacing={0} />

            {/* ── NEW: Quick Start ── */}
            <QuickStartSection />

            <Divider spacing={0} />

            {/* ── What Flow Is Not ── */}
            <Section title="What Flow Is Not">
              <Grid minItemWidth="280px" gap={4}>
                {[
                  {
                    not: "A CSS framework",
                    because:
                      "Flow produces CSS variables as one output format, but it is token-first and platform-agnostic. It is equally native on Flutter.",
                  },
                  {
                    not: "A wrapper around Radix/Tailwind/MUI",
                    because:
                      "Flow owns every primitive, every component, every interaction pattern from scratch. Zero external UI dependencies.",
                  },
                  {
                    not: "A Figma library",
                    because:
                      "Flow may have a Figma representation, but the source of truth is code. Figma is a consumer, not a producer.",
                  },
                  {
                    not: "A brand exercise",
                    because:
                      "Flow is role-based, not brand-based. Brand expression is a theme layer that consumes Flow tokens, not the other way around.",
                  },
                ].map((item) => (
                  <Surface key={item.not} padding="surface" className="flow-negation-card">
                    <Stack gap={2}>
                      <Text role="label-l" color="danger">
                        Not {item.not}
                      </Text>
                      <Text role="paragraph-s">{item.because}</Text>
                    </Stack>
                  </Surface>
                ))}
              </Grid>
            </Section>

            {/* ── Longevity Commitment ── */}
            <Section
              title="Designed for Longevity"
              headingRole="display-s"
              description="Flow is designed to last 10+ years. This imposes specific architectural constraints:"
            >
              <ul className="flow-longevity-list">
                {[
                  "Token naming is semantic and role-based — never tied to a specific visual value that might change.",
                  "The ref → sys → comp token chain allows complete visual transformation (rebrand, dark mode, density) without touching component code.",
                  "Platform implementations (React, Flutter) are independent consumers of the same token schema — adding a new platform does not require redesigning the system.",
                  "Governance includes automated drift detection, hardcoded-value linting, and component coverage metrics to prevent entropy over time.",
                  "Every foundation explicitly defines what it does NOT govern, preventing scope creep that degrades systems over years.",
                ].map((item, i) => (
                  <li key={i}>
                    <Inline gap={3} align="start">
                      <Text
                        role="paragraph-s"
                        color="accent"
                        style={{ fontWeight: "var(--ref-voice-weight-semibold)", flexShrink: 0 }}
                      >
                        0{i + 1}
                      </Text>
                      <Text role="paragraph-s">{item}</Text>
                    </Inline>
                  </li>
                ))}
              </ul>
            </Section>
          </Stack>
        </Surface>
      </LayoutGrid.Item>
    </LayoutGrid>
  );
}

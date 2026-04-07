/**
 * FLOW Doc Composition Primitives
 * ────────────────────────────────
 * Enforce consistent page-level typography rhythm across all doc pages.
 *
 * These are NOT L2 primitives — they are composition patterns (L4-ish)
 * that standardize how doc pages structure their content. They consume
 * L2 primitives (Text, Stack, Divider) and enforce fixed gap values.
 *
 * EXPORTS:
 *   Constants:   PAGE_GAP, SECTION_GAP, HEADER_GAP, CARD_GAP, SUBSECTION_GAP
 *   Layout:      PageHeader, Section, Callout, DocList, CodeBlock
 *   Developer:   PropsTable, GuidelinesColumns
 *   Types:       PropEntry, GuidelineEntry
 *
 * NOTE: DemoSection is NOT exported here. Import it from ../components/demo-helpers
 *
 * RHYTHM SPEC (semantic spacing constants):
 *   PAGE_GAP       = 10  (40px) — between major sections at page level
 *   SECTION_GAP    =  4  (16px) — heading → content within a section
 *   HEADER_GAP     =  3  (12px) — overline → h1 → intro within page header
 *   CARD_GAP       =  2  (8px)  — label → content within a card
 *   SUBSECTION_GAP =  3  (12px) — between items within a section
 */
import type { CSSProperties, ReactNode } from "react";

import { Divider, Grid, Inline, Stack, Surface, Text } from "../primitives";
import type { SpaceToken } from "../primitives";
import { FlowTag } from "./display";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Rhythm Constants (exported for escape-hatch usage)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * DEPRECATED: Use CSS variables instead for responsive spacing.
 * These numeric constants don't adapt to density/viewport.
 *
 * Prefer direct CSS variables in your styles:
 * - var(--sys-frame-gap-section)    — 64px default / 48px compact / 80px comfortable
 * - var(--sys-frame-gap-subsection) — 36px default / 28px compact / 44px comfortable
 * - var(--sys-frame-gap-component)  — 20px default / 16px compact / 24px comfortable
 */

/** @deprecated Use var(--sys-frame-gap-section) instead */
export const PAGE_GAP: SpaceToken = 10;
/** @deprecated Use var(--sys-frame-gap-component) instead */
export const SECTION_GAP: SpaceToken = 4;
/** @deprecated Use 3 or var(--sys-frame-gap-component) instead */
export const HEADER_GAP: SpaceToken = 3;
/** @deprecated Use 2 instead */
export const CARD_GAP: SpaceToken = 2;
/** @deprecated Use var(--sys-frame-gap-subsection) instead */
export const SUBSECTION_GAP: SpaceToken = 3;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// PageHeader
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * Standardized page header with two variants:
 *
 * **Default** — overline → h1 → intro paragraph → divider.
 *   <PageHeader chapter="Chapter 01" title="Philosophy">
 *     Flow is not a UI kit...
 *   </PageHeader>
 *
 * **Component** — breadcrumbs → title + actions → divider.
 *   <PageHeader variant="component" breadcrumbs={<FlowBreadcrumbs ... />} title="FlowButton" actions={<FlowChip ... />} />
 */

interface PageHeaderDefault {
  /** @default "default" */
  variant?: "default";
  /** Overline text (e.g., "Chapter 01", "Layer 3") */
  chapter: string;
  /** Page title rendered as h1 */
  title: string;
  /** Intro paragraph content (optional) */
  children?: ReactNode;
  /** Whether to show the divider below the header. Default: true */
  divider?: boolean;
}

interface PageHeaderComponent {
  variant: "component";
  /** Breadcrumb navigation (e.g., <FlowBreadcrumbs ... />) */
  breadcrumbs: ReactNode;
  /** Page title rendered as display-s */
  title: string;
  /** Inline actions rendered next to the title (e.g., FlowChip badges) */
  actions?: ReactNode;
  /** Whether to show the divider below the header. Default: true */
  divider?: boolean;
}

type PageHeaderProps = PageHeaderDefault | PageHeaderComponent;

export function PageHeader(props: PageHeaderProps) {
  const divider = props.divider ?? true;

  if (props.variant === "component") {
    return (
      <>
        <Stack gap={HEADER_GAP}>
          {props.breadcrumbs}
          <Inline gap={3} align="center">
            <Text role="display-xl">{props.title}</Text>
            {props.actions}
          </Inline>
        </Stack>
        {divider && <Divider spacing={0} />}
      </>
    );
  }

  // Default variant
  return (
    <>
      <Stack gap={HEADER_GAP}>
        <Text role="overline">{props.chapter}</Text>
        <Text role="display-xl">{props.title}</Text>
        {props.children && (
          <Text role="paragraph-xl" className="flow-page-header-intro">
            {props.children}
          </Text>
        )}
      </Stack>
      {divider && <Divider spacing={0} />}
    </>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * Standardized section: h2 heading → optional description → children.
 * Enforces SECTION_GAP (4 = 16px) between heading and content.
 *
 * Usage:
 *   <Section title="Core Thesis">
 *     <Text>Every visual decision...</Text>
 *   </Section>
 *
 *   <Section title="Dependency Rules" description="All layers follow strict rules.">
 *     <CodeBlock>...</CodeBlock>
 *   </Section>
 */
interface SectionProps {
  /** Section heading rendered as h2 */
  title: string;
  /** Optional description paragraph below the heading */
  description?: ReactNode;
  /** Section content */
  children: ReactNode;
  /** Override the heading role. Default: "display-m" */
  headingRole?: "display-m" | "display-s" | "heading-xl";
  /** Additional className on the outer Stack */
  className?: string;
  /** Additional style on the outer Stack */
  style?: CSSProperties;
}

export function Section({
  title,
  description,
  children,
  headingRole = "display-m",
  className,
  style,
}: SectionProps) {
  return (
    <Stack gap={SECTION_GAP} className={className} style={style}>
      <Text role={headingRole}>{title}</Text>
      {description && (
        <Text role="paragraph-s" color="secondary">
          {description}
        </Text>
      )}
      {children}
    </Stack>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Callout
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * Standardized callout surface with left border accent.
 * Replaces the repeated pattern:
 *   <Surface padding="control" className="flow-doc-accent">
 *
 * Usage:
 *   <Callout>Important information here.</Callout>
 *   <Callout intent="warning" title="Justification">Why we chose this...</Callout>
 */

type CalloutIntent = "accent" | "success" | "warning" | "danger" | "info";

interface CalloutProps {
  /** Border accent color intent. Default: "accent" */
  intent?: CalloutIntent;
  /** Alias for intent */
  type?: CalloutIntent;
  /** Optional title rendered as h4 */
  title?: string;
  /** Content */
  children: ReactNode;
  /** Additional style */
  style?: CSSProperties;
}

export function Callout({ intent: intentProp, type, title, children, style }: CalloutProps) {
  const intent = intentProp ?? type ?? "accent";
  return (
    <Surface padding="control" className="flow-callout" data-intent={intent} style={style}>
      <Stack gap={CARD_GAP}>
        {title && <Text role="label-l">{title}</Text>}
        {typeof children === "string" ? <Text role="paragraph-m">{children}</Text> : children}
      </Stack>
    </Surface>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// DocList
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * Standard bulleted list for documentation pages.
 * Uses `.flow-doc-list` class — no inline margin/padding on ref tokens.
 *
 * Usage:
 *   <DocList items={["First item", "Second item"]} />
 */
interface DocListProps {
  /** List items — rendered inside <li> with paragraph-m role */
  items: ReactNode[];
  className?: string;
}

export function DocList({ items, className }: DocListProps) {
  return (
    <ul className={`flow-doc-list ${className ?? ""}`}>
      {items.map((item, i) => (
        <li key={i}>
          <Text role="paragraph-m" as="span">
            {item}
          </Text>
        </li>
      ))}
    </ul>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CodeBlock
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * Standardized code block for developer documentation.
 * Uses `.flow-code-block-pre` class — no inline styles on ref tokens.
 *
 * Usage:
 *   <CodeBlock title="Import">{`import { FlowButton } from "../components/controls";`}</CodeBlock>
 */
interface CodeBlockProps {
  /** Code content */
  children: string;
  /** Optional title rendered as overline above the code */
  title?: string;
  /** Optional language for syntax highlighting (ignored in rendering, accepted for compat) */
  language?: string;
  /** Simplified display mode — no border/title (accepted for compat) */
  simple?: boolean;
}

export function CodeBlock({ children, title }: CodeBlockProps) {
  return (
    <Surface padding="control" className="flow-code-block">
      <Stack gap={CARD_GAP}>
        {title && (
          <Text role="overline" color="tertiary">
            {title}
          </Text>
        )}
        <pre className="flow-code-block-pre">{children}</pre>
      </Stack>
    </Surface>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// PropEntry & GuidelineEntry types
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * Single row in the Props / API Reference table.
 * Used by PropsTable to render structured prop documentation.
 */
export interface PropEntry {
  name: string;
  type: string;
  default?: string;
  /** Alias for `default` — use either */
  defaultValue?: string;
  description: string;
  required?: boolean;
}

/**
 * Structured guideline entry — categorised as do / don't / info.
 * Used by GuidelinesColumns to render 3-column guideline layout.
 */
export interface GuidelineEntry {
  type?: "do" | "dont" | "info" | "warning";
  /** @deprecated Use 'type' instead */
  intent?: "do" | "dont" | "info" | "warning";
  text: string;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// PropsTable
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * Standardized API reference table for component documentation.
 * Renders a responsive table of prop definitions with name, type, default, and description.
 *
 * Usage:
 *   <PropsTable props={[{ name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Control size" }]} />
 */
export function PropsTable({ props }: { props: PropEntry[] }) {
  return (
    <Stack gap={0} className="flow-props-list">
      {props.map((p) => (
        <div key={p.name} className="flow-props-entry">
          <Stack gap={1}>
            <Inline gap={2} align="center">
              <FlowTag variant="code">{p.name}</FlowTag>
              {p.required && (
                <Text role="caption" className="flow-props-entry__required">
                  required
                </Text>
              )}
            </Inline>
            <Inline gap={3} align="baseline" wrap>
              <code className="flow-props-entry__type">{p.type}</code>
              {p.default && (
                <Inline gap={1} align="baseline">
                  <Text role="caption" color="tertiary">
                    default
                  </Text>
                  <code className="flow-props-entry__default">{p.default}</code>
                </Inline>
              )}
            </Inline>
            <Text role="paragraph-s" color="secondary">
              {p.description}
            </Text>
          </Stack>
        </div>
      ))}
    </Stack>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// GuidelinesColumns
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * Standardized 3-column guideline layout for component documentation.
 * Groups guidelines by intent (Do / Don't / Notes) into separate Surface cards.
 * Responsive: columns stack on narrow viewports via Grid minItemWidth.
 *
 * Usage:
 *   <GuidelinesColumns guidelines={[
 *     { intent: "do", text: "Use high emphasis for primary actions" },
 *     { intent: "dont", text: "Don't use more than one high emphasis button per screen" },
 *     { intent: "info", text: "Size is density-aware by default" },
 *   ]} />
 */

type GuidelineIntent = "do" | "dont" | "info" | "warning";
const guidelineIcon: Record<GuidelineIntent, string> = {
  do: "✓",
  dont: "✗",
  info: "ℹ",
  warning: "⚠",
};

const guidelineColumnDefs: { type: GuidelineIntent; title: string }[] = [
  { type: "do", title: "Do" },
  { type: "dont", title: "Don't" },
  { type: "info", title: "Notes" },
];

export function GuidelinesColumns({ guidelines }: { guidelines: GuidelineEntry[] }) {
  const grouped: Record<GuidelineIntent, GuidelineEntry[]> = {
    do: guidelines.filter((g) => (g.type || g.intent) === "do"),
    dont: guidelines.filter((g) => (g.type || g.intent) === "dont"),
    info: guidelines.filter((g) => (g.type || g.intent) === "info"),
    warning: guidelines.filter((g) => (g.type || g.intent) === "warning"),
  };

  return (
    <Grid minItemWidth="240px" gap="subsection">
      {guidelineColumnDefs.map((col) => {
        const items = grouped[col.type];
        if (!items || items.length === 0) return null;
        return (
          <Surface key={col.type} variant="primary" padding="container">
            <Stack gap="component">
              <div className="flow-guidelines-col-header">
                <span className="flow-guidelines-icon" data-type={col.type} aria-hidden="true">
                  {guidelineIcon[col.type]}
                </span>
                <Text role="overline" className="flow-guidelines-col-title" data-type={col.type}>
                  {col.title}
                </Text>
              </div>
              <Stack gap="component">
                {items.map((g: GuidelineEntry, i: number) => {
                  const currentType = g.type || g.intent;
                  return (
                    <div key={i} className="flow-guidelines-entry">
                      <span
                        className="flow-guidelines-bullet"
                        data-type={currentType}
                        aria-hidden="true"
                      >
                        •
                      </span>
                      <Text role="paragraph-s" color="secondary">
                        {g.text}
                      </Text>
                    </div>
                  );
                })}
              </Stack>
            </Stack>
          </Surface>
        );
      })}
    </Grid>
  );
}

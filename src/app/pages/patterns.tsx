import { Link } from "react-router";

import { CodeBlock, Divider, FlowChip, Grid, Inline, Stack, Surface, Text } from "../../lib";
import { Callout, PAGE_GAP, PageHeader, Section } from "../components/doc-primitives";

export function PatternsPage() {
  const patterns = [
    {
      name: "FormPattern",
      purpose:
        "Orchestrates multi-field form behavior: field ordering, validation sequencing, submission flow, error aggregation, and dirty-state tracking. The FormPattern owns logic — visual rendering is delegated to FormField primitives and input components.",
      orchestrates: [
        "Field registration and ordering",
        "Validation sequencing (field-level → form-level)",
        "Error aggregation and scroll-to-first-error",
        "Dirty state tracking and unsaved changes warning",
        "Submit → loading → success/error lifecycle",
        "Autosave (optional, debounced)",
      ],
      doesNotOwn: [
        "Visual layout (delegated to Stack/Grid primitives)",
        "Individual field styling (delegated to TextField, Select, etc.)",
        "Error message wording (delegated to Tone foundation)",
      ],
      api: `<FormPattern
  onSubmit: (values: FormValues) => Promise<void>
  validation: ValidationSchema
  initialValues?: Partial<FormValues>
  autosave?: boolean | { debounce: number }
  onDirtyChange?: (dirty: boolean) => void
>
  {({ field, errors, isSubmitting, isDirty }) => (
    <Stack gap={4}>
      <TextField {...field("email")} error={errors.email} />
      <TextField {...field("name")} error={errors.name} />
      <Button type="submit" loading={isSubmitting}>
        Save
      </Button>
    </Stack>
  )}
</FormPattern>`,
      components: ["TextField", "TextArea", "Select", "Checkbox", "Radio", "Switch", "Button"],
      growth:
        "Tracks form completion rate, per-field error frequency, time-to-submit, and abandonment point.",
    },
    {
      name: "NavigationShellPattern",
      purpose:
        "Orchestrates the application navigation structure: sidebar ↔ bottom nav switching based on viewport, route-driven active states, breadcrumb generation, and navigation state persistence. The pattern adapts between desktop (Sidebar + Topbar) and mobile (BottomNav + FullscreenSheet).",
      orchestrates: [
        "Viewport-based layout switching (Sidebar vs BottomNav)",
        "Route → active navigation item mapping",
        "Breadcrumb trail generation from route hierarchy",
        "Navigation collapse/expand state persistence",
        "Deep link handling and scroll restoration",
      ],
      doesNotOwn: [
        "Sidebar visual design (delegated to Sidebar component)",
        "BottomNav visual design (delegated to BottomNav component)",
        "Page content rendering (delegated to route components)",
      ],
      api: `<NavigationShellPattern
  routes: RouteDefinition[]
  defaultCollapsed?: boolean
  persistState?: boolean
>
  {({ sidebar, topbar, content, bottomNav, isMobile }) => (
    isMobile ? (
      <Stack>
        {content}
        {bottomNav}
      </Stack>
    ) : (
      <Inline>
        {sidebar}
        <Stack style={{ flex: 1 }}>
          {topbar}
          {content}
        </Stack>
      </Inline>
    )
  )}
</NavigationShellPattern>`,
      components: ["Sidebar", "Topbar", "BottomNav", "Breadcrumbs"],
      growth:
        "Tracks navigation path distributions, sidebar collapse frequency, and cross-device session continuity.",
    },
    {
      name: "DataLoadingPattern",
      purpose:
        "Orchestrates the data lifecycle: idle → loading → success/error/empty. Manages skeleton display timing, error retry logic, empty state selection, and stale-while-revalidate caching. The pattern decides when to show Skeleton, when to show EmptyState, and when to show error — components handle how.",
      orchestrates: [
        "Loading state timing (minimum skeleton display to prevent flash)",
        "Error retry with exponential backoff",
        "Empty state variant selection (first-use vs no-results vs error)",
        "Stale-while-revalidate display logic",
        "Pagination/infinite scroll triggering",
      ],
      doesNotOwn: [
        "Skeleton visual design (delegated to Skeleton component)",
        "Error message wording (delegated to Tone + Snackbar)",
        "Empty state illustration (delegated to EmptyState + Illustration foundation)",
      ],
      api: `<DataLoadingPattern
  query: () => Promise<T>
  skeleton: ReactNode
  empty: EmptyStateVariant
  retry?: { maxAttempts: number; backoff: 'linear' | 'exponential' }
  minLoadingMs?: number  // prevents skeleton flash
>
  {({ data, isLoading, error, isEmpty, retry }) => {
    if (isLoading) return skeleton;
    if (error) return <EmptyState variant="error" action={retry} />;
    if (isEmpty) return <EmptyState variant={empty} />;
    return renderData(data);
  }}
</DataLoadingPattern>`,
      components: ["Skeleton", "EmptyState", "ProgressBar", "Snackbar"],
      growth:
        "Tracks time-to-content, error frequency, retry success rate, and empty-state-to-action conversion.",
    },
    {
      name: "SelectionPattern",
      purpose:
        "Orchestrates multi-item selection behavior: single/multi select modes, select-all, range selection (shift+click), selection-dependent toolbar actions, and keyboard navigation. Used by DataTable, List, and any collection with selectable items.",
      orchestrates: [
        "Selection mode (single, multi, range)",
        "Select-all / deselect-all logic",
        "Shift+click range selection",
        "Selection-dependent action bar visibility",
        "Keyboard navigation (arrow keys, Space to select, Ctrl+A)",
        "Selection count display",
      ],
      doesNotOwn: [
        "Checkbox visual rendering (delegated to Checkbox component)",
        "Toolbar visual rendering (delegated to Toolbar component)",
        "Item visual rendering (delegated to ListItem or DataTable row)",
      ],
      api: `<SelectionPattern
  items: T[]
  mode: 'single' | 'multi'
  onSelectionChange: (selected: T[]) => void
  keyExtractor: (item: T) => string
>
  {({ isSelected, toggle, selectAll, clearAll, selectedCount, selectionActions }) => (
    <>
      {selectedCount > 0 && <Toolbar>{selectionActions}</Toolbar>}
      <List>
        {items.map(item => (
          <ListItem
            key={keyExtractor(item)}
            selected={isSelected(item)}
            onSelect={() => toggle(item)}
          />
        ))}
      </List>
    </>
  )}
</SelectionPattern>`,
      components: ["DataTable", "List", "ListItem", "Checkbox", "Toolbar"],
      growth: "Tracks selection frequency, bulk action usage, and average selection size.",
    },
    {
      name: "ConfirmationPattern",
      purpose:
        "Orchestrates destructive or irreversible action confirmation: trigger → dialog → confirm/cancel → loading → result. Ensures destructive actions always pass through a confirmation gate with Tone-compliant messaging.",
      orchestrates: [
        "Confirmation dialog lifecycle (open → pending → resolved)",
        "Destructive action gating (no action without explicit confirmation)",
        "Loading state during async operation",
        "Success/error result handling (Snackbar or inline)",
        "Tone-compliant message generation from action metadata",
      ],
      doesNotOwn: [
        "Dialog visual rendering (delegated to Dialog component)",
        "Button visual rendering (delegated to Button component)",
        "Snackbar rendering (delegated to Snackbar component)",
      ],
      api: `<ConfirmationPattern
  action: () => Promise<void>
  title: string        // e.g., "Delete this project?"
  description: string  // e.g., "This action cannot be undone."
  confirmLabel: string // e.g., "Delete project"
  variant: 'destructive' | 'warning' | 'info'
>
  {({ trigger, dialog }) => (
    <>
      <Button variant="destructive" onPress={trigger}>
        Delete
      </Button>
      {dialog}
    </>
  )}
</ConfirmationPattern>`,
      components: ["Dialog", "Button", "Snackbar"],
      growth:
        "Tracks confirmation-to-action completion rate. High cancel rates may indicate unclear consequences.",
    },
  ];

  return (
    <Stack gap={PAGE_GAP}>
      <PageHeader chapter="Chapter 11 — Layer 4" title="Patterns">
        Patterns are behavioral orchestrations at Layer 4. They compose components into workflows
        but <strong>do not define visuals</strong>. A pattern owns logic (validation sequencing,
        navigation switching, data lifecycle), while the visual representation is fully delegated to
        components and primitives below.
      </PageHeader>

      {/* ── Concrete Pattern Categories (L4 components) ── */}
      <Section
        title="Concrete Pattern Components"
        description="40+ pattern components organized by sub-category. These are the actual exported components that compose L3 building blocks into higher-order widgets."
      >
        <Grid minItemWidth="200px" gap={3}>
          {[
            { path: "/patterns/input-patterns", name: "Input", count: 11, icon: "edit" },
            { path: "/patterns/feedback", name: "Feedback", count: 4, icon: "message-circle" },
            { path: "/patterns/content", name: "Content", count: 4, icon: "file-text" },
            { path: "/patterns/display-patterns", name: "Display", count: 2, icon: "eye" },
            { path: "/patterns/overlay", name: "Overlay", count: 4, icon: "maximize-2" },
            { path: "/patterns/layout-patterns", name: "Layout", count: 4, icon: "grid" },
            {
              path: "/patterns/navigation-patterns",
              name: "Navigation",
              count: 2,
              icon: "compass",
            },
            { path: "/patterns/data-patterns", name: "Data", count: 8, icon: "database" },
          ].map((cat) => (
            <Link key={cat.path} to={cat.path} style={{ textDecoration: "none", color: "inherit" }}>
              <Surface
                padding="control"
                style={{ cursor: "pointer", transition: "all var(--sys-momentum-transition-fast)" }}
              >
                <Stack gap={2}>
                  <Text role="label-m">{cat.name}</Text>
                  <Text role="caption" color="tertiary">
                    {cat.count} pattern{cat.count !== 1 ? "s" : ""}
                  </Text>
                </Stack>
              </Surface>
            </Link>
          ))}
        </Grid>
      </Section>

      <Divider spacing={2} />

      {/* ── Behavioral Patterns (conceptual) ── */}
      <Section
        title="Behavioral Orchestration Patterns"
        description="These conceptual patterns define how L3 components should be orchestrated. They are architectural blueprints, not concrete component exports."
      >
        <Text
          role="paragraph-s"
          color="secondary"
          style={{ maxWidth: "var(--sys-frame-content-prose)" }}
        >
          The patterns below describe behavioral orchestration logic — how components should be
          composed and coordinated in real applications. They complement the concrete pattern
          components above.
        </Text>
      </Section>

      <Callout>
        <Text role="paragraph-s" color="accent">
          <strong>Layer Rule:</strong> Patterns orchestrate behavior, not visuals. They compose
          components into flows but never define colors, spacing, typography, or any visual property
          directly. All visual decisions are delegated to Components (Layer 3) which consume
          Primitives (Layer 2) which consume Tokens (Layer 1).
        </Text>
      </Callout>

      {patterns.map((p, idx) => (
        <Stack key={p.name} gap={3}>
          <Inline gap={3}>
            <Inline
              gap={0}
              justify="center"
              style={{
                width: "var(--ref-frame-doc-badge-sm)",
                height: "var(--ref-frame-doc-badge-sm)",
                borderRadius: "var(--ref-frame-radius-2)",
                background: "var(--sys-energy-surface-sunken)",
              }}
            >
              <Text role="heading-m" color="tertiary">
                &#11042;
              </Text>
            </Inline>
            <Stack gap={1}>
              <Text role="heading-l">{p.name}</Text>
              <FlowChip variant="accent" size="sm">
                PATTERN
              </FlowChip>
            </Stack>
          </Inline>

          <Surface
            padding="control"
            className="flow-doc-accent"
          >
            <Stack gap={2}>
              <Text role="overline">Purpose</Text>
              <Text role="paragraph-s">{p.purpose}</Text>
            </Stack>
          </Surface>

          <Grid minItemWidth="280px" gap={3}>
            <Surface padding="control">
              <Stack gap={2}>
                <Text role="overline" color="success">
                  Orchestrates
                </Text>
                <ul style={{ margin: 0, padding: "0 0 0 var(--ref-frame-space-4)" }}>
                  {p.orchestrates.map((o, i) => (
                    <li key={i}>
                      <Text role="paragraph-s" as="span">
                        {o}
                      </Text>
                    </li>
                  ))}
                </ul>
              </Stack>
            </Surface>
            <Surface padding="control">
              <Stack gap={2}>
                <Text role="overline" color="danger">
                  Does NOT Own
                </Text>
                <ul style={{ margin: 0, padding: "0 0 0 var(--ref-frame-space-4)" }}>
                  {p.doesNotOwn.map((d, i) => (
                    <li key={i}>
                      <Text role="paragraph-s" as="span">
                        {d}
                      </Text>
                    </li>
                  ))}
                </ul>
              </Stack>
            </Surface>
          </Grid>

          <Stack gap={2}>
            <Text role="overline">Conceptual API</Text>
            <CodeBlock>{p.api}</CodeBlock>
          </Stack>

          <Grid minItemWidth="280px" gap={3}>
            <Surface padding="control">
              <Stack gap={2}>
                <Text role="overline">Components Composed</Text>
                <Inline gap={2} wrap>
                  {p.components.map((c) => (
                    <FlowChip key={c} size="sm">
                      {c}
                    </FlowChip>
                  ))}
                </Inline>
              </Stack>
            </Surface>
            <Surface
              padding="control"
              className="flow-doc-accent"
            >
              <Stack gap={2}>
                <Text role="overline" color="accent">
                  Growth Signals
                </Text>
                <Text role="paragraph-s">{p.growth}</Text>
              </Stack>
            </Surface>
          </Grid>

          {idx < patterns.length - 1 && <Divider spacing={2} />}
        </Stack>
      ))}
    </Stack>
  );
}

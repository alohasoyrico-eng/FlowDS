import {
  CodeBlock,
  Divider,
  FlowChip,
  Grid,
  Inline,
  Stack,
  Surface,
  Text,
} from "@flow/design-system";
import { Callout, PAGE_GAP, PageHeader } from "../components/doc-primitives";
import { LayoutGrid } from "../components/layout-grid";

export function TemplatesPage() {
  const templates = [
    {
      name: "DashboardTemplate",
      purpose:
        "Demonstrates how to compose a data-rich overview page: KPI cards, charts, data tables, and activity feeds arranged in a responsive grid. The template shows the NavigationShellPattern + DataLoadingPattern working together.",
      composition: {
        patterns: ["NavigationShellPattern", "DataLoadingPattern"],
        components: [
          "Sidebar",
          "Topbar",
          "KPI Card",
          "Card",
          "DataTable",
          "Tabs",
          "Badge",
          "Avatar",
        ],
        primitives: ["Surface", "Stack", "Grid", "Text"],
      },
      layout: `┌─────────────────────────────────────────────────┐
│  Sidebar │  Topbar (breadcrumbs + search + user) │
│          ├────────────────────────────────────────┤
│  Nav     │  KPI Row (3-4 KPI Cards in Grid)      │
│  items   ├────────────────────────────────────────┤
│          │  Tabs (Overview | Transactions | ...)  │
│          │  ┌──────────────┐ ┌────────────────── │
│          │  │ Chart Card   │ │ Activity Feed    │ │
│          │  │ (2/3 width)  │ │ (1/3 width)      │ │
│          │  └──────────────┘ └──────────────────┘ │
│          │  DataTable (sortable, paginated)       │
│          │  Pagination                            │
└─────────────────────────────────────────────────┘`,
      density: "Compact (default for data-dense dashboards)",
      responsive:
        "At tablet breakpoint: sidebar collapses to icon-only. At mobile: sidebar becomes BottomNav, KPI row scrolls horizontally, chart/feed stack vertically.",
    },
    {
      name: "SettingsTemplate",
      purpose:
        "Demonstrates a multi-section settings page: grouped form fields with save behavior, toggles for preferences, and destructive actions (account deletion) with ConfirmationPattern. Shows FormPattern orchestrating multiple form sections.",
      composition: {
        patterns: ["FormPattern", "ConfirmationPattern", "NavigationShellPattern"],
        components: [
          "TextField",
          "TextArea",
          "Select",
          "Switch",
          "Radio",
          "Button",
          "Card",
          "Avatar",
          "Divider",
          "Dialog",
        ],
        primitives: ["Surface", "Stack", "Grid", "Text", "ActionSurface"],
      },
      layout: `┌──────────────────────────────────────────────┐
│  Sidebar │  Topbar (Settings > Profile)        │
│          ├─────────────────────────────────────┤
│  Nav     │  Section: Profile                   │
│          │  ┌─ Avatar upload ──────────────┐   │
│          │  │  Name, Email, Bio fields     │   │
│          │  │  [Save changes] button       │   │
│          │  └──────────────────────────────┘   │
│          │  Divider                            │
│          │  Section: Preferences               │
│          │  ┌─ Notification toggles ───────┐   │
│          │  │  Theme selector (Radio)      │   │
│          │  │  Density selector (Radio)    │   │
│          │  └──────────────────────────────┘   │
│          │  Divider                            │
│          │  Section: Danger Zone               │
│          │  ┌─ Delete account (destructive) ┐  │
│          │  └──────────────────────────────┘   │
└──────────────────────────────────────────────┘`,
      density: "Default",
      responsive:
        "At mobile: fullscreen form sections, sticky save button at bottom. Each section becomes a separate FullscreenSheet on navigation.",
    },
    {
      name: "AuthTemplate",
      purpose:
        "Demonstrates authentication flows: sign in, sign up, forgot password, OTP verification. Shows FormPattern with validation, OTP Input, and multi-step flow management. Centered card layout with minimal chrome.",
      composition: {
        patterns: ["FormPattern"],
        components: [
          "TextField",
          "Button",
          "Checkbox",
          "OTP Input",
          "Card",
          "Divider",
          "ProgressBar",
        ],
        primitives: ["Surface", "Stack", "Text"],
      },
      layout: `┌───────────────────────────────────────┐
│                                       │
│         ┌─────────────────┐           │
│         │  Logo            │          │
│         │  Title           │          │
│         │  Description     │          │
│         │                  │          │
│         │  Email field     │          │
│         │  Password field  │          │
│         │  [Remember me]   │          │
│         │                  │          │
│         │  [Sign in]       │          │
│         │  ── or ──        │          │
│         │  [Continue w/SSO]│          │
│         │                  │          │
│         │  Forgot? / Sign up          │
│         └─────────────────┘           │
│                                       │
└───────────────────────────────────────┘`,
      density: "Comfortable (generous spacing for focused task)",
      responsive:
        "Mobile: card becomes full-bleed. Logo stays centered. Action buttons become full-width. Generous touch targets.",
    },
    {
      name: "DataExplorerTemplate",
      purpose:
        "Demonstrates a full data exploration interface: toolbar with filters, sortable/selectable data table, detail panel (drawer), and bulk actions. Shows SelectionPattern + DataLoadingPattern + NavigationShellPattern composing a complex workspace.",
      composition: {
        patterns: ["SelectionPattern", "DataLoadingPattern", "NavigationShellPattern"],
        components: [
          "Toolbar",
          "AdvancedFilters",
          "DataTable",
          "Pagination",
          "DrawerAdapter",
          "Chip",
          "Badge",
          "ContextMenu",
          "Skeleton",
        ],
        primitives: ["Surface", "Stack", "Inline", "Grid", "Text", "ActionSurface"],
      },
      layout: `┌─────────────────────────────────────────────────┐
│  Sidebar │  Topbar                               │
│          ├────────────────────────────────────────┤
│          │  Toolbar (filters + search + actions)  │
│          │  Active filter chips                   │
│          ├────────────────────────────────────────┤
│          │  DataTable (selectable, sortable)      │
│          │  ┌─────────────┐                       │
│          │  │ Row actions  │ (context menu)       │
│          │  └─────────────┘                       │
│          │  Pagination (bottom)                   │
│          ├────────────────────────────────────────┤
│          │  Detail Drawer (slides from right)     │
│          │  └── shows selected row details        │
└─────────────────────────────────────────────────┘`,
      density: "Compact (data-dense, many rows visible)",
      responsive:
        "At mobile: toolbar becomes bottom action bar, table becomes card list, detail drawer becomes FullscreenSheet, filters open in BottomSheet.",
    },
  ];

  return (
    <LayoutGrid>
      <LayoutGrid.Item span={12} className="component-detail-surface-wrapper">
        <Surface variant="secondary" radius="surface" className="component-detail-surface">
          <Stack gap={PAGE_GAP}>
            <PageHeader chapter="Chapter 12 — Layer 5" title="Templates">
              Templates are page-level compositions at Layer 5. They demonstrate how components and
              patterns compose into complete pages, but they <strong>do not define rules</strong>.
              Templates are reference implementations — examples of correct system usage that teams
              can copy and adapt.
            </PageHeader>

            <Callout>
              <Text variant="paragraph-s" color="accent">
                <strong>Layer Rule:</strong> Templates demonstrate usage, not define rules. They
                carry no authority over component API or behavior. A DashboardTemplate shows one
                correct way to build a dashboard — teams may compose differently while staying
                within system rules.
              </Text>
            </Callout>

            {templates.map((t, idx) => (
              <Stack key={t.name} gap={3}>
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
                    <Text variant="heading-m" color="tertiary">
                      &#11043;
                    </Text>
                  </Inline>
                  <Stack gap={1}>
                    <Text variant="heading-l">{t.name}</Text>
                    <FlowChip size="sm">TEMPLATE</FlowChip>
                  </Stack>
                </Inline>

                <Surface padding="control">
                  <Stack gap={2}>
                    <Text variant="overline">Purpose</Text>
                    <Text variant="paragraph-s">{t.purpose}</Text>
                  </Stack>
                </Surface>

                {/* Composition */}
                <Grid minItemWidth="200px" gap={3}>
                  <Surface padding="control">
                    <Stack gap={2}>
                      <Text variant="overline">Patterns Used</Text>
                      <Stack gap={1}>
                        {t.composition.patterns.map((p) => (
                          <FlowChip key={p} variant="filled" status="info" size="sm">
                            {p}
                          </FlowChip>
                        ))}
                      </Stack>
                    </Stack>
                  </Surface>
                  <Surface padding="control">
                    <Stack gap={2}>
                      <Text variant="overline">Components</Text>
                      <Inline gap={1} wrap>
                        {t.composition.components.map((c) => (
                          <FlowChip key={c} size="sm">
                            {c}
                          </FlowChip>
                        ))}
                      </Inline>
                    </Stack>
                  </Surface>
                  <Surface padding="control">
                    <Stack gap={2}>
                      <Text variant="overline">Primitives</Text>
                      <Inline gap={1} wrap>
                        {t.composition.primitives.map((p) => (
                          <FlowChip key={p} size="sm">
                            {p}
                          </FlowChip>
                        ))}
                      </Inline>
                    </Stack>
                  </Surface>
                </Grid>

                {/* Layout */}
                <Stack gap={2}>
                  <Text variant="overline">Layout Structure</Text>
                  <CodeBlock>{t.layout}</CodeBlock>
                </Stack>

                <Grid minItemWidth="280px" gap={3}>
                  <Surface padding="control">
                    <Stack gap={2}>
                      <Text variant="overline">Default Density</Text>
                      <Text variant="paragraph-s">{t.density}</Text>
                    </Stack>
                  </Surface>
                  <Surface padding="control" className="flow-doc-accent">
                    <Stack gap={2}>
                      <Text variant="overline" color="accent">
                        Responsive Behavior
                      </Text>
                      <Text variant="paragraph-s">{t.responsive}</Text>
                    </Stack>
                  </Surface>
                </Grid>

                {idx < templates.length - 1 && <Divider spacing={2} />}
              </Stack>
            ))}
          </Stack>
        </Surface>
      </LayoutGrid.Item>
    </LayoutGrid>
  );
}

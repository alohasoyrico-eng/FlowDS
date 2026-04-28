/**
 * FLOW - Display Domain Demos
 * Demo functions for display components (FlowList, FlowChip, FlowTag, FlowBadge, FlowCard, FlowAvatar, FlowTable, FlowKPITrendIndicator, FlowTreeView)
 */
import { useState } from "react";

import {
  FlowAvatar,
  FlowBadge,
  FlowCard,
  FlowChip,
  FlowKPITrendIndicator,
  FlowList,
  FlowListItem,
  FlowSkeleton,
  FlowTable,
  type FlowTableColumn,
  FlowTag,
  FlowTreeView,
  Inline,
  Stack,
  Text,
  type TreeNode,
} from "@flow/design-system";
import { FlowIcon } from "@flow/primitives";
import { DemoGroup, DemoSection } from "../../../components/demo-helpers";
import { Callout } from "../../../components/doc-primitives";
import { SIZES } from "../types";
import { LayoutGrid } from "../../../components/layout-grid";
import { DemoCell, statesGridProps, useDemoSize } from "../../../templates/component-doc-template";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowList Demos
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function FlowListOverview() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <Stack gap={6}>
      <DemoSection
        title="Basic List"
        description="Semantic <ul> with list items. Supports dividers between items."
      >
        <DemoGroup>
          <FlowList className="demo-content-frame">
            <FlowListItem primary="Home" />
            <FlowListItem primary="Settings" />
            <FlowListItem primary="Profile" />
          </FlowList>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="With Dividers"
        description="Optional dividers between list items for visual separation."
      >
        <DemoGroup>
          <FlowList dividers className="demo-content-frame">
            <FlowListItem primary="Inbox" />
            <FlowListItem primary="Drafts" />
            <FlowListItem primary="Sent" />
            <FlowListItem primary="Trash" />
          </FlowList>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Multi-line Items"
        description="List items support primary, secondary, and tertiary text lines."
      >
        <DemoGroup>
          <FlowList dividers className="demo-content-frame">
            <FlowListItem primary="Jane Cooper" secondary="Product Designer" />
            <FlowListItem
              primary="Wade Warren"
              secondary="Software Engineer"
              tertiary="San Francisco, CA"
            />
            <FlowListItem primary="Esther Howard" secondary="Marketing Manager" />
          </FlowList>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="With Leading Elements"
        description="List items can have leading icons, avatars, or other elements."
      >
        <DemoGroup>
          <FlowList dividers className="demo-content-frame">
            <FlowListItem
              leading={<FlowIcon name="home" />}
              primary="Home"
              secondary="Main dashboard"
            />
            <FlowListItem
              leading={<FlowIcon name="settings" />}
              primary="Settings"
              secondary="Manage preferences"
            />
            <FlowListItem
              leading={<FlowIcon name="user" />}
              primary="Profile"
              secondary="Edit your profile"
            />
          </FlowList>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Interactive Lists"
        description="List items can be interactive with hover, focus, and selection states."
      >
        <DemoGroup>
          <FlowList dividers className="demo-content-frame">
            {["Inbox", "Starred", "Sent", "Drafts", "Trash"].map((label) => (
              <FlowListItem
                key={label}
                primary={label}
                interactive
                selected={selected === label}
                onClick={() => setSelected(label)}
              />
            ))}
          </FlowList>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="With Trailing Elements"
        description="List items can have trailing text, icons, or controls."
      >
        <DemoGroup>
          <FlowList dividers className="demo-content-frame">
            <FlowListItem
              primary="Storage"
              secondary="8.3 GB of 15 GB used"
              trailing={<Text variant="label-m">55%</Text>}
            />
            <FlowListItem
              primary="Updates"
              secondary="Last updated 2 hours ago"
              trailing={<FlowIcon name="chevron-right" />}
            />
          </FlowList>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Accessibility"
        description="FlowList uses semantic <ul> and <li> elements with ARIA roles for screen readers."
      >
        <DemoGroup>
          <Callout intent="info">
            FlowList renders semantic &lt;ul&gt; with role=&apos;list&apos; and optional aria-label.
            FlowListItem renders &lt;li&gt; with role=&apos;option&apos; for interactive items.
            Selected state adds aria-selected=&apos;true&apos;. Keyboard accessible via Tab +
            Enter/Space.
          </Callout>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

export function FlowListVariants() {
  return (
    <Stack gap={6}>
      <DemoSection title="With and Without Dividers" description="Comparison of visual styles.">
        <DemoGroup>
          <Inline gap={4} wrap alignItems="start">
            <div>
              <Text variant="label-m" className="demo-label">
                Without dividers
              </Text>
              <FlowList className="demo-content-frame-sm">
                <FlowListItem primary="Item 1" />
                <FlowListItem primary="Item 2" />
                <FlowListItem primary="Item 3" />
              </FlowList>
            </div>
            <div>
              <Text variant="label-m" className="demo-label">
                With dividers
              </Text>
              <FlowList dividers className="demo-content-frame-sm">
                <FlowListItem primary="Item 1" />
                <FlowListItem primary="Item 2" />
                <FlowListItem primary="Item 3" />
              </FlowList>
            </div>
          </Inline>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="All Text Line Combinations"
        description="Primary, secondary, and tertiary text options."
      >
        <DemoGroup>
          <FlowList dividers className="demo-content-frame">
            <FlowListItem primary="Primary only" />
            <FlowListItem primary="Primary" secondary="Secondary" />
            <FlowListItem primary="Primary" secondary="Secondary" tertiary="Tertiary" />
          </FlowList>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowChip Demos
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function FlowChipOverview() {
  const [chips, setChips] = useState(["Design", "Engineering", "Marketing"]);
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <Stack gap={6}>
      <DemoSection
        title="Chip Variants"
        description="Seven visual variants: default, accent, success, warning, danger, outlined, tonal."
      >
        <DemoGroup>
          <Inline gap={2} wrap>
            <FlowChip variant="filled">Default</FlowChip>
            <FlowChip variant="filled" status="info">
              Accent
            </FlowChip>
            <FlowChip variant="filled" status="success">
              Success
            </FlowChip>
            <FlowChip variant="filled" status="warning">
              Warning
            </FlowChip>
            <FlowChip variant="filled" status="error">
              Danger
            </FlowChip>
            <FlowChip variant="outlined">Outlined</FlowChip>
            <FlowChip variant="tonal">Tonal</FlowChip>
          </Inline>
        </DemoGroup>
      </DemoSection>

      <DemoSection title="Sizes" description="Four size variants: sm, md (default), lg, xl.">
        <DemoGroup>
          <Inline gap={2} wrap alignItems="center">
            <FlowChip size="sm">Small</FlowChip>
            <FlowChip size="md">Medium</FlowChip>
            <FlowChip size="lg">Large</FlowChip>
            <FlowChip size="xl">Extra Large</FlowChip>
          </Inline>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Interactive Chips"
        description="Chips can be clickable with hover and focus states. Selected state shows filled background."
      >
        <DemoGroup>
          <Inline gap={2} wrap>
            {["All", "Active", "Pending", "Completed"].map((label) => (
              <FlowChip
                key={label}
                onClick={() => setSelected(label)}
                selected={selected === label}
              >
                {label}
              </FlowChip>
            ))}
          </Inline>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Removable Chips"
        description="Chips can have remove (×) button for dismissible tags or filters."
      >
        <DemoGroup>
          <Inline gap={2} wrap>
            {chips.map((chip) => (
              <FlowChip
                key={chip}
                variant="tonal"
                removable
                onRemove={() => setChips(chips.filter((c) => c !== chip))}
              >
                {chip}
              </FlowChip>
            ))}
          </Inline>
          {chips.length === 0 && <Text variant="caption">All chips removed</Text>}
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Disabled State"
        description="Chips can be disabled, reducing opacity and preventing interaction."
      >
        <DemoGroup>
          <Inline gap={2} wrap>
            <FlowChip disabled>Disabled</FlowChip>
            <FlowChip variant="filled" status="info" disabled>
              Disabled Accent
            </FlowChip>
            <FlowChip variant="outlined" disabled>
              Disabled Outlined
            </FlowChip>
          </Inline>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Accessibility"
        description="Interactive chips use semantic <button>, non-interactive use <span>. Selected state adds aria-selected."
      >
        <DemoGroup>
          <Callout intent="info">
            FlowChip renders &lt;button&gt; when onClick is provided, otherwise &lt;span&gt;.
            Interactive chips get focus ring and keyboard support (Tab + Enter/Space). Selected
            state adds aria-selected=&apos;true&apos; for screen readers.
          </Callout>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

export function FlowChipVariants() {
  return (
    <Stack gap={6}>
      <DemoSection
        title="All Variants × Sizes"
        description="Complete matrix of variants and sizes."
      >
        <DemoGroup>
          <Stack gap={4}>
            {(["filled", "outlined", "tonal", "filter"] as const).map((variant) => (
              <div key={variant}>
                <Text
                  variant="label-m"
                  className="demo-label"
                  style={{ textTransform: "capitalize" }}
                >
                  {variant}
                </Text>
                <Inline gap={2} wrap>
                  {SIZES.map((size) => (
                    <FlowChip key={size} variant={variant} size={size}>
                      {size.toUpperCase()}
                    </FlowChip>
                  ))}
                </Inline>
              </div>
            ))}
          </Stack>
        </DemoGroup>
      </DemoSection>

      <DemoSection title="Status × Sizes" description="Chips with semantic status colors.">
        <DemoGroup>
          <Stack gap={4}>
            {(["neutral", "info", "success", "warning", "error"] as const).map((status) => (
              <div key={status}>
                <Text
                  variant="label-m"
                  className="demo-label"
                  style={{ textTransform: "capitalize" }}
                >
                  {status}
                </Text>
                <Inline gap={2} wrap>
                  {SIZES.map((size) => (
                    <FlowChip key={size} status={status} size={size}>
                      {size.toUpperCase()}
                    </FlowChip>
                  ))}
                </Inline>
              </div>
            ))}
          </Stack>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Selected vs Unselected"
        description="Visual comparison of selected state."
      >
        <DemoGroup>
          <Stack gap={4}>
            <div>
              <Text variant="label-m" className="demo-label">
                Unselected
              </Text>
              <Inline gap={2} wrap>
                <FlowChip>Default</FlowChip>
                <FlowChip variant="filled" status="info">
                  Accent
                </FlowChip>
                <FlowChip variant="outlined">Outlined</FlowChip>
              </Inline>
            </div>
            <div>
              <Text variant="label-m" className="demo-label">
                Selected
              </Text>
              <Inline gap={2} wrap>
                <FlowChip selected>Default</FlowChip>
                <FlowChip variant="filled" status="info" selected>
                  Accent
                </FlowChip>
                <FlowChip variant="outlined" selected>
                  Outlined
                </FlowChip>
              </Inline>
            </div>
          </Stack>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowTag Demos
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function FlowTagOverview() {
  return (
    <Stack gap={6}>
      <DemoSection
        title="Variant × Status"
        description="Two-axis model: variant (label | code) controls typography, status (neutral | info | success | warning | error) controls semantic color."
      >
        <DemoGroup>
          <Stack gap={3}>
            <div>
              <Text variant="label-m" className="demo-label">
                Label variant (sans-serif)
              </Text>
              <Inline gap={2} wrap>
                <FlowTag>Neutral</FlowTag>
                <FlowTag status="info">Info</FlowTag>
                <FlowTag status="success">Success</FlowTag>
                <FlowTag status="warning">Warning</FlowTag>
                <FlowTag status="error">Error</FlowTag>
              </Inline>
            </div>
            <div>
              <Text variant="label-m" className="demo-label">
                Code variant (monospace)
              </Text>
              <Inline gap={2} wrap>
                <FlowTag variant="code">neutral</FlowTag>
                <FlowTag variant="code" status="info">
                  info
                </FlowTag>
                <FlowTag variant="code" status="success">
                  200 OK
                </FlowTag>
                <FlowTag variant="code" status="warning">
                  deprecated
                </FlowTag>
                <FlowTag variant="code" status="error">
                  500 Error
                </FlowTag>
              </Inline>
            </div>
          </Stack>
        </DemoGroup>
      </DemoSection>

      <DemoSection title="Sizes" description="Four size variants: sm, md (default), lg, xl.">
        <DemoGroup>
          <Inline gap={2} wrap alignItems="center">
            <FlowTag size="sm">Small</FlowTag>
            <FlowTag size="md">Medium</FlowTag>
            <FlowTag size="lg">Large</FlowTag>
            <FlowTag size="xl">Extra Large</FlowTag>
          </Inline>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Semantic Usage"
        description="Tags are non-interactive labels for status, categories, and metadata."
      >
        <DemoGroup>
          <Stack gap={2}>
            <Inline gap={1} alignItems="center">
              <Text variant="label-m">Status:</Text>
              <FlowTag status="success">Active</FlowTag>
            </Inline>
            <Inline gap={1} alignItems="center">
              <Text variant="label-m">Priority:</Text>
              <FlowTag status="error">High</FlowTag>
            </Inline>
            <Inline gap={1} alignItems="center">
              <Text variant="label-m">Type:</Text>
              <FlowTag status="info">Feature</FlowTag>
            </Inline>
            <Inline gap={1} alignItems="center">
              <Text variant="label-m">Code:</Text>
              <FlowTag variant="code">npm install</FlowTag>
            </Inline>
          </Stack>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Real-World Examples"
        description="Tags in context — combined with FlowList to show task priorities, versions, and categories."
      >
        <DemoGroup>
          <FlowList dividers className="demo-content-frame">
            <FlowListItem
              primary="Update authentication flow"
              secondary="Security patch required"
              trailing={
                <Inline gap={1}>
                  <FlowTag status="error" size="sm">
                    Critical
                  </FlowTag>
                  <FlowTag variant="code" size="sm">
                    v2.1.0
                  </FlowTag>
                </Inline>
              }
            />
            <FlowListItem
              primary="Implement dark mode"
              secondary="User-requested feature"
              trailing={
                <Inline gap={1}>
                  <FlowTag status="info" size="sm">
                    Feature
                  </FlowTag>
                  <FlowTag status="success" size="sm">
                    Ready
                  </FlowTag>
                </Inline>
              }
            />
            <FlowListItem
              primary="Refactor API layer"
              secondary="Technical debt reduction"
              trailing={
                <Inline gap={1}>
                  <FlowTag status="warning" size="sm">
                    Medium
                  </FlowTag>
                  <FlowTag size="sm">Backend</FlowTag>
                </Inline>
              }
            />
            <FlowListItem
              primary="Update dependencies"
              secondary="Maintenance task"
              trailing={
                <Inline gap={1}>
                  <FlowTag size="sm">Low</FlowTag>
                  <FlowTag variant="code" size="sm">
                    npm
                  </FlowTag>
                </Inline>
              }
            />
          </FlowList>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Accessibility"
        description="FlowTag is a semantic <span> for non-interactive labels. No focus or interaction states."
      >
        <DemoGroup>
          <Callout intent="info">
            FlowTag renders a semantic &lt;span&gt; and is purely presentational — no hover, focus,
            or click behavior. Use FlowChip for interactive labels and filters. Tags are ideal for
            status indicators, version numbers, and category labels in lists and tables.
          </Callout>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

export function FlowTagVariants() {
  return (
    <Stack gap={6}>
      <DemoSection
        title="Full Matrix: Variant × Status × Size"
        description="Complete combinatorial matrix of the two-axis model across all sizes."
      >
        <DemoGroup>
          <Stack gap={4}>
            {(["label", "code"] as const).map((variant) => (
              <div key={variant}>
                <Text
                  variant="label-l"
                  className="demo-label"
                  style={{ textTransform: "capitalize" }}
                >
                  {variant} variant
                </Text>
                <Stack gap={3}>
                  {(["neutral", "info", "success", "warning", "error"] as const).map((status) => (
                    <div key={status}>
                      <Text
                        variant="caption"
                        className="demo-label"
                        color="secondary"
                        style={{ textTransform: "capitalize" }}
                      >
                        {status}
                      </Text>
                      <Inline gap={2} wrap alignItems="center">
                        {SIZES.map((size) => (
                          <FlowTag key={size} variant={variant} status={status} size={size}>
                            {size.toUpperCase()}
                          </FlowTag>
                        ))}
                      </Inline>
                    </div>
                  ))}
                </Stack>
              </div>
            ))}
          </Stack>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Tag Groups"
        description="Multiple tags together for multi-dimensional metadata."
      >
        <DemoGroup>
          <Stack gap={3}>
            <div>
              <Text variant="label-m" className="demo-label">
                System Status
              </Text>
              <Inline gap={1} wrap>
                <FlowTag status="success" size="sm">
                  API Online
                </FlowTag>
                <FlowTag status="success" size="sm">
                  DB Connected
                </FlowTag>
                <FlowTag status="warning" size="sm">
                  Cache Warming
                </FlowTag>
              </Inline>
            </div>
            <div>
              <Text variant="label-m" className="demo-label">
                Tech Stack
              </Text>
              <Inline gap={1} wrap>
                <FlowTag variant="code" size="sm">
                  React
                </FlowTag>
                <FlowTag variant="code" size="sm">
                  TypeScript
                </FlowTag>
                <FlowTag variant="code" size="sm">
                  Vite
                </FlowTag>
                <FlowTag variant="code" size="sm">
                  Tailwind
                </FlowTag>
              </Inline>
            </div>
            <div>
              <Text variant="label-m" className="demo-label">
                Project Labels
              </Text>
              <Inline gap={1} wrap>
                <FlowTag status="info">Frontend</FlowTag>
                <FlowTag status="error">High Priority</FlowTag>
                <FlowTag>Q1 2026</FlowTag>
              </Inline>
            </div>
          </Stack>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Tags in Cards"
        description="Tags work well inside cards for categorization and status."
      >
        <DemoGroup>
          <LayoutGrid fullBleed>
            <LayoutGrid.Item span={6}>
              <FlowCard elevation={1} padding="lg">
                <Stack gap={2}>
                  <Text variant="heading-m">Authentication Module</Text>
                  <Text variant="paragraph-s" color="secondary">
                    JWT-based auth with refresh tokens and role-based access control
                  </Text>
                  <Inline gap={1} wrap>
                    <FlowTag status="success" size="sm">
                      Production
                    </FlowTag>
                    <FlowTag variant="code" size="sm">
                      v3.2.1
                    </FlowTag>
                    <FlowTag status="info" size="sm">
                      Core
                    </FlowTag>
                  </Inline>
                </Stack>
              </FlowCard>
            </LayoutGrid.Item>
            <LayoutGrid.Item span={6}>
              <FlowCard elevation={1} padding="lg">
                <Stack gap={2}>
                  <Text variant="heading-m">Payment Gateway</Text>
                  <Text variant="paragraph-s" color="secondary">
                    Stripe integration with webhook handling and subscription management
                  </Text>
                  <Inline gap={1} wrap>
                    <FlowTag status="warning" size="sm">
                      Staging
                    </FlowTag>
                    <FlowTag variant="code" size="sm">
                      v1.8.0-beta
                    </FlowTag>
                    <FlowTag status="error" size="sm">
                      Testing
                    </FlowTag>
                  </Inline>
                </Stack>
              </FlowCard>
            </LayoutGrid.Item>
          </LayoutGrid>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowBadge Demos
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function FlowBadgeOverview() {
  const [count, setCount] = useState(3);

  return (
    <Stack gap={6}>
      <DemoSection
        title="Badge Variants"
        description="Two variants: count (shows number) and dot (small indicator)."
      >
        <DemoGroup>
          <Inline gap={4} wrap>
            <FlowBadge content={5}>
              <FlowIcon name="bell" size="lg" />
            </FlowBadge>
            <FlowBadge variant="dot">
              <FlowIcon name="mail" size="lg" />
            </FlowBadge>
          </Inline>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Badge Colors"
        description="Five color variants: default, accent, success, warning, danger."
      >
        <DemoGroup>
          <Inline gap={4} wrap>
            <FlowBadge content={1} status="neutral">
              <FlowIcon name="bell" size="lg" />
            </FlowBadge>
            <FlowBadge content={2} status="info">
              <FlowIcon name="bell" size="lg" />
            </FlowBadge>
            <FlowBadge content={3} status="success">
              <FlowIcon name="bell" size="lg" />
            </FlowBadge>
            <FlowBadge content={4} status="warning">
              <FlowIcon name="bell" size="lg" />
            </FlowBadge>
            <FlowBadge content={5} status="error">
              <FlowIcon name="bell" size="lg" />
            </FlowBadge>
          </Inline>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Max Count"
        description="Badges show '99+' when count exceeds max (default: 99)."
      >
        <DemoGroup>
          <Inline gap={4} wrap>
            <FlowBadge content={99}>
              <FlowIcon name="message-circle" size="lg" />
            </FlowBadge>
            <FlowBadge content={100}>
              <FlowIcon name="message-circle" size="lg" />
            </FlowBadge>
            <FlowBadge content={999}>
              <FlowIcon name="message-circle" size="lg" />
            </FlowBadge>
          </Inline>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Dynamic Badge"
        description="Badges update in real-time as content changes."
      >
        <DemoGroup>
          <Stack gap={2}>
            <FlowBadge content={count} status="error">
              <FlowIcon name="shopping-cart" size="lg" />
            </FlowBadge>
            <Inline gap={2}>
              <button
                onClick={() => setCount(Math.max(0, count - 1))}
                style={{ padding: "var(--ref-frame-space-2) var(--ref-frame-space-4)" }}
              >
                -
              </button>
              <button
                onClick={() => setCount(count + 1)}
                style={{ padding: "var(--ref-frame-space-2) var(--ref-frame-space-4)" }}
              >
                +
              </button>
            </Inline>
          </Stack>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Hidden Badge"
        description="Badges can be hidden when content is zero or via hidden prop."
      >
        <DemoGroup>
          <Inline gap={4} wrap>
            <FlowBadge content={0}>
              <FlowIcon name="bell" size="lg" />
            </FlowBadge>
            <FlowBadge content={5} hidden>
              <FlowIcon name="bell" size="lg" />
            </FlowBadge>
          </Inline>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Standalone Badge"
        description="Badges can be used without a wrapper element."
      >
        <DemoGroup>
          <Inline gap={2} wrap>
            <FlowBadge content={12} standalone />
            <FlowBadge variant="dot" status="success" standalone />
            <FlowBadge content="New" standalone status="info" />
          </Inline>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Accessibility"
        description="Badges are visual indicators. Ensure parent element has appropriate aria-label."
      >
        <DemoGroup>
          <Callout intent="info">
            FlowBadge is purely visual — ensure the parent element (button, icon) has descriptive
            aria-label including the badge content (e.g., &apos;Notifications, 5 unread&apos;).
            Badges use absolute positioning within a relative wrapper.
          </Callout>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

export function FlowBadgeVariants() {
  return (
    <Stack gap={6}>
      <DemoSection
        title="All Colors × Variants"
        description="Complete matrix of colors and variants."
      >
        <DemoGroup>
          <Stack gap={4}>
            {(["neutral", "info", "success", "warning", "error"] as const).map((status) => (
              <div key={status}>
                <Text
                  variant="label-m"
                  style={{
                    marginBottom: "var(--ref-frame-space-2)",
                    display: "block",
                    textTransform: "capitalize",
                  }}
                >
                  {status}
                </Text>
                <Inline gap={4} wrap>
                  <FlowBadge content={5} status={status}>
                    <FlowIcon name="bell" size="lg" />
                  </FlowBadge>
                  <FlowBadge variant="dot" status={status}>
                    <FlowIcon name="bell" size="lg" />
                  </FlowBadge>
                </Inline>
              </div>
            ))}
          </Stack>
        </DemoGroup>
      </DemoSection>

      <DemoSection title="Count Ranges" description="How badges display different count values.">
        <DemoGroup>
          <Inline gap={4} wrap>
            <FlowBadge content={0}>
              <FlowIcon name="bell" size="lg" />
            </FlowBadge>
            <FlowBadge content={1}>
              <FlowIcon name="bell" size="lg" />
            </FlowBadge>
            <FlowBadge content={9}>
              <FlowIcon name="bell" size="lg" />
            </FlowBadge>
            <FlowBadge content={99}>
              <FlowIcon name="bell" size="lg" />
            </FlowBadge>
            <FlowBadge content={100}>
              <FlowIcon name="bell" size="lg" />
            </FlowBadge>
            <FlowBadge content={999}>
              <FlowIcon name="bell" size="lg" />
            </FlowBadge>
          </Inline>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowCard Demos
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function FlowCardOverview() {
  const [selected, setSelected] = useState<string | null>(null);
  const demoSize = useDemoSize();

  return (
    <Stack gap="section">
      {/* Rich content cards with accent variants */}
      <DemoSection
        title="Semantic Accent Cards"
        description="Six semantic accent colors for contextual meaning — ideal for dashboard summaries, status sections, and feature highlights."
      >
        <DemoGroup>
          <LayoutGrid fullBleed>
            {(
              [
                {
                  status: "info",
                  icon: "⚡",
                  title: "Action",
                  desc: "Interactive elements — buttons, links, controls",
                  stat: "12 active",
                },
                {
                  status: "success",
                  icon: "✔",
                  title: "Success",
                  desc: "Positive outcomes — confirmations, completed states",
                  stat: "+18%",
                },
                {
                  status: "warning",
                  icon: "▲",
                  title: "Warning",
                  desc: "Caution states — limits, degraded conditions",
                  stat: "3 alerts",
                },
                {
                  status: "error",
                  icon: "✕",
                  title: "Error",
                  desc: "Failures — validation errors, blocked actions",
                  stat: "2 issues",
                },
                {
                  status: "info",
                  icon: "ℹ",
                  title: "Info",
                  desc: "Informational notes, tips, and guidance",
                  stat: "5 new",
                },
                {
                  status: "neutral",
                  icon: "◻",
                  title: "Surface",
                  desc: "Backgrounds — content layering, visual depth",
                  stat: "Default",
                },
              ] as const
            ).map((item) => (
              <LayoutGrid.Item key={item.status} span={4}>
                <FlowCard elevation={1} status={item.status} padding="lg">
                  <Stack gap={3}>
                    <Text variant="display-s">{item.icon}</Text>
                    <Stack gap={1}>
                      <Text variant="label-l">{item.title}</Text>
                      <Text variant="paragraph-s" color="secondary">
                        {item.desc}
                      </Text>
                    </Stack>
                    <Text variant="label-m" color="tertiary">
                      {item.stat}
                    </Text>
                  </Stack>
                </FlowCard>
              </LayoutGrid.Item>
            ))}
          </LayoutGrid>
        </DemoGroup>
      </DemoSection>

      {/* Interactive selection cards */}
      <DemoSection
        title="Interactive Selection Cards"
        description={`Clickable cards with hover/press states and selection support. Click to select. Shown at size="${demoSize}".`}
      >
        <DemoGroup>
          <LayoutGrid fullBleed>
            {(["analytics", "reports", "settings"] as const).map((id) => (
              <LayoutGrid.Item key={id} span={4}>
                <FlowCard
                  interactive
                  selected={selected === id}
                  onClick={() => setSelected(selected === id ? null : id)}
                  padding="lg"
                >
                  <Stack gap={3}>
                    <Text variant="heading-m" style={{ textTransform: "capitalize" }}>
                      {id}
                    </Text>
                    <Text variant="paragraph-s">
                      {id === "analytics" && "View metrics and KPIs"}
                      {id === "reports" && "Generate custom reports"}
                      {id === "settings" && "Configure preferences"}
                    </Text>
                    <Inline gap={2} alignItems="center">
                      <FlowChip size="sm" variant="tonal">
                        {id}
                      </FlowChip>
                      {selected === id && (
                        <FlowChip size="sm" variant="filled" status="info">
                          selected
                        </FlowChip>
                      )}
                    </Inline>
                  </Stack>
                </FlowCard>
              </LayoutGrid.Item>
            ))}
          </LayoutGrid>
        </DemoGroup>
      </DemoSection>

      {/* Elevation levels */}
      <DemoSection
        title="Elevation Levels"
        description="Cards support elevation 0 (outlined with border) or 1+ (elevated with shadow) for depth hierarchy."
      >
        <DemoGroup>
          <LayoutGrid fullBleed>
            {[0, 1, 2, 3].map((elevation) => (
              <LayoutGrid.Item key={elevation} span={3}>
                <DemoCell label={`elevation ${elevation}`}>
                  <FlowCard elevation={elevation} padding="md">
                    <Stack gap={2}>
                      <Text variant="label-m">Elevation {elevation}</Text>
                      <Text variant="paragraph-s">
                        {elevation === 0 && "Border instead of shadow"}
                        {elevation === 1 && "Subtle shadow (default)"}
                        {elevation === 2 && "Medium shadow"}
                        {elevation === 3 && "High shadow"}
                      </Text>
                    </Stack>
                  </FlowCard>
                </DemoCell>
              </LayoutGrid.Item>
            ))}
          </LayoutGrid>
        </DemoGroup>
      </DemoSection>

      {/* States showcase */}
      <DemoSection
        title="States"
        description="Default, hover, focus-visible, pressed, selected states. Interactive cards render as semantic buttons."
      >
        <DemoGroup>
          <div {...statesGridProps(demoSize)}>
            <DemoCell label="Static">
              <FlowCard padding="md">
                <Text variant="paragraph-m">Static card</Text>
              </FlowCard>
            </DemoCell>
            <DemoCell label="Interactive">
              <FlowCard interactive padding="md" onClick={() => {}}>
                <Text variant="paragraph-m">Interactive</Text>
              </FlowCard>
            </DemoCell>
            <DemoCell label="Hover">
              <FlowCard interactive padding="md" data-demo-state="hover" onClick={() => {}}>
                <Text variant="paragraph-m">Hover</Text>
              </FlowCard>
            </DemoCell>
            <DemoCell label="Focus">
              <FlowCard interactive padding="md" data-demo-state="focus" onClick={() => {}}>
                <Text variant="paragraph-m">Focus</Text>
              </FlowCard>
            </DemoCell>
            <DemoCell label="Selected">
              <FlowCard interactive selected padding="md" onClick={() => {}}>
                <Text variant="paragraph-m">Selected</Text>
              </FlowCard>
            </DemoCell>
          </div>
        </DemoGroup>
      </DemoSection>

      {/* Accessibility */}
      <DemoSection
        title="Accessibility"
        description="FlowCard adapts semantics based on interactivity for optimal screen reader experience."
      >
        <DemoGroup>
          <Callout intent="info">
            FlowCard renders as &lt;div&gt; when static, or &lt;button&gt; when interactive prop is
            present. Interactive cards get full keyboard support (Tab + Enter/Space), focus ring,
            and hover states. Selected state adds aria-selected=&apos;true&apos;. Ensure interactive
            cards have meaningful text content for screen readers.
          </Callout>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

export function FlowCardVariants() {
  const _demoSize = useDemoSize();

  return (
    <Stack gap="section">
      {/* Padding sizes */}
      <DemoSection
        title="Padding Variants"
        description="Four padding sizes: sm, md (default), lg, xl. Controls inner spacing and content density."
      >
        <DemoGroup>
          <LayoutGrid fullBleed>
            {(["sm", "md", "lg", "xl"] as const).map((padding) => (
              <LayoutGrid.Item key={padding} span={3}>
                <DemoCell label={padding}>
                  <FlowCard padding={padding}>
                    <Stack gap={1}>
                      <Text variant="label-m">Padding {padding}</Text>
                      <Text variant="paragraph-s">Inner spacing scales with size</Text>
                    </Stack>
                  </FlowCard>
                </DemoCell>
              </LayoutGrid.Item>
            ))}
          </LayoutGrid>
        </DemoGroup>
      </DemoSection>

      {/* Real-world examples */}
      <DemoSection
        title="Real-World Card Examples"
        description="Common card patterns: user profiles, product listings, feature highlights, stats cards."
      >
        <DemoGroup>
          <LayoutGrid fullBleed>
            {/* User profile card */}
            <LayoutGrid.Item span={4}>
              <FlowCard interactive padding="lg">
                <Stack gap={3}>
                  <Inline gap={3} alignItems="center">
                    <FlowAvatar size="lg" initials="JC" />
                    <Stack gap={1}>
                      <Text variant="label-l">Jane Cooper</Text>
                      <Text variant="paragraph-s" color="secondary">
                        Product Designer
                      </Text>
                    </Stack>
                  </Inline>
                  <Inline gap={2} wrap>
                    <FlowChip size="sm" variant="tonal">
                      Design
                    </FlowChip>
                    <FlowChip size="sm" variant="tonal">
                      React
                    </FlowChip>
                    <FlowChip size="sm" variant="tonal">
                      Figma
                    </FlowChip>
                  </Inline>
                </Stack>
              </FlowCard>
            </LayoutGrid.Item>

            {/* Stats card */}
            <LayoutGrid.Item span={4}>
              <FlowCard elevation={1} status="success" padding="lg">
                <Stack gap={3}>
                  <Stack gap={1}>
                    <Text variant="caption" color="tertiary">
                      Revenue
                    </Text>
                    <Text variant="display-s">$45,230</Text>
                  </Stack>
                  <FlowKPITrendIndicator value="+12.5%" direction="up" label="vs last month" />
                </Stack>
              </FlowCard>
            </LayoutGrid.Item>

            {/* Feature highlight */}
            <LayoutGrid.Item span={4}>
              <FlowCard elevation={2} status="info" padding="lg">
                <Stack gap={3}>
                  <Text variant="display-s">ℹ</Text>
                  <Stack gap={1}>
                    <Text variant="label-l">New Feature</Text>
                    <Text variant="paragraph-s">Advanced analytics dashboard now available</Text>
                  </Stack>
                  <FlowChip size="sm" variant="filled" status="info">
                    New
                  </FlowChip>
                </Stack>
              </FlowCard>
            </LayoutGrid.Item>
          </LayoutGrid>
        </DemoGroup>
      </DemoSection>

      {/* Accent × Elevation combinations */}
      <DemoSection
        title="Accent × Elevation Matrix"
        description="All accent variants at different elevations. Demonstrates full visual range."
      >
        <DemoGroup>
          <Stack gap={4}>
            {(["info", "success", "warning", "error", "neutral"] as const).map((status) => (
              <div key={status}>
                <Text
                  variant="label-m"
                  style={{
                    marginBottom: "var(--ref-frame-space-2)",
                    display: "block",
                    textTransform: "capitalize",
                  }}
                >
                  {status}
                </Text>
                <Inline gap={2} wrap>
                  {[0, 1, 2].map((elevation) => (
                    <FlowCard key={elevation} status={status} elevation={elevation} padding="sm">
                      <Text variant="paragraph-s">Elevation {elevation}</Text>
                    </FlowCard>
                  ))}
                </Inline>
              </div>
            ))}
          </Stack>
        </DemoGroup>
      </DemoSection>

      {/* Loading state */}
      <DemoSection
        title="Loading State with Skeleton"
        description="Cards can show skeleton loading states while async content loads."
      >
        <DemoGroup>
          <LayoutGrid fullBleed>
            {[1, 2, 3].map((i) => (
              <LayoutGrid.Item key={i} span={4}>
                <FlowCard elevation={1} padding="lg">
                  <Stack gap={2}>
                    <FlowSkeleton variant="text" lines={1} />
                    <FlowSkeleton variant="text" lines={2} />
                  </Stack>
                </FlowCard>
              </LayoutGrid.Item>
            ))}
          </LayoutGrid>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowAvatar Demos
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function FlowAvatarOverview() {
  const demoSize = useDemoSize();

  return (
    <Stack gap="section">
      {/* Sizes — 4 × span{3} siempre muestra todos */}
      <DemoSection
        title="Sizes"
        description="Four size variants: sm, md (default), lg, xl. Controls diameter and font size."
      >
        <DemoGroup>
          <LayoutGrid fullBleed>
            {(["sm", "md", "lg", "xl"] as const).map((size) => (
              <LayoutGrid.Item key={size} span={3}>
                <DemoCell label={size}>
                  <FlowAvatar size={size} initials="JD" />
                </DemoCell>
              </LayoutGrid.Item>
            ))}
          </LayoutGrid>
        </DemoGroup>
      </DemoSection>

      {/* Types — usa demoSize */}
      <DemoSection
        title="Avatar Types"
        description={`Image, initials, and icon fallback. Shown at size="${demoSize}".`}
      >
        <DemoGroup>
          <div {...statesGridProps(demoSize)}>
            <DemoCell label="Image">
              <FlowAvatar size={demoSize} src="https://i.pravatar.cc/150?img=1" alt="User avatar" />
            </DemoCell>
            <DemoCell label="Initials">
              <FlowAvatar size={demoSize} initials="JD" />
            </DemoCell>
            <DemoCell label="Icon">
              <FlowAvatar size={demoSize} icon="user" />
            </DemoCell>
          </div>
        </DemoGroup>
      </DemoSection>

      {/* Shapes */}
      <DemoSection
        title="Shapes"
        description={`Circle (default) and square variants. Shown at size="${demoSize}".`}
      >
        <DemoGroup>
          <Inline gap={4} wrap>
            <DemoCell label="Circle">
              <FlowAvatar size={demoSize} initials="AB" shape="circle" />
            </DemoCell>
            <DemoCell label="Square">
              <FlowAvatar size={demoSize} initials="CD" shape="square" />
            </DemoCell>
          </Inline>
        </DemoGroup>
      </DemoSection>

      {/* Status indicators */}
      <DemoSection
        title="Status Indicators"
        description={`Online, offline, away, and busy status dots. Shown at size="${demoSize}".`}
      >
        <DemoGroup>
          <div {...statesGridProps(demoSize)}>
            <DemoCell label="Online">
              <FlowAvatar size={demoSize} initials="JD" status="online" />
            </DemoCell>
            <DemoCell label="Offline">
              <FlowAvatar size={demoSize} initials="AB" status="offline" />
            </DemoCell>
            <DemoCell label="Away">
              <FlowAvatar size={demoSize} initials="CD" status="away" />
            </DemoCell>
            <DemoCell label="Busy">
              <FlowAvatar size={demoSize} initials="EF" status="busy" />
            </DemoCell>
          </div>
        </DemoGroup>
      </DemoSection>

      {/* Accessibility */}
      <DemoSection
        title="Accessibility"
        description="FlowAvatar requires proper alt text for images and aria-label for status indicators."
      >
        <DemoGroup>
          <Callout intent="info">
            FlowAvatar renders &lt;img&gt; when src is provided (requires alt prop for screen
            readers). Initials and icon modes render as &lt;div&gt; with role=&apos;img&apos; and
            aria-label. Status indicators use absolute positioning and should be described in parent
            aria-label (e.g., &apos;Jane Doe, online&apos;).
          </Callout>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

export function FlowAvatarVariants() {
  return (
    <Stack gap="section">
      {/* Sizes × Shapes */}
      <DemoSection title="All Sizes × Shapes" description="Complete matrix of sizes and shapes.">
        <DemoGroup>
          <Stack gap={4}>
            {(["circle", "square"] as const).map((shape) => (
              <div key={shape}>
                <Text
                  variant="label-m"
                  style={{
                    marginBottom: "var(--ref-frame-space-2)",
                    display: "block",
                    textTransform: "capitalize",
                  }}
                >
                  {shape}
                </Text>
                <Inline gap={2} wrap>
                  {(["sm", "md", "lg", "xl"] as const).map((size) => (
                    <FlowAvatar
                      key={size}
                      size={size}
                      shape={shape}
                      initials={size.toUpperCase()}
                    />
                  ))}
                </Inline>
              </div>
            ))}
          </Stack>
        </DemoGroup>
      </DemoSection>

      {/* Status × Sizes */}
      <DemoSection title="Status × Sizes" description="Status indicators scale with avatar size.">
        <DemoGroup>
          <Stack gap={4}>
            {(["online", "offline", "away", "busy"] as const).map((status) => (
              <div key={status}>
                <Text
                  variant="label-m"
                  style={{
                    marginBottom: "var(--ref-frame-space-2)",
                    display: "block",
                    textTransform: "capitalize",
                  }}
                >
                  {status}
                </Text>
                <Inline gap={2} wrap alignItems="center">
                  {(["sm", "md", "lg", "xl"] as const).map((size) => (
                    <FlowAvatar key={size} size={size} initials="JD" status={status} />
                  ))}
                </Inline>
              </div>
            ))}
          </Stack>
        </DemoGroup>
      </DemoSection>

      {/* Image fallback */}
      <DemoSection
        title="Image Fallback Behavior"
        description="Avatars gracefully fall back to initials when image fails to load."
      >
        <DemoGroup>
          <Inline gap={4} wrap>
            <DemoCell label="Valid image">
              <FlowAvatar src="https://i.pravatar.cc/150?img=5" alt="User" initials="JD" />
            </DemoCell>
            <DemoCell label="Broken image">
              <FlowAvatar src="https://invalid-url.test/image.jpg" alt="User" initials="JD" />
            </DemoCell>
            <DemoCell label="No image">
              <FlowAvatar initials="AB" />
            </DemoCell>
          </Inline>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowTable Demos
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

interface SampleUser {
  id: string;
  name: string;
  role: string;
  status: string;
  email: string;
}

const sampleUsers: SampleUser[] = [
  {
    id: "1",
    name: "Jane Cooper",
    role: "Product Designer",
    status: "Active",
    email: "jane@example.com",
  },
  {
    id: "2",
    name: "Wade Warren",
    role: "Software Engineer",
    status: "Active",
    email: "wade@example.com",
  },
  {
    id: "3",
    name: "Esther Howard",
    role: "Marketing Manager",
    status: "Away",
    email: "esther@example.com",
  },
  {
    id: "4",
    name: "Cameron Williamson",
    role: "Design Lead",
    status: "Offline",
    email: "cameron@example.com",
  },
];

export function FlowTableOverview() {
  const _demoSize = useDemoSize();

  const columns: FlowTableColumn<SampleUser>[] = [
    { key: "name", header: "Name", width: "25%" },
    { key: "role", header: "Role", width: "30%" },
    { key: "status", header: "Status", width: "20%" },
    { key: "email", header: "Email", width: "25%" },
  ];

  return (
    <Stack gap="section">
      {/* Basic table */}
      <DemoSection
        title="Basic Table"
        description="Simple presentational table with column headers and data rows."
      >
        <DemoGroup>
          <FlowTable columns={columns} data={sampleUsers} rowKey={(row) => row.id} />
        </DemoGroup>
      </DemoSection>

      {/* With caption */}
      <DemoSection
        title="Table with Caption"
        description="Optional caption provides context for screen readers."
      >
        <DemoGroup>
          <FlowTable
            columns={columns}
            data={sampleUsers}
            rowKey={(row) => row.id}
            caption="Team members and their current status"
          />
        </DemoGroup>
      </DemoSection>

      {/* Custom cell rendering */}
      <DemoSection
        title="Custom Cell Rendering"
        description="Column render functions allow custom content per cell."
      >
        <DemoGroup>
          <FlowTable
            columns={[
              {
                key: "name",
                header: "Name",
                width: "30%",
                render: (row) => (
                  <Inline gap={2} alignItems="center">
                    <FlowAvatar
                      size="sm"
                      initials={row.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    />
                    <Text variant="label-m">{row.name}</Text>
                  </Inline>
                ),
              },
              { key: "role", header: "Role", width: "35%" },
              {
                key: "status",
                header: "Status",
                width: "20%",
                render: (row) => (
                  <FlowTag
                    status={
                      (row as { status: string }).status === "Active"
                        ? "success"
                        : (row as { status: string }).status === "Away"
                          ? "warning"
                          : "neutral"
                    }
                    size="sm"
                  >
                    {row.status}
                  </FlowTag>
                ),
              },
              { key: "email", header: "Email", width: "15%", cellRole: "code" },
            ]}
            data={sampleUsers}
            rowKey={(row) => row.id}
          />
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

export function FlowTableVariants() {
  const columns: FlowTableColumn<SampleUser>[] = [
    { key: "name", header: "Name" },
    { key: "role", header: "Role" },
    { key: "status", header: "Status" },
  ];

  const minimalData = sampleUsers.slice(0, 2);

  return (
    <Stack gap="section">
      {/* Empty state */}
      <DemoSection title="Empty Table" description="Table with no data shows empty state message.">
        <DemoGroup>
          <FlowTable columns={columns} data={[]} emptyMessage="No users found" />
        </DemoGroup>
      </DemoSection>

      {/* Cell roles */}
      <DemoSection
        title="Cell Text Roles"
        description="Different text styles for cells: default, code, caption, bold."
      >
        <DemoGroup>
          <FlowTable
            columns={[
              { key: "name", header: "Default", cellRole: "default" },
              { key: "role", header: "Bold", cellRole: "bold" },
              { key: "status", header: "Code", cellRole: "code" },
              { key: "email", header: "Caption", cellRole: "caption" },
            ]}
            data={minimalData}
            rowKey={(row) => row.id}
          />
        </DemoGroup>
      </DemoSection>

      {/* Column widths */}
      <DemoSection
        title="Column Width Control"
        description="Explicit width props control column sizing."
      >
        <DemoGroup>
          <FlowTable
            columns={[
              { key: "name", header: "Name (50%)", width: "50%" },
              { key: "role", header: "Role (30%)", width: "30%" },
              { key: "status", header: "Status (20%)", width: "20%" },
            ]}
            data={minimalData}
            rowKey={(row) => row.id}
          />
        </DemoGroup>
      </DemoSection>

      {/* Accessibility */}
      <DemoSection
        title="Accessibility"
        description="FlowTable uses semantic HTML table elements with proper ARIA roles for screen readers."
      >
        <DemoGroup>
          <Callout intent="info">
            FlowTable renders semantic &lt;table&gt; with role=&apos;table&apos;,
            &lt;thead&gt;/&lt;tbody&gt;, and proper &lt;th&gt; headers with scope=&apos;col&apos;.
            Optional caption prop adds &lt;caption&gt; for context. Custom render functions should
            maintain semantic text hierarchy for screen readers.
          </Callout>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowKPITrendIndicator Demos
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function FlowKPITrendIndicatorOverview() {
  const demoSize = useDemoSize();

  return (
    <Stack gap="section">
      {/* Directions */}
      <DemoSection
        title="Trend Directions"
        description="Three directions: up, down, neutral. Each with icon and semantic color."
      >
        <DemoGroup>
          <div {...statesGridProps(demoSize)}>
            <DemoCell label="Up">
              <FlowKPITrendIndicator value="+12.5%" direction="up" />
            </DemoCell>
            <DemoCell label="Down">
              <FlowKPITrendIndicator value="-8.3%" direction="down" />
            </DemoCell>
            <DemoCell label="Neutral">
              <FlowKPITrendIndicator value="0.0%" direction="neutral" />
            </DemoCell>
          </div>
        </DemoGroup>
      </DemoSection>

      {/* upIsGood semantic */}
      <DemoSection
        title="Semantic Meaning (upIsGood)"
        description="upIsGood prop inverts color logic: true = up is green, false = down is green."
      >
        <DemoGroup>
          <Stack gap={4}>
            <div>
              <Text
                variant="label-m"
                style={{ marginBottom: "var(--ref-frame-space-2)", display: "block" }}
              >
                upIsGood={"{true}"} — Revenue, growth metrics
              </Text>
              <Inline gap={4} wrap>
                <FlowKPITrendIndicator value="+15%" direction="up" upIsGood={true} />
                <FlowKPITrendIndicator value="-5%" direction="down" upIsGood={true} />
              </Inline>
            </div>
            <div>
              <Text
                variant="label-m"
                style={{ marginBottom: "var(--ref-frame-space-2)", display: "block" }}
              >
                upIsGood={"{false}"} — Error rate, costs
              </Text>
              <Inline gap={4} wrap>
                <FlowKPITrendIndicator value="+10%" direction="up" upIsGood={false} />
                <FlowKPITrendIndicator value="-8%" direction="down" upIsGood={false} />
              </Inline>
            </div>
          </Stack>
        </DemoGroup>
      </DemoSection>

      {/* With labels */}
      <DemoSection
        title="With Labels"
        description="Optional label provides context for the trend value."
      >
        <DemoGroup>
          <Stack gap={2}>
            <FlowKPITrendIndicator value="+12.5%" direction="up" label="vs last month" />
            <FlowKPITrendIndicator value="-3.2%" direction="down" label="vs last week" />
            <FlowKPITrendIndicator value="0.0%" direction="neutral" label="no change" />
          </Stack>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

export function FlowKPITrendIndicatorVariants() {
  return (
    <Stack gap="section">
      {/* All combinations */}
      <DemoSection
        title="Direction × upIsGood Matrix"
        description="All combinations of direction and semantic meaning."
      >
        <DemoGroup>
          <Stack gap={4}>
            {(["up", "down", "neutral"] as const).map((direction) => (
              <div key={direction}>
                <Text
                  variant="label-m"
                  style={{
                    marginBottom: "var(--ref-frame-space-2)",
                    display: "block",
                    textTransform: "capitalize",
                  }}
                >
                  Direction: {direction}
                </Text>
                <Inline gap={4} wrap>
                  <div>
                    <Text
                      variant="caption"
                      style={{ display: "block", marginBottom: "var(--ref-frame-space-1)" }}
                    >
                      upIsGood=true
                    </Text>
                    <FlowKPITrendIndicator
                      value={direction === "up" ? "+12%" : direction === "down" ? "-8%" : "0%"}
                      direction={direction}
                      upIsGood={true}
                    />
                  </div>
                  <div>
                    <Text
                      variant="caption"
                      style={{ display: "block", marginBottom: "var(--ref-frame-space-1)" }}
                    >
                      upIsGood=false
                    </Text>
                    <FlowKPITrendIndicator
                      value={direction === "up" ? "+12%" : direction === "down" ? "-8%" : "0%"}
                      direction={direction}
                      upIsGood={false}
                    />
                  </div>
                </Inline>
              </div>
            ))}
          </Stack>
        </DemoGroup>
      </DemoSection>

      {/* Real-world examples */}
      <DemoSection title="Real-World Usage" description="Common KPI trend scenarios with labels.">
        <DemoGroup>
          <Stack gap={3}>
            <div>
              <Text variant="label-m">Revenue</Text>
              <FlowKPITrendIndicator value="+18.2%" direction="up" upIsGood={true} label="vs Q3" />
            </div>
            <div>
              <Text variant="label-m">Bounce Rate</Text>
              <FlowKPITrendIndicator
                value="-5.4%"
                direction="down"
                upIsGood={false}
                label="vs last month"
              />
            </div>
            <div>
              <Text variant="label-m">Active Users</Text>
              <FlowKPITrendIndicator
                value="+2,341"
                direction="up"
                upIsGood={true}
                label="this week"
              />
            </div>
            <div>
              <Text variant="label-m">Error Rate</Text>
              <FlowKPITrendIndicator
                value="+0.8%"
                direction="up"
                upIsGood={false}
                label="needs attention"
              />
            </div>
            <div>
              <Text variant="label-m">Conversion Rate</Text>
              <FlowKPITrendIndicator value="0.0%" direction="neutral" label="unchanged" />
            </div>
          </Stack>
        </DemoGroup>
      </DemoSection>

      {/* Accessibility */}
      <DemoSection
        title="Accessibility"
        description="FlowKPITrendIndicator uses semantic color and icons to convey trend meaning."
      >
        <DemoGroup>
          <Callout intent="info">
            FlowKPITrendIndicator renders as &lt;span&gt; with aria-label that combines value,
            direction, and semantic meaning (e.g., &apos;Revenue up 12%, positive trend&apos;).
            Color and icons provide visual cues, while aria-label ensures screen readers convey the
            full context. Always pair with descriptive label text for KPI name.
          </Callout>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowTreeView Demos
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const sampleTree: TreeNode[] = [
  {
    id: "1",
    label: "src",
    icon: "folder",
    children: [
      {
        id: "1-1",
        label: "components",
        icon: "folder",
        children: [
          { id: "1-1-1", label: "Button.tsx", icon: "file" },
          { id: "1-1-2", label: "Input.tsx", icon: "file" },
          { id: "1-1-3", label: "Card.tsx", icon: "file" },
        ],
      },
      {
        id: "1-2",
        label: "pages",
        icon: "folder",
        children: [
          { id: "1-2-1", label: "Home.tsx", icon: "file" },
          { id: "1-2-2", label: "About.tsx", icon: "file" },
        ],
      },
      { id: "1-3", label: "App.tsx", icon: "file" },
    ],
  },
  {
    id: "2",
    label: "public",
    icon: "folder",
    children: [
      { id: "2-1", label: "index.html", icon: "file" },
      { id: "2-2", label: "favicon.ico", icon: "image" },
    ],
  },
  { id: "3", label: "package.json", icon: "file" },
  { id: "4", label: "README.md", icon: "file" },
];

export function FlowTreeViewOverview() {
  const [selected, setSelected] = useState<string | null>(null);
  const demoSize = useDemoSize();

  return (
    <Stack gap="section">
      {/* Sizes */}
      <DemoSection
        title="Sizes"
        description="Three size variants: sm, md (default), lg. Controls row height and icon size."
      >
        <DemoGroup>
          <LayoutGrid fullBleed>
            {(["sm", "md", "lg"] as const).map((size) => (
              <LayoutGrid.Item key={size} span={4}>
                <DemoCell label={size} align="start">
                  <FlowTreeView
                    nodes={sampleTree.slice(0, 2)}
                    size={size}
                    aria-label={`File tree ${size}`}
                  />
                </DemoCell>
              </LayoutGrid.Item>
            ))}
          </LayoutGrid>
        </DemoGroup>
      </DemoSection>

      {/* Basic tree */}
      <DemoSection
        title="Basic Tree"
        description={`Hierarchical tree with expand/collapse interaction. Shown at size="${demoSize}".`}
      >
        <DemoGroup>
          <FlowTreeView nodes={sampleTree} size={demoSize} aria-label="File explorer" />
        </DemoGroup>
      </DemoSection>

      {/* With selection */}
      <DemoSection
        title="Selectable Tree"
        description={`Nodes can be selected. Click to select. Shown at size="${demoSize}".`}
      >
        <DemoGroup>
          <Stack gap={2}>
            <FlowTreeView
              nodes={sampleTree}
              selectedId={selected}
              onSelect={setSelected}
              size={demoSize}
              aria-label="Selectable file tree"
            />
            {selected && (
              <Text variant="caption">
                Selected: <code>{selected}</code>
              </Text>
            )}
          </Stack>
        </DemoGroup>
      </DemoSection>

      {/* Default expanded */}
      <DemoSection
        title="Default Expanded Nodes"
        description={`Specify which nodes are initially expanded via defaultExpandedIds.`}
      >
        <DemoGroup>
          <FlowTreeView
            nodes={sampleTree}
            defaultExpandedIds={["1", "1-1"]}
            size={demoSize}
            aria-label="Tree with defaults expanded"
          />
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

export function FlowTreeViewVariants() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <Stack gap="section">
      {/* Expand all */}
      <DemoSection title="Expand All" description="expandAll prop expands all nodes by default.">
        <DemoGroup>
          <FlowTreeView nodes={sampleTree} expandAll aria-label="Fully expanded tree" />
        </DemoGroup>
      </DemoSection>

      {/* Disabled nodes */}
      <DemoSection
        title="Disabled Nodes"
        description="Nodes can be disabled to prevent selection and interaction."
      >
        <DemoGroup>
          <FlowTreeView
            nodes={[
              { id: "a", label: "Enabled node", icon: "check" },
              { id: "b", label: "Disabled node", icon: "x", disabled: true },
              {
                id: "c",
                label: "Parent with mixed children",
                icon: "folder",
                children: [
                  { id: "c-1", label: "Enabled child", icon: "file" },
                  { id: "c-2", label: "Disabled child", icon: "file", disabled: true },
                ],
              },
            ]}
            selectedId={selected}
            onSelect={setSelected}
            aria-label="Tree with disabled nodes"
          />
        </DemoGroup>
      </DemoSection>

      {/* Icons */}
      <DemoSection
        title="Custom Icons"
        description="Each node can have a custom icon from lucide-react."
      >
        <DemoGroup>
          <FlowTreeView
            nodes={[
              { id: "home", label: "Home", icon: "home" },
              { id: "settings", label: "Settings", icon: "settings" },
              {
                id: "files",
                label: "Files",
                icon: "folder",
                children: [
                  { id: "doc1", label: "Document.pdf", icon: "file-text" },
                  { id: "img1", label: "Photo.jpg", icon: "image" },
                  { id: "vid1", label: "Video.mp4", icon: "video" },
                ],
              },
              { id: "trash", label: "Trash", icon: "trash" },
            ]}
            defaultExpandedIds={["files"]}
            aria-label="Tree with custom icons"
          />
        </DemoGroup>
      </DemoSection>

      {/* Deep nesting */}
      <DemoSection title="Deep Nesting" description="Tree supports arbitrary nesting depth.">
        <DemoGroup>
          <FlowTreeView
            nodes={[
              {
                id: "l1",
                label: "Level 1",
                icon: "folder",
                children: [
                  {
                    id: "l2",
                    label: "Level 2",
                    icon: "folder",
                    children: [
                      {
                        id: "l3",
                        label: "Level 3",
                        icon: "folder",
                        children: [
                          {
                            id: "l4",
                            label: "Level 4",
                            icon: "folder",
                            children: [{ id: "l5", label: "Level 5 (leaf)", icon: "file" }],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ]}
            expandAll
            aria-label="Deeply nested tree"
          />
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

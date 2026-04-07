
/**
 * FLOW — Pattern Registry
 * Per-pattern data + composition demos + usage examples.
 *
 * Key format: "category/pattern-slug"
 *   e.g. "feedback/empty-state"
 *
 * Each entry owns: spec metadata, composition breakdown, usage demos, and API documentation.
 * Patterns are L4 — they orchestrate multiple L3 components.
 */
import { type ReactNode, useState } from "react";

import {
  Divider,
  FlowAvatar,
  FlowAvatarGroup,
  FlowBadge,
  FlowButton,
  FlowChip,
  FlowHoverCard,
  FlowList,
  FlowListItem,
  Grid,
  Inline,
  Stack,
  Surface,
  Text,
} from "../../../lib";
import { DemoSection } from "../../components/demo-helpers";
export type { PropEntry, GuidelineEntry } from "../../components/doc-primitives";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Types
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface AnatomyEntry {
  part: string;
  description: string;
  tokens: string[];
  note?: string;
}

export interface AccessibilitySpec {
  /** What FLOW handles automatically — the consumer gets this for free */
  handled: string[];
  /** What the consumer must provide for the component to be accessible */
  required?: string[];
  /** Keyboard interaction patterns */
  keyboard?: string[];
}

export interface PatternSpec {
  name: string;
  purpose: string;
  platform: "shared" | "desktop" | "mobile";
  /** L3 components this pattern composes/orchestrates */
  composesL3: string[];
  /** Behavioral orchestrations this pattern owns */
  orchestrates: string[];
  /** What this pattern delegates to lower layers */
  doesNotOwn?: string[];
  /** Anatomy breakdown (optional, gold standard) */
  anatomy?: AnatomyEntry[];
  /** Variant descriptions (optional, gold standard) */
  variants?: string[];
  /** State list (optional, gold standard) */
  states?: string[];
  /** Accessibility spec (optional, gold standard) */
  accessibility?: AccessibilitySpec;
  /** Source file (deprecated field, kept for migration) */
  source?: string;
}

export interface CompositionEntry {
  component: string;
  role: string;
  tokens?: string[];
}

export interface PatternDeveloperGuide {
  reactImport: string;
  reactUsage: string;
  flutterImport: string;
  flutterUsage: string;
  /** Structured props/API reference table */
  props?: PropEntry[];
  /** Structured guidelines — rendered as bullet list with intent icons */
  guidelines?: GuidelineEntry[];
}

export interface PatternEntry {
  category: string;
  spec: PatternSpec;
  /** Visual composition breakdown */
  composition?: CompositionEntry[];
  demos: {
    overview?: (ctx?: { patternName: string }) => ReactNode;
    variants?: (ctx?: { patternName: string }) => ReactNode;
    useCases?: (ctx?: { patternName: string }) => ReactNode;
  };
  developer: PatternDeveloperGuide;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Helper imports for prop table types
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import type { GuidelineEntry, PropEntry } from "../../components/doc-primitives";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// DISPLAY PATTERNS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// ── FlowAvatarGroup ──

function AvatarGroupOverviewDemo() {
  return (
    <Stack gap={6}>
      <DemoSection
        title="Basic Avatar Group"
        description="Overlapping avatar stack showing multiple users. Default layout with medium size."
      >
        <FlowAvatarGroup>
          <FlowAvatar name="Alice Johnson" />
          <FlowAvatar name="Bob Smith" />
          <FlowAvatar name="Carol Williams" />
          <FlowAvatar name="David Brown" />
        </FlowAvatarGroup>
      </DemoSection>

      <DemoSection
        title="With Overflow Indicator"
        description="When max prop is set, excess avatars are replaced with '+N' indicator."
      >
        <Stack gap={3}>
          <Inline gap={4} align="center" wrap>
            <Stack gap={1}>
              <Text role="caption" color="tertiary">
                max=3
              </Text>
              <FlowAvatarGroup max={3}>
                <FlowAvatar name="Alice Johnson" />
                <FlowAvatar name="Bob Smith" />
                <FlowAvatar name="Carol Williams" />
                <FlowAvatar name="David Brown" />
                <FlowAvatar name="Eve Davis" />
              </FlowAvatarGroup>
            </Stack>
            <Stack gap={1}>
              <Text role="caption" color="tertiary">
                max=4
              </Text>
              <FlowAvatarGroup max={4}>
                <FlowAvatar name="Alice Johnson" />
                <FlowAvatar name="Bob Smith" />
                <FlowAvatar name="Carol Williams" />
                <FlowAvatar name="David Brown" />
                <FlowAvatar name="Eve Davis" />
                <FlowAvatar name="Frank Miller" />
                <FlowAvatar name="Grace Lee" />
              </FlowAvatarGroup>
            </Stack>
            <Stack gap={1}>
              <Text role="caption" color="tertiary">
                max=2
              </Text>
              <FlowAvatarGroup max={2}>
                <FlowAvatar name="Alice Johnson" />
                <FlowAvatar name="Bob Smith" />
                <FlowAvatar name="Carol Williams" />
                <FlowAvatar name="David Brown" />
              </FlowAvatarGroup>
            </Stack>
          </Inline>
        </Stack>
      </DemoSection>

      <DemoSection
        title="Size Variants"
        description="Avatar groups inherit size from the size prop."
      >
        <Stack gap={4}>
          <Stack gap={1}>
            <Text role="caption" color="tertiary">
              Small
            </Text>
            <FlowAvatarGroup size="sm" max={3}>
              <FlowAvatar name="Alice Johnson" />
              <FlowAvatar name="Bob Smith" />
              <FlowAvatar name="Carol Williams" />
              <FlowAvatar name="David Brown" />
            </FlowAvatarGroup>
          </Stack>
          <Stack gap={1}>
            <Text role="caption" color="tertiary">
              Medium (default)
            </Text>
            <FlowAvatarGroup size="md" max={3}>
              <FlowAvatar name="Alice Johnson" />
              <FlowAvatar name="Bob Smith" />
              <FlowAvatar name="Carol Williams" />
              <FlowAvatar name="David Brown" />
            </FlowAvatarGroup>
          </Stack>
          <Stack gap={1}>
            <Text role="caption" color="tertiary">
              Large
            </Text>
            <FlowAvatarGroup size="lg" max={3}>
              <FlowAvatar name="Alice Johnson" />
              <FlowAvatar name="Bob Smith" />
              <FlowAvatar name="Carol Williams" />
              <FlowAvatar name="David Brown" />
            </FlowAvatarGroup>
          </Stack>
          <Stack gap={1}>
            <Text role="caption" color="tertiary">
              Extra Large
            </Text>
            <FlowAvatarGroup size="xl" max={3}>
              <FlowAvatar name="Alice Johnson" />
              <FlowAvatar name="Bob Smith" />
              <FlowAvatar name="Carol Williams" />
              <FlowAvatar name="David Brown" />
            </FlowAvatarGroup>
          </Stack>
        </Stack>
      </DemoSection>

      <DemoSection
        title="Mixed Avatar Types"
        description="Groups can contain avatars with images, initials, or icons."
      >
        <FlowAvatarGroup max={4}>
          <FlowAvatar name="Alice Johnson" src="https://i.pravatar.cc/150?img=1" />
          <FlowAvatar name="Bob Smith" />
          <FlowAvatar name="System" icon="bot" />
          <FlowAvatar name="Carol Williams" src="https://i.pravatar.cc/150?img=2" />
          <FlowAvatar name="David Brown" />
        </FlowAvatarGroup>
      </DemoSection>

      <DemoSection title="Team of Two" description="Small groups without overflow.">
        <FlowAvatarGroup>
          <FlowAvatar name="Alice Johnson" src="https://i.pravatar.cc/150?img=5" />
          <FlowAvatar name="Bob Smith" src="https://i.pravatar.cc/150?img=6" />
        </FlowAvatarGroup>
      </DemoSection>

      <DemoSection title="Large Team" description="Groups with many members show overflow count.">
        <Stack gap={3}>
          <Text role="paragraph-s" color="secondary">
            12 team members
          </Text>
          <FlowAvatarGroup max={5}>
            {Array.from({ length: 12 }, (_, i) => (
              <FlowAvatar key={i} name={`Team Member ${i + 1}`} />
            ))}
          </FlowAvatarGroup>
        </Stack>
      </DemoSection>

      <DemoSection
        title="Compact Layout"
        description="Small avatars for compact UI contexts like table cells."
      >
        <Surface variant="primary" padding="control">
          <Grid cols={3} gap="control">
            {["Design Team", "Engineering", "Marketing"].map((team) => (
              <Inline key={team} gap={2} align="center" justify="between">
                <Text role="paragraph-s">{team}</Text>
                <FlowAvatarGroup size="sm" max={3}>
                  <FlowAvatar name="Member 1" />
                  <FlowAvatar name="Member 2" />
                  <FlowAvatar name="Member 3" />
                  <FlowAvatar name="Member 4" />
                  <FlowAvatar name="Member 5" />
                </FlowAvatarGroup>
              </Inline>
            ))}
          </Grid>
        </Surface>
      </DemoSection>

      <DemoSection
        title="With Status Indicators"
        description="Avatars in group can have online/offline status."
      >
        <FlowAvatarGroup max={4}>
          <FlowAvatar name="Alice Johnson" status="online" src="https://i.pravatar.cc/150?img=10" />
          <FlowAvatar name="Bob Smith" status="busy" src="https://i.pravatar.cc/150?img=11" />
          <FlowAvatar name="Carol Williams" status="offline" />
          <FlowAvatar name="David Brown" status="online" />
          <FlowAvatar name="Eve Davis" />
        </FlowAvatarGroup>
      </DemoSection>

      <DemoSection
        title="In List Items"
        description="Avatar groups commonly appear in list items showing collaborators."
      >
        <Surface variant="primary" padding="control">
          <FlowList dividers>
            {[
              { project: "Website Redesign", members: 5, max: 3 },
              { project: "Mobile App", members: 3, max: 3 },
              { project: "API Integration", members: 7, max: 3 },
            ].map((item) => (
              <FlowListItem
                key={item.project}
                primary={<Text role="paragraph-s">{item.project}</Text>}
                secondary={
                  <FlowAvatarGroup size="sm" max={item.max}>
                    {Array.from({ length: item.members }, (_, i) => (
                      <FlowAvatar key={i} name={`Member ${i + 1}`} />
                    ))}
                  </FlowAvatarGroup>
                }
              />
            ))}
          </FlowList>
        </Surface>
      </DemoSection>
    </Stack>
  );
}

function AvatarGroupUseCasesDemo() {
  const [activeExample, setActiveExample] = useState<string>("assignees");

  const examples: Record<string, ReactNode> = {
    assignees: (
      <Surface variant="primary" padding="container">
        <Stack gap={3}>
          <Inline gap={2} justify="between" align="center">
            <Text role="heading-m">Task: Design Homepage</Text>
            <FlowChip variant="accent" size="sm">
              In Progress
            </FlowChip>
          </Inline>
          <Inline gap={2} align="center">
            <Text role="label-s" color="secondary">
              Assignees:
            </Text>
            <FlowAvatarGroup max={3}>
              <FlowAvatar name="Alice Johnson" src="https://i.pravatar.cc/150?img=20" />
              <FlowAvatar name="Bob Smith" src="https://i.pravatar.cc/150?img=21" />
              <FlowAvatar name="Carol Williams" />
            </FlowAvatarGroup>
          </Inline>
          <Text role="paragraph-s" color="secondary">
            3 team members are working on this task
          </Text>
        </Stack>
      </Surface>
    ),
    participants: (
      <Surface variant="primary" padding="container">
        <Stack gap={3}>
          <Text role="heading-m">Meeting: Q4 Planning</Text>
          <Divider />
          <Stack gap={2}>
            <Text role="label-s" color="secondary">
              10 participants
            </Text>
            <FlowAvatarGroup max={6}>
              {Array.from({ length: 10 }, (_, i) => (
                <FlowAvatar
                  key={i}
                  name={`Participant ${i + 1}`}
                  src={`https://i.pravatar.cc/150?img=${30 + i}`}
                />
              ))}
            </FlowAvatarGroup>
          </Stack>
          <FlowButton variant="high" size="sm">
            Join Meeting
          </FlowButton>
        </Stack>
      </Surface>
    ),
    viewers: (
      <Surface variant="primary" padding="container">
        <Stack gap={3}>
          <Inline gap={2} justify="between">
            <Text role="heading-m">Shared Document</Text>
            <FlowBadge content={5} color="success">
              <Text role="caption" color="secondary">
                Viewing now
              </Text>
            </FlowBadge>
          </Inline>
          <FlowAvatarGroup size="sm" max={4}>
            <FlowAvatar name="Alice" status="online" />
            <FlowAvatar name="Bob" status="online" />
            <FlowAvatar name="Carol" status="online" />
            <FlowAvatar name="David" status="online" />
            <FlowAvatar name="Eve" status="online" />
          </FlowAvatarGroup>
        </Stack>
      </Surface>
    ),
    followers: (
      <Surface variant="primary" padding="container">
        <Stack gap={3}>
          <Inline gap={2} justify="between" align="center">
            <Stack gap={1}>
              <Text role="heading-m">@johndoe</Text>
              <Text role="paragraph-s" color="secondary">
                Software Engineer
              </Text>
            </Stack>
          </Inline>
          <Divider />
          <Inline gap={2} align="center">
            <Text role="label-s" color="secondary">
              1.2k followers
            </Text>
            <FlowAvatarGroup size="sm" max={5}>
              {Array.from({ length: 8 }, (_, i) => (
                <FlowAvatar key={i} name={`Follower ${i + 1}`} />
              ))}
            </FlowAvatarGroup>
          </Inline>
        </Stack>
      </Surface>
    ),
    contributors: (
      <Surface variant="primary" padding="container">
        <Stack gap={3}>
          <Text role="heading-m">Repository Contributors</Text>
          <Inline gap={2} align="center">
            <FlowAvatarGroup max={4}>
              <FlowAvatar name="Alice" src="https://i.pravatar.cc/150?img=40" />
              <FlowAvatar name="Bob" src="https://i.pravatar.cc/150?img=41" />
              <FlowAvatar name="Carol" src="https://i.pravatar.cc/150?img=42" />
              <FlowAvatar name="David" />
              <FlowAvatar name="Eve" />
              <FlowAvatar name="Frank" />
            </FlowAvatarGroup>
            <Text role="caption" color="tertiary">
              +2 more contributors
            </Text>
          </Inline>
        </Stack>
      </Surface>
    ),
    mentions: (
      <Surface variant="primary" padding="container">
        <Stack gap={3}>
          <Stack gap={1}>
            <Inline gap={2} align="center">
              <FlowAvatar name="Alice" size="sm" src="https://i.pravatar.cc/150?img=50" />
              <Stack gap={0}>
                <Text role="label-s">Alice Johnson</Text>
                <Text role="caption" color="tertiary">
                  2 hours ago
                </Text>
              </Stack>
            </Inline>
          </Stack>
          <Text role="paragraph-s">Great work team! Let&apos;s sync up tomorrow.</Text>
          <Inline gap={2} align="center">
            <Text role="caption" color="secondary">
              Mentioned:
            </Text>
            <FlowAvatarGroup size="sm" max={3}>
              <FlowAvatar name="Bob" />
              <FlowAvatar name="Carol" />
              <FlowAvatar name="David" />
            </FlowAvatarGroup>
          </Inline>
        </Stack>
      </Surface>
    ),
  };

  return (
    <Stack gap={4}>
      <Inline gap={2} wrap>
        {Object.keys(examples).map((key) => (
          <FlowChip
            key={key}
            variant={activeExample === key ? "accent" : "default"}
            onClick={() => setActiveExample(key)}
          >
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </FlowChip>
        ))}
      </Inline>
      {examples[activeExample]}
    </Stack>
  );
}

const avatarGroupEntry: PatternEntry = {
  category: "display-patterns",
  spec: {
    name: "Avatar Group",
    purpose:
      "Overlapping avatar stack with overflow indicator (+N). Composes multiple FlowAvatar components with calculated overlap layout and max-visible logic. Commonly used to show collaborators, participants, or team members in compact space.",
    platform: "shared",
    composesL3: ["FlowAvatar", "Surface", "Text"],
    orchestrates: [
      "Max-visible calculation with overflow counting",
      "Reverse-order rendering (first avatar appears rightmost)",
      "Overlap positioning via CSS",
      "Overflow badge generation (+N more)",
      "Size inheritance to all child avatars",
    ],
    doesNotOwn: [
      "Avatar rendering (delegated to FlowAvatar)",
      "Status indicators (delegated to FlowAvatar)",
      "Tooltip on hover (future enhancement)",
    ],
  },
  composition: [
    {
      component: "FlowAvatar",
      role: "Individual avatar rendering",
      tokens: ["--comp-avatar-size-*"],
    },
    { component: "Surface", role: "Optional tooltip container (future)", tokens: [] },
  ],
  demos: {
    overview: AvatarGroupOverviewDemo,
    useCases: AvatarGroupUseCasesDemo,
  },
  developer: {
    reactImport: `import { FlowAvatarGroup } from "@flow/design-system";`,
    reactUsage: `<FlowAvatarGroup max={3}>
  <FlowAvatar name="Alice Johnson" />
  <FlowAvatar name="Bob Smith" />
  <FlowAvatar name="Carol Williams" />
  <FlowAvatar name="David Brown" />
</FlowAvatarGroup>`,
    flutterImport: `import 'package:flow/patterns/avatar_group.dart';`,
    flutterUsage: `FlowAvatarGroup(
  max: 3,
  children: [
    FlowAvatar(name: 'Alice Johnson'),
    FlowAvatar(name: 'Bob Smith'),
    FlowAvatar(name: 'Carol Williams'),
    FlowAvatar(name: 'David Brown'),
  ],
)`,
    props: [
      {
        name: "children",
        type: "ReactNode",
        required: true,
        description: "FlowAvatar components to display in the group.",
      },
      {
        name: "max",
        type: "number",
        required: false,
        description:
          "Maximum number of avatars to show before displaying overflow indicator. If omitted, all avatars are shown.",
      },
      {
        name: "size",
        type: "'sm' | 'md' | 'lg' | 'xl'",
        required: false,
        defaultValue: "'md'",
        description: "Size applied to all child avatars.",
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS class names.",
      },
      {
        name: "style",
        type: "CSSProperties",
        required: false,
        description: "Inline style object.",
      },
    ],
    guidelines: [
      {
        type: "do",
        text: "Use max prop when displaying large teams (6+ members) to avoid visual clutter.",
      },
      {
        type: "do",
        text: "Use 'sm' size for compact contexts like table cells or inline with text.",
      },
      {
        type: "do",
        text: "Combine with tooltips (future) to show full member list on overflow hover.",
      },
      {
        type: "do",
        text: "Ensure all child avatars have descriptive name props for accessibility.",
      },
      {
        type: "dont",
        text: "Don't exceed max=6 even for very large teams — use a modal or list instead.",
      },
      {
        type: "dont",
        text: "Don't mix different sizes of avatars within the same group — use the group's size prop.",
      },
      { type: "dont", text: "Don't use for single avatars — use FlowAvatar directly instead." },
    ],
  },
};

// ── FlowHoverCard ──

function HoverCardOverviewDemo() {
  return (
    <Stack gap={6}>
      <DemoSection
        title="Basic Hover Card"
        description="Hover over trigger to reveal rich content preview. Default 300ms delay prevents flash."
      >
        <Inline gap={4} wrap>
          <FlowHoverCard trigger={<FlowChip variant="accent">Hover me</FlowChip>}>
            <Stack gap={2}>
              <Text role="heading-s">Hover Card Content</Text>
              <Text role="paragraph-s" color="secondary">
                This content appears after hovering for 300ms.
              </Text>
            </Stack>
          </FlowHoverCard>
        </Inline>
      </DemoSection>

      <DemoSection
        title="User Profile Preview"
        description="Common use case: hover over username to see profile details."
      >
        <Stack gap={3}>
          <Text role="paragraph-s">
            Comment by{" "}
            <FlowHoverCard
              trigger={
                <Text
                  as="span"
                  role="paragraph-s"
                  color="accent"
                  style={{ cursor: "pointer", textDecoration: "underline" }}
                >
                  @alice
                </Text>
              }
            >
              <Stack gap={3} style={{ width: "280px" }}>
                <Inline gap={3} align="center">
                  <FlowAvatar
                    name="Alice Johnson"
                    size="lg"
                    src="https://i.pravatar.cc/150?img=1"
                  />
                  <Stack gap={1}>
                    <Text role="label-m">Alice Johnson</Text>
                    <Text role="caption" color="tertiary">
                      @alice
                    </Text>
                  </Stack>
                </Inline>
                <Text role="paragraph-s" color="secondary">
                  Senior Product Designer with 8+ years of experience building delightful user
                  experiences.
                </Text>
                <Divider />
                <Inline gap={3}>
                  <Stack gap={0}>
                    <Text role="label-s">1.2k</Text>
                    <Text role="caption" color="tertiary">
                      Followers
                    </Text>
                  </Stack>
                  <Stack gap={0}>
                    <Text role="label-s">342</Text>
                    <Text role="caption" color="tertiary">
                      Following
                    </Text>
                  </Stack>
                </Inline>
              </Stack>
            </FlowHoverCard>{" "}
            on this thread.
          </Text>
        </Stack>
      </DemoSection>

      <DemoSection
        title="Positioning Sides"
        description="Card can be positioned on any side of the trigger."
      >
        <Grid minItemWidth="200px" gap="control">
          <Stack gap={2} align="center">
            <Text role="caption" color="tertiary">
              Top
            </Text>
            <FlowHoverCard trigger={<FlowButton variant="low">Hover</FlowButton>} side="top">
              <Text role="paragraph-s">Content above trigger</Text>
            </FlowHoverCard>
          </Stack>
          <Stack gap={2} align="center">
            <Text role="caption" color="tertiary">
              Bottom (default)
            </Text>
            <FlowHoverCard trigger={<FlowButton variant="low">Hover</FlowButton>} side="bottom">
              <Text role="paragraph-s">Content below trigger</Text>
            </FlowHoverCard>
          </Stack>
          <Stack gap={2} align="center">
            <Text role="caption" color="tertiary">
              Left
            </Text>
            <FlowHoverCard trigger={<FlowButton variant="low">Hover</FlowButton>} side="left">
              <Text role="paragraph-s">Content to left</Text>
            </FlowHoverCard>
          </Stack>
          <Stack gap={2} align="center">
            <Text role="caption" color="tertiary">
              Right
            </Text>
            <FlowHoverCard trigger={<FlowButton variant="low">Hover</FlowButton>} side="right">
              <Text role="paragraph-s">Content to right</Text>
            </FlowHoverCard>
          </Stack>
        </Grid>
      </DemoSection>

      <DemoSection
        title="Custom Delays"
        description="Control open and close delays to tune responsiveness."
      >
        <Inline gap={4} wrap>
          <Stack gap={1}>
            <Text role="caption" color="tertiary">
              Instant (0ms)
            </Text>
            <FlowHoverCard trigger={<FlowChip>Instant</FlowChip>} openDelay={0} closeDelay={0}>
              <Text role="paragraph-s">Opens immediately</Text>
            </FlowHoverCard>
          </Stack>
          <Stack gap={1}>
            <Text role="caption" color="tertiary">
              Default (300ms)
            </Text>
            <FlowHoverCard trigger={<FlowChip>Default</FlowChip>}>
              <Text role="paragraph-s">300ms delay</Text>
            </FlowHoverCard>
          </Stack>
          <Stack gap={1}>
            <Text role="caption" color="tertiary">
              Slow (800ms)
            </Text>
            <FlowHoverCard trigger={<FlowChip>Slow</FlowChip>} openDelay={800}>
              <Text role="paragraph-s">800ms delay</Text>
            </FlowHoverCard>
          </Stack>
        </Inline>
      </DemoSection>

      <DemoSection
        title="Rich Content"
        description="Hover cards can contain complex layouts, images, and actions."
      >
        <FlowHoverCard
          trigger={
            <FlowChip variant="accent" icon="image">
              View Image
            </FlowChip>
          }
        >
          <Stack gap={3} style={{ width: "320px" }}>
            <Surface
              radius="container"
              style={{
                width: "100%",
                height: "180px",
                background:
                  "linear-gradient(135deg, var(--sys-energy-status-info), var(--sys-energy-status-success))",
              }}
            />
            <Stack gap={2}>
              <Text role="label-m">Mountain Landscape</Text>
              <Text role="paragraph-s" color="secondary">
                Captured at sunrise in the Swiss Alps. 4K resolution.
              </Text>
            </Stack>
            <Inline gap={2}>
              <FlowButton variant="high" size="sm">
                Download
              </FlowButton>
              <FlowButton variant="low" size="sm">
                Share
              </FlowButton>
            </Inline>
          </Stack>
        </FlowHoverCard>
      </DemoSection>

      <DemoSection
        title="Keyboard Accessible"
        description="Hover cards also open on focus for keyboard navigation."
      >
        <Text role="paragraph-s">
          Use Tab to navigate:{" "}
          <FlowHoverCard
            trigger={
              <FlowButton variant="low" size="sm">
                Focusable Link
              </FlowButton>
            }
          >
            <Text role="paragraph-s">Opens on focus for keyboard users</Text>
          </FlowHoverCard>
        </Text>
      </DemoSection>

      <DemoSection
        title="In Data Table"
        description="Hover cards work well for inline previews in tables."
      >
        <Surface variant="primary" padding="control">
          <FlowList dividers>
            {["Dashboard v2.0", "Mobile App Redesign", "API Integration"].map((item) => (
              <FlowListItem
                key={item}
                primary={
                  <FlowHoverCard
                    trigger={
                      <Text
                        as="span"
                        role="paragraph-s"
                        color="accent"
                        style={{ cursor: "pointer" }}
                      >
                        {item}
                      </Text>
                    }
                  >
                    <Stack gap={2} style={{ width: "240px" }}>
                      <Text role="label-m">{item}</Text>
                      <Text role="paragraph-s" color="secondary">
                        In progress • 3 team members
                      </Text>
                      <FlowAvatarGroup size="sm" max={3}>
                        <FlowAvatar name="Member 1" />
                        <FlowAvatar name="Member 2" />
                        <FlowAvatar name="Member 3" />
                      </FlowAvatarGroup>
                    </Stack>
                  </FlowHoverCard>
                }
                secondary={
                  <Text role="caption" color="tertiary">
                    Updated 2h ago
                  </Text>
                }
              />
            ))}
          </FlowList>
        </Surface>
      </DemoSection>

      <DemoSection title="Tag Preview" description="Hover over tags to see additional metadata.">
        <Inline gap={2} wrap>
          {["React", "TypeScript", "Design System", "Documentation"].map((tag) => (
            <FlowHoverCard key={tag} trigger={<FlowChip size="sm">{tag}</FlowChip>}>
              <Stack gap={2} style={{ width: "200px" }}>
                <Text role="label-m">{tag}</Text>
                <Text role="paragraph-s" color="secondary">
                  Used in 12 projects
                </Text>
                <Text role="caption" color="tertiary">
                  Last updated: 2 days ago
                </Text>
              </Stack>
            </FlowHoverCard>
          ))}
        </Inline>
      </DemoSection>
    </Stack>
  );
}

function HoverCardUseCasesDemo() {
  const [activeExample, setActiveExample] = useState<string>("mentions");

  const examples: Record<string, ReactNode> = {
    mentions: (
      <Surface variant="primary" padding="container">
        <Stack gap={3}>
          <Inline gap={2} align="center">
            <FlowAvatar name="Bob" size="sm" />
            <Stack gap={0}>
              <Text role="label-s">Bob Smith</Text>
              <Text role="caption" color="tertiary">
                1 hour ago
              </Text>
            </Stack>
          </Inline>
          <Text role="paragraph-s">
            Hey{" "}
            <FlowHoverCard
              trigger={
                <Text as="span" role="paragraph-s" color="accent" style={{ cursor: "pointer" }}>
                  @alice
                </Text>
              }
            >
              <Stack gap={3} style={{ width: "280px" }}>
                <Inline gap={3} align="center">
                  <FlowAvatar
                    name="Alice Johnson"
                    size="lg"
                    src="https://i.pravatar.cc/150?img=5"
                  />
                  <Stack gap={1}>
                    <Text role="label-m">Alice Johnson</Text>
                    <Text role="caption" color="tertiary">
                      @alice • Designer
                    </Text>
                  </Stack>
                </Inline>
                <FlowButton variant="high" size="sm">
                  View Profile
                </FlowButton>
              </Stack>
            </FlowHoverCard>
            , can you review the latest designs?
          </Text>
        </Stack>
      </Surface>
    ),
    links: (
      <Surface variant="primary" padding="container">
        <Stack gap={3}>
          <Text role="heading-m">Documentation</Text>
          <Text role="paragraph-s">
            Check out the{" "}
            <FlowHoverCard
              trigger={
                <Text
                  as="span"
                  role="paragraph-s"
                  color="accent"
                  style={{ cursor: "pointer", textDecoration: "underline" }}
                >
                  API Reference
                </Text>
              }
            >
              <Stack gap={2} style={{ width: "300px" }}>
                <Text role="label-m">API Reference</Text>
                <Text role="paragraph-s" color="secondary">
                  Complete API documentation with examples and best practices.
                </Text>
                <FlowChip size="sm" variant="success">
                  Updated
                </FlowChip>
              </Stack>
            </FlowHoverCard>{" "}
            for integration details.
          </Text>
        </Stack>
      </Surface>
    ),
    products: (
      <Surface variant="primary" padding="container">
        <Stack gap={3}>
          <Text role="heading-m">Shopping Cart</Text>
          <FlowList dividers>
            {["Wireless Headphones", "Smart Watch", "Laptop Stand"].map((product) => (
              <FlowListItem
                key={product}
                primary={
                  <FlowHoverCard
                    trigger={
                      <Text as="span" role="paragraph-s" style={{ cursor: "pointer" }}>
                        {product}
                      </Text>
                    }
                  >
                    <Stack gap={3} style={{ width: "280px" }}>
                      <Surface
                        variant="sunken"
                        radius="container"
                        style={{
                          width: "100%",
                          height: "160px",
                        }}
                      />
                      <Stack gap={2}>
                        <Text role="label-m">{product}</Text>
                        <Text role="paragraph-s" color="secondary">
                          High-quality {product.toLowerCase()} with premium features.
                        </Text>
                        <Text role="label-m" color="accent">
                          $99.99
                        </Text>
                      </Stack>
                    </Stack>
                  </FlowHoverCard>
                }
                secondary={
                  <Text role="caption" color="tertiary">
                    Qty: 1
                  </Text>
                }
              />
            ))}
          </FlowList>
        </Stack>
      </Surface>
    ),
    glossary: (
      <Surface variant="primary" padding="container">
        <Stack gap={3}>
          <Text role="heading-m">Technical Article</Text>
          <Text role="paragraph-s">
            In FLOW, we use a{" "}
            <FlowHoverCard
              trigger={
                <Text
                  as="span"
                  role="paragraph-s"
                  style={{
                    borderBottom: "1px dashed var(--sys-energy-border-default)",
                    cursor: "help",
                  }}
                >
                  token system
                </Text>
              }
            >
              <Stack gap={2} style={{ width: "300px" }}>
                <Text role="label-m">Token System</Text>
                <Text role="paragraph-s" color="secondary">
                  A three-tier token architecture (ref → sys → comp) that ensures visual consistency
                  across platforms.
                </Text>
              </Stack>
            </FlowHoverCard>{" "}
            to maintain consistency.
          </Text>
        </Stack>
      </Surface>
    ),
    status: (
      <Surface variant="primary" padding="container">
        <Stack gap={3}>
          <Text role="heading-m">Service Status</Text>
          <FlowList dividers>
            {[
              { service: "API Server", status: "Operational", variant: "success" },
              { service: "Database", status: "Degraded", variant: "warning" },
              { service: "CDN", status: "Operational", variant: "success" },
            ].map((item) => (
              <FlowListItem
                key={item.service}
                primary={
                  <Inline gap={2} align="center">
                    <Text role="paragraph-s">{item.service}</Text>
                    <FlowHoverCard
                      trigger={
                        <FlowChip size="sm" variant={item.variant}>
                          {item.status}
                        </FlowChip>
                      }
                    >
                      <Stack gap={2} style={{ width: "240px" }}>
                        <Text role="label-m">{item.service} Status</Text>
                        <Text role="paragraph-s" color="secondary">
                          {item.status === "Operational"
                            ? "All systems running normally."
                            : "Response times elevated by 20%. Team investigating."}
                        </Text>
                        <Text role="caption" color="tertiary">
                          Last checked: 2 min ago
                        </Text>
                      </Stack>
                    </FlowHoverCard>
                  </Inline>
                }
              />
            ))}
          </FlowList>
        </Stack>
      </Surface>
    ),
  };

  return (
    <Stack gap={4}>
      <Inline gap={2} wrap>
        {Object.keys(examples).map((key) => (
          <FlowChip
            key={key}
            variant={activeExample === key ? "accent" : "default"}
            onClick={() => setActiveExample(key)}
          >
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </FlowChip>
        ))}
      </Inline>
      {examples[activeExample]}
    </Stack>
  );
}

const hoverCardEntry: PatternEntry = {
  category: "display-patterns",
  spec: {
    name: "Hover Card",
    purpose:
      "Rich content preview triggered by hover with configurable delays. Prevents flash with open delay (300ms default) and premature close with close delay (200ms default). Also opens on focus for keyboard accessibility. Composes FlowPopover with hover-specific behavior.",
    platform: "desktop",
    composesL3: ["FlowPopover", "Surface", "Text"],
    orchestrates: [
      "Hover-in delay timer to prevent flash on quick mouse-through",
      "Hover-out delay timer to prevent premature close",
      "Focus-triggered opening for keyboard navigation",
      "Content positioning relative to trigger",
      "z-index stacking management",
    ],
    doesNotOwn: [
      "Popover visual styling (delegated to Surface primitive)",
      "Content layout (consumer provides children)",
      "Portal rendering (handled by DOM positioning)",
    ],
  },
  composition: [
    {
      component: "Surface",
      role: "Card container with border, shadow, and padding",
      tokens: [
        "--sys-energy-surface-primary",
        "--sys-energy-border-default",
        "--sys-depth-elevation-medium",
      ],
    },
    { component: "Text", role: "Optional content text styling", tokens: [] },
  ],
  demos: {
    overview: HoverCardOverviewDemo,
    useCases: HoverCardUseCasesDemo,
  },
  developer: {
    reactImport: `import { FlowHoverCard } from "@flow/design-system";`,
    reactUsage: `<FlowHoverCard
  trigger={<span>@username</span>}
  side="bottom"
  openDelay={300}
  closeDelay={200}
>
  <Stack gap={2}>
    <Text role="label-m">User Profile</Text>
    <Text role="paragraph-s">Bio and details...</Text>
  </Stack>
</FlowHoverCard>`,
    flutterImport: `import 'package:flow/patterns/hover_card.dart';`,
    flutterUsage: `FlowHoverCard(
  trigger: Text('@username'),
  side: HoverCardSide.bottom,
  openDelay: Duration(milliseconds: 300),
  child: Column(
    children: [
      Text('User Profile'),
      Text('Bio and details...'),
    ],
  ),
)`,
    props: [
      {
        name: "trigger",
        type: "ReactNode",
        required: true,
        description: "Element that triggers the hover card (e.g., username, chip, link).",
      },
      {
        name: "children",
        type: "ReactNode",
        required: true,
        description: "Rich content to display in the hover card popover.",
      },
      {
        name: "side",
        type: "'top' | 'bottom' | 'left' | 'right'",
        required: false,
        defaultValue: "'bottom'",
        description: "Which side of the trigger to position the card.",
      },
      {
        name: "openDelay",
        type: "number",
        required: false,
        defaultValue: "300",
        description: "Delay in milliseconds before opening. Prevents flash on quick hover-through.",
      },
      {
        name: "closeDelay",
        type: "number",
        required: false,
        defaultValue: "200",
        description: "Delay in milliseconds before closing. Allows moving mouse to card content.",
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS class names for the container.",
      },
      {
        name: "style",
        type: "CSSProperties",
        required: false,
        description: "Inline style object for the container.",
      },
    ],
    guidelines: [
      {
        type: "do",
        text: "Use for supplementary information that doesn't fit inline (user profiles, link previews, glossary definitions).",
      },
      {
        type: "do",
        text: "Keep openDelay at 300ms or higher to prevent flash when user quickly moves mouse across triggers.",
      },
      {
        type: "do",
        text: "Ensure trigger has clear affordance (underline, different color, cursor change) to indicate it's hoverable.",
      },
      {
        type: "do",
        text: "Keep hover card content concise — aim for 2-4 lines of text or a small card layout.",
      },
      {
        type: "dont",
        text: "Don't use on mobile — hover doesn't work on touch devices. Use FlowPopover with tap trigger instead.",
      },
      {
        type: "dont",
        text: "Don't put critical actions in hover cards — they should be supplementary, not required for workflow.",
      },
      {
        type: "dont",
        text: "Don't nest hover cards inside other hover cards — it creates confusing UX.",
      },
      {
        type: "warning",
        text: "Desktop-only pattern. On mobile viewports, consider showing content inline or via tap/dialog.",
      },
    ],
  },
};

// ── Exported registry slice ──
export const displayPatterns: Record<string, PatternEntry> = {
  "display-patterns/avatar-group": avatarGroupEntry,
  "display-patterns/hover-card": hoverCardEntry,
};

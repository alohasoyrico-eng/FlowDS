/**
 * FLOW - Overlays Domain Demos
 * Demo functions for overlay components (FlowTooltip)
 */

import { FlowButton, FlowChip, FlowIconButton, FlowTooltip, Inline, Stack, Text } from "../../../../lib";
import { DemoGroup, DemoSection } from "../../../components/demo-helpers";
import { Callout } from "../../../components/doc-primitives";

const TOOLTIP_POSITIONS = ["top", "bottom", "left", "right"] as const;

export function FlowTooltipOverview() {
  return (
    <Stack gap={6}>
      <DemoSection
        title="Basic Usage"
        description="Hover over any element to show contextual information. Default delay is 500ms."
      >
        <DemoGroup>
          <Inline gap={3} wrap>
            <FlowTooltip content="This is a tooltip">
              <FlowButton>Hover me</FlowButton>
            </FlowTooltip>
            <FlowTooltip content="Edit item">
              <FlowIconButton icon="edit" variant="outline" aria-label="Edit" />
            </FlowTooltip>
            <FlowTooltip content="Delete item">
              <FlowIconButton icon="trash" variant="danger" aria-label="Delete" />
            </FlowTooltip>
          </Inline>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Positions"
        description="Four positions: top (default), bottom, left, right. Auto-adjusts if near viewport edge."
      >
        <DemoGroup>
          <Inline gap={3} wrap>
            {TOOLTIP_POSITIONS.map((pos) => (
              <FlowTooltip key={pos} content={`Position: ${pos}`} position={pos}>
                <FlowButton>{pos.toUpperCase()}</FlowButton>
              </FlowTooltip>
            ))}
          </Inline>
        </DemoGroup>
      </DemoSection>

      <DemoSection title="Sizes" description="Four size variants: sm, md (default), lg, xl.">
        <DemoGroup>
          <Inline gap={3} wrap>
            {(["sm", "md", "lg", "xl"] as const).map((s) => (
              <FlowTooltip key={s} content={`${s.toUpperCase()} tooltip`} size={s}>
                <FlowButton>{s.toUpperCase()}</FlowButton>
              </FlowTooltip>
            ))}
          </Inline>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Position × Size Matrix"
        description="Cross-reference showing all position and size combinations for visual consistency."
      >
        <DemoGroup>
          {TOOLTIP_POSITIONS.map((pos) => (
            <Stack key={pos} gap={1}>
              <Text role="overline" color="tertiary">
                {pos.toUpperCase()}
              </Text>
              <Inline gap={3} wrap>
                {(["sm", "md", "lg", "xl"] as const).map((s) => (
                  <FlowTooltip key={s} content={`${pos} ${s}`} position={pos} size={s}>
                    <FlowButton variant="outline" size={s}>
                      {s}
                    </FlowButton>
                  </FlowTooltip>
                ))}
              </Inline>
            </Stack>
          ))}
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Trigger Elements"
        description="Tooltips work with any focusable element: buttons, icon buttons, links, inputs, custom components."
      >
        <DemoGroup>
          <Inline gap={3} wrap>
            <FlowTooltip content="Standard button">
              <FlowButton variant="high">Button</FlowButton>
            </FlowTooltip>
            <FlowTooltip content="Icon-only button">
              <FlowIconButton icon="settings" variant="outline" aria-label="Settings" />
            </FlowTooltip>
            <FlowTooltip content="Outline button">
              <FlowButton variant="outline" leadingIcon="plus">
                Create
              </FlowButton>
            </FlowTooltip>
            <FlowTooltip content="Ghost button">
              <FlowButton variant="ghost" leadingIcon="edit">
                Edit
              </FlowButton>
            </FlowTooltip>
            <FlowTooltip content="Dangerous action">
              <FlowButton variant="danger" leadingIcon="trash">
                Delete
              </FlowButton>
            </FlowTooltip>
          </Inline>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Rich Content"
        description="Tooltip content accepts ReactNode - use for multi-line text, keyboard shortcuts, or formatted content."
      >
        <DemoGroup>
          <Inline gap={3} wrap>
            <FlowTooltip
              content={
                <span>
                  Line 1<br />
                  Line 2<br />
                  Line 3
                </span>
              }
            >
              <FlowButton variant="outline">Multi-line</FlowButton>
            </FlowTooltip>
            <FlowTooltip
              content={
                <span>
                  <strong>Bold text</strong>
                  <br />
                  Regular text
                </span>
              }
            >
              <FlowButton variant="outline">Formatted</FlowButton>
            </FlowTooltip>
            <FlowTooltip content="Keyboard shortcut: ⌘⇧P">
              <FlowButton variant="outline" leadingIcon="command">
                Command Palette
              </FlowButton>
            </FlowTooltip>
          </Inline>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Delay Customization"
        description="Default: 300ms show delay, 100ms hide delay. Use delay prop to customize (e.g., instant tooltips, longer delays)."
      >
        <DemoGroup>
          <Inline gap={3} wrap>
            <FlowTooltip content="Instant (0ms)" delay={0}>
              <FlowButton variant="outline">No delay</FlowButton>
            </FlowTooltip>
            <FlowTooltip content="Default (300ms)">
              <FlowButton variant="outline">Default</FlowButton>
            </FlowTooltip>
            <FlowTooltip content="Slow (600ms)" delay={600}>
              <FlowButton variant="outline">Slow</FlowButton>
            </FlowTooltip>
          </Inline>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Disabled State"
        description="Use disabled prop to prevent tooltip from showing - useful for conditional tooltips or debugging."
      >
        <DemoGroup>
          <Inline gap={3} wrap>
            <FlowTooltip content="This will show">
              <FlowButton variant="outline">Enabled tooltip</FlowButton>
            </FlowTooltip>
            <FlowTooltip content="This won't show" disabled>
              <FlowButton variant="outline">Disabled tooltip</FlowButton>
            </FlowTooltip>
          </Inline>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Common Patterns"
        description="Real-world tooltip usage patterns for buttons, icons, and actions."
      >
        <DemoGroup>
          <Text role="overline" color="tertiary">
            Actions with shortcuts
          </Text>
          <Inline gap={3} wrap>
            <FlowTooltip content="Save (⌘S)">
              <FlowIconButton icon="save" variant="high" aria-label="Save" />
            </FlowTooltip>
            <FlowTooltip content="Undo (⌘Z)">
              <FlowIconButton icon="undo" variant="outline" aria-label="Undo" />
            </FlowTooltip>
            <FlowTooltip content="Redo (⌘⇧Z)">
              <FlowIconButton icon="redo" variant="outline" aria-label="Redo" />
            </FlowTooltip>
          </Inline>
        </DemoGroup>

        <DemoGroup>
          <Text role="overline" color="tertiary">
            Icon-only buttons (required)
          </Text>
          <Inline gap={3} wrap>
            <FlowTooltip content="Edit item">
              <FlowIconButton icon="edit" variant="outline" aria-label="Edit" />
            </FlowTooltip>
            <FlowTooltip content="Share with team">
              <FlowIconButton icon="share" variant="outline" aria-label="Share" />
            </FlowTooltip>
            <FlowTooltip content="Add to favorites">
              <FlowIconButton icon="star" variant="outline" aria-label="Favorite" />
            </FlowTooltip>
            <FlowTooltip content="Delete permanently">
              <FlowIconButton icon="trash" variant="danger" aria-label="Delete" />
            </FlowTooltip>
          </Inline>
        </DemoGroup>

        <DemoGroup>
          <Text role="overline" color="tertiary">
            Context buttons
          </Text>
          <Inline gap={3} wrap>
            <FlowTooltip content="More options">
              <FlowIconButton icon="more-horizontal" variant="ghost" aria-label="More" />
            </FlowTooltip>
            <FlowTooltip content="Close panel">
              <FlowIconButton icon="x" variant="ghost" aria-label="Close" />
            </FlowTooltip>
            <FlowTooltip content="Open settings">
              <FlowIconButton icon="settings" variant="ghost" aria-label="Settings" />
            </FlowTooltip>
          </Inline>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Accessibility"
        description="Tooltips use role='tooltip' and aria-describedby. They appear on keyboard focus (Tab) and mouse hover."
      >
        <DemoGroup>
          <Callout intent="info">
            FlowTooltip automatically handles: role=&apos;tooltip&apos;, unique ID generation,
            aria-describedby linkage, keyboard focus visibility, and escape key to dismiss.
            Icon-only buttons MUST have both aria-label (for button) AND tooltip (for additional
            context).
          </Callout>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

export function FlowTooltipVariants() {
  return (
    <Stack gap={4}>
      <DemoSection
        title="Rich Content"
        description="Tooltip content accepts ReactNode - use for multi-line or styled tooltips."
      >
        <DemoGroup>
          <Inline gap={3} wrap>
            <FlowTooltip
              content={
                <span>
                  Line 1<br />
                  Line 2
                </span>
              }
            >
              <FlowButton variant="outline">Multi-line</FlowButton>
            </FlowTooltip>
            <FlowTooltip content="Keyboard shortcut: ⌘+S">
              <FlowButton variant="outline" leadingIcon="check">
                Save
              </FlowButton>
            </FlowTooltip>
          </Inline>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Position × Target Matrix"
        description="Tooltips on different target types to verify positioning consistency."
      >
        <DemoGroup>
          {TOOLTIP_POSITIONS.map((pos) => (
            <Stack key={pos} gap={1}>
              <Text role="overline" color="tertiary">
                {pos.toUpperCase()}
              </Text>
              <Inline gap={3} wrap>
                <FlowTooltip content={`${pos} on button`} position={pos}>
                  <FlowButton variant="outline">Button</FlowButton>
                </FlowTooltip>
                <FlowTooltip content={`${pos} on icon`} position={pos}>
                  <FlowIconButton icon="settings" variant="outline" aria-label="Settings" />
                </FlowTooltip>
                <FlowTooltip content={`${pos} on chip`} position={pos}>
                  <FlowChip onClick={() => {}}>Chip</FlowChip>
                </FlowTooltip>
              </Inline>
            </Stack>
          ))}
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Size × Position Matrix"
        description="Cross-reference of sizes and positions to verify visual consistency."
      >
        <DemoGroup>
          {(["sm", "md", "lg", "xl"] as const).map((s) => (
            <Stack key={s} gap={1}>
              <Text role="overline" color="tertiary">
                {s.toUpperCase()}
              </Text>
              <Inline gap={3} wrap>
                {TOOLTIP_POSITIONS.map((pos) => (
                  <FlowTooltip key={pos} content={`${s} ${pos}`} size={s} position={pos}>
                    <FlowButton variant="outline" size={s}>
                      {pos}
                    </FlowButton>
                  </FlowTooltip>
                ))}
              </Inline>
            </Stack>
          ))}
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

// Re-export demos from extended file
export {
  FlowDialogOverview,
  FlowDialogVariants,
  FlowBottomSheetOverview,
  FlowBottomSheetVariants,
  FlowContextMenuOverview,
  FlowContextMenuVariants,
  FlowMenuOverview,
  FlowMenuVariants,
  FlowPopoverOverview,
  FlowPopoverVariants,
} from "./demos-extended";

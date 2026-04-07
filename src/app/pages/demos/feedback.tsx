/**
 * FLOW Design System — Feedback Demos
 * FlowTooltip, FlowSnackbar, FlowProgressBar, FlowEmptyState interactive demos.
 */
import { useState } from "react";

import {
  Code,
  FlowButton,
  FlowChip,
  FlowEmptyState,
  FlowProgressBar,
  FlowSnackbarProvider,
  FlowTooltip,
  Grid,
  Inline,
  Stack,
  Surface,
  Text,
  useSnackbar,
} from "../../../lib";
import { DemoGroup, DemoSection, GRID_3_MIN } from "./helpers";

/** Inner component that uses the snackbar context. */
function SnackbarDemoInner() {
  const snackbar = useSnackbar();

  return (
    <DemoSection
      title="FlowSnackbar"
      description={
        <>
          Stackable toast notifications with <Code>aria-live=&quot;polite&quot;</Code>. 4 variants
          (info, success, warning, error). Auto-dismiss with configurable duration. Action button
          support.
        </>
      }
    >
      <DemoGroup>
        <Text role="overline">Trigger Variants</Text>
        <Inline gap={3} style={{ flexWrap: "wrap" }}>
          <FlowButton
            variant="medium"
            onClick={() =>
              snackbar.show({ message: "This is an informational message.", variant: "info" })
            }
          >
            Info Toast
          </FlowButton>
          <FlowButton
            variant="medium"
            onClick={() =>
              snackbar.show({ message: "Changes saved successfully!", variant: "success" })
            }
          >
            Success Toast
          </FlowButton>
          <FlowButton
            variant="medium"
            onClick={() =>
              snackbar.show({ message: "Your session will expire soon.", variant: "warning" })
            }
          >
            Warning Toast
          </FlowButton>
          <FlowButton
            variant="medium"
            onClick={() => snackbar.show({ message: "Failed to save changes.", variant: "error" })}
          >
            Error Toast
          </FlowButton>
          <FlowButton
            variant="low"
            onClick={() =>
              snackbar.show({
                message: "Item deleted.",
                variant: "info",
                action: {
                  label: "Undo",
                  onClick: () => snackbar.show({ message: "Undo successful!", variant: "success" }),
                },
                duration: 6000,
              })
            }
          >
            With Action
          </FlowButton>
        </Inline>
      </DemoGroup>

      <DemoGroup>
        <Text role="overline">Size Variants</Text>
        <Inline gap={3}>
          {(["sm", "md", "lg", "xl"] as const).map((s) => (
            <FlowButton
              key={s}
              variant="low"
              size="sm"
              onClick={() =>
                snackbar.show({ message: `Snackbar size="${s}"`, variant: "info", size: s })
              }
            >
              size=&quot;{s}&quot;
            </FlowButton>
          ))}
        </Inline>
      </DemoGroup>
    </DemoSection>
  );
}

export function FeedbackDemos() {
  // ── FlowProgressBar state ──
  const [progress, setProgress] = useState(65);

  return (
    <>
      <DemoSection
        title="FlowTooltip"
        description={
          <>
            Accessible tooltip on hover/focus. Uses <Code>role=&quot;tooltip&quot;</Code> and{" "}
            <Code>aria-describedby</Code>. 4 positions, configurable delay. Pure CSS animation via
            Momentum tokens.
          </>
        }
      >
        <DemoGroup>
          <Text role="overline">Positions — Top / Bottom / Left / Right</Text>
          <Inline gap="component" align="center" style={{ padding: "var(--ref-frame-space-8) 0" }}>
            <FlowTooltip content="Tooltip on top" position="top">
              <FlowButton variant="medium">Top</FlowButton>
            </FlowTooltip>
            <FlowTooltip content="Tooltip on bottom" position="bottom">
              <FlowButton variant="medium">Bottom</FlowButton>
            </FlowTooltip>
            <FlowTooltip content="Tooltip on left" position="left">
              <FlowButton variant="medium">Left</FlowButton>
            </FlowTooltip>
            <FlowTooltip content="Tooltip on right" position="right">
              <FlowButton variant="medium">Right</FlowButton>
            </FlowTooltip>
            <FlowTooltip content="I'm disabled" disabled>
              <FlowButton variant="low">Disabled tooltip</FlowButton>
            </FlowTooltip>
          </Inline>
        </DemoGroup>

        <DemoGroup>
          <Text role="overline">Rich Content / Delayed</Text>
          <Inline gap="component" align="center" style={{ padding: "var(--ref-frame-space-4) 0" }}>
            <FlowTooltip
              content={
                <>
                  <strong>Bold text</strong> with details
                </>
              }
              position="top"
            >
              <FlowChip variant="accent">Rich tooltip</FlowChip>
            </FlowTooltip>
            <FlowTooltip content="Appears after 500ms" delay={500} position="bottom">
              <FlowChip variant="tonal">Slow delay (500ms)</FlowChip>
            </FlowTooltip>
            <FlowTooltip content="Instant!" delay={0} position="top">
              <FlowChip>No delay</FlowChip>
            </FlowTooltip>
          </Inline>
        </DemoGroup>

        <DemoGroup>
          <Text role="overline">Size Variants</Text>
          <Inline gap="component" align="center" style={{ padding: "var(--ref-frame-space-4) 0" }}>
            {(["sm", "md", "lg", "xl"] as const).map((s) => (
              <FlowTooltip key={s} content={`Size: ${s}`} position="top" size={s}>
                <FlowChip size="sm">{s}</FlowChip>
              </FlowTooltip>
            ))}
          </Inline>
        </DemoGroup>
      </DemoSection>
      <FlowSnackbarProvider>
        <SnackbarDemoInner />
      </FlowSnackbarProvider>
      <DemoSection
        title="FlowProgressBar"
        description={
          <>
            Determinate and indeterminate progress bars. 4 sizes (sm/md/lg/xl), 4 color variants
            (default/success/warning/error). <Code>role=&quot;progressbar&quot;</Code> with proper
            ARIA attributes.
          </>
        }
      >
        <DemoGroup>
          <Text role="overline">Determinate — Variants</Text>
          <Stack gap="component" style={{ maxWidth: "var(--ref-frame-content-dialog)" }}>
            <Stack gap={1}>
              <Text role="caption" color="secondary">
                Default ({progress}%)
              </Text>
              <FlowProgressBar value={progress} showLabel />
            </Stack>
            <Stack gap={1}>
              <Text role="caption" color="secondary">
                Success
              </Text>
              <FlowProgressBar value={100} variant="success" showLabel />
            </Stack>
            <Stack gap={1}>
              <Text role="caption" color="secondary">
                Warning
              </Text>
              <FlowProgressBar value={78} variant="warning" showLabel />
            </Stack>
            <Stack gap={1}>
              <Text role="caption" color="secondary">
                Error
              </Text>
              <FlowProgressBar value={30} variant="error" showLabel />
            </Stack>
          </Stack>
          <Inline gap={3} style={{ marginTop: "var(--ref-frame-space-3)" }}>
            <FlowButton
              variant="low"
              size="sm"
              onClick={() => setProgress(Math.max(0, progress - 10))}
            >
              -10
            </FlowButton>
            <FlowButton
              variant="low"
              size="sm"
              onClick={() => setProgress(Math.min(100, progress + 10))}
            >
              +10
            </FlowButton>
            <FlowButton variant="low" size="sm" onClick={() => setProgress(0)}>
              Reset
            </FlowButton>
          </Inline>
        </DemoGroup>

        <DemoGroup>
          <Text role="overline">Sizes — sm / md / lg / xl</Text>
          <Stack gap="component" style={{ maxWidth: "var(--ref-frame-content-dialog)" }}>
            <Stack gap={1}>
              <Text role="caption" color="secondary">
                Small
              </Text>
              <FlowProgressBar value={45} size="sm" />
            </Stack>
            <Stack gap={1}>
              <Text role="caption" color="secondary">
                Medium (default)
              </Text>
              <FlowProgressBar value={45} size="md" />
            </Stack>
            <Stack gap={1}>
              <Text role="caption" color="secondary">
                Large
              </Text>
              <FlowProgressBar value={45} size="lg" />
            </Stack>
            <Stack gap={1}>
              <Text role="caption" color="secondary">
                Extra Large
              </Text>
              <FlowProgressBar value={45} size="xl" />
            </Stack>
          </Stack>
        </DemoGroup>

        <DemoGroup>
          <Text role="overline">Indeterminate</Text>
          <Stack gap="component" style={{ maxWidth: "var(--ref-frame-content-dialog)" }}>
            <FlowProgressBar aria-label="Loading data" />
            <FlowProgressBar size="sm" aria-label="Processing" />
          </Stack>
        </DemoGroup>
      </DemoSection>
      <DemoSection
        title="FlowEmptyState"
        description="Zero-data placeholder with icon, title, description, and optional actions. Compact mode for inline empty areas. Composes Stack, FlowIcon, Text, and Inline primitives."
      >
        <DemoGroup>
          <Text role="overline">Default / With Actions / Compact</Text>
          <Grid minItemWidth={GRID_3_MIN} gap="component">
            <Surface padding={0} border>
              <FlowEmptyState
                icon="search"
                title="No results found"
                description="Try adjusting your search terms or filters to find what you're looking for."
              />
            </Surface>
            <Surface padding={0} border>
              <FlowEmptyState
                icon="plus"
                title="No items yet"
                description="Create your first item to get started."
                action={
                  <FlowButton variant="high" size="sm">
                    Create Item
                  </FlowButton>
                }
                secondaryAction={
                  <FlowButton variant="low" size="sm">
                    Learn More
                  </FlowButton>
                }
              />
            </Surface>
            <Surface padding={0} border>
              <FlowEmptyState
                icon="info"
                title="No notifications"
                description="You're all caught up."
                compact
              />
            </Surface>
          </Grid>
        </DemoGroup>

        <DemoGroup>
          <Text role="overline">Size Variants — sm / md / lg / xl</Text>
          <Grid minItemWidth={GRID_3_MIN} gap="component">
            {(["sm", "md", "lg", "xl"] as const).map((s) => (
              <Surface key={s} padding={0} border>
                <FlowEmptyState
                  icon="search"
                  title={`size="${s}"`}
                  description="Icon, padding, and gap scale with size."
                  size={s}
                />
              </Surface>
            ))}
          </Grid>
        </DemoGroup>
      </DemoSection>
    </>
  );
}

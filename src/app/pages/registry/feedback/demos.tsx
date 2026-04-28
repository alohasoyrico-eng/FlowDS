/**
 * FLOW - Feedback Domain Demos
 * Demo functions for feedback components
 */

/**
 * Demo-specific width constraints for notification/feedback containers.
 * These panels are naturally narrow in production (sidebar, drawer, toast area).
 * TODO: Replace with LayoutGrid.Item span constraints before Gold to remove inline style.
 */
const DEMO_PANEL_MAX_WIDTH = "600px";
const DEMO_COMPACT_MAX_WIDTH = "400px";

import { useState } from "react";

import {
  FlowCircularProgress,
  FlowInlineValidationMessage,
  FlowProgressBar,
  FlowSkeleton,
  Inline,
  Stack,
  Text,
} from "@flow/design-system";
import { DemoGroup, DemoSection } from "../../../components/demo-helpers";
import { SIZES } from "../types";
import { DurationComparisonDemo } from "../../../components/motion-demo-section";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowSkeleton Demos
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function FlowSkeletonOverview() {
  const [loading, setLoading] = useState(true);

  return (
    <Stack gap="section">
      <DemoSection
        title="Basic Usage"
        description="Skeleton placeholders that mimic content layout during loading."
      >
        <DemoGroup>
          <Stack gap="subsection" style={{ maxWidth: "var(--sys-frame-content-prose)" }}>
            <FlowSkeleton variant="text" width="100%" />
            <FlowSkeleton variant="text" width="80%" />
            <FlowSkeleton variant="text" width="90%" />
            <FlowSkeleton variant="circular" width={64} height={64} />
            <FlowSkeleton variant="rectangular" width="100%" height={200} />
          </Stack>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Variants"
        description="Different skeleton shapes for different content types."
      >
        <DemoGroup>
          <Stack gap="subsection" style={{ maxWidth: "var(--sys-frame-content-prose)" }}>
            <Text variant="caption">Text (single line)</Text>
            <FlowSkeleton variant="text" width="100%" />

            <Text variant="caption">Circular (avatar)</Text>
            <FlowSkeleton variant="circular" width={48} height={48} />

            <Text variant="caption">Rectangular (card/image)</Text>
            <FlowSkeleton variant="rectangular" width="100%" height={150} />
          </Stack>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Loading Pattern"
        description="Toggle between skeleton and actual content."
      >
        <DemoGroup>
          <Stack gap="component-lg" style={{ maxWidth: DEMO_PANEL_MAX_WIDTH }}>
            <button onClick={() => setLoading(!loading)}>Toggle Loading</button>
            {loading ? (
              <Stack gap={2}>
                <FlowSkeleton variant="text" width="100%" />
                <FlowSkeleton variant="text" width="80%" />
                <FlowSkeleton variant="text" width="90%" />
              </Stack>
            ) : (
              <Text>
                This is the actual content that appears after loading completes. Skeleton prevents
                layout shift by matching the dimensions of the real content.
              </Text>
            )}
          </Stack>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

export function FlowSkeletonVariants() {
  return (
    <Stack gap="component-lg">
      <DemoSection title="All Variants" description="Skeleton shapes for different content types.">
        <DemoGroup>
          <Stack gap="subsection" style={{ maxWidth: DEMO_PANEL_MAX_WIDTH }}>
            <div>
              <Text variant="caption" color="secondary">
                Text Lines
              </Text>
              <Stack gap={2}>
                <FlowSkeleton variant="text" width="100%" />
                <FlowSkeleton variant="text" width="95%" />
                <FlowSkeleton variant="text" width="85%" />
              </Stack>
            </div>

            <div>
              <Text variant="caption" color="secondary">
                Circular
              </Text>
              <Inline gap={2}>
                <FlowSkeleton variant="circular" width={32} height={32} />
                <FlowSkeleton variant="circular" width={48} height={48} />
                <FlowSkeleton variant="circular" width={64} height={64} />
              </Inline>
            </div>

            <div>
              <Text variant="caption" color="secondary">
                Rectangular
              </Text>
              <Stack gap={2}>
                <FlowSkeleton variant="rectangular" width="100%" height={100} />
                <FlowSkeleton variant="rectangular" width="100%" height={200} />
              </Stack>
            </div>
          </Stack>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowProgressBar Demos
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function FlowProgressBarOverview() {
  const [progress, setProgress] = useState(45);

  return (
    <Stack gap="subsection">
      <DemoSection
        title="Basic Usage"
        description="Horizontal progress indicator for determinate or indeterminate loading."
      >
        <DemoGroup>
          <Stack gap="component-lg" style={{ maxWidth: DEMO_PANEL_MAX_WIDTH }}>
            <FlowProgressBar value={progress} />
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={(e) => setProgress(Number(e.target.value))}
              style={{ width: "100%" }}
            />
            <Text variant="caption">Current: {progress}%</Text>
          </Stack>
        </DemoGroup>
      </DemoSection>

      <DemoSection title="Indeterminate" description="Loading state when progress is unknown.">
        <DemoGroup>
          <Stack gap="component-lg" style={{ maxWidth: DEMO_PANEL_MAX_WIDTH }}>
            <FlowProgressBar indeterminate />
          </Stack>
        </DemoGroup>
      </DemoSection>

      <DemoSection title="Sizes" description="Different heights for different contexts.">
        <DemoGroup>
          <Stack gap="component-lg" style={{ maxWidth: DEMO_PANEL_MAX_WIDTH }}>
            {SIZES.map((size) => (
              <div key={size}>
                <Text variant="caption" color="secondary">
                  {size}
                </Text>
                <FlowProgressBar size={size} value={60} />
              </div>
            ))}
          </Stack>
        </DemoGroup>
      </DemoSection>

      <DurationComparisonDemo />
    </Stack>
  );
}

export function FlowProgressBarVariants() {
  return (
    <Stack gap="component-lg">
      <DemoSection title="Progress States" description="Different progress values.">
        <DemoGroup>
          <Stack gap="component-lg" style={{ maxWidth: DEMO_PANEL_MAX_WIDTH }}>
            <FlowProgressBar value={0} label="Starting..." />
            <FlowProgressBar value={25} label="Quarter done" />
            <FlowProgressBar value={50} label="Halfway" />
            <FlowProgressBar value={75} label="Almost there" />
            <FlowProgressBar value={100} label="Complete!" />
          </Stack>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowCircularProgress Demos
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function FlowCircularProgressOverview() {
  const [progress, setProgress] = useState(65);

  return (
    <Stack gap="subsection">
      <DemoSection
        title="Basic Usage"
        description="Circular progress indicator for inline loading or completion percentage."
      >
        <DemoGroup>
          <Stack
            gap="component-lg"
            style={{ maxWidth: DEMO_COMPACT_MAX_WIDTH, alignItems: "center" }}
          >
            <FlowCircularProgress value={progress} size={120} showLabel />
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={(e) => setProgress(Number(e.target.value))}
              style={{ width: "100%" }}
            />
          </Stack>
        </DemoGroup>
      </DemoSection>

      <DemoSection title="Indeterminate" description="Spinning loader when progress is unknown.">
        <DemoGroup>
          <Inline gap="component-lg">
            <FlowCircularProgress indeterminate size={32} />
            <FlowCircularProgress indeterminate size={48} />
            <FlowCircularProgress indeterminate size={64} />
          </Inline>
        </DemoGroup>
      </DemoSection>

      <DemoSection title="Sizes" description="Different sizes for different contexts.">
        <DemoGroup>
          <Inline gap="component-lg">
            {SIZES.map((size) => (
              <FlowCircularProgress
                key={size}
                value={75}
                size={size === "sm" ? 32 : size === "md" ? 48 : size === "lg" ? 64 : 96}
                showLabel
              />
            ))}
          </Inline>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

export function FlowCircularProgressVariants() {
  return (
    <Stack gap="component-lg">
      <DemoSection title="Progress States" description="Different progress values with labels.">
        <DemoGroup>
          <Inline gap="subsection">
            <FlowCircularProgress value={0} size={80} showLabel />
            <FlowCircularProgress value={33} size={80} showLabel />
            <FlowCircularProgress value={66} size={80} showLabel />
            <FlowCircularProgress value={100} size={80} showLabel />
          </Inline>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowInlineValidationMessage Demos
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function FlowInlineValidationMessageOverview() {
  return (
    <Stack gap="subsection">
      <DemoSection
        title="Basic Usage"
        description="Inline validation feedback shown below form fields."
      >
        <DemoGroup>
          <Stack gap="component-lg" style={{ maxWidth: DEMO_COMPACT_MAX_WIDTH }}>
            <FlowInlineValidationMessage status="error" message="This field is required" />
            <FlowInlineValidationMessage status="warning" message="This action cannot be undone" />
            <FlowInlineValidationMessage status="success" message="Changes saved successfully" />
            <FlowInlineValidationMessage
              status="info"
              message="Password must be at least 8 characters"
            />
          </Stack>
        </DemoGroup>
      </DemoSection>

      <DemoSection title="With/Without Icons" description="Icons can be hidden if needed.">
        <DemoGroup>
          <Stack gap="component-lg" style={{ maxWidth: DEMO_COMPACT_MAX_WIDTH }}>
            <FlowInlineValidationMessage status="error" message="With icon (default)" icon />
            <FlowInlineValidationMessage status="error" message="Without icon" icon={false} />
          </Stack>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

export function FlowInlineValidationMessageVariants() {
  return (
    <Stack gap="component-lg">
      <DemoSection title="All Variants" description="Four semantic variants with icons.">
        <DemoGroup>
          <Stack gap="component" style={{ maxWidth: DEMO_COMPACT_MAX_WIDTH }}>
            <FlowInlineValidationMessage status="error" message="Error: Invalid email format" />
            <FlowInlineValidationMessage
              status="warning"
              message="Warning: This will delete all data"
            />
            <FlowInlineValidationMessage status="success" message="Success: Profile updated" />
            <FlowInlineValidationMessage status="info" message="Info: This feature is in beta" />
          </Stack>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

/**
 * FLOW - Feedback Domain Registry
 * Component metadata, demos, and developer guides for feedback components.
 */
import React from "react";
import { FlowProgressBar } from "../../../../lib";
import type { ComponentEntry } from "../types";
import {
  FlowCircularProgressOverview,
  FlowCircularProgressVariants,
  FlowInlineValidationMessageOverview,
  FlowInlineValidationMessageVariants,
  FlowProgressBarOverview,
  FlowProgressBarVariants,
  FlowSkeletonOverview,
  FlowSkeletonVariants,
} from "./demos";

export const FEEDBACK_REGISTRY: Record<string, ComponentEntry> = {
  // ─── FlowSkeleton ───
  "feedback/flow-skeleton": {
    domain: "Feedback",
    spec: {
      name: "FlowSkeleton",
      purpose:
        "Placeholder loading state that mimics content layout. Prevents layout shift during data loading by maintaining exact dimensions of the real content. Supports text (single line), circular (avatar), and rectangular (card/image) variants with animated pulse shimmer effect.",
      platform: "shared",
      anatomy: [
        {
          part: "Skeleton container",
          description: "Block or inline element with background gradient and animation",
          tokens: ["comp.skeleton.bg", "comp.skeleton.shimmer", "comp.skeleton.radius"],
        },
        {
          part: "Pulse animation",
          description: "Subtle opacity pulse that indicates loading state",
          tokens: ["comp.skeleton.animation-duration"],
        },
      ],
      variants: ["Text (single line)", "Circular (avatar)", "Rectangular (card)", "Custom shape"],
      states: ["animating (pulse shimmer)"],
      accessibility: {
        handled: [
          "aria-busy='true' on parent container",
          "aria-hidden='true' on skeleton itself",
          "Screen readers announce loading state via parent container",
        ],
        required: [
          "Wrap skeletons in container with aria-busy='true'",
          "Provide sr-only text describing what's loading",
        ],
        keyboard: [],
      },
    },
    demos: {
      overview: () => <FlowSkeletonOverview />,
      variants: () => <FlowSkeletonVariants />,
    },
    developer: {
      reactImport: `import { FlowSkeleton } from "@flow/design-system";`,
      reactUsage: `// Text skeleton
<FlowSkeleton variant="text" width="100%" />
<FlowSkeleton variant="text" width="80%" />

// Circular (avatar)
<FlowSkeleton variant="circular" width={48} height={48} />

// Rectangular (card/image)
<FlowSkeleton variant="rectangular" width="100%" height={200} />

// Custom shape
<FlowSkeleton width={300} height={150} style={{ borderRadius: "var(--ref-frame-radius-3)" }} />

// Loading pattern with aria-busy
<div aria-busy={isLoading} aria-label="Loading user profile">
  {isLoading ? (
    <Stack gap={2}>
      <FlowSkeleton variant="circular" width={64} height={64} />
      <FlowSkeleton variant="text" width="100%" />
      <FlowSkeleton variant="text" width="80%" />
    </Stack>
  ) : (
    <UserProfile data={user} />
  )}
</div>`,
      flutterImport: `import 'package:flow_ds/feedback.dart';`,
      flutterUsage: `FlowSkeleton(
  variant: SkeletonVariant.text,
  width: double.infinity,
)

// Circular
FlowSkeleton(
  variant: SkeletonVariant.circular,
  width: 48,
  height: 48,
)

// Rectangular
FlowSkeleton(
  variant: SkeletonVariant.rectangular,
  width: double.infinity,
  height: 200,
)`,
      notes:
        "FlowSkeleton prevents layout shift by matching the exact dimensions of the content it replaces. Use text variant for single lines, circular for avatars, and rectangular for cards/images. The pulse animation is subtle and compositor-only for smooth performance. Always wrap skeletons in a container with aria-busy='true' for accessibility.",
      props: [
        {
          name: "variant",
          type: '"text" | "circular" | "rectangular"',
          default: '"text"',
          description:
            "Skeleton shape — text for single lines, circular for avatars, rectangular for cards.",
        },
        {
          name: "width",
          type: "number | string",
          description: "Skeleton width (px or %).",
          required: true,
        },
        {
          name: "height",
          type: "number | string",
          description: "Skeleton height (px or %). Auto-calculated for text variant.",
          required: false,
        },
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes.",
          required: false,
        },
        {
          name: "style",
          type: "CSSProperties",
          description: "Inline styles (e.g., custom borderRadius).",
          required: false,
        },
      ],
      guidelines: [
        {
          intent: "do",
          text: "Match skeleton dimensions to real content to prevent layout shift.",
        },
        {
          intent: "do",
          text: "Use multiple skeletons to mimic multi-line text or complex layouts.",
        },
        {
          intent: "do",
          text: "Wrap skeletons in container with aria-busy='true' for screen readers.",
        },
        {
          intent: "dont",
          text: "Don't use skeletons for indeterminate loading — use FlowProgressBar or FlowCircularProgress instead.",
        },
        {
          intent: "dont",
          text: "Don't animate skeletons with heavy effects — stick to subtle pulse for performance.",
        },
        {
          intent: "info",
          text: "Skeleton animation uses CSS animation for compositor-only rendering.",
        },
        {
          intent: "info",
          text: "Text variant auto-calculates height based on font size (typically 16-24px).",
        },
        { intent: "info", text: "Circular variant is a perfect circle (width === height)." },
      ],
    },
  },

  // ─── FlowProgressBar ───
  "feedback/flow-progress-bar": {
    domain: "Feedback",
    spec: {
      name: "FlowProgressBar",
      purpose:
        "Horizontal progress indicator for determinate (0-100%) or indeterminate (looping animation) loading. Shows linear progress with optional label. Supports four sizes and customizable height.",
      platform: "shared",
      anatomy: [
        {
          part: "Track container",
          description: "Background bar showing total progress range",
          tokens: ["comp.progressbar.bg", "comp.progressbar.radius", "comp.progressbar.height"],
        },
        {
          part: "Fill bar",
          description: "Foreground bar showing current progress",
          tokens: ["comp.progressbar.fill", "comp.progressbar.fill-animation"],
        },
        {
          part: "Label (optional)",
          description: "Text above or below bar showing percentage or status",
          tokens: ["comp.progressbar.label-size"],
        },
      ],
      variants: ["Determinate (0-100%)", "Indeterminate (looping)", "With label"],
      states: ["idle", "loading", "complete"],
      accessibility: {
        handled: [
          "role='progressbar'",
          "aria-valuenow for determinate progress",
          "aria-valuemin='0' and aria-valuemax='100'",
          "aria-label or aria-labelledby for screen readers",
        ],
        required: ["Provide aria-label describing what's loading"],
        keyboard: [],
      },
    },
    demos: {
      overview: () => <FlowProgressBarOverview />,
      variants: () => <FlowProgressBarVariants />,
    },
    developer: {
      reactImport: `import { FlowProgressBar } from "@flow/design-system";`,
      reactUsage: `// Determinate progress
<FlowProgressBar value={45} />

// With label
<FlowProgressBar value={75} label="Loading... 75%" />

// Indeterminate (unknown progress)
<FlowProgressBar indeterminate />

// All sizes
<FlowProgressBar size="sm" value={60} />
<FlowProgressBar size="md" value={60} />
<FlowProgressBar size="lg" value={60} />
<FlowProgressBar size="xl" value={60} />

// Upload progress example
const [progress, setProgress] = useState(0);

<FlowProgressBar
  value={progress}
  label={\`Uploading... \${progress}%\`}
  aria-label="File upload progress"
/>`,
      flutterImport: `import 'package:flow_ds/feedback.dart';`,
      flutterUsage: `FlowProgressBar(
  value: 45,
)

// Indeterminate
FlowProgressBar(
  indeterminate: true,
)

// With label
FlowProgressBar(
  value: 75,
  label: 'Loading... 75%',
)`,
      notes:
        "FlowProgressBar shows linear progress from left to right. Use determinate variant when you know the exact percentage (file uploads, multi-step forms). Use indeterminate when progress is unknown (initial page load, API calls). The fill bar animates smoothly via CSS transition.",
      props: [
        {
          name: "value",
          type: "number",
          description: "Progress value (0-100). Required for determinate progress.",
          required: false,
        },
        {
          name: "indeterminate",
          type: "boolean",
          default: "false",
          description: "Shows looping animation when progress is unknown.",
        },
        {
          name: "label",
          type: "string",
          description: "Optional label text above/below bar.",
          required: false,
        },
        {
          name: "size",
          type: '"sm" | "md" | "lg" | "xl"',
          default: '"md"',
          description: "Size variant — controls bar height.",
        },
        {
          name: "aria-label",
          type: "string",
          description: "Accessible label for screen readers.",
          required: false,
        },
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes.",
          required: false,
        },
        { name: "style", type: "CSSProperties", description: "Inline styles.", required: false },
      ],
      guidelines: [
        {
          intent: "do",
          text: "Use determinate progress for known durations (uploads, downloads, multi-step forms).",
        },
        {
          intent: "do",
          text: "Use indeterminate progress for unknown durations (API calls, initial loads).",
        },
        { intent: "do", text: "Provide aria-label describing what's loading for screen readers." },
        {
          intent: "dont",
          text: "Don't use progress bars for instant actions — use loading spinners instead.",
        },
        { intent: "dont", text: "Don't jump progress backwards — it creates confusing UX." },
        {
          intent: "info",
          text: "Progress bar fill animates via CSS transition for smooth visual updates.",
        },
        {
          intent: "info",
          text: "Indeterminate animation uses CSS keyframes for compositor-only rendering.",
        },
        {
          intent: "info",
          text: "Density-aware: height shifts ±1-2px in compact/comfortable modes.",
        },
      ],
    },
    playground: {
      renderPreview: (props: Record<string, unknown>) =>
        React.createElement(FlowProgressBar, {
          value: props.value ?? 60,
          size: props.size,
          showLabel: !!props.showLabel,
        } as React.ComponentProps<typeof FlowProgressBar>),
      defaults: { value: 60, size: "md", showLabel: false },
    },
  },

  // ─── FlowCircularProgress ───
  "feedback/flow-circular-progress": {
    domain: "Feedback",
    spec: {
      name: "FlowCircularProgress",
      purpose:
        "Circular progress indicator for inline loading or completion percentage. Supports determinate (0-100% with optional center label) and indeterminate (spinning) variants. Configurable size and stroke width.",
      platform: "shared",
      anatomy: [
        {
          part: "SVG circle",
          description: "Circular track showing total progress range",
          tokens: ["comp.circularprogress.track", "comp.circularprogress.stroke-width"],
        },
        {
          part: "Progress arc",
          description: "Colored arc showing current progress",
          tokens: ["comp.circularprogress.fill", "comp.circularprogress.stroke-linecap"],
        },
        {
          part: "Center label (optional)",
          description: "Percentage or custom text in circle center",
          tokens: ["comp.circularprogress.label-size"],
        },
      ],
      variants: ["Determinate (0-100%)", "Indeterminate (spinning)", "With center label"],
      states: ["spinning", "complete"],
      accessibility: {
        handled: [
          "role='progressbar'",
          "aria-valuenow for determinate progress",
          "aria-valuemin='0' and aria-valuemax='100'",
          "aria-label for screen readers",
        ],
        required: ["Provide aria-label describing what's loading"],
        keyboard: [],
      },
    },
    demos: {
      overview: () => <FlowCircularProgressOverview />,
      variants: () => <FlowCircularProgressVariants />,
    },
    developer: {
      reactImport: `import { FlowCircularProgress } from "@flow/design-system";`,
      reactUsage: `// Determinate progress
<FlowCircularProgress value={65} size={80} />

// With center label
<FlowCircularProgress value={75} size={100} showLabel />

// Indeterminate (spinning)
<FlowCircularProgress indeterminate size={48} />

// Custom label
<FlowCircularProgress
  value={45}
  size={120}
  label="45/100"
/>

// All sizes
<FlowCircularProgress value={60} size={32} />
<FlowCircularProgress value={60} size={48} />
<FlowCircularProgress value={60} size={64} />
<FlowCircularProgress value={60} size={96} />`,
      flutterImport: `import 'package:flow_ds/feedback.dart';`,
      flutterUsage: `FlowCircularProgress(
  value: 65,
  size: 80,
)

// With label
FlowCircularProgress(
  value: 75,
  size: 100,
  showLabel: true,
)

// Indeterminate
FlowCircularProgress(
  indeterminate: true,
  size: 48,
)`,
      notes:
        "FlowCircularProgress is ideal for inline loading states or showing completion percentages in dashboards. Use determinate variant with showLabel for progress tracking (file uploads, quiz completion). Use indeterminate for unknown durations (button loading states). The spinning animation is smooth and compositor-only.",
      props: [
        {
          name: "value",
          type: "number",
          description: "Progress value (0-100). Required for determinate progress.",
          required: false,
        },
        { name: "size", type: "number", default: "48", description: "Circle diameter in pixels." },
        {
          name: "indeterminate",
          type: "boolean",
          default: "false",
          description: "Shows spinning animation when progress is unknown.",
        },
        {
          name: "showLabel",
          type: "boolean",
          default: "false",
          description: "Shows percentage in circle center (only for determinate).",
        },
        {
          name: "label",
          type: "string",
          description: "Custom label text in circle center (overrides percentage).",
          required: false,
        },
        {
          name: "strokeWidth",
          type: "number",
          description:
            "Circle stroke width in pixels. Auto-calculated based on size if not provided.",
          required: false,
        },
        {
          name: "aria-label",
          type: "string",
          description: "Accessible label for screen readers.",
          required: false,
        },
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes.",
          required: false,
        },
        { name: "style", type: "CSSProperties", description: "Inline styles.", required: false },
      ],
      guidelines: [
        {
          intent: "do",
          text: "Use circular progress for inline loading (button states, small spaces).",
        },
        { intent: "do", text: "Use showLabel to display percentage for completion tracking." },
        {
          intent: "do",
          text: "Match size to context (32px for buttons, 64-120px for dashboards).",
        },
        {
          intent: "dont",
          text: "Don't use large circular progress for full-page loading — use FlowProgressBar instead.",
        },
        {
          intent: "dont",
          text: "Don't show label on indeterminate progress — it doesn't make sense.",
        },
        { intent: "info", text: "Progress arc uses SVG stroke-dasharray for smooth animation." },
        { intent: "info", text: "Indeterminate spinning uses CSS keyframes for 360° rotation." },
        {
          intent: "info",
          text: "Stroke width auto-scales based on size (typically size/8 to size/12).",
        },
      ],
    },
  },

  // ─── FlowInlineValidationMessage ───
  "feedback/flow-inline-validation-message": {
    domain: "Feedback",
    spec: {
      name: "FlowInlineValidationMessage",
      purpose:
        "Inline validation feedback shown below form fields. Communicates errors, warnings, success, and info states with semantic colors and optional icons. Designed for real-time form validation.",
      platform: "shared",
      anatomy: [
        {
          part: "Message container",
          description: "Inline wrapper with semantic color",
          tokens: ["comp.validation.text", "comp.validation.icon"],
        },
        {
          part: "Icon (optional)",
          description: "Leading icon indicating message type (warning, check, info)",
          tokens: ["comp.validation.icon-size"],
        },
        {
          part: "Message text",
          description: "Validation message content",
          tokens: ["comp.validation.font-size"],
        },
      ],
      variants: ["Error", "Warning", "Success", "Info"],
      states: ["visible", "hidden"],
      accessibility: {
        handled: [
          "role='alert' for error messages",
          "aria-live='polite' for warning/info messages",
          "Semantic color + icon convey message type",
        ],
        required: [
          "Link validation message to input via aria-describedby",
          "Ensure message is visible and readable",
        ],
        keyboard: [],
      },
    },
    demos: {
      overview: () => <FlowInlineValidationMessageOverview />,
      variants: () => <FlowInlineValidationMessageVariants />,
    },
    developer: {
      reactImport: `import { FlowInlineValidationMessage } from "@flow/design-system";`,
      reactUsage: `// Error message
<FlowInlineValidationMessage
  variant="error"
  message="This field is required"
/>

// Warning
<FlowInlineValidationMessage
  variant="warning"
  message="This action cannot be undone"
/>

// Success
<FlowInlineValidationMessage
  variant="success"
  message="Changes saved successfully"
/>

// Info
<FlowInlineValidationMessage
  variant="info"
  message="Password must be at least 8 characters"
/>

// With input (linked via aria-describedby)
<FlowTextInput
  label="Email"
  error={emailError}
  aria-describedby="email-error"
/>
{emailError && (
  <FlowInlineValidationMessage
    id="email-error"
    variant="error"
    message={emailError}
  />
)}

// Without icon
<FlowInlineValidationMessage
  variant="error"
  message="Error message without icon"
  icon={false}
/>`,
      flutterImport: `import 'package:flow_ds/feedback.dart';`,
      flutterUsage: `FlowInlineValidationMessage(
  variant: ValidationVariant.error,
  message: 'This field is required',
)

// Success
FlowInlineValidationMessage(
  variant: ValidationVariant.success,
  message: 'Changes saved',
)`,
      notes:
        "FlowInlineValidationMessage provides immediate feedback for form validation. Use error for validation failures, warning for cautionary messages, success for confirmation, and info for helpful hints. Always link messages to inputs via aria-describedby for screen reader accessibility. Messages use role='alert' (errors) or aria-live='polite' (others) for dynamic announcements.",
      props: [
        {
          name: "variant",
          type: '"error" | "warning" | "success" | "info"',
          description: "Message type — controls color and icon.",
          required: true,
        },
        {
          name: "message",
          type: "string",
          description: "Validation message text.",
          required: true,
        },
        {
          name: "icon",
          type: "boolean",
          default: "true",
          description: "Shows leading icon indicating message type.",
        },
        {
          name: "id",
          type: "string",
          description: "HTML id for aria-describedby linking.",
          required: false,
        },
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes.",
          required: false,
        },
        { name: "style", type: "CSSProperties", description: "Inline styles.", required: false },
      ],
      guidelines: [
        { intent: "do", text: "Use error for validation failures that prevent form submission." },
        { intent: "do", text: "Use warning for cautionary messages that don't block submission." },
        {
          intent: "do",
          text: "Use success for confirmation messages after successful validation.",
        },
        { intent: "do", text: "Link messages to inputs via aria-describedby for accessibility." },
        {
          intent: "dont",
          text: "Don't show multiple messages for one field — consolidate into one error.",
        },
        {
          intent: "dont",
          text: "Don't use vague messages like 'Invalid' — be specific and actionable.",
        },
        {
          intent: "info",
          text: "Error messages use role='alert' for immediate screen reader announcement.",
        },
        {
          intent: "info",
          text: "Warning/info messages use aria-live='polite' to avoid interrupting user.",
        },
        { intent: "info", text: "Icons are aria-hidden — message text conveys full meaning." },
      ],
    },
  },
};

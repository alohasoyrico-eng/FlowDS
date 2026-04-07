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
  FlowButton,
  FlowChip,
  FlowEmptyState,
  FlowIconButton,
  FlowNotificationPanel,
  FlowSnackbarProvider,
  FlowTextInput,
  Grid,
  Inline,
  type NotificationItem,
  Stack,
  Surface,
  Text,
  useSnackbar,
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
// FEEDBACK PATTERNS REGISTRY
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// ── FlowEmptyState ──

function EmptyStateOverviewDemo() {
  return (
    <Stack gap={6}>
      <DemoSection
        title="First-Use Empty State"
        description="Welcoming empty state for brand-new users. Guides them to their first action."
      >
        <Surface variant="primary" padding="container">
          <Stack align="center" justify="center" style={{ minHeight: "320px" }}>
            <FlowEmptyState
              icon="package"
              title="Welcome to your Dashboard"
              description="You haven't created any projects yet. Get started by creating your first project."
              action={
                <FlowButton variant="high" onClick={() => alert("Create project clicked")}>
                  Create Project
                </FlowButton>
              }
            />
          </Stack>
        </Surface>
      </DemoSection>

      <DemoSection
        title="No Results Empty State"
        description="User has searched or filtered but no results match. Encourages action to adjust search."
      >
        <Surface variant="primary" padding="container">
          <Stack align="center" justify="center" style={{ minHeight: "320px" }}>
            <FlowEmptyState
              icon="search"
              title="No projects found"
              description='No projects match "Enterprise Dashboard". Try adjusting your search.'
              action={
                <FlowButton variant="medium" onClick={() => alert("Clear search clicked")}>
                  Clear Search
                </FlowButton>
              }
            />
          </Stack>
        </Surface>
      </DemoSection>

      <DemoSection
        title="Error Empty State"
        description="Something went wrong. Provides a recovery action."
      >
        <Surface variant="primary" padding="container">
          <Stack align="center" justify="center" style={{ minHeight: "320px" }}>
            <FlowEmptyState
              icon="alert-circle"
              title="Failed to load projects"
              description="We couldn't fetch your projects. Check your connection and try again."
              action={
                <FlowButton variant="high" onClick={() => alert("Retry clicked")}>
                  Retry
                </FlowButton>
              }
            />
          </Stack>
        </Surface>
      </DemoSection>

      <DemoSection
        title="Offline Empty State"
        description="Device is offline. Informs user of connectivity issue."
      >
        <Surface variant="primary" padding="container">
          <Stack align="center" justify="center" style={{ minHeight: "320px" }}>
            <FlowEmptyState
              icon="wifi-off"
              title="You're offline"
              description="Check your internet connection to view your projects."
            />
          </Stack>
        </Surface>
      </DemoSection>

      <DemoSection
        title="Generic Empty State"
        description="Generic empty state for custom scenarios."
      >
        <Surface variant="primary" padding="container">
          <Stack align="center" justify="center" style={{ minHeight: "320px" }}>
            <FlowEmptyState
              icon="archive"
              title="No archived items"
              description="Items you archive will appear here for 30 days before permanent deletion."
            />
          </Stack>
        </Surface>
      </DemoSection>

      <DemoSection
        title="Empty State with Icon"
        description="Custom icon for brand-specific empty states."
      >
        <Surface variant="primary" padding="container">
          <Stack align="center" justify="center" style={{ minHeight: "320px" }}>
            <FlowEmptyState
              icon="inbox"
              title="Inbox Zero"
              description="All caught up! You've handled all your notifications."
            />
          </Stack>
        </Surface>
      </DemoSection>

      <DemoSection
        title="Compact Empty State"
        description="Smaller variant for inline contexts (e.g., within a card or section)."
      >
        <Surface variant="secondary" padding="container">
          <FlowEmptyState
            size="sm"
            icon="message-circle"
            title="No comments yet"
            description="Be the first to comment."
            action={
              <FlowButton size="sm" variant="medium" onClick={() => alert("Add comment")}>
                Add Comment
              </FlowButton>
            }
          />
        </Surface>
      </DemoSection>

      <DemoSection
        title="Secondary Action"
        description="Empty state with both primary and secondary actions."
      >
        <Surface variant="primary" padding="container">
          <Stack align="center" justify="center" style={{ minHeight: "320px" }}>
            <FlowEmptyState
              icon="users"
              title="No team members"
              description="Invite team members to collaborate on projects together."
              action={
                <FlowButton variant="high" onClick={() => alert("Invite clicked")}>
                  Invite Team
                </FlowButton>
              }
              secondaryAction={
                <FlowButton variant="low" onClick={() => alert("Learn more clicked")}>
                  Learn More
                </FlowButton>
              }
            />
          </Stack>
        </Surface>
      </DemoSection>

      <DemoSection
        title="Within Data Table"
        description="Empty state as DataTable's zero-state, seamlessly integrated."
      >
        <Surface variant="primary" padding="control">
          <Stack gap={2}>
            <Inline gap={2} padding={2}>
              <FlowTextInput placeholder="Search..." size="sm" style={{ flex: 1 }} />
              <FlowButton variant="high" size="sm">
                Add Item
              </FlowButton>
            </Inline>
            <Divider />
            <Stack align="center" justify="center" style={{ minHeight: "280px" }}>
              <FlowEmptyState
                size="sm"
                icon="filter"
                title="No items found"
                description="Try adjusting your search or add a new item."
                action={
                  <FlowButton size="sm" variant="low" onClick={() => alert("Clear filters")}>
                    Clear Filters
                  </FlowButton>
                }
              />
            </Stack>
          </Stack>
        </Surface>
      </DemoSection>

      <DemoSection
        title="Dashboard Widget Empty"
        description="Empty state for dashboard cards/widgets with metrics."
      >
        <Grid minItemWidth="240px" gap="control">
          {["Revenue", "Users", "Conversions"].map((metric) => (
            <Surface key={metric} variant="primary" padding="container">
              <Stack gap={3}>
                <Text role="overline" color="tertiary">
                  {metric}
                </Text>
                <FlowEmptyState
                  size="sm"
                  icon="activity"
                  description="No data available"
                  title="—"
                />
              </Stack>
            </Surface>
          ))}
        </Grid>
      </DemoSection>

      <DemoSection title="Permission Required" description="User lacks permission to view content.">
        <Surface variant="primary" padding="container">
          <Stack align="center" justify="center" style={{ minHeight: "320px" }}>
            <FlowEmptyState
              icon="lock"
              title="Access Restricted"
              description="You don't have permission to view this content. Contact your administrator."
              action={
                <FlowButton variant="medium" onClick={() => alert("Request access")}>
                  Request Access
                </FlowButton>
              }
            />
          </Stack>
        </Surface>
      </DemoSection>
    </Stack>
  );
}

function EmptyStateUseCasesDemo() {
  const [activeExample, setActiveExample] = useState<string>("lists");

  const examples: Record<string, ReactNode> = {
    lists: (
      <Surface variant="primary" padding="container">
        <Stack align="center" justify="center" style={{ minHeight: "320px" }}>
          <FlowEmptyState
            icon="list"
            title="No tasks yet"
            description="Create your first task to get started with your to-do list."
            action={
              <FlowButton variant="high" onClick={() => alert("Create task")}>
                Create Task
              </FlowButton>
            }
          />
        </Stack>
      </Surface>
    ),
    search: (
      <Surface variant="primary" padding="container">
        <Stack align="center" justify="center" style={{ minHeight: "320px" }}>
          <FlowEmptyState
            icon="search"
            title='No results for "quantum computing"'
            description="Try different keywords or check your spelling."
            action={
              <FlowButton variant="medium" onClick={() => alert("Clear")}>
                Clear Search
              </FlowButton>
            }
          />
        </Stack>
      </Surface>
    ),
    filters: (
      <Surface variant="primary" padding="container">
        <Stack align="center" justify="center" style={{ minHeight: "320px" }}>
          <FlowEmptyState
            icon="filter"
            title="No items match filters"
            description="Try removing some filters to see more results."
            action={
              <FlowButton variant="high" onClick={() => alert("Clear filters")}>
                Clear All Filters
              </FlowButton>
            }
            secondaryAction={
              <FlowButton variant="low" onClick={() => alert("Reset")}>
                Reset to Default
              </FlowButton>
            }
          />
        </Stack>
      </Surface>
    ),
    uploads: (
      <Surface variant="primary" padding="container">
        <Stack align="center" justify="center" style={{ minHeight: "320px" }}>
          <FlowEmptyState
            icon="upload"
            title="No files uploaded"
            description="Drag and drop files here or click to browse."
            action={
              <FlowButton variant="high" onClick={() => alert("Upload")}>
                Choose Files
              </FlowButton>
            }
          />
        </Stack>
      </Surface>
    ),
    favorites: (
      <Surface variant="primary" padding="container">
        <Stack align="center" justify="center" style={{ minHeight: "320px" }}>
          <FlowEmptyState
            icon="star"
            title="No favorites yet"
            description="Mark items as favorites to quickly access them here."
          />
        </Stack>
      </Surface>
    ),
    notifications: (
      <Surface variant="primary" padding="container">
        <Stack align="center" justify="center" style={{ minHeight: "320px" }}>
          <FlowEmptyState
            size="sm"
            icon="bell"
            title="You're all caught up"
            description="No new notifications."
          />
        </Stack>
      </Surface>
    ),
    messages: (
      <Surface variant="primary" padding="container">
        <Stack align="center" justify="center" style={{ minHeight: "320px" }}>
          <FlowEmptyState
            icon="message-circle"
            title="No messages"
            description="Start a conversation to see messages here."
            action={
              <FlowButton variant="high" onClick={() => alert("New message")}>
                New Message
              </FlowButton>
            }
          />
        </Stack>
      </Surface>
    ),
    cart: (
      <Surface variant="primary" padding="container">
        <Stack align="center" justify="center" style={{ minHeight: "320px" }}>
          <FlowEmptyState
            icon="shopping-cart"
            title="Your cart is empty"
            description="Browse products and add items to get started."
            action={
              <FlowButton variant="high" onClick={() => alert("Shop")}>
                Shop Now
              </FlowButton>
            }
          />
        </Stack>
      </Surface>
    ),
    history: (
      <Surface variant="primary" padding="container">
        <Stack align="center" justify="center" style={{ minHeight: "320px" }}>
          <FlowEmptyState
            size="sm"
            icon="clock"
            title="No recent activity"
            description="Your activity history will appear here."
          />
        </Stack>
      </Surface>
    ),
    bookmarks: (
      <Surface variant="primary" padding="container">
        <Stack align="center" justify="center" style={{ minHeight: "320px" }}>
          <FlowEmptyState
            icon="bookmark"
            title="No bookmarks saved"
            description="Bookmark pages to access them quickly later."
          />
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

const emptyStateEntry: PatternEntry = {
  category: "feedback",
  spec: {
    name: "Empty State",
    purpose:
      "Contextual empty state pattern with illustration, message, and actionable CTA. Automatically selects appropriate variant based on context: first-use, no-results, error, or offline. Composes Surface, Text, Button, and Icon primitives into a cohesive feedback experience.",
    platform: "shared",
    composesL3: ["Surface", "Text", "FlowButton", "FlowIcon"],
    orchestrates: [
      "Variant selection (first-use vs no-results vs error vs offline)",
      "Illustration selection from icon library",
      "CTA action binding with primary/secondary options",
      "Tone-compliant messaging (friendly, helpful, action-oriented)",
      "Size adaptation (default vs compact for inline contexts)",
    ],
    doesNotOwn: [
      "Surface styling (delegated to Surface primitive)",
      "Button emphasis variants (delegated to FlowButton)",
      "Icon visual rendering (delegated to FlowIcon)",
    ],
  },
  composition: [
    {
      component: "Stack",
      role: "Vertical layout orchestration",
      tokens: ["--sys-frame-gap-component", "--sys-frame-padding-*"],
    },
    {
      component: "FlowIcon",
      role: "Visual illustration/context indicator",
      tokens: ["--sys-energy-text-secondary"],
    },
    {
      component: "Text",
      role: "Title and message rendering",
      tokens: ["--sys-voice-*-size", "--ref-voice-weight-*"],
    },
    { component: "FlowButton", role: "Primary and secondary action triggers", tokens: [] },
  ],
  demos: {
    overview: EmptyStateOverviewDemo,
    useCases: EmptyStateUseCasesDemo,
  },
  developer: {
    reactImport: `import { FlowEmptyState } from "@flow/design-system";`,
    reactUsage: `<FlowEmptyState
  icon="package"
  title="Welcome!"
  description="Get started by creating your first item."
  action={
    <FlowButton variant="high" onClick={handleCreate}>
      Create Item
    </FlowButton>
  }
/>`,
    flutterImport: `import 'package:flow/patterns/empty_state.dart';`,
    flutterUsage: `FlowEmptyState(\n  icon: 'package',\n  title: 'Welcome!',\n  description: 'Get started by creating your first item.',\n  action: FlowButton(\n    emphasis: ButtonEmphasis.high,\n    onPressed: handleCreate,\n    child: Text('Create Item'),\n  ),\n)`,
    props: [
      {
        name: "icon",
        type: "string",
        required: false,
        defaultValue: "'search'",
        description: "Icon name from Lucide icon set. Defaults to 'search'.",
      },
      {
        name: "title",
        type: "string",
        required: true,
        description: "Primary heading. Should be concise and descriptive.",
      },
      {
        name: "description",
        type: "string",
        required: false,
        description: "Supporting message. Provides context and guidance.",
      },
      {
        name: "action",
        type: "ReactNode",
        required: false,
        description: "Primary action element (typically a FlowButton).",
      },
      {
        name: "secondaryAction",
        type: "ReactNode",
        required: false,
        description: "Secondary action element (e.g., a low-emphasis button).",
      },
      {
        name: "size",
        type: "'sm' | 'md' | 'lg' | 'xl'",
        required: false,
        description: "Size variant. 'sm' for inline contexts (cards, sections).",
      },
      {
        name: "compact",
        type: "boolean",
        required: false,
        defaultValue: "false",
        description: "Deprecated — use size='sm' instead. Backward compatibility flag.",
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
        text: "Use descriptive icons that match the empty state context (e.g., 'inbox' for empty inbox).",
      },
      { type: "do", text: "Provide actionable CTAs when there's a clear next step for the user." },
      { type: "do", text: "Use 'sm' size for inline contexts (dashboard widgets, card sections)." },
      {
        type: "do",
        text: "Keep title concise (3-6 words) and description helpful (1-2 sentences).",
      },
      {
        type: "dont",
        text: "Don't use for loading states — use FlowSkeleton or FlowProgressBar instead.",
      },
      {
        type: "dont",
        text: "Don't write vague messages like 'No data' — be specific about why it's empty and what the user can do.",
      },
      {
        type: "dont",
        text: "Don't overuse actions — if there's nothing meaningful for the user to do, omit the button.",
      },
    ],
  },
};

// ── FlowSnackbarProvider ──

function SnackbarProviderOverviewDemo() {
  return (
    <FlowSnackbarProvider>
      <SnackbarProviderOverviewDemoInner />
    </FlowSnackbarProvider>
  );
}

function SnackbarProviderOverviewDemoInner() {
  const { show: showSnackbar } = useSnackbar();

  return (
    <Stack gap={6}>
      <DemoSection
        title="Basic Snackbar"
        description="Simple notification with auto-dismiss. Default duration is 4000ms."
      >
        <Inline gap={2}>
          <FlowButton onClick={() => showSnackbar({ message: "Changes saved successfully" })}>
            Show Success
          </FlowButton>
          <FlowButton
            onClick={() => showSnackbar({ message: "Something went wrong. Please try again." })}
          >
            Show Message
          </FlowButton>
        </Inline>
      </DemoSection>

      <DemoSection
        title="Snackbar Variants"
        description="Semantic variants with variant-specific styling and icons."
      >
        <Inline gap={2} wrap>
          <FlowButton
            variant="high"
            onClick={() => showSnackbar({ message: "Operation completed", variant: "success" })}
          >
            Success
          </FlowButton>
          <FlowButton
            variant="medium"
            onClick={() =>
              showSnackbar({ message: "Please review your input", variant: "warning" })
            }
          >
            Warning
          </FlowButton>
          <FlowButton
            variant="danger"
            onClick={() => showSnackbar({ message: "Failed to save changes", variant: "error" })}
          >
            Error
          </FlowButton>
          <FlowButton
            variant="low"
            onClick={() => showSnackbar({ message: "New feature available", variant: "info" })}
          >
            Info
          </FlowButton>
        </Inline>
      </DemoSection>

      <DemoSection
        title="With Action Button"
        description="Snackbar with an action button for immediate response (e.g., undo, retry)."
      >
        <Inline gap={2}>
          <FlowButton
            onClick={() =>
              showSnackbar({
                message: "Item deleted",
                variant: "success",
                action: { label: "Undo", onClick: () => alert("Undo delete") },
              })
            }
          >
            Delete with Undo
          </FlowButton>
          <FlowButton
            onClick={() =>
              showSnackbar({
                message: "Connection failed",
                variant: "error",
                action: { label: "Retry", onClick: () => alert("Retry connection") },
              })
            }
          >
            Error with Retry
          </FlowButton>
        </Inline>
      </DemoSection>

      <DemoSection
        title="Custom Duration"
        description="Control how long the snackbar stays visible before auto-dismissing."
      >
        <Inline gap={2}>
          <FlowButton
            onClick={() => showSnackbar({ message: "Quick message (2s)", duration: 2000 })}
          >
            2 seconds
          </FlowButton>
          <FlowButton
            onClick={() => showSnackbar({ message: "Longer message (7s)", duration: 7000 })}
          >
            7 seconds
          </FlowButton>
          <FlowButton
            onClick={() =>
              showSnackbar({ message: "Persistent (manual close)", duration: Infinity })
            }
          >
            No Auto-dismiss
          </FlowButton>
        </Inline>
      </DemoSection>

      <DemoSection
        title="Dismissible"
        description="Snackbars with manual close button. Auto-dismiss can be disabled."
      >
        <Inline gap={2}>
          <FlowButton
            onClick={() =>
              showSnackbar({
                message: "This notification won't auto-dismiss",
                variant: "info",
                duration: Infinity,
              })
            }
          >
            Show Persistent
          </FlowButton>
        </Inline>
      </DemoSection>

      <DemoSection
        title="Queue Management"
        description="Multiple snackbars are queued and shown sequentially. Try clicking rapidly."
      >
        <FlowButton
          onClick={() => {
            showSnackbar({ message: "First notification" });
            setTimeout(() => showSnackbar({ message: "Second notification" }), 100);
            setTimeout(() => showSnackbar({ message: "Third notification" }), 200);
          }}
        >
          Show Multiple (Queued)
        </FlowButton>
      </DemoSection>

      <DemoSection
        title="Long Messages"
        description="Snackbars automatically expand to accommodate longer messages."
      >
        <FlowButton
          onClick={() =>
            showSnackbar({
              message:
                "Your session will expire in 5 minutes due to inactivity. Please save your work to avoid losing changes.",
              variant: "warning",
              duration: 8000,
            })
          }
        >
          Show Long Message
        </FlowButton>
      </DemoSection>

      <DemoSection title="Real-World Scenarios" description="Common use cases in production apps.">
        <Grid minItemWidth="180px" gap="control">
          <FlowButton
            size="sm"
            onClick={() =>
              showSnackbar({
                message: "Form submitted successfully",
                variant: "success",
              })
            }
          >
            Form Submit
          </FlowButton>
          <FlowButton
            size="sm"
            onClick={() =>
              showSnackbar({
                message: "File uploaded",
                variant: "success",
                action: { label: "View", onClick: () => alert("View file") },
              })
            }
          >
            File Upload
          </FlowButton>
          <FlowButton
            size="sm"
            onClick={() =>
              showSnackbar({
                message: "Copied to clipboard",
                variant: "success",
                duration: 2000,
              })
            }
          >
            Copy to Clipboard
          </FlowButton>
          <FlowButton
            size="sm"
            onClick={() =>
              showSnackbar({
                message: "Network error occurred",
                variant: "error",
                action: { label: "Retry", onClick: () => alert("Retry") },
              })
            }
          >
            Network Error
          </FlowButton>
          <FlowButton
            size="sm"
            onClick={() =>
              showSnackbar({
                message: "Draft saved",
                variant: "info",
                duration: 3000,
              })
            }
          >
            Auto-save
          </FlowButton>
          <FlowButton
            size="sm"
            onClick={() =>
              showSnackbar({
                message: "Permission denied",
                variant: "warning",
              })
            }
          >
            Permission Error
          </FlowButton>
        </Grid>
      </DemoSection>
    </Stack>
  );
}

function SnackbarProviderUseCasesDemo() {
  return (
    <FlowSnackbarProvider>
      <SnackbarProviderUseCasesDemoInner />
    </FlowSnackbarProvider>
  );
}

function SnackbarProviderUseCasesDemoInner() {
  const { show: showSnackbar } = useSnackbar();
  const [formData, setFormData] = useState({ name: "", email: "" });

  const handleSave = () => {
    // Simulate save
    setTimeout(() => {
      showSnackbar({
        message: "Profile updated successfully",
        variant: "success",
      });
    }, 500);
  };

  const handleDelete = () => {
    showSnackbar({
      message: "Item deleted",
      variant: "success",
      action: {
        label: "Undo",
        onClick: () => {
          showSnackbar({ message: "Delete undone", variant: "info" });
        },
      },
    });
  };

  return (
    <Stack gap={6}>
      <DemoSection
        title="Form Validation Feedback"
        description="Show snackbars on form submission success/error."
      >
        <Surface variant="primary" padding="container">
          <Stack gap={3}>
            <FlowTextInput
              label="Name"
              value={formData.name}
              onChange={(v) => setFormData({ ...formData, name: v })}
            />
            <FlowTextInput
              label="Email"
              type="email"
              value={formData.email}
              onChange={(v) => setFormData({ ...formData, email: v })}
            />
            <Inline gap={2}>
              <FlowButton variant="high" onClick={handleSave}>
                Save
              </FlowButton>
              <FlowButton
                variant="low"
                onClick={() =>
                  showSnackbar({
                    message: "Changes discarded",
                    variant: "info",
                  })
                }
              >
                Cancel
              </FlowButton>
            </Inline>
          </Stack>
        </Surface>
      </DemoSection>

      <DemoSection
        title="Destructive Action with Undo"
        description="Delete with undo pattern — user can reverse destructive actions."
      >
        <Surface variant="primary" padding="container">
          <Inline gap={2}>
            <Text>Important Item</Text>
            <FlowButton variant="danger" size="sm" onClick={handleDelete}>
              Delete
            </FlowButton>
          </Inline>
        </Surface>
      </DemoSection>

      <DemoSection
        title="Background Task Completion"
        description="Notify user when async background task completes."
      >
        <FlowButton
          onClick={() => {
            showSnackbar({ message: "Processing...", variant: "info", duration: 1500 });
            setTimeout(() => {
              showSnackbar({
                message: "Export completed",
                variant: "success",
                action: { label: "Download", onClick: () => alert("Download") },
              });
            }, 1500);
          }}
        >
          Export Data
        </FlowButton>
      </DemoSection>

      <DemoSection
        title="Offline/Network Status"
        description="Alert user when connection state changes."
      >
        <Inline gap={2}>
          <FlowButton
            variant="low"
            onClick={() =>
              showSnackbar({
                message: "You are offline. Changes will sync when reconnected.",
                variant: "warning",
                duration: Infinity,
              })
            }
          >
            Simulate Offline
          </FlowButton>
          <FlowButton
            variant="low"
            onClick={() =>
              showSnackbar({
                message: "Connection restored",
                variant: "success",
              })
            }
          >
            Simulate Reconnect
          </FlowButton>
        </Inline>
      </DemoSection>

      <DemoSection title="Bulk Actions" description="Feedback for actions on multiple items.">
        <FlowButton
          onClick={() =>
            showSnackbar({
              message: "12 items archived",
              variant: "success",
              action: { label: "Undo", onClick: () => alert("Undo bulk archive") },
            })
          }
        >
          Archive Selected (12)
        </FlowButton>
      </DemoSection>
    </Stack>
  );
}

const snackbarProviderEntry: PatternEntry = {
  category: "feedback",
  spec: {
    name: "Snackbar Provider",
    purpose:
      "Toast notification system with queue management, stacking, auto-dismiss, and action buttons. Provides a global notification context that can be triggered from anywhere in the app. Orchestrates notification lifecycle, timing, and queue behavior.",
    platform: "shared",
    composesL3: ["Surface", "Text", "FlowButton", "FlowIconButton", "FlowIcon"],
    orchestrates: [
      "Toast queue with max-visible limit",
      "Auto-dismiss timers per notification",
      "Enter/exit animations with stacking behavior",
      "Action button binding and callbacks",
      "Variant-based semantic styling (success, warning, error, info)",
      "Manual dismiss via close button",
    ],
    doesNotOwn: [
      "Surface styling (delegated to Surface primitive)",
      "Button visual design (delegated to FlowButton)",
      "Icon rendering (delegated to FlowIcon)",
    ],
  },
  composition: [
    {
      component: "Surface",
      role: "Snackbar container with elevation and border",
      tokens: ["--sys-energy-surface-*", "--sys-energy-border-*"],
    },
    {
      component: "FlowIcon",
      role: "Variant-specific status icon",
      tokens: ["--sys-energy-status-*"],
    },
    { component: "Text", role: "Message content", tokens: ["--sys-voice-paragraph-s-size"] },
    { component: "FlowButton", role: "Action button (optional)", tokens: [] },
    { component: "FlowIconButton", role: "Close/dismiss button", tokens: [] },
  ],
  demos: {
    overview: SnackbarProviderOverviewDemo,
    useCases: SnackbarProviderUseCasesDemo,
  },
  developer: {
    reactImport: `import { FlowSnackbarProvider, useSnackbar } from "@flow/design-system";`,
    reactUsage: `// 1. Wrap app root with provider
<FlowSnackbarProvider>
  <App />
</FlowSnackbarProvider>

// 2. Use hook to show snackbars
function MyComponent() {
  const { show: showSnackbar } = useSnackbar();

  return (
    <FlowButton
      onClick={() =>
        showSnackbar({
          message: "Item saved",
          variant: "success",
          action: { label: "Undo", onClick: handleUndo }
        })
      }
    >
      Save
    </FlowButton>
  );
}`,
    flutterImport: `import 'package:flow/patterns/snackbar_provider.dart';`,
    flutterUsage: `// 1. Wrap app with provider
FlowSnackbarProvider(
  child: MyApp(),
)

// 2. Show snackbar from anywhere
FlowSnackbar.show(
  context,
  message: 'Item saved',
  variant: SnackbarVariant.success,
  action: SnackbarAction(
    label: 'Undo',
    onPressed: handleUndo,
  ),
)`,
    props: [
      {
        name: "maxStack",
        type: "number",
        required: false,
        defaultValue: "3",
        description:
          "Maximum number of snackbars visible simultaneously. Additional snackbars are queued.",
      },
      {
        name: "defaultDuration",
        type: "number",
        required: false,
        defaultValue: "4000",
        description: "Default auto-dismiss duration in milliseconds.",
      },
      {
        name: "position",
        type: "'top' | 'bottom'",
        required: false,
        defaultValue: "'bottom'",
        description: "Vertical position of snackbar stack.",
      },
    ],
    guidelines: [
      {
        type: "do",
        text: "Use snackbars for brief, non-critical notifications (success confirmations, info updates).",
      },
      {
        type: "do",
        text: "Provide an 'Undo' action for destructive operations (delete, archive).",
      },
      {
        type: "do",
        text: "Keep messages concise (1-2 lines). Use 'error' variant for failures with a 'Retry' action.",
      },
      {
        type: "do",
        text: "Set duration=Infinity for critical messages that require user acknowledgment.",
      },
      {
        type: "dont",
        text: "Don't use for critical errors that require user action — use FlowDialog instead.",
      },
      {
        type: "dont",
        text: "Don't stack more than 3 snackbars — it becomes overwhelming. Queue them instead.",
      },
      {
        type: "dont",
        text: "Don't use for real-time chat messages or push notifications — use NotificationPanel instead.",
      },
      {
        type: "warning",
        text: "Ensure FlowSnackbarProvider wraps your app root. Calling useSnackbar() outside the provider will throw an error.",
      },
    ],
  },
};

// ── FlowNotificationPanel ──

// Mock data generators
function generateMockNotifications(count: number): NotificationItem[] {
  const variants: Array<"info" | "success" | "warning" | "error"> = [
    "info",
    "success",
    "warning",
    "error",
  ];
  const titles = [
    "New comment on your post",
    "Your report is ready",
    "Payment processed successfully",
    "Server maintenance scheduled",
    "New follower",
    "Document shared with you",
    "Meeting reminder",
    "Security alert",
    "Update available",
    "Task assigned to you",
  ];
  const messages = [
    "Click to view details",
    "Download is now available",
    "Transaction ID: #12345",
    "Scheduled for tonight at 2 AM",
    "@johndoe started following you",
    "Quarterly_Report.pdf",
    "Team standup in 15 minutes",
    "Unusual login detected from new device",
    "Version 2.0 is ready to install",
    "Due date: Tomorrow at 5 PM",
  ];

  const now = Date.now();
  return Array.from({ length: count }, (_, i) => ({
    id: `notif-${i}`,
    title: titles[i % titles.length],
    message: messages[i % messages.length],
    timestamp: formatRelativeTime(now - i * 3600000), // Stagger by hours
    read: i % 3 === 0, // Every 3rd is read
    variant: variants[i % variants.length],
  }));
}

function formatRelativeTime(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days === 1) return "Yesterday";
  return `${days}d ago`;
}

function NotificationPanelOverviewDemo() {
  const [notifications, setNotifications] = useState<NotificationItem[]>(
    generateMockNotifications(8),
  );

  const handleMarkRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleDismiss = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const addNotification = (variant: "info" | "success" | "warning" | "error") => {
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title:
        variant === "success"
          ? "Operation completed"
          : variant === "error"
            ? "Action failed"
            : variant === "warning"
              ? "Warning issued"
              : "New information",
      message: "This is a newly added notification",
      timestamp: "Just now",
      read: false,
      variant,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  return (
    <Stack gap={6}>
      <DemoSection
        title="Default Notification Panel"
        description="Full-featured panel with read/unread states, mark-all-as-read, and dismiss actions."
      >
        <Inline gap={3} align="start" wrap>
          <FlowNotificationPanel
            notifications={notifications}
            onMarkRead={handleMarkRead}
            onMarkAllRead={handleMarkAllRead}
            onDismiss={handleDismiss}
          />
          <Surface variant="secondary" padding="container" style={{ flex: 1, minWidth: "240px" }}>
            <Stack gap={3}>
              <Text role="label-m">Controls</Text>
              <Stack gap={2}>
                <FlowButton size="sm" variant="high" onClick={() => addNotification("success")}>
                  Add Success
                </FlowButton>
                <FlowButton size="sm" variant="medium" onClick={() => addNotification("warning")}>
                  Add Warning
                </FlowButton>
                <FlowButton size="sm" variant="danger" onClick={() => addNotification("error")}>
                  Add Error
                </FlowButton>
                <FlowButton size="sm" variant="low" onClick={() => addNotification("info")}>
                  Add Info
                </FlowButton>
              </Stack>
              <Divider />
              <FlowButton
                size="sm"
                variant="outline"
                onClick={() => setNotifications(generateMockNotifications(8))}
              >
                Reset Notifications
              </FlowButton>
            </Stack>
          </Surface>
        </Inline>
      </DemoSection>

      <DemoSection
        title="Empty State"
        description="Panel automatically shows empty state when no notifications exist."
      >
        <FlowNotificationPanel notifications={[]} />
      </DemoSection>

      <DemoSection
        title="Read-Only Mode"
        description="Panel without interactive actions (no mark-as-read or dismiss)."
      >
        <FlowNotificationPanel
          notifications={generateMockNotifications(5)}
          title="Activity Feed"
          emptyMessage="No recent activity"
        />
      </DemoSection>

      <DemoSection
        title="Custom Title & Empty Message"
        description="Customize panel title and empty state message."
      >
        <FlowNotificationPanel
          notifications={[]}
          title="System Alerts"
          emptyMessage="No alerts at this time"
        />
      </DemoSection>

      <DemoSection
        title="Compact Height"
        description="Limited maxHeight for inline contexts (e.g., dropdown)."
      >
        <FlowNotificationPanel
          notifications={generateMockNotifications(12)}
          maxHeight={280}
          onDismiss={(id) => console.log("Dismiss", id)}
        />
      </DemoSection>

      <DemoSection
        title="With Action Buttons"
        description="Notifications can have action buttons for quick responses."
      >
        <FlowNotificationPanel
          notifications={[
            {
              id: "1",
              title: "Friend request from Sarah",
              message: "Sarah wants to connect with you",
              timestamp: "5m ago",
              variant: "info",
              action: { label: "Accept", onClick: () => alert("Accepted") },
            },
            {
              id: "2",
              title: "Backup completed",
              message: "Your data has been backed up successfully",
              timestamp: "1h ago",
              variant: "success",
              action: { label: "View Backup", onClick: () => alert("View") },
            },
            {
              id: "3",
              title: "Payment reminder",
              message: "Your subscription renews in 3 days",
              timestamp: "2h ago",
              variant: "warning",
              action: { label: "Pay Now", onClick: () => alert("Payment") },
            },
          ]}
          onMarkRead={(id) => console.log("Mark read", id)}
          onDismiss={(id) => console.log("Dismiss", id)}
        />
      </DemoSection>

      <DemoSection
        title="Variant Colors"
        description="Each notification variant has distinct styling (info, success, warning, error)."
      >
        <FlowNotificationPanel
          notifications={[
            {
              id: "1",
              title: "Info notification",
              message: "General information",
              timestamp: "1m ago",
              variant: "info",
            },
            {
              id: "2",
              title: "Success notification",
              message: "Operation successful",
              timestamp: "2m ago",
              variant: "success",
            },
            {
              id: "3",
              title: "Warning notification",
              message: "Action required soon",
              timestamp: "3m ago",
              variant: "warning",
            },
            {
              id: "4",
              title: "Error notification",
              message: "Something went wrong",
              timestamp: "4m ago",
              variant: "error",
            },
          ]}
        />
      </DemoSection>

      <DemoSection
        title="Mixed Read/Unread States"
        description="Unread notifications have accent background and blue dot indicator."
      >
        <FlowNotificationPanel
          notifications={[
            {
              id: "1",
              title: "New message",
              message: "You have a new message",
              timestamp: "Just now",
              read: false,
              variant: "info",
            },
            {
              id: "2",
              title: "Report generated",
              message: "Q4 report is ready",
              timestamp: "5m ago",
              read: false,
              variant: "success",
            },
            {
              id: "3",
              title: "Meeting ended",
              message: "Team standup concluded",
              timestamp: "1h ago",
              read: true,
              variant: "info",
            },
            {
              id: "4",
              title: "Task completed",
              message: "Design review finished",
              timestamp: "2h ago",
              read: true,
              variant: "success",
            },
          ]}
          onMarkRead={(id) => console.log("Mark read", id)}
        />
      </DemoSection>
    </Stack>
  );
}

function NotificationPanelUseCasesDemo() {
  const [notifications, setNotifications] = useState<NotificationItem[]>(
    generateMockNotifications(6),
  );

  return (
    <Stack gap={6}>
      <DemoSection
        title="Notification Dropdown"
        description="Notification panel as a dropdown triggered by a bell icon button."
      >
        <Surface variant="primary" padding="container">
          <Stack gap={3}>
            <Inline gap={2} justify="between" align="center">
              <Text role="heading-m">Your App</Text>
              <div style={{ position: "relative" }}>
                <FlowIconButton
                  icon="bell"
                  variant="ghost"
                  aria-label="Notifications"
                  badge={notifications.filter((n) => !n.read).length}
                />
              </div>
            </Inline>
            <Text role="paragraph-s" color="secondary">
              Click bell icon to see notifications (simulated)
            </Text>
          </Stack>
        </Surface>
      </DemoSection>

      <DemoSection
        title="Sidebar Notification Panel"
        description="Full-height panel for desktop sidebars or dedicated notification pages."
      >
        <Grid columns={2} gap="control">
          <Surface variant="secondary" padding="container" style={{ minHeight: "400px" }}>
            <Stack gap={3}>
              <Text role="heading-m">Main Content</Text>
              <Text role="paragraph-s" color="secondary">
                Your app content goes here. The notification panel sits in the sidebar.
              </Text>
            </Stack>
          </Surface>
          <FlowNotificationPanel
            notifications={notifications}
            maxHeight={400}
            onMarkRead={(id) =>
              setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
            }
            onMarkAllRead={() =>
              setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
            }
            onDismiss={(id) => setNotifications((prev) => prev.filter((n) => n.id !== id))}
          />
        </Grid>
      </DemoSection>

      <DemoSection
        title="Activity Feed"
        description="Notifications as an activity feed for user actions and system events."
      >
        <FlowNotificationPanel
          title="Recent Activity"
          notifications={[
            {
              id: "1",
              title: "Document uploaded",
              message: "Project_Proposal.pdf",
              timestamp: "2m ago",
              variant: "success",
              icon: "file-text",
            },
            {
              id: "2",
              title: "Comment added",
              message: "John commented on your post",
              timestamp: "15m ago",
              variant: "info",
              icon: "message-circle",
            },
            {
              id: "3",
              title: "Task assigned",
              message: "Design homepage banner",
              timestamp: "1h ago",
              variant: "info",
              icon: "check-square",
            },
            {
              id: "4",
              title: "Meeting joined",
              message: "Team standup started",
              timestamp: "2h ago",
              variant: "info",
              icon: "video",
            },
          ]}
          emptyMessage="No recent activity"
        />
      </DemoSection>

      <DemoSection
        title="System Alerts"
        description="Critical alerts panel for system administrators."
      >
        <FlowNotificationPanel
          title="System Alerts"
          notifications={[
            {
              id: "1",
              title: "High CPU usage detected",
              message: "Server load at 85%",
              timestamp: "Just now",
              variant: "warning",
              action: { label: "Investigate", onClick: () => alert("Investigate") },
            },
            {
              id: "2",
              title: "Backup failed",
              message: "Database backup encountered errors",
              timestamp: "5m ago",
              variant: "error",
              action: { label: "Retry", onClick: () => alert("Retry") },
            },
            {
              id: "3",
              title: "SSL certificate expires soon",
              message: "Certificate expires in 7 days",
              timestamp: "1h ago",
              variant: "warning",
              action: { label: "Renew", onClick: () => alert("Renew") },
            },
          ]}
          emptyMessage="All systems operational"
          onDismiss={(id) => console.log("Dismiss alert", id)}
        />
      </DemoSection>

      <DemoSection
        title="Social Notifications"
        description="Notifications for social interactions (likes, follows, comments)."
      >
        <FlowNotificationPanel
          notifications={[
            {
              id: "1",
              title: "New follower",
              message: "@alice started following you",
              timestamp: "5m ago",
              variant: "success",
              icon: "user-plus",
            },
            {
              id: "2",
              title: "Post liked",
              message: "Your photo received 10 likes",
              timestamp: "1h ago",
              variant: "info",
              icon: "heart",
            },
            {
              id: "3",
              title: "Mentioned in comment",
              message: "@bob mentioned you",
              timestamp: "2h ago",
              variant: "info",
              icon: "at-sign",
            },
          ]}
          onMarkRead={(id) => console.log("Mark read", id)}
        />
      </DemoSection>

      <DemoSection
        title="Transaction Notifications"
        description="Financial/payment notifications with transaction details."
      >
        <FlowNotificationPanel
          title="Transaction History"
          notifications={[
            {
              id: "1",
              title: "Payment received",
              message: "$150.00 from John Doe",
              timestamp: "10m ago",
              variant: "success",
            },
            {
              id: "2",
              title: "Withdrawal processed",
              message: "$50.00 to Bank Account",
              timestamp: "1h ago",
              variant: "info",
            },
            {
              id: "3",
              title: "Subscription renewed",
              message: "Pro Plan - $29.99/month",
              timestamp: "1d ago",
              variant: "success",
            },
          ]}
        />
      </DemoSection>
    </Stack>
  );
}

const notificationPanelEntry: PatternEntry = {
  category: "feedback",
  spec: {
    name: "Notification Panel",
    purpose:
      "Grouped notification list with read/unread state management, mark-all-as-read batch action, individual dismiss with undo, and time-relative formatting. Orchestrates notification center behavior for in-app alerts, activity feeds, and system messages.",
    platform: "shared",
    composesL3: [
      "FlowList",
      "FlowListItem",
      "FlowBadge",
      "FlowAvatar",
      "FlowIconButton",
      "FlowIcon",
      "Surface",
      "Text",
    ],
    orchestrates: [
      "Read/unread state management with visual distinction",
      "Mark-all-as-read batch action",
      "Individual notification dismiss",
      "Unread count badge display",
      "Variant-based semantic styling (info, success, warning, error)",
      "Empty state handling",
      "Scrollable list with max-height constraint",
    ],
    doesNotOwn: [
      "Icon rendering (delegated to FlowIcon)",
      "Surface styling (delegated to Surface primitive)",
      "Button visual design (delegated to FlowIconButton)",
    ],
  },
  composition: [
    {
      component: "Surface",
      role: "Panel container with border and shadow",
      tokens: ["--sys-energy-surface-*", "--sys-energy-border-*", "--sys-depth-elevation-medium"],
    },
    {
      component: "Text",
      role: "Notification title, message, and timestamp",
      tokens: ["--sys-voice-*-size"],
    },
    {
      component: "FlowIcon",
      role: "Variant-specific status icons",
      tokens: ["--sys-energy-status-*"],
    },
    { component: "FlowIconButton", role: "Dismiss button per notification", tokens: [] },
    {
      component: "Stack/Inline",
      role: "Layout primitives for notification structure",
      tokens: ["--sys-frame-gap-component", "--sys-frame-padding-*"],
    },
  ],
  demos: {
    overview: NotificationPanelOverviewDemo,
    useCases: NotificationPanelUseCasesDemo,
  },
  developer: {
    reactImport: `import { FlowNotificationPanel, type NotificationItem } from "@flow/design-system";`,
    reactUsage: `const [notifications, setNotifications] = useState<NotificationItem[]>([
  {
    id: "1",
    title: "New comment",
    message: "John commented on your post",
    timestamp: "5m ago",
    read: false,
    variant: "info",
  },
]);

<FlowNotificationPanel
  notifications={notifications}
  onMarkRead={(id) => markAsRead(id)}
  onMarkAllRead={() => markAllAsRead()}
  onDismiss={(id) => removeNotification(id)}
/>`,
    flutterImport: `import 'package:flow/patterns/notification_panel.dart';`,
    flutterUsage: `FlowNotificationPanel(
  notifications: notifications,
  onMarkRead: (id) => markAsRead(id),
  onMarkAllRead: () => markAllAsRead(),
  onDismiss: (id) => removeNotification(id),
)`,
    props: [
      {
        name: "notifications",
        type: "NotificationItem[]",
        required: true,
        description:
          "Array of notification objects. Each must have: id, title, timestamp. Optional: message, read, icon, variant, action.",
      },
      {
        name: "onMarkRead",
        type: "(id: string) => void",
        required: false,
        description: "Callback when user clicks an unread notification to mark it as read.",
      },
      {
        name: "onMarkAllRead",
        type: "() => void",
        required: false,
        description: "Callback when user clicks 'Mark all read'. If omitted, button is hidden.",
      },
      {
        name: "onDismiss",
        type: "(id: string) => void",
        required: false,
        description:
          "Callback when user dismisses a notification. If omitted, dismiss button is hidden.",
      },
      {
        name: "title",
        type: "string",
        required: false,
        defaultValue: "'Notifications'",
        description: "Panel header title.",
      },
      {
        name: "emptyMessage",
        type: "string",
        required: false,
        defaultValue: "'No new notifications'",
        description: "Message shown when notifications array is empty.",
      },
      {
        name: "maxHeight",
        type: "number",
        required: false,
        defaultValue: "420",
        description: "Maximum height in pixels for scrollable notification list.",
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
        text: "Use for in-app notifications center, activity feeds, and system alerts.",
      },
      {
        type: "do",
        text: "Provide onMarkRead and onMarkAllRead for panels with unread notifications.",
      },
      {
        type: "do",
        text: "Use semantic variants (success, warning, error, info) to indicate notification priority.",
      },
      {
        type: "do",
        text: "Keep notification titles concise (3-8 words) and messages under 2 sentences.",
      },
      {
        type: "do",
        text: "Use action buttons sparingly — only for time-sensitive actions (Accept, Retry, View).",
      },
      {
        type: "dont",
        text: "Don't use for real-time chat — use a dedicated messaging component instead.",
      },
      {
        type: "dont",
        text: "Don't show more than 50 notifications at once — implement pagination or 'Load More'.",
      },
      {
        type: "dont",
        text: "Don't use for critical errors that require immediate attention — use FlowDialog instead.",
      },
      {
        type: "warning",
        text: "Notification state (read/unread) must be managed externally. The component is fully controlled.",
      },
    ],
  },
};

// ── Exported registry slice ──
export const feedbackPatterns: Record<string, PatternEntry> = {
  "feedback/empty-state": emptyStateEntry,
  "feedback/snackbar-provider": snackbarProviderEntry,
  "feedback/notification-panel": notificationPanelEntry,
};

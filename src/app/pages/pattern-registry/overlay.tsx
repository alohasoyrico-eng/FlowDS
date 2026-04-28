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
import React, { type ReactNode, useState } from "react";

import type { PlaygroundConfig } from "../../components/prop-playground";
import {
  type CommandItem,
  FlowActionSheet,
  FlowButton,
  FlowCheckbox,
  FlowChip,
  FlowCommandPalette,
  FlowConfirmationDialog,
  FlowFormSection,
  FlowFullscreenSheet,
  FlowList,
  FlowListItem,
  FlowRadioButton,
  FlowTextInput,
  Grid,
  Inline,
  Stack,
  Surface,
  Text,
} from "@flow/design-system";
import { FlowIcon } from "@flow/primitives";
import { DemoGroup, DemoSection } from "../../components/demo-helpers";
export type { PropEntry, GuidelineEntry } from "../../components/doc-primitives";
import type { AccessibilitySpec, AnatomyEntry, KeyboardInteraction } from "../registry/types";
export type { AccessibilitySpec, AnatomyEntry, KeyboardInteraction };

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
  playground?: PlaygroundConfig;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Helper imports for prop table types
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import type { GuidelineEntry, PropEntry } from "../../components/doc-primitives";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// OVERLAY PATTERNS REGISTRY
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// ── FlowConfirmationDialog ──

function ConfirmationDialogOverviewDemo() {
  const [basicOpen, setBasicOpen] = useState(false);
  const [customOpen, setCustomOpen] = useState(false);
  const [loadingOpen, setLoadingOpen] = useState(false);
  const [longOpen, setLongOpen] = useState(false);
  const [variantOpen, setVariantOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    // Simulate async operation
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false);
    setLoadingOpen(false);
    alert("Item deleted successfully!");
  };

  const handleCancel = (setter: (value: boolean) => void) => {
    setter(false);
  };

  return (
    <Stack gap={6}>
      <DemoSection
        title="Basic Confirmation Dialog"
        description="Standard destructive action confirmation with title, message, and confirm/cancel buttons."
      >
        <DemoGroup>
          <FlowButton variant="primary" intent="danger" onClick={() => setBasicOpen(true)}>
            Delete Item
          </FlowButton>
          <FlowConfirmationDialog
            open={basicOpen}
            onConfirm={() => {
              alert("Item deleted!");
              setBasicOpen(false);
            }}
            onCancel={() => handleCancel(setBasicOpen)}
            title="Delete Item"
            message="Are you sure you want to delete this item? This action cannot be undone."
            confirmLabel="Delete"
          />
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="With Custom Labels"
        description="Customize button labels for different action types."
      >
        <DemoGroup>
          <FlowButton variant="primary" onClick={() => setCustomOpen(true)}>
            Publish Post
          </FlowButton>
          <FlowConfirmationDialog
            open={customOpen}
            onConfirm={() => {
              alert("Post published!");
              setCustomOpen(false);
            }}
            onCancel={() => handleCancel(setCustomOpen)}
            title="Publish Post"
            message="This will make your post visible to all followers. Are you ready to publish?"
            confirmLabel="Publish Now"
            cancelLabel="Save Draft"
          />
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Loading State"
        description="Shows loading spinner during async operations."
      >
        <DemoGroup>
          <FlowButton variant="primary" onClick={() => setLoadingOpen(true)}>
            Process Payment
          </FlowButton>
          <FlowConfirmationDialog
            open={loadingOpen}
            onConfirm={handleConfirm}
            onCancel={() => handleCancel(setLoadingOpen)}
            title="Process Payment"
            message="This will charge $29.99 to your card ending in 4242."
            confirmLabel="Pay $29.99"
            loading={loading}
          />
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Long Message"
        description="Dialog handles longer messages with proper scrolling."
      >
        <DemoGroup>
          <FlowButton variant="primary" intent="warning" onClick={() => setLongOpen(true)}>
            Reset Settings
          </FlowButton>
          <FlowConfirmationDialog
            open={longOpen}
            onConfirm={() => {
              alert("Settings reset!");
              setLongOpen(false);
            }}
            onCancel={() => handleCancel(setLongOpen)}
            title="Reset All Settings"
            message="This will reset all your preferences, customizations, and saved data back to factory defaults. Your account data and projects will not be affected, but you will lose all personalized settings including theme preferences, notification settings, keyboard shortcuts, and any custom layouts or filters you've created. This action cannot be undone."
            confirmLabel="Reset Everything"
          />
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Different Variants"
        description="Use different button emphasis for various confirmation types."
      >
        <DemoGroup>
          <Grid minItemWidth="200px" gap="control">
            <Stack gap={2}>
              <Text variant="caption" color="tertiary">
                Danger (Delete)
              </Text>
              <FlowButton variant="primary" intent="danger" onClick={() => setVariantOpen(true)}>
                Delete File
              </FlowButton>
            </Stack>
            <Stack gap={2}>
              <Text variant="caption" color="tertiary">
                Warning (Archive)
              </Text>
              <FlowButton variant="primary" intent="warning" onClick={() => setVariantOpen(true)}>
                Archive Project
              </FlowButton>
            </Stack>
            <Stack gap={2}>
              <Text variant="caption" color="tertiary">
                High (Publish)
              </Text>
              <FlowButton variant="primary" onClick={() => setVariantOpen(true)}>
                Publish App
              </FlowButton>
            </Stack>
          </Grid>
          <FlowConfirmationDialog
            open={variantOpen}
            onConfirm={() => setVariantOpen(false)}
            onCancel={() => handleCancel(setVariantOpen)}
            title="Action Confirmation"
            message="This action will be performed."
            confirmLabel="Confirm"
          />
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

function ConfirmationDialogUseCasesDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState<string>("");

  const handleAction = (action: string) => {
    setCurrentAction(action);
    setIsOpen(true);
  };

  const handleConfirm = () => {
    alert(`${currentAction} confirmed!`);
    setIsOpen(false);
    setCurrentAction("");
  };

  const handleCancel = () => {
    setIsOpen(false);
    setCurrentAction("");
  };

  return (
    <Stack gap={6}>
      <DemoSection
        title="File Management"
        description="Common file operations that need confirmation."
      >
        <Surface variant="primary" padding="container">
          <Stack gap={3}>
            <Text variant="heading-m">Project Files</Text>
            <FlowList dividers>
              {[
                { name: "design-system.pdf", type: "PDF" },
                { name: "wireframes.fig", type: "Figma" },
                { name: "components.tsx", type: "Code" },
              ].map((file) => (
                <FlowListItem
                  key={file.name}
                  primary={<Text variant="paragraph-s">{file.name}</Text>}
                  secondary={
                    <Text variant="caption" color="tertiary">
                      {file.type}
                    </Text>
                  }
                  actions={
                    <FlowButton
                      variant="primary"
                      intent="danger"
                      size="sm"
                      onClick={() => handleAction(`delete ${file.name}`)}
                    >
                      Delete
                    </FlowButton>
                  }
                />
              ))}
            </FlowList>
          </Stack>
        </Surface>
      </DemoSection>

      <DemoSection
        title="Account Actions"
        description="Sensitive account operations requiring confirmation."
      >
        <Surface variant="primary" padding="container">
          <Stack gap={3}>
            <Text variant="heading-m">Account Settings</Text>
            <Stack gap={2}>
              <FlowButton
                variant="primary"
                intent="danger"
                onClick={() => handleAction("delete your account")}
              >
                Delete Account
              </FlowButton>
              <FlowButton
                variant="primary"
                intent="warning"
                onClick={() => handleAction("reset your password")}
              >
                Reset Password
              </FlowButton>
              <FlowButton variant="primary" onClick={() => handleAction("upgrade your plan")}>
                Upgrade Plan
              </FlowButton>
            </Stack>
          </Stack>
        </Surface>
      </DemoSection>

      <DemoSection
        title="Bulk Operations"
        description="Confirming actions that affect multiple items."
      >
        <Surface variant="primary" padding="container">
          <Stack gap={3}>
            <Inline gap={2} justify="between" align="center">
              <Text variant="heading-m">Selected Items (12)</Text>
              <FlowChip variant="filled" status="info">
                12 selected
              </FlowChip>
            </Inline>
            <Inline gap={2}>
              <FlowButton
                variant="primary"
                intent="danger"
                onClick={() => handleAction("delete 12 selected items")}
              >
                Delete All
              </FlowButton>
              <FlowButton
                variant="primary"
                intent="warning"
                onClick={() => handleAction("archive 12 selected items")}
              >
                Archive All
              </FlowButton>
            </Inline>
          </Stack>
        </Surface>
      </DemoSection>

      <FlowConfirmationDialog
        open={isOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        title="Confirm Action"
        message={`Are you sure you want to ${currentAction}? This action cannot be undone.`}
        confirmLabel="Yes, Continue"
      />
    </Stack>
  );
}

const confirmationDialogEntry: PatternEntry = {
  category: "overlay",
  spec: {
    name: "Confirmation Dialog",
    purpose:
      "Pre-composed dialog pattern for destructive/irreversible action confirmation. Ensures actions pass through confirmation gate with Tone-compliant messaging.",
    platform: "shared",
    composesL3: ["FlowDialog", "FlowButton", "Text", "Stack"],
    orchestrates: [
      "Confirmation lifecycle (open -> pending -> resolved)",
      "Destructive action gating",
      "Loading state during async operation",
      "Success/error result handling",
      "Tone-compliant message generation",
    ],
  },
  composition: [
    {
      component: "FlowDialog",
      role: "Modal container with backdrop",
      tokens: ["--sys-energy-surface-overlay"],
    },
    { component: "FlowButton", role: "Confirm/cancel action buttons", tokens: [] },
    { component: "Text", role: "Title and description messaging", tokens: ["--sys-voice-*-size"] },
    {
      component: "Stack",
      role: "Vertical layout orchestration",
      tokens: ["--sys-frame-gap-component", "--sys-frame-padding-*"],
    },
  ],
  demos: {
    overview: ConfirmationDialogOverviewDemo,
    useCases: ConfirmationDialogUseCasesDemo,
  },
  developer: {
    reactImport: `import { FlowConfirmationDialog } from "@flow/design-system";`,
    reactUsage: `<FlowConfirmationDialog
  open={isOpen}
  onConfirm={handleConfirm}
  onCancel={handleCancel}
  title="Delete Project"
  message="This action cannot be undone."
  confirmLabel="Delete"
/>`,
    flutterImport: `import 'package:flow/patterns/confirmation_dialog.dart';`,
    flutterUsage: `FlowConfirmationDialog(
  open: isOpen,
  onConfirm: handleConfirm,
  onCancel: handleCancel,
  title: 'Delete Project',
  message: 'This action cannot be undone.',
  confirmLabel: 'Delete',
)`,
    props: [
      {
        name: "open",
        type: "boolean",
        required: true,
        description: "Whether the dialog is visible.",
      },
      {
        name: "onConfirm",
        type: "() => void",
        required: true,
        description: "Called when user confirms the action.",
      },
      {
        name: "onCancel",
        type: "() => void",
        required: true,
        description: "Called when user cancels or dismisses.",
      },
      { name: "title", type: "string", required: true, description: "Dialog title text." },
      {
        name: "message",
        type: "string | ReactNode",
        required: true,
        description: "Dialog message content.",
      },
      {
        name: "confirmLabel",
        type: "string",
        required: false,
        defaultValue: "'Confirm'",
        description: "Confirm button label.",
      },
      {
        name: "cancelLabel",
        type: "string",
        required: false,
        defaultValue: "'Cancel'",
        description: "Cancel button label.",
      },
      {
        name: "loading",
        type: "boolean",
        required: false,
        defaultValue: "false",
        description: "Shows loading state on confirm button.",
      },
      {
        name: "variant",
        type: "'default' | 'danger' | 'warning'",
        required: false,
        defaultValue: "'default'",
        description: "Visual variant affecting button colors.",
      },
    ],
    guidelines: [
      { type: "do", text: "Use for destructive actions that cannot be undone." },
      { type: "do", text: "Keep title and description clear and concise." },
      { type: "do", text: "Use loading state for async operations." },
      { type: "dont", text: "Don't use for non-destructive actions." },
      { type: "dont", text: "Don't make messages too long — keep under 2-3 sentences." },
    ],
  },
  playground: {
    renderPreview: (props: Record<string, unknown>) =>
      React.createElement(FlowConfirmationDialog, {
        open: props.open as boolean,
        onClose: props.onClose as () => void,
        title: (props.title as string) ?? "Confirm Action",
        description: (props.description as string) ?? "Are you sure you want to proceed?",
        confirmLabel: (props.confirmLabel as string) ?? "Confirm",
        cancelLabel: (props.cancelLabel as string) ?? "Cancel",
        intent: (props.intent as string) ?? "danger",
        onConfirm: () => {},
      } as unknown as React.ComponentProps<typeof FlowConfirmationDialog>),
    overlay: true,
    defaults: { title: "Confirm Action", description: "Are you sure you want to proceed?", confirmLabel: "Confirm", cancelLabel: "Cancel", intent: "danger" },
    excludeControls: ["open", "onClose", "onConfirm", "children", "className", "style"],
  },
};

// ── FlowCommandPalette ──

// ── FlowCommandPalette ──

function CommandPaletteOverviewDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const [lastCommand, setLastCommand] = useState<string>("");

  const commands: CommandItem[] = [
    { id: "new-file", label: "New File", shortcut: "⌘N", category: "File" },
    { id: "open-file", label: "Open File", shortcut: "⌘O", category: "File" },
    { id: "save", label: "Save", shortcut: "⌘S", category: "File" },
    { id: "search", label: "Search", shortcut: "⌘F", category: "Edit" },
    { id: "replace", label: "Replace", shortcut: "⌘H", category: "Edit" },
    { id: "settings", label: "Settings", shortcut: "⌘,", category: "Preferences" },
    { id: "help", label: "Help", shortcut: "F1", category: "Help" },
  ];

  const handleCommand = (command: CommandItem) => {
    setLastCommand(command.label);
    // Note: setIsOpen(false) is handled by the component's onClose
  };

  return (
    <Stack gap={6}>
      <DemoSection
        title="Basic Command Palette"
        description="Keyboard-triggered search interface for commands and actions."
      >
        <DemoGroup>
          <Stack gap={3}>
            <FlowButton variant="primary" onClick={() => setIsOpen(true)}>
              Open Command Palette (⌘K)
            </FlowButton>
            {lastCommand && (
              <Text variant="caption" color="secondary">
                Last executed: {lastCommand}
              </Text>
            )}
            <FlowCommandPalette
              open={isOpen}
              onClose={() => setIsOpen(false)}
              commands={commands}
              onSelect={handleCommand}
              placeholder="Type a command or search..."
            />
          </Stack>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="With Categories"
        description="Commands grouped by category for better organization."
      >
        <DemoGroup>
          <Surface variant="secondary" padding="container">
            <Stack gap={2}>
              <Text variant="label-s" color="secondary">
                Available Categories:
              </Text>
              <Inline gap={2} wrap>
                {Array.from(new Set(commands.map((c) => c.category))).map((category) => (
                  <FlowChip key={category} variant="filled" size="sm">
                    {category}
                  </FlowChip>
                ))}
              </Inline>
            </Stack>
          </Surface>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Keyboard Shortcuts"
        description="Direct access via keyboard shortcuts for power users."
      >
        <DemoGroup>
          <Surface variant="secondary" padding="container">
            <Stack gap={2}>
              <Text variant="label-s" color="secondary">
                Common Shortcuts:
              </Text>
              <FlowList>
                {commands.slice(0, 4).map((cmd) => (
                  <FlowListItem
                    key={cmd.id}
                    primary={<Text variant="paragraph-s">{cmd.label}</Text>}
                    actions={
                      <Text variant="caption" color="tertiary">
                        {cmd.shortcut}
                      </Text>
                    }
                  />
                ))}
              </FlowList>
            </Stack>
          </Surface>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

function CommandPaletteUseCasesDemo() {
  const [activeExample, setActiveExample] = useState<string>("ide");
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [selectedCmd, setSelectedCmd] = useState<string>("");

  const ideCommands: CommandItem[] = [
    { id: "run", label: "Run Project", shortcut: "F5", category: "Run" },
    { id: "debug", label: "Start Debugging", shortcut: "F5", category: "Run" },
    { id: "build", label: "Build Project", shortcut: "Ctrl+Shift+B", category: "Build" },
    { id: "test", label: "Run Tests", shortcut: "Ctrl+R T", category: "Test" },
    { id: "format", label: "Format Document", shortcut: "Shift+Alt+F", category: "Edit" },
    { id: "terminal", label: "Toggle Terminal", shortcut: "Ctrl+`", category: "View" },
  ];

  const appCommands: CommandItem[] = [
    { id: "new-doc", label: "New Document", shortcut: "⌘N", category: "File" },
    { id: "share", label: "Share Document", shortcut: "⌘S", category: "File" },
    { id: "export", label: "Export PDF", shortcut: "⌘E", category: "File" },
    { id: "print", label: "Print", shortcut: "⌘P", category: "File" },
    { id: "undo", label: "Undo", shortcut: "⌘Z", category: "Edit" },
    { id: "redo", label: "Redo", shortcut: "⌘Y", category: "Edit" },
  ];

  const examples: Record<string, { commands: CommandItem[]; description: string }> = {
    ide: {
      commands: ideCommands,
      description: "IDE-style command palette for development tools",
    },
    app: {
      commands: appCommands,
      description: "Application command palette for document editing",
    },
  };

  const handleSelectCommand = (cmd: CommandItem) => {
    setSelectedCmd(cmd.label);
    setPaletteOpen(false);
  };

  return (
    <Stack gap={4}>
      <Inline gap={2} wrap>
        {Object.keys(examples).map((key) => (
          <FlowChip
            key={key}
            variant={activeExample === key ? "tonal" : "filled"}
            onClick={() => setActiveExample(key)}
          >
            {key.charAt(0).toUpperCase() + key.slice(1)} Example
          </FlowChip>
        ))}
      </Inline>

      <DemoSection
        title={activeExample === "ide" ? "IDE Command Palette" : "Application Command Palette"}
        description={examples[activeExample].description}
      >
        <DemoGroup>
          <Stack gap={3}>
            <FlowButton variant="primary" onClick={() => setPaletteOpen(true)}>
              Open {activeExample === "ide" ? "IDE" : "Application"} Palette
            </FlowButton>
            {selectedCmd && (
              <Text variant="caption" color="secondary">
                Last executed: {selectedCmd}
              </Text>
            )}
            <Surface variant="secondary" padding="container">
              <Text variant="caption" color="secondary">
                Try the command palette above to see it in action.
              </Text>
            </Surface>
          </Stack>
        </DemoGroup>
      </DemoSection>

      <FlowCommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        commands={examples[activeExample].commands}
        onSelect={handleSelectCommand}
        placeholder="Type to search commands..."
      />
    </Stack>
  );
}

const commandPaletteEntry: PatternEntry = {
  category: "overlay",
  spec: {
    name: "Command Palette",
    purpose:
      "Keyboard-driven command palette (Cmd+K / Ctrl+K) with fuzzy search, categorized results, and recent commands.",
    platform: "desktop",
    composesL3: ["FlowDialog", "FlowSearch", "FlowList", "FlowListItem", "FlowIcon"],
    orchestrates: [
      "Keyboard shortcut registration (Cmd+K)",
      "Fuzzy search across commands",
      "Category-based result grouping",
      "Recent commands tracking",
      "Keyboard navigation through results",
    ],
  },
  composition: [
    {
      component: "FlowDialog",
      role: "Modal overlay container",
      tokens: ["--sys-energy-surface-overlay"],
    },
    { component: "FlowSearch", role: "Command search input", tokens: [] },
    { component: "FlowList", role: "Grouped command results", tokens: [] },
    {
      component: "FlowIcon",
      role: "Command category icons",
      tokens: ["--sys-energy-text-secondary"],
    },
  ],
  demos: {
    overview: CommandPaletteOverviewDemo,
    useCases: CommandPaletteUseCasesDemo,
  },
  developer: {
    reactImport: `import { FlowCommandPalette } from "@flow/design-system";`,
    reactUsage: `<FlowCommandPalette
  open={isOpen}
  onClose={() => setIsOpen(false)}
  commands={commands}
  onSelect={handleCommand}
/>`,
    flutterImport: `import 'package:flow/patterns/command_palette.dart';`,
    flutterUsage: `FlowCommandPalette(
  commands: commands,
  onCommand: handleCommand,
)`,
    props: [
      {
        name: "commands",
        type: "Command[]",
        required: true,
        description: "Array of available commands.",
      },
      {
        name: "onCommand",
        type: "(command: Command) => void",
        required: true,
        description: "Command execution handler.",
      },
    ],
    guidelines: [
      { type: "do", text: "Use Cmd+K / Ctrl+K shortcut to open." },
      { type: "do", text: "Group commands by category." },
      { type: "dont", text: "Don't overload with too many commands." },
    ],
  },
  playground: {
    renderPreview: (props: Record<string, unknown>) =>
      React.createElement(FlowCommandPalette, {
        open: props.open as boolean,
        onClose: props.onClose as () => void,
        items: props.items as CommandItem[],
        onSelect: () => {},
        placeholder: (props.placeholder as string) ?? "Type a command...",
      } as unknown as React.ComponentProps<typeof FlowCommandPalette>),
    overlay: true,
    defaults: { placeholder: "Type a command..." },
    fixtures: {
      items: [
        { id: "new-file", label: "New File", icon: "file-plus", group: "Actions" },
        { id: "search", label: "Search", icon: "search", group: "Actions" },
        { id: "settings", label: "Settings", icon: "settings", group: "Navigation" },
        { id: "theme", label: "Toggle Theme", icon: "sun", group: "Preferences" },
      ],
    },
    excludeControls: ["open", "onClose", "onSelect", "items", "className", "style"],
  },
};

// ── FlowActionSheet ──

function ActionSheetOverviewDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const [lastAction, setLastAction] = useState<string>("");

  const actions = [
    { id: "edit", label: "Edit", icon: "edit" as const },
    { id: "duplicate", label: "Duplicate", icon: "copy" as const },
    { id: "share", label: "Share", icon: "share" as const },
    { id: "delete", label: "Delete", variant: "danger" as const },
  ];

  const handleAction = (actionId: string) => {
    setLastAction(actions.find((a) => a.id === actionId)?.label || actionId);
    setIsOpen(false);
  };

  return (
    <Stack gap={6}>
      <DemoSection
        title="Basic Action Sheet"
        description="Bottom sheet with action buttons for mobile interactions."
      >
        <DemoGroup>
          <Stack gap={3}>
            <FlowButton variant="primary" onClick={() => setIsOpen(true)}>
              Show Actions
            </FlowButton>
            {lastAction && (
              <Text variant="caption" color="secondary">
                Last action: {lastAction}
              </Text>
            )}
            <FlowActionSheet
              open={isOpen}
              onOpenChange={setIsOpen}
              title="What would you like to do?"
              actions={actions}
              onAction={handleAction}
            />
          </Stack>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="With Icons and Variants"
        description="Actions can include icons and use destructive variant for dangerous actions."
      >
        <DemoGroup>
          <Surface variant="secondary" padding="container">
            <Stack gap={2}>
              <Text variant="label-s" color="secondary">
                Action Types:
              </Text>
              <FlowList>
                {actions.map((action) => (
                  <FlowListItem
                    key={action.id}
                    primary={<Text variant="paragraph-s">{action.label}</Text>}
                    leading={action.icon ? <FlowIcon name={action.icon} /> : undefined}
                    status={action.variant === "danger" ? "error" : "neutral"}
                  />
                ))}
              </FlowList>
            </Stack>
          </Surface>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Contextual Actions"
        description="Different action sets for different contexts."
      >
        <DemoGroup>
          <Surface variant="secondary" padding="container">
            <Stack gap={3}>
              <Text variant="label-s" color="secondary">
                File Actions:
              </Text>
              <Inline gap={2} wrap>
                <FlowChip variant="filled">Open</FlowChip>
                <FlowChip variant="filled">Download</FlowChip>
                <FlowChip variant="filled" status="error">
                  Delete
                </FlowChip>
              </Inline>
              <Text variant="label-s" color="secondary">
                Message Actions:
              </Text>
              <Inline gap={2} wrap>
                <FlowChip variant="filled">Reply</FlowChip>
                <FlowChip variant="filled">Forward</FlowChip>
                <FlowChip variant="filled" status="error">
                  Report
                </FlowChip>
              </Inline>
            </Stack>
          </Surface>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

function ActionSheetUseCasesDemo() {
  const [activeExample, setActiveExample] = useState<string>("file");

  const fileActions = [
    { id: "open", label: "Open", icon: "folder-open" as const },
    { id: "download", label: "Download", icon: "download" as const },
    { id: "share", label: "Share", icon: "share" as const },
    { id: "rename", label: "Rename", icon: "edit" as const },
    { id: "move", label: "Move to...", icon: "arrow-right" as const },
    { id: "delete", label: "Delete", icon: "trash" as const, variant: "danger" as const },
  ];

  const messageActions = [
    { id: "reply", label: "Reply", icon: "reply" as const },
    { id: "forward", label: "Forward", icon: "share" as const },
    { id: "copy", label: "Copy Text", icon: "copy" as const },
    { id: "edit", label: "Edit", icon: "edit" as const },
    { id: "pin", label: "Pin Message", icon: "pin" as const },
    { id: "delete", label: "Delete", icon: "trash" as const, variant: "danger" as const },
  ];

  const contactActions = [
    { id: "call", label: "Call", icon: "phone" as const },
    { id: "message", label: "Send Message", icon: "message" as const },
    { id: "email", label: "Send Email", icon: "mail" as const },
    { id: "video", label: "Video Call", icon: "video" as const },
    { id: "block", label: "Block Contact", icon: "block" as const, variant: "danger" as const },
  ];

  const examples: Record<
    string,
    { actions: Record<string, unknown>[]; title: string; description: string }
  > = {
    file: {
      actions: fileActions,
      title: "File Management",
      description: "Actions for file operations in a document manager",
    },
    message: {
      actions: messageActions,
      title: "Message Options",
      description: "Context menu for chat messages",
    },
    contact: {
      actions: contactActions,
      title: "Contact Actions",
      description: "Communication options for a contact",
    },
  };

  return (
    <Stack gap={4}>
      <Inline gap={2} wrap>
        {Object.keys(examples).map((key) => (
          <FlowChip
            key={key}
            variant={activeExample === key ? "tonal" : "filled"}
            onClick={() => setActiveExample(key)}
          >
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </FlowChip>
        ))}
      </Inline>

      <DemoSection
        title={examples[activeExample].title}
        description={examples[activeExample].description}
      >
        <DemoGroup>
          <Surface variant="primary" padding="container">
            <Stack gap={3}>
              <Text variant="heading-s">{examples[activeExample].title}</Text>
              <FlowList>
                {examples[activeExample].actions.map((action: Record<string, unknown>) => (
                  <FlowListItem
                    key={action.id as string}
                    primary={<Text variant="paragraph-s">{action.label as string}</Text>}
                    leading={action.icon ? <FlowIcon name={action.icon as string} /> : undefined}
                    status={action.variant === "danger" ? "error" : "neutral"}
                  />
                ))}
              </FlowList>
              <Text variant="caption" color="secondary">
                These actions would appear in a bottom sheet on mobile devices.
              </Text>
            </Stack>
          </Surface>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

const actionSheetEntry: PatternEntry = {
  category: "overlay-patterns",
  spec: {
    name: "Action Sheet",
    purpose:
      "Mobile bottom sheet presenting a list of actions. Composes FlowBottomSheet with action buttons and optional destructive variants.",
    platform: "mobile",
    composesL3: ["FlowBottomSheet", "FlowButton", "FlowListItem"],
    orchestrates: [
      "Action list presentation",
      "Destructive action styling",
      "Touch-friendly button sizing",
      "Sheet dismissal on action selection",
    ],
  },
  composition: [
    { component: "FlowBottomSheet", role: "Mobile overlay container", tokens: [] },
    { component: "FlowButton", role: "Individual action buttons", tokens: [] },
  ],
  demos: {
    overview: ActionSheetOverviewDemo,
    useCases: ActionSheetUseCasesDemo,
  },
  developer: {
    reactImport: `import { FlowActionSheet } from "@flow/design-system";`,
    reactUsage: `<FlowActionSheet
  open={isOpen}
  onOpenChange={setIsOpen}
  title="Choose action"
  actions={[
    { id: "edit", label: "Edit", icon: "edit" },
    { id: "delete", label: "Delete", variant: "danger" },
  ]}
  onAction={handleAction}
/>`,
    flutterImport: `import 'package:flow/patterns/action_sheet.dart';`,
    flutterUsage: `FlowActionSheet(
  open: isOpen,
  onOpenChange: setIsOpen,
  title: 'Choose action',
  actions: [
    ActionItem(id: 'edit', label: 'Edit', icon: Icons.edit),
    ActionItem(id: 'delete', label: 'Delete', variant: ActionVariant.destructive),
  ],
  onAction: handleAction,
)`,
    props: [
      { name: "open", type: "boolean", required: true, description: "Whether sheet is visible." },
      {
        name: "onOpenChange",
        type: "(open: boolean) => void",
        required: true,
        description: "Called when open state changes.",
      },
      { name: "title", type: "string", required: false, description: "Optional sheet title." },
      {
        name: "actions",
        type: "ActionItem[]",
        required: true,
        description: "Array of action definitions.",
      },
      {
        name: "onAction",
        type: "(actionId: string) => void",
        required: true,
        description: "Called when action is selected.",
      },
    ],
    guidelines: [
      { type: "do", text: "Use for 3-7 actions that need touch-friendly presentation." },
      { type: "do", text: "Put destructive actions at the bottom." },
      { type: "do", text: "Include cancel action or allow swipe-to-dismiss." },
      { type: "dont", text: "Don't use for navigation — use FlowBottomSheet directly." },
      { type: "dont", text: "Don't mix too many action types in one sheet." },
    ],
  },
  playground: {
    renderPreview: (props: Record<string, unknown>) =>
      React.createElement(FlowActionSheet, {
        open: props.open as boolean,
        onClose: props.onClose as () => void,
        title: (props.title as string) ?? "Actions",
        actions: props.actions,
      } as unknown as React.ComponentProps<typeof FlowActionSheet>),
    overlay: true,
    defaults: { title: "Actions" },
    fixtures: {
      actions: [
        { id: "edit", label: "Edit", icon: "edit" },
        { id: "share", label: "Share", icon: "share-2" },
        { id: "delete", label: "Delete", icon: "trash-2", destructive: true },
      ],
    },
    excludeControls: ["open", "onClose", "actions", "onAction", "className", "style"],
  },
};

// ── FlowFullscreenSheet ──

// ── FlowFullscreenSheet ──

function FullscreenSheetOverviewDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handleClose = () => {
    setIsOpen(false);
    setCurrentStep(1);
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Stack gap={6}>
      <DemoSection
        title="Basic Fullscreen Sheet"
        description="Full-viewport modal for complex mobile workflows with navigation."
      >
        <DemoGroup>
          <Stack gap={3}>
            <FlowButton variant="primary" onClick={() => setIsOpen(true)}>
              Open Fullscreen Sheet
            </FlowButton>
            <Text variant="caption" color="secondary">
              Current step: {currentStep}/3
            </Text>
            <FlowFullscreenSheet
              open={isOpen}
              onClose={handleClose}
              title={`Step ${currentStep} of 3`}
            >
              <Stack gap={6} padding={6}>
                <Surface variant="secondary" padding="container">
                  <Text variant="heading-m">
                    {currentStep === 1 && "Personal Information"}
                    {currentStep === 2 && "Contact Details"}
                    {currentStep === 3 && "Review & Submit"}
                  </Text>
                  <Text variant="paragraph-s" color="secondary">
                    {currentStep === 1 && "Please provide your basic information."}
                    {currentStep === 2 && "How can we reach you?"}
                    {currentStep === 3 && "Review your information before submitting."}
                  </Text>
                </Surface>

                <Surface variant="primary" padding="container">
                  {currentStep === 1 && (
                    <Stack gap={4}>
                      <FlowTextInput label="Full Name" placeholder="John Doe" />
                      <FlowTextInput label="Date of Birth" placeholder="MM/DD/YYYY" />
                      <FlowTextInput label="Occupation" placeholder="Software Engineer" />
                    </Stack>
                  )}
                  {currentStep === 2 && (
                    <Stack gap={4}>
                      <FlowTextInput label="Email" type="email" placeholder="john@example.com" />
                      <FlowTextInput label="Phone" type="tel" placeholder="+1 (555) 123-4567" />
                      <FlowTextInput label="Address" placeholder="123 Main St" />
                    </Stack>
                  )}
                  {currentStep === 3 && (
                    <Stack gap={4}>
                      <Text variant="heading-s">Summary</Text>
                      <Text variant="paragraph-s">
                        Name: John Doe
                        <br />
                        Email: john@example.com
                        <br />
                        Phone: +1 (555) 123-4567
                      </Text>
                      <FlowButton variant="primary" onClick={handleNext}>
                        Submit Application
                      </FlowButton>
                    </Stack>
                  )}
                </Surface>

                <Inline gap={2} justify="between">
                  <FlowButton variant="ghost" onClick={handleBack} disabled={currentStep === 1}>
                    Back
                  </FlowButton>
                  <FlowButton variant="primary" onClick={handleNext}>
                    {currentStep === 3 ? "Finish" : "Next"}
                  </FlowButton>
                </Inline>
              </Stack>
            </FlowFullscreenSheet>
          </Stack>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="With Form Content"
        description="Complex forms that need full screen real estate."
      >
        <DemoGroup>
          <Surface variant="secondary" padding="container">
            <Stack gap={2}>
              <Text variant="label-s" color="secondary">
                Use Cases:
              </Text>
              <FlowList>
                <FlowListItem primary={<Text variant="paragraph-s">User registration</Text>} />
                <FlowListItem primary={<Text variant="paragraph-s">Profile editing</Text>} />
                <FlowListItem primary={<Text variant="paragraph-s">Settings configuration</Text>} />
                <FlowListItem primary={<Text variant="paragraph-s">Multi-step wizards</Text>} />
              </FlowList>
            </Stack>
          </Surface>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Navigation Patterns"
        description="Clear navigation with back buttons and progress indicators."
      >
        <DemoGroup>
          <Surface variant="secondary" padding="container">
            <Stack gap={3}>
              <Text variant="label-s" color="secondary">
                Navigation Elements:
              </Text>
              <Inline gap={2} wrap>
                <FlowChip variant="filled">Close button (X)</FlowChip>
                <FlowChip variant="filled">Back button</FlowChip>
                <FlowChip variant="filled">Progress indicator</FlowChip>
                <FlowChip variant="filled">Action buttons</FlowChip>
              </Inline>
              <Text variant="caption" color="secondary">
                Fullscreen sheets provide dedicated space for complex interactions.
              </Text>
            </Stack>
          </Surface>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

function FullscreenSheetUseCasesDemo() {
  const [activeExample, setActiveExample] = useState<string>("profile");
  const [sheetOpen, setSheetOpen] = useState(false);

  const examples: Record<string, { title: string; description: string; content: ReactNode }> = {
    profile: {
      title: "Edit Profile",
      description: "Complex profile editing with multiple sections",
      content: (
        <Stack gap={6} padding={6}>
          <FlowFormSection title="Basic Information" description="Your public profile details">
            <FlowTextInput label="Display Name" defaultValue="John Doe" />
            <FlowTextInput label="Bio" multiline rows={3} placeholder="Tell us about yourself..." />
            <FlowTextInput label="Website" placeholder="https://example.com" />
          </FlowFormSection>

          <FlowFormSection
            title="Privacy Settings"
            description="Control who can see your information"
          >
            <FlowList>
              <FlowListItem
                primary={<Text variant="paragraph-s">Show email publicly</Text>}
                actions={<FlowCheckbox onChange={() => {}} />}
              />
              <FlowListItem
                primary={<Text variant="paragraph-s">Show activity status</Text>}
                actions={<FlowCheckbox checked onChange={() => {}} />}
              />
              <FlowListItem
                primary={<Text variant="paragraph-s">Allow direct messages</Text>}
                actions={<FlowCheckbox checked onChange={() => {}} />}
              />
            </FlowList>
          </FlowFormSection>
        </Stack>
      ),
    },
    settings: {
      title: "App Settings",
      description: "Comprehensive settings with multiple categories",
      content: (
        <Stack gap={6} padding={6}>
          <FlowFormSection title="Appearance" description="Customize how the app looks">
            <FlowList>
              <FlowListItem
                primary={<Text variant="paragraph-s">Dark mode</Text>}
                actions={<FlowCheckbox onChange={() => {}} />}
              />
              <FlowListItem
                primary={<Text variant="paragraph-s">Compact layout</Text>}
                actions={<FlowCheckbox onChange={() => {}} />}
              />
              <FlowListItem
                primary={<Text variant="paragraph-s">High contrast</Text>}
                actions={<FlowCheckbox onChange={() => {}} />}
              />
            </FlowList>
          </FlowFormSection>

          <FlowFormSection
            title="Notifications"
            description="Choose what notifications you receive"
          >
            <FlowList>
              <FlowListItem
                primary={<Text variant="paragraph-s">Email notifications</Text>}
                actions={<FlowCheckbox checked onChange={() => {}} />}
              />
              <FlowListItem
                primary={<Text variant="paragraph-s">Push notifications</Text>}
                actions={<FlowCheckbox checked onChange={() => {}} />}
              />
              <FlowListItem
                primary={<Text variant="paragraph-s">SMS alerts</Text>}
                actions={<FlowCheckbox onChange={() => {}} />}
              />
            </FlowList>
          </FlowFormSection>

          <FlowFormSection title="Advanced" description="Developer options">
            <FlowTextInput label="API Endpoint" placeholder="https://api.example.com" />
            <FlowTextInput label="Timeout (seconds)" type="number" placeholder="30" />
          </FlowFormSection>
        </Stack>
      ),
    },
    wizard: {
      title: "Setup Wizard",
      description: "Multi-step onboarding process",
      content: (
        <Stack gap={6} padding={6}>
          <Surface variant="secondary" padding="container">
            <Stack gap={2}>
              <Text variant="heading-m">Welcome to Flow!</Text>
              <Text variant="paragraph-s" color="secondary">
                Let&apos;s get you set up with a few quick steps.
              </Text>
              <Inline gap={1}>
                <div
                  style={{
                    width: "var(--ref-frame-space-2)",
                    height: "var(--ref-frame-space-2)",
                    borderRadius: "var(--ref-frame-radius-1)",
                    backgroundColor: "var(--sys-energy-accent)",
                  }}
                />
                <div
                  style={{
                    width: "var(--ref-frame-space-2)",
                    height: "var(--ref-frame-space-2)",
                    borderRadius: "var(--ref-frame-radius-1)",
                    backgroundColor: "var(--sys-energy-border-default)",
                  }}
                />
                <div
                  style={{
                    width: "var(--ref-frame-space-2)",
                    height: "var(--ref-frame-space-2)",
                    borderRadius: "var(--ref-frame-radius-1)",
                    backgroundColor: "var(--sys-energy-border-default)",
                  }}
                />
              </Inline>
            </Stack>
          </Surface>

          <FlowFormSection title="Account Setup" description="Create your account">
            <FlowTextInput label="Email" type="email" required />
            <FlowTextInput label="Password" type="password" required />
            <FlowTextInput label="Confirm Password" type="password" required />
          </FlowFormSection>

          <FlowFormSection title="Preferences" description="How do you plan to use Flow?">
            <FlowList>
              <FlowListItem
                primary={<Text variant="paragraph-s">Personal use</Text>}
                actions={<FlowRadioButton name="usage" onChange={() => {}} />}
              />
              <FlowListItem
                primary={<Text variant="paragraph-s">Team collaboration</Text>}
                actions={<FlowRadioButton name="usage" checked onChange={() => {}} />}
              />
              <FlowListItem
                primary={<Text variant="paragraph-s">Enterprise</Text>}
                actions={<FlowRadioButton name="usage" onChange={() => {}} />}
              />
            </FlowList>
          </FlowFormSection>
        </Stack>
      ),
    },
  };

  return (
    <Stack gap={4}>
      <Inline gap={2} wrap>
        {Object.keys(examples).map((key) => (
          <FlowChip
            key={key}
            variant={activeExample === key ? "tonal" : "filled"}
            onClick={() => setActiveExample(key)}
          >
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </FlowChip>
        ))}
      </Inline>

      <DemoSection
        title={examples[activeExample].title}
        description={examples[activeExample].description}
      >
        <DemoGroup>
          <Stack gap={3}>
            <FlowButton variant="primary" onClick={() => setSheetOpen(true)}>
              Open {examples[activeExample].title}
            </FlowButton>
            <Surface variant="secondary" padding="container">
              <Text variant="caption" color="secondary">
                Click the button above to see this content in a fullscreen sheet.
              </Text>
            </Surface>
          </Stack>
        </DemoGroup>
      </DemoSection>

      <FlowFullscreenSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        title={examples[activeExample].title}
      >
        {examples[activeExample].content}
      </FlowFullscreenSheet>
    </Stack>
  );
}

const fullscreenSheetEntry: PatternEntry = {
  category: "overlay",
  spec: {
    name: "Fullscreen Sheet",
    purpose:
      "Full-viewport modal for complex tasks on mobile. Composes Dialog fullscreen with nav bar and step transitions.",
    platform: "mobile",
    composesL3: ["FlowDialog", "FlowButton", "FlowIconButton", "Surface", "Text"],
    orchestrates: [
      "Full-viewport takeover",
      "Multi-step navigation",
      "Back gesture handling",
      "Focus trap management",
      "Entry/exit transitions",
    ],
  },
  composition: [
    {
      component: "FlowDialog",
      role: "Fullscreen modal container",
      tokens: ["--sys-energy-surface-overlay"],
    },
    { component: "FlowButton", role: "Navigation and action buttons", tokens: [] },
    { component: "FlowIconButton", role: "Close/back buttons", tokens: [] },
    { component: "Surface", role: "Content container", tokens: ["--sys-energy-surface-primary"] },
    { component: "Text", role: "Title and content", tokens: ["--sys-voice-*-size"] },
  ],
  demos: {
    overview: FullscreenSheetOverviewDemo,
    useCases: FullscreenSheetUseCasesDemo,
  },
  developer: {
    reactImport: `import { FlowFullscreenSheet } from "@flow/design-system";`,
    reactUsage: `<FlowFullscreenSheet
  title="Edit Profile"
  onClose={handleClose}
>
  <ProfileForm />
</FlowFullscreenSheet>`,
    flutterImport: `import 'package:flow/patterns/fullscreen_sheet.dart';`,
    flutterUsage: `FlowFullscreenSheet(
  title: 'Edit Profile',
  onClose: handleClose,
  child: ProfileForm(),
)`,
    props: [
      { name: "title", type: "string", required: true, description: "Sheet title." },
      { name: "children", type: "ReactNode", required: true, description: "Sheet content." },
      { name: "onClose", type: "() => void", required: true, description: "Close handler." },
    ],
    guidelines: [
      { type: "do", text: "Use for complex mobile workflows." },
      { type: "do", text: "Provide clear navigation." },
      { type: "dont", text: "Don't use for simple actions." },
    ],
  },
  playground: {
    renderPreview: (props: Record<string, unknown>) =>
      React.createElement(
        FlowFullscreenSheet,
        {
          open: props.open as boolean,
          onClose: props.onClose as () => void,
          title: (props.title as string) ?? "Full Screen",
          children: React.createElement(Text, { variant: "paragraph-s", children: "Sheet content goes here" } as React.ComponentProps<typeof Text>),
        } as unknown as React.ComponentProps<typeof FlowFullscreenSheet>,
      ),
    overlay: true,
    defaults: { title: "Full Screen" },
    excludeControls: ["open", "onClose", "children", "className", "style"],
  },
};

// ── Exported registry slice ──
export const overlayPatterns: Record<string, PatternEntry> = {
  "overlay/confirmation-dialog": confirmationDialogEntry,
  "overlay/command-palette": commandPaletteEntry,
  "overlay/action-sheet": actionSheetEntry,
  "overlay/fullscreen-sheet": fullscreenSheetEntry,
};

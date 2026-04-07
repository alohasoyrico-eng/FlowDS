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
  FlowButton,
  FlowCheckbox,
  FlowChip,
  FlowFormSection,
  FlowIconButton,
  FlowList,
  FlowListItem,
  FlowRadioButton,
  FlowShortcutGrid,
  FlowSwipeActions,
  FlowTextInput,
  FlowToolbar,
  FlowToolbarDivider,
  FlowToolbarGroup,
  FlowToolbarSpacer,
  Grid,
  Inline,
  Stack,
  Surface,
  Text,
} from "../../../lib";
import { FlowIcon } from "../../primitives";
import { DemoGroup, DemoSection } from "../../components/demo-helpers";
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
// LAYOUT PATTERNS REGISTRY
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// ── FlowFormSection ──

function FormSectionOverviewDemo() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    notes: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <Stack gap={6}>
      <DemoSection
        title="Basic Form Section"
        description="Groups related form fields under a section title with description."
      >
        <DemoGroup>
          <Surface variant="primary" padding="container">
            <Stack gap={4}>
              <FlowFormSection title="Personal Information" description="Basic details about you">
                <FlowTextInput
                  label="Full Name"
                  value={formData.name}
                  onChange={(v) => handleChange("name", v)}
                />
                <FlowTextInput
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={(v) => handleChange("email", v)}
                />
                <FlowTextInput
                  label="Phone Number"
                  type="tel"
                  value={formData.phone}
                  onChange={(v) => handleChange("phone", v)}
                />
              </FlowFormSection>
            </Stack>
          </Surface>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Collapsible Sections"
        description="Optional sections can be collapsed to reduce visual clutter."
      >
        <DemoGroup>
          <Surface variant="primary" padding="container">
            <Stack gap={4}>
              <FlowFormSection title="Contact Information" description="How can we reach you?">
                <FlowTextInput
                  label="Email"
                  value={formData.email}
                  onChange={(v) => handleChange("email", v)}
                />
                <FlowTextInput
                  label="Phone"
                  value={formData.phone}
                  onChange={(v) => handleChange("phone", v)}
                />
              </FlowFormSection>

              <FlowFormSection
                title="Address Details"
                description="Optional: Where are you located?"
                collapsible
              >
                <FlowTextInput
                  label="Street Address"
                  value={formData.address}
                  onChange={(v) => handleChange("address", v)}
                />
                <FlowTextInput
                  label="City"
                  value={formData.city}
                  onChange={(v) => handleChange("city", v)}
                />
                <FlowTextInput
                  label="ZIP Code"
                  value={formData.zipCode}
                  onChange={(v) => handleChange("zipCode", v)}
                />
              </FlowFormSection>

              <FlowFormSection
                title="Additional Notes"
                description="Any extra information you'd like to share"
                collapsible
              >
                <FlowTextInput
                  label="Notes"
                  multiline
                  rows={3}
                  value={formData.notes}
                  onChange={(v) => handleChange("notes", v)}
                />
              </FlowFormSection>
            </Stack>
          </Surface>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Progressive Disclosure"
        description="Use collapsible sections for optional or advanced settings."
      >
        <DemoGroup>
          <Surface variant="primary" padding="container">
            <Stack gap={4}>
              <FlowFormSection title="Basic Settings" description="Required configuration">
                <FlowTextInput label="Project Name" required />
                <FlowTextInput label="Description" multiline rows={2} />
              </FlowFormSection>

              <FlowFormSection
                title="Advanced Options"
                description="Optional: Fine-tune your configuration"
                collapsible
              >
                <FlowTextInput label="API Endpoint" placeholder="https://api.example.com" />
                <FlowTextInput label="Timeout (seconds)" type="number" placeholder="30" />
                <FlowTextInput label="Retry Count" type="number" placeholder="3" />
              </FlowFormSection>

              <FlowFormSection
                title="Notifications"
                description="Choose how you want to be notified"
                collapsible
              >
                <FlowList>
                  <FlowListItem
                    primary={<Text role="paragraph-s">Email notifications</Text>}
                    actions={<FlowCheckbox checked onChange={() => {}} />}
                  />
                  <FlowListItem
                    primary={<Text role="paragraph-s">Push notifications</Text>}
                    actions={<FlowCheckbox onChange={() => {}} />}
                  />
                  <FlowListItem
                    primary={<Text role="paragraph-s">SMS alerts</Text>}
                    actions={<FlowCheckbox onChange={() => {}} />}
                  />
                </FlowList>
              </FlowFormSection>
            </Stack>
          </Surface>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Form Validation"
        description="Sections can highlight validation errors or required fields."
      >
        <DemoGroup>
          <Surface variant="primary" padding="container">
            <Stack gap={4}>
              <FlowFormSection
                title="Account Setup"
                description="Create your account to get started"
              >
                <FlowTextInput label="Username" required error="Username is required" />
                <FlowTextInput
                  label="Password"
                  type="password"
                  required
                  error="Password must be at least 8 characters"
                />
              </FlowFormSection>

              <FlowFormSection
                title="Security Settings"
                description="Additional security options"
                collapsible
              >
                <FlowList>
                  <FlowListItem
                    primary={<Text role="paragraph-s">Two-factor authentication</Text>}
                    secondary={
                      <Text role="caption" color="success">
                        Recommended
                      </Text>
                    }
                    actions={<FlowCheckbox onChange={() => {}} />}
                  />
                  <FlowListItem
                    primary={<Text role="paragraph-s">Login notifications</Text>}
                    actions={<FlowCheckbox checked onChange={() => {}} />}
                  />
                </FlowList>
              </FlowFormSection>
            </Stack>
          </Surface>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

function FormSectionUseCasesDemo() {
  const [activeExample, setActiveExample] = useState<string>("profile");

  const examples: Record<string, ReactNode> = {
    profile: (
      <Surface variant="primary" padding="container">
        <Stack gap={4}>
          <Text role="heading-m">Edit Profile</Text>
          <FlowFormSection title="Basic Information" description="Your public profile information">
            <FlowTextInput label="Display Name" defaultValue="John Doe" />
            <FlowTextInput label="Bio" multiline rows={2} placeholder="Tell us about yourself..." />
          </FlowFormSection>

          <FlowFormSection title="Contact Details" description="How others can reach you">
            <FlowTextInput label="Email" type="email" defaultValue="john@example.com" />
            <FlowTextInput label="Phone" type="tel" />
          </FlowFormSection>

          <FlowFormSection
            title="Privacy Settings"
            description="Control who can see your information"
            collapsible
          >
            <FlowList>
              <FlowListItem
                primary={<Text role="paragraph-s">Show email publicly</Text>}
                actions={<FlowCheckbox onChange={() => {}} />}
              />
              <FlowListItem
                primary={<Text role="paragraph-s">Show phone number</Text>}
                actions={<FlowCheckbox onChange={() => {}} />}
              />
            </FlowList>
          </FlowFormSection>
        </Stack>
      </Surface>
    ),
    settings: (
      <Surface variant="primary" padding="container">
        <Stack gap={4}>
          <Text role="heading-m">Application Settings</Text>
          <FlowFormSection title="Appearance" description="Customize how the app looks and feels">
            <FlowList>
              <FlowListItem
                primary={<Text role="paragraph-s">Dark mode</Text>}
                actions={<FlowCheckbox onChange={() => {}} />}
              />
              <FlowListItem
                primary={<Text role="paragraph-s">Compact layout</Text>}
                actions={<FlowCheckbox onChange={() => {}} />}
              />
            </FlowList>
          </FlowFormSection>

          <FlowFormSection
            title="Notifications"
            description="Choose what notifications you want to receive"
          >
            <FlowList>
              <FlowListItem
                primary={<Text role="paragraph-s">Email notifications</Text>}
                actions={<FlowCheckbox checked onChange={() => {}} />}
              />
              <FlowListItem
                primary={<Text role="paragraph-s">Push notifications</Text>}
                actions={<FlowCheckbox checked onChange={() => {}} />}
              />
              <FlowListItem
                primary={<Text role="paragraph-s">Marketing emails</Text>}
                actions={<FlowCheckbox onChange={() => {}} />}
              />
            </FlowList>
          </FlowFormSection>

          <FlowFormSection
            title="Advanced"
            description="Developer and power user options"
            collapsible
          >
            <FlowTextInput label="API Key" placeholder="Enter your API key" />
            <FlowTextInput label="Webhook URL" placeholder="https://example.com/webhook" />
          </FlowFormSection>
        </Stack>
      </Surface>
    ),
    checkout: (
      <Surface variant="primary" padding="container">
        <Stack gap={4}>
          <Text role="heading-m">Checkout</Text>
          <FlowFormSection title="Billing Address" description="Where should we send the invoice?">
            <FlowTextInput label="Full Name" required />
            <FlowTextInput label="Email" type="email" required />
            <FlowTextInput label="Address Line 1" required />
            <FlowTextInput label="Address Line 2" />
            <Inline gap={2}>
              <FlowTextInput label="City" required style={{ flex: 1 }} />
              <FlowTextInput label="ZIP Code" required style={{ flex: 1 }} />
            </Inline>
          </FlowFormSection>

          <FlowFormSection title="Payment Method" description="How would you like to pay?">
            <FlowList>
              <FlowListItem
                primary={<Text role="paragraph-s">Credit Card</Text>}
                actions={<FlowRadioButton name="payment" checked onChange={() => {}} />}
              />
              <FlowListItem
                primary={<Text role="paragraph-s">PayPal</Text>}
                actions={<FlowRadioButton name="payment" onChange={() => {}} />}
              />
              <FlowListItem
                primary={<Text role="paragraph-s">Bank Transfer</Text>}
                actions={<FlowRadioButton name="payment" onChange={() => {}} />}
              />
            </FlowList>
          </FlowFormSection>

          <FlowFormSection
            title="Order Notes"
            description="Any special instructions for your order"
            collapsible
          >
            <FlowTextInput
              label="Notes"
              multiline
              rows={3}
              placeholder="Special delivery instructions, gift messages, etc."
            />
          </FlowFormSection>
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

const formSectionEntry: PatternEntry = {
  category: "layout-patterns",
  spec: {
    name: "Form Section",
    purpose:
      "Groups related form fields under a section title with description and collapsible behavior.",
    platform: "shared",
    composesL3: ["FlowFieldset", "FlowAccordion", "Text", "Stack"],
    orchestrates: [
      "Section collapse/expand logic",
      "Related field grouping",
      "Section-level validation summary",
      "Progressive disclosure of optional fields",
    ],
  },
  composition: [
    { component: "FlowFieldset", role: "Semantic form grouping", tokens: [] },
    { component: "FlowAccordion", role: "Collapsible section behavior", tokens: [] },
    { component: "Text", role: "Section title and description", tokens: ["--sys-voice-*-size"] },
    {
      component: "Stack",
      role: "Field layout within section",
      tokens: ["--sys-frame-gap-component", "--sys-frame-padding-*"],
    },
  ],
  demos: {
    overview: FormSectionOverviewDemo,
    useCases: FormSectionUseCasesDemo,
  },
  developer: {
    reactImport: `import { FlowFormSection } from "@flow/design-system";`,
    reactUsage: `<FlowFormSection
  title="Contact Information"
  description="How can we reach you?"
>
  <FlowTextInput label="Email" />
  <FlowTextInput label="Phone" />
</FlowFormSection>`,
    flutterImport: `import 'package:flow/patterns/form_section.dart';`,
    flutterUsage: `FlowFormSection(
  title: 'Contact Information',
  description: 'How can we reach you?',
  children: [
    FlowTextInput(label: 'Email'),
    FlowTextInput(label: 'Phone'),
  ],
)`,
    props: [
      { name: "title", type: "string", required: true, description: "Section title." },
      { name: "description", type: "string", required: false, description: "Section description." },
      { name: "children", type: "ReactNode", required: true, description: "Form fields." },
      {
        name: "collapsible",
        type: "boolean",
        required: false,
        defaultValue: "false",
        description: "Whether section can collapse.",
      },
    ],
    guidelines: [
      { type: "do", text: "Use to group related form fields." },
      { type: "do", text: "Make optional sections collapsible." },
      { type: "dont", text: "Don't nest form sections deeply." },
    ],
  },
};

// ── FlowToolbar ──

function ToolbarOverviewDemo() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"list" | "grid" | "table">("list");

  const handleSelectAll = () => {
    if (selectedItems.length === 3) {
      setSelectedItems([]);
    } else {
      setSelectedItems(["item1", "item2", "item3"]);
    }
  };

  return (
    <Stack gap={6}>
      <DemoSection
        title="Basic Toolbar"
        description="Simple horizontal bar with primary and secondary actions."
      >
        <Surface variant="primary" padding="container">
          <FlowToolbar>
            <FlowButton variant="high">Create New</FlowButton>
            <FlowToolbarDivider />
            <FlowIconButton icon="filter" />
            <FlowIconButton icon="search" />
            <FlowIconButton icon="settings" />
          </FlowToolbar>
        </Surface>
      </DemoSection>

      <DemoSection
        title="With Groups and Spacer"
        description="Organized action groups with spacing for better visual hierarchy."
      >
        <Surface variant="primary" padding="container">
          <FlowToolbar>
            <FlowToolbarGroup>
              <FlowButton variant="high">Save</FlowButton>
              <FlowButton variant="medium">Save As</FlowButton>
            </FlowToolbarGroup>
            <FlowToolbarDivider />
            <FlowToolbarGroup>
              <FlowIconButton icon="undo" />
              <FlowIconButton icon="redo" />
            </FlowToolbarGroup>
            <FlowToolbarDivider />
            <FlowToolbarGroup>
              <FlowIconButton icon="zoom-in" />
              <FlowIconButton icon="zoom-out" />
            </FlowToolbarGroup>
            <FlowToolbarSpacer />
            <FlowToolbarGroup>
              <FlowIconButton icon="help" />
              <FlowIconButton icon="user" />
            </FlowToolbarGroup>
          </FlowToolbar>
        </Surface>
      </DemoSection>

      <DemoSection
        title="Selection Mode"
        description="Toolbar adapts when items are selected, showing selection-specific actions."
      >
        <Surface variant="primary" padding="container">
          <Stack gap={3}>
            <FlowToolbar>
              {selectedItems.length > 0 ? (
                <>
                  <FlowToolbarGroup>
                    <FlowButton variant="high" onClick={() => alert("Edit selected")}>
                      Edit ({selectedItems.length})
                    </FlowButton>
                    <FlowButton variant="danger" onClick={() => alert("Delete selected")}>
                      Delete
                    </FlowButton>
                  </FlowToolbarGroup>
                  <FlowToolbarDivider />
                  <FlowToolbarGroup>
                    <FlowIconButton icon="copy" />
                    <FlowIconButton icon="move" />
                  </FlowToolbarGroup>
                  <FlowToolbarSpacer />
                  <FlowButton variant="low" onClick={() => setSelectedItems([])}>
                    Clear Selection
                  </FlowButton>
                </>
              ) : (
                <>
                  <FlowToolbarGroup>
                    <FlowButton variant="high" onClick={handleSelectAll}>
                      Select All
                    </FlowButton>
                  </FlowToolbarGroup>
                  <FlowToolbarDivider />
                  <FlowToolbarGroup>
                    <FlowIconButton icon="filter" />
                    <FlowIconButton icon="sort" />
                  </FlowToolbarGroup>
                  <FlowToolbarSpacer />
                  <FlowToolbarGroup>
                    <FlowIconButton icon="grid" />
                    <FlowIconButton icon="list" />
                    <FlowIconButton icon="table" />
                  </FlowToolbarGroup>
                </>
              )}
            </FlowToolbar>

            <FlowList dividers>
              {["Document 1", "Document 2", "Document 3"].map((item, index) => (
                <FlowListItem
                  key={item}
                  primary={<Text role="paragraph-s">{item}</Text>}
                  actions={
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(`item${index + 1}`)}
                      onChange={(e) => {
                        const itemId = `item${index + 1}`;
                        if (e.target.checked) {
                          setSelectedItems([...selectedItems, itemId]);
                        } else {
                          setSelectedItems(selectedItems.filter((id) => id !== itemId));
                        }
                      }}
                    />
                  }
                />
              ))}
            </FlowList>
          </Stack>
        </Surface>
      </DemoSection>

      <DemoSection title="View Controls" description="Toolbar with view mode toggles and search.">
        <Surface variant="primary" padding="container">
          <FlowToolbar>
            <FlowToolbarGroup>
              <FlowButton
                variant={viewMode === "list" ? "high" : "low"}
                onClick={() => setViewMode("list")}
              >
                List
              </FlowButton>
              <FlowButton
                variant={viewMode === "grid" ? "high" : "low"}
                onClick={() => setViewMode("grid")}
              >
                Grid
              </FlowButton>
              <FlowButton
                variant={viewMode === "table" ? "high" : "low"}
                onClick={() => setViewMode("table")}
              >
                Table
              </FlowButton>
            </FlowToolbarGroup>
            <FlowToolbarDivider />
            <FlowToolbarGroup>
              <FlowTextInput placeholder="Search..." size="sm" style={{ width: "200px" }} />
            </FlowToolbarGroup>
            <FlowToolbarSpacer />
            <FlowToolbarGroup>
              <FlowIconButton icon="filter" />
              <FlowIconButton icon="sort-asc" />
              <FlowIconButton icon="download" />
            </FlowToolbarGroup>
          </FlowToolbar>
        </Surface>
      </DemoSection>

      <DemoSection title="Compact Toolbar" description="Minimal toolbar for constrained spaces.">
        <Surface variant="secondary" padding="control">
          <FlowToolbar>
            <FlowIconButton icon="plus" />
            <FlowIconButton icon="edit" />
            <FlowIconButton icon="trash" />
            <FlowToolbarSpacer />
            <FlowIconButton icon="more-vertical" />
          </FlowToolbar>
        </Surface>
      </DemoSection>
    </Stack>
  );
}

function ToolbarUseCasesDemo() {
  const [activeTab, setActiveTab] = useState<string>("editor");

  const examples: Record<string, ReactNode> = {
    editor: (
      <Surface variant="primary" padding="container">
        <Stack gap={3}>
          <Text role="heading-m">Document Editor</Text>
          <FlowToolbar>
            <FlowToolbarGroup>
              <FlowButton variant="high">Save</FlowButton>
              <FlowButton variant="medium">Save As</FlowButton>
            </FlowToolbarGroup>
            <FlowToolbarDivider />
            <FlowToolbarGroup>
              <FlowIconButton icon="bold" />
              <FlowIconButton icon="italic" />
              <FlowIconButton icon="underline" />
            </FlowToolbarGroup>
            <FlowToolbarDivider />
            <FlowToolbarGroup>
              <FlowIconButton icon="align-left" />
              <FlowIconButton icon="align-center" />
              <FlowIconButton icon="align-right" />
            </FlowToolbarGroup>
            <FlowToolbarDivider />
            <FlowToolbarGroup>
              <FlowIconButton icon="image" />
              <FlowIconButton icon="link" />
              <FlowIconButton icon="code" />
            </FlowToolbarGroup>
            <FlowToolbarSpacer />
            <FlowToolbarGroup>
              <FlowIconButton icon="undo" />
              <FlowIconButton icon="redo" />
            </FlowToolbarGroup>
          </FlowToolbar>
          <Surface variant="secondary" padding="container" style={{ minHeight: "200px" }}>
            <Text role="paragraph-s" color="secondary">
              Rich text editor content area...
            </Text>
          </Surface>
        </Stack>
      </Surface>
    ),
    email: (
      <Surface variant="primary" padding="container">
        <Stack gap={3}>
          <Text role="heading-m">Inbox</Text>
          <FlowToolbar>
            <FlowToolbarGroup>
              <FlowButton variant="high">Compose</FlowButton>
            </FlowToolbarGroup>
            <FlowToolbarDivider />
            <FlowToolbarGroup>
              <FlowIconButton icon="refresh" />
              <FlowIconButton icon="archive" />
              <FlowIconButton icon="trash" />
            </FlowToolbarGroup>
            <FlowToolbarDivider />
            <FlowToolbarGroup>
              <FlowIconButton icon="tag" />
              <FlowIconButton icon="flag" />
            </FlowToolbarGroup>
            <FlowToolbarSpacer />
            <FlowToolbarGroup>
              <FlowTextInput placeholder="Search emails..." size="sm" style={{ width: "250px" }} />
            </FlowToolbarGroup>
          </FlowToolbar>
          <FlowList dividers>
            {["Welcome Email", "Project Update", "Meeting Reminder"].map((email) => (
              <FlowListItem
                key={email}
                primary={<Text role="paragraph-s">{email}</Text>}
                secondary={
                  <Text role="caption" color="tertiary">
                    2 hours ago
                  </Text>
                }
              />
            ))}
          </FlowList>
        </Stack>
      </Surface>
    ),
    dashboard: (
      <Surface variant="primary" padding="container">
        <Stack gap={3}>
          <Text role="heading-m">Analytics Dashboard</Text>
          <FlowToolbar>
            <FlowToolbarGroup>
              <FlowButton variant="high">Add Widget</FlowButton>
            </FlowToolbarGroup>
            <FlowToolbarDivider />
            <FlowToolbarGroup>
              <FlowIconButton icon="calendar" />
              <FlowIconButton icon="filter" />
            </FlowToolbarGroup>
            <FlowToolbarDivider />
            <FlowToolbarGroup>
              <FlowButton variant="low">Last 7 days</FlowButton>
              <FlowButton variant="low">Last 30 days</FlowButton>
              <FlowButton variant="low">Last 90 days</FlowButton>
            </FlowToolbarGroup>
            <FlowToolbarSpacer />
            <FlowToolbarGroup>
              <FlowIconButton icon="download" />
              <FlowIconButton icon="share" />
              <FlowIconButton icon="settings" />
            </FlowToolbarGroup>
          </FlowToolbar>
          <Grid minItemWidth="200px" gap="control">
            {["Revenue", "Users", "Conversion"].map((metric) => (
              <Surface key={metric} variant="secondary" padding="container">
                <Text role="label-m">{metric}</Text>
                <Text role="heading-l">$12,345</Text>
              </Surface>
            ))}
          </Grid>
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
            variant={activeTab === key ? "accent" : "default"}
            onClick={() => setActiveTab(key)}
          >
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </FlowChip>
        ))}
      </Inline>
      {examples[activeTab]}
    </Stack>
  );
}

const toolbarEntry: PatternEntry = {
  category: "layout-patterns",
  spec: {
    name: "Toolbar",
    purpose:
      "Horizontal bar of contextual actions. Composes buttons, toggles, dividers, and overflow menus into an opinioned action bar.",
    platform: "desktop",
    composesL3: ["FlowButton", "FlowIconButton", "FlowToggleButton", "FlowMenu", "Divider"],
    orchestrates: [
      "Action grouping (FlowToolbarGroup)",
      "Visual separation (FlowToolbarDivider)",
      "Trailing alignment (FlowToolbarSpacer)",
      "Overflow menu for excess actions",
      "Contextual mode on selection",
    ],
  },
  composition: [
    { component: "FlowButton", role: "Primary actions", tokens: [] },
    { component: "FlowIconButton", role: "Icon-only actions", tokens: [] },
    { component: "FlowToggleButton", role: "Toggleable actions", tokens: [] },
    { component: "FlowMenu", role: "Overflow actions dropdown", tokens: [] },
    { component: "Divider", role: "Visual separators", tokens: ["--sys-energy-border-default"] },
  ],
  demos: {
    overview: ToolbarOverviewDemo,
    useCases: ToolbarUseCasesDemo,
  },
  developer: {
    reactImport: `import { FlowToolbar, FlowToolbarDivider, FlowToolbarGroup, FlowToolbarSpacer } from "@flow/design-system";`,
    reactUsage: `<FlowToolbar>
  <FlowToolbarGroup>
    <FlowButton variant="high">Save</FlowButton>
    <FlowButton variant="medium">Save As</FlowButton>
  </FlowToolbarGroup>
  <FlowToolbarDivider />
  <FlowToolbarGroup>
    <FlowIconButton icon="undo" />
    <FlowIconButton icon="redo" />
  </FlowToolbarGroup>
  <FlowToolbarSpacer />
  <FlowToolbarGroup>
    <FlowIconButton icon="settings" />
  </FlowToolbarGroup>
</FlowToolbar>`,
    flutterImport: `import 'package:flow/patterns/toolbar.dart';`,
    flutterUsage: `FlowToolbar(
  children: [
    FlowToolbarGroup(
      children: [
        FlowButton(emphasis: ButtonEmphasis.high, child: Text('Save')),
        FlowButton(emphasis: ButtonEmphasis.medium, child: Text('Save As')),
      ],
    ),
    FlowToolbarDivider(),
    FlowToolbarGroup(
      children: [
        FlowIconButton(icon: 'undo'),
        FlowIconButton(icon: 'redo'),
      ],
    ),
    FlowToolbarSpacer(),
    FlowToolbarGroup(
      children: [
        FlowIconButton(icon: 'settings'),
      ],
    ),
  ],
)`,
    props: [
      {
        name: "children",
        type: "ReactNode",
        required: true,
        description: "Toolbar actions and separators.",
      },
    ],
    guidelines: [
      { type: "do", text: "Group related actions together." },
      { type: "do", text: "Use dividers to separate action groups." },
      { type: "do", text: "Use spacer for right-aligned actions." },
      { type: "dont", text: "Don't overcrowd with too many actions." },
      { type: "dont", text: "Don't mix primary and secondary actions in same group." },
    ],
  },
};

// ── FlowSwipeActions ──

function SwipeActionsOverviewDemo() {
  const [actionLog, setActionLog] = useState<string>("");

  const items = [
    { id: "1", title: "Design System Update", desc: "Review new token changes" },
    { id: "2", title: "Build Pipeline", desc: "Fix deployment script" },
    { id: "3", title: "Documentation", desc: "Update component API docs" },
  ];

  const handleAction = (action: string, itemId: string) => {
    setActionLog(`${action} - Item ${itemId}`);
  };

  return (
    <Stack gap={6}>
      <DemoSection
        title="Basic Swipe Actions"
        description="Swipe list items to reveal actions. Works on both left and right sides."
      >
        <DemoGroup>
          <Stack gap={2}>
            {items.map((item) => (
              <FlowSwipeActions
                key={item.id}
                leftActions={[{ label: "Edit", onClick: () => handleAction("Edit", item.id) }]}
                rightActions={[{ label: "Delete", onClick: () => handleAction("Delete", item.id) }]}
              >
                <Surface variant="primary" padding="container" style={{ width: "100%" }}>
                  <Stack gap={1}>
                    <Text role="label-s">{item.title}</Text>
                    <Text role="caption" color="secondary">
                      {item.desc}
                    </Text>
                  </Stack>
                </Surface>
              </FlowSwipeActions>
            ))}
          </Stack>
        </DemoGroup>
      </DemoSection>
      {actionLog && (
        <Surface variant="secondary" padding="container">
          <Text role="caption" color="secondary">
            Last action: {actionLog}
          </Text>
        </Surface>
      )}
    </Stack>
  );
}

function SwipeActionsUseCasesDemo() {
  const [activeCase, setActiveCase] = useState<string>("emails");
  const [lastAction, setLastAction] = useState<string>("");

  const cases: Record<string, { items: { id: string; title: string; desc: string; icon: string }[] }> = {
    emails: {
      items: [
        { id: "1", title: "Meeting Agenda", desc: "from: team@example.com", icon: "mail" },
        { id: "2", title: "Project Discussion", desc: "from: manager@example.com", icon: "mail" },
        { id: "3", title: "Review Request", desc: "from: designer@example.com", icon: "mail" },
      ],
    },
    tasks: {
      items: [
        { id: "1", title: "Complete design specs", desc: "Due today at 5pm", icon: "check-circle" },
        { id: "2", title: "Review pull requests", desc: "5 pending", icon: "git-branch" },
        { id: "3", title: "Update documentation", desc: "High priority", icon: "file-text" },
      ],
    },
  };

  const handleAction = (action: string, item: { title: string }) => {
    setLastAction(`${action}: ${item.title}`);
  };

  return (
    <Stack gap={4}>
      <Inline gap={2} wrap>
        {Object.keys(cases).map((key) => (
          <FlowChip
            key={key}
            variant={activeCase === key ? "accent" : "default"}
            onClick={() => setActiveCase(key)}
          >
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </FlowChip>
        ))}
      </Inline>

      <DemoSection
        title={activeCase === "emails" ? "Email Management" : "Task Management"}
        description={
          activeCase === "emails"
            ? "Swipe to archive, delete, or flag emails"
            : "Swipe to complete, edit, or delete tasks"
        }
      >
        <DemoGroup>
          <Stack gap={2}>
            {cases[activeCase].items.map((item) => (
              <FlowSwipeActions
                key={item.id}
                leftActions={[{ label: "Archive", onClick: () => handleAction("Archive", item) }]}
                rightActions={[
                  {
                    label: "Delete",
                    variant: "danger",
                    onClick: () => handleAction("Delete", item),
                  },
                ]}
              >
                <Surface variant="primary" padding="container" style={{ width: "100%" }}>
                  <Inline gap={2}>
                    <FlowIcon name={item.icon} size="md" />
                    <Stack gap={1} style={{ flex: 1 }}>
                      <Text role="label-s">{item.title}</Text>
                      <Text role="caption" color="secondary">
                        {item.desc}
                      </Text>
                    </Stack>
                  </Inline>
                </Surface>
              </FlowSwipeActions>
            ))}
          </Stack>
        </DemoGroup>
      </DemoSection>
      {lastAction && (
        <Surface variant="secondary" padding="container">
          <Text role="caption" color="secondary">
            {lastAction}
          </Text>
        </Surface>
      )}
    </Stack>
  );
}

const swipeActionsEntry: PatternEntry = {
  category: "layout-patterns",
  spec: {
    name: "Swipe Actions",
    purpose:
      "Swipe-to-reveal actions on list items. Reveals action buttons behind content on horizontal swipe gesture.",
    platform: "mobile",
    composesL3: ["FlowButton", "Surface"],
    orchestrates: [
      "Horizontal swipe gesture detection",
      "Left/right action reveal",
      "Full swipe to action trigger",
      "Snap-back animation",
      "Keyboard alternative",
    ],
  },
  composition: [
    { component: "FlowButton", role: "Revealed action buttons", tokens: [] },
    {
      component: "Surface",
      role: "Swipeable content container",
      tokens: ["--sys-energy-surface-primary"],
    },
  ],
  demos: {
    overview: SwipeActionsOverviewDemo,
    useCases: SwipeActionsUseCasesDemo,
  },
  developer: {
    reactImport: `import { FlowSwipeActions } from "@flow/design-system";`,
    reactUsage: `<FlowSwipeActions
  leftActions={[{ label: "Edit", onClick: handleEdit }]}
  rightActions={[{ label: "Delete", onClick: handleDelete }]}
>
  <ListItem>Item content</ListItem>
</FlowSwipeActions>`,
    flutterImport: `import 'package:flow/patterns/swipe_actions.dart';`,
    flutterUsage: `FlowSwipeActions(
  leftActions: [SwipeAction(label: 'Edit', onPressed: handleEdit)],
  rightActions: [SwipeAction(label: 'Delete', onPressed: handleDelete)],
  child: ListItem(child: Text('Item content')),
)`,
    props: [
      { name: "children", type: "ReactNode", required: true, description: "Swipeable content." },
      {
        name: "leftActions",
        type: "SwipeAction[]",
        required: false,
        description: "Actions revealed on left swipe.",
      },
      {
        name: "rightActions",
        type: "SwipeAction[]",
        required: false,
        description: "Actions revealed on right swipe.",
      },
    ],
    guidelines: [
      { type: "do", text: "Use for quick actions on list items." },
      { type: "do", text: "Limit to 1-2 actions per side." },
      { type: "dont", text: "Don't use on desktop." },
    ],
  },
};

// ── FlowShortcutGrid (formerly FlowQuickActions grid) ──

function QuickActionsOverviewDemo() {
  const [executed, setExecuted] = useState<string>("");

  const actions = [
    { icon: "plus", label: "Create", onClick: () => setExecuted("Create tapped") },
    { icon: "search", label: "Search", onClick: () => setExecuted("Search tapped") },
    { icon: "settings", label: "Settings", onClick: () => setExecuted("Settings tapped") },
    { icon: "help", label: "Help", onClick: () => setExecuted("Help tapped") },
  ];

  return (
    <Stack gap={6}>
      <DemoSection
        title="Quick Actions Grid"
        description="Large touch targets arranged in a responsive grid for mobile home screens."
      >
        <DemoGroup>
          <Surface variant="secondary" padding="container">
            <FlowShortcutGrid actions={actions} columns={4} />
          </Surface>
        </DemoGroup>
      </DemoSection>
      {executed && (
        <Surface variant="secondary" padding="container">
          <Text role="caption" color="secondary">
            {executed}
          </Text>
        </Surface>
      )}
    </Stack>
  );
}

function QuickActionsUseCasesDemo() {
  const [activeCase, setActiveCase] = useState<string>("home");
  const [executed, setExecuted] = useState<string>("");

  const cases: Record<string, { title: string; actions: { icon: string; label: string; onClick: () => void }[] }> = {
    home: {
      title: "Home Screen",
      actions: [
        { icon: "plus", label: "New", onClick: () => setExecuted("New document created") },
        { icon: "folder", label: "Open", onClick: () => setExecuted("Open file dialog") },
        { icon: "share", label: "Share", onClick: () => setExecuted("Share sheet opened") },
        { icon: "download", label: "Downloads", onClick: () => setExecuted("Downloads opened") },
      ],
    },
    productivity: {
      title: "Productivity",
      actions: [
        { icon: "calendar", label: "Schedule", onClick: () => setExecuted("Calendar opened") },
        { icon: "list", label: "Tasks", onClick: () => setExecuted("Task list opened") },
        { icon: "clock", label: "Timer", onClick: () => setExecuted("Timer started") },
        { icon: "note", label: "Notes", onClick: () => setExecuted("New note created") },
      ],
    },
  };

  const current = cases[activeCase];

  return (
    <Stack gap={4}>
      <Inline gap={2} wrap>
        {Object.keys(cases).map((key) => (
          <FlowChip
            key={key}
            variant={activeCase === key ? "accent" : "default"}
            onClick={() => setActiveCase(key)}
          >
            {cases[key].title}
          </FlowChip>
        ))}
      </Inline>

      <DemoSection title={current.title} description="Tap any action to execute">
        <DemoGroup>
          <Surface variant="secondary" padding="container">
            <FlowShortcutGrid actions={current.actions} columns={4} />
          </Surface>
        </DemoGroup>
      </DemoSection>
      {executed && (
        <Surface variant="secondary" padding="container">
          <Text role="caption" color="secondary">
            {executed}
          </Text>
        </Surface>
      )}
    </Stack>
  );
}

const quickActionsEntry: PatternEntry = {
  category: "layout-patterns",
  spec: {
    name: "Quick Actions Grid",
    purpose:
      "Mobile shortcut grid with large touch targets. Displays icon + label action buttons for home screens.",
    platform: "mobile",
    composesL3: ["FlowButton", "FlowIcon", "Surface", "Grid"],
    orchestrates: [
      "Grid layout calculation (3-4 columns)",
      "Min 44px touch targets",
      "Press feedback animation",
      "Per-action disable state",
    ],
  },
  composition: [
    { component: "FlowButton", role: "Action buttons with icons", tokens: [] },
    { component: "FlowIcon", role: "Action icons", tokens: ["--sys-energy-text-primary"] },
    { component: "Surface", role: "Grid container", tokens: ["--sys-energy-surface-primary"] },
    {
      component: "Grid",
      role: "Responsive grid layout",
      tokens: ["--sys-frame-gap-component", "--sys-frame-padding-*"],
    },
  ],
  demos: {
    overview: QuickActionsOverviewDemo,
    useCases: QuickActionsUseCasesDemo,
  },
  developer: {
    reactImport: `import { FlowShortcutGrid } from "@flow/design-system";`,
    reactUsage: `<FlowShortcutGrid
  actions={[
    { icon: "plus", label: "Add", onClick: handleAdd },
    { icon: "search", label: "Find", onClick: handleSearch },
  ]}
/>`,
    flutterImport: `import 'package:flow/patterns/quick_actions.dart';`,
    flutterUsage: `FlowShortcutGrid(
  actions: [
    QuickAction(icon: 'plus', label: 'Add', onPressed: handleAdd),
    QuickAction(icon: 'search', label: 'Find', onPressed: handleSearch),
  ],
)`,
    props: [
      {
        name: "actions",
        type: "QuickAction[]",
        required: true,
        description: "Array of action objects with icon, label, onClick.",
      },
    ],
    guidelines: [
      { type: "do", text: "Use for mobile home screens." },
      { type: "do", text: "Ensure 44px minimum touch targets." },
      { type: "dont", text: "Don't use on desktop." },
    ],
  },
};

// ── Exported registry slice ──
export const layoutPatterns: Record<string, PatternEntry> = {
  "layout-patterns/form-section": formSectionEntry,
  "layout-patterns/toolbar": toolbarEntry,
  "layout-patterns/swipe-actions": swipeActionsEntry,
  "layout-patterns/quick-actions-grid": quickActionsEntry,
};

/**
 * FLOW - Layout Domain Demos
 * Demo functions for layout components (FlowAccordion, FlowSplitPane, FlowFieldset)
 */

/**
 * Demo-specific form width constraint.
 * Accordion and form layouts are naturally bounded in production.
 * TODO: Replace with LayoutGrid.Item span constraints before Gold.
 */
const DEMO_FORM_MAX_WIDTH = "600px";

import { useState } from "react";

import {
  FlowAccordion, FlowButton, FlowCheckbox, FlowFieldset,
  FlowSplitPane, FlowSwitch, FlowTextInput, Stack, Text,
} from "../../../../lib";
import { DemoGroup, DemoSection } from "../../../components/demo-helpers";
import { Callout } from "../../../components/doc-primitives";
import { SIZES } from "../types";
import { EasingComparisonDemo } from "../../../components/motion-demo-section";

export function FlowAccordionOverview() {
  const [expanded, setExpanded] = useState<string | null>("panel-1");

  return (
    <Stack gap="subsection">
      <DemoSection
        title="Basic Usage"
        description="Expandable panels with header and content. Click to expand/collapse. Only one panel open at a time (accordion behavior)."
      >
        <DemoGroup>
          <Stack gap={2} style={{ maxWidth: DEMO_FORM_MAX_WIDTH }}>
            <FlowAccordion
              title="What is FLOW?"
              expanded={expanded === "panel-1"}
              onChange={() => setExpanded(expanded === "panel-1" ? null : "panel-1")}
            >
              <Text>
                FLOW is a cross-platform design system built for React and Flutter, featuring a
                5-layer architecture (Tokens → Templates) with density-aware components and
                comprehensive accessibility.
              </Text>
            </FlowAccordion>

            <FlowAccordion
              title="How does density work?"
              expanded={expanded === "panel-2"}
              onChange={() => setExpanded(expanded === "panel-2" ? null : "panel-2")}
            >
              <Text>
                FLOW supports three density levels (compact, regular, comfortable) that adjust
                spacing, font sizes, and component dimensions via CSS token overrides. Change
                density globally or per-component.
              </Text>
            </FlowAccordion>

            <FlowAccordion
              title="What platforms are supported?"
              expanded={expanded === "panel-3"}
              onChange={() => setExpanded(expanded === "panel-3" ? null : "panel-3")}
            >
              <Text>
                FLOW components are categorized as shared (React + Flutter), desktop-only, or
                mobile-only. Most components are shared, with platform-specific variants where
                interaction patterns differ.
              </Text>
            </FlowAccordion>
          </Stack>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Sizes"
        description="Four size variants: sm, md (default), lg, xl. Controls header height and font size."
      >
        <DemoGroup>
          <Stack gap={2} style={{ maxWidth: DEMO_FORM_MAX_WIDTH }}>
            {SIZES.map((size) => (
              <FlowAccordion key={size} title={`Size ${size.toUpperCase()}`} size={size}>
                <Text>Content for {size} accordion. The header and content scale with size.</Text>
              </FlowAccordion>
            ))}
          </Stack>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Disabled State"
        description="Disabled accordions cannot be expanded. The header is visually muted and non-interactive."
      >
        <DemoGroup>
          <Stack gap={2} style={{ maxWidth: DEMO_FORM_MAX_WIDTH }}>
            <FlowAccordion title="Active accordion">
              <Text>This accordion can be expanded and collapsed.</Text>
            </FlowAccordion>
            <FlowAccordion title="Disabled accordion" disabled>
              <Text>This content is not accessible.</Text>
            </FlowAccordion>
          </Stack>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Rich Content"
        description="Accordion content accepts any ReactNode — text, images, lists, nested components."
      >
        <DemoGroup>
          <Stack gap={2} style={{ maxWidth: DEMO_FORM_MAX_WIDTH }}>
            <FlowAccordion title="Documentation">
              <Stack gap={2}>
                <Text role="heading-s">Getting Started</Text>
                <Text>Follow these steps to integrate FLOW into your project:</Text>
                <ol style={{ paddingLeft: "var(--ref-frame-space-6)", margin: 0 }}>
                  <li>
                    <Text>Install the package via npm or yarn</Text>
                  </li>
                  <li>
                    <Text>Import components and primitives</Text>
                  </li>
                  <li>
                    <Text>Configure your theme tokens</Text>
                  </li>
                  <li>
                    <Text>Start building!</Text>
                  </li>
                </ol>
              </Stack>
            </FlowAccordion>

            <FlowAccordion title="Features">
              <Stack gap={2}>
                <Text>• Cross-platform (React + Flutter)</Text>
                <Text>• Density-aware components</Text>
                <Text>• Comprehensive accessibility</Text>
                <Text>• Token-driven theming</Text>
                <Text>• 21 L3 components + 16 L4 patterns</Text>
              </Stack>
            </FlowAccordion>
          </Stack>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Accessibility"
        description="Accordions use semantic <button> for headers with aria-expanded and aria-controls. Content panels get aria-labelledby and role='region'."
      >
        <DemoGroup>
          <Callout intent="info">
            FlowAccordion uses semantic HTML with proper ARIA: header is a &lt;button&gt; with
            aria-expanded reflecting state, content panel gets aria-labelledby linking to header,
            and role=&apos;region&apos; for landmark navigation. Keyboard accessible via Tab + Enter/Space.
          </Callout>
        </DemoGroup>
      </DemoSection>

      <EasingComparisonDemo />
    </Stack>
  );
}

export function FlowAccordionVariants() {
  return (
    <Stack gap="component-lg">
      <DemoSection title="All Sizes" description="Size comparison across all variants.">
        <DemoGroup>
          <Stack gap={2} style={{ maxWidth: DEMO_FORM_MAX_WIDTH }}>
            {SIZES.map((size) => (
              <FlowAccordion
                key={size}
                title={`${size.toUpperCase()} accordion`}
                size={size}
                defaultExpanded
              >
                <Text>Content for {size} size variant.</Text>
              </FlowAccordion>
            ))}
          </Stack>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="States"
        description="Different interaction states: default, expanded, disabled."
      >
        <DemoGroup>
          <Stack gap={2} style={{ maxWidth: DEMO_FORM_MAX_WIDTH }}>
            <FlowAccordion title="Collapsed (default)">
              <Text>This panel is collapsed by default.</Text>
            </FlowAccordion>
            <FlowAccordion title="Expanded" defaultExpanded>
              <Text>This panel is expanded by default.</Text>
            </FlowAccordion>
            <FlowAccordion title="Disabled" disabled>
              <Text>This panel cannot be expanded.</Text>
            </FlowAccordion>
          </Stack>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowSplitPane Demos
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const SPLIT_PANE_HEIGHT = 300;

function PaneContent({ title, text }: { title: string; text: string }) {
  return (
    <div style={{ padding: "var(--ref-frame-space-4)" }}>
      <Text role="heading-s">{title}</Text>
      <Text color="secondary" style={{ marginTop: "var(--ref-frame-space-2)" }}>
        {text}
      </Text>
    </div>
  );
}

export function FlowSplitPaneOverview() {
  return (
    <Stack gap="subsection">
      <DemoSection
        title="Basic Horizontal Split"
        description="Side-by-side resizable panels. Drag the separator or use arrow keys to resize."
      >
        <DemoGroup>
          <div style={{ height: SPLIT_PANE_HEIGHT }}>
            <FlowSplitPane
              first={
                <PaneContent
                  title="Left Pane"
                  text="This is the leading pane. Drag the separator to resize, or focus it and use arrow keys."
                />
              }
              second={
                <PaneContent
                  title="Right Pane"
                  text="This is the trailing pane. It fills the remaining space automatically."
                />
              }
            />
          </div>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Vertical Split"
        description="Top-bottom stacked panels with vertical separator."
      >
        <DemoGroup>
          <div style={{ height: SPLIT_PANE_HEIGHT }}>
            <FlowSplitPane
              direction="vertical"
              first={
                <PaneContent
                  title="Top Pane"
                  text="Vertical split places panes in a top-bottom stack."
                />
              }
              second={
                <PaneContent
                  title="Bottom Pane"
                  text="The separator becomes horizontal in vertical mode."
                />
              }
            />
          </div>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Custom Split Ratios"
        description="Control the initial split percentage with defaultSplit. 70/30, 30/70, and 80/20 shown below."
      >
        <DemoGroup>
          <Stack gap={3}>
            <div style={{ height: 200 }}>
              <FlowSplitPane
                defaultSplit={70}
                first={
                  <PaneContent title="70%" text="Main content area gets more space." />
                }
                second={
                  <PaneContent title="30%" text="Sidebar." />
                }
              />
            </div>
            <div style={{ height: 200 }}>
              <FlowSplitPane
                defaultSplit={30}
                first={
                  <PaneContent title="30%" text="Navigation." />
                }
                second={
                  <PaneContent title="70%" text="Main content area." />
                }
              />
            </div>
          </Stack>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="With Rich Content"
        description="Split panes accept any ReactNode content — text blocks, lists, components."
      >
        <DemoGroup>
          <div style={{ height: SPLIT_PANE_HEIGHT }}>
            <FlowSplitPane
              defaultSplit={40}
              first={
                <div style={{ padding: "var(--ref-frame-space-4)" }}>
                  <Stack gap={2}>
                    <Text role="heading-s">Navigation</Text>
                    <Text>• Dashboard</Text>
                    <Text>• Settings</Text>
                    <Text>• Profile</Text>
                    <Text>• Reports</Text>
                    <Text>• Help</Text>
                  </Stack>
                </div>
              }
              second={
                <div style={{ padding: "var(--ref-frame-space-4)" }}>
                  <Stack gap={2}>
                    <Text role="heading-s">Dashboard</Text>
                    <Text>
                      Welcome to your dashboard. This area shows your main content and can
                      be resized by dragging the separator. Use keyboard arrow keys when the
                      separator is focused for precise control.
                    </Text>
                    <Text color="secondary">
                      Tip: Hold Shift while pressing arrow keys to resize in 10% increments.
                    </Text>
                  </Stack>
                </div>
              }
            />
          </div>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Accessibility"
        description="The separator uses role='separator' with full ARIA attributes and keyboard support."
      >
        <DemoGroup>
          <Callout intent="info">
            FlowSplitPane separator uses role=&apos;separator&apos; with aria-orientation,
            aria-valuenow, aria-valuemin, and aria-valuemax. Keyboard: Arrow keys resize by
            2%, Shift+Arrow by 10%, Home/End jump to min/max. Focus ring highlights the
            separator for keyboard users.
          </Callout>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

export function FlowSplitPaneVariants() {
  return (
    <Stack gap="component-lg">
      <DemoSection
        title="Horizontal vs Vertical"
        description="Comparison of both split orientations."
      >
        <DemoGroup>
          <Stack gap={3}>
            <div>
              <Text role="label-l" style={{ marginBottom: "var(--ref-frame-space-2)" }}>
                Horizontal (default)
              </Text>
              <div style={{ height: 200 }}>
                <FlowSplitPane
                  first={<PaneContent title="Left" text="Side-by-side layout." />}
                  second={<PaneContent title="Right" text="Drag to resize." />}
                />
              </div>
            </div>
            <div>
              <Text role="label-l" style={{ marginBottom: "var(--ref-frame-space-2)" }}>
                Vertical
              </Text>
              <div style={{ height: 200 }}>
                <FlowSplitPane
                  direction="vertical"
                  first={<PaneContent title="Top" text="Stacked layout." />}
                  second={<PaneContent title="Bottom" text="Drag to resize." />}
                />
              </div>
            </div>
          </Stack>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="States"
        description="Default resizable state and disabled (fixed) state."
      >
        <DemoGroup>
          <Stack gap={3}>
            <div>
              <Text role="label-l" style={{ marginBottom: "var(--ref-frame-space-2)" }}>
                Resizable (default)
              </Text>
              <div style={{ height: 200 }}>
                <FlowSplitPane
                  first={<PaneContent title="Left" text="Drag separator to resize." />}
                  second={<PaneContent title="Right" text="Interactive separator." />}
                />
              </div>
            </div>
            <div>
              <Text role="label-l" style={{ marginBottom: "var(--ref-frame-space-2)" }}>
                Disabled (non-resizable)
              </Text>
              <div style={{ height: 200 }}>
                <FlowSplitPane
                  disabled
                  defaultSplit={60}
                  first={<PaneContent title="Left (60%)" text="Fixed — cannot resize." />}
                  second={<PaneContent title="Right (40%)" text="Separator is non-interactive." />}
                />
              </div>
            </div>
          </Stack>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowFieldset Demos
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function FlowFieldsetOverview() {
  return (
    <Stack gap="subsection">
      <DemoSection
        title="Basic Fieldset"
        description="Semantic grouping of related form controls with a legend label."
      >
        <DemoGroup>
          <div style={{ maxWidth: DEMO_FORM_MAX_WIDTH }}>
            <FlowFieldset legend="Personal Information">
              <FlowTextInput label="First Name" />
              <FlowTextInput label="Last Name" />
              <FlowTextInput label="Email" type="email" />
            </FlowFieldset>
          </div>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="With Description"
        description="Optional description text below the legend provides extra context."
      >
        <DemoGroup>
          <div style={{ maxWidth: DEMO_FORM_MAX_WIDTH }}>
            <FlowFieldset
              legend="Notification Preferences"
              description="Choose how you want to receive notifications from us."
            >
              <FlowCheckbox label="Email notifications" />
              <FlowCheckbox label="Push notifications" />
              <FlowSwitch label="Marketing emails" />
            </FlowFieldset>
          </div>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Disabled Fieldset"
        description="Disabled state propagates to all child form controls via native <fieldset disabled>."
      >
        <DemoGroup>
          <div style={{ maxWidth: DEMO_FORM_MAX_WIDTH }}>
            <FlowFieldset legend="Account Settings" disabled>
              <FlowTextInput label="Username" />
              <FlowTextInput label="Display Name" />
              <FlowButton variant="medium">Save Changes</FlowButton>
            </FlowFieldset>
          </div>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Error State"
        description="Error state highlights the fieldset border and legend in red."
      >
        <DemoGroup>
          <div style={{ maxWidth: DEMO_FORM_MAX_WIDTH }}>
            <FlowFieldset legend="Payment Details" error>
              <FlowTextInput label="Card Number" />
              <FlowTextInput label="Expiry Date" />
              <FlowTextInput label="CVV" />
            </FlowFieldset>
          </div>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Nested Fieldsets"
        description="Fieldsets can be nested to create hierarchical form sections."
      >
        <DemoGroup>
          <div style={{ maxWidth: DEMO_FORM_MAX_WIDTH }}>
            <FlowFieldset legend="Shipping Address">
              <FlowTextInput label="Street Address" />
              <FlowFieldset legend="City & State">
                <FlowTextInput label="City" />
                <FlowTextInput label="State" />
                <FlowTextInput label="ZIP Code" />
              </FlowFieldset>
            </FlowFieldset>
          </div>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="With Form Controls"
        description="FlowFieldset works with any Flow form component — inputs, checkboxes, switches, buttons."
      >
        <DemoGroup>
          <div style={{ maxWidth: DEMO_FORM_MAX_WIDTH }}>
            <FlowFieldset
              legend="Create Account"
              description="Fill in the details below to create your account."
            >
              <FlowTextInput label="Full Name" />
              <FlowTextInput label="Email" type="email" />
              <FlowTextInput label="Password" type="password" />
              <FlowCheckbox label="I agree to the terms and conditions" />
              <FlowButton variant="high">Create Account</FlowButton>
            </FlowFieldset>
          </div>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Accessibility"
        description="FlowFieldset uses native <fieldset> and <legend> for semantic form grouping."
      >
        <DemoGroup>
          <Callout intent="info">
            FlowFieldset uses native &lt;fieldset&gt; and &lt;legend&gt; HTML elements.
            Screen readers announce the legend when entering the group. The disabled prop
            on &lt;fieldset&gt; natively propagates to all child form controls — no
            additional state management is needed. Error state is conveyed via data-state
            attributes for styling hooks.
          </Callout>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

export function FlowFieldsetVariants() {
  return (
    <Stack gap="component-lg">
      <DemoSection
        title="All States"
        description="Comparison of default, disabled, and error states."
      >
        <DemoGroup>
          <Stack gap={3} style={{ maxWidth: DEMO_FORM_MAX_WIDTH }}>
            <FlowFieldset legend="Default State">
              <FlowTextInput label="Name" />
              <FlowTextInput label="Email" type="email" />
            </FlowFieldset>

            <FlowFieldset legend="Disabled State" disabled>
              <FlowTextInput label="Name" />
              <FlowTextInput label="Email" type="email" />
            </FlowFieldset>

            <FlowFieldset legend="Error State" error>
              <FlowTextInput label="Name" />
              <FlowTextInput label="Email" type="email" />
            </FlowFieldset>
          </Stack>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="With and Without Description"
        description="Fieldset with and without optional description text."
      >
        <DemoGroup>
          <Stack gap={3} style={{ maxWidth: DEMO_FORM_MAX_WIDTH }}>
            <FlowFieldset legend="Without Description">
              <FlowTextInput label="Field A" />
              <FlowTextInput label="Field B" />
            </FlowFieldset>

            <FlowFieldset
              legend="With Description"
              description="This fieldset includes a helper description below the legend."
            >
              <FlowTextInput label="Field A" />
              <FlowTextInput label="Field B" />
            </FlowFieldset>
          </Stack>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

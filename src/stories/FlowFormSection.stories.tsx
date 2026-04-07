import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlowFormSection } from "../app/components/patterns";

const meta = {
  title: "Patterns/FlowFormSection",
  component: FlowFormSection,
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
    collapsible: { control: "boolean" },
    defaultOpen: { control: "boolean" },
  },
} satisfies Meta<typeof FlowFormSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Personal Information",
    description: "Enter your basic details below.",
    children: (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--ref-frame-space-3)" }}>
        <input placeholder="First name" style={{ padding: "var(--sys-frame-padding-control)", border: "var(--sys-frame-border-thin) solid var(--sys-energy-border-default)", borderRadius: "var(--sys-frame-radius-sm)" }} />
        <input placeholder="Last name" style={{ padding: "var(--sys-frame-padding-control)", border: "var(--sys-frame-border-thin) solid var(--sys-energy-border-default)", borderRadius: "var(--sys-frame-radius-sm)" }} />
        <input placeholder="Email" type="email" style={{ padding: "var(--sys-frame-padding-control)", border: "var(--sys-frame-border-thin) solid var(--sys-energy-border-default)", borderRadius: "var(--sys-frame-radius-sm)" }} />
      </div>
    ),
  },
};

export const Collapsible: Story = {
  args: {
    title: "Advanced Settings",
    description: "Configure advanced options for your account.",
    collapsible: true,
    defaultOpen: true,
    children: (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--ref-frame-space-3)" }}>
        <label style={{ display: "flex", alignItems: "center", gap: "var(--ref-frame-space-2)" }}>
          <input type="checkbox" /> Enable two-factor authentication
        </label>
        <label style={{ display: "flex", alignItems: "center", gap: "var(--ref-frame-space-2)" }}>
          <input type="checkbox" /> Allow API access
        </label>
      </div>
    ),
  },
};

export const CollapsedByDefault: Story = {
  args: {
    title: "Optional Details",
    description: "Expand to fill in optional information.",
    collapsible: true,
    defaultOpen: false,
    children: (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--ref-frame-space-3)" }}>
        <input placeholder="Nickname" style={{ padding: "var(--sys-frame-padding-control)", border: "var(--sys-frame-border-thin) solid var(--sys-energy-border-default)", borderRadius: "var(--sys-frame-radius-sm)" }} />
        <input placeholder="Bio" style={{ padding: "var(--sys-frame-padding-control)", border: "var(--sys-frame-border-thin) solid var(--sys-energy-border-default)", borderRadius: "var(--sys-frame-radius-sm)" }} />
      </div>
    ),
  },
};

export const MultipleSections: Story = {
  args: { title: "Multi-section demo", children: <div /> },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--sys-frame-gap-section)" }}>
      <FlowFormSection title="Profile" description="Basic profile information">
        <input placeholder="Display name" style={{ padding: "var(--sys-frame-padding-control)", border: "var(--sys-frame-border-thin) solid var(--sys-energy-border-default)", borderRadius: "var(--sys-frame-radius-sm)", width: "100%", boxSizing: "border-box" }} />
      </FlowFormSection>
      <FlowFormSection title="Notifications" description="Manage how you receive updates" collapsible defaultOpen>
        <label style={{ display: "flex", alignItems: "center", gap: "var(--ref-frame-space-2)" }}>
          <input type="checkbox" defaultChecked /> Email notifications
        </label>
      </FlowFormSection>
      <FlowFormSection title="Danger Zone" description="Irreversible actions" collapsible defaultOpen={false}>
        <button style={{ padding: "var(--sys-frame-padding-control)", background: "var(--sys-energy-status-error)", color: "white", border: "none", borderRadius: "var(--sys-frame-radius-sm)", cursor: "pointer" }}>
          Delete Account
        </button>
      </FlowFormSection>
    </div>
  ),
};

import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlowHoverCard } from "../app/components/patterns";

const meta = {
  title: "Patterns/FlowHoverCard",
  component: FlowHoverCard,
  argTypes: {
    side: { control: "select", options: ["top", "bottom", "left", "right"] },
    openDelay: { control: "number" },
    closeDelay: { control: "number" },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 120, display: "flex", justifyContent: "center" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FlowHoverCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    trigger: (
      <span style={{
        padding: "var(--sys-frame-padding-control)",
        border: "var(--sys-frame-border-thin) solid var(--sys-energy-border-default)",
        borderRadius: "var(--sys-frame-radius-sm)",
        cursor: "pointer",
      }}>
        Hover over me
      </span>
    ),
    children: (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--ref-frame-space-2)" }}>
        <strong>Jane Doe</strong>
        <span style={{ color: "var(--sys-energy-text-secondary)", fontSize: "var(--sys-voice-caption-size)" }}>
          Senior Engineer at Acme Corp
        </span>
        <span style={{ color: "var(--sys-energy-text-tertiary)", fontSize: "var(--sys-voice-caption-size)" }}>
          jane.doe@acme.com
        </span>
      </div>
    ),
  },
};

export const TopSide: Story = {
  args: {
    side: "top",
    trigger: (
      <span style={{
        padding: "var(--sys-frame-padding-control)",
        border: "var(--sys-frame-border-thin) solid var(--sys-energy-border-default)",
        borderRadius: "var(--sys-frame-radius-sm)",
        cursor: "pointer",
      }}>
        Hover (top)
      </span>
    ),
    children: <p style={{ margin: 0 }}>This card appears above the trigger.</p>,
  },
};

export const LeftSide: Story = {
  args: {
    side: "left",
    trigger: (
      <span style={{
        padding: "var(--sys-frame-padding-control)",
        border: "var(--sys-frame-border-thin) solid var(--sys-energy-border-default)",
        borderRadius: "var(--sys-frame-radius-sm)",
        cursor: "pointer",
      }}>
        Hover (left)
      </span>
    ),
    children: <p style={{ margin: 0 }}>Card on the left side.</p>,
  },
};

export const RichContent: Story = {
  args: {
    trigger: (
      <span style={{
        color: "var(--sys-energy-text-accent)",
        textDecoration: "underline",
        cursor: "pointer",
      }}>
        @acme/design-system
      </span>
    ),
    children: (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--ref-frame-space-2)", minWidth: 200 }}>
        <strong>acme/design-system</strong>
        <span style={{ fontSize: "var(--sys-voice-caption-size)", color: "var(--sys-energy-text-secondary)" }}>
          Flow Design System monorepo
        </span>
        <div style={{ display: "flex", gap: "var(--ref-frame-space-3)", fontSize: "var(--sys-voice-caption-size)", color: "var(--sys-energy-text-tertiary)" }}>
          <span>142 stars</span>
          <span>38 forks</span>
          <span>TypeScript</span>
        </div>
      </div>
    ),
  },
};

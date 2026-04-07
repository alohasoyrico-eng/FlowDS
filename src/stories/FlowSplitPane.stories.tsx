import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlowSplitPane } from "../app/components/layout";

const panelStyle: React.CSSProperties = {
  padding: "var(--ref-frame-space-4)",
  height: "100%",
  boxSizing: "border-box",
};

const meta = {
  title: "Layout/FlowSplitPane",
  component: FlowSplitPane,
  argTypes: {
    direction: { control: "select", options: ["horizontal", "vertical"] },
    defaultSplit: { control: { type: "range", min: 10, max: 90 } },
    minFirst: { control: "number" },
    minSecond: { control: "number" },
  },
  decorators: [
    (Story) => (
      <div style={{ height: 400, width: "100%" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FlowSplitPane>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    direction: "horizontal",
    defaultSplit: 50,
    first: (
      <div style={{ ...panelStyle, background: "var(--sys-energy-surface-secondary)" }}>
        <strong>Left Panel</strong>
        <p>Drag the divider to resize. Use arrow keys for keyboard control.</p>
      </div>
    ),
    second: (
      <div style={panelStyle}>
        <strong>Right Panel</strong>
        <p>This is the second panel of the split pane.</p>
      </div>
    ),
  },
};

export const Vertical: Story = {
  args: {
    direction: "vertical",
    defaultSplit: 40,
    first: (
      <div style={{ ...panelStyle, background: "var(--sys-energy-surface-secondary)" }}>
        <strong>Top Panel</strong>
        <p>Resize vertically by dragging the divider.</p>
      </div>
    ),
    second: (
      <div style={panelStyle}>
        <strong>Bottom Panel</strong>
        <p>Content in the bottom section.</p>
      </div>
    ),
  },
};

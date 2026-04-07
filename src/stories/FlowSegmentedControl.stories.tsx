import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlowSegmentedControl } from "../app/components/selection";

const meta = {
  title: "Selection/FlowSegmentedControl",
  component: FlowSegmentedControl,
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg", "xl"] },
    fullWidth: { control: "boolean" },
  },
} satisfies Meta<typeof FlowSegmentedControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: [
      { value: "day", label: "Day" },
      { value: "week", label: "Week" },
      { value: "month", label: "Month" },
    ],
    "aria-label": "View mode",
  },
};

export const WithIcons: Story = {
  args: {
    options: [
      { value: "list", label: "List", icon: "list" },
      { value: "grid", label: "Grid", icon: "grid" },
      { value: "kanban", label: "Kanban", icon: "columns" },
    ],
    "aria-label": "Layout",
  },
};

export const FullWidth: Story = {
  args: {
    options: [
      { value: "left", label: "Left" },
      { value: "center", label: "Center" },
      { value: "right", label: "Right" },
    ],
    fullWidth: true,
    "aria-label": "Alignment",
  },
};

export const Disabled: Story = {
  args: {
    options: [
      { value: "on", label: "On" },
      { value: "off", label: "Off", disabled: true },
      { value: "auto", label: "Auto" },
    ],
    "aria-label": "Mode",
  },
};

export const AllSizes: Story = {
  args: {
    options: [
      { value: "a", label: "Alpha" },
      { value: "b", label: "Beta" },
      { value: "c", label: "Gamma" },
    ],
    "aria-label": "Size Demo",
  },
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--sys-frame-gap-component)" }}>
      <FlowSegmentedControl {...args} size="sm" />
      <FlowSegmentedControl {...args} size="md" />
      <FlowSegmentedControl {...args} size="lg" />
      <FlowSegmentedControl {...args} size="xl" />
    </div>
  ),
};

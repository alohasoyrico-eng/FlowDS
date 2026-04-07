import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlowToggleButton, FlowToggleButtonGroup } from "../app/components/selection";

const meta = {
  title: "Selection/FlowToggleButton",
  component: FlowToggleButton,
  argTypes: {
    pressed: { control: "boolean" },
    disabled: { control: "boolean" },
    size: { control: "select", options: ["sm", "md", "lg", "xl"] },
    icon: { control: "text" },
  },
} satisfies Meta<typeof FlowToggleButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: "Bold" },
};

export const WithIcon: Story = {
  args: { icon: "bold", children: "Bold" },
};

export const Group: Story = {
  args: { children: "Bold" },
  render: (args) => (
    <FlowToggleButtonGroup aria-label="Text formatting">
      <FlowToggleButton {...args} icon="bold">Bold</FlowToggleButton>
      <FlowToggleButton icon="italic">Italic</FlowToggleButton>
      <FlowToggleButton icon="underline">Underline</FlowToggleButton>
    </FlowToggleButtonGroup>
  ),
};

export const Disabled: Story = {
  args: { children: "Locked", disabled: true },
};

export const AllSizes: Story = {
  args: { children: "Size Demo" },
  render: (args) => (
    <div style={{ display: "flex", alignItems: "center", gap: "var(--sys-frame-gap-component)" }}>
      <FlowToggleButton {...args} size="sm">Small</FlowToggleButton>
      <FlowToggleButton {...args} size="md">Medium</FlowToggleButton>
      <FlowToggleButton {...args} size="lg">Large</FlowToggleButton>
      <FlowToggleButton {...args} size="xl">Extra Large</FlowToggleButton>
    </div>
  ),
};

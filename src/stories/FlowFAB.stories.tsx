import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlowFAB } from "../app/components/controls";

const meta = {
  title: "Controls/FlowFAB",
  component: FlowFAB,
  argTypes: {
    icon: { control: "text" },
    label: { control: "text" },
    size: { control: "select", options: ["sm", "md", "lg"] },
    variant: { control: "select", options: ["primary", "secondary", "tertiary"] },
    disabled: { control: "boolean" },
    loading: { control: "boolean" },
    position: { control: "select", options: ["bottom-right", "bottom-left", "bottom-center", "none"] },
  },
} satisfies Meta<typeof FlowFAB>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { icon: "plus", "aria-label": "Create", position: "none" },
};

export const Extended: Story = {
  args: { icon: "plus", label: "New Project", position: "none" },
};

export const AllVariants: Story = {
  args: { icon: "plus", "aria-label": "Create" },
  render: () => (
    <div style={{ display: "flex", gap: "var(--ref-frame-space-4)", alignItems: "center" }}>
      <FlowFAB icon="plus" variant="primary" aria-label="Primary" position="none" />
      <FlowFAB icon="plus" variant="secondary" aria-label="Secondary" position="none" />
      <FlowFAB icon="plus" variant="tertiary" aria-label="Tertiary" position="none" />
    </div>
  ),
};

export const AllSizes: Story = {
  args: { icon: "plus", "aria-label": "Create" },
  render: () => (
    <div style={{ display: "flex", gap: "var(--ref-frame-space-4)", alignItems: "center" }}>
      <FlowFAB icon="plus" size="sm" aria-label="Small" position="none" />
      <FlowFAB icon="plus" size="md" aria-label="Medium" position="none" />
      <FlowFAB icon="plus" size="lg" aria-label="Large" position="none" />
    </div>
  ),
};

export const Loading: Story = {
  args: { icon: "plus", loading: true, "aria-label": "Loading", position: "none" },
};

export const Disabled: Story = {
  args: { icon: "plus", disabled: true, "aria-label": "Create", position: "none" },
};

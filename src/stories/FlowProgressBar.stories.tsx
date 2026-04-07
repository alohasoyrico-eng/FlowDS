import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlowProgressBar } from "../app/components/feedback";

const meta = {
  title: "Feedback/FlowProgressBar",
  component: FlowProgressBar,
  argTypes: {
    value: { control: { type: "range", min: 0, max: 100 } },
    max: { control: "number" },
    indeterminate: { control: "boolean" },
    label: { control: "text" },
    size: { control: "select", options: ["sm", "md", "lg", "xl"] },
    variant: { control: "select", options: ["default", "success", "warning", "error"] },
    showLabel: { control: "boolean" },
    "aria-label": { control: "text" },
  },
} satisfies Meta<typeof FlowProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { value: 60 },
};

export const Indeterminate: Story = {
  args: { indeterminate: true },
};

export const AllVariants: Story = {
  args: { value: 75 },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--ref-frame-space-3, 12px)", width: 320 }}>
      <FlowProgressBar value={75} variant="default" aria-label="Default progress" />
      <FlowProgressBar value={75} variant="success" aria-label="Success progress" />
      <FlowProgressBar value={75} variant="warning" aria-label="Warning progress" />
      <FlowProgressBar value={75} variant="error" aria-label="Error progress" />
    </div>
  ),
};

export const WithLabel: Story = {
  args: { showLabel: true, value: 75 },
};

export const AllSizes: Story = {
  args: { value: 60 },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--ref-frame-space-3, 12px)", width: 320 }}>
      <FlowProgressBar value={60} size="sm" aria-label="Small progress" />
      <FlowProgressBar value={60} size="md" aria-label="Medium progress" />
      <FlowProgressBar value={60} size="lg" aria-label="Large progress" />
      <FlowProgressBar value={60} size="xl" aria-label="Extra-large progress" />
    </div>
  ),
};

export const ZeroAndFull: Story = {
  args: { value: 0 },
  render: () => (
    <div style={{ display: "flex", gap: "var(--ref-frame-space-4, 16px)", width: 640 }}>
      <div style={{ flex: 1 }}>
        <FlowProgressBar value={0} showLabel aria-label="Empty progress" />
      </div>
      <div style={{ flex: 1 }}>
        <FlowProgressBar value={100} showLabel aria-label="Full progress" />
      </div>
    </div>
  ),
};

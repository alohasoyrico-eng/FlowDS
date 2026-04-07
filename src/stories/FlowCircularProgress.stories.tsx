import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlowCircularProgress } from "../app/components/feedback";

const meta = {
  title: "Feedback/FlowCircularProgress",
  component: FlowCircularProgress,
  argTypes: {
    value: { control: { type: "range", min: 0, max: 100 } },
    max: { control: "number" },
    indeterminate: { control: "boolean" },
    size: { control: "select", options: ["sm", "md", "lg", "xl"] },
    variant: { control: "select", options: ["default", "success", "warning", "error"] },
    showLabel: { control: "boolean" },
    "aria-label": { control: "text" },
  },
} satisfies Meta<typeof FlowCircularProgress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { value: 65 },
};

export const Indeterminate: Story = {
  args: { indeterminate: true },
};

export const AllVariants: Story = {
  args: { value: 75 },
  render: () => (
    <div style={{ display: "flex", gap: "var(--ref-frame-space-4, 16px)", alignItems: "center" }}>
      <FlowCircularProgress value={75} variant="default" aria-label="Default progress" />
      <FlowCircularProgress value={75} variant="success" aria-label="Success progress" />
      <FlowCircularProgress value={75} variant="warning" aria-label="Warning progress" />
      <FlowCircularProgress value={75} variant="error" aria-label="Error progress" />
    </div>
  ),
};

export const WithLabel: Story = {
  args: { showLabel: true, value: 75 },
};

export const AllSizes: Story = {
  args: { value: 65 },
  render: () => (
    <div style={{ display: "flex", gap: "var(--ref-frame-space-4, 16px)", alignItems: "center" }}>
      <FlowCircularProgress value={65} size="sm" aria-label="Small progress" />
      <FlowCircularProgress value={65} size="md" aria-label="Medium progress" />
      <FlowCircularProgress value={65} size="lg" aria-label="Large progress" />
      <FlowCircularProgress value={65} size="xl" aria-label="Extra-large progress" />
    </div>
  ),
};

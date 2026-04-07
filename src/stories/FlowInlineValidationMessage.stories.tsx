import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlowInlineValidationMessage } from "../app/components/feedback";

const meta = {
  title: "Feedback/FlowInlineValidationMessage",
  component: FlowInlineValidationMessage,
  argTypes: {
    message: { control: "text" },
    variant: { control: "select", options: ["error", "success", "warning", "info"] },
    icon: { control: "boolean" },
  },
} satisfies Meta<typeof FlowInlineValidationMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { message: "This field is required" },
};

export const AllVariants: Story = {
  args: { message: "Validation message" },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--ref-frame-space-2, 8px)" }}>
      <FlowInlineValidationMessage message="This field is required" variant="error" />
      <FlowInlineValidationMessage message="Looks good!" variant="success" />
      <FlowInlineValidationMessage message="This may cause issues" variant="warning" />
      <FlowInlineValidationMessage message="Tip: use a strong password" variant="info" />
    </div>
  ),
};

export const NoIcon: Story = {
  args: { message: "This field is required", icon: false },
};

import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlowTag } from "../app/components/display";

const meta = {
  title: "Display/FlowTag",
  component: FlowTag,
  argTypes: {
    status: { control: "select", options: ["neutral", "info", "success", "warning", "error"] },
    variant: { control: "select", options: ["label", "code"] },
  },
} satisfies Meta<typeof FlowTag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: "neutral" },
};

export const AllStatuses: Story = {
  args: { children: "Status Demo" },
  render: () => (
    <div style={{ display: "flex", gap: "var(--ref-frame-space-2)", flexWrap: "wrap" }}>
      <FlowTag>neutral</FlowTag>
      <FlowTag status="info">info</FlowTag>
      <FlowTag status="success">success</FlowTag>
      <FlowTag status="warning">warning</FlowTag>
      <FlowTag status="error">error</FlowTag>
      <FlowTag variant="code">code</FlowTag>
      <FlowTag variant="code" status="error">code+error</FlowTag>
    </div>
  ),
};

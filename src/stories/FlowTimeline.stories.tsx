import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlowTimeline } from "../app/components/patterns";

const meta = {
  title: "Patterns/FlowTimeline",
  component: FlowTimeline,
  argTypes: {},
} satisfies Meta<typeof FlowTimeline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { id: "1", title: "Order placed", description: "Your order has been confirmed", timestamp: "Apr 1, 2026 09:00", variant: "info" },
      { id: "2", title: "Payment received", description: "Payment of $299 processed", timestamp: "Apr 1, 2026 09:05", variant: "success" },
      { id: "3", title: "Shipped", description: "Package shipped via express delivery", timestamp: "Apr 2, 2026 14:30", variant: "default" },
      { id: "4", title: "Delivered", timestamp: "Apr 3, 2026 10:15", variant: "success" },
    ],
  },
};

export const WithWarning: Story = {
  args: {
    items: [
      { id: "1", title: "Build started", timestamp: "10:00", variant: "info" },
      { id: "2", title: "Tests passed", timestamp: "10:05", variant: "success" },
      { id: "3", title: "Lint warnings found", description: "3 unused imports", timestamp: "10:06", variant: "warning" },
      { id: "4", title: "Deploy failed", description: "Memory limit exceeded", timestamp: "10:12", variant: "error" },
    ],
  },
};

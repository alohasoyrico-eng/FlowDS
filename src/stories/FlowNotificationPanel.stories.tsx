import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlowNotificationPanel } from "../app/components/patterns";

const meta = {
  title: "Patterns/FlowNotificationPanel",
  component: FlowNotificationPanel,
  argTypes: {
    title: { control: "text" },
    maxHeight: { control: "number" },
    error: { control: "boolean" },
  },
} satisfies Meta<typeof FlowNotificationPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    notifications: [
      {
        id: "1",
        title: "New deployment successful",
        message: "v2.4.0 has been deployed to production",
        timestamp: "2 minutes ago",
        variant: "success",
        read: false,
      },
      {
        id: "2",
        title: "Build warning",
        message: "Bundle size increased by 12%",
        timestamp: "1 hour ago",
        variant: "warning",
        read: false,
      },
      {
        id: "3",
        title: "Scheduled maintenance",
        message: "System maintenance at 2am UTC",
        timestamp: "3 hours ago",
        variant: "info",
        read: true,
      },
    ],
    onMarkRead: () => {},
    onMarkAllRead: () => {},
    onDismiss: () => {},
  },
};

export const Empty: Story = {
  args: {
    notifications: [],
  },
};

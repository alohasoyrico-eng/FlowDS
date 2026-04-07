import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlowPullToRefresh } from "../app/components/patterns";

const meta = {
  title: "Patterns/FlowPullToRefresh",
  component: FlowPullToRefresh,
  argTypes: {
    refreshing: { control: "boolean" },
    disabled: { control: "boolean" },
    threshold: { control: "number" },
  },
} satisfies Meta<typeof FlowPullToRefresh>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    refreshing: false,
    onRefresh: () => {},
    children: "Pull down to refresh this content. (Works best on touch devices.)",
  },
};

export const Refreshing: Story = {
  args: {
    refreshing: true,
    onRefresh: () => {},
    children: "Content is being refreshed...",
  },
};

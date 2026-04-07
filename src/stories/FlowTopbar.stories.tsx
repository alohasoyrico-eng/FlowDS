import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlowTopbar } from "../app/components/patterns";

const meta = {
  title: "Patterns/FlowTopbar",
  component: FlowTopbar,
  argTypes: {
    sticky: { control: "boolean" },
    loading: { control: "boolean" },
  },
} satisfies Meta<typeof FlowTopbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Flow Design System",
  },
};

export const WithActions: Story = {
  args: {
    title: "Dashboard",
    leading: "Logo",
    actions: "User Menu",
  },
};

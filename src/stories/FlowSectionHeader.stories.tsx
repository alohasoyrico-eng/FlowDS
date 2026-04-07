import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlowSectionHeader } from "../app/components/patterns";

const meta = {
  title: "Patterns/FlowSectionHeader",
  component: FlowSectionHeader,
  argTypes: {
    title: { control: "text" },
    subtitle: { control: "text" },
    divider: { control: "boolean" },
  },
} satisfies Meta<typeof FlowSectionHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Recent Activity",
  },
};

export const WithSubtitle: Story = {
  args: {
    title: "Team Members",
    subtitle: "Manage your team and their permissions",
  },
};

export const NoDivider: Story = {
  args: {
    title: "Settings",
    subtitle: "Configure application preferences",
    divider: false,
  },
};

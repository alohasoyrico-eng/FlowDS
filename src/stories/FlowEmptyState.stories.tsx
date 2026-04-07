import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlowEmptyState } from "../app/components/patterns";
import { FlowButton } from "../app/components/controls";

const meta = {
  title: "Patterns/FlowEmptyState",
  component: FlowEmptyState,
  argTypes: {
    icon: { control: "text" },
    title: { control: "text" },
    description: { control: "text" },
    size: { control: "select", options: ["sm", "md", "lg", "xl"] },
  },
} satisfies Meta<typeof FlowEmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: "search",
    title: "No results found",
    description: "Try adjusting your search or filter criteria to find what you are looking for.",
  },
};

export const WithAction: Story = {
  args: {
    icon: "file",
    title: "No documents yet",
    description: "Upload your first document to get started.",
    action: <FlowButton variant="high" size="sm" leadingIcon="plus">Upload Document</FlowButton>,
  },
};

export const WithBothActions: Story = {
  args: {
    icon: "users",
    title: "No team members",
    description: "Invite your team to start collaborating on this project.",
    action: <FlowButton variant="high" size="sm" leadingIcon="plus">Invite Members</FlowButton>,
    secondaryAction: <FlowButton variant="low" size="sm">Learn More</FlowButton>,
  },
};

export const Compact: Story = {
  args: {
    icon: "inbox",
    title: "Inbox empty",
    description: "All caught up!",
    size: "sm",
  },
};

export const CustomIcon: Story = {
  args: {
    icon: "shield",
    title: "Access restricted",
    description: "You do not have permission to view this content. Contact your administrator for access.",
    action: <FlowButton variant="medium" size="sm">Request Access</FlowButton>,
  },
};

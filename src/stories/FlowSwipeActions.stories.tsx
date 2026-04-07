import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlowSwipeActions } from "../app/components/patterns";

const meta = {
  title: "Patterns/FlowSwipeActions",
  component: FlowSwipeActions,
  argTypes: {
    threshold: { control: "number" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof FlowSwipeActions>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div style={{ padding: "16px", background: "var(--sys-energy-surface-primary, #fff)", border: "1px solid #eee" }}>
        Swipe me left or right
      </div>
    ),
    rightActions: [
      { key: "delete", label: "Delete", variant: "danger", icon: "trash" },
    ],
    leftActions: [
      { key: "archive", label: "Archive", variant: "success", icon: "archive" },
    ],
  },
};

export const DeleteOnly: Story = {
  args: {
    children: (
      <div style={{ padding: "16px", background: "var(--sys-energy-surface-primary, #fff)", border: "1px solid #eee" }}>
        Swipe left to delete
      </div>
    ),
    rightActions: [
      { key: "delete", label: "Delete", variant: "danger", icon: "trash" },
    ],
  },
};

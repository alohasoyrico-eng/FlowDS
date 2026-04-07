import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlowTransferList } from "../app/components/patterns";

const meta = {
  title: "Patterns/FlowTransferList",
  component: FlowTransferList,
  argTypes: {
    searchable: { control: "boolean" },
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
} satisfies Meta<typeof FlowTransferList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { id: "1", label: "Alice" },
      { id: "2", label: "Bob" },
      { id: "3", label: "Charlie" },
      { id: "4", label: "Diana" },
      { id: "5", label: "Eve" },
      { id: "6", label: "Frank" },
    ],
    sourceTitle: "Available",
    targetTitle: "Selected",
  },
};

export const Searchable: Story = {
  args: {
    items: [
      { id: "1", label: "Engineering" },
      { id: "2", label: "Design" },
      { id: "3", label: "Marketing" },
      { id: "4", label: "Sales" },
      { id: "5", label: "Support" },
      { id: "6", label: "Finance" },
    ],
    sourceTitle: "Departments",
    targetTitle: "Assigned",
    defaultTargetIds: ["2", "3"],
    searchable: true,
  },
};

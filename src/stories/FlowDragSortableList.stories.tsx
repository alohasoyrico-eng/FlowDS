import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlowDragSortableList } from "../app/components/patterns";

const meta = {
  title: "Patterns/FlowDragSortableList",
  component: FlowDragSortableList,
  argTypes: {
    handle: { control: "boolean" },
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
} satisfies Meta<typeof FlowDragSortableList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { id: "1", content: "First item" },
      { id: "2", content: "Second item" },
      { id: "3", content: "Third item" },
      { id: "4", content: "Fourth item" },
    ],
    onReorder: () => {},
    "aria-label": "Reorderable list",
  },
};

export const WithoutHandle: Story = {
  args: {
    items: [
      { id: "a", content: "Alpha" },
      { id: "b", content: "Bravo" },
      { id: "c", content: "Charlie" },
    ],
    onReorder: () => {},
    handle: false,
    "aria-label": "Reorderable list",
  },
};

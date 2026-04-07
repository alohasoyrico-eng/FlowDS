import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlowSortControl } from "../app/components/data";

const meta = {
  title: "Data/FlowSortControl",
  component: FlowSortControl,
  argTypes: {
    sortKey: { control: "text" },
    sortDirection: { control: "select", options: ["asc", "desc", null] },
  },
} satisfies Meta<typeof FlowSortControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: [
      { key: "name", label: "Name" },
      { key: "date", label: "Date" },
      { key: "price", label: "Price" },
    ],
    sortKey: null,
    sortDirection: null,
    onSortChange: () => {},
  },
};

export const ActiveSort: Story = {
  args: {
    options: [
      { key: "name", label: "Name" },
      { key: "date", label: "Date" },
      { key: "price", label: "Price" },
    ],
    sortKey: "name",
    sortDirection: "asc",
    onSortChange: () => {},
  },
};

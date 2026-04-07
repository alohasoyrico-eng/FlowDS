import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlowAdvancedFilters } from "../app/components/patterns";

const meta = {
  title: "Patterns/FlowAdvancedFilters",
  component: FlowAdvancedFilters,
  argTypes: {
    maxFilters: { control: "number" },
    loading: { control: "boolean" },
    error: { control: "boolean" },
  },
} satisfies Meta<typeof FlowAdvancedFilters>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    fields: [
      { key: "name", label: "Name", type: "text" },
      { key: "amount", label: "Amount", type: "number" },
      { key: "status", label: "Status", type: "select", options: [
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
      ] },
      { key: "date", label: "Date", type: "date" },
    ],
    filters: [],
    onFiltersChange: () => {},
  },
};

export const WithFilters: Story = {
  args: {
    fields: [
      { key: "name", label: "Name", type: "text" },
      { key: "amount", label: "Amount", type: "number" },
    ],
    filters: [
      { id: "f-1", field: "name", operator: "contains", value: "John" },
      { id: "f-2", field: "amount", operator: "gt", value: "100" },
    ],
    onFiltersChange: () => {},
    onApply: () => {},
  },
};

import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlowFilterChipGroup } from "../app/components/patterns";

const meta = {
  title: "Patterns/FlowFilterChipGroup",
  component: FlowFilterChipGroup,
  argTypes: {
    exclusive: { control: "boolean" },
  },
} satisfies Meta<typeof FlowFilterChipGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    chips: [
      { id: "all", label: "All", count: 42 },
      { id: "active", label: "Active", count: 28 },
      { id: "inactive", label: "Inactive", count: 14 },
    ],
    selected: new Set(["all"]),
    onSelectionChange: () => {},
  },
};

export const Exclusive: Story = {
  args: {
    chips: [
      { id: "day", label: "Day" },
      { id: "week", label: "Week" },
      { id: "month", label: "Month" },
    ],
    selected: new Set(["week"]),
    onSelectionChange: () => {},
    exclusive: true,
  },
};

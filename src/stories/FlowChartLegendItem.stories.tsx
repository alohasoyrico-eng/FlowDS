import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlowChartLegendItem } from "../app/components/data";

const meta = {
  title: "Data/FlowChartLegendItem",
  component: FlowChartLegendItem,
  argTypes: {
    color: { control: "color" },
    label: { control: "text" },
    value: { control: "text" },
    toggleable: { control: "boolean" },
    hidden: { control: "boolean" },
  },
} satisfies Meta<typeof FlowChartLegendItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    color: "#3b82f6",
    label: "Revenue",
  },
};

export const WithValue: Story = {
  args: {
    color: "#22c55e",
    label: "Sales",
    value: "$12,400",
  },
};

export const Toggleable: Story = {
  args: {
    color: "#ef4444",
    label: "Expenses",
    value: "$8,200",
    toggleable: true,
  },
};

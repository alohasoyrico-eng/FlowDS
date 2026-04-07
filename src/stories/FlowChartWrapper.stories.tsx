import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlowChartWrapper } from "../app/components/patterns";

const meta = {
  title: "Patterns/FlowChartWrapper",
  component: FlowChartWrapper,
  argTypes: {
    title: { control: "text" },
    subtitle: { control: "text" },
    height: { control: "number" },
    loading: { control: "boolean" },
    error: { control: "boolean" },
    empty: { control: "boolean" },
  },
} satisfies Meta<typeof FlowChartWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Monthly Revenue",
    subtitle: "Last 12 months",
    height: 300,
    children: "Chart content goes here",
  },
};

export const Loading: Story = {
  args: {
    title: "Loading Chart",
    height: 300,
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    title: "Empty Chart",
    height: 300,
    empty: true,
    emptyMessage: "No data available for this period",
  },
};

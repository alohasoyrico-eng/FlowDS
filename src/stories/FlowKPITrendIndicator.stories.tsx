import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlowKPITrendIndicator } from "../app/components/display";

const meta = {
  title: "Display/FlowKPITrendIndicator",
  component: FlowKPITrendIndicator,
  argTypes: {
    value: { control: "text" },
    direction: { control: "select", options: ["up", "down", "neutral"] },
    upIsGood: { control: "boolean" },
    label: { control: "text" },
  },
} satisfies Meta<typeof FlowKPITrendIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: "+12.5%",
    direction: "up",
  },
};

export const Downtrend: Story = {
  args: {
    value: "-3.2%",
    direction: "down",
    label: "vs last month",
  },
};

export const Neutral: Story = {
  args: {
    value: "0%",
    direction: "neutral",
    label: "no change",
  },
};

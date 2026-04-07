import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlowSkeleton } from "../app/components/feedback";

const meta = {
  title: "Feedback/FlowSkeleton",
  component: FlowSkeleton,
  argTypes: {
    variant: { control: "select", options: ["text", "circle", "circular", "rect", "rectangular", "card"] },
    width: { control: "text" },
    height: { control: "text" },
    lines: { control: "number" },
    animate: { control: "boolean" },
    size: { control: "select", options: ["sm", "md", "lg", "xl"] },
  },
} satisfies Meta<typeof FlowSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { variant: "text" },
};

export const TextLines: Story = {
  args: { variant: "text", lines: 3 },
};

export const Circle: Story = {
  args: { variant: "circle", width: 48 },
};

export const Rectangle: Story = {
  args: { variant: "rect", width: "100%", height: 120 },
};

export const Card: Story = {
  args: { variant: "card" },
};

export const NoAnimation: Story = {
  args: { variant: "text", animate: false },
};

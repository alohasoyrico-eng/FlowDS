import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlowDrawerAdapter } from "../app/components/patterns";

const meta = {
  title: "Patterns/FlowDrawerAdapter",
  component: FlowDrawerAdapter,
  argTypes: {
    open: { control: "boolean" },
    side: { control: "select", options: ["left", "right"] },
    breakpoint: { control: "number" },
    showClose: { control: "boolean" },
  },
} satisfies Meta<typeof FlowDrawerAdapter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: true,
    onClose: () => {},
    title: "Navigation",
    children: "Drawer content goes here",
  },
};

export const RightSide: Story = {
  args: {
    open: true,
    onClose: () => {},
    title: "Settings",
    side: "right",
    children: "Right-side drawer content",
  },
};

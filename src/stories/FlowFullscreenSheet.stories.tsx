import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlowFullscreenSheet } from "../app/components/patterns";

const meta = {
  title: "Patterns/FlowFullscreenSheet",
  component: FlowFullscreenSheet,
  argTypes: {
    open: { control: "boolean" },
    showBack: { control: "boolean" },
    closeOnEscape: { control: "boolean" },
  },
} satisfies Meta<typeof FlowFullscreenSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: true,
    onClose: () => {},
    title: "Full Screen View",
    children: "Fullscreen sheet content goes here",
  },
};

export const WithBackButton: Story = {
  args: {
    open: true,
    onClose: () => {},
    title: "Detail View",
    showBack: true,
    children: "Navigate back to the previous screen",
  },
};

import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlowColorPicker } from "../app/components/patterns";

const meta = {
  title: "Patterns/FlowColorPicker",
  component: FlowColorPicker,
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
    label: { control: "text" },
  },
} satisfies Meta<typeof FlowColorPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Pick a color",
    defaultValue: "#3b82f6",
  },
};

export const CustomSwatches: Story = {
  args: {
    label: "Brand colors",
    defaultValue: "#6366f1",
    swatches: ["#6366f1", "#8b5cf6", "#a855f7", "#d946ef", "#ec4899"],
  },
};

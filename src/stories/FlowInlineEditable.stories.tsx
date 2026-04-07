import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlowInlineEditable } from "../app/components/patterns";

const meta = {
  title: "Patterns/FlowInlineEditable",
  component: FlowInlineEditable,
  argTypes: {
    disabled: { control: "boolean" },
    error: { control: "boolean" },
    placeholder: { control: "text" },
  },
} satisfies Meta<typeof FlowInlineEditable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: "Click me to edit",
    onChange: () => {},
  },
};

export const Empty: Story = {
  args: {
    value: "",
    onChange: () => {},
    placeholder: "Enter a title...",
  },
};

export const Disabled: Story = {
  args: {
    value: "Cannot edit this",
    onChange: () => {},
    disabled: true,
  },
};

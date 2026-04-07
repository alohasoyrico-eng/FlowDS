import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlowRichTextEditor } from "../app/components/patterns";

const meta = {
  title: "Patterns/FlowRichTextEditor",
  component: FlowRichTextEditor,
  argTypes: {
    disabled: { control: "boolean" },
    label: { control: "text" },
    placeholder: { control: "text" },
    minHeight: { control: "number" },
  },
} satisfies Meta<typeof FlowRichTextEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Description",
    placeholder: "Start typing...",
  },
};

export const WithContent: Story = {
  args: {
    label: "Notes",
    defaultValue: "<p>This is <strong>bold</strong> and <em>italic</em> text.</p><ul><li>First item</li><li>Second item</li></ul>",
  },
};

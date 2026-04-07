import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlowTextArea } from "../app/components/inputs";

const meta = {
  title: "Inputs/FlowTextArea",
  component: FlowTextArea,
  argTypes: {
    label: { control: "text" },
    hint: { control: "text" },
    error: { control: "text" },
    success: { control: "boolean" },
    loading: { control: "boolean" },
    size: { control: "select", options: ["sm", "md", "lg", "xl"] },
    rows: { control: "number" },
    resize: { control: "select", options: ["none", "vertical", "both"] },
    maxLength: { control: "number" },
    disabled: { control: "boolean" },
    readOnly: { control: "boolean" },
    placeholder: { control: "text" },
  },
} satisfies Meta<typeof FlowTextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: "Description", placeholder: "Enter description..." },
};

export const WithHint: Story = {
  args: { label: "Bio", placeholder: "Tell us about yourself", hint: "Maximum 500 characters" },
};

export const WithError: Story = {
  args: { label: "Comments", placeholder: "Add a comment...", error: "This field is required" },
};

export const WithMaxLength: Story = {
  args: { label: "Summary", placeholder: "Brief summary...", maxLength: 200 },
};

export const Disabled: Story = {
  args: { label: "Notes", placeholder: "Disabled textarea", disabled: true },
};

export const ReadOnly: Story = {
  args: { label: "Terms", value: "These are the terms and conditions. This content is read-only.", readOnly: true },
};

export const AllSizes: Story = {
  args: { label: "Size Demo" },
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--sys-frame-gap-component)" }}>
      <FlowTextArea {...args} label="Small" placeholder="sm" size="sm" />
      <FlowTextArea {...args} label="Medium" placeholder="md" size="md" />
      <FlowTextArea {...args} label="Large" placeholder="lg" size="lg" />
      <FlowTextArea {...args} label="Extra Large" placeholder="xl" size="xl" />
    </div>
  ),
};

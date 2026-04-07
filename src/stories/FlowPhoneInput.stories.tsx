import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlowPhoneInput } from "../app/components/patterns";

const meta = {
  title: "Patterns/FlowPhoneInput",
  component: FlowPhoneInput,
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg", "xl"] },
    label: { control: "text" },
    hint: { control: "text" },
    error: { control: "text" },
    success: { control: "boolean" },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
    readOnly: { control: "boolean" },
    placeholder: { control: "text" },
    country: { control: "text" },
  },
} satisfies Meta<typeof FlowPhoneInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: "Phone number", placeholder: "Enter phone number" },
};

export const WithHint: Story = {
  args: {
    label: "Phone number",
    hint: "Include area code",
    placeholder: "e.g. 6 12 34 56 78",
  },
};

export const WithError: Story = {
  args: {
    label: "Phone number",
    error: "Invalid phone number",
    value: "123",
  },
};

export const Success: Story = {
  args: {
    label: "Phone number",
    success: true,
    value: "6 12 34 56 78",
    hint: "Phone number verified",
  },
};

export const Disabled: Story = {
  args: {
    label: "Phone number",
    disabled: true,
    value: "6 12 34 56 78",
  },
};

export const Loading: Story = {
  args: {
    label: "Phone number",
    loading: true,
    value: "6 12 34 56 78",
  },
};

export const AllSizes: Story = {
  args: { label: "Size demo" },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--sys-frame-gap-component)", maxWidth: 400 }}>
      <FlowPhoneInput size="sm" label="Small" placeholder="Small" />
      <FlowPhoneInput size="md" label="Medium" placeholder="Medium" />
      <FlowPhoneInput size="lg" label="Large" placeholder="Large" />
      <FlowPhoneInput size="xl" label="X-Large" placeholder="X-Large" />
    </div>
  ),
};

export const Controlled: Story = {
  args: { label: "Phone number", placeholder: "Enter number" },
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--sys-frame-gap-component)", maxWidth: 400 }}>
        <FlowPhoneInput {...args} value={value} onChange={setValue} />
        <p style={{ fontSize: "var(--sys-voice-caption-size)", color: "var(--sys-energy-text-tertiary)" }}>
          Value: &quot;{value}&quot;
        </p>
      </div>
    );
  },
};

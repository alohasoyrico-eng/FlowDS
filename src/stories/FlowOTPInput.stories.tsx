import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlowOTPInput } from "../app/components/patterns";

const meta = {
  title: "Patterns/FlowOTPInput",
  component: FlowOTPInput,
  argTypes: {
    length: { control: "number" },
    type: { control: "select", options: ["numeric", "alphanumeric"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    error: { control: "boolean" },
    errorMessage: { control: "text" },
    label: { control: "text" },
    disabled: { control: "boolean" },
    autoFocus: { control: "boolean" },
  },
} satisfies Meta<typeof FlowOTPInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Verification Code",
    length: 6,
    type: "numeric",
  },
};

export const FourDigit: Story = {
  args: {
    label: "PIN",
    length: 4,
    type: "numeric",
  },
};

export const Alphanumeric: Story = {
  args: {
    label: "Invite Code",
    length: 6,
    type: "alphanumeric",
  },
};

export const WithError: Story = {
  args: {
    label: "Verification Code",
    length: 6,
    error: true,
    errorMessage: "Invalid code. Please try again.",
    value: "12345",
  },
};

export const Disabled: Story = {
  args: {
    label: "Verification Code",
    length: 6,
    disabled: true,
    value: "123456",
  },
};

export const AllSizes: Story = {
  args: { label: "Size demo", length: 4 },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--sys-frame-gap-section)" }}>
      <FlowOTPInput size="sm" label="Small" length={4} />
      <FlowOTPInput size="md" label="Medium" length={4} />
      <FlowOTPInput size="lg" label="Large" length={4} />
    </div>
  ),
};

export const Controlled: Story = {
  args: { label: "Enter code", length: 6 },
  render: (args) => {
    const [value, setValue] = useState("");
    const [complete, setComplete] = useState(false);
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--sys-frame-gap-component)" }}>
        <FlowOTPInput
          {...args}
          value={value}
          onChange={setValue}
          onComplete={() => setComplete(true)}
        />
        <p style={{ fontSize: "var(--sys-voice-caption-size)", color: "var(--sys-energy-text-tertiary)" }}>
          Value: &quot;{value}&quot;{complete && " -- Complete!"}
        </p>
      </div>
    );
  },
};

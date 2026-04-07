import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlowFieldset } from "../app/components/layout";

const meta = {
  title: "Layout/FlowFieldset",
  component: FlowFieldset,
  argTypes: {
    disabled: { control: "boolean" },
    error: { control: "boolean" },
    legend: { control: "text" },
    description: { control: "text" },
  },
} satisfies Meta<typeof FlowFieldset>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    legend: "Contact Information",
    children: "Form controls would be placed here (e.g., name, email, and phone fields).",
  },
};

export const Disabled: Story = {
  args: {
    legend: "Billing Address",
    description: "This section is currently disabled.",
    disabled: true,
    children: "Address fields would appear here but are not editable.",
  },
};

export const WithDescription: Story = {
  args: {
    legend: "Notification Preferences",
    description: "Choose how you would like to receive notifications from us.",
    children: "Notification toggle controls would be placed here.",
  },
};

export const WithError: Story = {
  args: {
    legend: "Payment Details",
    description: "Please correct the errors below.",
    error: true,
    children: "Credit card fields with validation errors would appear here.",
  },
};

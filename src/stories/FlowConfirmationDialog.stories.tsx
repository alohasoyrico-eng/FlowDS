import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlowConfirmationDialog } from "../app/components/patterns";

const meta = {
  title: "Patterns/FlowConfirmationDialog",
  component: FlowConfirmationDialog,
  argTypes: {
    variant: { control: "select", options: ["default", "danger"] },
    confirmLabel: { control: "text" },
    cancelLabel: { control: "text" },
    loading: { control: "boolean" },
  },
} satisfies Meta<typeof FlowConfirmationDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: true,
    title: "Confirm Action",
    message: "Are you sure you want to proceed? This action cannot be undone.",
    onConfirm: () => {},
    onCancel: () => {},
  },
};

export const Danger: Story = {
  args: {
    open: true,
    title: "Delete Project",
    message: "This will permanently delete the project and all associated data. This action cannot be reversed.",
    variant: "danger",
    confirmLabel: "Delete",
    onConfirm: () => {},
    onCancel: () => {},
  },
};

export const Loading: Story = {
  args: {
    open: true,
    title: "Publishing Changes",
    message: "Your changes will be published to the production environment.",
    loading: true,
    confirmLabel: "Publish",
    onConfirm: () => {},
    onCancel: () => {},
  },
};

export const Interactive: Story = {
  args: {
    title: "Discard changes?",
    message: "You have unsaved changes. Are you sure you want to discard them?",
    confirmLabel: "Discard",
    variant: "danger",
    open: false,
    onConfirm: () => {},
    onCancel: () => {},
  },
  render: (args) => {
    const [open, setOpen] = useState(false);
    const [result, setResult] = useState<string | null>(null);
    return (
      <div>
        <button
          onClick={() => setOpen(true)}
          style={{
            padding: "var(--sys-frame-padding-control)",
            border: "var(--sys-frame-border-thin) solid var(--sys-energy-border-default)",
            borderRadius: "var(--sys-frame-radius-sm)",
            background: "var(--sys-energy-surface-primary)",
            color: "var(--sys-energy-text-primary)",
            cursor: "pointer",
          }}
        >
          Open Dialog
        </button>
        {result && (
          <p style={{ marginTop: "var(--sys-frame-gap-component)", fontSize: "var(--sys-voice-caption-size)", color: "var(--sys-energy-text-tertiary)" }}>
            Result: {result}
          </p>
        )}
        <FlowConfirmationDialog
          {...args}
          open={open}
          onConfirm={() => {
            setResult("Confirmed");
            setOpen(false);
          }}
          onCancel={() => {
            setResult("Cancelled");
            setOpen(false);
          }}
        />
      </div>
    );
  },
};

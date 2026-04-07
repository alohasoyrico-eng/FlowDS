import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { FlowDialog } from "../app/components/overlays";
import { FlowButton } from "../app/components/controls";

const meta = {
  title: "Overlays/FlowDialog",
  component: FlowDialog,
  argTypes: {
    open: { control: "boolean" },
    title: { control: "text" },
    description: { control: "text" },
    variant: { control: "select", options: ["default", "alert", "form"] },
    size: { control: "select", options: ["sm", "md", "lg", "xl"] },
  },
} satisfies Meta<typeof FlowDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { open: false, title: "Dialog Title", onClose: () => {} },
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <FlowButton onClick={() => setOpen(true)}>Open Dialog</FlowButton>
        <FlowDialog
          {...args}
          open={open}
          onClose={() => setOpen(false)}
        >
          <p>This is the dialog body content.</p>
        </FlowDialog>
      </>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const openBtn = canvas.getByRole("button", { name: "Open Dialog" });
    await expect(openBtn).toBeInTheDocument();
    await userEvent.click(openBtn);
    const dialog = await within(document.body).findByRole("dialog");
    await expect(dialog).toBeInTheDocument();
    await expect(dialog).toHaveAttribute("aria-modal", "true");
    const title = within(dialog).getByText("Dialog Title");
    await expect(title).toBeVisible();
  },
};

export const WithDescription: Story = {
  args: { open: false, title: "Confirm Action", description: "Are you sure you want to proceed?", onClose: () => {} },
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <FlowButton onClick={() => setOpen(true)}>Open Dialog</FlowButton>
        <FlowDialog
          {...args}
          open={open}
          onClose={() => setOpen(false)}
        >
          <p>This dialog includes a description below the title.</p>
        </FlowDialog>
      </>
    );
  },
};

export const WithActions: Story = {
  args: { open: false, title: "Save Changes", onClose: () => {} },
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <FlowButton onClick={() => setOpen(true)}>Open Dialog</FlowButton>
        <FlowDialog
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          actions={
            <div style={{ display: "flex", gap: "var(--sys-frame-gap-component)", justifyContent: "flex-end" }}>
              <FlowButton variant="low" onClick={() => setOpen(false)}>Cancel</FlowButton>
              <FlowButton variant="high" onClick={() => setOpen(false)}>Save</FlowButton>
            </div>
          }
        >
          <p>Your changes will be saved permanently.</p>
        </FlowDialog>
      </>
    );
  },
};

export const AlertVariant: Story = {
  args: { open: false, title: "Delete Item", variant: "alert", onClose: () => {} },
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <FlowButton variant="danger" onClick={() => setOpen(true)}>Delete</FlowButton>
        <FlowDialog
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          description="This action cannot be undone."
          actions={
            <div style={{ display: "flex", gap: "var(--sys-frame-gap-component)", justifyContent: "flex-end" }}>
              <FlowButton variant="low" onClick={() => setOpen(false)}>Cancel</FlowButton>
              <FlowButton variant="danger" onClick={() => setOpen(false)}>Delete</FlowButton>
            </div>
          }
        />
      </>
    );
  },
};

export const AllSizes: Story = {
  args: { open: false, title: "Size Demo", onClose: () => {} },
  render: (args) => {
    const [openSize, setOpenSize] = useState<string | null>(null);
    return (
      <div style={{ display: "flex", gap: "var(--sys-frame-gap-component)" }}>
        {(["sm", "md", "lg", "xl"] as const).map((size) => (
          <div key={size}>
            <FlowButton onClick={() => setOpenSize(size)}>{size.toUpperCase()}</FlowButton>
            <FlowDialog
              {...args}
              open={openSize === size}
              onClose={() => setOpenSize(null)}
              size={size}
              title={`${size.toUpperCase()} Dialog`}
              description={`This dialog uses size="${size}".`}
            >
              <p>Content area for the {size} dialog size.</p>
            </FlowDialog>
          </div>
        ))}
      </div>
    );
  },
};

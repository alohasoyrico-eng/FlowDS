import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { FlowBottomSheet } from "../app/components/overlays";
import { FlowButton } from "../app/components/controls";

const meta = {
  title: "Overlays/FlowBottomSheet",
  component: FlowBottomSheet,
  argTypes: {
    open: { control: "boolean" },
    title: { control: "text" },
    showHandle: { control: "boolean" },
    showClose: { control: "boolean" },
    closeOnOverlay: { control: "boolean" },
    closeOnEscape: { control: "boolean" },
  },
} satisfies Meta<typeof FlowBottomSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { open: false, title: "Bottom Sheet", onClose: () => {}, children: "Sheet content" },
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <FlowButton onClick={() => setOpen(true)}>Open Bottom Sheet</FlowButton>
        <FlowBottomSheet
          {...args}
          open={open}
          onClose={() => setOpen(false)}
        >
          <p>This is the bottom sheet body content. You can drag the handle down to dismiss.</p>
        </FlowBottomSheet>
      </>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const openButton = canvas.getByRole("button", { name: /open bottom sheet/i });
    await expect(openButton).toBeInTheDocument();
    await userEvent.click(openButton);
    const dialog = await canvas.findByRole("dialog", {}, { timeout: 3000 });
    await expect(dialog).toBeInTheDocument();
    await expect(dialog).toHaveAttribute("aria-modal", "true");
    await expect(canvas.getByText("Bottom Sheet")).toBeInTheDocument();
  },
};

export const WithTitle: Story = {
  args: { open: false, title: "Select an Option", onClose: () => {}, children: "Content" },
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <FlowButton onClick={() => setOpen(true)}>Open Sheet</FlowButton>
        <FlowBottomSheet
          {...args}
          open={open}
          onClose={() => setOpen(false)}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <FlowButton variant="low" fullWidth>Option A</FlowButton>
            <FlowButton variant="low" fullWidth>Option B</FlowButton>
            <FlowButton variant="low" fullWidth>Option C</FlowButton>
          </div>
        </FlowBottomSheet>
      </>
    );
  },
};

export const NoHandle: Story = {
  args: { open: false, title: "No Handle", showHandle: false, onClose: () => {}, children: "Content" },
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <FlowButton onClick={() => setOpen(true)}>Open (no handle)</FlowButton>
        <FlowBottomSheet
          {...args}
          open={open}
          onClose={() => setOpen(false)}
        >
          <p>This sheet has no drag handle. Close it via the X button or pressing Escape.</p>
        </FlowBottomSheet>
      </>
    );
  },
};

export const NoCloseButton: Story = {
  args: { open: false, title: "Persistent Sheet", showClose: false, onClose: () => {}, children: "Content" },
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <FlowButton onClick={() => setOpen(true)}>Open (no close button)</FlowButton>
        <FlowBottomSheet
          {...args}
          open={open}
          onClose={() => setOpen(false)}
        >
          <p>This sheet has no close button in the header. Tap the overlay or press Escape to close.</p>
        </FlowBottomSheet>
      </>
    );
  },
};

export const LongContent: Story = {
  args: { open: false, title: "Scrollable Content", onClose: () => {}, children: "Content" },
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <FlowButton onClick={() => setOpen(true)}>Open (long content)</FlowButton>
        <FlowBottomSheet
          {...args}
          open={open}
          onClose={() => setOpen(false)}
        >
          <div>
            {Array.from({ length: 20 }, (_, i) => (
              <p key={i}>Item {i + 1} — Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            ))}
          </div>
        </FlowBottomSheet>
      </>
    );
  },
};

import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { FlowPopover } from "../app/components/overlays";
import { FlowButton } from "../app/components/controls";

const meta = {
  title: "Overlays/FlowPopover",
  component: FlowPopover,
  argTypes: {
    placement: { control: "select", options: ["top", "bottom", "left", "right"] },
    align: { control: "select", options: ["start", "center", "end"] },
    offset: { control: "number" },
    closeOnOutsideClick: { control: "boolean" },
    closeOnEscape: { control: "boolean" },
  },
} satisfies Meta<typeof FlowPopover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    trigger: <FlowButton variant="medium">Toggle Popover</FlowButton>,
    children: (
      <div style={{ padding: "var(--sys-frame-padding-component, 16px)" }}>
        <p style={{ margin: 0 }}>Popover content goes here.</p>
      </div>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: /toggle popover/i });
    await expect(trigger).toBeInTheDocument();
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    const popoverDialog = canvas.getByRole("dialog");
    await expect(popoverDialog).toBeInTheDocument();
    await expect(canvas.getByText("Popover content goes here.")).toBeInTheDocument();
  },
};

export const Controlled: Story = {
  args: {
    trigger: <FlowButton variant="medium">Controlled Popover</FlowButton>,
    open: false,
    children: <div style={{ padding: "16px" }}>Controlled content</div>,
  },
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <FlowPopover
        {...args}
        open={open}
        onOpenChange={setOpen}
        trigger={<FlowButton variant="medium" onClick={() => setOpen(!open)}>Controlled Popover</FlowButton>}
      >
        <div style={{ padding: "var(--sys-frame-padding-component, 16px)" }}>
          <p style={{ margin: "0 0 12px" }}>This popover is controlled via state.</p>
          <FlowButton variant="high" onClick={() => setOpen(false)}>Close</FlowButton>
        </div>
      </FlowPopover>
    );
  },
};

export const Placements: Story = {
  args: {
    trigger: <FlowButton variant="medium">Popover</FlowButton>,
    children: <div style={{ padding: "16px" }}>Content</div>,
  },
  render: (args) => (
    <div style={{ display: "flex", gap: "var(--sys-frame-gap-component)", padding: "120px 60px", justifyContent: "center" }}>
      {(["top", "bottom", "left", "right"] as const).map((placement) => (
        <FlowPopover
          key={placement}
          {...args}
          placement={placement}
          trigger={<FlowButton variant="medium">{placement}</FlowButton>}
        >
          <div style={{ padding: "var(--sys-frame-padding-component, 16px)" }}>
            Placement: {placement}
          </div>
        </FlowPopover>
      ))}
    </div>
  ),
};

export const Alignments: Story = {
  args: {
    trigger: <FlowButton variant="medium">Popover</FlowButton>,
    children: <div style={{ padding: "16px" }}>Content</div>,
  },
  render: (args) => (
    <div style={{ display: "flex", gap: "var(--sys-frame-gap-component)", padding: "40px", justifyContent: "center" }}>
      {(["start", "center", "end"] as const).map((align) => (
        <FlowPopover
          key={align}
          {...args}
          align={align}
          trigger={<FlowButton variant="medium">align: {align}</FlowButton>}
        >
          <div style={{ padding: "var(--sys-frame-padding-component, 16px)" }}>
            Align: {align}
          </div>
        </FlowPopover>
      ))}
    </div>
  ),
};

export const WithRichContent: Story = {
  args: {
    trigger: <FlowButton variant="medium">User Profile</FlowButton>,
    children: (
      <div style={{ padding: "var(--sys-frame-padding-component, 16px)", minWidth: 200 }}>
        <div style={{ fontWeight: 600, marginBottom: 4 }}>Jane Doe</div>
        <div style={{ color: "var(--sys-energy-text-secondary)", fontSize: "0.875rem" }}>jane@example.com</div>
        <hr style={{ margin: "12px 0", border: "none", borderTop: "1px solid var(--sys-energy-border-default, #e0e0e0)" }} />
        <div style={{ fontSize: "0.875rem" }}>Settings</div>
        <div style={{ fontSize: "0.875rem", marginTop: 4 }}>Sign out</div>
      </div>
    ),
  },
};

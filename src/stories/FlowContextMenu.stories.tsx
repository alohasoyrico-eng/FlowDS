import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { FlowContextMenu } from "../app/components/overlays";

const sampleItems = [
  { key: "cut", label: "Cut", icon: "scissors", shortcut: "Ctrl+X" },
  { key: "copy", label: "Copy", icon: "copy", shortcut: "Ctrl+C" },
  { key: "paste", label: "Paste", icon: "clipboard", shortcut: "Ctrl+V", separator: true },
  { key: "delete", label: "Delete", icon: "trash", danger: true, shortcut: "Del" },
];

const meta = {
  title: "Overlays/FlowContextMenu",
  component: FlowContextMenu,
  argTypes: {
    label: { control: "text" },
  },
} satisfies Meta<typeof FlowContextMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: sampleItems,
    onSelect: () => {},
    children: (
      <div
        style={{
          padding: "40px",
          border: "2px dashed var(--sys-energy-border-default, #ccc)",
          borderRadius: "8px",
          textAlign: "center",
          color: "var(--sys-energy-text-secondary, #666)",
        }}
      >
        Right-click anywhere in this area
      </div>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const triggerArea = canvas.getByText("Right-click anywhere in this area");
    await expect(triggerArea).toBeInTheDocument();
    await userEvent.pointer({ keys: "[MouseRight]", target: triggerArea });
    const menu = await within(document.body).findByRole("menu");
    await expect(menu).toBeInTheDocument();
    const cutItem = within(menu).getByRole("menuitem", { name: /Cut/i });
    await expect(cutItem).toBeVisible();
  },
};

export const WithLabel: Story = {
  args: {
    items: sampleItems,
    onSelect: () => {},
    label: "Edit Actions",
    children: (
      <div
        style={{
          padding: "40px",
          border: "2px dashed var(--sys-energy-border-default, #ccc)",
          borderRadius: "8px",
          textAlign: "center",
          color: "var(--sys-energy-text-secondary, #666)",
        }}
      >
        Right-click for labeled context menu
      </div>
    ),
  },
};

export const WithDisabledItems: Story = {
  args: {
    items: [
      { key: "open", label: "Open", icon: "folder-open" },
      { key: "rename", label: "Rename", icon: "pencil" },
      { key: "move", label: "Move to...", disabled: true, separator: true },
      { key: "delete", label: "Delete", icon: "trash", danger: true, disabled: true },
    ],
    onSelect: () => {},
    children: (
      <div
        style={{
          padding: "40px",
          border: "2px dashed var(--sys-energy-border-default, #ccc)",
          borderRadius: "8px",
          textAlign: "center",
          color: "var(--sys-energy-text-secondary, #666)",
        }}
      >
        Right-click to see disabled items
      </div>
    ),
  },
};

export const WithDividers: Story = {
  args: {
    items: [
      { key: "undo", label: "Undo", shortcut: "Ctrl+Z" },
      { key: "redo", label: "Redo", shortcut: "Ctrl+Y" },
      { type: "divider" as const },
      { key: "cut", label: "Cut", shortcut: "Ctrl+X" },
      { key: "copy", label: "Copy", shortcut: "Ctrl+C" },
      { key: "paste", label: "Paste", shortcut: "Ctrl+V" },
      { type: "divider" as const },
      { key: "selectAll", label: "Select All", shortcut: "Ctrl+A" },
    ],
    onSelect: () => {},
    children: (
      <div
        style={{
          padding: "40px",
          border: "2px dashed var(--sys-energy-border-default, #ccc)",
          borderRadius: "8px",
          textAlign: "center",
          color: "var(--sys-energy-text-secondary, #666)",
        }}
      >
        Right-click for menu with divider groups
      </div>
    ),
  },
};

export const DangerVariant: Story = {
  args: {
    items: [
      { key: "archive", label: "Archive", icon: "archive" },
      { key: "hide", label: "Hide from feed", separator: true },
      { key: "report", label: "Report", icon: "flag", variant: "danger" },
      { key: "block", label: "Block user", icon: "slash", variant: "danger" },
    ],
    onSelect: () => {},
    children: (
      <div
        style={{
          padding: "40px",
          border: "2px dashed var(--sys-energy-border-default, #ccc)",
          borderRadius: "8px",
          textAlign: "center",
          color: "var(--sys-energy-text-secondary, #666)",
        }}
      >
        Right-click for danger-variant items
      </div>
    ),
  },
};

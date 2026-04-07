import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { FlowMenu } from "../app/components/overlays";
import { FlowButton } from "../app/components/controls";

const sampleItems = [
  { key: "edit", label: "Edit", icon: "pencil" },
  { key: "duplicate", label: "Duplicate", icon: "copy" },
  { key: "archive", label: "Archive", icon: "archive", separator: true },
  { key: "delete", label: "Delete", icon: "trash", danger: true },
];

const meta = {
  title: "Overlays/FlowMenu",
  component: FlowMenu,
  argTypes: {
    placement: {
      control: "select",
      options: ["bottom-start", "bottom-end", "top-start", "top-end"],
    },
    label: { control: "text" },
  },
} satisfies Meta<typeof FlowMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: sampleItems,
    onSelect: () => {},
    trigger: <FlowButton variant="medium">Open Menu</FlowButton>,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: "Open Menu" });
    await expect(trigger).toBeInTheDocument();
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    const menu = canvas.getByRole("menu");
    await expect(menu).toBeInTheDocument();
    const editItem = within(menu).getByRole("menuitem", { name: /Edit/i });
    await userEvent.click(editItem);
  },
};

export const WithLabel: Story = {
  args: {
    items: sampleItems,
    onSelect: () => {},
    trigger: <FlowButton variant="medium">Actions</FlowButton>,
    label: "Actions",
  },
};

export const WithCheckableItems: Story = {
  args: {
    items: [],
    onSelect: () => {},
    trigger: <FlowButton variant="medium">View Options</FlowButton>,
  },
  render: (args) => {
    const [checked, setChecked] = useState<Record<string, boolean>>({
      grid: true,
      list: false,
      compact: false,
    });
    const items = [
      { key: "grid", label: "Grid View", checked: checked.grid },
      { key: "list", label: "List View", checked: checked.list },
      { key: "compact", label: "Compact View", checked: checked.compact },
    ];
    return (
      <FlowMenu
        {...args}
        items={items}
        onSelect={(key) => setChecked((prev) => ({ ...prev, [key]: !prev[key] }))}
      />
    );
  },
};

export const WithTrailingShortcuts: Story = {
  args: {
    items: [
      { key: "cut", label: "Cut", icon: "scissors", trailing: "Ctrl+X" },
      { key: "copy", label: "Copy", icon: "copy", trailing: "Ctrl+C" },
      { key: "paste", label: "Paste", icon: "clipboard", trailing: "Ctrl+V", separator: true },
      { key: "selectAll", label: "Select All", trailing: "Ctrl+A" },
    ],
    onSelect: () => {},
    trigger: <FlowButton variant="medium">Edit</FlowButton>,
    label: "Edit",
  },
};

export const WithDisabledItems: Story = {
  args: {
    items: [
      { key: "open", label: "Open", icon: "folder-open" },
      { key: "save", label: "Save", icon: "save", disabled: true },
      { key: "export", label: "Export", icon: "download", disabled: true, separator: true },
      { key: "close", label: "Close" },
    ],
    onSelect: () => {},
    trigger: <FlowButton variant="medium">File</FlowButton>,
    label: "File",
  },
};

export const Placements: Story = {
  args: {
    items: sampleItems,
    onSelect: () => {},
    trigger: <FlowButton variant="medium">Menu</FlowButton>,
  },
  render: (args) => (
    <div style={{ display: "flex", gap: "var(--sys-frame-gap-component)", padding: "120px 40px" }}>
      {(["bottom-start", "bottom-end", "top-start", "top-end"] as const).map((placement) => (
        <FlowMenu
          key={placement}
          {...args}
          placement={placement}
          trigger={<FlowButton variant="medium">{placement}</FlowButton>}
        />
      ))}
    </div>
  ),
};

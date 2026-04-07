import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { FlowCommandPalette } from "../app/components/patterns";
import type { CommandItem } from "../app/components/patterns";

const sampleCommands: CommandItem[] = [
  { id: "new-file", label: "New File", icon: "file", shortcut: "Ctrl+N", group: "File" },
  { id: "open-file", label: "Open File", icon: "folder", shortcut: "Ctrl+O", group: "File" },
  { id: "save", label: "Save", icon: "check", shortcut: "Ctrl+S", group: "File" },
  { id: "undo", label: "Undo", icon: "rotate-ccw", shortcut: "Ctrl+Z", group: "Edit" },
  { id: "redo", label: "Redo", icon: "rotate-cw", shortcut: "Ctrl+Shift+Z", group: "Edit" },
  { id: "find", label: "Find", icon: "search", shortcut: "Ctrl+F", group: "Edit" },
  { id: "settings", label: "Settings", icon: "settings", shortcut: "Ctrl+,", group: "Preferences" },
  { id: "theme", label: "Toggle Theme", icon: "moon", group: "Preferences" },
];

const meta = {
  title: "Patterns/FlowCommandPalette",
  component: FlowCommandPalette,
  argTypes: {
    placeholder: { control: "text" },
    emptyMessage: { control: "text" },
  },
} satisfies Meta<typeof FlowCommandPalette>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: true,
    commands: sampleCommands,
    placeholder: "Type a command...",
    onClose: () => {},
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const dialog = canvas.getByRole("dialog", { name: /command palette/i });
    await expect(dialog).toBeInTheDocument();
    const combobox = canvas.getByRole("combobox");
    await expect(combobox).toBeInTheDocument();
    const options = canvas.getAllByRole("option");
    await expect(options.length).toBe(8);
    await userEvent.type(combobox, "Save");
    const filteredOptions = canvas.getAllByRole("option");
    await expect(filteredOptions.length).toBe(1);
  },
};

export const Interactive: Story = {
  args: {
    commands: sampleCommands,
    open: false,
    onClose: () => {},
  },
  render: (args) => {
    const [open, setOpen] = useState(false);
    const [lastCommand, setLastCommand] = useState<string | null>(null);
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
          Open Command Palette (Ctrl+K)
        </button>
        {lastCommand && (
          <p style={{ marginTop: "var(--sys-frame-gap-component)", fontSize: "var(--sys-voice-caption-size)", color: "var(--sys-energy-text-tertiary)" }}>
            Last command: {lastCommand}
          </p>
        )}
        <FlowCommandPalette
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          onSelect={(cmd) => setLastCommand(cmd.label)}
        />
      </div>
    );
  },
};

export const EmptyState: Story = {
  args: {
    open: true,
    commands: [],
    emptyMessage: "No commands available",
    onClose: () => {},
  },
};

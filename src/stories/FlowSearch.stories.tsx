import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { FlowSearch } from "../app/components/patterns";

const meta = {
  title: "Patterns/FlowSearch",
  component: FlowSearch,
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    placeholder: { control: "text" },
    shortcut: { control: "text" },
    clearable: { control: "boolean" },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
    autoFocus: { control: "boolean" },
  },
} satisfies Meta<typeof FlowSearch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { placeholder: "Search...", clearable: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox", { name: /search/i });
    await expect(input).toBeInTheDocument();
    await expect(input).toHaveAttribute("placeholder", "Search...");
    await userEvent.type(input, "design tokens");
    await expect(input).toHaveValue("design tokens");
    const clearButton = canvas.getByRole("button", { name: /clear search/i });
    await expect(clearButton).toBeInTheDocument();
  },
};

export const WithShortcut: Story = {
  args: { placeholder: "Search...", shortcut: "/" },
};

export const Loading: Story = {
  args: { placeholder: "Searching...", loading: true, value: "design tokens" },
};

export const Disabled: Story = {
  args: { placeholder: "Search...", disabled: true },
};

export const AllSizes: Story = {
  args: { placeholder: "Size demo" },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--sys-frame-gap-component)" }}>
      <FlowSearch size="sm" placeholder="Small search" />
      <FlowSearch size="md" placeholder="Medium search" />
      <FlowSearch size="lg" placeholder="Large search" />
    </div>
  ),
};

export const Controlled: Story = {
  args: { placeholder: "Type to search..." },
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--sys-frame-gap-component)" }}>
        <FlowSearch {...args} value={value} onChange={setValue} />
        <p style={{ fontSize: "var(--sys-voice-caption-size)", color: "var(--sys-energy-text-tertiary)" }}>
          Current value: &quot;{value}&quot;
        </p>
      </div>
    );
  },
};

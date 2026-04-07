import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { FlowAutocomplete } from "../app/components/patterns";

const sampleOptions = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
  { value: "solid", label: "SolidJS" },
  { value: "next", label: "Next.js", secondary: "React framework" },
  { value: "nuxt", label: "Nuxt", secondary: "Vue framework" },
];

const meta = {
  title: "Patterns/FlowAutocomplete",
  component: FlowAutocomplete,
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    label: { control: "text" },
    placeholder: { control: "text" },
    error: { control: "text" },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
    clearable: { control: "boolean" },
    showIcon: { control: "boolean" },
    highlightMatch: { control: "boolean" },
  },
} satisfies Meta<typeof FlowAutocomplete>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Framework",
    placeholder: "Select a framework...",
    options: sampleOptions,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const combobox = canvas.getByRole("combobox");
    await expect(combobox).toBeInTheDocument();
    await expect(combobox).toHaveAttribute("placeholder", "Select a framework...");
    await userEvent.click(combobox);
    const listbox = canvas.getByRole("listbox");
    await expect(listbox).toBeInTheDocument();
    await userEvent.type(combobox, "Rea");
    const options = canvas.getAllByRole("option");
    await expect(options.length).toBeGreaterThan(0);
  },
};

export const WithError: Story = {
  args: {
    label: "Framework",
    options: sampleOptions,
    error: "Please select a valid framework",
  },
};

export const Loading: Story = {
  args: {
    label: "Framework",
    options: sampleOptions,
    loading: true,
    placeholder: "Loading results...",
  },
};

export const Disabled: Story = {
  args: {
    label: "Framework",
    options: sampleOptions,
    disabled: true,
    value: "react",
  },
};

export const Controlled: Story = {
  args: {
    label: "Framework",
    options: sampleOptions,
    placeholder: "Pick one...",
  },
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--sys-frame-gap-component)" }}>
        <FlowAutocomplete {...args} value={value} onChange={setValue} />
        <p style={{ fontSize: "var(--sys-voice-caption-size)", color: "var(--sys-energy-text-tertiary)" }}>
          Selected: &quot;{value}&quot;
        </p>
      </div>
    );
  },
};

import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { FlowMultiSelect } from "../app/components/patterns";
import type { MultiSelectOption } from "../app/components/patterns";

const fruitOptions: MultiSelectOption[] = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
  { value: "grape", label: "Grape" },
  { value: "mango", label: "Mango" },
  { value: "orange", label: "Orange" },
  { value: "peach", label: "Peach" },
  { value: "pear", label: "Pear", disabled: true },
  { value: "strawberry", label: "Strawberry" },
];

const groupedOptions: MultiSelectOption[] = [
  { value: "js", label: "JavaScript", group: "Languages" },
  { value: "ts", label: "TypeScript", group: "Languages" },
  { value: "py", label: "Python", group: "Languages" },
  { value: "react", label: "React", group: "Frameworks" },
  { value: "vue", label: "Vue", group: "Frameworks" },
  { value: "angular", label: "Angular", group: "Frameworks" },
];

const meta = {
  title: "Patterns/FlowMultiSelect",
  component: FlowMultiSelect,
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg", "xl"] },
    label: { control: "text" },
    placeholder: { control: "text" },
    hint: { control: "text" },
    error: { control: "text" },
    success: { control: "boolean" },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
    readOnly: { control: "boolean" },
    searchable: { control: "boolean" },
    required: { control: "boolean" },
    maxDisplayChips: { control: "number" },
  },
} satisfies Meta<typeof FlowMultiSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Fruits",
    options: fruitOptions,
    placeholder: "Pick your favorites...",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("combobox", { name: /fruits/i });
    await expect(trigger).toBeInTheDocument();
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    const listbox = canvas.getByRole("listbox");
    await expect(listbox).toBeInTheDocument();
    const options = canvas.getAllByRole("option");
    await userEvent.click(options[0]);
  },
};

export const WithPreselected: Story = {
  args: {
    label: "Fruits",
    options: fruitOptions,
    defaultValue: ["apple", "cherry", "mango"],
  },
};

export const Grouped: Story = {
  args: {
    label: "Tech stack",
    options: groupedOptions,
    placeholder: "Select technologies...",
  },
};

export const WithError: Story = {
  args: {
    label: "Fruits",
    options: fruitOptions,
    error: "At least 2 selections required",
    defaultValue: ["apple"],
  },
};

export const Disabled: Story = {
  args: {
    label: "Fruits",
    options: fruitOptions,
    disabled: true,
    defaultValue: ["apple", "banana"],
  },
};

export const Loading: Story = {
  args: {
    label: "Fruits",
    options: fruitOptions,
    loading: true,
  },
};

export const Controlled: Story = {
  args: { label: "Fruits", options: fruitOptions, placeholder: "Select..." },
  render: (args) => {
    const [value, setValue] = useState<string[]>([]);
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--sys-frame-gap-component)", maxWidth: 400 }}>
        <FlowMultiSelect {...args} value={value} onChange={(vals) => setValue(vals)} />
        <p style={{ fontSize: "var(--sys-voice-caption-size)", color: "var(--sys-energy-text-tertiary)" }}>
          Selected: {value.length ? value.join(", ") : "(none)"}
        </p>
      </div>
    );
  },
};

import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { FlowSelect } from "../app/components/selection";

const countryOptions = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "mx", label: "Mexico" },
  { value: "gb", label: "United Kingdom" },
  { value: "de", label: "Germany" },
];

const meta = {
  title: "Selection/FlowSelect",
  component: FlowSelect,
  argTypes: {
    label: { control: "text" },
    placeholder: { control: "text" },
    hint: { control: "text" },
    error: { control: "text" },
    success: { control: "boolean" },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
    readOnly: { control: "boolean" },
    required: { control: "boolean" },
    size: { control: "select", options: ["sm", "md", "lg", "xl"] },
  },
} satisfies Meta<typeof FlowSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: "Country", options: countryOptions },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const combobox = canvas.getByRole("combobox");
    await expect(combobox).toBeInTheDocument();
    await expect(combobox).toHaveAttribute("aria-expanded", "false");
    await userEvent.click(combobox);
    await expect(combobox).toHaveAttribute("aria-expanded", "true");
    const option = canvas.getByRole("option", { name: "Canada" });
    await expect(option).toBeInTheDocument();
    await userEvent.click(option);
  },
};

export const WithHint: Story = {
  args: { label: "Country", options: countryOptions, hint: "Select your country of residence" },
};

export const WithError: Story = {
  args: { label: "Country", options: countryOptions, error: "Please select a country" },
};

export const Loading: Story = {
  args: { label: "Country", options: countryOptions, loading: true },
};

export const Disabled: Story = {
  args: { label: "Country", options: countryOptions, disabled: true },
};

export const Required: Story = {
  args: { label: "Country", options: countryOptions, required: true },
};

export const AllSizes: Story = {
  args: { label: "Size Demo", options: countryOptions },
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--sys-frame-gap-component)" }}>
      <FlowSelect {...args} label="Small" size="sm" />
      <FlowSelect {...args} label="Medium" size="md" />
      <FlowSelect {...args} label="Large" size="lg" />
      <FlowSelect {...args} label="Extra Large" size="xl" />
    </div>
  ),
};

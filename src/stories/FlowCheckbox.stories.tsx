import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { FlowCheckbox, FlowCheckboxGroup } from "../app/components/selection";

const meta = {
  title: "Selection/FlowCheckbox",
  component: FlowCheckbox,
  argTypes: {
    label: { control: "text" },
    checked: { control: "boolean" },
    indeterminate: { control: "boolean" },
    disabled: { control: "boolean" },
    error: { control: "boolean" },
    success: { control: "boolean" },
    loading: { control: "boolean" },
    required: { control: "boolean" },
    size: { control: "select", options: ["sm", "md", "lg", "xl"] },
  },
} satisfies Meta<typeof FlowCheckbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: "Accept terms" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole("checkbox");
    await expect(checkbox).toBeInTheDocument();
    await expect(checkbox).not.toBeChecked();
    await userEvent.click(checkbox);
    await expect(checkbox).toBeChecked();
    await userEvent.click(checkbox);
    await expect(checkbox).not.toBeChecked();
  },
};

export const Checked: Story = {
  args: { label: "Agreed", checked: true },
};

export const Indeterminate: Story = {
  args: { indeterminate: true, label: "Select all" },
};

export const WithError: Story = {
  args: { error: true, label: "Required" },
};

export const Group: Story = {
  args: { label: "Option A" },
  render: (args) => (
    <FlowCheckboxGroup aria-label="Preferences">
      <FlowCheckbox {...args} label="Option A" />
      <FlowCheckbox label="Option B" />
      <FlowCheckbox label="Option C" />
    </FlowCheckboxGroup>
  ),
};

export const Disabled: Story = {
  args: { disabled: true, label: "Unavailable" },
};

export const AllSizes: Story = {
  args: { label: "Size Demo" },
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--sys-frame-gap-component)" }}>
      <FlowCheckbox {...args} label="Small" size="sm" />
      <FlowCheckbox {...args} label="Medium" size="md" />
      <FlowCheckbox {...args} label="Large" size="lg" />
      <FlowCheckbox {...args} label="Extra Large" size="xl" />
    </div>
  ),
};

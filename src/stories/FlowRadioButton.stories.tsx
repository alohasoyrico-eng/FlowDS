import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { FlowRadioButton, FlowRadioGroup } from "../app/components/selection";

const meta = {
  title: "Selection/FlowRadioButton",
  component: FlowRadioButton,
  argTypes: {
    label: { control: "text" },
    value: { control: "text" },
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
    error: { control: "boolean" },
    size: { control: "select", options: ["sm", "md", "lg", "xl"] },
  },
} satisfies Meta<typeof FlowRadioButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: "Option 1", value: "option1" },
  render: (args) => (
    <FlowRadioGroup name="default-group" aria-label="Options">
      <FlowRadioButton {...args} value="option1" label="Option 1" />
      <FlowRadioButton value="option2" label="Option 2" />
      <FlowRadioButton value="option3" label="Option 3" />
    </FlowRadioGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const radioGroup = canvas.getByRole("radiogroup", { name: /options/i });
    await expect(radioGroup).toBeInTheDocument();
    const radios = canvas.getAllByRole("radio");
    await expect(radios).toHaveLength(3);
    await userEvent.click(radios[1]);
    await expect(radios[1]).toBeChecked();
    await userEvent.click(radios[2]);
    await expect(radios[2]).toBeChecked();
  },
};

export const Horizontal: Story = {
  args: { label: "Choice A", value: "a" },
  render: (args) => (
    <FlowRadioGroup name="horizontal-group" direction="row" aria-label="Choices">
      <FlowRadioButton {...args} value="a" label="Choice A" />
      <FlowRadioButton value="b" label="Choice B" />
      <FlowRadioButton value="c" label="Choice C" />
    </FlowRadioGroup>
  ),
};

export const Disabled: Story = {
  args: { label: "Disabled A", value: "a" },
  render: (args) => (
    <FlowRadioGroup name="disabled-group" disabled aria-label="Disabled options">
      <FlowRadioButton {...args} value="a" label="Disabled A" />
      <FlowRadioButton value="b" label="Disabled B" />
      <FlowRadioButton value="c" label="Disabled C" />
    </FlowRadioGroup>
  ),
};

export const WithError: Story = {
  args: { label: "Error A", value: "a", error: true },
  render: (args) => (
    <FlowRadioGroup name="error-group" aria-label="Error options">
      <FlowRadioButton {...args} value="a" label="Error A" error />
      <FlowRadioButton value="b" label="Error B" error />
      <FlowRadioButton value="c" label="Error C" error />
    </FlowRadioGroup>
  ),
};

export const AllSizes: Story = {
  args: { label: "Size Demo", value: "demo" },
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--sys-frame-gap-component)" }}>
      <FlowRadioGroup name="size-sm" aria-label="Small" size="sm">
        <FlowRadioButton {...args} value="a" label="Small A" />
        <FlowRadioButton value="b" label="Small B" />
      </FlowRadioGroup>
      <FlowRadioGroup name="size-md" aria-label="Medium" size="md">
        <FlowRadioButton value="a" label="Medium A" />
        <FlowRadioButton value="b" label="Medium B" />
      </FlowRadioGroup>
      <FlowRadioGroup name="size-lg" aria-label="Large" size="lg">
        <FlowRadioButton value="a" label="Large A" />
        <FlowRadioButton value="b" label="Large B" />
      </FlowRadioGroup>
      <FlowRadioGroup name="size-xl" aria-label="Extra Large" size="xl">
        <FlowRadioButton value="a" label="Extra Large A" />
        <FlowRadioButton value="b" label="Extra Large B" />
      </FlowRadioGroup>
    </div>
  ),
};

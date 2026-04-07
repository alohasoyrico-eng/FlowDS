import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { FlowTextInput } from "../app/components/inputs";

const meta = {
  title: "Inputs/FlowTextInput",
  component: FlowTextInput,
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg", "xl"] },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
    label: { control: "text" },
    placeholder: { control: "text" },
    hint: { control: "text" },
    error: { control: "text" },
  },
} satisfies Meta<typeof FlowTextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: "Email", placeholder: "you@example.com", size: "md" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox");
    await expect(input).toBeInTheDocument();
    await expect(input).toHaveAttribute("placeholder", "you@example.com");
    await userEvent.click(input);
    await userEvent.type(input, "test@flow.dev");
    await expect(input).toHaveValue("test@flow.dev");
  },
};

export const WithHint: Story = {
  args: { label: "Password", placeholder: "Enter password", hint: "Minimum 8 characters", size: "md" },
};

export const WithError: Story = {
  args: { label: "Email", placeholder: "you@example.com", error: "Invalid email address", size: "md" },
};

export const Disabled: Story = {
  args: { label: "Username", placeholder: "Disabled", disabled: true, size: "md" },
};

export const AllSizes: Story = {
  args: { label: "Size Demo" },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--sys-frame-gap-component)" }}>
      <FlowTextInput label="Small" placeholder="sm" size="sm" />
      <FlowTextInput label="Medium" placeholder="md" size="md" />
      <FlowTextInput label="Large" placeholder="lg" size="lg" />
      <FlowTextInput label="Extra Large" placeholder="xl" size="xl" />
    </div>
  ),
};

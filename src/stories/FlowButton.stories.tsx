import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { FlowButton } from "../app/components/controls";

const meta = {
  title: "Controls/FlowButton",
  component: FlowButton,
  argTypes: {
    variant: {
      control: "select",
      options: ["high", "medium", "low", "outline", "danger", "warning", "ghost"],
    },
    size: { control: "select", options: ["sm", "md", "lg", "xl"] },
    disabled: { control: "boolean" },
    loading: { control: "boolean" },
    fullWidth: { control: "boolean" },
    leadingIcon: { control: "text" },
  },
} satisfies Meta<typeof FlowButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const High: Story = {
  args: { variant: "high", children: "Primary Action" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "Primary Action" });
    await expect(button).toBeInTheDocument();
    await expect(button).toHaveAttribute("data-variant", "high");
    await expect(button).not.toBeDisabled();
    await userEvent.click(button);
    await expect(button).toBeVisible();
  },
};

export const Medium: Story = {
  args: { variant: "medium", children: "Secondary" },
};

export const Low: Story = {
  args: { variant: "low", children: "Tertiary" },
};

export const Outline: Story = {
  args: { variant: "outline", children: "Outline" },
};

export const Danger: Story = {
  args: { variant: "danger", children: "Delete" },
};

export const Warning: Story = {
  args: { variant: "warning", children: "Proceed with Caution" },
};

export const WithIcon: Story = {
  args: { variant: "high", children: "Save", leadingIcon: "check" },
};

export const Loading: Story = {
  args: { variant: "high", children: "Submit", loading: true, loadingLabel: "Submitting..." },
};

export const Disabled: Story = {
  args: { variant: "high", children: "Disabled", disabled: true },
};

export const AllSizes: Story = {
  args: { children: "Size Demo" },
  render: () => (
    <div style={{ display: "flex", gap: "var(--sys-frame-gap-component)", alignItems: "center" }}>
      <FlowButton variant="high" size="sm">Small</FlowButton>
      <FlowButton variant="high" size="md">Medium</FlowButton>
      <FlowButton variant="high" size="lg">Large</FlowButton>
      <FlowButton variant="high" size="xl">X-Large</FlowButton>
    </div>
  ),
};

export const AllEmphases: Story = {
  args: { children: "Emphasis Demo" },
  render: () => (
    <div style={{ display: "flex", gap: "var(--sys-frame-gap-component)", flexWrap: "wrap" }}>
      {(["high", "medium", "low", "outline", "danger", "warning", "ghost"] as const).map((e) => (
        <FlowButton key={e} variant={e}>{e}</FlowButton>
      ))}
    </div>
  ),
};

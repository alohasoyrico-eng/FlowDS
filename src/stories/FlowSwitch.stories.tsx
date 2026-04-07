import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { FlowSwitch } from "../app/components/selection";

const meta = {
  title: "Selection/FlowSwitch",
  component: FlowSwitch,
  argTypes: {
    label: { control: "text" },
    disabled: { control: "boolean" },
    size: { control: "select", options: ["sm", "md", "lg", "xl"] },
  },
} satisfies Meta<typeof FlowSwitch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: "Enable notifications" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const switchEl = canvas.getByRole("switch");
    await expect(switchEl).toBeInTheDocument();
    await expect(switchEl).toHaveAttribute("aria-checked", "false");
    await userEvent.click(switchEl);
    await expect(switchEl).toHaveAttribute("aria-checked", "true");
    await userEvent.click(switchEl);
    await expect(switchEl).toHaveAttribute("aria-checked", "false");
  },
};

export const Checked: Story = {
  args: { label: "Dark mode", checked: true },
};

export const Disabled: Story = {
  args: { label: "Feature flag", disabled: true },
};

import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { FlowSlider } from "../app/components/selection";

const meta = {
  title: "Selection/FlowSlider",
  component: FlowSlider,
  argTypes: {
    label: { control: "text" },
    defaultValue: { control: "number" },
    min: { control: "number" },
    max: { control: "number" },
    step: { control: "number" },
    showValue: { control: "boolean" },
    showMarks: { control: "boolean" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof FlowSlider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: "Volume", defaultValue: 50 },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const slider = canvas.getByRole("slider");
    await expect(slider).toBeInTheDocument();
    await expect(slider).toHaveAttribute("aria-valuenow", "50");
    await expect(slider).toHaveAttribute("aria-valuemin", "0");
    await expect(slider).toHaveAttribute("aria-valuemax", "100");
    const label = canvas.getByText("Volume");
    await expect(label).toBeInTheDocument();
  },
};

export const WithMarks: Story = {
  args: { label: "Brightness", defaultValue: 75, showMarks: true },
};

export const CustomRange: Story = {
  args: { label: "Price", min: 0, max: 1000, step: 50, defaultValue: 500 },
};

export const Disabled: Story = {
  args: { label: "Disabled slider", defaultValue: 30, disabled: true },
};

export const NoLabel: Story = {
  args: { "aria-label": "Brightness", defaultValue: 60 },
};

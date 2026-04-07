import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlowChip } from "../app/components/display";

const meta = {
  title: "Display/FlowChip",
  component: FlowChip,
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "neutral",
        "accent",
        "info",
        "success",
        "warning",
        "danger",
        "outlined",
        "tonal",
      ],
    },
    size: { control: "select", options: ["sm", "md", "lg", "xl"] },
    selected: { control: "boolean" },
    disabled: { control: "boolean" },
    removable: { control: "boolean" },
    icon: { control: "text" },
  },
} satisfies Meta<typeof FlowChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: "Chip" },
};

export const AllVariants: Story = {
  args: { children: "Variants" },
  render: () => (
    <div style={{ display: "flex", gap: "var(--sys-frame-gap-component)", flexWrap: "wrap" }}>
      {(
        ["default", "neutral", "accent", "info", "success", "warning", "danger", "outlined", "tonal"] as const
      ).map((v) => (
        <FlowChip key={v} variant={v}>
          {v}
        </FlowChip>
      ))}
    </div>
  ),
};

export const WithIcon: Story = {
  args: { children: "Starred", icon: "star" },
};

export const Removable: Story = {
  args: { children: "Remove me", removable: true },
};

export const Selected: Story = {
  args: { children: "Selected", selected: true, variant: "accent" },
};

export const Interactive: Story = {
  args: { children: "Click me", onClick: () => {} },
};

export const Disabled: Story = {
  args: { children: "Disabled", disabled: true },
};

export const AllSizes: Story = {
  args: { children: "Sizes" },
  render: () => (
    <div style={{ display: "flex", gap: "var(--sys-frame-gap-component)", alignItems: "center" }}>
      {(["sm", "md", "lg", "xl"] as const).map((s) => (
        <FlowChip key={s} size={s}>
          {s}
        </FlowChip>
      ))}
    </div>
  ),
};

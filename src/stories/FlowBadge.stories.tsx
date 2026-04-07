import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlowBadge } from "../app/components/display";
import { FlowIconButton } from "../app/components/controls";

const meta = {
  title: "Display/FlowBadge",
  component: FlowBadge,
  argTypes: {
    variant: { control: "select", options: ["dot", "count", "label"] },
    color: {
      control: "select",
      options: ["default", "secondary", "accent", "success", "warning", "error", "danger"],
    },
    max: { control: "number" },
    hidden: { control: "boolean" },
    standalone: { control: "boolean" },
  },
} satisfies Meta<typeof FlowBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { content: 5 },
  render: (args) => (
    <FlowBadge {...args}>
      <FlowIconButton icon="bell" aria-label="Notifications" />
    </FlowBadge>
  ),
};

export const DotVariant: Story = {
  args: { variant: "dot" },
  render: (args) => (
    <FlowBadge {...args}>
      <FlowIconButton icon="bell" aria-label="Notifications" />
    </FlowBadge>
  ),
};

export const AllColors: Story = {
  args: { content: 8 },
  render: () => (
    <div style={{ display: "flex", gap: "var(--sys-frame-gap-section)", flexWrap: "wrap" }}>
      {(["default", "secondary", "accent", "success", "warning", "error", "danger"] as const).map(
        (c) => (
          <FlowBadge key={c} content={8} color={c}>
            <FlowIconButton icon="bell" aria-label={c} />
          </FlowBadge>
        ),
      )}
    </div>
  ),
};

export const MaxCount: Story = {
  args: { content: 150, max: 99 },
  render: (args) => (
    <FlowBadge {...args}>
      <FlowIconButton icon="mail" aria-label="Messages" />
    </FlowBadge>
  ),
};

export const Standalone: Story = {
  args: { standalone: true, content: 3 },
};

export const Hidden: Story = {
  args: { content: 5, hidden: true },
  render: (args) => (
    <FlowBadge {...args}>
      <FlowIconButton icon="bell" aria-label="Notifications" />
    </FlowBadge>
  ),
};

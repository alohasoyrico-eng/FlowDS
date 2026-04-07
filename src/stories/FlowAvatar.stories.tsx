import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlowAvatar } from "../app/components/display";

const meta = {
  title: "Display/FlowAvatar",
  component: FlowAvatar,
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg", "xl"] },
    shape: { control: "select", options: ["circle", "square"] },
    status: { control: "select", options: ["online", "offline", "busy", "away"] },
    icon: { control: "text" },
    initials: { control: "text" },
    name: { control: "text" },
    src: { control: "text" },
  },
} satisfies Meta<typeof FlowAvatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { name: "John Doe" },
};

export const WithInitials: Story = {
  args: { initials: "JD" },
};

export const WithStatus: Story = {
  args: { status: "online", name: "Jane" },
};

export const Square: Story = {
  args: { shape: "square", name: "AI" },
};

export const FallbackIcon: Story = {
  args: { icon: "user" },
};

export const AllSizes: Story = {
  args: { name: "Sizes" },
  render: () => (
    <div style={{ display: "flex", gap: "var(--sys-frame-gap-component)", alignItems: "center" }}>
      {(["sm", "md", "lg", "xl"] as const).map((s) => (
        <FlowAvatar key={s} size={s} name="John Doe" />
      ))}
    </div>
  ),
};

export const AllStatuses: Story = {
  args: { name: "Statuses" },
  render: () => (
    <div style={{ display: "flex", gap: "var(--sys-frame-gap-component)", alignItems: "center" }}>
      {(["online", "offline", "busy", "away"] as const).map((st) => (
        <FlowAvatar key={st} name={st} status={st} />
      ))}
    </div>
  ),
};

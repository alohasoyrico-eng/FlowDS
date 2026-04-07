import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlowIconButton } from "../app/components/controls";

const meta = {
  title: "Controls/FlowIconButton",
  component: FlowIconButton,
  argTypes: {
    icon: { control: "text" },
    variant: { control: "select", options: ["high", "medium", "low", "outline", "danger", "warning", "ghost"] },
    size: { control: "select", options: ["sm", "md", "lg", "xl"] },
    disabled: { control: "boolean" },
    loading: { control: "boolean" },
    selected: { control: "boolean" },
    tooltip: { control: "text" },
  },
} satisfies Meta<typeof FlowIconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { icon: "settings", "aria-label": "Settings" },
};

export const AllEmphases: Story = {
  args: { icon: "settings", "aria-label": "Settings" },
  render: () => (
    <div style={{ display: "flex", gap: "var(--ref-frame-space-3)", alignItems: "center" }}>
      <FlowIconButton icon="settings" variant="high" aria-label="High" />
      <FlowIconButton icon="settings" variant="medium" aria-label="Medium" />
      <FlowIconButton icon="settings" variant="low" aria-label="Low" />
      <FlowIconButton icon="settings" variant="outline" aria-label="Outline" />
      <FlowIconButton icon="settings" variant="danger" aria-label="Danger" />
      <FlowIconButton icon="settings" variant="warning" aria-label="Warning" />
      <FlowIconButton icon="settings" variant="ghost" aria-label="Ghost" />
    </div>
  ),
};

export const AllSizes: Story = {
  args: { icon: "settings", "aria-label": "Settings" },
  render: () => (
    <div style={{ display: "flex", gap: "var(--ref-frame-space-3)", alignItems: "center" }}>
      <FlowIconButton icon="settings" size="sm" aria-label="Small" />
      <FlowIconButton icon="settings" size="md" aria-label="Medium" />
      <FlowIconButton icon="settings" size="lg" aria-label="Large" />
      <FlowIconButton icon="settings" size="xl" aria-label="Extra Large" />
    </div>
  ),
};

export const WithBadge: Story = {
  args: { icon: "bell", badge: 3, "aria-label": "Notifications" },
};

export const WithTooltip: Story = {
  args: { icon: "settings", tooltip: "Open settings", "aria-label": "Settings" },
};

export const Selected: Story = {
  args: { icon: "star", selected: true, "aria-label": "Favorite" },
};

export const Loading: Story = {
  args: { icon: "refresh-cw", loading: true, "aria-label": "Refreshing" },
};

export const Disabled: Story = {
  args: { icon: "settings", disabled: true, "aria-label": "Settings" },
};

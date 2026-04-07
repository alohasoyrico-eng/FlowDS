import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlowBottomNav } from "../app/components/navigation";

const meta = {
  title: "Navigation/FlowBottomNav",
  component: FlowBottomNav,
  argTypes: {
    showLabels: { control: "boolean" },
    activeKey: { control: "text" },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 420, border: "1px solid var(--sys-energy-border-default)", borderRadius: 12 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FlowBottomNav>;

export default meta;
type Story = StoryObj<typeof meta>;

const navItems = [
  { key: "home", icon: "home", label: "Home" },
  { key: "search", icon: "search", label: "Search" },
  { key: "notifications", icon: "bell", label: "Alerts" },
  { key: "profile", icon: "user", label: "Profile" },
];

export const Default: Story = {
  args: {
    items: navItems,
    activeKey: "home",
    onChange: () => {},
  },
};

export const WithBadge: Story = {
  args: {
    items: [
      { key: "home", icon: "home", label: "Home" },
      { key: "search", icon: "search", label: "Search" },
      { key: "notifications", icon: "bell", label: "Alerts", badge: 5 },
      { key: "messages", icon: "message-circle", label: "Messages", badge: 0 },
      { key: "profile", icon: "user", label: "Profile" },
    ],
    activeKey: "home",
    onChange: () => {},
  },
};

export const ActiveItem: Story = {
  args: {
    items: navItems,
    activeKey: "notifications",
    onChange: () => {},
  },
};

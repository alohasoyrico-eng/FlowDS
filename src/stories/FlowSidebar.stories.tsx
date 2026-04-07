import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlowSidebar } from "../app/components/navigation";

const meta = {
  title: "Navigation/FlowSidebar",
  component: FlowSidebar,
  argTypes: {
    collapsed: { control: "boolean" },
    activeItem: { control: "text" },
  },
  decorators: [
    (Story) => (
      <div style={{ height: 480, display: "flex" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FlowSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

const sidebarItems = [
  { id: "dashboard", label: "Dashboard", icon: "layout-dashboard" },
  { id: "inbox", label: "Inbox", icon: "inbox" },
  { id: "calendar", label: "Calendar", icon: "calendar" },
  { id: "analytics", label: "Analytics", icon: "bar-chart-2" },
  { id: "settings", label: "Settings", icon: "settings" },
];

export const Default: Story = {
  args: {
    items: sidebarItems,
    activeItem: "dashboard",
    header: "Flow App",
  },
};

export const Collapsed: Story = {
  args: {
    items: sidebarItems,
    activeItem: "inbox",
    collapsed: true,
    header: "F",
  },
};

export const WithSections: Story = {
  args: {
    sections: [
      {
        title: "Main",
        items: [
          { id: "home", label: "Home", icon: "home" },
          { id: "search", label: "Search", icon: "search" },
        ],
      },
      {
        title: "Management",
        items: [
          { id: "users", label: "Users", icon: "users" },
          { id: "roles", label: "Roles", icon: "shield" },
          { id: "logs", label: "Audit Logs", icon: "scroll-text" },
        ],
      },
    ],
    activeItem: "home",
    header: "Admin Panel",
  },
};

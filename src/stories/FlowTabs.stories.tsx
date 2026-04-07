import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { FlowTabs } from "../app/components/navigation";

const meta = {
  title: "Navigation/FlowTabs",
  component: FlowTabs,
  argTypes: {
    variant: { control: "select", options: ["line", "filled"] },
    size: { control: "select", options: ["sm", "md", "lg", "xl"] },
  },
} satisfies Meta<typeof FlowTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tabs: [
      { key: "overview", label: "Overview", content: "Overview panel content goes here." },
      { key: "features", label: "Features", content: "Features panel content goes here." },
      { key: "pricing", label: "Pricing", content: "Pricing panel content goes here." },
    ],
    defaultActiveKey: "overview",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const overviewTab = canvas.getByRole("tab", { name: "Overview" });
    await expect(overviewTab).toHaveAttribute("aria-selected", "true");
    const featuresTab = canvas.getByRole("tab", { name: "Features" });
    await expect(featuresTab).toHaveAttribute("aria-selected", "false");
    await userEvent.click(featuresTab);
    await expect(featuresTab).toHaveAttribute("aria-selected", "true");
    await expect(overviewTab).toHaveAttribute("aria-selected", "false");
  },
};

export const WithIcons: Story = {
  args: {
    tabs: [
      { key: "home", label: "Home", icon: "home", content: "Welcome home." },
      { key: "settings", label: "Settings", icon: "settings", content: "Application settings." },
      { key: "profile", label: "Profile", icon: "user", content: "User profile details." },
    ],
    defaultActiveKey: "home",
  },
};

export const FilledVariant: Story = {
  args: {
    tabs: [
      { key: "all", label: "All", content: "All items listed here." },
      { key: "active", label: "Active", content: "Active items only." },
      { key: "archived", label: "Archived", content: "Archived items." },
    ],
    variant: "filled",
    defaultActiveKey: "all",
  },
};

export const DisabledTab: Story = {
  args: {
    tabs: [
      { key: "available", label: "Available", content: "This tab is available." },
      { key: "restricted", label: "Restricted", disabled: true, content: "You cannot access this." },
      { key: "open", label: "Open", content: "This tab is open to everyone." },
    ],
    defaultActiveKey: "available",
  },
};

export const AllSizes: Story = {
  args: {
    tabs: [
      { key: "one", label: "Tab One", content: "Content for tab one." },
      { key: "two", label: "Tab Two", content: "Content for tab two." },
    ],
  },
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--sys-frame-gap-section)" }}>
      {(["sm", "md", "lg", "xl"] as const).map((size) => (
        <div key={size}>
          <div style={{ marginBottom: "var(--ref-frame-space-2)", fontWeight: 600 }}>size=&quot;{size}&quot;</div>
          <FlowTabs {...args} size={size} defaultActiveKey="one" />
        </div>
      ))}
    </div>
  ),
};

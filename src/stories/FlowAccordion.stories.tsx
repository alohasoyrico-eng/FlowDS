import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { FlowAccordion } from "../app/components/layout";

const meta = {
  title: "Layout/FlowAccordion",
  component: FlowAccordion,
  argTypes: {
    multiple: { control: "boolean" },
    bordered: { control: "boolean" },
    size: { control: "select", options: ["sm", "md", "lg", "xl"] },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof FlowAccordion>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultItems = [
  {
    key: "shipping",
    label: "Shipping Information",
    content: "We offer free standard shipping on all orders over $50. Express and overnight options are available at checkout.",
  },
  {
    key: "returns",
    label: "Returns & Exchanges",
    content: "Items can be returned within 30 days of purchase. Please keep all original packaging for a full refund.",
  },
  {
    key: "warranty",
    label: "Warranty Details",
    content: "All products come with a one-year limited warranty covering manufacturing defects.",
  },
];

export const Default: Story = {
  args: {
    items: defaultItems,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const shippingTrigger = canvas.getByRole("button", { name: /Shipping Information/i });
    await expect(shippingTrigger).toBeInTheDocument();
    await expect(shippingTrigger).toHaveAttribute("aria-expanded", "false");
    await userEvent.click(shippingTrigger);
    await expect(shippingTrigger).toHaveAttribute("aria-expanded", "true");
    const region = canvas.getByRole("region");
    await expect(region).toBeVisible();
  },
};

export const Multiple: Story = {
  args: {
    items: defaultItems,
    multiple: true,
    defaultExpandedKeys: ["shipping", "returns"],
  },
};

export const SingleItem: Story = {
  args: {
    title: "Frequently Asked Questions",
    children: "Here you will find answers to the most common questions about our products and services.",
  },
};

export const DefaultExpanded: Story = {
  args: {
    items: defaultItems,
    defaultExpandedKeys: ["shipping"],
  },
};

export const WithIcons: Story = {
  args: {
    items: [
      {
        key: "personal",
        label: "Personal Information",
        icon: "user",
        content: "Name, email, and contact details.",
      },
      {
        key: "security",
        label: "Security Settings",
        icon: "shield",
        content: "Password, two-factor authentication, and login history.",
      },
      {
        key: "notifications",
        label: "Notification Preferences",
        icon: "bell",
        content: "Configure email and push notification settings.",
      },
    ],
  },
};

export const AllSizes: Story = {
  args: {
    items: [
      { key: "item", label: "Accordion Item", content: "Sample content for size comparison." },
    ],
  },
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--sys-frame-gap-section)" }}>
      {(["sm", "md", "lg", "xl"] as const).map((size) => (
        <div key={size}>
          <div style={{ marginBottom: "var(--ref-frame-space-2)", fontWeight: 600 }}>size=&quot;{size}&quot;</div>
          <FlowAccordion {...args} size={size} defaultExpandedKeys={["item"]} />
        </div>
      ))}
    </div>
  ),
};

export const Bordered: Story = {
  args: {
    items: defaultItems,
    bordered: true,
    defaultExpandedKeys: ["shipping"],
  },
};

export const Unbordered: Story = {
  args: {
    items: defaultItems,
    bordered: false,
    defaultExpandedKeys: ["shipping"],
  },
};

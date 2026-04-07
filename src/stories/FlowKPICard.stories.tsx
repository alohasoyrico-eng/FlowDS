import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlowKPICard } from "../app/components/patterns";

const meta = {
  title: "Patterns/FlowKPICard",
  component: FlowKPICard,
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    value: { control: "text" },
    label: { control: "text" },
    description: { control: "text" },
    trend: { control: "select", options: ["up", "down", "neutral"] },
    trendValue: { control: "text" },
    upIsGood: { control: "boolean" },
    icon: { control: "text" },
    loading: { control: "boolean" },
  },
} satisfies Meta<typeof FlowKPICard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Total Revenue",
    value: "$48,250",
    trend: "up",
    trendValue: "+12.5%",
    description: "vs last month",
  },
};

export const TrendDown: Story = {
  args: {
    label: "Churn Rate",
    value: "3.2%",
    trend: "down",
    trendValue: "-0.8%",
    upIsGood: false,
    description: "vs last quarter",
  },
};

export const WithIcon: Story = {
  args: {
    label: "Active Users",
    value: "12,847",
    icon: "users",
    trend: "up",
    trendValue: "+5.3%",
    description: "30-day average",
  },
};

export const Neutral: Story = {
  args: {
    label: "Conversion Rate",
    value: "4.2%",
    trend: "neutral",
    trendValue: "0.0%",
    description: "no change",
  },
};

export const Loading: Story = {
  args: {
    label: "Revenue",
    value: "$0",
    loading: true,
  },
};

export const Clickable: Story = {
  args: {
    label: "Open Tickets",
    value: "23",
    icon: "alert-circle",
    trend: "up",
    trendValue: "+4",
    description: "since yesterday",
    onClick: () => alert("Navigating to tickets..."),
  },
};

export const AllSizes: Story = {
  args: { label: "Size demo", value: "$48,250" },
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--sys-frame-gap-component)" }}>
      <FlowKPICard size="sm" label="Small" value="1,234" trend="up" trendValue="+5%" />
      <FlowKPICard size="md" label="Medium" value="5,678" trend="down" trendValue="-3%" />
      <FlowKPICard size="lg" label="Large" value="$99,999" trend="up" trendValue="+12%" />
    </div>
  ),
};

import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlowDateRangePicker } from "../app/components/patterns";

const meta = {
  title: "Patterns/FlowDateRangePicker",
  component: FlowDateRangePicker,
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg", "xl"] },
    disabled: { control: "boolean" },
    error: { control: "boolean" },
    label: { control: "text" },
  },
} satisfies Meta<typeof FlowDateRangePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Date range",
  },
};

export const WithValue: Story = {
  args: {
    label: "Report period",
    value: { start: "2026-03-01", end: "2026-03-31" },
    onChange: () => {},
  },
};

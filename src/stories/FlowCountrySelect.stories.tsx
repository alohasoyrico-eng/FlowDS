import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlowCountrySelect } from "../app/components/patterns";

const meta = {
  title: "Patterns/FlowCountrySelect",
  component: FlowCountrySelect,
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg", "xl"] },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
    error: { control: "text" },
  },
} satisfies Meta<typeof FlowCountrySelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Country",
    defaultValue: "US",
  },
};

export const WithError: Story = {
  args: {
    label: "Country",
    defaultValue: "US",
    error: "Please select a valid country",
    required: true,
  },
};

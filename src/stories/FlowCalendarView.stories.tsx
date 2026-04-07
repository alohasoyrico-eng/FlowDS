import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlowCalendarView } from "../app/components/patterns";

const meta = {
  title: "Patterns/FlowCalendarView",
  component: FlowCalendarView,
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    selectedDate: { control: "text" },
  },
} satisfies Meta<typeof FlowCalendarView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultMonth: "2026-04",
  },
};

export const WithEvents: Story = {
  args: {
    defaultMonth: "2026-04",
    events: [
      { id: "1", title: "Team standup", date: "2026-04-07", color: "#3b82f6" },
      { id: "2", title: "Sprint review", date: "2026-04-14", color: "#22c55e" },
      { id: "3", title: "Design sync", date: "2026-04-14", color: "#8b5cf6" },
      { id: "4", title: "Release", date: "2026-04-21", color: "#ef4444" },
    ],
  },
};

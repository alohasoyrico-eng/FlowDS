import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { FlowDatePicker } from "../app/components/patterns";

const meta = {
  title: "Patterns/FlowDatePicker",
  component: FlowDatePicker,
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg", "xl"] },
    label: { control: "text" },
    placeholder: { control: "text" },
    error: { control: "boolean" },
    errorMessage: { control: "text" },
    disabled: { control: "boolean" },
    min: { control: "text" },
    max: { control: "text" },
  },
} satisfies Meta<typeof FlowDatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: "Date", placeholder: "Select date" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: /date/i });
    await expect(trigger).toBeInTheDocument();
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    const calendarDialog = canvas.getByRole("dialog", { name: /date picker calendar/i });
    await expect(calendarDialog).toBeInTheDocument();
    const grid = canvas.getByRole("grid", { name: /calendar/i });
    await expect(grid).toBeInTheDocument();
  },
};

export const WithError: Story = {
  args: {
    label: "Start date",
    error: true,
    errorMessage: "Date is required",
  },
};

export const Disabled: Story = {
  args: {
    label: "Date",
    disabled: true,
    value: "2026-03-15",
  },
};

export const WithMinMax: Story = {
  args: {
    label: "Appointment",
    min: "2026-03-01",
    max: "2026-04-30",
    placeholder: "Pick a date in range",
  },
};

export const Controlled: Story = {
  args: { label: "Departure", placeholder: "Select departure date" },
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--sys-frame-gap-component)" }}>
        <FlowDatePicker {...args} value={value} onChange={setValue} />
        <p style={{ fontSize: "var(--sys-voice-caption-size)", color: "var(--sys-energy-text-tertiary)" }}>
          Selected ISO: &quot;{value}&quot;
        </p>
      </div>
    );
  },
};

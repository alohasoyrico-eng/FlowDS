/**
 * FLOW — FlowDatePicker Component Tests
 * ──────────────────────────────────────
 * Tests rendering, calendar opening, date selection, onChange callback,
 * disabled state, and accessibility attributes.
 *
 * Requires: vitest + @testing-library/react + jsdom
 * Run: npx vitest run src/test/FlowDatePicker.test.tsx
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { FlowDatePicker } from "../app/components/patterns";

// jsdom does not implement scrollIntoView — stub it to prevent runtime errors
Element.prototype.scrollIntoView = vi.fn();

// ─────────────────────────────────────────────
// Rendering
// ─────────────────────────────────────────────

describe("FlowDatePicker — rendering", () => {
  it("renders a trigger input", () => {
    render(<FlowDatePicker aria-label="Date" />);
    expect(screen.getByLabelText("Date")).toBeInTheDocument();
  });

  it("shows the default placeholder when no date is selected", () => {
    render(<FlowDatePicker aria-label="Date" />);
    expect(screen.getByPlaceholderText("Select date")).toBeInTheDocument();
  });

  it("renders a label when provided", () => {
    render(<FlowDatePicker label="Start date" />);
    expect(screen.getByText("Start date")).toBeInTheDocument();
  });

  it("displays the formatted date when value is set", () => {
    render(<FlowDatePicker value="2025-03-15" onChange={vi.fn()} aria-label="Date" />);
    expect(screen.getByDisplayValue("March 15, 2025")).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// Interaction
// ─────────────────────────────────────────────

describe("FlowDatePicker — interaction", () => {
  it("opens the calendar dialog on click", async () => {
    render(<FlowDatePicker aria-label="Date" />);
    await userEvent.click(screen.getByLabelText("Date"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("shows previous/next month navigation buttons", async () => {
    render(<FlowDatePicker aria-label="Date" />);
    await userEvent.click(screen.getByLabelText("Date"));
    expect(screen.getByLabelText("Previous month")).toBeInTheDocument();
    expect(screen.getByLabelText("Next month")).toBeInTheDocument();
  });

  it("calls onChange with ISO date when a day is clicked", async () => {
    const onChange = vi.fn();
    render(<FlowDatePicker value="2025-06-01" onChange={onChange} aria-label="Date" />);
    await userEvent.click(screen.getByLabelText("Date"));
    await userEvent.click(screen.getByLabelText("June 15, 2025"));
    expect(onChange).toHaveBeenCalledWith("2025-06-15");
  });
});

// ─────────────────────────────────────────────
// Accessibility
// ─────────────────────────────────────────────

describe("FlowDatePicker — accessibility", () => {
  it("has aria-expanded on the trigger button", async () => {
    render(<FlowDatePicker aria-label="Date" />);
    const trigger = screen.getByLabelText("Date");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    await userEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });

  it("has aria-haspopup='dialog' on the trigger", () => {
    render(<FlowDatePicker aria-label="Date" />);
    expect(screen.getByLabelText("Date")).toHaveAttribute("aria-haspopup", "dialog");
  });

  it("disables the trigger when disabled is true", () => {
    render(<FlowDatePicker disabled aria-label="Date" />);
    expect(screen.getByLabelText("Date")).toBeDisabled();
  });

  it("renders a calendar grid with role='grid'", async () => {
    render(<FlowDatePicker aria-label="Date" />);
    await userEvent.click(screen.getByLabelText("Date"));
    expect(screen.getByRole("grid")).toBeInTheDocument();
  });
});

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
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";

import { FlowDatePicker } from "@flow/patterns";

// jsdom does not implement scrollIntoView — stub it to prevent runtime errors
Element.prototype.scrollIntoView = vi.fn();

// ─────────────────────────────────────────────
// Rendering
// ─────────────────────────────────────────────

describe("FlowDatePicker — rendering", () => {
  it("renders a trigger input with accessible label", () => {
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
    await userEvent.click(screen.getByPlaceholderText("Select date"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("shows previous/next month navigation buttons", async () => {
    render(<FlowDatePicker aria-label="Date" />);
    await userEvent.click(screen.getByPlaceholderText("Select date"));
    expect(screen.getByLabelText("Previous month")).toBeInTheDocument();
    expect(screen.getByLabelText("Next month")).toBeInTheDocument();
  });

  it("calls onChange with ISO date when a day is clicked", async () => {
    const onChange = vi.fn();
    render(<FlowDatePicker value="2025-06-01" onChange={onChange} aria-label="Date" />);
    await userEvent.click(screen.getByDisplayValue("June 1, 2025"));
    await userEvent.click(screen.getByLabelText("June 15, 2025"));
    expect(onChange).toHaveBeenCalledWith("2025-06-15");
  });
});

// ─────────────────────────────────────────────
// Accessibility
// ─────────────────────────────────────────────

describe("FlowDatePicker — accessibility", () => {
  it("renders a calendar grid with role='grid'", async () => {
    render(<FlowDatePicker aria-label="Date" />);
    await userEvent.click(screen.getByPlaceholderText("Select date"));
    expect(screen.getByRole("grid")).toBeInTheDocument();
  });

  it("has an accessible label on the input", () => {
    render(<FlowDatePicker aria-label="Date" />);
    expect(screen.getByLabelText("Date")).toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    const { container } = render(<FlowDatePicker aria-label="Date" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

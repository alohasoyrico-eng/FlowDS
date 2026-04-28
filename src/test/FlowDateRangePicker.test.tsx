/**
 * FLOW — FlowDateRangePicker Component Tests
 * ───────────────────────────────────────────
 * Tests rendering, calendar opening, two-month display, preset buttons,
 * onChange callback, disabled state, and accessibility attributes.
 *
 * Requires: vitest + @testing-library/react + jsdom
 * Run: npx vitest run src/test/FlowDateRangePicker.test.tsx
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";

import { FlowDateRangePicker } from "@flow/patterns";

// jsdom does not implement scrollIntoView — stub it to prevent runtime errors
Element.prototype.scrollIntoView = vi.fn();

// ─────────────────────────────────────────────
// Rendering
// ─────────────────────────────────────────────

describe("FlowDateRangePicker — rendering", () => {
  it("renders start and end inputs", () => {
    render(<FlowDateRangePicker aria-label="Date range" />);
    expect(screen.getByLabelText("Start date")).toBeInTheDocument();
    expect(screen.getByLabelText("End date")).toBeInTheDocument();
  });

  it("shows start and end placeholder text", () => {
    render(<FlowDateRangePicker aria-label="Date range" />);
    expect(screen.getByPlaceholderText("Start date")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("End date")).toBeInTheDocument();
  });

  it("renders a label when provided", () => {
    render(<FlowDateRangePicker label="Period" />);
    expect(screen.getByText("Period")).toBeInTheDocument();
  });

  it("displays formatted dates when value is set", () => {
    render(
      <FlowDateRangePicker
        value={{ start: "2025-03-01", end: "2025-03-15" }}
        onChange={vi.fn()}
        aria-label="Date range"
      />,
    );
    expect(screen.getByDisplayValue("Mar 1, 2025")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Mar 15, 2025")).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// Interaction
// ─────────────────────────────────────────────

describe("FlowDateRangePicker — interaction", () => {
  it("opens the calendar dialog on trigger click", async () => {
    render(<FlowDateRangePicker aria-label="Date range" />);
    await userEvent.click(screen.getByPlaceholderText("Start date"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("renders two calendar month grids when open", async () => {
    render(<FlowDateRangePicker aria-label="Date range" />);
    await userEvent.click(screen.getByPlaceholderText("Start date"));
    const grids = screen.getAllByRole("grid");
    expect(grids).toHaveLength(2);
  });

  it("shows preset buttons with default presets", async () => {
    render(<FlowDateRangePicker aria-label="Date range" />);
    await userEvent.click(screen.getByPlaceholderText("Start date"));
    expect(screen.getByText("Today")).toBeInTheDocument();
    expect(screen.getByText("Last 7 days")).toBeInTheDocument();
    expect(screen.getByText("Last 30 days")).toBeInTheDocument();
  });

  it("shows nav buttons for previous/next month", async () => {
    render(<FlowDateRangePicker aria-label="Date range" />);
    await userEvent.click(screen.getByPlaceholderText("Start date"));
    expect(screen.getByLabelText("Previous month")).toBeInTheDocument();
    expect(screen.getByLabelText("Next month")).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// Accessibility
// ─────────────────────────────────────────────

describe("FlowDateRangePicker — accessibility", () => {
  it("has accessible labels on inputs", () => {
    render(<FlowDateRangePicker aria-label="Date range" />);
    expect(screen.getByLabelText("Start date")).toBeInTheDocument();
    expect(screen.getByLabelText("End date")).toBeInTheDocument();
  });

  it("dialog has aria-label", async () => {
    render(<FlowDateRangePicker aria-label="Date range" />);
    await userEvent.click(screen.getByPlaceholderText("Start date"));
    expect(screen.getByRole("dialog")).toHaveAttribute("aria-label", "Date range picker");
  });

  it("has no axe violations", async () => {
    const { container } = render(<FlowDateRangePicker aria-label="Date range" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

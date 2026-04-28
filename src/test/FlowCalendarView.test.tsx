/**
 * FLOW — FlowCalendarView Component Tests
 * ──────────────────────────────────────────────
 * Tests rendering, navigation, interaction, and accessibility.
 *
 * Requires: vitest + @testing-library/react + jsdom
 * Run: npx vitest run src/test/FlowCalendarView.test.tsx
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";

import { FlowCalendarView } from "@flow/patterns";

// ─────────────────────────────────────────────
// Rendering
// ─────────────────────────────────────────────

describe("FlowCalendarView — rendering", () => {
  it("shows month and year in header", () => {
    render(<FlowCalendarView defaultMonth="2024-01" />);
    expect(screen.getByText(/January 2024/)).toBeInTheDocument();
  });

  it("shows day-of-week headers", () => {
    render(<FlowCalendarView defaultMonth="2024-01" />);
    expect(screen.getByText("Sun")).toBeInTheDocument();
    expect(screen.getByText("Mon")).toBeInTheDocument();
    expect(screen.getByText("Sat")).toBeInTheDocument();
  });

  it("renders day cells", () => {
    render(<FlowCalendarView defaultMonth="2024-01" />);
    expect(screen.getByText("15")).toBeInTheDocument();
    expect(screen.getAllByText("31").length).toBeGreaterThanOrEqual(1);
  });
});

// ─────────────────────────────────────────────
// Navigation
// ─────────────────────────────────────────────

describe("FlowCalendarView — navigation", () => {
  it("previous month button changes month", async () => {
    const user = userEvent.setup();
    render(<FlowCalendarView defaultMonth="2024-01" />);
    expect(screen.getByText(/January 2024/)).toBeInTheDocument();
    await user.click(screen.getByLabelText("Previous month"));
    expect(screen.getByText(/December 2023/)).toBeInTheDocument();
  });

  it("next month button changes month", async () => {
    const user = userEvent.setup();
    render(<FlowCalendarView defaultMonth="2024-01" />);
    await user.click(screen.getByLabelText("Next month"));
    expect(screen.getByText(/February 2024/)).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// Interaction
// ─────────────────────────────────────────────

describe("FlowCalendarView — interaction", () => {
  it("clicking a date calls onSelectDate", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<FlowCalendarView defaultMonth="2024-01" onSelectDate={onSelect} />);
    const buttons = screen.getAllByRole("button").filter((btn) => btn.textContent?.trim() === "15");
    await user.click(buttons[0]);
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect.mock.calls[0][0]).toMatch(/\d{4}-\d{2}-15/);
  });
});

// ─────────────────────────────────────────────
// Props
// ─────────────────────────────────────────────

describe("FlowCalendarView — props", () => {
  it("defaultMonth sets initial display", () => {
    render(<FlowCalendarView defaultMonth="2024-01" />);
    expect(screen.getByText(/January 2024/)).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// Accessibility
// ─────────────────────────────────────────────

describe("FlowCalendarView — accessibility", () => {
  it("has no axe violations", async () => {
    const { container } = render(<FlowCalendarView defaultMonth="2024-01" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

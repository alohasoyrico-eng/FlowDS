/**
 * FLOW — FlowSegmentedControl Component Tests
 * ─────────────────────────────────────────────
 * Tests rendering, selection behavior, keyboard navigation,
 * and accessibility for the segmented control.
 *
 * Requires: vitest + @testing-library/react + jsdom
 * Run: npx vitest run src/test/FlowSegmentedControl.test.tsx
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";

import { FlowSegmentedControl } from "@flow/components";

const defaultOptions = [
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
];

// ─────────────────────────────────────────────
// Rendering
// ─────────────────────────────────────────────

describe("FlowSegmentedControl — rendering", () => {
  it("renders a group element", () => {
    render(<FlowSegmentedControl options={defaultOptions} />);
    expect(screen.getByRole("radiogroup")).toBeInTheDocument();
  });

  it("renders a button for each option", () => {
    render(<FlowSegmentedControl options={defaultOptions} />);
    expect(screen.getAllByRole("radio")).toHaveLength(3);
  });

  it("renders the label text for each option", () => {
    render(<FlowSegmentedControl options={defaultOptions} />);
    expect(screen.getByText("Day")).toBeInTheDocument();
    expect(screen.getByText("Week")).toBeInTheDocument();
    expect(screen.getByText("Month")).toBeInTheDocument();
  });

  it("selects the first option by default (uncontrolled)", () => {
    render(<FlowSegmentedControl options={defaultOptions} />);
    expect(screen.getByText("Day").closest("button")).toHaveAttribute("aria-checked", "true");
  });

  it("selects the controlled value", () => {
    render(<FlowSegmentedControl options={defaultOptions} value="week" />);
    expect(screen.getByText("Week").closest("button")).toHaveAttribute("aria-checked", "true");
    expect(screen.getByText("Day").closest("button")).toHaveAttribute("aria-checked", "false");
  });
});

// ─────────────────────────────────────────────
// Interaction
// ─────────────────────────────────────────────

describe("FlowSegmentedControl — interaction", () => {
  it("fires onChange with the selected value when an option is clicked", async () => {
    const onChange = vi.fn();
    render(<FlowSegmentedControl options={defaultOptions} value="day" onChange={onChange} />);
    await userEvent.click(screen.getByText("Month"));
    expect(onChange).toHaveBeenCalledWith("month");
  });

  it("does not fire onChange when clicking a disabled option", async () => {
    const onChange = vi.fn();
    const options = [
      { value: "a", label: "A" },
      { value: "b", label: "B", disabled: true },
    ];
    render(<FlowSegmentedControl options={options} value="a" onChange={onChange} />);
    await userEvent.click(screen.getByText("B"));
    expect(onChange).not.toHaveBeenCalled();
  });
});

// ─────────────────────────────────────────────
// Keyboard navigation
// ─────────────────────────────────────────────

describe("FlowSegmentedControl — keyboard navigation", () => {
  it("moves selection right with ArrowRight key", async () => {
    const onChange = vi.fn();
    render(<FlowSegmentedControl options={defaultOptions} value="day" onChange={onChange} />);
    const activeBtn = screen.getByText("Day").closest("button")!;
    activeBtn.focus();
    await userEvent.keyboard("{ArrowRight}");
    expect(onChange).toHaveBeenCalledWith("week");
  });

  it("wraps around from last to first with ArrowRight", async () => {
    const onChange = vi.fn();
    render(<FlowSegmentedControl options={defaultOptions} value="month" onChange={onChange} />);
    const activeBtn = screen.getByText("Month").closest("button")!;
    activeBtn.focus();
    await userEvent.keyboard("{ArrowRight}");
    expect(onChange).toHaveBeenCalledWith("day");
  });
});

// ─────────────────────────────────────────────
// Disabled option
// ─────────────────────────────────────────────

describe("FlowSegmentedControl — disabled option", () => {
  it("disables individual options with disabled flag", () => {
    const options = [
      { value: "a", label: "A" },
      { value: "b", label: "B", disabled: true },
    ];
    render(<FlowSegmentedControl options={options} />);
    expect(screen.getByText("B").closest("button")).toBeDisabled();
  });
});

// ─────────────────────────────────────────────
// ARIA & accessibility
// ─────────────────────────────────────────────

describe("FlowSegmentedControl — accessibility", () => {
  it("sets aria-label on the group", () => {
    render(<FlowSegmentedControl options={defaultOptions} aria-label="View mode" />);
    expect(screen.getByRole("radiogroup")).toHaveAttribute("aria-label", "View mode");
  });

  it("uses role='radio' and aria-checked on each segment button", () => {
    render(<FlowSegmentedControl options={defaultOptions} value="week" />);
    const radios = screen.getAllByRole("radio");
    expect(radios).toHaveLength(3);
    expect(radios[1]).toHaveAttribute("aria-checked", "true");
  });

  it("sets tabIndex=0 on the active segment and -1 on others", () => {
    render(<FlowSegmentedControl options={defaultOptions} value="week" />);
    const radios = screen.getAllByRole("radio");
    expect(radios[0]).toHaveAttribute("tabindex", "-1");
    expect(radios[1]).toHaveAttribute("tabindex", "0");
    expect(radios[2]).toHaveAttribute("tabindex", "-1");
  });

  it("has no axe violations", async () => {
    const { container } = render(<FlowSegmentedControl options={defaultOptions} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

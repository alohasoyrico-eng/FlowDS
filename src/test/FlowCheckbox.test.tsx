/**
 * FLOW — FlowCheckbox Component Tests
 * ─────────────────────────────────────
 * Tests rendering, checked state, accessibility, and interaction behavior.
 *
 * Requires: vitest + @testing-library/react + jsdom
 * Run: npx vitest run src/test/FlowCheckbox.test.tsx
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { FlowCheckbox } from "../app/components/selection";

// ─────────────────────────────────────────────
// Rendering
// ─────────────────────────────────────────────

describe("FlowCheckbox — rendering", () => {
  it("renders a checkbox accessible by role", () => {
    render(<FlowCheckbox aria-label="Accept terms" />);
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  it("renders label text when label prop is provided", () => {
    render(<FlowCheckbox label="I agree to the terms" />);
    expect(screen.getByText("I agree to the terms")).toBeInTheDocument();
  });

  it("associates the label with the checkbox via htmlFor", () => {
    render(<FlowCheckbox label="Subscribe" />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox.id).toBeTruthy();
    const label = screen.getByText("Subscribe").closest("label");
    expect(label).toHaveAttribute("for", checkbox.id);
  });
});

// ─────────────────────────────────────────────
// Checked state & onChange
// ─────────────────────────────────────────────

describe("FlowCheckbox — checked/onChange", () => {
  it("renders as checked when checked=true", () => {
    render(<FlowCheckbox checked={true} onChange={vi.fn()} aria-label="Check" />);
    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("renders as unchecked when checked=false", () => {
    render(<FlowCheckbox checked={false} onChange={vi.fn()} aria-label="Check" />);
    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });

  it("fires onChange with true when clicking an unchecked checkbox", async () => {
    const onChange = vi.fn();
    render(<FlowCheckbox checked={false} onChange={onChange} aria-label="Toggle" />);
    await userEvent.click(screen.getByRole("checkbox"));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("fires onChange with false when clicking a checked checkbox", async () => {
    const onChange = vi.fn();
    render(<FlowCheckbox checked={true} onChange={onChange} aria-label="Toggle" />);
    await userEvent.click(screen.getByRole("checkbox"));
    expect(onChange).toHaveBeenCalledWith(false);
  });
});

// ─────────────────────────────────────────────
// Disabled state
// ─────────────────────────────────────────────

describe("FlowCheckbox — disabled state", () => {
  it("disables the checkbox when disabled=true", () => {
    render(<FlowCheckbox disabled aria-label="Disabled" />);
    expect(screen.getByRole("checkbox")).toBeDisabled();
  });

  it("does not fire onChange when disabled", async () => {
    const onChange = vi.fn();
    render(<FlowCheckbox disabled onChange={onChange} aria-label="No click" />);
    await userEvent.click(screen.getByRole("checkbox"));
    expect(onChange).not.toHaveBeenCalled();
  });
});

// ─────────────────────────────────────────────
// ARIA & accessibility
// ─────────────────────────────────────────────

describe("FlowCheckbox — accessibility", () => {
  it("sets aria-invalid when error=true", () => {
    render(<FlowCheckbox error aria-label="Invalid" />);
    expect(screen.getByRole("checkbox")).toHaveAttribute("aria-invalid", "true");
  });

  it("does not set aria-invalid when error is falsy", () => {
    render(<FlowCheckbox aria-label="Valid" />);
    expect(screen.getByRole("checkbox")).not.toHaveAttribute("aria-invalid");
  });

  it("uses aria-label when no visible label is provided", () => {
    render(<FlowCheckbox aria-label="Standalone check" />);
    expect(screen.getByRole("checkbox")).toHaveAttribute("aria-label", "Standalone check");
  });
});

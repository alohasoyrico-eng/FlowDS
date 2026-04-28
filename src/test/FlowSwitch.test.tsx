/**
 * FLOW — FlowSwitch Component Tests
 * ───────────────────────────────────
 * Tests rendering, accessibility, states, and interaction behavior.
 *
 * Requires: vitest + @testing-library/react + jsdom
 * Run: npx vitest run src/test/FlowSwitch.test.tsx
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";

import { FlowSwitch } from "@flow/components";

// ─────────────────────────────────────────────
// Rendering
// ─────────────────────────────────────────────

describe("FlowSwitch — rendering", () => {
  it("renders with role='switch'", () => {
    render(<FlowSwitch aria-label="Toggle feature" />);
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  it("renders label text when label prop is provided", () => {
    render(<FlowSwitch label="Dark mode" />);
    expect(screen.getByText("Dark mode")).toBeInTheDocument();
  });

  it("has aria-checked='false' when unchecked", () => {
    render(<FlowSwitch checked={false} aria-label="Toggle" />);
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "false");
  });

  it("has aria-checked='true' when checked", () => {
    render(<FlowSwitch checked={true} aria-label="Toggle" />);
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "true");
  });
});

// ─────────────────────────────────────────────
// Interaction
// ─────────────────────────────────────────────

describe("FlowSwitch — interaction", () => {
  it("fires onChange with toggled value when clicked", async () => {
    const onChange = vi.fn();
    render(<FlowSwitch checked={false} onChange={onChange} aria-label="Toggle" />);
    await userEvent.click(screen.getByRole("switch"));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("toggles internal state in uncontrolled mode", async () => {
    render(<FlowSwitch aria-label="Toggle" />);
    const sw = screen.getByRole("switch");
    expect(sw).toHaveAttribute("aria-checked", "false");
    await userEvent.click(sw);
    expect(sw).toHaveAttribute("aria-checked", "true");
  });
});

// ─────────────────────────────────────────────
// Disabled state
// ─────────────────────────────────────────────

describe("FlowSwitch — disabled state", () => {
  it("is disabled when disabled prop is true", () => {
    render(<FlowSwitch disabled aria-label="Toggle" />);
    expect(screen.getByRole("switch")).toBeDisabled();
  });

  it("does not fire onChange when disabled", async () => {
    const onChange = vi.fn();
    render(<FlowSwitch disabled checked={false} onChange={onChange} aria-label="Toggle" />);
    await userEvent.click(screen.getByRole("switch"));
    expect(onChange).not.toHaveBeenCalled();
  });
});

// ─────────────────────────────────────────────
// Accessibility
// ─────────────────────────────────────────────

describe("FlowSwitch — accessibility", () => {
  it("has no axe violations", async () => {
    const { container } = render(<FlowSwitch aria-label="Toggle feature" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

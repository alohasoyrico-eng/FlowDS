/**
 * FLOW — FlowSlider Component Tests
 * ────────────────────────────────────
 * Tests rendering, value display, keyboard interaction, and accessibility.
 *
 * Requires: vitest + @testing-library/react + jsdom
 * Run: npx vitest run src/test/FlowSlider.test.tsx
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { FlowSlider } from "../app/components/selection";

// ─────────────────────────────────────────────
// Rendering
// ─────────────────────────────────────────────

describe("FlowSlider — rendering", () => {
  it("renders a slider role element", () => {
    render(<FlowSlider aria-label="Volume" />);
    expect(screen.getByRole("slider")).toBeInTheDocument();
  });

  it("renders label text when label prop is provided", () => {
    render(<FlowSlider label="Brightness" />);
    expect(screen.getByText("Brightness")).toBeInTheDocument();
  });

  it("shows the current value by default (showValue=true)", () => {
    render(<FlowSlider label="Volume" value={50} />);
    expect(screen.getByText("50")).toBeInTheDocument();
  });

  it("hides the value display when showValue=false", () => {
    render(<FlowSlider label="Volume" value={50} showValue={false} />);
    expect(screen.queryByText("50")).not.toBeInTheDocument();
  });

  it("formats the displayed value using formatValue", () => {
    render(<FlowSlider label="Price" value={75} formatValue={(v) => `$${v}`} />);
    expect(screen.getByText("$75")).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// ARIA attributes
// ─────────────────────────────────────────────

describe("FlowSlider — ARIA attributes", () => {
  it("sets aria-valuenow to the current value", () => {
    render(<FlowSlider aria-label="Volume" value={42} />);
    expect(screen.getByRole("slider")).toHaveAttribute("aria-valuenow", "42");
  });

  it("sets aria-valuemin and aria-valuemax from min/max props", () => {
    render(<FlowSlider aria-label="Range" min={10} max={200} />);
    const slider = screen.getByRole("slider");
    expect(slider).toHaveAttribute("aria-valuemin", "10");
    expect(slider).toHaveAttribute("aria-valuemax", "200");
  });

  it("uses aria-label when provided", () => {
    render(<FlowSlider aria-label="Custom label" />);
    expect(screen.getByRole("slider")).toHaveAttribute("aria-label", "Custom label");
  });

  it("uses label text as aria-label when no explicit aria-label", () => {
    render(<FlowSlider label="Opacity" />);
    expect(screen.getByRole("slider")).toHaveAttribute("aria-label", "Opacity");
  });
});

// ─────────────────────────────────────────────
// Disabled state
// ─────────────────────────────────────────────

describe("FlowSlider — disabled state", () => {
  it("sets tabIndex=-1 on the thumb when disabled", () => {
    render(<FlowSlider aria-label="Volume" disabled />);
    expect(screen.getByRole("slider")).toHaveAttribute("tabindex", "-1");
  });
});

// ─────────────────────────────────────────────
// Keyboard interaction
// ─────────────────────────────────────────────

describe("FlowSlider — keyboard interaction", () => {
  it("increments value with ArrowRight key", async () => {
    const onChange = vi.fn();
    render(<FlowSlider aria-label="Volume" value={50} step={5} onChange={onChange} />);
    const thumb = screen.getByRole("slider");
    thumb.focus();
    await userEvent.keyboard("{ArrowRight}");
    expect(onChange).toHaveBeenCalledWith(55);
  });

  it("decrements value with ArrowLeft key", async () => {
    const onChange = vi.fn();
    render(<FlowSlider aria-label="Volume" value={50} step={5} onChange={onChange} />);
    const thumb = screen.getByRole("slider");
    thumb.focus();
    await userEvent.keyboard("{ArrowLeft}");
    expect(onChange).toHaveBeenCalledWith(45);
  });

  it("jumps to min with Home key", async () => {
    const onChange = vi.fn();
    render(<FlowSlider aria-label="Volume" value={50} min={0} onChange={onChange} />);
    const thumb = screen.getByRole("slider");
    thumb.focus();
    await userEvent.keyboard("{Home}");
    expect(onChange).toHaveBeenCalledWith(0);
  });

  it("jumps to max with End key", async () => {
    const onChange = vi.fn();
    render(<FlowSlider aria-label="Volume" value={50} max={100} onChange={onChange} />);
    const thumb = screen.getByRole("slider");
    thumb.focus();
    await userEvent.keyboard("{End}");
    expect(onChange).toHaveBeenCalledWith(100);
  });
});

// ─────────────────────────────────────────────
// Marks
// ─────────────────────────────────────────────

describe("FlowSlider — marks", () => {
  it("shows min/max marks when showMarks=true", () => {
    render(<FlowSlider aria-label="Volume" min={0} max={100} showMarks showValue={false} />);
    expect(screen.getByText("0")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
  });
});

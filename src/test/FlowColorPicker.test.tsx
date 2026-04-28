/**
 * FLOW — FlowColorPicker Component Tests
 * ───────────────────────────────────────
 * Tests rendering of swatches, hex input, sliders,
 * onChange callback when swatch is clicked, and accessibility.
 *
 * Requires: vitest + @testing-library/react + jsdom
 * Run: npx vitest run src/test/FlowColorPicker.test.tsx
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";

import { FlowColorPicker } from "@flow/patterns";

// ─────────────────────────────────────────────
// Rendering
// ─────────────────────────────────────────────

describe("FlowColorPicker — rendering", () => {
  it("renders the hex input", () => {
    render(<FlowColorPicker />);
    expect(screen.getByLabelText("Hex color value")).toBeInTheDocument();
  });

  it("renders swatch buttons for default swatches", () => {
    render(<FlowColorPicker />);
    const swatches = screen.getAllByRole("button");
    expect(swatches.length).toBeGreaterThanOrEqual(10);
  });

  it("renders a label when provided", () => {
    render(<FlowColorPicker label="Pick a color" />);
    expect(screen.getByText("Pick a color")).toBeInTheDocument();
  });

  it("renders Hue, Saturation, and Lightness sliders", () => {
    render(<FlowColorPicker />);
    expect(screen.getByRole("slider", { name: "Hue" })).toBeInTheDocument();
    expect(screen.getByRole("slider", { name: "Saturation" })).toBeInTheDocument();
    expect(screen.getByRole("slider", { name: "Lightness" })).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// Interaction
// ─────────────────────────────────────────────

describe("FlowColorPicker — interaction", () => {
  it("calls onChange when a swatch is clicked", async () => {
    const onChange = vi.fn();
    render(<FlowColorPicker onChange={onChange} swatches={["#ef4444", "#3b82f6"]} />);
    await userEvent.click(screen.getByLabelText("Select color #ef4444"));
    expect(onChange).toHaveBeenCalledWith("#ef4444");
  });

  it("updates the hex input value when a swatch is clicked", async () => {
    render(<FlowColorPicker swatches={["#ef4444", "#3b82f6"]} />);
    await userEvent.click(screen.getByLabelText("Select color #ef4444"));
    expect(screen.getByLabelText("Hex color value")).toHaveValue("#ef4444");
  });

  it("displays the default color in hex input", () => {
    render(<FlowColorPicker defaultValue="#22c55e" />);
    expect(screen.getByLabelText("Hex color value")).toHaveValue("#22c55e");
  });

  it("renders custom swatches when provided", () => {
    render(<FlowColorPicker swatches={["#111111", "#222222"]} />);
    expect(screen.getByLabelText("Select color #111111")).toBeInTheDocument();
    expect(screen.getByLabelText("Select color #222222")).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// Accessibility
// ─────────────────────────────────────────────

describe("FlowColorPicker — accessibility", () => {
  it("swatch buttons have aria-label describing the color", () => {
    render(<FlowColorPicker swatches={["#ef4444"]} />);
    expect(screen.getByLabelText("Select color #ef4444")).toBeInTheDocument();
  });

  it("hex input has aria-label", () => {
    render(<FlowColorPicker />);
    expect(screen.getByLabelText("Hex color value")).toBeInTheDocument();
  });

  it("hue slider has slider role", () => {
    render(<FlowColorPicker />);
    const hue = screen.getByRole("slider", { name: "Hue" });
    expect(hue).toBeInTheDocument();
  });

  it("displays HSL values as text", () => {
    render(<FlowColorPicker defaultValue="#3b82f6" />);
    expect(screen.getByText(/HSL:/)).toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    const { container } = render(<FlowColorPicker />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

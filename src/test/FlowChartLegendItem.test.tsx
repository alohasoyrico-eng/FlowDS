/**
 * FLOW — FlowChartLegendItem Component Tests
 * ────────────────────────────────────────────
 * Tests rendering, color swatch, label, value, toggle behavior,
 * and hidden state.
 *
 * Requires: vitest + @testing-library/react + jsdom
 * Run: npx vitest run src/test/FlowChartLegendItem.test.tsx
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";

import { FlowChartLegendItem } from "@flow/components";

// ─────────────────────────────────────────────
// Rendering
// ─────────────────────────────────────────────

describe("FlowChartLegendItem — rendering", () => {
  it("renders the label text", () => {
    render(<FlowChartLegendItem color="#ff0000" label="Revenue" />);
    expect(screen.getByText("Revenue")).toBeInTheDocument();
  });

  it("renders the color swatch", () => {
    const { container } = render(<FlowChartLegendItem color="#ff0000" label="Revenue" />);
    const swatch = container.querySelector("span[style*='background']");
    expect(swatch).toBeInTheDocument();
    expect(swatch).toHaveStyle({ background: "#ff0000" });
  });

  it("renders the value when provided", () => {
    render(<FlowChartLegendItem color="#00ff00" label="Sales" value="$1,200" />);
    expect(screen.getByText("$1,200")).toBeInTheDocument();
  });

  it("does not render value text when value is omitted", () => {
    const { container } = render(<FlowChartLegendItem color="#00ff00" label="Sales" />);
    // Only label and swatch, no value element
    const texts = container.querySelectorAll("span");
    const hasValue = Array.from(texts).some((t) => t.textContent === "$1,200");
    expect(hasValue).toBe(false);
  });
});

// ─────────────────────────────────────────────
// States
// ─────────────────────────────────────────────

describe("FlowChartLegendItem — states", () => {
  it("applies reduced opacity when hidden=true", () => {
    const { container } = render(<FlowChartLegendItem color="#ff0000" label="Revenue" hidden />);
    const wrapper = container.firstElementChild;
    expect(wrapper).toHaveStyle({ opacity: "0.4" });
  });

  it("has full opacity when hidden=false", () => {
    const { container } = render(<FlowChartLegendItem color="#ff0000" label="Revenue" />);
    const wrapper = container.firstElementChild;
    expect(wrapper).toHaveStyle({ opacity: "1" });
  });

  it("shows pointer cursor when toggleable=true", () => {
    const { container } = render(
      <FlowChartLegendItem color="#ff0000" label="Revenue" toggleable onToggle={vi.fn()} />,
    );
    const wrapper = container.firstElementChild;
    expect(wrapper).toHaveStyle({ cursor: "pointer" });
  });

  it("does not show pointer cursor when toggleable is not set", () => {
    const { container } = render(<FlowChartLegendItem color="#ff0000" label="Revenue" />);
    const wrapper = container.firstElementChild;
    // cursor should not be "pointer"
    expect(wrapper?.getAttribute("style")).not.toContain("cursor: pointer");
  });
});

// ─────────────────────────────────────────────
// Interaction
// ─────────────────────────────────────────────

describe("FlowChartLegendItem — interaction", () => {
  it("calls onToggle when clicked and toggleable=true", async () => {
    const onToggle = vi.fn();
    render(<FlowChartLegendItem color="#ff0000" label="Revenue" toggleable onToggle={onToggle} />);
    await userEvent.click(screen.getByText("Revenue"));
    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it("does not call onToggle when clicked and toggleable is not set", async () => {
    const onToggle = vi.fn();
    render(<FlowChartLegendItem color="#ff0000" label="Revenue" onToggle={onToggle} />);
    await userEvent.click(screen.getByText("Revenue"));
    expect(onToggle).not.toHaveBeenCalled();
  });
});

// ─────────────────────────────────────────────
// Accessibility
// ─────────────────────────────────────────────

describe("FlowChartLegendItem — accessibility", () => {
  it("renders inline (as a span element)", () => {
    const { container } = render(<FlowChartLegendItem color="#ff0000" label="Revenue" />);
    expect(container.firstElementChild?.tagName).toBe("SPAN");
  });

  it("color swatch has round shape (border-radius)", () => {
    const { container } = render(<FlowChartLegendItem color="#ff0000" label="Revenue" />);
    const swatch = container.querySelector("span[style*='background']");
    expect(swatch).toHaveStyle({ borderRadius: "var(--sys-frame-radius-full)" });
  });

  it("has no axe violations", async () => {
    const { container } = render(<FlowChartLegendItem color="#ff0000" label="Revenue" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

/**
 * FLOW — FlowCircularProgress Component Tests
 * ─────────────────────────────────────────────
 * Tests rendering, accessibility, determinate/indeterminate states, and label display.
 *
 * Requires: vitest + @testing-library/react + jsdom
 * Run: npx vitest run src/test/FlowCircularProgress.test.tsx
 */
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { FlowCircularProgress } from "../app/components/feedback";

// ─────────────────────────────────────────────
// Rendering
// ─────────────────────────────────────────────

describe("FlowCircularProgress — rendering", () => {
  it("renders with role='progressbar'", () => {
    render(<FlowCircularProgress value={50} />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("applies the flow-circular-progress class", () => {
    render(<FlowCircularProgress value={30} />);
    expect(screen.getByRole("progressbar")).toHaveClass("flow-circular-progress");
  });

  it("renders an SVG inside the progressbar", () => {
    const { container } = render(<FlowCircularProgress value={40} />);
    expect(container.querySelector(".flow-circular-progress-svg")).toBeInTheDocument();
  });

  it("sets data-size='md' by default", () => {
    render(<FlowCircularProgress value={50} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("data-size", "md");
  });
});

// ─────────────────────────────────────────────
// ARIA & accessibility
// ─────────────────────────────────────────────

describe("FlowCircularProgress — accessibility", () => {
  it("sets aria-valuenow to the percentage of value/max", () => {
    render(<FlowCircularProgress value={30} max={100} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "30");
  });

  it("sets aria-valuemin to 0", () => {
    render(<FlowCircularProgress value={50} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuemin", "0");
  });

  it("sets aria-valuemax to match the max prop (defaults to 100)", () => {
    render(<FlowCircularProgress value={50} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuemax", "100");
  });

  it("sets aria-valuemax to a custom max value", () => {
    render(<FlowCircularProgress value={25} max={200} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuemax", "200");
  });

  it("defaults aria-label to 'Progress'", () => {
    render(<FlowCircularProgress value={10} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-label", "Progress");
  });

  it("accepts a custom aria-label", () => {
    render(<FlowCircularProgress value={60} aria-label="Loading" />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-label", "Loading");
  });
});

// ─────────────────────────────────────────────
// Indeterminate state
// ─────────────────────────────────────────────

describe("FlowCircularProgress — indeterminate state", () => {
  it("has no aria-valuenow when value is omitted (indeterminate)", () => {
    render(<FlowCircularProgress />);
    expect(screen.getByRole("progressbar")).not.toHaveAttribute("aria-valuenow");
  });

  it("sets data-indeterminate when value is omitted", () => {
    render(<FlowCircularProgress />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("data-indeterminate");
  });

  it("does not set data-indeterminate when value is provided", () => {
    render(<FlowCircularProgress value={50} />);
    expect(screen.getByRole("progressbar")).not.toHaveAttribute("data-indeterminate");
  });
});

// ─────────────────────────────────────────────
// Label display
// ─────────────────────────────────────────────

describe("FlowCircularProgress — label display", () => {
  it("shows percentage label when showLabel is true", () => {
    render(<FlowCircularProgress value={75} showLabel />);
    expect(screen.getByText("75%")).toBeInTheDocument();
  });

  it("does not show percentage label by default", () => {
    render(<FlowCircularProgress value={75} />);
    expect(screen.queryByText("75%")).not.toBeInTheDocument();
  });

  it("does not show label in indeterminate mode even when showLabel is true", () => {
    render(<FlowCircularProgress showLabel />);
    expect(screen.queryByText("%")).not.toBeInTheDocument();
  });

  it("does not show label at sm size even when showLabel is true", () => {
    render(<FlowCircularProgress value={50} size="sm" showLabel />);
    expect(screen.queryByText("50%")).not.toBeInTheDocument();
  });
});

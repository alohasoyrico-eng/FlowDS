/**
 * FLOW — FlowProgressBar Component Tests
 * ────────────────────────────────────────
 * Tests rendering, accessibility, determinate/indeterminate states, and label display.
 *
 * Requires: vitest + @testing-library/react + jsdom
 * Run: npx vitest run src/test/FlowProgressBar.test.tsx
 */
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { FlowProgressBar } from "../app/components/feedback";

// ─────────────────────────────────────────────
// Rendering
// ─────────────────────────────────────────────

describe("FlowProgressBar — rendering", () => {
  it("renders with role='progressbar'", () => {
    render(<FlowProgressBar value={50} />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("applies the flow-progress-track class to the progressbar element", () => {
    render(<FlowProgressBar value={30} />);
    expect(screen.getByRole("progressbar")).toHaveClass("flow-progress-track");
  });

  it("applies data-variant='default' by default", () => {
    render(<FlowProgressBar value={40} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("data-variant", "default");
  });

  it("applies a custom variant via prop", () => {
    render(<FlowProgressBar value={80} variant="success" />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("data-variant", "success");
  });
});

// ─────────────────────────────────────────────
// ARIA & accessibility
// ─────────────────────────────────────────────

describe("FlowProgressBar — accessibility", () => {
  it("sets aria-valuenow to the rounded percentage of value/max", () => {
    render(<FlowProgressBar value={30} max={100} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "30");
  });

  it("sets aria-valuemin to 0", () => {
    render(<FlowProgressBar value={50} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuemin", "0");
  });

  it("sets aria-valuemax to match the max prop (defaults to 100)", () => {
    render(<FlowProgressBar value={50} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuemax", "100");
  });

  it("sets aria-valuemax to a custom max value", () => {
    render(<FlowProgressBar value={25} max={200} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuemax", "200");
  });

  it("defaults aria-label to 'Progress'", () => {
    render(<FlowProgressBar value={10} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-label", "Progress");
  });

  it("accepts a custom aria-label", () => {
    render(<FlowProgressBar value={60} aria-label="Upload progress" />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-label", "Upload progress");
  });
});

// ─────────────────────────────────────────────
// Indeterminate state
// ─────────────────────────────────────────────

describe("FlowProgressBar — indeterminate state", () => {
  it("has no aria-valuenow when value is omitted (indeterminate)", () => {
    render(<FlowProgressBar />);
    expect(screen.getByRole("progressbar")).not.toHaveAttribute("aria-valuenow");
  });

  it("sets data-indeterminate when value is omitted", () => {
    render(<FlowProgressBar />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("data-indeterminate");
  });

  it("does not set data-indeterminate when value is provided", () => {
    render(<FlowProgressBar value={50} />);
    expect(screen.getByRole("progressbar")).not.toHaveAttribute("data-indeterminate");
  });
});

// ─────────────────────────────────────────────
// Label display
// ─────────────────────────────────────────────

describe("FlowProgressBar — label display", () => {
  it("shows percentage label when showLabel is true", () => {
    render(<FlowProgressBar value={75} showLabel />);
    expect(screen.getByText("75%")).toBeInTheDocument();
  });

  it("does not show percentage label by default", () => {
    render(<FlowProgressBar value={75} />);
    expect(screen.queryByText("75%")).not.toBeInTheDocument();
  });

  it("does not show percentage label in indeterminate mode even when showLabel is true", () => {
    render(<FlowProgressBar showLabel />);
    expect(screen.queryByText("%")).not.toBeInTheDocument();
  });
});

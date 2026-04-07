/**
 * FLOW — FlowKPITrendIndicator Component Tests
 * ──────────────────────────────────────────────
 * Tests rendering, direction display, label, and color behavior.
 *
 * Requires: vitest + @testing-library/react + jsdom
 * Run: npx vitest run src/test/FlowKPITrendIndicator.test.tsx
 */
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { FlowKPITrendIndicator } from "../app/components/display";

// ─────────────────────────────────────────────
// Rendering
// ─────────────────────────────────────────────

describe("FlowKPITrendIndicator — rendering", () => {
  it("renders with flow-kpi-trend class", () => {
    const { container } = render(<FlowKPITrendIndicator value="+12%" />);
    expect(container.querySelector(".flow-kpi-trend")).toBeInTheDocument();
  });

  it("displays the value text", () => {
    render(<FlowKPITrendIndicator value="+12%" />);
    expect(screen.getByText("+12%")).toBeInTheDocument();
  });

  it("displays the label when provided", () => {
    render(<FlowKPITrendIndicator value="+12%" label="vs last month" />);
    expect(screen.getByText("vs last month")).toBeInTheDocument();
  });

  it("does not render a label element when label is omitted", () => {
    render(<FlowKPITrendIndicator value="+5%" />);
    expect(screen.queryByText("vs last month")).not.toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// Direction
// ─────────────────────────────────────────────

describe("FlowKPITrendIndicator — direction", () => {
  it("defaults to 'neutral' direction", () => {
    const { container } = render(<FlowKPITrendIndicator value="0%" />);
    const trend = container.querySelector(".flow-kpi-trend");
    // neutral uses secondary text color
    expect(trend).toHaveStyle({ color: "var(--sys-energy-text-secondary)" });
  });

  it("uses success color for 'up' direction when upIsGood (default)", () => {
    const { container } = render(<FlowKPITrendIndicator value="+10%" direction="up" />);
    const trend = container.querySelector(".flow-kpi-trend");
    expect(trend).toHaveStyle({ color: "var(--sys-energy-status-success)" });
  });

  it("uses error color for 'down' direction when upIsGood (default)", () => {
    const { container } = render(<FlowKPITrendIndicator value="-5%" direction="down" />);
    const trend = container.querySelector(".flow-kpi-trend");
    expect(trend).toHaveStyle({ color: "var(--sys-energy-status-error)" });
  });

  it("uses error color for 'up' direction when upIsGood=false", () => {
    const { container } = render(
      <FlowKPITrendIndicator value="+10%" direction="up" upIsGood={false} />,
    );
    const trend = container.querySelector(".flow-kpi-trend");
    expect(trend).toHaveStyle({ color: "var(--sys-energy-status-error)" });
  });

  it("uses success color for 'down' direction when upIsGood=false", () => {
    const { container } = render(
      <FlowKPITrendIndicator value="-5%" direction="down" upIsGood={false} />,
    );
    const trend = container.querySelector(".flow-kpi-trend");
    expect(trend).toHaveStyle({ color: "var(--sys-energy-status-success)" });
  });
});

// ─────────────────────────────────────────────
// Custom styling
// ─────────────────────────────────────────────

describe("FlowKPITrendIndicator — custom styling", () => {
  it("applies custom className", () => {
    const { container } = render(
      <FlowKPITrendIndicator value="+12%" className="custom-trend" />,
    );
    expect(container.querySelector(".flow-kpi-trend")).toHaveClass("custom-trend");
  });
});

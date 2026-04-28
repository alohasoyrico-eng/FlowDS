/**
 * FLOW — FlowKPICard Component Tests
 * ──────────────────────────────────
 * Tests rendering, interaction, and accessibility.
 *
 * Requires: vitest + @testing-library/react + jsdom
 * Run: npx vitest run src/test/FlowKPICard.test.tsx
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";

import { FlowKPICard } from "@flow/patterns";

// ─────────────────────────────────────────────
// Rendering
// ─────────────────────────────────────────────

describe("FlowKPICard — rendering", () => {
  it("renders the value and label", () => {
    render(<FlowKPICard value="1,234" label="Total Users" />);
    expect(screen.getByText("1,234")).toBeInTheDocument();
    expect(screen.getByText("Total Users")).toBeInTheDocument();
  });

  it("renders the description when provided", () => {
    render(<FlowKPICard value="99%" label="Uptime" description="Last 30 days" />);
    expect(screen.getByText("Last 30 days")).toBeInTheDocument();
  });

  it("renders the trend value when provided", () => {
    render(<FlowKPICard value="42" label="Issues" trend="up" trendValue="+12.5%" />);
    expect(screen.getByText("+12.5%")).toBeInTheDocument();
  });

  it("renders a loading skeleton when loading is true", () => {
    const { container } = render(<FlowKPICard value="0" label="Loading" loading />);
    expect(container.querySelector(".flow-kpi-card-loading")).toBeInTheDocument();
    expect(screen.queryByText("0")).not.toBeInTheDocument();
  });

  it("sets aria-invalid when error is true", () => {
    const { container } = render(<FlowKPICard value="N/A" label="Error" error />);
    const card = container.querySelector(".flow-kpi-card");
    expect(card).toHaveAttribute("aria-invalid", "true");
    expect(card).toHaveAttribute("data-state", "error");
  });

  it("accepts numeric values", () => {
    render(<FlowKPICard value={42} label="Count" />);
    expect(screen.getByText("42")).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// Interaction
// ─────────────────────────────────────────────

describe("FlowKPICard — interaction", () => {
  it("calls onClick when the card is clicked", async () => {
    const onClick = vi.fn();
    render(<FlowKPICard value="1,234" label="Total Users" onClick={onClick} />);
    const card = screen.getByText("1,234").closest(".flow-kpi-card")!;
    await userEvent.click(card);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("applies cursor:pointer when onClick is provided", () => {
    const { container } = render(<FlowKPICard value="42" label="Clickable" onClick={vi.fn()} />);
    const card = container.querySelector(".flow-kpi-card") as HTMLElement;
    expect(card.style.cursor).toBe("pointer");
  });
});

// ─────────────────────────────────────────────
// Accessibility
// ─────────────────────────────────────────────

describe("FlowKPICard — accessibility", () => {
  it("has no axe violations", async () => {
    const { container } = render(
      <FlowKPICard value="1,234" label="Total Users" trend="up" trendValue="+5%" />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

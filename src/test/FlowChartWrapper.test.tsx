/**
 * FLOW — FlowChartWrapper Component Tests
 * ──────────────────────────────────────────────
 * Tests rendering, interaction, and accessibility.
 *
 * Requires: vitest + @testing-library/react + jsdom
 * Run: npx vitest run src/test/FlowChartWrapper.test.tsx
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";

import { FlowChartWrapper } from "../app/components/patterns";

// ─────────────────────────────────────────────
// Rendering
// ─────────────────────────────────────────────

describe("FlowChartWrapper — rendering", () => {
  it("renders children content", () => {
    render(
      <FlowChartWrapper>
        <div>My chart</div>
      </FlowChartWrapper>,
    );
    expect(screen.getByText("My chart")).toBeInTheDocument();
  });

  it("shows the title when provided", () => {
    render(<FlowChartWrapper title="Revenue">Chart</FlowChartWrapper>);
    expect(screen.getByText("Revenue")).toBeInTheDocument();
  });

  it("shows the subtitle when provided", () => {
    render(
      <FlowChartWrapper title="Revenue" subtitle="Last 30 days">
        Chart
      </FlowChartWrapper>,
    );
    expect(screen.getByText("Last 30 days")).toBeInTheDocument();
  });

  it("renders actions in the header", () => {
    render(
      <FlowChartWrapper title="Revenue" actions={<button>Export</button>}>
        Chart
      </FlowChartWrapper>,
    );
    expect(screen.getByText("Export")).toBeInTheDocument();
  });

  it("renders legend content below the chart", () => {
    render(
      <FlowChartWrapper legend={<span>Legend item</span>}>
        Chart
      </FlowChartWrapper>,
    );
    expect(screen.getByText("Legend item")).toBeInTheDocument();
  });

  it("shows a spinner when loading", () => {
    render(<FlowChartWrapper loading />);
    expect(screen.getByLabelText("Loading chart")).toBeInTheDocument();
  });

  it("does not render children when loading", () => {
    render(
      <FlowChartWrapper loading>
        <div>Chart content</div>
      </FlowChartWrapper>,
    );
    expect(screen.queryByText("Chart content")).not.toBeInTheDocument();
  });

  it("shows an alert with error message when error is true", () => {
    render(<FlowChartWrapper error />);
    const alert = screen.getByRole("alert");
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveTextContent("Failed to load chart");
  });

  it("shows custom error message", () => {
    render(<FlowChartWrapper error errorMessage="Server error" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Server error");
  });

  it("shows the empty message when empty is true", () => {
    render(<FlowChartWrapper empty />);
    expect(screen.getByText("No data available")).toBeInTheDocument();
  });

  it("shows custom empty message", () => {
    render(<FlowChartWrapper empty emptyMessage="Nothing here" />);
    expect(screen.getByText("Nothing here")).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// Interaction
// ─────────────────────────────────────────────

describe("FlowChartWrapper — interaction", () => {
  it("renders action buttons that can be clicked", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <FlowChartWrapper title="Sales" actions={<button onClick={onClick}>Download</button>}>
        Chart
      </FlowChartWrapper>,
    );
    await user.click(screen.getByText("Download"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

// ─────────────────────────────────────────────
// Accessibility
// ─────────────────────────────────────────────

describe("FlowChartWrapper — accessibility", () => {
  it("has no axe violations", async () => {
    const { container } = render(
      <FlowChartWrapper title="Sales">
        <div>Chart content</div>
      </FlowChartWrapper>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

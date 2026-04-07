/**
 * FLOW — FlowDensityProvider Tests
 * ──────────────────────────────────
 * Tests the density zone provider and useFlowDensity hook.
 *
 * Requires: vitest + @testing-library/react + jsdom
 * Run: npx vitest run src/test/FlowDensityProvider.test.tsx
 */
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";

import { FlowDensityProvider } from "../app/primitives";
import { useFlowDensity } from "../app/hooks/use-flow-density";

// Helper component that reads density from context
function DensityReader() {
  const density = useFlowDensity();
  return <span data-testid="density">{density}</span>;
}

// ─────────────────────────────────────────────
// Rendering
// ─────────────────────────────────────────────

describe("FlowDensityProvider — rendering", () => {
  it("renders children without wrapper div when density='default'", () => {
    const { container } = render(
      <FlowDensityProvider density="default">
        <span data-testid="child">content</span>
      </FlowDensityProvider>,
    );
    expect(screen.getByTestId("child")).toBeInTheDocument();
    // No wrapper div with data-density
    expect(container.querySelector("[data-density]")).toBeNull();
  });

  it("renders wrapper div with data-density='compact'", () => {
    const { container } = render(
      <FlowDensityProvider density="compact">
        <span data-testid="child">content</span>
      </FlowDensityProvider>,
    );
    const wrapper = container.querySelector("[data-density='compact']");
    expect(wrapper).toBeInTheDocument();
    expect(wrapper).toHaveStyle({ display: "contents" });
  });

  it("renders wrapper div with data-density='comfortable'", () => {
    const { container } = render(
      <FlowDensityProvider density="comfortable">
        <span data-testid="child">content</span>
      </FlowDensityProvider>,
    );
    const wrapper = container.querySelector("[data-density='comfortable']");
    expect(wrapper).toBeInTheDocument();
    expect(wrapper).toHaveStyle({ display: "contents" });
  });
});

// ─────────────────────────────────────────────
// Context
// ─────────────────────────────────────────────

describe("FlowDensityProvider — context", () => {
  it("useFlowDensity returns 'default' when no provider", () => {
    render(<DensityReader />);
    expect(screen.getByTestId("density")).toHaveTextContent("default");
  });

  it("useFlowDensity returns 'compact' inside compact provider", () => {
    render(
      <FlowDensityProvider density="compact">
        <DensityReader />
      </FlowDensityProvider>,
    );
    expect(screen.getByTestId("density")).toHaveTextContent("compact");
  });

  it("useFlowDensity returns 'comfortable' inside comfortable provider", () => {
    render(
      <FlowDensityProvider density="comfortable">
        <DensityReader />
      </FlowDensityProvider>,
    );
    expect(screen.getByTestId("density")).toHaveTextContent("comfortable");
  });

  it("inner provider overrides outer provider (nestable)", () => {
    render(
      <FlowDensityProvider density="comfortable">
        <FlowDensityProvider density="compact">
          <DensityReader />
        </FlowDensityProvider>
      </FlowDensityProvider>,
    );
    expect(screen.getByTestId("density")).toHaveTextContent("compact");
  });

  it("nested default provider resets to default", () => {
    render(
      <FlowDensityProvider density="compact">
        <FlowDensityProvider density="default">
          <DensityReader />
        </FlowDensityProvider>
      </FlowDensityProvider>,
    );
    expect(screen.getByTestId("density")).toHaveTextContent("default");
  });
});

// ─────────────────────────────────────────────
// Accessibility
// ─────────────────────────────────────────────

describe("FlowDensityProvider — accessibility", () => {
  it("has no axe violations", async () => {
    const { container } = render(
      <FlowDensityProvider><div>test</div></FlowDensityProvider>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

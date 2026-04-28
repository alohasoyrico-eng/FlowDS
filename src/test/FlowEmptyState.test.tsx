/**
 * FLOW — FlowEmptyState Component Tests
 * ──────────────────────────────────
 * Tests rendering, interaction, and accessibility.
 *
 * Requires: vitest + @testing-library/react + jsdom
 * Run: npx vitest run src/test/FlowEmptyState.test.tsx
 */
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";

import { FlowEmptyState } from "@flow/patterns";

// ─────────────────────────────────────────────
// Rendering
// ─────────────────────────────────────────────

describe("FlowEmptyState — rendering", () => {
  it("renders the title", () => {
    render(<FlowEmptyState title="No results found" />);
    expect(screen.getByText("No results found")).toBeInTheDocument();
  });

  it("renders the description when provided", () => {
    render(<FlowEmptyState title="No results" description="Try a different search term" />);
    expect(screen.getByText("Try a different search term")).toBeInTheDocument();
  });

  it("does not render the description when omitted", () => {
    render(<FlowEmptyState title="No results" />);
    expect(screen.queryByText("Try a different search term")).not.toBeInTheDocument();
  });

  it("renders the action slot when provided", () => {
    render(<FlowEmptyState title="No results" action={<button type="button">Retry</button>} />);
    expect(screen.getByRole("button", { name: "Retry" })).toBeInTheDocument();
  });

  it("renders the secondaryAction slot when provided", () => {
    render(
      <FlowEmptyState
        title="No results"
        secondaryAction={<button type="button">Go back</button>}
      />,
    );
    expect(screen.getByRole("button", { name: "Go back" })).toBeInTheDocument();
  });

  it("applies data-size when size is provided", () => {
    const { container } = render(<FlowEmptyState title="Empty" size="sm" />);
    const el = container.querySelector(".flow-empty-state");
    expect(el).toHaveAttribute("data-size", "sm");
  });
});

// ─────────────────────────────────────────────
// Accessibility
// ─────────────────────────────────────────────

describe("FlowEmptyState — accessibility", () => {
  it("has no axe violations", async () => {
    const { container } = render(
      <FlowEmptyState title="No items yet" description="Add your first item to get started" />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

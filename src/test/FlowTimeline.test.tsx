/**
 * FLOW — FlowTimeline Component Tests
 * ──────────────────────────────────
 * Tests rendering, interaction, and accessibility.
 *
 * Requires: vitest + @testing-library/react + jsdom
 * Run: npx vitest run src/test/FlowTimeline.test.tsx
 */
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";

import { FlowTimeline } from "@flow/patterns";

const sampleItems = [
  { id: "1", label: "Created", description: "Issue created", timestamp: "2024-01-01" },
  { id: "2", label: "In Progress", description: "Work started", timestamp: "2024-01-05" },
  { id: "3", label: "Resolved", timestamp: "2024-01-10" },
];

// ─────────────────────────────────────────────
// Rendering
// ─────────────────────────────────────────────

describe("FlowTimeline — rendering", () => {
  it("renders all item labels", () => {
    render(<FlowTimeline items={sampleItems} />);
    expect(screen.getByText("Created")).toBeInTheDocument();
    expect(screen.getByText("In Progress")).toBeInTheDocument();
    expect(screen.getByText("Resolved")).toBeInTheDocument();
  });

  it("renders descriptions when provided", () => {
    render(<FlowTimeline items={sampleItems} />);
    expect(screen.getByText("Issue created")).toBeInTheDocument();
    expect(screen.getByText("Work started")).toBeInTheDocument();
  });

  it("renders timestamps when provided", () => {
    render(<FlowTimeline items={sampleItems} />);
    expect(screen.getByText("2024-01-01")).toBeInTheDocument();
    expect(screen.getByText("2024-01-10")).toBeInTheDocument();
  });

  it("returns null for empty items array", () => {
    const { container } = render(<FlowTimeline items={[]} />);
    expect(container.innerHTML).toBe("");
  });

  it("applies custom className", () => {
    const { container } = render(<FlowTimeline items={sampleItems} className="custom" />);
    expect(container.querySelector(".flow-timeline")).toHaveClass("custom");
  });

  it("sets data-tone attribute when tone is provided", () => {
    const { container } = render(<FlowTimeline items={sampleItems} tone="brand" />);
    expect(container.querySelector(".flow-timeline")).toHaveAttribute("data-tone", "brand");
  });
});

// ─────────────────────────────────────────────
// Accessibility
// ─────────────────────────────────────────────

describe("FlowTimeline — accessibility", () => {
  it("has no axe violations", async () => {
    const { container } = render(<FlowTimeline items={sampleItems} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

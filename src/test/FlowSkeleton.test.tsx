/**
 * FLOW — FlowSkeleton Component Tests
 * ─────────────────────────────────────
 * Tests rendering, variants, multi-line behavior, and custom sizing.
 *
 * Requires: vitest + @testing-library/react + jsdom
 * Run: npx vitest run src/test/FlowSkeleton.test.tsx
 */
import { render } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";

import { FlowSkeleton } from "../app/components/feedback";

// ─────────────────────────────────────────────
// Rendering
// ─────────────────────────────────────────────

describe("FlowSkeleton — rendering", () => {
  it("renders a single skeleton element by default", () => {
    const { container } = render(<FlowSkeleton />);
    expect(container.querySelector(".flow-skeleton")).toBeInTheDocument();
  });

  it("has aria-hidden='true' on the skeleton element", () => {
    const { container } = render(<FlowSkeleton />);
    const skeleton = container.querySelector(".flow-skeleton");
    expect(skeleton).toHaveAttribute("aria-hidden", "true");
  });

  it("applies the flow-skeleton class", () => {
    const { container } = render(<FlowSkeleton />);
    expect(container.querySelector(".flow-skeleton")).toBeTruthy();
  });
});

// ─────────────────────────────────────────────
// Variants
// ─────────────────────────────────────────────

describe("FlowSkeleton — variants", () => {
  it("renders with data-variant='text' by default", () => {
    const { container } = render(<FlowSkeleton />);
    expect(container.querySelector(".flow-skeleton")).toHaveAttribute("data-variant", "text");
  });

  it("renders with data-variant='circle' when variant='circle'", () => {
    const { container } = render(<FlowSkeleton variant="circle" />);
    expect(container.querySelector(".flow-skeleton")).toHaveAttribute("data-variant", "circle");
  });

  it("renders with data-variant='rect' when variant='rect'", () => {
    const { container } = render(<FlowSkeleton variant="rect" />);
    expect(container.querySelector(".flow-skeleton")).toHaveAttribute("data-variant", "rect");
  });

  it("renders with data-variant='card' when variant='card'", () => {
    const { container } = render(<FlowSkeleton variant="card" />);
    expect(container.querySelector(".flow-skeleton")).toHaveAttribute("data-variant", "card");
  });
});

// ─────────────────────────────────────────────
// Multi-line text
// ─────────────────────────────────────────────

describe("FlowSkeleton — multi-line", () => {
  it("renders multiple skeleton lines when lines > 1 with text variant", () => {
    const { container } = render(<FlowSkeleton variant="text" lines={3} />);
    const group = container.querySelector(".flow-skeleton-group");
    expect(group).toBeInTheDocument();
    const skeletons = group!.querySelectorAll(".flow-skeleton");
    expect(skeletons).toHaveLength(3);
  });

  it("sets the last line to 75% width in multi-line mode", () => {
    const { container } = render(<FlowSkeleton variant="text" lines={4} />);
    const skeletons = container.querySelectorAll(".flow-skeleton");
    const lastLine = skeletons[skeletons.length - 1];
    expect(lastLine).toHaveStyle({ width: "75%" });
  });

  it("renders a single element (not a group) when lines=1", () => {
    const { container } = render(<FlowSkeleton variant="text" lines={1} />);
    expect(container.querySelector(".flow-skeleton-group")).not.toBeInTheDocument();
    expect(container.querySelector(".flow-skeleton")).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// Custom dimensions
// ─────────────────────────────────────────────

describe("FlowSkeleton — custom dimensions", () => {
  it("applies custom width via style", () => {
    const { container } = render(<FlowSkeleton width="200px" />);
    expect(container.querySelector(".flow-skeleton")).toHaveStyle({ width: "200px" });
  });

  it("applies custom height via style", () => {
    const { container } = render(<FlowSkeleton variant="rect" height="80px" />);
    expect(container.querySelector(".flow-skeleton")).toHaveStyle({ height: "80px" });
  });
});

// ─────────────────────────────────────────────
// Animation
// ─────────────────────────────────────────────

describe("FlowSkeleton — animation", () => {
  it("sets data-animate when animate=true (default)", () => {
    const { container } = render(<FlowSkeleton />);
    expect(container.querySelector(".flow-skeleton")).toHaveAttribute("data-animate", "true");
  });

  it("does not set data-animate when animate=false", () => {
    const { container } = render(<FlowSkeleton animate={false} />);
    expect(container.querySelector(".flow-skeleton")).not.toHaveAttribute("data-animate");
  });
});

// ─────────────────────────────────────────────
// Accessibility
// ─────────────────────────────────────────────

describe("FlowSkeleton — accessibility", () => {
  it("has no axe violations", async () => {
    const { container } = render(<FlowSkeleton />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

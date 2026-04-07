/**
 * FLOW — FlowBadge Component Tests
 * ──────────────────────────────────
 * Tests rendering, variants, overflow, hidden state, and wrapper behavior.
 *
 * Requires: vitest + @testing-library/react + jsdom
 * Run: npx vitest run src/test/FlowBadge.test.tsx
 */
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { FlowBadge } from "../app/components/display";

// ─────────────────────────────────────────────
// Rendering
// ─────────────────────────────────────────────

describe("FlowBadge — rendering", () => {
  it("renders the badge with flow-badge class", () => {
    const { container } = render(<FlowBadge content={5} />);
    expect(container.querySelector(".flow-badge")).toBeInTheDocument();
  });

  it("displays count content", () => {
    render(<FlowBadge content={5} />);
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("displays string content for label variant", () => {
    render(<FlowBadge content="New" variant="label" />);
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("sets data-variant='count' by default", () => {
    const { container } = render(<FlowBadge content={3} />);
    expect(container.querySelector(".flow-badge")).toHaveAttribute("data-variant", "count");
  });

  it("sets data-variant='dot' for dot variant", () => {
    const { container } = render(<FlowBadge variant="dot" />);
    expect(container.querySelector(".flow-badge")).toHaveAttribute("data-variant", "dot");
  });
});

// ─────────────────────────────────────────────
// Max overflow
// ─────────────────────────────────────────────

describe("FlowBadge — max overflow", () => {
  it("shows '99+' when count exceeds default max of 99", () => {
    render(<FlowBadge content={150} />);
    expect(screen.getByText("99+")).toBeInTheDocument();
  });

  it("shows '9+' when count exceeds custom max of 9", () => {
    render(<FlowBadge content={15} max={9} />);
    expect(screen.getByText("9+")).toBeInTheDocument();
  });

  it("shows exact count when within max", () => {
    render(<FlowBadge content={50} max={99} />);
    expect(screen.getByText("50")).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// Hidden state
// ─────────────────────────────────────────────

describe("FlowBadge — hidden state", () => {
  it("sets data-hidden when hidden prop is true", () => {
    const { container } = render(<FlowBadge content={5} hidden />);
    expect(container.querySelector(".flow-badge")).toHaveAttribute("data-hidden");
  });

  it("does not set data-hidden when hidden is false", () => {
    const { container } = render(<FlowBadge content={5} />);
    expect(container.querySelector(".flow-badge")).not.toHaveAttribute("data-hidden");
  });
});

// ─────────────────────────────────────────────
// Wrapper behavior
// ─────────────────────────────────────────────

describe("FlowBadge — wrapper behavior", () => {
  it("wraps children with flow-badge-wrapper when children are provided", () => {
    const { container } = render(
      <FlowBadge content={3}>
        <button>Inbox</button>
      </FlowBadge>,
    );
    expect(container.querySelector(".flow-badge-wrapper")).toBeInTheDocument();
  });

  it("renders standalone (no wrapper) when standalone is true", () => {
    const { container } = render(<FlowBadge content={3} standalone />);
    expect(container.querySelector(".flow-badge-wrapper")).not.toBeInTheDocument();
    expect(container.querySelector(".flow-badge-standalone")).toBeInTheDocument();
  });

  it("renders standalone when no children are provided", () => {
    const { container } = render(<FlowBadge content={3} />);
    expect(container.querySelector(".flow-badge-wrapper")).not.toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// Color
// ─────────────────────────────────────────────

describe("FlowBadge — color", () => {
  it("does not set data-color for default color", () => {
    const { container } = render(<FlowBadge content={1} />);
    expect(container.querySelector(".flow-badge")).not.toHaveAttribute("data-color");
  });

  it("sets data-color for non-default color", () => {
    const { container } = render(<FlowBadge content={1} color="error" />);
    expect(container.querySelector(".flow-badge")).toHaveAttribute("data-color", "error");
  });
});

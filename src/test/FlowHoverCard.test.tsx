/**
 * FLOW — FlowHoverCard Component Tests
 * ──────────────────────────────────────────────
 * Tests rendering, interaction, and accessibility.
 *
 * Requires: vitest + @testing-library/react + jsdom
 * Run: npx vitest run src/test/FlowHoverCard.test.tsx
 */
import { act, fireEvent, render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { FlowHoverCard } from "@flow/patterns";

// ─────────────────────────────────────────────
// Rendering
// ─────────────────────────────────────────────

describe("FlowHoverCard — rendering", () => {
  it("renders the trigger element", () => {
    render(
      <FlowHoverCard trigger={<button type="button">Hover me</button>}>
        <p>Card content</p>
      </FlowHoverCard>,
    );
    expect(screen.getByRole("button", { name: "Hover me" })).toBeInTheDocument();
  });

  it("card is hidden by default", () => {
    render(
      <FlowHoverCard trigger={<span>Trigger</span>}>
        <p>Card content</p>
      </FlowHoverCard>,
    );
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("does not render hover content initially", () => {
    render(
      <FlowHoverCard trigger={<span>Trigger</span>}>
        <p>Secret info</p>
      </FlowHoverCard>,
    );
    expect(screen.queryByText("Secret info")).not.toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// Interaction
// ─────────────────────────────────────────────

describe("FlowHoverCard — interaction", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("shows card after hover delay", () => {
    const { container } = render(
      <FlowHoverCard trigger={<span>Trigger</span>} openDelay={300}>
        <p>Card content</p>
      </FlowHoverCard>,
    );
    const wrapper = container.querySelector(".flow-hover-card")!;
    fireEvent.mouseEnter(wrapper);
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(screen.getByRole("tooltip")).toBeInTheDocument();
    expect(screen.getByText("Card content")).toBeInTheDocument();
  });

  it("hides card after mouseleave delay", () => {
    const { container } = render(
      <FlowHoverCard trigger={<span>Trigger</span>} openDelay={0} closeDelay={200}>
        <p>Card content</p>
      </FlowHoverCard>,
    );
    const wrapper = container.querySelector(".flow-hover-card")!;
    fireEvent.mouseEnter(wrapper);
    act(() => {
      vi.advanceTimersByTime(0);
    });
    expect(screen.getByRole("tooltip")).toBeInTheDocument();

    fireEvent.mouseLeave(wrapper);
    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("shows card on focus", () => {
    const { container } = render(
      <FlowHoverCard trigger={<span>Trigger</span>} openDelay={300}>
        <p>Card content</p>
      </FlowHoverCard>,
    );
    const wrapper = container.querySelector(".flow-hover-card")!;
    fireEvent.focus(wrapper);
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(screen.getByRole("tooltip")).toBeInTheDocument();
  });

  it("cancels open if mouse leaves before delay completes", () => {
    const { container } = render(
      <FlowHoverCard trigger={<span>Trigger</span>} openDelay={300}>
        <p>Card content</p>
      </FlowHoverCard>,
    );
    const wrapper = container.querySelector(".flow-hover-card")!;
    fireEvent.mouseEnter(wrapper);
    act(() => {
      vi.advanceTimersByTime(100);
    });
    fireEvent.mouseLeave(wrapper);
    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// Accessibility
// ─────────────────────────────────────────────

describe("FlowHoverCard — accessibility", () => {
  it("has no axe violations", async () => {
    const { container } = render(
      <FlowHoverCard trigger={<button type="button">Hover me</button>}>
        <p>Card content</p>
      </FlowHoverCard>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

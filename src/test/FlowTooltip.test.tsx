/**
 * FLOW — FlowTooltip Component Tests
 * ────────────────────────────────────
 * Tests hover trigger, tooltip display, accessibility attributes,
 * and disabled behavior.
 *
 * Requires: vitest + @testing-library/react + jsdom
 * Run: npx vitest run src/test/FlowTooltip.test.tsx
 */
import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { FlowTooltip } from "../app/components/overlays";

// Helper: hover trigger, advance fake timers, and return the trigger span
function hoverAndAdvance(triggerText: string, delayMs: number) {
  const trigger = screen.getByText(triggerText).closest(".flow-tooltip-trigger")!;
  fireEvent.mouseEnter(trigger);
  act(() => {
    vi.advanceTimersByTime(delayMs);
  });
  return trigger;
}

// ─────────────────────────────────────────────
// Rendering
// ─────────────────────────────────────────────

describe("FlowTooltip — rendering", () => {
  it("renders children content", () => {
    render(
      <FlowTooltip content="Tooltip text">
        <button type="button">Hover me</button>
      </FlowTooltip>,
    );
    expect(screen.getByRole("button", { name: "Hover me" })).toBeInTheDocument();
  });

  it("does not show tooltip by default", () => {
    render(
      <FlowTooltip content="Tooltip text">
        <button type="button">Hover me</button>
      </FlowTooltip>,
    );
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("shows tooltip on hover after delay", () => {
    vi.useFakeTimers();
    render(
      <FlowTooltip content="Tooltip text" delay={200}>
        <button type="button">Hover me</button>
      </FlowTooltip>,
    );
    hoverAndAdvance("Hover me", 200);
    expect(screen.getByRole("tooltip")).toBeInTheDocument();
    expect(screen.getByText("Tooltip text")).toBeInTheDocument();
    vi.useRealTimers();
  });

  it("hides tooltip on mouse leave", () => {
    vi.useFakeTimers();
    render(
      <FlowTooltip content="Tooltip text" delay={0}>
        <button type="button">Hover me</button>
      </FlowTooltip>,
    );
    const trigger = hoverAndAdvance("Hover me", 0);
    expect(screen.getByRole("tooltip")).toBeInTheDocument();
    fireEvent.mouseLeave(trigger);
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    vi.useRealTimers();
  });
});

// ─────────────────────────────────────────────
// States
// ─────────────────────────────────────────────

describe("FlowTooltip — states", () => {
  it("does not show tooltip when disabled=true", () => {
    vi.useFakeTimers();
    render(
      <FlowTooltip content="Tooltip text" disabled delay={0}>
        <button type="button">Hover me</button>
      </FlowTooltip>,
    );
    const trigger = screen.getByText("Hover me").closest(".flow-tooltip-trigger")!;
    fireEvent.mouseEnter(trigger);
    act(() => {
      vi.advanceTimersByTime(0);
    });
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    vi.useRealTimers();
  });

  it("sets data-position attribute based on position prop", () => {
    vi.useFakeTimers();
    render(
      <FlowTooltip content="Bottom tooltip" position="bottom" delay={0}>
        <button type="button">Hover me</button>
      </FlowTooltip>,
    );
    hoverAndAdvance("Hover me", 0);
    expect(screen.getByRole("tooltip")).toHaveAttribute("data-position", "bottom");
    vi.useRealTimers();
  });

  it("defaults to position='top'", () => {
    vi.useFakeTimers();
    render(
      <FlowTooltip content="Top tooltip" delay={0}>
        <button type="button">Hover me</button>
      </FlowTooltip>,
    );
    hoverAndAdvance("Hover me", 0);
    expect(screen.getByRole("tooltip")).toHaveAttribute("data-position", "top");
    vi.useRealTimers();
  });
});

// ─────────────────────────────────────────────
// Accessibility
// ─────────────────────────────────────────────

describe("FlowTooltip — accessibility", () => {
  it("tooltip has role='tooltip' when visible", () => {
    vi.useFakeTimers();
    render(
      <FlowTooltip content="Info" delay={0}>
        <button type="button">Hover me</button>
      </FlowTooltip>,
    );
    hoverAndAdvance("Hover me", 0);
    expect(screen.getByRole("tooltip")).toBeInTheDocument();
    vi.useRealTimers();
  });

  it("trigger has aria-describedby pointing to tooltip when visible", () => {
    vi.useFakeTimers();
    render(
      <FlowTooltip content="Description" delay={0}>
        <button type="button">Hover me</button>
      </FlowTooltip>,
    );
    const trigger = hoverAndAdvance("Hover me", 0);
    const tooltip = screen.getByRole("tooltip");
    expect(trigger).toHaveAttribute("aria-describedby", tooltip.id);
    vi.useRealTimers();
  });

  it("trigger does not have aria-describedby when tooltip is hidden", () => {
    const { container } = render(
      <FlowTooltip content="Description">
        <button type="button">Hover me</button>
      </FlowTooltip>,
    );
    const trigger = container.querySelector(".flow-tooltip-trigger");
    expect(trigger).not.toHaveAttribute("aria-describedby");
  });

  it("shows tooltip on focus (keyboard accessible)", () => {
    vi.useFakeTimers();
    render(
      <FlowTooltip content="Focus tooltip" delay={0}>
        <button type="button">Focus me</button>
      </FlowTooltip>,
    );
    const trigger = screen.getByText("Focus me").closest(".flow-tooltip-trigger")!;
    fireEvent.focus(trigger);
    act(() => {
      vi.advanceTimersByTime(0);
    });
    expect(screen.getByRole("tooltip")).toBeInTheDocument();
    vi.useRealTimers();
  });
});

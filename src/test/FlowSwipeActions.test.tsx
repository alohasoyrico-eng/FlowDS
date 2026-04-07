/**
 * FLOW — FlowSwipeActions Component Tests
 * ──────────────────────────────────────────────
 * Tests rendering, interaction, and accessibility.
 * Touch swipe gesture tests are skipped (jsdom limitation).
 *
 * Requires: vitest + @testing-library/react + jsdom
 * Run: npx vitest run src/test/FlowSwipeActions.test.tsx
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";

import { FlowSwipeActions } from "../app/components/patterns";

const LEFT_ACTIONS = [
  { key: "archive", label: "Archive", icon: "archive", variant: "default" as const, onAction: vi.fn() },
];

const RIGHT_ACTIONS = [
  { key: "delete", label: "Delete", icon: "trash", variant: "danger" as const, onAction: vi.fn() },
  { key: "flag", label: "Flag", icon: "flag", variant: "warning" as const, onAction: vi.fn() },
];

// ─────────────────────────────────────────────
// Rendering
// ─────────────────────────────────────────────

describe("FlowSwipeActions — rendering", () => {
  it("renders children content", () => {
    render(
      <FlowSwipeActions>
        <div>List item</div>
      </FlowSwipeActions>,
    );
    expect(screen.getByText("List item")).toBeInTheDocument();
  });

  it("renders left action buttons in the DOM", () => {
    render(
      <FlowSwipeActions leftActions={LEFT_ACTIONS}>
        <div>Item</div>
      </FlowSwipeActions>,
    );
    expect(screen.getByRole("button", { name: "Archive" })).toBeInTheDocument();
    expect(screen.getByText("Archive")).toBeInTheDocument();
  });

  it("renders right action buttons in the DOM", () => {
    render(
      <FlowSwipeActions rightActions={RIGHT_ACTIONS}>
        <div>Item</div>
      </FlowSwipeActions>,
    );
    expect(screen.getByRole("button", { name: "Delete" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Flag" })).toBeInTheDocument();
  });

  it("renders both left and right actions simultaneously", () => {
    render(
      <FlowSwipeActions leftActions={LEFT_ACTIONS} rightActions={RIGHT_ACTIONS}>
        <div>Item</div>
      </FlowSwipeActions>,
    );
    expect(screen.getByRole("button", { name: "Archive" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Delete" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Flag" })).toBeInTheDocument();
  });

  it("does not render action panels when no actions are provided", () => {
    const { container } = render(
      <FlowSwipeActions>
        <div>Item</div>
      </FlowSwipeActions>,
    );
    expect(container.querySelector(".flow-swipe-actions-panel")).toBeNull();
  });

  it("applies variant data attributes to action buttons", () => {
    render(
      <FlowSwipeActions rightActions={RIGHT_ACTIONS}>
        <div>Item</div>
      </FlowSwipeActions>,
    );
    const deleteBtn = screen.getByRole("button", { name: "Delete" });
    expect(deleteBtn).toHaveAttribute("data-variant", "danger");
    const flagBtn = screen.getByRole("button", { name: "Flag" });
    expect(flagBtn).toHaveAttribute("data-variant", "warning");
  });

  it("content starts at translateX(0)", () => {
    const { container } = render(
      <FlowSwipeActions rightActions={RIGHT_ACTIONS}>
        <div>Item</div>
      </FlowSwipeActions>,
    );
    const content = container.querySelector(".flow-swipe-actions-content") as HTMLElement;
    expect(content.style.transform).toBe("translateX(0px)");
  });
});

// ─────────────────────────────────────────────
// Interaction
// ─────────────────────────────────────────────

describe("FlowSwipeActions — interaction", () => {
  // Touch/pointer swipe gesture tests are skipped because jsdom
  // does not properly support pointer capture. We test button clicks.

  it("calls onAction when an action button is clicked directly", async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();
    const actions = [{ key: "delete", label: "Delete", variant: "danger" as const, onAction: onDelete }];
    render(
      <FlowSwipeActions rightActions={actions}>
        <div>Item</div>
      </FlowSwipeActions>,
    );
    await user.click(screen.getByRole("button", { name: "Delete" }));
    expect(onDelete).toHaveBeenCalledTimes(1);
  });
});

// ─────────────────────────────────────────────
// Accessibility
// ─────────────────────────────────────────────

describe("FlowSwipeActions — accessibility", () => {
  it("has no axe violations", async () => {
    const { container } = render(
      <FlowSwipeActions rightActions={RIGHT_ACTIONS}>
        <div>Swipeable item</div>
      </FlowSwipeActions>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

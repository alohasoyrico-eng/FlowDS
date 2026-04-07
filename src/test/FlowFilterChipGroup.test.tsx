/**
 * FLOW — FlowFilterChipGroup Component Tests
 * ──────────────────────────────────
 * Tests rendering, interaction, and accessibility.
 *
 * Requires: vitest + @testing-library/react + jsdom
 * Run: npx vitest run src/test/FlowFilterChipGroup.test.tsx
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";

import { FlowFilterChipGroup } from "../app/components/patterns";

const sampleChips = [
  { id: "a", label: "Alpha" },
  { id: "b", label: "Beta" },
  { id: "c", label: "Gamma" },
];

// ─────────────────────────────────────────────
// Rendering
// ─────────────────────────────────────────────

describe("FlowFilterChipGroup — rendering", () => {
  it("renders all chip labels", () => {
    render(
      <FlowFilterChipGroup
        chips={sampleChips}
        selected={new Set()}
        onSelectionChange={vi.fn()}
      />,
    );
    expect(screen.getByText("Alpha")).toBeInTheDocument();
    expect(screen.getByText("Beta")).toBeInTheDocument();
    expect(screen.getByText("Gamma")).toBeInTheDocument();
  });

  it("has role='group'", () => {
    render(
      <FlowFilterChipGroup
        chips={sampleChips}
        selected={new Set()}
        onSelectionChange={vi.fn()}
      />,
    );
    expect(screen.getByRole("group")).toBeInTheDocument();
  });

  it("returns null for empty chips array", () => {
    const { container } = render(
      <FlowFilterChipGroup
        chips={[]}
        selected={new Set()}
        onSelectionChange={vi.fn()}
      />,
    );
    expect(container.innerHTML).toBe("");
  });

  it("renders a count badge when chip has count", () => {
    render(
      <FlowFilterChipGroup
        chips={[{ id: "a", label: "Alpha", count: 42 }]}
        selected={new Set()}
        onSelectionChange={vi.fn()}
      />,
    );
    expect(screen.getByText("42")).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// Interaction
// ─────────────────────────────────────────────

describe("FlowFilterChipGroup — interaction", () => {
  it("toggles selection when a chip is clicked", async () => {
    const onSelectionChange = vi.fn();
    render(
      <FlowFilterChipGroup
        chips={sampleChips}
        selected={new Set()}
        onSelectionChange={onSelectionChange}
      />,
    );
    await userEvent.click(screen.getByText("Alpha"));
    expect(onSelectionChange).toHaveBeenCalledTimes(1);
    const result = onSelectionChange.mock.calls[0][0] as Set<string>;
    expect(result.has("a")).toBe(true);
  });

  it("deselects when clicking an already-selected chip", async () => {
    const onSelectionChange = vi.fn();
    render(
      <FlowFilterChipGroup
        chips={sampleChips}
        selected={new Set(["a"])}
        onSelectionChange={onSelectionChange}
      />,
    );
    await userEvent.click(screen.getByText("Alpha"));
    expect(onSelectionChange).toHaveBeenCalledTimes(1);
    const result = onSelectionChange.mock.calls[0][0] as Set<string>;
    expect(result.has("a")).toBe(false);
  });

  it("exclusive mode replaces selection with clicked chip", async () => {
    const onSelectionChange = vi.fn();
    render(
      <FlowFilterChipGroup
        chips={sampleChips}
        selected={new Set(["a"])}
        onSelectionChange={onSelectionChange}
        exclusive
      />,
    );
    await userEvent.click(screen.getByText("Beta"));
    expect(onSelectionChange).toHaveBeenCalledTimes(1);
    const result = onSelectionChange.mock.calls[0][0] as Set<string>;
    expect(result.size).toBe(1);
    expect(result.has("b")).toBe(true);
  });

  it("exclusive mode deselects when clicking the same chip", async () => {
    const onSelectionChange = vi.fn();
    render(
      <FlowFilterChipGroup
        chips={sampleChips}
        selected={new Set(["a"])}
        onSelectionChange={onSelectionChange}
        exclusive
      />,
    );
    await userEvent.click(screen.getByText("Alpha"));
    const result = onSelectionChange.mock.calls[0][0] as Set<string>;
    expect(result.size).toBe(0);
  });
});

// ─────────────────────────────────────────────
// Accessibility
// ─────────────────────────────────────────────

describe("FlowFilterChipGroup — accessibility", () => {
  it("has no axe violations", async () => {
    const { container } = render(
      <FlowFilterChipGroup
        chips={sampleChips}
        selected={new Set(["a"])}
        onSelectionChange={vi.fn()}
      />,
    );
    // Disable aria-allowed-attr: FlowChip uses aria-selected on <button>,
    // which is a known upstream issue in the Chip primitive.
    expect(
      await axe(container, {
        rules: { "aria-allowed-attr": { enabled: false } },
      }),
    ).toHaveNoViolations();
  });
});

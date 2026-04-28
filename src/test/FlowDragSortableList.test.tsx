/**
 * FLOW — FlowDragSortableList Component Tests
 * ────────────────────────────────────────────
 * Tests rendering of items, drag handles, ordering,
 * keyboard reorder, and accessibility attributes.
 *
 * Requires: vitest + @testing-library/react + jsdom
 * Run: npx vitest run src/test/FlowDragSortableList.test.tsx
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";

import { FlowDragSortableList } from "@flow/patterns";

const sampleItems = [
  { id: "1", content: "First item" },
  { id: "2", content: "Second item" },
  { id: "3", content: "Third item" },
];

// ─────────────────────────────────────────────
// Rendering
// ─────────────────────────────────────────────

describe("FlowDragSortableList — rendering", () => {
  it("renders a listbox", () => {
    render(<FlowDragSortableList items={sampleItems} onReorder={vi.fn()} />);
    expect(screen.getByRole("listbox")).toBeInTheDocument();
  });

  it("renders all items as options", () => {
    render(<FlowDragSortableList items={sampleItems} onReorder={vi.fn()} />);
    const opts = screen.getAllByRole("option");
    expect(opts).toHaveLength(3);
  });

  it("displays item content", () => {
    render(<FlowDragSortableList items={sampleItems} onReorder={vi.fn()} />);
    expect(screen.getByText("First item")).toBeInTheDocument();
    expect(screen.getByText("Second item")).toBeInTheDocument();
    expect(screen.getByText("Third item")).toBeInTheDocument();
  });

  it("renders items in the correct order", () => {
    render(<FlowDragSortableList items={sampleItems} onReorder={vi.fn()} />);
    const opts = screen.getAllByRole("option");
    expect(opts[0]).toHaveTextContent("First item");
    expect(opts[1]).toHaveTextContent("Second item");
    expect(opts[2]).toHaveTextContent("Third item");
  });
});

// ─────────────────────────────────────────────
// Interaction
// ─────────────────────────────────────────────

describe("FlowDragSortableList — interaction", () => {
  it("items are draggable", () => {
    render(<FlowDragSortableList items={sampleItems} onReorder={vi.fn()} />);
    const opts = screen.getAllByRole("option");
    opts.forEach((opt) => expect(opt).toHaveAttribute("draggable", "true"));
  });

  it("items are focusable for keyboard interaction", () => {
    render(<FlowDragSortableList items={sampleItems} onReorder={vi.fn()} />);
    const opts = screen.getAllByRole("option");
    opts.forEach((opt) => expect(opt).toHaveAttribute("tabindex", "0"));
  });

  it("supports keyboard reorder with Alt+ArrowDown", async () => {
    const onReorder = vi.fn();
    render(<FlowDragSortableList items={sampleItems} onReorder={onReorder} />);
    const first = screen.getAllByRole("option")[0];
    first.focus();
    await userEvent.keyboard("{Alt>}{ArrowDown}{/Alt}");
    expect(onReorder).toHaveBeenCalled();
    const reordered = onReorder.mock.calls[0][0];
    expect(reordered[0].id).toBe("2");
    expect(reordered[1].id).toBe("1");
  });
});

// ─────────────────────────────────────────────
// Accessibility
// ─────────────────────────────────────────────

describe("FlowDragSortableList — accessibility", () => {
  it("listbox has default aria-label", () => {
    render(<FlowDragSortableList items={sampleItems} onReorder={vi.fn()} />);
    expect(screen.getByRole("listbox")).toHaveAttribute("aria-label", "Sortable list");
  });

  it("supports custom aria-label", () => {
    render(
      <FlowDragSortableList items={sampleItems} onReorder={vi.fn()} aria-label="Priority list" />,
    );
    expect(screen.getByRole("listbox")).toHaveAttribute("aria-label", "Priority list");
  });

  it("each option has aria-selected attribute", () => {
    render(<FlowDragSortableList items={sampleItems} onReorder={vi.fn()} />);
    const opts = screen.getAllByRole("option");
    opts.forEach((opt) => expect(opt).toHaveAttribute("aria-selected", "false"));
  });

  it("renders without handle dots when handle is false", () => {
    const { container } = render(
      <FlowDragSortableList items={sampleItems} onReorder={vi.fn()} handle={false} />,
    );
    const dots = container.querySelectorAll("[style*='border-radius: 50%']");
    expect(dots).toHaveLength(0);
  });

  it("has no axe violations", async () => {
    const { container } = render(<FlowDragSortableList items={sampleItems} onReorder={vi.fn()} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

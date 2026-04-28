/**
 * FLOW — FlowSortControl Component Tests
 * ────────────────────────────────────────
 * Tests rendering, sort options, current sort state, cycling behavior,
 * and accessibility attributes.
 *
 * Requires: vitest + @testing-library/react + jsdom
 * Run: npx vitest run src/test/FlowSortControl.test.tsx
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";

import { FlowSortControl } from "@flow/components";

const DEFAULT_OPTIONS = [
  { key: "name", label: "Name" },
  { key: "date", label: "Date" },
  { key: "size", label: "Size" },
];

// ─────────────────────────────────────────────
// Rendering
// ─────────────────────────────────────────────

describe("FlowSortControl — rendering", () => {
  it("renders the 'Sort by:' label", () => {
    render(
      <FlowSortControl
        options={DEFAULT_OPTIONS}
        sortKey={null}
        sortDirection={null}
        onSortChange={vi.fn()}
      />,
    );
    expect(screen.getByText("Sort by:")).toBeInTheDocument();
  });

  it("renders all sort option buttons", () => {
    render(
      <FlowSortControl
        options={DEFAULT_OPTIONS}
        sortKey={null}
        sortDirection={null}
        onSortChange={vi.fn()}
      />,
    );
    expect(screen.getByRole("button", { name: "Sort by Name" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sort by Date" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sort by Size" })).toBeInTheDocument();
  });

  it("renders the correct number of buttons", () => {
    render(
      <FlowSortControl
        options={DEFAULT_OPTIONS}
        sortKey={null}
        sortDirection={null}
        onSortChange={vi.fn()}
      />,
    );
    expect(screen.getAllByRole("button")).toHaveLength(3);
  });
});

// ─────────────────────────────────────────────
// States
// ─────────────────────────────────────────────

describe("FlowSortControl — states", () => {
  it("shows ascending sort indicator for active ascending sort", () => {
    render(
      <FlowSortControl
        options={DEFAULT_OPTIONS}
        sortKey="name"
        sortDirection="asc"
        onSortChange={vi.fn()}
      />,
    );
    const nameBtn = screen.getByRole("button", { name: /Sort by Name/i });
    expect(nameBtn).toHaveAttribute("aria-label", expect.stringContaining("ascending"));
  });

  it("shows descending sort indicator for active descending sort", () => {
    render(
      <FlowSortControl
        options={DEFAULT_OPTIONS}
        sortKey="date"
        sortDirection="desc"
        onSortChange={vi.fn()}
      />,
    );
    const dateBtn = screen.getByRole("button", { name: /Sort by Date/i });
    expect(dateBtn).toHaveAttribute("aria-label", expect.stringContaining("descending"));
  });

  it("inactive buttons do not include sort direction in aria-label", () => {
    render(
      <FlowSortControl
        options={DEFAULT_OPTIONS}
        sortKey="name"
        sortDirection="asc"
        onSortChange={vi.fn()}
      />,
    );
    const dateBtn = screen.getByRole("button", { name: /Sort by Date/i });
    expect(dateBtn.getAttribute("aria-label")).not.toMatch(/ascending|descending/);
  });
});

// ─────────────────────────────────────────────
// Interaction
// ─────────────────────────────────────────────

describe("FlowSortControl — interaction", () => {
  it("calls onSortChange with (key, 'asc') when clicking an inactive sort", async () => {
    const onSortChange = vi.fn();
    render(
      <FlowSortControl
        options={DEFAULT_OPTIONS}
        sortKey={null}
        sortDirection={null}
        onSortChange={onSortChange}
      />,
    );
    await userEvent.click(screen.getByRole("button", { name: "Sort by Name" }));
    expect(onSortChange).toHaveBeenCalledWith("name", "asc");
  });

  it("cycles from asc to desc when clicking active ascending sort", async () => {
    const onSortChange = vi.fn();
    render(
      <FlowSortControl
        options={DEFAULT_OPTIONS}
        sortKey="name"
        sortDirection="asc"
        onSortChange={onSortChange}
      />,
    );
    await userEvent.click(screen.getByRole("button", { name: /Sort by Name/i }));
    expect(onSortChange).toHaveBeenCalledWith("name", "desc");
  });

  it("cycles from desc to null when clicking active descending sort", async () => {
    const onSortChange = vi.fn();
    render(
      <FlowSortControl
        options={DEFAULT_OPTIONS}
        sortKey="name"
        sortDirection="desc"
        onSortChange={onSortChange}
      />,
    );
    await userEvent.click(screen.getByRole("button", { name: /Sort by Name/i }));
    expect(onSortChange).toHaveBeenCalledWith("name", null);
  });

  it("switches to new key with asc when clicking a different option", async () => {
    const onSortChange = vi.fn();
    render(
      <FlowSortControl
        options={DEFAULT_OPTIONS}
        sortKey="name"
        sortDirection="asc"
        onSortChange={onSortChange}
      />,
    );
    await userEvent.click(screen.getByRole("button", { name: "Sort by Date" }));
    expect(onSortChange).toHaveBeenCalledWith("date", "asc");
  });
});

// ─────────────────────────────────────────────
// Accessibility
// ─────────────────────────────────────────────

describe("FlowSortControl — accessibility", () => {
  it("each button has an aria-label describing its sort action", () => {
    render(
      <FlowSortControl
        options={DEFAULT_OPTIONS}
        sortKey={null}
        sortDirection={null}
        onSortChange={vi.fn()}
      />,
    );
    DEFAULT_OPTIONS.forEach((opt) => {
      expect(screen.getByRole("button", { name: `Sort by ${opt.label}` })).toBeInTheDocument();
    });
  });

  it("applies flow-sort-control class", () => {
    const { container } = render(
      <FlowSortControl
        options={DEFAULT_OPTIONS}
        sortKey={null}
        sortDirection={null}
        onSortChange={vi.fn()}
      />,
    );
    expect(container.querySelector(".flow-sort-control")).toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <FlowSortControl
        options={DEFAULT_OPTIONS}
        sortKey={null}
        sortDirection={null}
        onSortChange={vi.fn()}
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

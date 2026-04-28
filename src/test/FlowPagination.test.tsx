/**
 * FLOW — FlowPagination Component Tests
 * ───────────────────────────────────────
 * Tests rendering, current page, page change, prev/next buttons,
 * disabled state, and accessibility behavior.
 *
 * Requires: vitest + @testing-library/react + jsdom
 * Run: npx vitest run src/test/FlowPagination.test.tsx
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";

import { FlowPagination } from "@flow/components";

// ─────────────────────────────────────────────
// Rendering
// ─────────────────────────────────────────────

describe("FlowPagination — rendering", () => {
  it("renders the current page button with aria-current='page'", () => {
    render(<FlowPagination page={3} totalPages={10} onChange={vi.fn()} />);
    expect(screen.getByRole("button", { name: "Page 3" })).toHaveAttribute("aria-current", "page");
  });

  it("renders previous and next navigation buttons", () => {
    render(<FlowPagination page={3} totalPages={10} onChange={vi.fn()} />);
    expect(screen.getByRole("button", { name: "Previous page" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Next page" })).toBeInTheDocument();
  });

  it("renders first and last page buttons when showEdges=true", () => {
    render(<FlowPagination page={5} totalPages={10} onChange={vi.fn()} showEdges />);
    expect(screen.getByRole("button", { name: "First page" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Last page" })).toBeInTheDocument();
  });

  it("renders page numbers", () => {
    render(<FlowPagination page={1} totalPages={5} onChange={vi.fn()} />);
    expect(screen.getByRole("button", { name: "Page 1" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Page 5" })).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// Interaction
// ─────────────────────────────────────────────

describe("FlowPagination — interaction", () => {
  it("calls onChange when a page button is clicked", async () => {
    const onChange = vi.fn();
    render(<FlowPagination page={1} totalPages={5} onChange={onChange} />);
    await userEvent.click(screen.getByRole("button", { name: "Page 3" }));
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it("calls onChange with page-1 when previous is clicked", async () => {
    const onChange = vi.fn();
    render(<FlowPagination page={3} totalPages={10} onChange={onChange} />);
    await userEvent.click(screen.getByRole("button", { name: "Previous page" }));
    expect(onChange).toHaveBeenCalledWith(2);
  });

  it("calls onChange with page+1 when next is clicked", async () => {
    const onChange = vi.fn();
    render(<FlowPagination page={3} totalPages={10} onChange={onChange} />);
    await userEvent.click(screen.getByRole("button", { name: "Next page" }));
    expect(onChange).toHaveBeenCalledWith(4);
  });

  it("calls onChange when next is clicked (alternate variable name)", async () => {
    const onChange = vi.fn();
    render(<FlowPagination page={1} totalPages={5} onChange={onChange} />);
    await userEvent.click(screen.getByRole("button", { name: "Next page" }));
    expect(onChange).toHaveBeenCalledWith(2);
  });
});

// ─────────────────────────────────────────────
// States
// ─────────────────────────────────────────────

describe("FlowPagination — states", () => {
  it("disables previous button on first page", () => {
    render(<FlowPagination page={1} totalPages={10} onChange={vi.fn()} />);
    expect(screen.getByRole("button", { name: "Previous page" })).toBeDisabled();
  });

  it("disables next button on last page", () => {
    render(<FlowPagination page={10} totalPages={10} onChange={vi.fn()} />);
    expect(screen.getByRole("button", { name: "Next page" })).toBeDisabled();
  });

  it("disables all buttons when disabled=true", () => {
    render(<FlowPagination page={3} totalPages={10} onChange={vi.fn()} disabled />);
    const buttons = screen.getAllByRole("button");
    buttons.forEach((btn) => {
      expect(btn).toBeDisabled();
    });
  });

  it("shows loading indicator when loading=true", () => {
    render(<FlowPagination page={3} totalPages={10} onChange={vi.fn()} loading />);
    const nav = screen.getByRole("navigation");
    expect(nav).toHaveAttribute("aria-busy", "true");
  });
});

// ─────────────────────────────────────────────
// Accessibility
// ─────────────────────────────────────────────

describe("FlowPagination — accessibility", () => {
  it("renders as a <nav> element", () => {
    render(<FlowPagination page={1} totalPages={5} onChange={vi.fn()} />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("has default aria-label 'Pagination'", () => {
    render(<FlowPagination page={1} totalPages={5} onChange={vi.fn()} />);
    expect(screen.getByRole("navigation")).toHaveAttribute("aria-label", "Pagination");
  });

  it("accepts custom aria-label", () => {
    render(
      <FlowPagination page={1} totalPages={5} onChange={vi.fn()} aria-label="Results navigation" />,
    );
    expect(screen.getByRole("navigation")).toHaveAttribute("aria-label", "Results navigation");
  });

  it("has no axe violations", async () => {
    const { container } = render(<FlowPagination page={1} totalPages={5} onChange={vi.fn()} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

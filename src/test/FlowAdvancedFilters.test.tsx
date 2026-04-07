/**
 * FLOW — FlowAdvancedFilters Component Tests
 * ──────────────────────────────────────────────
 * Tests rendering, interaction, states, and accessibility.
 *
 * Requires: vitest + @testing-library/react + jsdom
 * Run: npx vitest run src/test/FlowAdvancedFilters.test.tsx
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";

import { FlowAdvancedFilters } from "../app/components/patterns";

const fields = [
  { key: "name", label: "Name", type: "text" },
  { key: "status", label: "Status", type: "select", options: [{ value: "active", label: "Active" }] },
];

const filters = [{ id: "f-1", field: "name", operator: "contains", value: "test" }];

// ─────────────────────────────────────────────
// Rendering
// ─────────────────────────────────────────────

describe("FlowAdvancedFilters — rendering", () => {
  it("renders Filters header", () => {
    render(
      <FlowAdvancedFilters fields={fields} filters={[]} onFiltersChange={vi.fn()} />,
    );
    expect(screen.getByText("Filters")).toBeInTheDocument();
  });

  it("renders Add filter button", () => {
    render(
      <FlowAdvancedFilters fields={fields} filters={[]} onFiltersChange={vi.fn()} />,
    );
    expect(screen.getByText("Add filter")).toBeInTheDocument();
  });

  it("renders filter rows with labels", () => {
    render(
      <FlowAdvancedFilters fields={fields} filters={filters} onFiltersChange={vi.fn()} />,
    );
    expect(screen.getByText("Where")).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// Interaction
// ─────────────────────────────────────────────

describe("FlowAdvancedFilters — interaction", () => {
  it("Add filter calls onFiltersChange with a new array", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <FlowAdvancedFilters fields={fields} filters={[]} onFiltersChange={onChange} />,
    );
    await user.click(screen.getByText("Add filter"));
    expect(onChange).toHaveBeenCalledTimes(1);
    const newFilters = onChange.mock.calls[0][0];
    expect(newFilters).toHaveLength(1);
    expect(newFilters[0]).toMatchObject({ field: "name", operator: "contains", value: "" });
  });

  it("remove button calls onFiltersChange without that row", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <FlowAdvancedFilters fields={fields} filters={filters} onFiltersChange={onChange} />,
    );
    await user.click(screen.getByLabelText("Remove filter"));
    expect(onChange).toHaveBeenCalledWith([]);
  });

  it("Clear all calls onClear", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const onClear = vi.fn();
    render(
      <FlowAdvancedFilters fields={fields} filters={filters} onFiltersChange={onChange} onClear={onClear} />,
    );
    await user.click(screen.getByText("Clear all"));
    expect(onChange).toHaveBeenCalledWith([]);
    expect(onClear).toHaveBeenCalledTimes(1);
  });
});

// ─────────────────────────────────────────────
// States
// ─────────────────────────────────────────────

describe("FlowAdvancedFilters — states", () => {
  it("error sets data-state and aria-invalid", () => {
    const { container } = render(
      <FlowAdvancedFilters fields={fields} filters={[]} onFiltersChange={vi.fn()} error />,
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root).toHaveAttribute("data-state", "error");
    expect(root).toHaveAttribute("aria-invalid", "true");
  });

  it("loading sets data-state and aria-busy", () => {
    const { container } = render(
      <FlowAdvancedFilters fields={fields} filters={[]} onFiltersChange={vi.fn()} loading />,
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root).toHaveAttribute("data-state", "loading");
    expect(root).toHaveAttribute("aria-busy", "true");
  });

  it("maxFilters disables add button when reached", () => {
    render(
      <FlowAdvancedFilters fields={fields} filters={filters} onFiltersChange={vi.fn()} maxFilters={1} />,
    );
    expect(screen.getByText("Add filter").closest("button")).toBeDisabled();
  });
});

// ─────────────────────────────────────────────
// Accessibility
// ─────────────────────────────────────────────

describe("FlowAdvancedFilters — accessibility", () => {
  it("has no axe violations", async () => {
    const { container } = render(
      <FlowAdvancedFilters fields={fields} filters={[]} onFiltersChange={vi.fn()} />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

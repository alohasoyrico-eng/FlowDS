/**
 * FLOW — FlowDataTable Component Tests
 * ──────────────────────────────────────────────
 * Tests rendering, sorting, filtering, empty/error/loading states, and accessibility.
 *
 * Requires: vitest + @testing-library/react + jsdom
 * Run: npx vitest run src/test/FlowDataTable.test.tsx
 */
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";

import { FlowDataTable } from "../app/components/patterns";

const columns = [
  { key: "name" as const, header: "Name", sortable: true },
  { key: "age" as const, header: "Age", sortable: true },
];

const data = [
  { id: "1", name: "Alice", age: 30 },
  { id: "2", name: "Bob", age: 25 },
  { id: "3", name: "Charlie", age: 35 },
];

// ─────────────────────────────────────────────
// Rendering
// ─────────────────────────────────────────────

describe("FlowDataTable — rendering", () => {
  it("renders column headers", () => {
    render(<FlowDataTable columns={columns} data={data} aria-label="Test table" />);
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Age")).toBeInTheDocument();
  });

  it("renders data rows", () => {
    render(<FlowDataTable columns={columns} data={data} aria-label="Test table" />);
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
    expect(screen.getByText("Charlie")).toBeInTheDocument();
  });

  it("renders caption when provided", () => {
    render(<FlowDataTable columns={columns} data={data} caption="Employee data" aria-label="Test table" />);
    expect(screen.getByText("Employee data")).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// Sorting
// ─────────────────────────────────────────────

describe("FlowDataTable — sorting", () => {
  it("clicking sortable column header sorts data", async () => {
    const user = userEvent.setup();
    render(<FlowDataTable columns={columns} data={data} pageSize={0} aria-label="Test table" />);
    await user.click(screen.getByText("Name"));
    const rows = screen.getAllByRole("row");
    expect(within(rows[1]).getByText("Alice")).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// Filtering
// ─────────────────────────────────────────────

describe("FlowDataTable — filtering", () => {
  it("typing in search box filters rows", async () => {
    const user = userEvent.setup();
    render(<FlowDataTable columns={columns} data={data} searchable pageSize={0} aria-label="Test table" />);
    await user.type(screen.getByLabelText("Filter table"), "Alice");
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.queryByText("Bob")).not.toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// Empty / Error / Loading
// ─────────────────────────────────────────────

describe("FlowDataTable — empty/error/loading", () => {
  it("empty data shows 'No data' message", () => {
    render(<FlowDataTable columns={columns} data={[]} aria-label="Test table" />);
    expect(screen.getByText("No data")).toBeInTheDocument();
  });

  it("error shows error message", () => {
    render(<FlowDataTable columns={columns} data={data} error aria-label="Test table" />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText("An error occurred loading data")).toBeInTheDocument();
  });

  it("loading sets data-state and aria-busy attributes", () => {
    const { container } = render(
      <FlowDataTable columns={columns} data={data} loading aria-label="Test table" />,
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root).toHaveAttribute("data-state", "loading");
    expect(root).toHaveAttribute("aria-busy", "true");
  });

  it("shows custom error message", () => {
    render(<FlowDataTable columns={columns} data={data} error errorMessage="DB timeout" aria-label="Test table" />);
    expect(screen.getByText("DB timeout")).toBeInTheDocument();
  });

  it("shows loading overlay", () => {
    render(<FlowDataTable columns={columns} data={data} loading aria-label="Test table" />);
    expect(screen.getByLabelText("Loading")).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// Accessibility
// ─────────────────────────────────────────────

describe("FlowDataTable — accessibility", () => {
  it("applies aria-label on wrapper", () => {
    render(<FlowDataTable columns={columns} data={data} aria-label="Test table" />);
    expect(screen.getByLabelText("Test table")).toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <FlowDataTable columns={columns} data={data} aria-label="Test table" />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

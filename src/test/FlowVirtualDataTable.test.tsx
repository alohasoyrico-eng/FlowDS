/**
 * FLOW — FlowVirtualDataTable Component Tests
 * ────────────────────────────────────────────
 * Tests rendering of table structure, column headers, rows,
 * sorting behavior, and ARIA attributes.
 *
 * Requires: vitest + @testing-library/react + jsdom
 * Run: npx vitest run src/test/FlowVirtualDataTable.test.tsx
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { FlowVirtualDataTable } from "../app/components/patterns";

// jsdom does not implement scrollIntoView — stub it to prevent runtime errors
Element.prototype.scrollIntoView = vi.fn();

interface TestRow {
  id: number;
  name: string;
  email: string;
}

const columns = [
  { key: "name", header: "Name", sortable: true },
  { key: "email", header: "Email" },
];

const data: TestRow[] = [
  { id: 1, name: "Alice", email: "alice@test.com" },
  { id: 2, name: "Bob", email: "bob@test.com" },
  { id: 3, name: "Charlie", email: "charlie@test.com" },
];

const rowKey = (row: TestRow) => String(row.id);

// ─────────────────────────────────────────────
// Rendering
// ─────────────────────────────────────────────

describe("FlowVirtualDataTable — rendering", () => {
  it("renders with role='table'", () => {
    render(<FlowVirtualDataTable columns={columns} data={data} rowKey={rowKey} />);
    expect(screen.getByRole("table")).toBeInTheDocument();
  });

  it("renders column headers", () => {
    render(<FlowVirtualDataTable columns={columns} data={data} rowKey={rowKey} />);
    const headers = screen.getAllByRole("columnheader");
    expect(headers).toHaveLength(2);
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
  });

  it("renders data rows", () => {
    render(<FlowVirtualDataTable columns={columns} data={data} rowKey={rowKey} />);
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("bob@test.com")).toBeInTheDocument();
  });

  it("shows the row count in the footer", () => {
    render(<FlowVirtualDataTable columns={columns} data={data} rowKey={rowKey} />);
    expect(screen.getByText("3 rows")).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// Interaction
// ─────────────────────────────────────────────

describe("FlowVirtualDataTable — interaction", () => {
  it("toggles sort on sortable column header click", async () => {
    render(<FlowVirtualDataTable columns={columns} data={data} rowKey={rowKey} />);
    const nameHeader = screen.getByText("Name").closest("[role='columnheader']")!;
    await userEvent.click(nameHeader);
    expect(nameHeader).toHaveAttribute("aria-sort", "ascending");
    await userEvent.click(nameHeader);
    expect(nameHeader).toHaveAttribute("aria-sort", "descending");
  });

  it("shows empty message when data is empty", () => {
    render(<FlowVirtualDataTable columns={columns} data={[]} rowKey={rowKey} emptyMessage="No records found" />);
    expect(screen.getByText("No records found")).toBeInTheDocument();
  });

  it("displays search input when searchable is true", () => {
    render(<FlowVirtualDataTable columns={columns} data={data} rowKey={rowKey} searchable />);
    expect(screen.getByLabelText("Filter table")).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// Accessibility
// ─────────────────────────────────────────────

describe("FlowVirtualDataTable — accessibility", () => {
  it("has aria-label on the table", () => {
    render(<FlowVirtualDataTable columns={columns} data={data} rowKey={rowKey} aria-label="Users table" />);
    expect(screen.getByRole("table")).toHaveAttribute("aria-label", "Users table");
  });

  it("has aria-rowcount reflecting total rows", () => {
    render(<FlowVirtualDataTable columns={columns} data={data} rowKey={rowKey} />);
    expect(screen.getByRole("table")).toHaveAttribute("aria-rowcount", "4");
  });

  it("has aria-colcount reflecting column count", () => {
    render(<FlowVirtualDataTable columns={columns} data={data} rowKey={rowKey} />);
    expect(screen.getByRole("table")).toHaveAttribute("aria-colcount", "2");
  });

  it("rows have role='row' and cells have role='cell'", () => {
    render(<FlowVirtualDataTable columns={columns} data={data} rowKey={rowKey} />);
    const rows = screen.getAllByRole("row");
    expect(rows.length).toBeGreaterThan(1);
    expect(screen.getAllByRole("cell").length).toBeGreaterThan(0);
  });
});

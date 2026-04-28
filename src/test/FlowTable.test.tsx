/**
 * FLOW — FlowTable Component Tests
 * ──────────────────────────────────────
 * Tests rendering, interaction, and accessibility.
 *
 * Requires: vitest + @testing-library/react + jsdom
 * Run: npx vitest run src/test/FlowTable.test.tsx
 */
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";

import { FlowTable } from "@flow/components";

const sampleColumns = [
  { key: "name", header: "Name" },
  { key: "email", header: "Email" },
  { key: "role", header: "Role" },
];

const sampleData = [
  { name: "Alice", email: "alice@example.com", role: "Admin" },
  { name: "Bob", email: "bob@example.com", role: "User" },
  { name: "Carol", email: "carol@example.com", role: "Editor" },
];

// ─────────────────────────────────────────────
// Rendering
// ─────────────────────────────────────────────

describe("FlowTable — rendering", () => {
  it("renders a table element", () => {
    render(<FlowTable columns={sampleColumns} data={sampleData} />);
    expect(screen.getByRole("table")).toBeInTheDocument();
  });

  it("renders column headers matching the columns prop", () => {
    render(<FlowTable columns={sampleColumns} data={sampleData} />);
    const headers = screen.getAllByRole("columnheader");
    expect(headers).toHaveLength(3);
    expect(headers[0]).toHaveTextContent("Name");
    expect(headers[1]).toHaveTextContent("Email");
    expect(headers[2]).toHaveTextContent("Role");
  });

  it("renders the correct number of data rows", () => {
    render(<FlowTable columns={sampleColumns} data={sampleData} />);
    // Data rows only (excluding the header row)
    const tbody = screen.getByRole("table").querySelector("tbody")!;
    const rows = within(tbody).getAllByRole("row");
    expect(rows).toHaveLength(3);
  });

  it("renders cell content from the data", () => {
    render(<FlowTable columns={sampleColumns} data={sampleData} />);
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("bob@example.com")).toBeInTheDocument();
    expect(screen.getByText("Editor")).toBeInTheDocument();
  });

  it("shows the empty message when data array is empty", () => {
    render(<FlowTable columns={sampleColumns} data={[]} emptyMessage="No records found" />);
    expect(screen.getByText("No records found")).toBeInTheDocument();
  });

  it("renders a caption when caption prop is provided", () => {
    render(<FlowTable columns={sampleColumns} data={sampleData} caption="User list" />);
    expect(screen.getByText("User list")).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// Interaction
// ─────────────────────────────────────────────

describe("FlowTable — interaction", () => {
  it("renders custom cell content via column render function", () => {
    const columns = [
      { key: "name", header: "Name" },
      {
        key: "actions",
        header: "Actions",
        render: (_row: (typeof sampleData)[0]) => <button type="button">Edit</button>,
      },
    ];
    render(<FlowTable columns={columns} data={sampleData} />);
    const editButtons = screen.getAllByRole("button", { name: "Edit" });
    expect(editButtons).toHaveLength(3);
  });

  it("fires click handler on interactive cell content", async () => {
    const onClick = vi.fn();
    const columns = [
      { key: "name", header: "Name" },
      {
        key: "actions",
        header: "Actions",
        render: (_row: (typeof sampleData)[0]) => (
          <button type="button" onClick={onClick}>
            Delete
          </button>
        ),
      },
    ];
    render(<FlowTable columns={columns} data={sampleData} />);
    const deleteButtons = screen.getAllByRole("button", { name: "Delete" });
    await userEvent.click(deleteButtons[0]);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

// ─────────────────────────────────────────────
// Accessibility
// ─────────────────────────────────────────────

describe("FlowTable — accessibility", () => {
  it("uses semantic table, thead, and tbody elements", () => {
    render(<FlowTable columns={sampleColumns} data={sampleData} />);
    const table = screen.getByRole("table");
    expect(table.querySelector("thead")).toBeInTheDocument();
    expect(table.querySelector("tbody")).toBeInTheDocument();
  });

  it("column headers use <th> elements with columnheader role", () => {
    render(<FlowTable columns={sampleColumns} data={sampleData} />);
    const headers = screen.getAllByRole("columnheader");
    headers.forEach((th) => {
      expect(th.tagName).toBe("TH");
    });
  });

  it("has no axe violations", async () => {
    const { container } = render(<FlowTable columns={sampleColumns} data={sampleData} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

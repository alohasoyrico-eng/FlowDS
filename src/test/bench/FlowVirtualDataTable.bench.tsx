import { cleanup, render } from "@testing-library/react";
import { afterEach, bench, describe } from "vitest";

import { FlowVirtualDataTable } from "@flow/patterns";

afterEach(() => {
  cleanup();
});

Element.prototype.scrollIntoView = () => {};

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

interface Row {
  id: number;
  name: string;
  value: number;
  status: string;
}

const columns = [
  { key: "id", header: "ID", sortable: true },
  { key: "name", header: "Name", sortable: true },
  { key: "value", header: "Value", sortable: true },
  { key: "status", header: "Status" },
];

const makeRows = (n: number): Row[] =>
  Array.from({ length: n }, (_, i) => ({
    id: i + 1,
    name: `Item ${i + 1}`,
    value: (i + 1) * 100,
    status: i % 2 === 0 ? "active" : "inactive",
  }));

const rowKey = (row: Row) => String(row.id);

describe("FlowVirtualDataTable — render performance", () => {
  bench("100 rows", () => {
    render(<FlowVirtualDataTable columns={columns} data={makeRows(100)} rowKey={rowKey} />);
  });

  bench("500 rows", () => {
    render(<FlowVirtualDataTable columns={columns} data={makeRows(500)} rowKey={rowKey} />);
  });

  bench("1000 rows", () => {
    render(<FlowVirtualDataTable columns={columns} data={makeRows(1_000)} rowKey={rowKey} />);
  });

  bench("5000 rows", () => {
    render(<FlowVirtualDataTable columns={columns} data={makeRows(5_000)} rowKey={rowKey} />);
  });
});

describe("FlowVirtualDataTable — render with features", () => {
  bench("1000 rows + searchable + striped", () => {
    render(
      <FlowVirtualDataTable
        columns={columns}
        data={makeRows(1_000)}
        rowKey={rowKey}
        searchable
        striped
      />,
    );
  });
});

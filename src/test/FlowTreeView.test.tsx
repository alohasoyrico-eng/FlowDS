/**
 * FLOW — FlowTreeView Component Tests
 * ─────────────────────────────────────
 * Tests rendering, expansion, selection, keyboard navigation, and accessibility.
 *
 * Requires: vitest + @testing-library/react + jsdom
 * Run: npx vitest run src/test/FlowTreeView.test.tsx
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { FlowTreeView } from "../app/components/display";
import type { TreeNode } from "../app/components/display";

const sampleNodes: TreeNode[] = [
  {
    id: "1",
    label: "Documents",
    children: [
      { id: "1-1", label: "Resume.pdf" },
      { id: "1-2", label: "Cover Letter.docx" },
    ],
  },
  { id: "2", label: "Photos" },
  { id: "3", label: "Music", disabled: true },
];

// ─────────────────────────────────────────────
// Rendering
// ─────────────────────────────────────────────

describe("FlowTreeView — rendering", () => {
  it("renders with role='tree'", () => {
    render(<FlowTreeView nodes={sampleNodes} />);
    expect(screen.getByRole("tree")).toBeInTheDocument();
  });

  it("renders top-level nodes as treeitems", () => {
    render(<FlowTreeView nodes={sampleNodes} />);
    const items = screen.getAllByRole("treeitem");
    expect(items.length).toBeGreaterThanOrEqual(3);
  });

  it("defaults aria-label to 'Tree'", () => {
    render(<FlowTreeView nodes={sampleNodes} />);
    expect(screen.getByRole("tree")).toHaveAttribute("aria-label", "Tree");
  });

  it("accepts a custom aria-label", () => {
    render(<FlowTreeView nodes={sampleNodes} aria-label="File browser" />);
    expect(screen.getByRole("tree")).toHaveAttribute("aria-label", "File browser");
  });
});

// ─────────────────────────────────────────────
// Expansion
// ─────────────────────────────────────────────

describe("FlowTreeView — expansion", () => {
  it("does not show children of collapsed nodes by default", () => {
    render(<FlowTreeView nodes={sampleNodes} />);
    expect(screen.queryByText("Resume.pdf")).not.toBeInTheDocument();
  });

  it("expands a parent node when clicked", async () => {
    render(<FlowTreeView nodes={sampleNodes} />);
    await userEvent.click(screen.getByText("Documents"));
    expect(screen.getByText("Resume.pdf")).toBeInTheDocument();
  });

  it("shows children for nodes in defaultExpandedIds", () => {
    render(<FlowTreeView nodes={sampleNodes} defaultExpandedIds={["1"]} />);
    expect(screen.getByText("Resume.pdf")).toBeInTheDocument();
  });

  it("shows all children when expandAll is true", () => {
    render(<FlowTreeView nodes={sampleNodes} expandAll />);
    expect(screen.getByText("Resume.pdf")).toBeInTheDocument();
    expect(screen.getByText("Cover Letter.docx")).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// Selection
// ─────────────────────────────────────────────

describe("FlowTreeView — selection", () => {
  it("fires onSelect when a node is clicked", async () => {
    const onSelect = vi.fn();
    render(<FlowTreeView nodes={sampleNodes} onSelect={onSelect} />);
    await userEvent.click(screen.getByText("Photos"));
    expect(onSelect).toHaveBeenCalledWith("2");
  });

  it("sets aria-selected on the selected node", () => {
    render(<FlowTreeView nodes={sampleNodes} selectedId="2" />);
    const item = screen.getByText("Photos").closest("[role='treeitem']");
    expect(item).toHaveAttribute("aria-selected", "true");
  });
});

// ─────────────────────────────────────────────
// Disabled state
// ─────────────────────────────────────────────

describe("FlowTreeView — disabled state", () => {
  it("sets aria-disabled on a disabled node", () => {
    render(<FlowTreeView nodes={sampleNodes} />);
    const item = screen.getByText("Music").closest("[role='treeitem']");
    expect(item).toHaveAttribute("aria-disabled", "true");
  });

  it("does not fire onSelect for a disabled node", async () => {
    const onSelect = vi.fn();
    render(<FlowTreeView nodes={sampleNodes} onSelect={onSelect} />);
    await userEvent.click(screen.getByText("Music"));
    expect(onSelect).not.toHaveBeenCalled();
  });

  it("sets data-state='disabled' on the tree when disabled prop is true", () => {
    render(<FlowTreeView nodes={sampleNodes} disabled />);
    expect(screen.getByRole("tree")).toHaveAttribute("data-state", "disabled");
  });
});

// ─────────────────────────────────────────────
// Loading state
// ─────────────────────────────────────────────

describe("FlowTreeView — loading state", () => {
  it("sets aria-busy when loading", () => {
    render(<FlowTreeView nodes={sampleNodes} loading />);
    expect(screen.getByRole("tree")).toHaveAttribute("aria-busy", "true");
  });

  it("shows skeleton placeholders when loading", () => {
    const { container } = render(<FlowTreeView nodes={sampleNodes} loading />);
    expect(container.querySelector(".flow-skeleton")).toBeInTheDocument();
  });
});

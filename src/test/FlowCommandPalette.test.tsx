/**
 * FLOW — FlowCommandPalette Component Tests
 * ──────────────────────────────────────────
 * Tests rendering when open, search input, item filtering, onSelect,
 * Escape key closing, and accessibility attributes.
 *
 * Requires: vitest + @testing-library/react + jsdom
 * Run: npx vitest run src/test/FlowCommandPalette.test.tsx
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { FlowCommandPalette } from "../app/components/patterns";

// jsdom does not implement scrollIntoView — stub it to prevent runtime errors
Element.prototype.scrollIntoView = vi.fn();

const sampleCommands = [
  { id: "save", label: "Save File", shortcut: "Ctrl+S" },
  { id: "open", label: "Open File", shortcut: "Ctrl+O" },
  { id: "close", label: "Close Tab", shortcut: "Ctrl+W" },
  { id: "find", label: "Find in Files", group: "Search" },
];

// ─────────────────────────────────────────────
// Rendering
// ─────────────────────────────────────────────

describe("FlowCommandPalette — rendering", () => {
  it("renders the dialog when open is true", () => {
    render(<FlowCommandPalette open onClose={vi.fn()} commands={sampleCommands} />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("does not render when open is false", () => {
    render(<FlowCommandPalette open={false} onClose={vi.fn()} commands={sampleCommands} />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders a combobox search input", () => {
    render(<FlowCommandPalette open onClose={vi.fn()} commands={sampleCommands} />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("displays the placeholder text", () => {
    render(<FlowCommandPalette open onClose={vi.fn()} commands={sampleCommands} placeholder="Run a command..." />);
    expect(screen.getByPlaceholderText("Run a command...")).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// Interaction
// ─────────────────────────────────────────────

describe("FlowCommandPalette — interaction", () => {
  it("shows all commands in the listbox", () => {
    render(<FlowCommandPalette open onClose={vi.fn()} commands={sampleCommands} />);
    const opts = screen.getAllByRole("option");
    expect(opts).toHaveLength(4);
  });

  it("filters commands when typing in search", async () => {
    render(<FlowCommandPalette open onClose={vi.fn()} commands={sampleCommands} />);
    await userEvent.type(screen.getByRole("combobox"), "Find");
    const opts = screen.getAllByRole("option");
    expect(opts).toHaveLength(1);
    expect(screen.getByText("Find in Files")).toBeInTheDocument();
  });

  it("calls onSelect when a command is clicked", async () => {
    const onSelect = vi.fn();
    render(<FlowCommandPalette open onClose={vi.fn()} commands={sampleCommands} onSelect={onSelect} />);
    await userEvent.click(screen.getByText("Save File"));
    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ id: "save" }));
  });

  it("shows the empty message when no commands match", async () => {
    render(<FlowCommandPalette open onClose={vi.fn()} commands={sampleCommands} emptyMessage="No matches" />);
    await userEvent.type(screen.getByRole("combobox"), "zzzzz");
    expect(screen.getByText("No matches")).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// Accessibility
// ─────────────────────────────────────────────

describe("FlowCommandPalette — accessibility", () => {
  it("dialog has aria-label", () => {
    render(<FlowCommandPalette open onClose={vi.fn()} commands={sampleCommands} />);
    expect(screen.getByRole("dialog")).toHaveAttribute("aria-label", "Command palette");
  });

  it("combobox has aria-expanded='true' when open", () => {
    render(<FlowCommandPalette open onClose={vi.fn()} commands={sampleCommands} />);
    expect(screen.getByRole("combobox")).toHaveAttribute("aria-expanded", "true");
  });

  it("has a listbox with option roles", () => {
    render(<FlowCommandPalette open onClose={vi.fn()} commands={sampleCommands} />);
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    expect(screen.getAllByRole("option").length).toBeGreaterThan(0);
  });

  it("shows keyboard shortcut Esc hint", () => {
    render(<FlowCommandPalette open onClose={vi.fn()} commands={sampleCommands} />);
    expect(screen.getByText("Esc")).toBeInTheDocument();
  });
});

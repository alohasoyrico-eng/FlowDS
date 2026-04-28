/**
 * FLOW — FlowSearch Component Tests
 * ──────────────────────────────────
 * Tests rendering, onChange/onSubmit callbacks, clear button,
 * placeholder, disabled state, and accessibility attributes.
 *
 * Requires: vitest + @testing-library/react + jsdom
 * Run: npx vitest run src/test/FlowSearch.test.tsx
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";

import { FlowSearch } from "@flow/patterns";

// ─────────────────────────────────────────────
// Rendering
// ─────────────────────────────────────────────

describe("FlowSearch — rendering", () => {
  it("renders a search input", () => {
    render(<FlowSearch />);
    expect(screen.getByRole("searchbox")).toBeInTheDocument();
  });

  it("shows the default placeholder", () => {
    render(<FlowSearch />);
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
  });

  it("shows a custom placeholder when provided", () => {
    render(<FlowSearch placeholder="Find items..." />);
    expect(screen.getByPlaceholderText("Find items...")).toBeInTheDocument();
  });

  it("renders the shortcut hint when provided and input is empty", () => {
    render(<FlowSearch shortcut="/" />);
    expect(screen.getByText("/")).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// Interaction
// ─────────────────────────────────────────────

describe("FlowSearch — interaction", () => {
  it("calls onChange when the user types", async () => {
    const onChange = vi.fn();
    render(<FlowSearch onChange={onChange} />);
    await userEvent.type(screen.getByRole("searchbox"), "hello");
    expect(onChange).toHaveBeenLastCalledWith("hello");
  });

  it("calls onSubmit with the current value on Enter", async () => {
    const onSubmit = vi.fn();
    render(<FlowSearch onSubmit={onSubmit} defaultValue="test query" />);
    const input = screen.getByRole("searchbox");
    await userEvent.click(input);
    await userEvent.keyboard("{Enter}");
    expect(onSubmit).toHaveBeenCalledWith("test query");
  });

  it("shows clear button when input has text", async () => {
    render(<FlowSearch defaultValue="some text" />);
    expect(screen.getByLabelText("Clear")).toBeInTheDocument();
  });

  it("clears the input when clear button is clicked", async () => {
    const onChange = vi.fn();
    render(<FlowSearch defaultValue="some text" onChange={onChange} />);
    await userEvent.click(screen.getByLabelText("Clear"));
    expect(onChange).toHaveBeenCalledWith("");
  });
});

// ─────────────────────────────────────────────
// Accessibility
// ─────────────────────────────────────────────

describe("FlowSearch — accessibility", () => {
  it("has aria-label='Search' by default", () => {
    render(<FlowSearch />);
    expect(screen.getByRole("searchbox")).toHaveAttribute("aria-label", "Search");
  });

  it("supports custom aria-label", () => {
    render(<FlowSearch aria-label="Search products" />);
    expect(screen.getByRole("searchbox")).toHaveAttribute("aria-label", "Search products");
  });

  it("disables the input when disabled is true", () => {
    render(<FlowSearch disabled />);
    expect(screen.getByRole("searchbox")).toBeDisabled();
  });

  it("does not show clear button when disabled", () => {
    render(<FlowSearch defaultValue="text" disabled />);
    expect(screen.queryByLabelText("Clear")).not.toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    const { container } = render(<FlowSearch />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

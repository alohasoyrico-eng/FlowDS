/**
 * FLOW — FlowInlineEditable Component Tests
 * ──────────────────────────────────
 * Tests rendering, interaction, and accessibility.
 *
 * Requires: vitest + @testing-library/react + jsdom
 * Run: npx vitest run src/test/FlowInlineEditable.test.tsx
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";

import { FlowInlineEditable } from "../app/components/patterns";

// ─────────────────────────────────────────────
// Rendering
// ─────────────────────────────────────────────

describe("FlowInlineEditable — rendering", () => {
  it("renders the current value in display mode", () => {
    render(<FlowInlineEditable value="Hello" onChange={vi.fn()} />);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("renders the placeholder when value is empty", () => {
    render(<FlowInlineEditable value="" onChange={vi.fn()} placeholder="Enter text" />);
    expect(screen.getByText("Enter text")).toBeInTheDocument();
  });

  it("renders with role='button' in display mode", () => {
    render(<FlowInlineEditable value="Click me" onChange={vi.fn()} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("is not interactive when disabled", () => {
    render(<FlowInlineEditable value="Disabled" onChange={vi.fn()} disabled />);
    const btn = screen.getByRole("button");
    expect(btn).toHaveAttribute("tabindex", "-1");
  });

  it("sets data-empty when value is empty", () => {
    render(<FlowInlineEditable value="" onChange={vi.fn()} />);
    expect(screen.getByRole("button")).toHaveAttribute("data-empty");
  });
});

// ─────────────────────────────────────────────
// Interaction
// ─────────────────────────────────────────────

describe("FlowInlineEditable — interaction", () => {
  it("enters edit mode on click showing Save and Cancel", async () => {
    render(<FlowInlineEditable value="Edit me" onChange={vi.fn()} />);
    await userEvent.click(screen.getByRole("button"));
    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
  });

  it("commits the edited value when Save is clicked", async () => {
    const onChange = vi.fn();
    render(<FlowInlineEditable value="Original" onChange={onChange} />);
    await userEvent.click(screen.getByRole("button"));

    const input = screen.getByRole("textbox");
    await userEvent.clear(input);
    await userEvent.type(input, "Updated");
    await userEvent.click(screen.getByRole("button", { name: "Save" }));

    expect(onChange).toHaveBeenCalledWith("Updated");
  });

  it("reverts to original value when Cancel is clicked", async () => {
    const onChange = vi.fn();
    render(<FlowInlineEditable value="Original" onChange={onChange} />);
    await userEvent.click(screen.getByRole("button"));

    const input = screen.getByRole("textbox");
    await userEvent.clear(input);
    await userEvent.type(input, "Changed");
    await userEvent.click(screen.getByRole("button", { name: "Cancel" }));

    expect(onChange).not.toHaveBeenCalledWith("Changed");
    expect(screen.getByText("Original")).toBeInTheDocument();
  });

  it("disabled prevents editing on click", async () => {
    render(<FlowInlineEditable value="Hello" onChange={vi.fn()} disabled />);
    await userEvent.click(screen.getByRole("button"));
    expect(screen.queryByRole("group")).not.toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// Accessibility
// ─────────────────────────────────────────────

describe("FlowInlineEditable — accessibility", () => {
  it("has aria-label in display mode", () => {
    render(<FlowInlineEditable value="Click to edit" onChange={vi.fn()} />);
    expect(screen.getByRole("button")).toHaveAttribute("aria-label", "Click to edit");
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <FlowInlineEditable value="Test value" onChange={vi.fn()} />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

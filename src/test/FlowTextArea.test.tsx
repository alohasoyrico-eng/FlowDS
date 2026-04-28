/**
 * FLOW — FlowTextArea Component Tests
 * ─────────────────────────────────────
 * Tests rendering, controlled input, states, and accessibility for
 * the multi-line text area component.
 *
 * Requires: vitest + @testing-library/react + jsdom
 * Run: npx vitest run src/test/FlowTextArea.test.tsx
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";

import { FlowTextArea } from "@flow/components";

// ─────────────────────────────────────────────
// Rendering
// ─────────────────────────────────────────────

describe("FlowTextArea — rendering", () => {
  it("renders a textarea element", () => {
    render(<FlowTextArea label="Description" />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("renders the label text", () => {
    render(<FlowTextArea label="Comments" />);
    expect(screen.getByText("Comments")).toBeInTheDocument();
  });

  it("associates the label with the textarea via htmlFor", () => {
    render(<FlowTextArea label="Notes" />);
    const textarea = screen.getByRole("textbox");
    expect(textarea.id).toBeTruthy();
    const label = screen.getByText("Notes");
    expect(label.tagName).toBe("LABEL");
    expect(label).toHaveAttribute("for", textarea.id);
  });

  it("applies default rows=4", () => {
    render(<FlowTextArea label="Message" />);
    expect(screen.getByRole("textbox")).toHaveAttribute("rows", "4");
  });

  it("applies custom rows via prop", () => {
    render(<FlowTextArea label="Message" rows={8} />);
    expect(screen.getByRole("textbox")).toHaveAttribute("rows", "8");
  });
});

// ─────────────────────────────────────────────
// Controlled value & onChange
// ─────────────────────────────────────────────

describe("FlowTextArea — controlled input", () => {
  it("displays the controlled value", () => {
    render(<FlowTextArea label="Bio" value="Hello world" onChange={vi.fn()} />);
    expect(screen.getByRole("textbox")).toHaveValue("Hello world");
  });

  it("fires onChange with the new string value on user input", async () => {
    const onChange = vi.fn();
    render(<FlowTextArea label="Bio" value="" onChange={onChange} />);
    await userEvent.type(screen.getByRole("textbox"), "A");
    expect(onChange).toHaveBeenCalledWith("A", expect.anything());
  });
});

// ─────────────────────────────────────────────
// Disabled state
// ─────────────────────────────────────────────

describe("FlowTextArea — disabled state", () => {
  it("disables the native textarea when disabled=true", () => {
    render(<FlowTextArea label="Locked" disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });
});

// ─────────────────────────────────────────────
// Error & hint display
// ─────────────────────────────────────────────

describe("FlowTextArea — error & hint", () => {
  it("displays error message with role='alert'", () => {
    render(<FlowTextArea label="Feedback" error="Required field" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Required field");
  });

  it("sets aria-invalid on the textarea when error is present", () => {
    render(<FlowTextArea label="Feedback" error="Too short" />);
    expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
  });

  it("displays hint text when provided", () => {
    render(<FlowTextArea label="Bio" hint="Max 500 characters" />);
    expect(screen.getByText("Max 500 characters")).toBeInTheDocument();
  });

  it("replaces hint with error when both are provided", () => {
    render(<FlowTextArea label="Bio" hint="Enter your bio" error="Field is required" />);
    expect(screen.getByText("Field is required")).toBeInTheDocument();
    expect(screen.queryByText("Enter your bio")).not.toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// Character counter
// ─────────────────────────────────────────────

describe("FlowTextArea — character counter", () => {
  it("shows character counter when maxLength is set", () => {
    render(<FlowTextArea label="Tweet" maxLength={280} />);
    expect(screen.getByText("0/280")).toBeInTheDocument();
  });

  it("updates character counter as value changes", () => {
    render(<FlowTextArea label="Tweet" value="Hello" maxLength={280} onChange={vi.fn()} />);
    expect(screen.getByText("5/280")).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// ARIA & accessibility
// ─────────────────────────────────────────────

describe("FlowTextArea — accessibility", () => {
  it("links textarea to hint via aria-describedby", () => {
    render(<FlowTextArea label="Notes" hint="Optional notes" />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveAttribute("aria-describedby");
    const hintId = textarea.getAttribute("aria-describedby")!;
    expect(document.getElementById(hintId)).toHaveTextContent("Optional notes");
  });

  it("does not set aria-describedby when no hint or error", () => {
    render(<FlowTextArea label="Plain" />);
    expect(screen.getByRole("textbox")).not.toHaveAttribute("aria-describedby");
  });

  it("has no axe violations", async () => {
    const { container } = render(<FlowTextArea label="Description" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

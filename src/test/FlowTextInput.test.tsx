/**
 * FLOW — FlowTextInput Component Tests
 * ──────────────────────────────────────
 * Tests rendering, controlled input, states, and accessibility.
 *
 * Requires: vitest + @testing-library/react + jsdom
 * Run: npx vitest run src/test/FlowTextInput.test.tsx
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";

import { FlowTextInput } from "@flow/components";

// ─────────────────────────────────────────────
// Rendering
// ─────────────────────────────────────────────

describe("FlowTextInput — rendering", () => {
  it("renders an input element", () => {
    render(<FlowTextInput label="Name" />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("renders the label text", () => {
    render(<FlowTextInput label="Email Address" />);
    expect(screen.getByText("Email Address")).toBeInTheDocument();
  });

  it("associates the label with the input via htmlFor", () => {
    render(<FlowTextInput label="Username" />);
    const input = screen.getByRole("textbox");
    expect(input.id).toBeTruthy();
    const label = screen.getByText("Username");
    expect(label.tagName).toBe("LABEL");
    expect(label).toHaveAttribute("for", input.id);
  });
});

// ─────────────────────────────────────────────
// Controlled value & onChange
// ─────────────────────────────────────────────

describe("FlowTextInput — controlled input", () => {
  it("displays the controlled value", () => {
    render(<FlowTextInput label="Name" value="Alice" onChange={vi.fn()} />);
    expect(screen.getByRole("textbox")).toHaveValue("Alice");
  });

  it("fires onChange with the new string value on user input", async () => {
    const onChange = vi.fn();
    render(<FlowTextInput label="Name" value="" onChange={onChange} />);
    await userEvent.type(screen.getByRole("textbox"), "A");
    expect(onChange).toHaveBeenCalledWith("A", expect.anything());
  });
});

// ─────────────────────────────────────────────
// Disabled state
// ─────────────────────────────────────────────

describe("FlowTextInput — disabled state", () => {
  it("disables the native input when disabled=true", () => {
    render(<FlowTextInput label="Locked" disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });
});

// ─────────────────────────────────────────────
// Error & hint display
// ─────────────────────────────────────────────

describe("FlowTextInput — error & hint", () => {
  it("displays error message with role='alert'", () => {
    render(<FlowTextInput label="Email" error="Invalid email" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Invalid email");
  });

  it("sets aria-invalid on the input when error is present", () => {
    render(<FlowTextInput label="Email" error="Required" />);
    expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
  });

  it("displays hint text when provided", () => {
    render(<FlowTextInput label="Password" hint="Must be 8+ characters" />);
    expect(screen.getByText("Must be 8+ characters")).toBeInTheDocument();
  });

  it("replaces hint with error when both are provided", () => {
    render(<FlowTextInput label="Field" hint="Helpful hint" error="Something went wrong" />);
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(screen.queryByText("Helpful hint")).not.toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// Clearable
// ─────────────────────────────────────────────

describe("FlowTextInput — clearable", () => {
  it("renders a clear button with aria-label='Clear' when clearable and has value", () => {
    render(<FlowTextInput label="Search" value="hello" onChange={vi.fn()} clearable />);
    expect(screen.getByLabelText("Clear")).toBeInTheDocument();
  });

  it("does not render clear button when disabled", () => {
    render(<FlowTextInput label="Search" value="hello" onChange={vi.fn()} clearable disabled />);
    expect(screen.queryByLabelText("Clear")).not.toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// Accessibility
// ─────────────────────────────────────────────

describe("FlowTextInput — accessibility", () => {
  it("has no axe violations", async () => {
    const { container } = render(<FlowTextInput label="Name" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

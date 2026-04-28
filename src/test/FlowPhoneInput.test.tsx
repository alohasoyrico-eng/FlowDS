/**
 * FLOW — FlowPhoneInput Component Tests
 * ──────────────────────────────────────────
 * Tests rendering, interaction, and accessibility.
 *
 * Requires: vitest + @testing-library/react + jsdom
 * Run: npx vitest run src/test/FlowPhoneInput.test.tsx
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";

import { FlowPhoneInput } from "@flow/components";

// jsdom does not implement scrollIntoView — stub it to prevent runtime errors
Element.prototype.scrollIntoView = vi.fn();

// ─────────────────────────────────────────────
// Rendering
// ─────────────────────────────────────────────

describe("FlowPhoneInput — rendering", () => {
  it("renders a telephone input", () => {
    render(<FlowPhoneInput label="Phone number" />);
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "tel");
  });

  it("renders the label text", () => {
    render(<FlowPhoneInput label="Phone number" />);
    expect(screen.getByText("Phone number")).toBeInTheDocument();
  });

  it("renders a country prefix button", () => {
    render(<FlowPhoneInput label="Phone number" />);
    const prefixBtn = screen.getByRole("button", { name: /country/i });
    expect(prefixBtn).toBeInTheDocument();
  });

  it("shows hint text when hint prop is provided", () => {
    render(<FlowPhoneInput label="Phone" hint="Include area code" />);
    expect(screen.getByText("Include area code")).toBeInTheDocument();
  });

  it("shows error message and alert role when error prop is set", () => {
    render(<FlowPhoneInput label="Phone" error="Invalid number" />);
    expect(screen.getByText("Invalid number")).toBeInTheDocument();
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("disables the input when disabled prop is true", () => {
    render(<FlowPhoneInput label="Phone" disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });
});

// ─────────────────────────────────────────────
// Interaction
// ─────────────────────────────────────────────

describe("FlowPhoneInput — interaction", () => {
  it("calls onChange when text is typed", async () => {
    const onChange = vi.fn();
    render(<FlowPhoneInput label="Phone" onChange={onChange} />);
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "612345678");
    expect(onChange).toHaveBeenCalled();
    // Last call should have the full typed value
    expect(onChange).toHaveBeenLastCalledWith("612345678");
  });

  it("displays controlled value", () => {
    render(<FlowPhoneInput label="Phone" value="123456" onChange={vi.fn()} />);
    expect(screen.getByRole("textbox")).toHaveValue("123456");
  });

  it("toggles the country dropdown when the prefix button is clicked", async () => {
    render(<FlowPhoneInput label="Phone" />);
    const prefixBtn = screen.getByRole("button", { name: /country/i });
    expect(prefixBtn).toHaveAttribute("aria-expanded", "false");
    await userEvent.click(prefixBtn);
    expect(prefixBtn).toHaveAttribute("aria-expanded", "true");
  });
});

// ─────────────────────────────────────────────
// Accessibility
// ─────────────────────────────────────────────

describe("FlowPhoneInput — accessibility", () => {
  it("sets aria-invalid when error is present", () => {
    render(<FlowPhoneInput label="Phone" error="Bad number" />);
    expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
  });

  it("associates hint with input via aria-describedby", () => {
    render(<FlowPhoneInput label="Phone" hint="Include country code" />);
    const input = screen.getByRole("textbox");
    const describedBy = input.getAttribute("aria-describedby");
    expect(describedBy).toBeTruthy();
    const hintEl = document.getElementById(describedBy!);
    expect(hintEl).toHaveTextContent("Include country code");
  });

  it("has no axe violations", async () => {
    const { container } = render(<FlowPhoneInput label="Phone number" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

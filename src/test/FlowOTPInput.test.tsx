/**
 * FLOW — FlowOTPInput Component Tests
 * ──────────────────────────────────────
 * Tests rendering, interaction, and accessibility.
 *
 * Requires: vitest + @testing-library/react + jsdom
 * Run: npx vitest run src/test/FlowOTPInput.test.tsx
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";

import { FlowOTPInput } from "@flow/components";

// ─────────────────────────────────────────────
// Rendering
// ─────────────────────────────────────────────

describe("FlowOTPInput — rendering", () => {
  it("renders 6 digit inputs by default", () => {
    render(<FlowOTPInput />);
    const group = screen.getByRole("group", { name: "One-time password" });
    expect(group).toBeInTheDocument();
    const inputs = group.querySelectorAll("input");
    expect(inputs).toHaveLength(6);
  });

  it("renders a custom number of digit inputs via length prop", () => {
    render(<FlowOTPInput length={4} />);
    const group = screen.getByRole("group");
    const inputs = group.querySelectorAll("input");
    expect(inputs).toHaveLength(4);
  });

  it("renders a label when label prop is provided", () => {
    render(<FlowOTPInput label="Enter code" />);
    expect(screen.getByText("Enter code")).toBeInTheDocument();
  });

  it("shows an error message when error and errorMessage are set", () => {
    render(<FlowOTPInput error errorMessage="Invalid code" />);
    expect(screen.getByText("Invalid code")).toBeInTheDocument();
  });

  it("marks inputs as disabled when disabled prop is true", () => {
    render(<FlowOTPInput disabled />);
    const inputs = screen.getAllByRole("textbox");
    inputs.forEach((input) => {
      expect(input).toBeDisabled();
    });
  });
});

// ─────────────────────────────────────────────
// Interaction
// ─────────────────────────────────────────────

describe("FlowOTPInput — interaction", () => {
  it("calls onChange when a digit is typed", async () => {
    const onChange = vi.fn();
    render(<FlowOTPInput length={4} onChange={onChange} />);
    const inputs = screen.getAllByRole("textbox");
    await userEvent.click(inputs[0]);
    await userEvent.type(inputs[0], "5");
    expect(onChange).toHaveBeenCalled();
  });

  it("advances focus to the next input after typing a digit", async () => {
    render(<FlowOTPInput length={4} />);
    const inputs = screen.getAllByRole("textbox");
    await userEvent.click(inputs[0]);
    await userEvent.type(inputs[0], "1");
    expect(inputs[1]).toHaveFocus();
  });

  it("calls onComplete when all digits are filled", async () => {
    const onComplete = vi.fn();
    render(<FlowOTPInput length={4} onComplete={onComplete} />);
    const inputs = screen.getAllByRole("textbox");
    await userEvent.click(inputs[0]);
    await userEvent.type(inputs[0], "1");
    await userEvent.type(inputs[1], "2");
    await userEvent.type(inputs[2], "3");
    await userEvent.type(inputs[3], "4");
    expect(onComplete).toHaveBeenCalledWith("1234");
  });

  it("moves focus backward on Backspace", async () => {
    render(<FlowOTPInput length={4} />);
    const inputs = screen.getAllByRole("textbox");
    await userEvent.click(inputs[0]);
    await userEvent.type(inputs[0], "1");
    // Now focus is on inputs[1], press backspace
    await userEvent.keyboard("{Backspace}");
    // After clearing empty cell, focus should move back
    expect(inputs[0]).toHaveFocus();
  });
});

// ─────────────────────────────────────────────
// Accessibility
// ─────────────────────────────────────────────

describe("FlowOTPInput — accessibility", () => {
  it("each input cell has an aria-label indicating its position", () => {
    render(<FlowOTPInput length={4} />);
    const inputs = screen.getAllByRole("textbox");
    expect(inputs[0]).toHaveAttribute("aria-label", "Digit 1");
    expect(inputs[3]).toHaveAttribute("aria-label", "Digit 4");
  });

  it("sets aria-invalid on inputs when error prop is true", () => {
    render(<FlowOTPInput error />);
    const inputs = screen.getAllByRole("textbox");
    inputs.forEach((input) => {
      expect(input).toHaveAttribute("aria-invalid", "true");
    });
  });

  it("has no axe violations", async () => {
    const { container } = render(<FlowOTPInput label="Verification code" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

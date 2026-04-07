/**
 * FLOW — FlowRadioButton & FlowRadioGroup Component Tests
 * ─────────────────────────────────────────────────────────
 * Tests rendering, checked state, group behavior, and accessibility.
 *
 * Requires: vitest + @testing-library/react + jsdom
 * Run: npx vitest run src/test/FlowRadioButton.test.tsx
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { FlowRadioButton, FlowRadioGroup } from "../app/components/selection";

// ─────────────────────────────────────────────
// FlowRadioButton — Rendering
// ─────────────────────────────────────────────

describe("FlowRadioButton — rendering", () => {
  it("renders a radio input accessible by role", () => {
    render(<FlowRadioButton aria-label="Option A" />);
    expect(screen.getByRole("radio")).toBeInTheDocument();
  });

  it("renders label text when label prop is provided", () => {
    render(<FlowRadioButton label="Option A" value="a" />);
    expect(screen.getByText("Option A")).toBeInTheDocument();
  });

  it("associates the label with the radio via htmlFor", () => {
    render(<FlowRadioButton label="Option B" value="b" />);
    const radio = screen.getByRole("radio");
    expect(radio.id).toBeTruthy();
    const label = screen.getByText("Option B").closest("label");
    expect(label).toHaveAttribute("for", radio.id);
  });
});

// ─────────────────────────────────────────────
// FlowRadioButton — Checked state & onChange
// ─────────────────────────────────────────────

describe("FlowRadioButton — checked/onChange", () => {
  it("renders as checked when checked=true", () => {
    render(<FlowRadioButton checked={true} onChange={vi.fn()} aria-label="Checked" />);
    expect(screen.getByRole("radio")).toBeChecked();
  });

  it("renders as unchecked when checked=false", () => {
    render(<FlowRadioButton checked={false} onChange={vi.fn()} aria-label="Unchecked" />);
    expect(screen.getByRole("radio")).not.toBeChecked();
  });

  it("fires onChange with the value when clicked", async () => {
    const onChange = vi.fn();
    render(<FlowRadioButton value="a" onChange={onChange} aria-label="Option A" />);
    await userEvent.click(screen.getByRole("radio"));
    expect(onChange).toHaveBeenCalledWith("a");
  });
});

// ─────────────────────────────────────────────
// FlowRadioButton — Disabled state
// ─────────────────────────────────────────────

describe("FlowRadioButton — disabled state", () => {
  it("disables the radio when disabled=true", () => {
    render(<FlowRadioButton disabled aria-label="Disabled" />);
    expect(screen.getByRole("radio")).toBeDisabled();
  });

  it("does not fire onChange when disabled", async () => {
    const onChange = vi.fn();
    render(<FlowRadioButton disabled value="a" onChange={onChange} aria-label="Disabled" />);
    await userEvent.click(screen.getByRole("radio"));
    expect(onChange).not.toHaveBeenCalled();
  });
});

// ─────────────────────────────────────────────
// FlowRadioButton — Accessibility
// ─────────────────────────────────────────────

describe("FlowRadioButton — accessibility", () => {
  it("sets aria-invalid when error=true", () => {
    render(<FlowRadioButton error aria-label="Error radio" />);
    expect(screen.getByRole("radio")).toHaveAttribute("data-invalid", "true");
  });

  it("uses aria-label when no visible label is provided", () => {
    render(<FlowRadioButton aria-label="Standalone radio" />);
    expect(screen.getByRole("radio")).toHaveAttribute("aria-label", "Standalone radio");
  });
});

// ─────────────────────────────────────────────
// FlowRadioGroup — Rendering & behavior
// ─────────────────────────────────────────────

describe("FlowRadioGroup — rendering", () => {
  it("renders a radiogroup role", () => {
    render(
      <FlowRadioGroup name="color" aria-label="Pick a color">
        <FlowRadioButton value="red" label="Red" />
        <FlowRadioButton value="blue" label="Blue" />
      </FlowRadioGroup>,
    );
    expect(screen.getByRole("radiogroup")).toBeInTheDocument();
  });

  it("checks the radio matching the controlled value", () => {
    render(
      <FlowRadioGroup name="color" value="blue" aria-label="Pick a color">
        <FlowRadioButton value="red" label="Red" />
        <FlowRadioButton value="blue" label="Blue" />
      </FlowRadioGroup>,
    );
    expect(screen.getByRole("radio", { name: "Blue" })).toBeChecked();
    expect(screen.getByRole("radio", { name: "Red" })).not.toBeChecked();
  });

  it("fires onChange with the selected value when a radio is clicked", async () => {
    const onChange = vi.fn();
    render(
      <FlowRadioGroup name="color" value="red" onChange={onChange} aria-label="Pick a color">
        <FlowRadioButton value="red" label="Red" />
        <FlowRadioButton value="blue" label="Blue" />
      </FlowRadioGroup>,
    );
    await userEvent.click(screen.getByRole("radio", { name: "Blue" }));
    expect(onChange).toHaveBeenCalledWith("blue");
  });

  it("disables all child radios when group disabled=true", () => {
    render(
      <FlowRadioGroup name="color" disabled aria-label="Disabled group">
        <FlowRadioButton value="red" label="Red" />
        <FlowRadioButton value="blue" label="Blue" />
      </FlowRadioGroup>,
    );
    const radios = screen.getAllByRole("radio");
    radios.forEach((radio) => expect(radio).toBeDisabled());
  });
});

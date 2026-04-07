/**
 * FLOW — FlowToggleButton & FlowToggleButtonGroup Component Tests
 * ─────────────────────────────────────────────────────────────────
 * Tests rendering, pressed state, interaction, and accessibility
 * for both the toggle button and its group wrapper.
 *
 * Requires: vitest + @testing-library/react + jsdom
 * Run: npx vitest run src/test/FlowToggleButton.test.tsx
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";

import { FlowToggleButton, FlowToggleButtonGroup } from "../app/components/selection";

// ─────────────────────────────────────────────
// FlowToggleButton — Rendering
// ─────────────────────────────────────────────

describe("FlowToggleButton — rendering", () => {
  it("renders a button element", () => {
    render(<FlowToggleButton>Bold</FlowToggleButton>);
    expect(screen.getByRole("button", { name: "Bold" })).toBeInTheDocument();
  });

  it("applies the flow-toggle-button class", () => {
    render(<FlowToggleButton>Bold</FlowToggleButton>);
    expect(screen.getByRole("button")).toHaveClass("flow-toggle-button");
  });

  it("sets button type to 'button'", () => {
    render(<FlowToggleButton>Bold</FlowToggleButton>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });
});

// ─────────────────────────────────────────────
// FlowToggleButton — Pressed state
// ─────────────────────────────────────────────

describe("FlowToggleButton — pressed state", () => {
  it("sets aria-pressed=true when pressed=true", () => {
    render(<FlowToggleButton pressed>Bold</FlowToggleButton>);
    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "true");
  });

  it("sets aria-pressed=false when pressed=false", () => {
    render(<FlowToggleButton pressed={false}>Bold</FlowToggleButton>);
    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "false");
  });

  it("defaults to aria-pressed=false (uncontrolled, defaultPressed omitted)", () => {
    render(<FlowToggleButton>Bold</FlowToggleButton>);
    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "false");
  });
});

// ─────────────────────────────────────────────
// FlowToggleButton — Disabled state
// ─────────────────────────────────────────────

describe("FlowToggleButton — disabled state", () => {
  it("disables the button when disabled=true", () => {
    render(<FlowToggleButton disabled>Bold</FlowToggleButton>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("does not fire onChange when disabled", async () => {
    const onChange = vi.fn();
    render(
      <FlowToggleButton disabled onChange={onChange}>
        Bold
      </FlowToggleButton>,
    );
    await userEvent.click(screen.getByRole("button"));
    expect(onChange).not.toHaveBeenCalled();
  });
});

// ─────────────────────────────────────────────
// FlowToggleButton — Interaction
// ─────────────────────────────────────────────

describe("FlowToggleButton — interaction", () => {
  it("fires onChange with true when clicking an unpressed button", async () => {
    const onChange = vi.fn();
    render(
      <FlowToggleButton pressed={false} onChange={onChange}>
        Bold
      </FlowToggleButton>,
    );
    await userEvent.click(screen.getByRole("button"));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("fires onChange with false when clicking a pressed button", async () => {
    const onChange = vi.fn();
    render(
      <FlowToggleButton pressed={true} onChange={onChange}>
        Bold
      </FlowToggleButton>,
    );
    await userEvent.click(screen.getByRole("button"));
    expect(onChange).toHaveBeenCalledWith(false);
  });

  it("toggles uncontrolled state on click", async () => {
    render(<FlowToggleButton>Italic</FlowToggleButton>);
    const btn = screen.getByRole("button");
    expect(btn).toHaveAttribute("aria-pressed", "false");
    await userEvent.click(btn);
    expect(btn).toHaveAttribute("aria-pressed", "true");
    await userEvent.click(btn);
    expect(btn).toHaveAttribute("aria-pressed", "false");
  });
});

// ─────────────────────────────────────────────
// FlowToggleButton — Accessibility
// ─────────────────────────────────────────────

describe("FlowToggleButton — accessibility", () => {
  it("accepts aria-label for accessible name", () => {
    render(<FlowToggleButton aria-label="Toggle bold">B</FlowToggleButton>);
    expect(screen.getByRole("button")).toHaveAccessibleName("Toggle bold");
  });

  it("has no axe violations", async () => {
    const { container } = render(<FlowToggleButton>Bold</FlowToggleButton>);
    expect(await axe(container)).toHaveNoViolations();
  });
});

// ─────────────────────────────────────────────
// FlowToggleButtonGroup — Rendering
// ─────────────────────────────────────────────

describe("FlowToggleButtonGroup — rendering", () => {
  it("renders a group role element", () => {
    render(
      <FlowToggleButtonGroup aria-label="Text formatting">
        <FlowToggleButton>Bold</FlowToggleButton>
        <FlowToggleButton>Italic</FlowToggleButton>
      </FlowToggleButtonGroup>,
    );
    expect(screen.getByRole("group")).toBeInTheDocument();
  });

  it("applies the flow-toggle-button-group class", () => {
    render(
      <FlowToggleButtonGroup aria-label="Formatting">
        <FlowToggleButton>Bold</FlowToggleButton>
      </FlowToggleButtonGroup>,
    );
    expect(screen.getByRole("group")).toHaveClass("flow-toggle-button-group");
  });

  it("sets aria-label on the group", () => {
    render(
      <FlowToggleButtonGroup aria-label="Text formatting">
        <FlowToggleButton>Bold</FlowToggleButton>
      </FlowToggleButtonGroup>,
    );
    expect(screen.getByRole("group")).toHaveAttribute("aria-label", "Text formatting");
  });
});

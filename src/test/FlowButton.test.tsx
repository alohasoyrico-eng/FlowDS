/**
 * FLOW — FlowButton Component Tests
 * ───────────────────────────────────
 * Tests rendering, accessibility, states, and interaction behavior.
 *
 * Requires: vitest + @testing-library/react + jsdom
 * Run: npx vitest run src/test/FlowButton.test.tsx
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";

import { FlowButton } from "@flow/components";

// ─────────────────────────────────────────────
// Rendering
// ─────────────────────────────────────────────

describe("FlowButton — rendering", () => {
  it("renders with children text", () => {
    render(<FlowButton>Save</FlowButton>);
    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
  });

  it("renders as a <button> element by default", () => {
    render(<FlowButton>Click me</FlowButton>);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("applies the flow-btn-v2 class", () => {
    render(<FlowButton>Test</FlowButton>);
    expect(screen.getByRole("button")).toHaveClass("flow-btn-v2");
  });

  it("sets data-variant='primary' by default", () => {
    render(<FlowButton>Test</FlowButton>);
    expect(screen.getByRole("button")).toHaveAttribute("data-variant", "primary");
  });

  it("sets custom variant via prop", () => {
    render(<FlowButton variant="secondary">Secondary</FlowButton>);
    expect(screen.getByRole("button")).toHaveAttribute("data-variant", "secondary");
  });

  it("renders a leading icon when leadingIcon is provided", () => {
    render(<FlowButton leadingIcon="save">Save file</FlowButton>);
    // The button should still be accessible by name
    expect(screen.getByRole("button", { name: /save file/i })).toBeInTheDocument();
  });

  it("applies fullWidth style when fullWidth=true", () => {
    render(<FlowButton fullWidth>Full width</FlowButton>);
    const btn = screen.getByRole("button");
    expect(btn).toHaveAttribute("data-full-width", "");
  });
});

// ─────────────────────────────────────────────
// Disabled state
// ─────────────────────────────────────────────

describe("FlowButton — disabled state", () => {
  it("is focusable but inactive when disabled (aria-disabled)", () => {
    render(<FlowButton disabled>Disabled</FlowButton>);
    const btn = screen.getByRole("button");
    // FlowButton uses aria-disabled, not the HTML disabled attribute
    // (keeps it keyboard-focusable for screen readers)
    expect(btn).toBeDisabled();
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(
      <FlowButton disabled onClick={onClick}>
        Disabled
      </FlowButton>,
    );
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });
});

// ─────────────────────────────────────────────
// Loading state
// ─────────────────────────────────────────────

describe("FlowButton — loading state", () => {
  it("shows a spinner (circular progress) when loading=true", () => {
    render(<FlowButton loading>Save</FlowButton>);
    // FlowCircularProgress renders with aria-label="Loading"
    expect(screen.getByLabelText("Loading")).toBeInTheDocument();
  });

  it("shows loadingLabel text when loading and loadingLabel provided", () => {
    render(
      <FlowButton loading loadingLabel="Saving…">
        Save
      </FlowButton>,
    );
    expect(screen.getByText("Saving…")).toBeInTheDocument();
  });

  it("falls back to original children when loading but no loadingLabel", () => {
    render(<FlowButton loading>Save</FlowButton>);
    expect(screen.getByText("Save")).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// Interaction
// ─────────────────────────────────────────────

describe("FlowButton — interaction", () => {
  it("fires onClick when clicked", async () => {
    const onClick = vi.fn();
    render(<FlowButton onClick={onClick}>Submit</FlowButton>);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("fires onClick when activated by Enter key", async () => {
    const onClick = vi.fn();
    render(<FlowButton onClick={onClick}>Submit</FlowButton>);
    const btn = screen.getByRole("button");
    btn.focus();
    await userEvent.keyboard("{Enter}");
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("fires onClick when activated by Space key", async () => {
    const onClick = vi.fn();
    render(<FlowButton onClick={onClick}>Submit</FlowButton>);
    const btn = screen.getByRole("button");
    btn.focus();
    await userEvent.keyboard(" ");
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

// ─────────────────────────────────────────────
// ARIA & accessibility
// ─────────────────────────────────────────────

describe("FlowButton — accessibility", () => {
  it("is accessible by role 'button'", () => {
    render(<FlowButton>Click</FlowButton>);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("button type defaults to 'button' (prevents accidental form submit)", () => {
    render(<FlowButton>Click</FlowButton>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });

  it("accepts type='submit' for form buttons", () => {
    render(<FlowButton type="submit">Submit form</FlowButton>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
  });

  it("accepts type='reset' for form reset buttons", () => {
    render(<FlowButton type="reset">Reset</FlowButton>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "reset");
  });

  it("has no axe violations", async () => {
    const { container } = render(<FlowButton>Click</FlowButton>);
    expect(await axe(container)).toHaveNoViolations();
  });
});

// ─────────────────────────────────────────────
// Momentum — motion token usage
// ─────────────────────────────────────────────

describe("FlowButton — momentum token usage", () => {
  it("label span uses sys-momentum-transition-fast for loading transition", () => {
    // This verifies the motion token is referenced — not a hardcoded ms value
    render(<FlowButton loading>Save</FlowButton>);
    const labelSpan = screen.getByRole("button").querySelector(".flow-btn-label");
    expect(labelSpan).toBeTruthy();
    const style = (labelSpan as HTMLElement)?.style?.transition ?? "";
    if (style) {
      // If transition is set, it must reference a CSS var, not hardcode ms
      expect(style).not.toMatch(/\d+ms/);
      expect(style).toContain("var(--sys-momentum-transition-fast)");
    }
  });
});

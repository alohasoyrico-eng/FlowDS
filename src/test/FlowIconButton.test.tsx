/**
 * FLOW — FlowIconButton Component Tests
 * ───────────────────────────────────────
 * Tests rendering, states, interaction, and accessibility for the
 * icon-only button control.
 *
 * Requires: vitest + @testing-library/react + jsdom
 * Run: npx vitest run src/test/FlowIconButton.test.tsx
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";

import { FlowIconButton } from "../app/components/controls";

// ─────────────────────────────────────────────
// Rendering
// ─────────────────────────────────────────────

describe("FlowIconButton — rendering", () => {
  it("renders a button element", () => {
    render(<FlowIconButton icon="close" aria-label="Close" />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("applies the flow-icon-button class", () => {
    render(<FlowIconButton icon="close" aria-label="Close" />);
    expect(screen.getByRole("button")).toHaveClass("flow-icon-button");
  });

  it("sets data-variant to 'low' by default", () => {
    render(<FlowIconButton icon="close" aria-label="Close" />);
    expect(screen.getByRole("button")).toHaveAttribute("data-variant", "low");
  });

  it("sets custom variant via prop", () => {
    render(<FlowIconButton icon="delete" variant="danger" aria-label="Delete" />);
    expect(screen.getByRole("button")).toHaveAttribute("data-variant", "danger");
  });

  it("sets button type to 'button' by default", () => {
    render(<FlowIconButton icon="close" aria-label="Close" />);
    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });
});

// ─────────────────────────────────────────────
// Disabled state
// ─────────────────────────────────────────────

describe("FlowIconButton — disabled state", () => {
  it("is disabled when disabled=true", () => {
    render(<FlowIconButton icon="close" aria-label="Close" disabled />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<FlowIconButton icon="close" aria-label="Close" disabled onClick={onClick} />);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });
});

// ─────────────────────────────────────────────
// Loading state
// ─────────────────────────────────────────────

describe("FlowIconButton — loading state", () => {
  it("shows a spinner when loading=true", () => {
    render(<FlowIconButton icon="save" aria-label="Save" loading />);
    expect(screen.getByLabelText("Loading")).toBeInTheDocument();
  });

  it("sets aria-busy when loading", () => {
    render(<FlowIconButton icon="save" aria-label="Save" loading />);
    expect(screen.getByRole("button")).toHaveAttribute("aria-busy", "true");
  });

  it("overrides aria-label to 'Loading...' when loading", () => {
    render(<FlowIconButton icon="save" aria-label="Save" loading />);
    expect(screen.getByRole("button")).toHaveAccessibleName("Loading...");
  });
});

// ─────────────────────────────────────────────
// Selected / toggle state
// ─────────────────────────────────────────────

describe("FlowIconButton — selected state", () => {
  it("sets aria-pressed=true when selected", () => {
    render(<FlowIconButton icon="star" aria-label="Favorite" selected />);
    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "true");
  });

  it("sets aria-pressed=false when not selected", () => {
    render(<FlowIconButton icon="star" aria-label="Favorite" selected={false} />);
    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "false");
  });
});

// ─────────────────────────────────────────────
// Interaction
// ─────────────────────────────────────────────

describe("FlowIconButton — interaction", () => {
  it("fires onClick when clicked", async () => {
    const onClick = vi.fn();
    render(<FlowIconButton icon="close" aria-label="Close" onClick={onClick} />);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("fires onClick when activated by Enter key", async () => {
    const onClick = vi.fn();
    render(<FlowIconButton icon="close" aria-label="Close" onClick={onClick} />);
    const btn = screen.getByRole("button");
    btn.focus();
    await userEvent.keyboard("{Enter}");
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

// ─────────────────────────────────────────────
// ARIA & accessibility
// ─────────────────────────────────────────────

describe("FlowIconButton — accessibility", () => {
  it("uses aria-label for the accessible name", () => {
    render(<FlowIconButton icon="menu" aria-label="Open menu" />);
    expect(screen.getByRole("button")).toHaveAccessibleName("Open menu");
  });

  it("has no axe violations", async () => {
    const { container } = render(<FlowIconButton icon="close" aria-label="Close" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

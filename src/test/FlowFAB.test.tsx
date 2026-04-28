/**
 * FLOW — FlowFAB Component Tests
 * ────────────────────────────────
 * Tests rendering, states, interaction, and accessibility for the
 * Floating Action Button (FAB).
 *
 * Requires: vitest + @testing-library/react + jsdom
 * Run: npx vitest run src/test/FlowFAB.test.tsx
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";

import { FlowFAB } from "@flow/components";

// ─────────────────────────────────────────────
// Rendering
// ─────────────────────────────────────────────

describe("FlowFAB — rendering", () => {
  it("renders a button element", () => {
    render(<FlowFAB icon="add" aria-label="Add item" />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("applies the flow-fab class", () => {
    render(<FlowFAB icon="add" aria-label="Add item" />);
    expect(screen.getByRole("button")).toHaveClass("flow-fab");
  });

  it("renders an extended FAB with label text", () => {
    render(<FlowFAB icon="add" label="Create" />);
    expect(screen.getByText("Create")).toBeInTheDocument();
  });

  it("sets data-variant to primary by default", () => {
    render(<FlowFAB icon="add" aria-label="Add" />);
    expect(screen.getByRole("button")).toHaveAttribute("data-variant", "primary");
  });

  it("sets data-variant when variant prop is provided", () => {
    render(<FlowFAB icon="edit" variant="secondary" aria-label="Edit" />);
    expect(screen.getByRole("button")).toHaveAttribute("data-variant", "secondary");
  });

  it("sets button type to 'button' by default", () => {
    render(<FlowFAB icon="add" aria-label="Add" />);
    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });
});

// ─────────────────────────────────────────────
// Disabled state
// ─────────────────────────────────────────────

describe("FlowFAB — disabled state", () => {
  it("is disabled when disabled=true", () => {
    render(<FlowFAB icon="add" aria-label="Add" disabled />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<FlowFAB icon="add" aria-label="Add" disabled onClick={onClick} />);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });
});

// ─────────────────────────────────────────────
// Loading state
// ─────────────────────────────────────────────

describe("FlowFAB — loading state", () => {
  it("shows a spinner when loading=true", () => {
    render(<FlowFAB icon="add" aria-label="Add" loading />);
    expect(screen.getByLabelText("Loading")).toBeInTheDocument();
  });

  it("hides the label text when loading", () => {
    render(<FlowFAB icon="add" label="Create" loading />);
    expect(screen.queryByText("Create")).not.toBeInTheDocument();
  });

  it("sets aria-busy when loading", () => {
    render(<FlowFAB icon="add" aria-label="Add" loading />);
    expect(screen.getByRole("button")).toHaveAttribute("aria-busy", "true");
  });
});

// ─────────────────────────────────────────────
// Interaction
// ─────────────────────────────────────────────

describe("FlowFAB — interaction", () => {
  it("fires onClick when clicked", async () => {
    const onClick = vi.fn();
    render(<FlowFAB icon="add" aria-label="Add" onClick={onClick} />);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("fires onClick when activated by Enter key", async () => {
    const onClick = vi.fn();
    render(<FlowFAB icon="add" aria-label="Add" onClick={onClick} />);
    const btn = screen.getByRole("button");
    btn.focus();
    await userEvent.keyboard("{Enter}");
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

// ─────────────────────────────────────────────
// ARIA & accessibility
// ─────────────────────────────────────────────

describe("FlowFAB — accessibility", () => {
  it("uses aria-label when no visible label is provided", () => {
    render(<FlowFAB icon="add" aria-label="Add new item" />);
    expect(screen.getByRole("button")).toHaveAccessibleName("Add new item");
  });

  it("overrides aria-label to 'Loading...' when loading", () => {
    render(<FlowFAB icon="add" aria-label="Add" loading />);
    expect(screen.getByRole("button")).toHaveAccessibleName("Loading...");
  });

  it("has no axe violations", async () => {
    const { container } = render(<FlowFAB icon="add" aria-label="Add item" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

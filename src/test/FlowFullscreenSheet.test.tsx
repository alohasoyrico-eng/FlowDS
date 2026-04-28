/**
 * FLOW — FlowFullscreenSheet Component Tests
 * ──────────────────────────────────
 * Tests rendering, interaction, and accessibility.
 *
 * Requires: vitest + @testing-library/react + jsdom
 * Run: npx vitest run src/test/FlowFullscreenSheet.test.tsx
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";

import { FlowFullscreenSheet } from "@flow/patterns";

const defaultProps = {
  open: true,
  onClose: vi.fn(),
  title: "Sheet Title",
  children: <div>Sheet body content</div>,
};

// ─────────────────────────────────────────────
// Rendering
// ─────────────────────────────────────────────

describe("FlowFullscreenSheet — rendering", () => {
  it("renders title and children when open", () => {
    render(<FlowFullscreenSheet {...defaultProps} />);
    expect(screen.getByText("Sheet Title")).toBeInTheDocument();
    expect(screen.getByText("Sheet body content")).toBeInTheDocument();
  });

  it("renders nothing when closed", () => {
    const { container } = render(<FlowFullscreenSheet {...defaultProps} open={false} />);
    expect(container.innerHTML).toBe("");
  });

  it("renders a close button by default", () => {
    render(<FlowFullscreenSheet {...defaultProps} />);
    expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
  });

  it("renders a back button when showBack is true", () => {
    render(<FlowFullscreenSheet {...defaultProps} showBack />);
    expect(screen.getByRole("button", { name: "Go back" })).toBeInTheDocument();
  });

  it("renders header actions when provided", () => {
    render(<FlowFullscreenSheet {...defaultProps} headerActions={<button>Save</button>} />);
    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// Interaction
// ─────────────────────────────────────────────

describe("FlowFullscreenSheet — interaction", () => {
  it("calls onClose when the close button is clicked", async () => {
    const onClose = vi.fn();
    render(<FlowFullscreenSheet {...defaultProps} onClose={onClose} />);
    await userEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onBack when the back button is clicked", async () => {
    const onBack = vi.fn();
    render(<FlowFullscreenSheet {...defaultProps} showBack onBack={onBack} />);
    await userEvent.click(screen.getByRole("button", { name: "Go back" }));
    expect(onBack).toHaveBeenCalledTimes(1);
  });

  it("falls back to onClose when showBack is true but no onBack is provided", async () => {
    const onClose = vi.fn();
    render(<FlowFullscreenSheet {...defaultProps} onClose={onClose} showBack />);
    await userEvent.click(screen.getByRole("button", { name: "Go back" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

// ─────────────────────────────────────────────
// Accessibility
// ─────────────────────────────────────────────

describe("FlowFullscreenSheet — accessibility", () => {
  it("has dialog role with aria-modal", () => {
    render(<FlowFullscreenSheet {...defaultProps} />);
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
  });

  it("uses title as aria-label when title is a string", () => {
    render(<FlowFullscreenSheet {...defaultProps} />);
    expect(screen.getByRole("dialog")).toHaveAttribute("aria-label", "Sheet Title");
  });

  it("has no axe violations", async () => {
    const { container } = render(<FlowFullscreenSheet {...defaultProps} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

/**
 * FLOW — FlowQuickActions Component Tests
 * ──────────────────────────────────
 * Tests rendering, interaction, and accessibility.
 *
 * Requires: vitest + @testing-library/react + jsdom
 * Run: npx vitest run src/test/FlowQuickActions.test.tsx
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";

import { FlowActionSheet as FlowQuickActions } from "@flow/patterns";

const sampleActions = [
  { id: "edit", label: "Edit" },
  { id: "share", label: "Share" },
  { id: "delete", label: "Delete", variant: "danger" as const },
];

const defaultProps = {
  open: true,
  onClose: vi.fn(),
  actions: sampleActions,
  onAction: vi.fn(),
};

// ─────────────────────────────────────────────
// Rendering
// ─────────────────────────────────────────────

describe("FlowQuickActions — rendering", () => {
  it("renders action labels when open", () => {
    render(<FlowQuickActions {...defaultProps} />);
    expect(screen.getByText("Edit")).toBeInTheDocument();
    expect(screen.getByText("Share")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  it("renders nothing when closed", () => {
    const { container } = render(<FlowQuickActions {...defaultProps} open={false} />);
    expect(container.innerHTML).toBe("");
  });

  it("renders the cancel button with default label", () => {
    render(<FlowQuickActions {...defaultProps} />);
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
  });

  it("renders a custom cancel label", () => {
    render(<FlowQuickActions {...defaultProps} cancelLabel="Dismiss" />);
    expect(screen.getByRole("button", { name: "Dismiss" })).toBeInTheDocument();
  });

  it("renders the title when provided", () => {
    render(<FlowQuickActions {...defaultProps} title="Choose an action" />);
    expect(screen.getByText("Choose an action")).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// Interaction
// ─────────────────────────────────────────────

describe("FlowQuickActions — interaction", () => {
  it("calls onAction with the action id when an action is clicked", async () => {
    const onAction = vi.fn();
    render(<FlowQuickActions {...defaultProps} onAction={onAction} />);
    await userEvent.click(screen.getByText("Edit"));
    expect(onAction).toHaveBeenCalledWith("edit");
  });

  it("calls onClose when cancel is clicked", async () => {
    const onClose = vi.fn();
    render(<FlowQuickActions {...defaultProps} onClose={onClose} />);
    await userEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(onClose).toHaveBeenCalled();
  });

  it("disables action buttons when disabled is true", () => {
    render(<FlowQuickActions {...defaultProps} disabled />);
    const editBtn = screen.getByRole("button", { name: "Edit" });
    expect(editBtn).toBeDisabled();
  });
});

// ─────────────────────────────────────────────
// Accessibility
// ─────────────────────────────────────────────

describe("FlowQuickActions — accessibility", () => {
  it("has no axe violations", async () => {
    const { container } = render(<FlowQuickActions {...defaultProps} title="Quick actions" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

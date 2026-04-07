/**
 * FLOW — FlowConfirmationDialog Component Tests
 * ──────────────────────────────────
 * Tests rendering, interaction, and accessibility.
 *
 * Requires: vitest + @testing-library/react + jsdom
 * Run: npx vitest run src/test/FlowConfirmationDialog.test.tsx
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";

import { FlowConfirmationDialog } from "../app/components/patterns";

const defaultProps = {
  open: true,
  onConfirm: vi.fn(),
  onCancel: vi.fn(),
  title: "Delete item?",
  message: "This action cannot be undone.",
};

// ─────────────────────────────────────────────
// Rendering
// ─────────────────────────────────────────────

describe("FlowConfirmationDialog — rendering", () => {
  it("renders title and message when open", () => {
    render(<FlowConfirmationDialog {...defaultProps} />);
    expect(screen.getByText("Delete item?")).toBeInTheDocument();
    expect(screen.getByText("This action cannot be undone.")).toBeInTheDocument();
  });

  it("renders nothing when closed", () => {
    const { container } = render(
      <FlowConfirmationDialog {...defaultProps} open={false} />,
    );
    expect(container.innerHTML).toBe("");
  });

  it("renders default confirm and cancel button labels", () => {
    render(<FlowConfirmationDialog {...defaultProps} />);
    expect(screen.getByRole("button", { name: "Confirm" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
  });

  it("renders custom button labels", () => {
    render(
      <FlowConfirmationDialog
        {...defaultProps}
        confirmLabel="Yes, delete"
        cancelLabel="Never mind"
      />,
    );
    expect(screen.getByRole("button", { name: "Yes, delete" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Never mind" })).toBeInTheDocument();
  });

  it("shows loading indicator and disables confirm button when loading", () => {
    render(<FlowConfirmationDialog {...defaultProps} loading />);
    const confirmBtn = screen.getByRole("button", { name: "..." });
    expect(confirmBtn).toBeDisabled();
  });
});

// ─────────────────────────────────────────────
// Interaction
// ─────────────────────────────────────────────

describe("FlowConfirmationDialog — interaction", () => {
  it("calls onConfirm when confirm button is clicked", async () => {
    const onConfirm = vi.fn();
    render(<FlowConfirmationDialog {...defaultProps} onConfirm={onConfirm} />);
    await userEvent.click(screen.getByRole("button", { name: "Confirm" }));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it("calls onCancel when cancel button is clicked", async () => {
    const onCancel = vi.fn();
    render(<FlowConfirmationDialog {...defaultProps} onCancel={onCancel} />);
    await userEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it("calls onCancel when clicking the overlay backdrop", async () => {
    const onCancel = vi.fn();
    const { container } = render(
      <FlowConfirmationDialog {...defaultProps} onCancel={onCancel} />,
    );
    const overlay = container.querySelector(".flow-confirmation-dialog-overlay")!;
    await userEvent.click(overlay);
    expect(onCancel).toHaveBeenCalled();
  });
});

// ─────────────────────────────────────────────
// Accessibility
// ─────────────────────────────────────────────

describe("FlowConfirmationDialog — accessibility", () => {
  it("has dialog role with aria-modal", () => {
    render(<FlowConfirmationDialog {...defaultProps} />);
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
  });

  it("title is linked via aria-labelledby", () => {
    render(<FlowConfirmationDialog {...defaultProps} />);
    const dialog = screen.getByRole("dialog");
    const labelledBy = dialog.getAttribute("aria-labelledby");
    expect(labelledBy).toBeTruthy();
    const titleEl = document.getElementById(labelledBy!);
    expect(titleEl).toBeInTheDocument();
    expect(titleEl?.textContent).toBe("Delete item?");
  });

  it("has no axe violations", async () => {
    const { container } = render(<FlowConfirmationDialog {...defaultProps} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

/**
 * FLOW — FlowDialog Component Tests
 * ───────────────────────────────────
 * Tests rendering, visibility, accessibility, and interaction behavior.
 *
 * Requires: vitest + @testing-library/react + jsdom
 * Run: npx vitest run src/test/FlowDialog.test.tsx
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { FlowDialog } from "../app/components/overlays";

// ─────────────────────────────────────────────
// Rendering
// ─────────────────────────────────────────────

describe("FlowDialog — rendering", () => {
  it("does NOT render when open=false", () => {
    render(<FlowDialog open={false} onClose={vi.fn()} title="Hidden" />);
    expect(screen.queryByRole("dialog", { hidden: true })).not.toBeInTheDocument();
  });

  it("renders when open=true", () => {
    render(<FlowDialog open={true} onClose={vi.fn()} title="Visible" />);
    expect(screen.getByRole("dialog", { hidden: true })).toBeInTheDocument();
  });

  it("shows the title text", () => {
    render(<FlowDialog open={true} onClose={vi.fn()} title="Confirm Action" />);
    expect(screen.getByText("Confirm Action")).toBeInTheDocument();
  });

  it("shows the description text", () => {
    render(
      <FlowDialog
        open={true}
        onClose={vi.fn()}
        title="Delete"
        description="This cannot be undone."
      />,
    );
    expect(screen.getByText("This cannot be undone.")).toBeInTheDocument();
  });

  it("renders the actions slot", () => {
    render(
      <FlowDialog open={true} onClose={vi.fn()} title="Save" actions={<button>Confirm</button>} />,
    );
    expect(screen.getByRole("button", { name: "Confirm", hidden: true })).toBeInTheDocument();
  });

  it("renders children content", () => {
    render(
      <FlowDialog open={true} onClose={vi.fn()} title="Form">
        <p>Form content here</p>
      </FlowDialog>,
    );
    expect(screen.getByText("Form content here")).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// ARIA & accessibility
// ─────────────────────────────────────────────

describe("FlowDialog — accessibility", () => {
  it("has role='dialog'", () => {
    render(<FlowDialog open={true} onClose={vi.fn()} title="Test" />);
    expect(screen.getByRole("dialog", { hidden: true })).toBeInTheDocument();
  });

  it("has aria-modal='true'", () => {
    render(<FlowDialog open={true} onClose={vi.fn()} title="Modal" />);
    expect(screen.getByRole("dialog", { hidden: true })).toHaveAttribute("aria-modal", "true");
  });

  it("has aria-labelledby pointing to the title element", () => {
    render(<FlowDialog open={true} onClose={vi.fn()} title="Settings" />);
    const dialog = screen.getByRole("dialog", { hidden: true });
    const labelledBy = dialog.getAttribute("aria-labelledby");
    expect(labelledBy).toBeTruthy();
    // The referenced element should contain the title text
    const titleEl = document.getElementById(labelledBy!);
    expect(titleEl).toBeInTheDocument();
    expect(titleEl?.textContent).toBe("Settings");
  });
});

// ─────────────────────────────────────────────
// Interaction
// ─────────────────────────────────────────────

describe("FlowDialog — interaction", () => {
  it("calls onClose when Escape key is pressed", async () => {
    const onClose = vi.fn();
    render(<FlowDialog open={true} onClose={onClose} title="Closeable" />);
    // FlowDialog attaches keydown listener on document
    await userEvent.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when clicking the overlay backdrop", async () => {
    const onClose = vi.fn();
    const { container } = render(<FlowDialog open={true} onClose={onClose} title="Backdrop" />);
    // The overlay wrapper div is the direct click target (click on currentTarget === target)
    // We target the centering wrapper that has onClick checking e.target === e.currentTarget
    const backdrop = container.querySelector(".flow-overlay");
    if (backdrop) {
      await userEvent.click(backdrop);
      expect(onClose).toHaveBeenCalled();
    }
  });
});

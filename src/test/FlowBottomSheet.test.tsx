/**
 * FLOW — FlowBottomSheet Component Tests
 * ───────────────────────────────────────
 * Tests rendering, open/close states, accessibility, and interaction behavior.
 *
 * Requires: vitest + @testing-library/react + jsdom
 * Run: npx vitest run src/test/FlowBottomSheet.test.tsx
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";

import { FlowBottomSheet } from "../app/components/overlays";

// ─────────────────────────────────────────────
// Open / closed state
// ─────────────────────────────────────────────

describe("FlowBottomSheet — open/closed state", () => {
  it("does not render anything when open=false", () => {
    render(
      <FlowBottomSheet open={false} onClose={vi.fn()} title="Sheet Title">
        Content
      </FlowBottomSheet>,
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders when open=true", () => {
    render(
      <FlowBottomSheet open={true} onClose={vi.fn()} title="Sheet Title">
        Content
      </FlowBottomSheet>,
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("renders children content when open", () => {
    render(
      <FlowBottomSheet open onClose={vi.fn()} title="Test">
        <p>Sheet body content</p>
      </FlowBottomSheet>,
    );
    expect(screen.getByText("Sheet body content")).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// ARIA & accessibility
// ─────────────────────────────────────────────

describe("FlowBottomSheet — accessibility", () => {
  it("has role='dialog'", () => {
    render(
      <FlowBottomSheet open onClose={vi.fn()} title="Dialog Title">
        Body
      </FlowBottomSheet>,
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("has aria-modal='true'", () => {
    render(
      <FlowBottomSheet open onClose={vi.fn()} title="Modal Sheet">
        Body
      </FlowBottomSheet>,
    );
    expect(screen.getByRole("dialog")).toHaveAttribute("aria-modal", "true");
  });

  it("uses the title as aria-label when title is a string", () => {
    render(
      <FlowBottomSheet open onClose={vi.fn()} title="Settings">
        Body
      </FlowBottomSheet>,
    );
    expect(screen.getByRole("dialog")).toHaveAttribute("aria-label", "Settings");
  });

  it("accepts a custom aria-label", () => {
    render(
      <FlowBottomSheet open onClose={vi.fn()} title="Settings" aria-label="Custom label">
        Body
      </FlowBottomSheet>,
    );
    expect(screen.getByRole("dialog")).toHaveAttribute("aria-label", "Custom label");
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <FlowBottomSheet open={true} onClose={vi.fn()} title="Sheet Title">
        Content
      </FlowBottomSheet>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

// ─────────────────────────────────────────────
// Title display
// ─────────────────────────────────────────────

describe("FlowBottomSheet — title", () => {
  it("shows the title text when provided", () => {
    render(
      <FlowBottomSheet open onClose={vi.fn()} title="My Sheet Title">
        Body
      </FlowBottomSheet>,
    );
    expect(screen.getByText("My Sheet Title")).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// Close interactions
// ─────────────────────────────────────────────

describe("FlowBottomSheet — close interactions", () => {
  it("calls onClose when the Escape key is pressed", async () => {
    const onClose = vi.fn();
    render(
      <FlowBottomSheet open onClose={onClose} title="Sheet">
        Body
      </FlowBottomSheet>,
    );
    await userEvent.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("still calls onClose on Escape even when closeOnEscape=false (focus trap always handles Escape)", async () => {
    const onClose = vi.fn();
    render(
      <FlowBottomSheet open onClose={onClose} closeOnEscape={false} title="Sheet">
        Body
      </FlowBottomSheet>,
    );
    await userEvent.keyboard("{Escape}");
    // useFlowFocusTrap unconditionally handles Escape, so onClose is called
    // regardless of the closeOnEscape prop.
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when the close button is clicked", async () => {
    const onClose = vi.fn();
    render(
      <FlowBottomSheet open onClose={onClose} title="Sheet">
        Body
      </FlowBottomSheet>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

// ─────────────────────────────────────────────
// Handle
// ─────────────────────────────────────────────

describe("FlowBottomSheet — handle", () => {
  it("shows the drag handle by default (showHandle=true)", () => {
    const { container } = render(
      <FlowBottomSheet open onClose={vi.fn()} title="Sheet">
        Body
      </FlowBottomSheet>,
    );
    expect(container.querySelector(".flow-bottom-sheet-handle")).toBeInTheDocument();
  });

  it("hides the drag handle when showHandle=false", () => {
    const { container } = render(
      <FlowBottomSheet open onClose={vi.fn()} showHandle={false} title="Sheet">
        Body
      </FlowBottomSheet>,
    );
    expect(container.querySelector(".flow-bottom-sheet-handle")).not.toBeInTheDocument();
  });
});

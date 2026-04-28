/**
 * FLOW — FlowDrawerAdapter Component Tests
 * ──────────────────────────────────────────────
 * Tests desktop rendering, mobile behavior, interaction, and accessibility.
 *
 * Requires: vitest + @testing-library/react + jsdom
 * Run: npx vitest run src/test/FlowDrawerAdapter.test.tsx
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { afterEach, describe, expect, it, vi } from "vitest";

import { FlowDrawerAdapter } from "@flow/patterns";

// jsdom default innerWidth is 1024, so the drawer renders in desktop (inline) mode.

// ─────────────────────────────────────────────
// Desktop rendering
// ─────────────────────────────────────────────

describe("FlowDrawerAdapter — desktop rendering", () => {
  it("renders as an aside element", () => {
    render(
      <FlowDrawerAdapter open onClose={vi.fn()} aria-label="Side panel">
        <p>Content</p>
      </FlowDrawerAdapter>,
    );
    const aside = screen.getByLabelText("Side panel");
    expect(aside.tagName).toBe("ASIDE");
  });

  it("has class flow-drawer-inline", () => {
    render(
      <FlowDrawerAdapter open onClose={vi.fn()} aria-label="Side panel">
        <p>Content</p>
      </FlowDrawerAdapter>,
    );
    const aside = screen.getByLabelText("Side panel");
    expect(aside).toHaveClass("flow-drawer-inline");
  });

  it("has data-side attribute", () => {
    render(
      <FlowDrawerAdapter open onClose={vi.fn()} side="right" aria-label="Side panel">
        <p>Content</p>
      </FlowDrawerAdapter>,
    );
    const aside = screen.getByLabelText("Side panel");
    expect(aside).toHaveAttribute("data-side", "right");
  });

  it("shows children", () => {
    render(
      <FlowDrawerAdapter open onClose={vi.fn()}>
        <p>Drawer content</p>
      </FlowDrawerAdapter>,
    );
    expect(screen.getByText("Drawer content")).toBeInTheDocument();
  });

  it("shows title", () => {
    render(
      <FlowDrawerAdapter open onClose={vi.fn()} title="Navigation">
        <p>Content</p>
      </FlowDrawerAdapter>,
    );
    expect(screen.getByText("Navigation")).toBeInTheDocument();
  });

  it("close button calls onClose", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <FlowDrawerAdapter open onClose={onClose} title="Nav">
        <p>Content</p>
      </FlowDrawerAdapter>,
    );
    await user.click(screen.getByLabelText("Close drawer"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

// ─────────────────────────────────────────────
// Mobile
// ─────────────────────────────────────────────

describe("FlowDrawerAdapter — mobile", () => {
  afterEach(() => {
    Object.defineProperty(window, "innerWidth", { writable: true, value: 1024 });
    window.dispatchEvent(new Event("resize"));
  });

  it("renders with role=dialog when open on mobile", () => {
    Object.defineProperty(window, "innerWidth", { writable: true, value: 500 });
    window.dispatchEvent(new Event("resize"));
    render(
      <FlowDrawerAdapter open onClose={vi.fn()} aria-label="Mobile drawer">
        <p>Content</p>
      </FlowDrawerAdapter>,
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("returns null when closed on mobile", () => {
    Object.defineProperty(window, "innerWidth", { writable: true, value: 500 });
    window.dispatchEvent(new Event("resize"));
    const { container } = render(
      <FlowDrawerAdapter open={false} onClose={vi.fn()} aria-label="Mobile drawer">
        <p>Content</p>
      </FlowDrawerAdapter>,
    );
    expect(container.innerHTML).toBe("");
  });
});

// ─────────────────────────────────────────────
// Accessibility
// ─────────────────────────────────────────────

describe("FlowDrawerAdapter — accessibility", () => {
  it("has no axe violations", async () => {
    const { container } = render(
      <FlowDrawerAdapter open onClose={vi.fn()} aria-label="Side navigation">
        <p>Drawer content</p>
      </FlowDrawerAdapter>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

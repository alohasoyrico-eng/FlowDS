/**
 * FLOW — FlowPopover Component Tests
 * ────────────────────────────────────
 * Tests trigger, content rendering, open/close behavior,
 * and accessibility attributes.
 *
 * Requires: vitest + @testing-library/react + jsdom
 * Run: npx vitest run src/test/FlowPopover.test.tsx
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";

import { FlowPopover } from "../app/components/overlays";

// ─────────────────────────────────────────────
// Rendering
// ─────────────────────────────────────────────

describe("FlowPopover — rendering", () => {
  it("renders the trigger element", () => {
    render(
      <FlowPopover trigger={<span>Open popover</span>}>
        <div>Popover content</div>
      </FlowPopover>,
    );
    expect(screen.getByText("Open popover")).toBeInTheDocument();
  });

  it("does not show popover content by default", () => {
    render(
      <FlowPopover trigger={<span>Open popover</span>}>
        <div>Popover content</div>
      </FlowPopover>,
    );
    expect(screen.queryByText("Popover content")).not.toBeInTheDocument();
  });

  it("shows popover content when trigger is clicked", async () => {
    render(
      <FlowPopover trigger={<span>Open popover</span>}>
        <div>Popover content</div>
      </FlowPopover>,
    );
    await userEvent.click(screen.getByRole("button", { name: /Open popover/ }));
    expect(screen.getByText("Popover content")).toBeInTheDocument();
  });

  it("renders children as popover content", async () => {
    render(
      <FlowPopover
        trigger={<span>Open popover</span>}
      >
        <div>Alt content</div>
      </FlowPopover>,
    );
    await userEvent.click(screen.getByRole("button", { name: /Open popover/ }));
    expect(screen.getByText("Alt content")).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// Interaction
// ─────────────────────────────────────────────

describe("FlowPopover — interaction", () => {
  it("toggles popover on subsequent trigger clicks", async () => {
    render(
      <FlowPopover trigger={<span>Toggle</span>}>
        <div>Content</div>
      </FlowPopover>,
    );
    const trigger = screen.getByRole("button", { name: /Toggle/ });
    await userEvent.click(trigger);
    expect(screen.getByText("Content")).toBeInTheDocument();
    await userEvent.click(trigger);
    expect(screen.queryByText("Content")).not.toBeInTheDocument();
  });

  it("closes on Escape key", async () => {
    render(
      <FlowPopover trigger={<span>Open</span>}>
        <div>Content</div>
      </FlowPopover>,
    );
    await userEvent.click(screen.getByRole("button", { name: /Open/ }));
    expect(screen.getByText("Content")).toBeInTheDocument();
    await userEvent.keyboard("{Escape}");
    expect(screen.queryByText("Content")).not.toBeInTheDocument();
  });

  it("does not close on Escape when closeOnEscape=false", async () => {
    render(
      <FlowPopover trigger={<span>Open</span>} closeOnEscape={false}>
        <div>Content</div>
      </FlowPopover>,
    );
    await userEvent.click(screen.getByRole("button", { name: /Open/ }));
    expect(screen.getByText("Content")).toBeInTheDocument();
    await userEvent.keyboard("{Escape}");
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("calls onOpenChange when toggled", async () => {
    const onOpenChange = vi.fn();
    render(
      <FlowPopover trigger={<span>Open</span>} onOpenChange={onOpenChange}>
        <div>Content</div>
      </FlowPopover>,
    );
    await userEvent.click(screen.getByRole("button", { name: /Open/ }));
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });
});

// ─────────────────────────────────────────────
// States
// ─────────────────────────────────────────────

describe("FlowPopover — states", () => {
  it("supports controlled open state", () => {
    render(
      <FlowPopover trigger={<span>Open</span>} open={true}>
        <div>Controlled content</div>
      </FlowPopover>,
    );
    expect(screen.getByText("Controlled content")).toBeInTheDocument();
  });

  it("supports defaultOpen state", () => {
    render(
      <FlowPopover trigger={<span>Open</span>} defaultOpen={true}>
        <div>Default open content</div>
      </FlowPopover>,
    );
    expect(screen.getByText("Default open content")).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// Accessibility
// ─────────────────────────────────────────────

describe("FlowPopover — accessibility", () => {
  it("trigger has aria-haspopup='dialog'", () => {
    render(
      <FlowPopover trigger={<span>Open</span>}>
        <div>Content</div>
      </FlowPopover>,
    );
    expect(screen.getByRole("button")).toHaveAttribute("aria-haspopup", "dialog");
  });

  it("trigger has aria-expanded='false' when closed", () => {
    render(
      <FlowPopover trigger={<span>Open</span>}>
        <div>Content</div>
      </FlowPopover>,
    );
    expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "false");
  });

  it("trigger has aria-expanded='true' when open", async () => {
    render(
      <FlowPopover trigger={<span>Open</span>}>
        <div>Content</div>
      </FlowPopover>,
    );
    await userEvent.click(screen.getByRole("button", { name: /Open/ }));
    expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "true");
  });

  it("popover content has role='dialog'", async () => {
    render(
      <FlowPopover trigger={<span>Open</span>}>
        <div>Content</div>
      </FlowPopover>,
    );
    await userEvent.click(screen.getByRole("button", { name: /Open/ }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <FlowPopover trigger={<span>Open</span>}>
        <div>Content</div>
      </FlowPopover>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

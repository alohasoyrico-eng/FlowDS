/**
 * FLOW — FlowShortcutGrid Component Tests
 * ──────────────────────────────────────────
 * Tests rendering, interaction, and accessibility.
 *
 * Requires: vitest + @testing-library/react + jsdom
 * Run: npx vitest run src/test/FlowShortcutGrid.test.tsx
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";

import { FlowShortcutGrid } from "@flow/components";

const sampleActions = [
  { icon: "send", label: "Send" },
  { icon: "download", label: "Download" },
  { icon: "share", label: "Share" },
  { icon: "bookmark", label: "Bookmark" },
];

// ─────────────────────────────────────────────
// Rendering
// ─────────────────────────────────────────────

describe("FlowShortcutGrid — rendering", () => {
  it("renders one button per action", () => {
    render(<FlowShortcutGrid actions={sampleActions} />);
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(4);
  });

  it("renders the label text for each action", () => {
    render(<FlowShortcutGrid actions={sampleActions} />);
    expect(screen.getByText("Send")).toBeInTheDocument();
    expect(screen.getByText("Download")).toBeInTheDocument();
    expect(screen.getByText("Share")).toBeInTheDocument();
    expect(screen.getByText("Bookmark")).toBeInTheDocument();
  });

  it("applies 4-column grid layout by default", () => {
    const { container } = render(<FlowShortcutGrid actions={sampleActions} />);
    const grid = container.querySelector(".flow-shortcut-grid")!;
    expect(grid).toHaveStyle({ gridTemplateColumns: "repeat(4, 1fr)" });
  });

  it("applies custom column count via columns prop", () => {
    const { container } = render(<FlowShortcutGrid actions={sampleActions} columns={2} />);
    const grid = container.querySelector(".flow-shortcut-grid")!;
    expect(grid).toHaveStyle({ gridTemplateColumns: "repeat(2, 1fr)" });
  });

  it("renders disabled buttons when action.disabled is true", () => {
    const actions = [
      { icon: "send", label: "Send", disabled: true },
      { icon: "download", label: "Download" },
    ];
    render(<FlowShortcutGrid actions={actions} />);
    expect(screen.getByRole("button", { name: "Send" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Download" })).not.toBeDisabled();
  });
});

// ─────────────────────────────────────────────
// Interaction
// ─────────────────────────────────────────────

describe("FlowShortcutGrid — interaction", () => {
  it("fires onClick when an action button is clicked", async () => {
    const onClick = vi.fn();
    const actions = [
      { icon: "send", label: "Send", onClick },
      { icon: "download", label: "Download" },
    ];
    render(<FlowShortcutGrid actions={actions} />);
    await userEvent.click(screen.getByRole("button", { name: "Send" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when a disabled action is clicked", async () => {
    const onClick = vi.fn();
    const actions = [{ icon: "send", label: "Send", onClick, disabled: true }];
    render(<FlowShortcutGrid actions={actions} />);
    await userEvent.click(screen.getByRole("button", { name: "Send" }));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("renders an empty grid when no actions are provided", () => {
    const { container } = render(<FlowShortcutGrid actions={[]} />);
    const grid = container.querySelector(".flow-shortcut-grid")!;
    expect(grid).toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// Accessibility
// ─────────────────────────────────────────────

describe("FlowShortcutGrid — accessibility", () => {
  it("each action button has an aria-label matching the action label", () => {
    render(<FlowShortcutGrid actions={sampleActions} />);
    sampleActions.forEach((action) => {
      expect(screen.getByRole("button", { name: action.label })).toBeInTheDocument();
    });
  });

  it("has no axe violations", async () => {
    const { container } = render(<FlowShortcutGrid actions={sampleActions} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

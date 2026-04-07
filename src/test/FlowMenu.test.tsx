/**
 * FLOW — FlowMenu Component Tests
 * ─────────────────────────────────
 * Tests trigger, menu opening, item selection, keyboard navigation,
 * and accessibility behavior.
 *
 * Requires: vitest + @testing-library/react + jsdom
 * Run: npx vitest run src/test/FlowMenu.test.tsx
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";

import { FlowMenu } from "../app/components/overlays";

const DEFAULT_ITEMS = [
  { key: "edit", label: "Edit" },
  { key: "duplicate", label: "Duplicate" },
  { key: "delete", label: "Delete", danger: true },
];

// ─────────────────────────────────────────────
// Rendering
// ─────────────────────────────────────────────

describe("FlowMenu — rendering", () => {
  it("renders the trigger element", () => {
    render(
      <FlowMenu items={DEFAULT_ITEMS} onSelect={vi.fn()} trigger={<span>Open Menu</span>} />,
    );
    expect(screen.getByText("Open Menu")).toBeInTheDocument();
  });

  it("does not show menu items by default", () => {
    render(
      <FlowMenu items={DEFAULT_ITEMS} onSelect={vi.fn()} trigger={<span>Open Menu</span>} />,
    );
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("shows menu items when trigger is clicked", async () => {
    render(
      <FlowMenu items={DEFAULT_ITEMS} onSelect={vi.fn()} trigger={<span>Open Menu</span>} />,
    );
    await userEvent.click(screen.getByRole("button", { name: /Open Menu/ }));
    expect(screen.getByRole("menu")).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: /Edit/ })).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: /Duplicate/ })).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: /Delete/ })).toBeInTheDocument();
  });

  it("renders the correct number of menu items", async () => {
    render(
      <FlowMenu items={DEFAULT_ITEMS} onSelect={vi.fn()} trigger={<span>Open Menu</span>} />,
    );
    await userEvent.click(screen.getByRole("button", { name: /Open Menu/ }));
    expect(screen.getAllByRole("menuitem")).toHaveLength(3);
  });
});

// ─────────────────────────────────────────────
// Interaction
// ─────────────────────────────────────────────

describe("FlowMenu — interaction", () => {
  it("calls onSelect with the item key when clicked", async () => {
    const onSelect = vi.fn();
    render(
      <FlowMenu items={DEFAULT_ITEMS} onSelect={onSelect} trigger={<span>Open Menu</span>} />,
    );
    await userEvent.click(screen.getByRole("button", { name: /Open Menu/ }));
    await userEvent.click(screen.getByRole("menuitem", { name: /Duplicate/ }));
    expect(onSelect).toHaveBeenCalledWith("duplicate");
  });

  it("closes menu after selecting an item", async () => {
    render(
      <FlowMenu items={DEFAULT_ITEMS} onSelect={vi.fn()} trigger={<span>Open Menu</span>} />,
    );
    await userEvent.click(screen.getByRole("button", { name: /Open Menu/ }));
    await userEvent.click(screen.getByRole("menuitem", { name: /Edit/ }));
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("closes menu on Escape key", async () => {
    render(
      <FlowMenu items={DEFAULT_ITEMS} onSelect={vi.fn()} trigger={<span>Open Menu</span>} />,
    );
    await userEvent.click(screen.getByRole("button", { name: /Open Menu/ }));
    expect(screen.getByRole("menu")).toBeInTheDocument();
    await userEvent.keyboard("{Escape}");
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("toggles menu on subsequent trigger clicks", async () => {
    render(
      <FlowMenu items={DEFAULT_ITEMS} onSelect={vi.fn()} trigger={<span>Open Menu</span>} />,
    );
    const trigger = screen.getByRole("button", { name: /Open Menu/ });
    await userEvent.click(trigger);
    expect(screen.getByRole("menu")).toBeInTheDocument();
    await userEvent.click(trigger);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// States
// ─────────────────────────────────────────────

describe("FlowMenu — states", () => {
  it("does not fire onSelect for disabled items", async () => {
    const onSelect = vi.fn();
    const items = [
      { key: "edit", label: "Edit", disabled: true },
      { key: "delete", label: "Delete" },
    ];
    render(
      <FlowMenu items={items} onSelect={onSelect} trigger={<span>Open Menu</span>} />,
    );
    await userEvent.click(screen.getByRole("button", { name: /Open Menu/ }));
    await userEvent.click(screen.getByRole("menuitem", { name: /Edit/ }));
    expect(onSelect).not.toHaveBeenCalled();
  });

  it("renders separator after items with separator=true", async () => {
    const items = [
      { key: "edit", label: "Edit", separator: true },
      { key: "delete", label: "Delete" },
    ];
    render(
      <FlowMenu items={items} onSelect={vi.fn()} trigger={<span>Open Menu</span>} />,
    );
    await userEvent.click(screen.getByRole("button", { name: /Open Menu/ }));
    expect(screen.getByRole("separator")).toBeInTheDocument();
  });

  it("supports controlled open state", () => {
    render(
      <FlowMenu
        items={DEFAULT_ITEMS}
        onSelect={vi.fn()}
        trigger={<span>Open Menu</span>}
        open={true}
      />,
    );
    expect(screen.getByRole("menu")).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// Accessibility
// ─────────────────────────────────────────────

describe("FlowMenu — accessibility", () => {
  it("trigger has aria-haspopup='menu'", () => {
    render(
      <FlowMenu items={DEFAULT_ITEMS} onSelect={vi.fn()} trigger={<span>Open Menu</span>} />,
    );
    expect(screen.getByRole("button")).toHaveAttribute("aria-haspopup", "menu");
  });

  it("trigger has aria-expanded='false' when closed", () => {
    render(
      <FlowMenu items={DEFAULT_ITEMS} onSelect={vi.fn()} trigger={<span>Open Menu</span>} />,
    );
    expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "false");
  });

  it("trigger has aria-expanded='true' when open", async () => {
    render(
      <FlowMenu items={DEFAULT_ITEMS} onSelect={vi.fn()} trigger={<span>Open Menu</span>} />,
    );
    await userEvent.click(screen.getByRole("button", { name: /Open Menu/ }));
    expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "true");
  });

  it("menu has default aria-label 'Menu'", async () => {
    render(
      <FlowMenu items={DEFAULT_ITEMS} onSelect={vi.fn()} trigger={<span>Open Menu</span>} />,
    );
    await userEvent.click(screen.getByRole("button", { name: /Open Menu/ }));
    expect(screen.getByRole("menu")).toHaveAttribute("aria-label", "Menu");
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <FlowMenu items={DEFAULT_ITEMS} onSelect={vi.fn()} trigger={<span>Open Menu</span>} />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

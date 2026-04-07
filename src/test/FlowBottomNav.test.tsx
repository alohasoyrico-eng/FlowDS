/**
 * FLOW — FlowBottomNav Component Tests
 * ──────────────────────────────────────
 * Tests rendering, active item, selection, disabled state,
 * and accessibility behavior.
 *
 * Requires: vitest + @testing-library/react + jsdom
 * Run: npx vitest run src/test/FlowBottomNav.test.tsx
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { FlowBottomNav } from "../app/components/navigation";

const DEFAULT_ITEMS = [
  { key: "home", icon: "home", label: "Home" },
  { key: "search", icon: "search", label: "Search" },
  { key: "profile", icon: "user", label: "Profile" },
];

// ─────────────────────────────────────────────
// Rendering
// ─────────────────────────────────────────────

describe("FlowBottomNav — rendering", () => {
  it("renders all navigation items", () => {
    render(<FlowBottomNav items={DEFAULT_ITEMS} activeKey="home" onChange={vi.fn()} />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Search")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
  });

  it("renders the correct number of buttons", () => {
    render(<FlowBottomNav items={DEFAULT_ITEMS} activeKey="home" onChange={vi.fn()} />);
    expect(screen.getAllByRole("button")).toHaveLength(3);
  });

  it("renders as a <nav> element", () => {
    render(<FlowBottomNav items={DEFAULT_ITEMS} activeKey="home" onChange={vi.fn()} />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("hides labels when showLabels=false", () => {
    render(
      <FlowBottomNav items={DEFAULT_ITEMS} activeKey="home" onChange={vi.fn()} showLabels={false} />,
    );
    expect(screen.queryByText("Home")).not.toBeInTheDocument();
    expect(screen.queryByText("Search")).not.toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// States
// ─────────────────────────────────────────────

describe("FlowBottomNav — states", () => {
  it("marks the active item with aria-current='page'", () => {
    render(<FlowBottomNav items={DEFAULT_ITEMS} activeKey="search" onChange={vi.fn()} />);
    const searchBtn = screen.getByText("Search").closest("button");
    expect(searchBtn).toHaveAttribute("aria-current", "page");
  });

  it("does not mark inactive items with aria-current", () => {
    render(<FlowBottomNav items={DEFAULT_ITEMS} activeKey="home" onChange={vi.fn()} />);
    const searchBtn = screen.getByText("Search").closest("button");
    expect(searchBtn).not.toHaveAttribute("aria-current");
  });

  it("supports activeKey prop", () => {
    render(<FlowBottomNav items={DEFAULT_ITEMS} activeKey="profile" onChange={vi.fn()} />);
    const profileBtn = screen.getByText("Profile").closest("button");
    expect(profileBtn).toHaveAttribute("aria-current", "page");
  });

  it("disables a disabled item", () => {
    const items = [
      { key: "home", icon: "home", label: "Home" },
      { key: "search", icon: "search", label: "Search", disabled: true },
    ];
    render(<FlowBottomNav items={items} activeKey="home" onChange={vi.fn()} />);
    const searchBtn = screen.getByText("Search").closest("button");
    expect(searchBtn).toBeDisabled();
  });
});

// ─────────────────────────────────────────────
// Interaction
// ─────────────────────────────────────────────

describe("FlowBottomNav — interaction", () => {
  it("calls onChange with the item key when clicked", async () => {
    const onChange = vi.fn();
    render(<FlowBottomNav items={DEFAULT_ITEMS} activeKey="home" onChange={onChange} />);
    await userEvent.click(screen.getByText("Search"));
    expect(onChange).toHaveBeenCalledWith("search");
  });

  it("does not call onChange when clicking a disabled item", async () => {
    const onChange = vi.fn();
    const items = [
      { key: "home", icon: "home", label: "Home" },
      { key: "search", icon: "search", label: "Search", disabled: true },
    ];
    render(<FlowBottomNav items={items} activeKey="home" onChange={onChange} />);
    await userEvent.click(screen.getByText("Search"));
    expect(onChange).not.toHaveBeenCalled();
  });
});

// ─────────────────────────────────────────────
// Accessibility
// ─────────────────────────────────────────────

describe("FlowBottomNav — accessibility", () => {
  it("has default aria-label 'Bottom navigation'", () => {
    render(<FlowBottomNav items={DEFAULT_ITEMS} activeKey="home" onChange={vi.fn()} />);
    expect(screen.getByRole("navigation")).toHaveAttribute("aria-label", "Bottom navigation");
  });

  it("accepts custom aria-label", () => {
    render(
      <FlowBottomNav
        items={DEFAULT_ITEMS}
        activeKey="home"
        onChange={vi.fn()}
        aria-label="Main navigation"
      />,
    );
    expect(screen.getByRole("navigation")).toHaveAttribute("aria-label", "Main navigation");
  });
});

/**
 * FLOW — FlowSidebar Component Tests
 * ────────────────────────────────────
 * Tests rendering, groups/items, active item, collapsed state,
 * and accessibility behavior.
 *
 * Requires: vitest + @testing-library/react + jsdom
 * Run: npx vitest run src/test/FlowSidebar.test.tsx
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { FlowSidebar } from "../app/components/navigation";

const DEFAULT_GROUPS = [
  {
    label: "Main",
    items: [
      { key: "dashboard", label: "Dashboard", icon: "home", active: true },
      { key: "analytics", label: "Analytics", icon: "bar-chart" },
    ],
  },
  {
    label: "Settings",
    items: [
      { key: "profile", label: "Profile", icon: "user" },
      { key: "billing", label: "Billing", icon: "credit-card" },
    ],
  },
];

// ─────────────────────────────────────────────
// Rendering
// ─────────────────────────────────────────────

describe("FlowSidebar — rendering", () => {
  it("renders all item labels", () => {
    render(<FlowSidebar groups={DEFAULT_GROUPS} />);
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Analytics")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Billing")).toBeInTheDocument();
  });

  it("renders group labels", () => {
    render(<FlowSidebar groups={DEFAULT_GROUPS} />);
    expect(screen.getByText("Main")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
  });

  it("renders as a <nav> element", () => {
    render(<FlowSidebar groups={DEFAULT_GROUPS} />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("renders with items prop (flat list API)", () => {
    const items = [
      { id: "home", label: "Home", icon: "home" },
      { id: "search", label: "Search", icon: "search" },
    ];
    render(<FlowSidebar items={items} />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Search")).toBeInTheDocument();
  });

  it("renders with sections prop (alias API)", () => {
    const sections = [
      {
        title: "Navigation",
        items: [{ id: "home", label: "Home" }],
      },
    ];
    render(<FlowSidebar sections={sections} />);
    expect(screen.getByText("Navigation")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// States
// ─────────────────────────────────────────────

describe("FlowSidebar — states", () => {
  it("marks active item with aria-current='page'", () => {
    render(<FlowSidebar groups={DEFAULT_GROUPS} />);
    const dashBtn = screen.getByText("Dashboard").closest("[aria-current]");
    expect(dashBtn).toHaveAttribute("aria-current", "page");
  });

  it("hides item labels when collapsed=true", () => {
    render(<FlowSidebar groups={DEFAULT_GROUPS} collapsed />);
    expect(screen.queryByText("Dashboard")).not.toBeInTheDocument();
  });

  it("hides group labels when collapsed=true", () => {
    render(<FlowSidebar groups={DEFAULT_GROUPS} collapsed />);
    expect(screen.queryByText("Main")).not.toBeInTheDocument();
    expect(screen.queryByText("Settings")).not.toBeInTheDocument();
  });

  it("sets data-collapsed attribute", () => {
    render(<FlowSidebar groups={DEFAULT_GROUPS} collapsed />);
    expect(screen.getByRole("navigation")).toHaveAttribute("data-collapsed", "true");
  });
});

// ─────────────────────────────────────────────
// Interaction
// ─────────────────────────────────────────────

describe("FlowSidebar — interaction", () => {
  it("calls onCollapsedChange when toggle button is clicked", async () => {
    const onCollapsedChange = vi.fn();
    render(
      <FlowSidebar groups={DEFAULT_GROUPS} collapsed={false} onCollapsedChange={onCollapsedChange} />,
    );
    await userEvent.click(screen.getByRole("button", { name: "Collapse sidebar" }));
    expect(onCollapsedChange).toHaveBeenCalledWith(true);
  });

  it("shows expand label on toggle when collapsed", () => {
    render(
      <FlowSidebar groups={DEFAULT_GROUPS} collapsed onCollapsedChange={vi.fn()} />,
    );
    expect(screen.getByRole("button", { name: "Expand sidebar" })).toBeInTheDocument();
  });

  it("calls onItemClick when an item is clicked (flat items API)", async () => {
    const onItemClick = vi.fn();
    const items = [
      { id: "home", label: "Home", icon: "home" },
      { id: "search", label: "Search", icon: "search" },
    ];
    render(<FlowSidebar items={items} onItemClick={onItemClick} />);
    await userEvent.click(screen.getByText("Search"));
    expect(onItemClick).toHaveBeenCalledWith("search");
  });
});

// ─────────────────────────────────────────────
// Accessibility
// ─────────────────────────────────────────────

describe("FlowSidebar — accessibility", () => {
  it("has default aria-label 'Sidebar navigation'", () => {
    render(<FlowSidebar groups={DEFAULT_GROUPS} />);
    expect(screen.getByRole("navigation")).toHaveAttribute("aria-label", "Sidebar navigation");
  });

  it("accepts custom aria-label", () => {
    render(<FlowSidebar groups={DEFAULT_GROUPS} aria-label="Admin nav" />);
    expect(screen.getByRole("navigation")).toHaveAttribute("aria-label", "Admin nav");
  });

  it("sets data-state='disabled' when disabled", () => {
    render(<FlowSidebar groups={DEFAULT_GROUPS} disabled />);
    expect(screen.getByRole("navigation")).toHaveAttribute("data-state", "disabled");
  });
});

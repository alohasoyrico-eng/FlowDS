/**
 * FLOW — FlowBreadcrumbs Component Tests
 * ────────────────────────────────────────
 * Tests rendering, navigation items, current page, collapsing,
 * and accessibility behavior.
 *
 * Requires: vitest + @testing-library/react + jsdom
 * Run: npx vitest run src/test/FlowBreadcrumbs.test.tsx
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";

import { FlowBreadcrumbs } from "../app/components/navigation";

const DEFAULT_ITEMS = [
  { key: "home", label: "Home", href: "/" },
  { key: "products", label: "Products", href: "/products" },
  { key: "shoes", label: "Shoes" },
];

// ─────────────────────────────────────────────
// Rendering
// ─────────────────────────────────────────────

describe("FlowBreadcrumbs — rendering", () => {
  it("renders all breadcrumb items", () => {
    render(<FlowBreadcrumbs items={DEFAULT_ITEMS} />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Products")).toBeInTheDocument();
    expect(screen.getByText("Shoes")).toBeInTheDocument();
  });

  it("renders as a <nav> element", () => {
    render(<FlowBreadcrumbs items={DEFAULT_ITEMS} />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("renders the last item as current page (aria-current='page')", () => {
    render(<FlowBreadcrumbs items={DEFAULT_ITEMS} />);
    const currentItem = screen.getByText("Shoes").closest("[aria-current]");
    expect(currentItem).toHaveAttribute("aria-current", "page");
  });

  it("renders non-last items as links when href is provided", () => {
    render(<FlowBreadcrumbs items={DEFAULT_ITEMS} />);
    const homeLink = screen.getByText("Home").closest("a");
    expect(homeLink).toHaveAttribute("href", "/");
    const productsLink = screen.getByText("Products").closest("a");
    expect(productsLink).toHaveAttribute("href", "/products");
  });
});

// ─────────────────────────────────────────────
// States
// ─────────────────────────────────────────────

describe("FlowBreadcrumbs — states", () => {
  it("collapses items with ellipsis when maxItems is exceeded", () => {
    const items = [
      { key: "home", label: "Home" },
      { key: "cat", label: "Category" },
      { key: "sub", label: "Subcategory" },
      { key: "item", label: "Item" },
      { key: "detail", label: "Detail" },
    ];
    render(<FlowBreadcrumbs items={items} maxItems={3} />);
    // Ellipsis button should be present
    expect(screen.getByText("…")).toBeInTheDocument();
  });

  it("expands collapsed items when ellipsis is clicked", async () => {
    const items = [
      { key: "home", label: "Home" },
      { key: "cat", label: "Category" },
      { key: "sub", label: "Subcategory" },
      { key: "item", label: "Item" },
      { key: "detail", label: "Detail" },
    ];
    render(<FlowBreadcrumbs items={items} maxItems={3} />);
    await userEvent.click(screen.getByText("…"));
    // After expanding, all items should be visible
    expect(screen.getByText("Category")).toBeInTheDocument();
    expect(screen.getByText("Subcategory")).toBeInTheDocument();
    expect(screen.getByText("Item")).toBeInTheDocument();
  });

  it("does not collapse when items count is within maxItems", () => {
    render(<FlowBreadcrumbs items={DEFAULT_ITEMS} maxItems={5} />);
    expect(screen.queryByText("…")).not.toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// Interaction
// ─────────────────────────────────────────────

describe("FlowBreadcrumbs — interaction", () => {
  it("calls onClick handler on item click", async () => {
    const onClick = vi.fn();
    const items = [
      { key: "home", label: "Home", onClick },
      { key: "products", label: "Products" },
    ];
    render(<FlowBreadcrumbs items={items} />);
    await userEvent.click(screen.getByText("Home"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("renders items as buttons when onClick is provided without href", () => {
    const items = [
      { key: "home", label: "Home", onClick: vi.fn() },
      { key: "products", label: "Products" },
    ];
    render(<FlowBreadcrumbs items={items} />);
    const homeEl = screen.getByText("Home").closest("button");
    expect(homeEl).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// Accessibility
// ─────────────────────────────────────────────

describe("FlowBreadcrumbs — accessibility", () => {
  it("has role='navigation'", () => {
    render(<FlowBreadcrumbs items={DEFAULT_ITEMS} />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("has default aria-label 'Breadcrumb'", () => {
    render(<FlowBreadcrumbs items={DEFAULT_ITEMS} />);
    expect(screen.getByRole("navigation")).toHaveAttribute("aria-label", "Breadcrumb");
  });

  it("accepts custom aria-label", () => {
    render(<FlowBreadcrumbs items={DEFAULT_ITEMS} aria-label="Page path" />);
    expect(screen.getByRole("navigation")).toHaveAttribute("aria-label", "Page path");
  });

  it("renders separators with aria-hidden='true'", () => {
    const { container } = render(<FlowBreadcrumbs items={DEFAULT_ITEMS} />);
    const separators = container.querySelectorAll(".flow-breadcrumb-separator");
    separators.forEach((sep) => {
      expect(sep).toHaveAttribute("aria-hidden", "true");
    });
  });

  it("has no axe violations", async () => {
    const { container } = render(<FlowBreadcrumbs items={DEFAULT_ITEMS} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

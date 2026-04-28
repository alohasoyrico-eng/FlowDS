/**
 * FLOW — FlowTopbar Component Tests
 * ──────────────────────────────────
 * Tests rendering, interaction, and accessibility.
 *
 * Requires: vitest + @testing-library/react + jsdom
 * Run: npx vitest run src/test/FlowTopbar.test.tsx
 */
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";

import { FlowTopbar } from "@flow/patterns";

// ─────────────────────────────────────────────
// Rendering
// ─────────────────────────────────────────────

describe("FlowTopbar — rendering", () => {
  it("renders with role='banner'", () => {
    render(<FlowTopbar />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("renders the title text", () => {
    render(<FlowTopbar title="Dashboard" />);
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });

  it("renders the leading section", () => {
    render(<FlowTopbar leading={<button>Menu</button>} />);
    expect(screen.getByRole("button", { name: "Menu" })).toBeInTheDocument();
  });

  it("renders the actions section", () => {
    render(<FlowTopbar actions={<button>Settings</button>} />);
    expect(screen.getByRole("button", { name: "Settings" })).toBeInTheDocument();
  });

  it("sets loading state with aria-busy and data-state", () => {
    render(<FlowTopbar loading />);
    const banner = screen.getByRole("banner");
    expect(banner).toHaveAttribute("aria-busy", "true");
    expect(banner).toHaveAttribute("data-state", "loading");
  });
});

// ─────────────────────────────────────────────
// Accessibility
// ─────────────────────────────────────────────

describe("FlowTopbar — accessibility", () => {
  it("has default aria-label", () => {
    render(<FlowTopbar />);
    expect(screen.getByRole("banner")).toHaveAttribute("aria-label", "Application top bar");
  });

  it("supports custom aria-label", () => {
    render(<FlowTopbar aria-label="Main navigation bar" />);
    expect(screen.getByRole("banner")).toHaveAttribute("aria-label", "Main navigation bar");
  });

  it("has no axe violations", async () => {
    const { container } = render(<FlowTopbar title="My App" actions={<button>Profile</button>} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

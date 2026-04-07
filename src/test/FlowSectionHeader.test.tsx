/**
 * FLOW — FlowSectionHeader Component Tests
 * ──────────────────────────────────
 * Tests rendering, interaction, and accessibility.
 *
 * Requires: vitest + @testing-library/react + jsdom
 * Run: npx vitest run src/test/FlowSectionHeader.test.tsx
 */
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";

import { FlowSectionHeader } from "../app/components/patterns";

// ─────────────────────────────────────────────
// Rendering
// ─────────────────────────────────────────────

describe("FlowSectionHeader — rendering", () => {
  it("renders the title text", () => {
    render(<FlowSectionHeader title="Settings" />);
    expect(screen.getByText("Settings")).toBeInTheDocument();
  });

  it("renders subtitle when provided", () => {
    render(<FlowSectionHeader title="Settings" subtitle="Manage your preferences" />);
    expect(screen.getByText("Manage your preferences")).toBeInTheDocument();
  });

  it("renders action element when provided", () => {
    render(<FlowSectionHeader title="Users" action={<button>Add user</button>} />);
    expect(screen.getByRole("button", { name: "Add user" })).toBeInTheDocument();
  });

  it("shows separator by default (divider=true)", () => {
    render(<FlowSectionHeader title="Section" />);
    expect(screen.getByRole("separator")).toBeInTheDocument();
  });

  it("hides separator when divider is false", () => {
    render(<FlowSectionHeader title="No divider" divider={false} />);
    expect(screen.queryByRole("separator")).not.toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// Accessibility
// ─────────────────────────────────────────────

describe("FlowSectionHeader — accessibility", () => {
  it("has no axe violations", async () => {
    const { container } = render(
      <FlowSectionHeader title="Accessible section" subtitle="With subtitle" />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

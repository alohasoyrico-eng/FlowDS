/**
 * FLOW — FlowToolbar Component Tests
 * ──────────────────────────────────
 * Tests rendering, interaction, and accessibility.
 *
 * Requires: vitest + @testing-library/react + jsdom
 * Run: npx vitest run src/test/FlowToolbar.test.tsx
 */
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";

import {
  FlowToolbar,
  FlowToolbarDivider,
  FlowToolbarGroup,
} from "../app/components/patterns";

// ─────────────────────────────────────────────
// Rendering
// ─────────────────────────────────────────────

describe("FlowToolbar — rendering", () => {
  it("renders with role='toolbar'", () => {
    render(<FlowToolbar />);
    expect(screen.getByRole("toolbar")).toBeInTheDocument();
  });

  it("renders children content", () => {
    render(
      <FlowToolbar>
        <button>Bold</button>
      </FlowToolbar>,
    );
    expect(screen.getByRole("button", { name: "Bold" })).toBeInTheDocument();
  });

  it("renders left and right action slots", () => {
    render(
      <FlowToolbar
        leftActions={<button>Left</button>}
        rightActions={<button>Right</button>}
      />,
    );
    expect(screen.getByRole("button", { name: "Left" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Right" })).toBeInTheDocument();
  });

  it("sets data-size attribute", () => {
    render(<FlowToolbar size="lg" />);
    expect(screen.getByRole("toolbar")).toHaveAttribute("data-size", "lg");
  });

  it("FlowToolbarDivider renders with role='separator'", () => {
    render(<FlowToolbarDivider />);
    const sep = screen.getByRole("separator");
    expect(sep).toBeInTheDocument();
    expect(sep).toHaveAttribute("aria-orientation", "vertical");
  });

  it("FlowToolbarGroup renders with role='group'", () => {
    render(
      <FlowToolbarGroup>
        <button>A</button>
      </FlowToolbarGroup>,
    );
    expect(screen.getByRole("group")).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// Interaction
// ─────────────────────────────────────────────

describe("FlowToolbar — interaction", () => {
  it("sets data-state='disabled' and aria-disabled when disabled", () => {
    render(<FlowToolbar disabled />);
    const toolbar = screen.getByRole("toolbar");
    expect(toolbar).toHaveAttribute("data-state", "disabled");
    expect(toolbar).toHaveAttribute("aria-disabled", "true");
  });

  it("does not set data-state when not disabled", () => {
    render(<FlowToolbar />);
    const toolbar = screen.getByRole("toolbar");
    expect(toolbar).not.toHaveAttribute("data-state");
  });
});

// ─────────────────────────────────────────────
// Accessibility
// ─────────────────────────────────────────────

describe("FlowToolbar — accessibility", () => {
  it("has default aria-label", () => {
    render(<FlowToolbar />);
    expect(screen.getByRole("toolbar")).toHaveAttribute("aria-label", "Toolbar");
  });

  it("supports custom aria-label", () => {
    render(<FlowToolbar aria-label="Formatting toolbar" />);
    expect(screen.getByRole("toolbar", { name: "Formatting toolbar" })).toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <FlowToolbar aria-label="Editing toolbar">
        <button>Bold</button>
        <button>Italic</button>
      </FlowToolbar>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

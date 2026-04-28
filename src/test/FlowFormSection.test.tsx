/**
 * FLOW — FlowFormSection Component Tests
 * ──────────────────────────────────
 * Tests rendering, interaction, and accessibility.
 *
 * Requires: vitest + @testing-library/react + jsdom
 * Run: npx vitest run src/test/FlowFormSection.test.tsx
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";

import { FlowFormSection } from "@flow/patterns";

// ─────────────────────────────────────────────
// Rendering
// ─────────────────────────────────────────────

describe("FlowFormSection — rendering", () => {
  it("renders the title", () => {
    render(
      <FlowFormSection title="Personal Info">
        <input />
      </FlowFormSection>,
    );
    expect(screen.getByText("Personal Info")).toBeInTheDocument();
  });

  it("renders children", () => {
    render(
      <FlowFormSection title="Details">
        <span>Field content</span>
      </FlowFormSection>,
    );
    expect(screen.getByText("Field content")).toBeInTheDocument();
  });

  it("renders description when provided", () => {
    render(
      <FlowFormSection title="Settings" description="Configure your preferences">
        <input />
      </FlowFormSection>,
    );
    expect(screen.getByText("Configure your preferences")).toBeInTheDocument();
  });

  it("hides children when collapsible and defaultOpen is false", () => {
    render(
      <FlowFormSection title="Collapsed" collapsible defaultOpen={false}>
        <span>Hidden content</span>
      </FlowFormSection>,
    );
    expect(screen.queryByText("Hidden content")).not.toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// Interaction
// ─────────────────────────────────────────────

describe("FlowFormSection — interaction", () => {
  it("collapsible toggle hides and shows children", async () => {
    render(
      <FlowFormSection title="Collapsible" collapsible defaultOpen>
        <span>Toggleable content</span>
      </FlowFormSection>,
    );
    expect(screen.getByText("Toggleable content")).toBeInTheDocument();

    const toggle = screen.getByRole("button");
    await userEvent.click(toggle);
    expect(screen.queryByText("Toggleable content")).not.toBeInTheDocument();

    await userEvent.click(toggle);
    expect(screen.getByText("Toggleable content")).toBeInTheDocument();
  });

  it("sets aria-expanded on collapsible header", () => {
    render(
      <FlowFormSection title="Section" collapsible defaultOpen>
        <input />
      </FlowFormSection>,
    );
    const toggle = screen.getByRole("button");
    expect(toggle).toHaveAttribute("aria-expanded", "true");
  });
});

// ─────────────────────────────────────────────
// Accessibility
// ─────────────────────────────────────────────

describe("FlowFormSection — accessibility", () => {
  it("has no axe violations", async () => {
    const { container } = render(
      <FlowFormSection title="Basic Section">
        <label>
          Name
          <input type="text" />
        </label>
      </FlowFormSection>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

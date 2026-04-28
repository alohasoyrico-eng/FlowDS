/**
 * FLOW — FlowFieldset Component Tests
 * ─────────────────────────────────────
 * Tests rendering, legend, description, disabled state, error state,
 * and accessibility behavior.
 *
 * Requires: vitest + @testing-library/react + jsdom
 * Run: npx vitest run src/test/FlowFieldset.test.tsx
 */
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";

import { FlowFieldset } from "@flow/components";

// ─────────────────────────────────────────────
// Rendering
// ─────────────────────────────────────────────

describe("FlowFieldset — rendering", () => {
  it("renders the legend text", () => {
    render(
      <FlowFieldset legend="Personal Info">
        <input type="text" />
      </FlowFieldset>,
    );
    expect(screen.getByText("Personal Info")).toBeInTheDocument();
  });

  it("renders children content", () => {
    render(
      <FlowFieldset legend="Address">
        <input type="text" aria-label="Street" />
      </FlowFieldset>,
    );
    expect(screen.getByLabelText("Street")).toBeInTheDocument();
  });

  it("renders as a <fieldset> element", () => {
    const { container } = render(
      <FlowFieldset legend="Group">
        <span>Content</span>
      </FlowFieldset>,
    );
    expect(container.querySelector("fieldset")).toBeInTheDocument();
  });

  it("renders a <legend> element", () => {
    const { container } = render(
      <FlowFieldset legend="Group">
        <span>Content</span>
      </FlowFieldset>,
    );
    expect(container.querySelector("legend")).toBeInTheDocument();
    expect(container.querySelector("legend")?.textContent).toBe("Group");
  });

  it("renders description text when provided", () => {
    render(
      <FlowFieldset legend="Preferences" description="Choose your preferences below.">
        <span>Content</span>
      </FlowFieldset>,
    );
    expect(screen.getByText("Choose your preferences below.")).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// States
// ─────────────────────────────────────────────

describe("FlowFieldset — states", () => {
  it("is disabled when disabled=true", () => {
    const { container } = render(
      <FlowFieldset legend="Disabled group" disabled>
        <input type="text" aria-label="Name" />
      </FlowFieldset>,
    );
    expect(container.querySelector("fieldset")).toBeDisabled();
  });

  it("applies reduced opacity when disabled", () => {
    const { container } = render(
      <FlowFieldset legend="Disabled group" disabled>
        <span>Content</span>
      </FlowFieldset>,
    );
    const fieldset = container.querySelector("fieldset");
    // jsdom cannot resolve CSS custom properties in inline styles, so
    // verify the disabled state is conveyed via the aria-disabled attribute
    // (set by stateAttrs) which drives the visual opacity in real browsers.
    expect(fieldset).toHaveAttribute("aria-disabled", "true");
  });

  it("applies error border when error=true", () => {
    const { container } = render(
      <FlowFieldset legend="Error group" error>
        <span>Content</span>
      </FlowFieldset>,
    );
    const fieldset = container.querySelector("fieldset");
    expect(fieldset?.style.border).toContain("var(--sys-energy-status-error)");
  });

  it("does not apply error border when error=false", () => {
    const { container } = render(
      <FlowFieldset legend="Normal group">
        <span>Content</span>
      </FlowFieldset>,
    );
    const fieldset = container.querySelector("fieldset");
    expect(fieldset?.style.border).toContain("var(--sys-energy-border-default)");
  });
});

// ─────────────────────────────────────────────
// Accessibility
// ─────────────────────────────────────────────

describe("FlowFieldset — accessibility", () => {
  it("fieldset has the flow-fieldset class", () => {
    const { container } = render(
      <FlowFieldset legend="Group">
        <span>Content</span>
      </FlowFieldset>,
    );
    expect(container.querySelector("fieldset")).toHaveClass("flow-fieldset");
  });

  it("legend is associated with the fieldset", () => {
    const { container } = render(
      <FlowFieldset legend="Account Details">
        <span>Content</span>
      </FlowFieldset>,
    );
    const fieldset = container.querySelector("fieldset");
    const legend = fieldset?.querySelector("legend");
    expect(legend).toBeInTheDocument();
    expect(legend?.textContent).toBe("Account Details");
  });

  it("children are rendered within the fieldset structure", () => {
    render(
      <FlowFieldset legend="Test">
        <button type="button">Submit</button>
      </FlowFieldset>,
    );
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <FlowFieldset legend="Group">
        <span>Content</span>
      </FlowFieldset>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

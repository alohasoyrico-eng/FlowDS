/**
 * FLOW — FlowInlineValidationMessage Component Tests
 * ───────────────────────────────────────────────────
 * Tests rendering, variant behavior, icon display, and ARIA roles.
 *
 * Requires: vitest + @testing-library/react + jsdom
 * Run: npx vitest run src/test/FlowInlineValidationMessage.test.tsx
 */
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";

import { FlowInlineValidationMessage } from "../app/components/feedback";

// ─────────────────────────────────────────────
// Rendering
// ─────────────────────────────────────────────

describe("FlowInlineValidationMessage — rendering", () => {
  it("renders the message text", () => {
    render(<FlowInlineValidationMessage message="This field is required" />);
    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });

  it("applies the flow-inline-validation class", () => {
    const { container } = render(<FlowInlineValidationMessage message="Error" />);
    expect(container.querySelector(".flow-inline-validation")).toBeInTheDocument();
  });

  it("renders as a <span> element", () => {
    const { container } = render(<FlowInlineValidationMessage message="Error" />);
    const el = container.querySelector(".flow-inline-validation");
    expect(el?.tagName).toBe("SPAN");
  });
});

// ─────────────────────────────────────────────
// Variant
// ─────────────────────────────────────────────

describe("FlowInlineValidationMessage — variant", () => {
  it("defaults to error variant with error color", () => {
    const { container } = render(<FlowInlineValidationMessage message="Required" />);
    const el = container.querySelector(".flow-inline-validation");
    expect(el).toHaveStyle({ color: "var(--sys-energy-status-error)" });
  });

  it("applies success color for success variant", () => {
    const { container } = render(
      <FlowInlineValidationMessage message="Looks good" variant="success" />,
    );
    const el = container.querySelector(".flow-inline-validation");
    expect(el).toHaveStyle({ color: "var(--sys-energy-status-success)" });
  });

  it("applies warning color for warning variant", () => {
    const { container } = render(
      <FlowInlineValidationMessage message="Check this" variant="warning" />,
    );
    const el = container.querySelector(".flow-inline-validation");
    expect(el).toHaveStyle({ color: "var(--sys-energy-status-warning)" });
  });

  it("applies info color for info variant", () => {
    const { container } = render(
      <FlowInlineValidationMessage message="Hint" variant="info" />,
    );
    const el = container.querySelector(".flow-inline-validation");
    expect(el).toHaveStyle({ color: "var(--sys-energy-status-info)" });
  });
});

// ─────────────────────────────────────────────
// Icon
// ─────────────────────────────────────────────

describe("FlowInlineValidationMessage — icon", () => {
  it("renders an icon by default (icon=true)", () => {
    const { container } = render(<FlowInlineValidationMessage message="Error" />);
    expect(container.querySelector(".flow-icon")).toBeInTheDocument();
  });

  it("does not render an icon when icon=false", () => {
    const { container } = render(
      <FlowInlineValidationMessage message="Error" icon={false} />,
    );
    expect(container.querySelector(".flow-icon")).not.toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// Accessibility
// ─────────────────────────────────────────────

describe("FlowInlineValidationMessage — accessibility", () => {
  it("has role='alert' for error variant", () => {
    render(<FlowInlineValidationMessage message="Required" variant="error" />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("has role='status' for success variant", () => {
    render(<FlowInlineValidationMessage message="Valid" variant="success" />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("has role='status' for info variant", () => {
    render(<FlowInlineValidationMessage message="Hint" variant="info" />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("has role='status' for warning variant", () => {
    render(<FlowInlineValidationMessage message="Careful" variant="warning" />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    const { container } = render(<FlowInlineValidationMessage message="This field is required" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

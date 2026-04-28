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

import { FlowInlineValidationMessage } from "@flow/components";

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

describe("FlowInlineValidationMessage — status", () => {
  it("defaults to error variant with error color", () => {
    const { container } = render(<FlowInlineValidationMessage message="Required" />);
    const el = container.querySelector(".flow-inline-validation");
    expect(el).toHaveStyle({ color: "var(--sys-energy-status-error)" });
  });

  it("applies success color for success status", () => {
    const { container } = render(
      <FlowInlineValidationMessage message="Looks good" status="success" />,
    );
    const el = container.querySelector(".flow-inline-validation");
    expect(el).toHaveStyle({ color: "var(--sys-energy-status-success)" });
  });

  it("applies warning color for warning status", () => {
    const { container } = render(
      <FlowInlineValidationMessage message="Check this" status="warning" />,
    );
    const el = container.querySelector(".flow-inline-validation");
    expect(el).toHaveStyle({ color: "var(--sys-energy-text-warning)" });
  });

  it("applies info color for info status", () => {
    const { container } = render(<FlowInlineValidationMessage message="Hint" status="info" />);
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
    const { container } = render(<FlowInlineValidationMessage message="Error" icon={false} />);
    expect(container.querySelector(".flow-icon")).not.toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// Accessibility
// ─────────────────────────────────────────────

describe("FlowInlineValidationMessage — accessibility", () => {
  it("has role='alert' for error status", () => {
    render(<FlowInlineValidationMessage message="Required" status="error" />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("has role='status' for success status", () => {
    render(<FlowInlineValidationMessage message="Valid" status="success" />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("has role='status' for info status", () => {
    render(<FlowInlineValidationMessage message="Hint" status="info" />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("has role='status' for warning status", () => {
    render(<FlowInlineValidationMessage message="Careful" status="warning" />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    const { container } = render(<FlowInlineValidationMessage message="This field is required" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

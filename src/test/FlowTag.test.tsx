/**
 * FLOW — FlowTag Component Tests
 * ────────────────────────────────
 * Tests rendering, variants, status, and size behavior.
 *
 * Requires: vitest + @testing-library/react + jsdom
 * Run: npx vitest run src/test/FlowTag.test.tsx
 */
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";

import { FlowTag } from "@flow/components";

// ─────────────────────────────────────────────
// Rendering
// ─────────────────────────────────────────────

describe("FlowTag — rendering", () => {
  it("renders children as text content", () => {
    render(<FlowTag>Active</FlowTag>);
    expect(screen.getByText("Active")).toBeInTheDocument();
  });

  it("renders as a <span> element", () => {
    const { container } = render(<FlowTag>Label</FlowTag>);
    const tag = container.querySelector(".flow-tag");
    expect(tag?.tagName).toBe("SPAN");
  });

  it("applies the flow-tag class", () => {
    const { container } = render(<FlowTag>Label</FlowTag>);
    expect(container.querySelector(".flow-tag")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<FlowTag className="custom">Label</FlowTag>);
    expect(container.querySelector(".flow-tag")).toHaveClass("custom");
  });
});

// ─────────────────────────────────────────────
// Variant
// ─────────────────────────────────────────────

describe("FlowTag — variant", () => {
  it("sets data-variant='label' by default", () => {
    const { container } = render(<FlowTag>Default</FlowTag>);
    expect(container.querySelector(".flow-tag")).toHaveAttribute("data-variant", "label");
  });

  it("sets data-variant='code' when variant='code'", () => {
    const { container } = render(<FlowTag variant="code">const x</FlowTag>);
    expect(container.querySelector(".flow-tag")).toHaveAttribute("data-variant", "code");
  });
});

// ─────────────────────────────────────────────
// Status
// ─────────────────────────────────────────────

describe("FlowTag — status", () => {
  it("sets data-status='neutral' by default", () => {
    const { container } = render(<FlowTag>Default</FlowTag>);
    expect(container.querySelector(".flow-tag")).toHaveAttribute("data-status", "neutral");
  });

  it("sets data-status='success' when status='success'", () => {
    const { container } = render(<FlowTag status="success">Passed</FlowTag>);
    expect(container.querySelector(".flow-tag")).toHaveAttribute("data-status", "success");
  });

  it("sets data-status='error' when status='error'", () => {
    const { container } = render(<FlowTag status="error">Failed</FlowTag>);
    expect(container.querySelector(".flow-tag")).toHaveAttribute("data-status", "error");
  });

  it("sets data-status='warning' when status='warning'", () => {
    const { container } = render(<FlowTag status="warning">Pending</FlowTag>);
    expect(container.querySelector(".flow-tag")).toHaveAttribute("data-status", "warning");
  });

  it("sets data-status='info' when status='info'", () => {
    const { container } = render(<FlowTag status="info">Note</FlowTag>);
    expect(container.querySelector(".flow-tag")).toHaveAttribute("data-status", "info");
  });
});

// ─────────────────────────────────────────────
// Size
// ─────────────────────────────────────────────

describe("FlowTag — size", () => {
  it("resolves size from viewport when no explicit size is passed", () => {
    const { container } = render(<FlowTag>Label</FlowTag>);
    // jsdom viewport (1024px) resolves to "lg" via useFlowBreakpoint
    expect(container.querySelector(".flow-tag")).toHaveAttribute("data-size");
  });

  it("applies an explicit size via prop", () => {
    const { container } = render(<FlowTag size="sm">Small</FlowTag>);
    expect(container.querySelector(".flow-tag")).toHaveAttribute("data-size", "sm");
  });
});

// ─────────────────────────────────────────────
// Accessibility
// ─────────────────────────────────────────────

describe("FlowTag — accessibility", () => {
  it("has no axe violations", async () => {
    const { container } = render(<FlowTag>Active</FlowTag>);
    expect(await axe(container)).toHaveNoViolations();
  });
});

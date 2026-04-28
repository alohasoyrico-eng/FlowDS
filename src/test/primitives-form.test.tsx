/**
 * FLOW — Form Primitives Tests (FormField, FocusRing, StateLayer)
 * Requires: vitest + @testing-library/react + jsdom
 */
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";

import { FormField, FocusRing, StateLayer } from "@flow/primitives";

// ─────────────────────────────────────────────
// FormField
// ─────────────────────────────────────────────

describe("FormField — rendering", () => {
  it("renders children", () => {
    render(
      <FormField>
        <input id="test" />
      </FormField>,
    );
    expect(document.querySelector("input")).toBeInTheDocument();
  });

  it("renders label when provided", () => {
    render(
      <FormField label="Email" htmlFor="email">
        <input id="email" />
      </FormField>,
    );
    expect(screen.getByText("Email")).toBeInTheDocument();
  });

  it("shows required marker when required is true", () => {
    render(
      <FormField label="Name" required htmlFor="name">
        <input id="name" />
      </FormField>,
    );
    expect(document.querySelector(".flow-form-field-required")).toBeInTheDocument();
  });

  it("does not show required marker when required is false", () => {
    render(
      <FormField label="Name" htmlFor="name">
        <input id="name" />
      </FormField>,
    );
    expect(document.querySelector(".flow-form-field-required")).not.toBeInTheDocument();
  });

  it("renders helperText when provided", () => {
    render(
      <FormField helperText="Enter your email" htmlFor="e">
        <input id="e" />
      </FormField>,
    );
    expect(screen.getByText("Enter your email")).toBeInTheDocument();
  });

  it("renders error message when provided", () => {
    render(
      <FormField error="Invalid email" htmlFor="e">
        <input id="e" />
      </FormField>,
    );
    expect(screen.getByText("Invalid email")).toBeInTheDocument();
  });

  it("shows data-full-width when fullWidth is true", () => {
    const { container } = render(
      <FormField fullWidth htmlFor="e">
        <input id="e" />
      </FormField>,
    );
    expect(container.querySelector(".flow-form-field")).toHaveAttribute("data-full-width");
  });

  it("applies custom className", () => {
    const { container } = render(
      <FormField className="custom-field" htmlFor="e">
        <input id="e" />
      </FormField>,
    );
    expect(container.querySelector(".flow-form-field")).toHaveClass("custom-field");
  });
});

describe("FormField — accessibility", () => {
  it("associates label with input via htmlFor", () => {
    render(
      <FormField label="Email" htmlFor="email-input">
        <input id="email-input" />
      </FormField>,
    );
    const label = screen.getByText("Email").closest("label");
    expect(label).toHaveAttribute("for", "email-input");
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <FormField label="Email" htmlFor="axe-input" helperText="Enter your email">
        <input id="axe-input" type="email" />
      </FormField>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

// ─────────────────────────────────────────────
// FocusRing
// ─────────────────────────────────────────────

describe("FocusRing — rendering", () => {
  it("renders children", () => {
    render(
      <FocusRing>
        <button>Click</button>
      </FocusRing>,
    );
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("applies flow-focus-ring--active class when visible is true", () => {
    const { container } = render(
      <FocusRing visible={true}>
        <button>Click</button>
      </FocusRing>,
    );
    expect(container.querySelector(".flow-focus-ring--active")).toBeInTheDocument();
  });

  it("does not apply active class when visible is false", () => {
    const { container } = render(
      <FocusRing visible={false}>
        <button>Click</button>
      </FocusRing>,
    );
    expect(container.querySelector(".flow-focus-ring--active")).not.toBeInTheDocument();
  });

  it("sets data-inset when inset is true", () => {
    const { container } = render(
      <FocusRing inset>
        <button>Click</button>
      </FocusRing>,
    );
    expect(container.querySelector(".flow-focus-ring")).toHaveAttribute("data-inset");
  });

  it("sets data-focus-visible when visible is provided", () => {
    const { container } = render(
      <FocusRing visible={true}>
        <button>Click</button>
      </FocusRing>,
    );
    expect(container.querySelector(".flow-focus-ring-container")).toHaveAttribute(
      "data-focus-visible",
    );
  });
});

// ─────────────────────────────────────────────
// StateLayer
// ─────────────────────────────────────────────

describe("StateLayer — rendering", () => {
  it("renders children", () => {
    render(
      <StateLayer>
        <span>Content</span>
      </StateLayer>,
    );
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("sets data-state-layer attribute to idle by default", () => {
    const { container } = render(
      <StateLayer>
        <span>Content</span>
      </StateLayer>,
    );
    expect(container.querySelector(".flow-state-layer")).toHaveAttribute("data-state-layer", "idle");
  });

  it("sets data-state-layer attribute for hover state", () => {
    const { container } = render(
      <StateLayer state="hover">
        <span>Content</span>
      </StateLayer>,
    );
    expect(container.querySelector(".flow-state-layer")).toHaveAttribute(
      "data-state-layer",
      "hover",
    );
  });

  it("sets data-state-layer for pressed state", () => {
    const { container } = render(
      <StateLayer state="pressed">
        <span>Content</span>
      </StateLayer>,
    );
    expect(container.querySelector(".flow-state-layer")).toHaveAttribute(
      "data-state-layer",
      "pressed",
    );
  });

  it("sets data-disabled when disabled is true", () => {
    const { container } = render(
      <StateLayer disabled>
        <span>Content</span>
      </StateLayer>,
    );
    expect(container.querySelector(".flow-state-layer-container")).toHaveAttribute("data-disabled");
  });

  it("does not set data-clip when clip is false", () => {
    const { container } = render(
      <StateLayer clip={false}>
        <span>Content</span>
      </StateLayer>,
    );
    expect(container.querySelector(".flow-state-layer-container")).not.toHaveAttribute("data-clip");
  });
});

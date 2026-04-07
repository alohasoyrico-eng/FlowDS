/**
 * FLOW — FlowStepper Component Tests
 * ────────────────────────────────────
 * Tests rendering, step states, click behavior, orientation,
 * and accessibility attributes.
 *
 * Requires: vitest + @testing-library/react + jsdom
 * Run: npx vitest run src/test/FlowStepper.test.tsx
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { FlowStepper } from "../app/components/navigation";

const DEFAULT_STEPS = [
  { key: "account", label: "Account" },
  { key: "details", label: "Details" },
  { key: "review", label: "Review" },
];

// ─────────────────────────────────────────────
// Rendering
// ─────────────────────────────────────────────

describe("FlowStepper — rendering", () => {
  it("renders all step labels", () => {
    render(<FlowStepper steps={DEFAULT_STEPS} activeStep={0} />);
    expect(screen.getByText("Account")).toBeInTheDocument();
    expect(screen.getByText("Details")).toBeInTheDocument();
    expect(screen.getByText("Review")).toBeInTheDocument();
  });

  it("renders as a <nav> element", () => {
    render(<FlowStepper steps={DEFAULT_STEPS} activeStep={0} />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("renders the correct number of steps", () => {
    const { container } = render(<FlowStepper steps={DEFAULT_STEPS} activeStep={0} />);
    const steps = container.querySelectorAll(".flow-stepper-step");
    expect(steps).toHaveLength(3);
  });

  it("renders step descriptions when provided", () => {
    const steps = [
      { key: "account", label: "Account", description: "Create your account" },
      { key: "details", label: "Details" },
    ];
    render(<FlowStepper steps={steps} activeStep={0} />);
    expect(screen.getByText("Create your account")).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// States
// ─────────────────────────────────────────────

describe("FlowStepper — states", () => {
  it("marks the active step with aria-current='step'", () => {
    render(<FlowStepper steps={DEFAULT_STEPS} activeStep={1} />);
    const activeStep = screen.getByText("Details").closest("li");
    expect(activeStep).toHaveAttribute("aria-current", "step");
  });

  it("marks completed steps with data-status='complete'", () => {
    render(<FlowStepper steps={DEFAULT_STEPS} activeStep={2} />);
    const accountStep = screen.getByText("Account").closest("li");
    expect(accountStep).toHaveAttribute("data-status", "complete");
    const detailsStep = screen.getByText("Details").closest("li");
    expect(detailsStep).toHaveAttribute("data-status", "complete");
  });

  it("marks upcoming steps with data-status='upcoming'", () => {
    render(<FlowStepper steps={DEFAULT_STEPS} activeStep={0} />);
    const detailsStep = screen.getByText("Details").closest("li");
    expect(detailsStep).toHaveAttribute("data-status", "upcoming");
    const reviewStep = screen.getByText("Review").closest("li");
    expect(reviewStep).toHaveAttribute("data-status", "upcoming");
  });

  it("marks the current step with data-status='current'", () => {
    render(<FlowStepper steps={DEFAULT_STEPS} activeStep={1} />);
    const detailsStep = screen.getByText("Details").closest("li");
    expect(detailsStep).toHaveAttribute("data-status", "current");
  });

  it("marks steps with error=true as data-status='error'", () => {
    const steps = [
      { key: "account", label: "Account" },
      { key: "details", label: "Details", error: true },
    ];
    render(<FlowStepper steps={steps} activeStep={1} />);
    const detailsStep = screen.getByText("Details").closest("li");
    expect(detailsStep).toHaveAttribute("data-status", "error");
  });
});

// ─────────────────────────────────────────────
// Interaction
// ─────────────────────────────────────────────

describe("FlowStepper — interaction", () => {
  it("calls onStepClick for completed steps when clickable=true", async () => {
    const onStepClick = vi.fn();
    render(
      <FlowStepper
        steps={DEFAULT_STEPS}
        activeStep={2}
        clickable
        onStepClick={onStepClick}
      />,
    );
    // Step 0 (Account) is completed, should be clickable
    await userEvent.click(
      screen.getByRole("button", { name: /Step 1: Account \(completed\)/ }),
    );
    expect(onStepClick).toHaveBeenCalledWith(0);
  });

  it("does not call onStepClick for upcoming steps", async () => {
    const onStepClick = vi.fn();
    render(
      <FlowStepper
        steps={DEFAULT_STEPS}
        activeStep={0}
        clickable
        onStepClick={onStepClick}
      />,
    );
    // Steps 1 and 2 are upcoming, should not be clickable
    const upcomingBtns = screen
      .getAllByRole("button")
      .filter((btn) => btn.getAttribute("aria-label")?.includes("Details"));
    if (upcomingBtns[0]) {
      await userEvent.click(upcomingBtns[0]);
      expect(onStepClick).not.toHaveBeenCalled();
    }
  });
});

// ─────────────────────────────────────────────
// Accessibility
// ─────────────────────────────────────────────

describe("FlowStepper — accessibility", () => {
  it("has default aria-label 'Progress'", () => {
    render(<FlowStepper steps={DEFAULT_STEPS} activeStep={0} />);
    expect(screen.getByRole("navigation")).toHaveAttribute("aria-label", "Progress");
  });

  it("accepts custom aria-label", () => {
    render(<FlowStepper steps={DEFAULT_STEPS} activeStep={0} aria-label="Registration steps" />);
    expect(screen.getByRole("navigation")).toHaveAttribute("aria-label", "Registration steps");
  });

  it("sets data-orientation attribute", () => {
    render(<FlowStepper steps={DEFAULT_STEPS} activeStep={0} orientation="vertical" />);
    const nav = screen.getByRole("navigation");
    expect(nav).toHaveAttribute("data-orientation", "vertical");
  });

  it("sets data-state='disabled' when disabled", () => {
    render(<FlowStepper steps={DEFAULT_STEPS} activeStep={0} disabled />);
    expect(screen.getByRole("navigation")).toHaveAttribute("data-state", "disabled");
  });
});

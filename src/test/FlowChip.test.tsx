/**
 * FLOW — FlowChip Component Tests
 * ───────────────────────────────────
 * Tests rendering, accessibility, states, and interaction behavior.
 *
 * Requires: vitest + @testing-library/react + jsdom
 * Run: npx vitest run src/test/FlowChip.test.tsx
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";

import { FlowChip } from "@flow/components";

// ─────────────────────────────────────────────
// Rendering
// ─────────────────────────────────────────────

describe("FlowChip — rendering", () => {
  it("renders label text via children", () => {
    render(<FlowChip>Status</FlowChip>);
    expect(screen.getByText("Status")).toBeInTheDocument();
  });

  it("renders children as label", () => {
    render(<FlowChip>Category</FlowChip>);
    expect(screen.getByText("Category")).toBeInTheDocument();
  });

  it("applies the variant via data-variant attribute", () => {
    const { container } = render(<FlowChip variant="tonal">Tag</FlowChip>);
    const chip = container.querySelector(".flow-chip");
    expect(chip).toHaveAttribute("data-variant", "tonal");
  });

  it("renders as a <span> when non-interactive", () => {
    const { container } = render(<FlowChip>Static</FlowChip>);
    const chip = container.querySelector(".flow-chip");
    expect(chip?.tagName).toBe("SPAN");
  });

  it("renders as a <button> when onClick is provided (interactive)", () => {
    render(<FlowChip onClick={() => {}}>Clickable</FlowChip>);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// Selected state
// ─────────────────────────────────────────────

describe("FlowChip — selected state", () => {
  it("applies aria-pressed='true' when selected", () => {
    render(
      <FlowChip onClick={() => {}} selected>
        Filter
      </FlowChip>,
    );
    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "true");
  });
});

// ─────────────────────────────────────────────
// Removable
// ─────────────────────────────────────────────

describe("FlowChip — removable", () => {
  it("shows a remove button when removable is true", () => {
    render(<FlowChip removable>Removable</FlowChip>);
    expect(screen.getByLabelText("Remove")).toBeInTheDocument();
  });

  it("fires onRemove when the remove button is clicked", async () => {
    const onRemove = vi.fn();
    render(
      <FlowChip removable onRemove={onRemove}>
        Removable
      </FlowChip>,
    );
    await userEvent.click(screen.getByLabelText("Remove"));
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it("does not show the remove button when disabled", () => {
    render(
      <FlowChip removable disabled>
        Disabled
      </FlowChip>,
    );
    expect(screen.queryByLabelText("Remove")).not.toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// Disabled state
// ─────────────────────────────────────────────

describe("FlowChip — disabled state", () => {
  it("sets data-state='disabled' when disabled", () => {
    const { container } = render(<FlowChip disabled>Off</FlowChip>);
    const chip = container.querySelector(".flow-chip");
    expect(chip).toHaveAttribute("data-state", "disabled");
  });
});

// ─────────────────────────────────────────────
// Accessibility
// ─────────────────────────────────────────────

describe("FlowChip — accessibility", () => {
  it("has no axe violations", async () => {
    const { container } = render(<FlowChip>Status</FlowChip>);
    expect(await axe(container)).toHaveNoViolations();
  });
});

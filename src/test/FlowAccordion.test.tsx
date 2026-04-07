/**
 * FLOW — FlowAccordion Component Tests
 * ──────────────────────────────────────
 * Tests expand/collapse behavior, keyboard navigation, and ARIA compliance.
 *
 * Requires: vitest + @testing-library/react + jsdom
 * Run: npx vitest run src/test/FlowAccordion.test.tsx
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";

import { FlowAccordion } from "../app/components/layout";

// ─────────────────────────────────────────────
// Rendering
// ─────────────────────────────────────────────

describe("FlowAccordion — rendering", () => {
  it("renders the title text", () => {
    render(<FlowAccordion title="FAQ">Content here</FlowAccordion>);
    expect(screen.getByText("FAQ")).toBeInTheDocument();
  });

  it("hides content when not expanded (default collapsed)", () => {
    render(<FlowAccordion title="FAQ">Hidden content</FlowAccordion>);
    // Content wrapper should have data-expanded="false" (grid-template-rows: 0fr)
    const content = screen.queryByText("Hidden content")?.closest(".flow-accordion-content");
    expect(content).toHaveAttribute("data-expanded", "false");
  });

  it("shows content when defaultExpanded=true", () => {
    render(
      <FlowAccordion title="FAQ" defaultExpanded>
        Visible content
      </FlowAccordion>,
    );
    expect(screen.getByText("Visible content")).toBeVisible();
  });

  it("shows content when expanded=true (controlled)", () => {
    render(
      <FlowAccordion title="FAQ" expanded onChange={() => {}}>
        Controlled content
      </FlowAccordion>,
    );
    expect(screen.getByText("Controlled content")).toBeVisible();
  });
});

// ─────────────────────────────────────────────
// Interaction
// ─────────────────────────────────────────────

describe("FlowAccordion — interaction", () => {
  it("calls onChange when header is clicked", async () => {
    const onChange = vi.fn();
    render(
      <FlowAccordion title="Toggle me" onChange={onChange}>
        Content
      </FlowAccordion>,
    );
    await userEvent.click(screen.getByRole("button", { name: /toggle me/i }));
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("does NOT call onChange when disabled", async () => {
    const onChange = vi.fn();
    render(
      <FlowAccordion title="Disabled" disabled onChange={onChange}>
        Content
      </FlowAccordion>,
    );
    await userEvent.click(screen.getByRole("button", { name: /disabled/i }));
    expect(onChange).not.toHaveBeenCalled();
  });

  it("toggles expanded state via keyboard Enter", async () => {
    const onChange = vi.fn();
    render(
      <FlowAccordion title="Toggle via keyboard" onChange={onChange}>
        Content
      </FlowAccordion>,
    );
    const btn = screen.getByRole("button");
    btn.focus();
    await userEvent.keyboard("{Enter}");
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("toggles expanded state via keyboard Space", async () => {
    const onChange = vi.fn();
    render(
      <FlowAccordion title="Toggle via space" onChange={onChange}>
        Content
      </FlowAccordion>,
    );
    const btn = screen.getByRole("button");
    btn.focus();
    await userEvent.keyboard(" ");
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});

// ─────────────────────────────────────────────
// ARIA compliance
// ─────────────────────────────────────────────

describe("FlowAccordion — ARIA compliance", () => {
  it("header is a <button> element", () => {
    render(<FlowAccordion title="Header">Content</FlowAccordion>);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("aria-expanded=false when collapsed", () => {
    render(
      <FlowAccordion title="Collapsed" expanded={false} onChange={() => {}}>
        Content
      </FlowAccordion>,
    );
    expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "false");
  });

  it("aria-expanded=true when expanded", () => {
    render(
      <FlowAccordion title="Expanded" expanded onChange={() => {}}>
        Content
      </FlowAccordion>,
    );
    expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "true");
  });

  it("disabled accordion has aria-disabled or disabled attribute", () => {
    render(
      <FlowAccordion title="Disabled" disabled>
        Content
      </FlowAccordion>,
    );
    const btn = screen.getByRole("button");
    const isDisabled = btn.hasAttribute("disabled") || btn.getAttribute("aria-disabled") === "true";
    expect(isDisabled).toBe(true);
  });

  it("content panel has aria-labelledby referencing the header", () => {
    render(
      <FlowAccordion title="Labeled" defaultExpanded>
        Panel content
      </FlowAccordion>,
    );
    // The content region should have aria-labelledby
    const region = screen.getByRole("region");
    expect(region).toHaveAttribute("aria-labelledby");
    const labelledById = region.getAttribute("aria-labelledby")!;
    expect(document.getElementById(labelledById)).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// Size variants
// ─────────────────────────────────────────────

describe("FlowAccordion — size variants", () => {
  const sizes = ["sm", "md", "lg", "xl"] as const;

  it.each(sizes)("renders with size=%s without errors", (size) => {
    expect(() =>
      render(
        <FlowAccordion title={`Size ${size}`} size={size}>
          Content
        </FlowAccordion>,
      ),
    ).not.toThrow();
  });
});

// ─────────────────────────────────────────────
// Accessibility
// ─────────────────────────────────────────────

describe("FlowAccordion — accessibility", () => {
  it("has no axe violations", async () => {
    const { container } = render(<FlowAccordion title="FAQ">Content here</FlowAccordion>);
    expect(await axe(container)).toHaveNoViolations();
  });
});

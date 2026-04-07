/**
 * FLOW — FlowList / FlowListItem Component Tests
 * ────────────────────────────────────────────────
 * Tests rendering, composition, dividers, interaction, and accessibility.
 *
 * Requires: vitest + @testing-library/react + jsdom
 * Run: npx vitest run src/test/FlowList.test.tsx
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";

import { FlowList, FlowListItem } from "../app/components/display";

// ─────────────────────────────────────────────
// Rendering
// ─────────────────────────────────────────────

describe("FlowList — rendering", () => {
  it("renders as a <ul> element", () => {
    render(
      <FlowList aria-label="Items">
        <FlowListItem primary="Item 1" />
      </FlowList>,
    );
    expect(screen.getByRole("list")).toBeInTheDocument();
  });

  it("applies the flow-list class", () => {
    const { container } = render(
      <FlowList aria-label="Items">
        <FlowListItem primary="Item 1" />
      </FlowList>,
    );
    expect(container.querySelector(".flow-list")).toBeInTheDocument();
  });

  it("renders child FlowListItem elements as <li>", () => {
    render(
      <FlowList aria-label="Items">
        <FlowListItem primary="Item 1" />
        <FlowListItem primary="Item 2" />
      </FlowList>,
    );
    const items = screen.getAllByRole("listitem");
    expect(items.length).toBeGreaterThanOrEqual(2);
  });
});

// ─────────────────────────────────────────────
// FlowListItem content
// ─────────────────────────────────────────────

describe("FlowListItem — content", () => {
  it("renders primary text", () => {
    render(
      <FlowList aria-label="Items">
        <FlowListItem primary="Main text" />
      </FlowList>,
    );
    expect(screen.getByText("Main text")).toBeInTheDocument();
  });

  it("renders secondary text when provided", () => {
    render(
      <FlowList aria-label="Items">
        <FlowListItem primary="Main" secondary="Sub text" />
      </FlowList>,
    );
    expect(screen.getByText("Sub text")).toBeInTheDocument();
  });

  it("renders tertiary text when provided", () => {
    render(
      <FlowList aria-label="Items">
        <FlowListItem primary="Main" tertiary="Extra info" />
      </FlowList>,
    );
    expect(screen.getByText("Extra info")).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// Dividers
// ─────────────────────────────────────────────

describe("FlowList — dividers", () => {
  it("sets data-dividers when dividers prop is true", () => {
    const { container } = render(
      <FlowList aria-label="Items" dividers>
        <FlowListItem primary="Item 1" />
        <FlowListItem primary="Item 2" />
      </FlowList>,
    );
    expect(container.querySelector(".flow-list")).toHaveAttribute("data-dividers");
  });

  it("renders divider elements between items when dividers is true", () => {
    const { container } = render(
      <FlowList aria-label="Items" dividers>
        <FlowListItem primary="Item 1" />
        <FlowListItem primary="Item 2" />
      </FlowList>,
    );
    expect(container.querySelector(".flow-list-divider")).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// Interaction
// ─────────────────────────────────────────────

describe("FlowListItem — interaction", () => {
  it("fires onClick when an interactive item is clicked", async () => {
    const onClick = vi.fn();
    render(
      <FlowList aria-label="Items">
        <FlowListItem primary="Clickable" onClick={onClick} />
      </FlowList>,
    );
    await userEvent.click(screen.getByText("Clickable"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(
      <FlowList aria-label="Items">
        <FlowListItem primary="Disabled" onClick={onClick} disabled />
      </FlowList>,
    );
    await userEvent.click(screen.getByText("Disabled"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("sets role='option' on interactive items", () => {
    render(
      <FlowList aria-label="Items">
        <FlowListItem primary="Selectable" onClick={() => {}} />
      </FlowList>,
    );
    expect(screen.getByRole("option")).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// Accessibility
// ─────────────────────────────────────────────

describe("FlowListItem — accessibility", () => {
  it("sets aria-selected when selected", () => {
    render(
      <FlowList aria-label="Items">
        <FlowListItem primary="Selected" onClick={() => {}} selected />
      </FlowList>,
    );
    expect(screen.getByRole("option")).toHaveAttribute("aria-selected", "true");
  });

  it("sets aria-disabled when disabled", () => {
    render(
      <FlowList aria-label="Items">
        <FlowListItem primary="Disabled" onClick={() => {}} disabled />
      </FlowList>,
    );
    expect(screen.getByRole("option")).toHaveAttribute("aria-disabled", "true");
  });

  it("accepts aria-label on the list", () => {
    render(
      <FlowList aria-label="Navigation items">
        <FlowListItem primary="Home" />
      </FlowList>,
    );
    expect(screen.getByRole("list")).toHaveAttribute("aria-label", "Navigation items");
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <FlowList aria-label="Items">
        <FlowListItem primary="Item 1" />
      </FlowList>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

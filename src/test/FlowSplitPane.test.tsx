/**
 * FLOW — FlowSplitPane Component Tests
 * ──────────────────────────────────────
 * Tests rendering, two panels, resize handle, direction,
 * disabled state, and accessibility attributes.
 *
 * Requires: vitest + @testing-library/react + jsdom
 * Run: npx vitest run src/test/FlowSplitPane.test.tsx
 */
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { FlowSplitPane } from "../app/components/layout";

// ─────────────────────────────────────────────
// Rendering
// ─────────────────────────────────────────────

describe("FlowSplitPane — rendering", () => {
  it("renders the first panel content", () => {
    render(
      <FlowSplitPane first={<div>Left Panel</div>} second={<div>Right Panel</div>} />,
    );
    expect(screen.getByText("Left Panel")).toBeInTheDocument();
  });

  it("renders the second panel content", () => {
    render(
      <FlowSplitPane first={<div>Left Panel</div>} second={<div>Right Panel</div>} />,
    );
    expect(screen.getByText("Right Panel")).toBeInTheDocument();
  });

  it("renders a resize separator", () => {
    render(
      <FlowSplitPane first={<div>A</div>} second={<div>B</div>} />,
    );
    expect(screen.getByRole("separator")).toBeInTheDocument();
  });

  it("applies flow-split-pane class", () => {
    const { container } = render(
      <FlowSplitPane first={<div>A</div>} second={<div>B</div>} />,
    );
    expect(container.querySelector(".flow-split-pane")).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// States
// ─────────────────────────────────────────────

describe("FlowSplitPane — states", () => {
  it("defaults to horizontal direction (flex-direction: row)", () => {
    const { container } = render(
      <FlowSplitPane first={<div>A</div>} second={<div>B</div>} />,
    );
    const pane = container.querySelector(".flow-split-pane");
    expect(pane).toHaveStyle({ flexDirection: "row" });
  });

  it("uses vertical direction when direction='vertical'", () => {
    const { container } = render(
      <FlowSplitPane first={<div>A</div>} second={<div>B</div>} direction="vertical" />,
    );
    const pane = container.querySelector(".flow-split-pane");
    expect(pane).toHaveStyle({ flexDirection: "column" });
  });

  it("separator has aria-orientation='vertical' for horizontal split", () => {
    render(
      <FlowSplitPane first={<div>A</div>} second={<div>B</div>} direction="horizontal" />,
    );
    expect(screen.getByRole("separator")).toHaveAttribute("aria-orientation", "vertical");
  });

  it("separator has aria-orientation='horizontal' for vertical split", () => {
    render(
      <FlowSplitPane first={<div>A</div>} second={<div>B</div>} direction="vertical" />,
    );
    expect(screen.getByRole("separator")).toHaveAttribute("aria-orientation", "horizontal");
  });

  it("uses defaultSplit for initial sizing", () => {
    render(
      <FlowSplitPane first={<div>A</div>} second={<div>B</div>} defaultSplit={30} />,
    );
    const separator = screen.getByRole("separator");
    expect(separator).toHaveAttribute("aria-valuenow", "30");
  });

  it("sets aria-disabled on separator when disabled", () => {
    render(
      <FlowSplitPane first={<div>A</div>} second={<div>B</div>} disabled />,
    );
    expect(screen.getByRole("separator")).toHaveAttribute("aria-disabled", "true");
  });
});

// ─────────────────────────────────────────────
// Interaction
// ─────────────────────────────────────────────

describe("FlowSplitPane — interaction", () => {
  it("separator is keyboard focusable when not disabled", () => {
    render(
      <FlowSplitPane first={<div>A</div>} second={<div>B</div>} />,
    );
    const separator = screen.getByRole("separator");
    expect(separator).toHaveAttribute("tabindex", "0");
  });

  it("separator is not keyboard focusable when disabled", () => {
    render(
      <FlowSplitPane first={<div>A</div>} second={<div>B</div>} disabled />,
    );
    const separator = screen.getByRole("separator");
    expect(separator).toHaveAttribute("tabindex", "-1");
  });
});

// ─────────────────────────────────────────────
// Accessibility
// ─────────────────────────────────────────────

describe("FlowSplitPane — accessibility", () => {
  it("separator has role='separator'", () => {
    render(
      <FlowSplitPane first={<div>A</div>} second={<div>B</div>} />,
    );
    expect(screen.getByRole("separator")).toBeInTheDocument();
  });

  it("separator has aria-valuenow reflecting current split", () => {
    render(
      <FlowSplitPane first={<div>A</div>} second={<div>B</div>} defaultSplit={50} />,
    );
    const separator = screen.getByRole("separator");
    expect(separator).toHaveAttribute("aria-valuenow", "50");
  });

  it("separator has aria-valuemin and aria-valuemax", () => {
    render(
      <FlowSplitPane
        first={<div>A</div>}
        second={<div>B</div>}
        minFirst={20}
        minSecond={30}
      />,
    );
    const separator = screen.getByRole("separator");
    expect(separator).toHaveAttribute("aria-valuemin", "20");
    expect(separator).toHaveAttribute("aria-valuemax", "70");
  });
});

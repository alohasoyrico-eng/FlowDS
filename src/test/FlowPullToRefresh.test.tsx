/**
 * FLOW — FlowPullToRefresh Component Tests
 * ──────────────────────────────────────────────
 * Tests rendering, refreshing state, props, and accessibility.
 * Touch gesture tests are skipped (jsdom limitation).
 *
 * Requires: vitest + @testing-library/react + jsdom
 * Run: npx vitest run src/test/FlowPullToRefresh.test.tsx
 */
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";

import { FlowPullToRefresh } from "@flow/patterns";

// ─────────────────────────────────────────────
// Rendering
// ─────────────────────────────────────────────

describe("FlowPullToRefresh — rendering", () => {
  it("renders children content", () => {
    render(
      <FlowPullToRefresh refreshing={false} onRefresh={vi.fn()}>
        <p>Feed items</p>
      </FlowPullToRefresh>,
    );
    expect(screen.getByText("Feed items")).toBeInTheDocument();
  });

  it("wraps content in a region with role='log'", () => {
    render(
      <FlowPullToRefresh refreshing={false} onRefresh={vi.fn()}>
        <p>Content</p>
      </FlowPullToRefresh>,
    );
    expect(screen.getByRole("log")).toBeInTheDocument();
  });

  it("shows 'Pull to refresh' text by default", () => {
    render(
      <FlowPullToRefresh refreshing={false} onRefresh={vi.fn()}>
        <p>Content</p>
      </FlowPullToRefresh>,
    );
    expect(screen.getByText("Pull to refresh")).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// Refreshing state
// ─────────────────────────────────────────────

describe("FlowPullToRefresh — refreshing state", () => {
  it("shows 'Refreshing...' text when refreshing transitions to true", () => {
    const onRefresh = vi.fn();
    const { rerender } = render(
      <FlowPullToRefresh refreshing={false} onRefresh={onRefresh}>
        <p>Content</p>
      </FlowPullToRefresh>,
    );
    rerender(
      <FlowPullToRefresh refreshing={true} onRefresh={onRefresh}>
        <p>Content</p>
      </FlowPullToRefresh>,
    );
    expect(screen.getByText("Refreshing...")).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// Props
// ─────────────────────────────────────────────

describe("FlowPullToRefresh — props", () => {
  it("shows custom pullingText", () => {
    render(
      <FlowPullToRefresh refreshing={false} onRefresh={vi.fn()} pullingText="Swipe down">
        <p>Content</p>
      </FlowPullToRefresh>,
    );
    expect(screen.getByText("Swipe down")).toBeInTheDocument();
  });

  it("applies custom className to the container", () => {
    const { container } = render(
      <FlowPullToRefresh refreshing={false} onRefresh={vi.fn()} className="my-custom">
        <p>Content</p>
      </FlowPullToRefresh>,
    );
    expect(container.querySelector(".my-custom")).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// Accessibility
// ─────────────────────────────────────────────

describe("FlowPullToRefresh — accessibility", () => {
  it("content region has aria-live='polite'", () => {
    render(
      <FlowPullToRefresh refreshing={false} onRefresh={vi.fn()}>
        <p>Content</p>
      </FlowPullToRefresh>,
    );
    expect(screen.getByRole("log")).toHaveAttribute("aria-live", "polite");
  });

  it("has no axe violations with refreshing=false", async () => {
    const { container } = render(
      <FlowPullToRefresh refreshing={false} onRefresh={vi.fn()}>
        <p>Content</p>
      </FlowPullToRefresh>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

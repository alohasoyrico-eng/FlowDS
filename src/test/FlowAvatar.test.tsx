/**
 * FLOW — FlowAvatar Component Tests
 * ───────────────────────────────────
 * Tests rendering, accessibility, states, and fallback behavior.
 *
 * Requires: vitest + @testing-library/react + jsdom
 * Run: npx vitest run src/test/FlowAvatar.test.tsx
 */
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { FlowAvatar } from "../app/components/display";

// ─────────────────────────────────────────────
// Rendering
// ─────────────────────────────────────────────

describe("FlowAvatar — rendering", () => {
  it("renders with role='img'", () => {
    render(<FlowAvatar name="Jane Doe" />);
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  it("applies the flow-avatar class", () => {
    render(<FlowAvatar name="Jane Doe" />);
    expect(screen.getByRole("img")).toHaveClass("flow-avatar");
  });

  it("renders an <img> when src is provided", () => {
    const { container } = render(<FlowAvatar src="https://example.com/photo.jpg" alt="Jane" />);
    const img = container.querySelector(".flow-avatar-image");
    expect(img).toBeInTheDocument();
    expect(img?.tagName).toBe("IMG");
  });

  it("sets data-size='md' by default", () => {
    render(<FlowAvatar name="Jane Doe" />);
    expect(screen.getByRole("img")).toHaveAttribute("data-size", "md");
  });

  it("applies a custom size via prop", () => {
    render(<FlowAvatar name="Jane Doe" size="lg" />);
    expect(screen.getByRole("img")).toHaveAttribute("data-size", "lg");
  });
});

// ─────────────────────────────────────────────
// Initials fallback
// ─────────────────────────────────────────────

describe("FlowAvatar — initials fallback", () => {
  it("renders initials from the initials prop", () => {
    render(<FlowAvatar initials="JD" />);
    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  it("auto-computes initials from the name prop", () => {
    render(<FlowAvatar name="Jane Doe" />);
    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  it("truncates auto-computed initials to 2 characters", () => {
    render(<FlowAvatar name="Mary Jane Watson" />);
    expect(screen.getByText("MJ")).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// Status indicator
// ─────────────────────────────────────────────

describe("FlowAvatar — status indicator", () => {
  it("renders a status dot when status is provided", () => {
    const { container } = render(<FlowAvatar name="Jane" status="online" />);
    const dot = container.querySelector(".flow-avatar-status");
    expect(dot).toBeInTheDocument();
    expect(dot).toHaveAttribute("data-status", "online");
  });

  it("does not render a status dot when status is omitted", () => {
    const { container } = render(<FlowAvatar name="Jane" />);
    expect(container.querySelector(".flow-avatar-status")).not.toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// Accessibility
// ─────────────────────────────────────────────

describe("FlowAvatar — accessibility", () => {
  it("uses alt text as aria-label when provided", () => {
    const { container } = render(<FlowAvatar src="https://example.com/photo.jpg" alt="Jane Doe" />);
    const avatar = container.querySelector(".flow-avatar");
    expect(avatar).toHaveAttribute("aria-label", "Jane Doe");
  });

  it("falls back to initials as aria-label when no alt", () => {
    const { container } = render(<FlowAvatar name="Jane Doe" />);
    const avatar = container.querySelector(".flow-avatar");
    expect(avatar).toHaveAttribute("aria-label", "JD");
  });

  it("falls back to 'Avatar' when no alt, initials, or name", () => {
    const { container } = render(<FlowAvatar />);
    const avatar = container.querySelector(".flow-avatar");
    expect(avatar).toHaveAttribute("aria-label", "Avatar");
  });
});

// ─────────────────────────────────────────────
// Shape
// ─────────────────────────────────────────────

describe("FlowAvatar — shape", () => {
  it("does not set data-shape when shape is 'circle' (default)", () => {
    render(<FlowAvatar name="Jane" />);
    expect(screen.getByRole("img")).not.toHaveAttribute("data-shape");
  });

  it("sets data-shape='square' when shape='square'", () => {
    render(<FlowAvatar name="Jane" shape="square" />);
    expect(screen.getByRole("img")).toHaveAttribute("data-shape", "square");
  });
});

/**
 * FLOW — FlowAvatarGroup Component Tests
 * ────────────────────────────────────────
 * Tests rendering, overflow behavior, and child composition.
 *
 * Requires: vitest + @testing-library/react + jsdom
 * Run: npx vitest run src/test/FlowAvatarGroup.test.tsx
 */
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { FlowAvatar, FlowAvatarGroup } from "../app/components/display";

// ─────────────────────────────────────────────
// Rendering
// ─────────────────────────────────────────────

describe("FlowAvatarGroup — rendering", () => {
  it("renders a container with flow-avatar-group class", () => {
    const { container } = render(
      <FlowAvatarGroup>
        <FlowAvatar name="Alice" />
        <FlowAvatar name="Bob" />
      </FlowAvatarGroup>,
    );
    expect(container.querySelector(".flow-avatar-group")).toBeInTheDocument();
  });

  it("renders all child avatars when max is not set", () => {
    render(
      <FlowAvatarGroup>
        <FlowAvatar name="Alice" />
        <FlowAvatar name="Bob" />
        <FlowAvatar name="Charlie" />
      </FlowAvatarGroup>,
    );
    const avatars = screen.getAllByRole("img");
    expect(avatars).toHaveLength(3);
  });

  it("applies custom className", () => {
    const { container } = render(
      <FlowAvatarGroup className="custom">
        <FlowAvatar name="Alice" />
      </FlowAvatarGroup>,
    );
    expect(container.querySelector(".flow-avatar-group")).toHaveClass("custom");
  });
});

// ─────────────────────────────────────────────
// Overflow / max
// ─────────────────────────────────────────────

describe("FlowAvatarGroup — overflow", () => {
  it("shows only max avatars plus an overflow indicator when max is exceeded", () => {
    render(
      <FlowAvatarGroup max={2}>
        <FlowAvatar name="Alice" />
        <FlowAvatar name="Bob" />
        <FlowAvatar name="Charlie" />
        <FlowAvatar name="Diana" />
      </FlowAvatarGroup>,
    );
    // 2 visible + 1 overflow avatar = 3 total
    const avatars = screen.getAllByRole("img");
    expect(avatars).toHaveLength(3);
  });

  it("renders the overflow count as '+N' initials", () => {
    render(
      <FlowAvatarGroup max={1}>
        <FlowAvatar name="Alice" />
        <FlowAvatar name="Bob" />
        <FlowAvatar name="Charlie" />
      </FlowAvatarGroup>,
    );
    expect(screen.getByText("+2")).toBeInTheDocument();
  });

  it("does not show overflow indicator when children count is within max", () => {
    render(
      <FlowAvatarGroup max={5}>
        <FlowAvatar name="Alice" />
        <FlowAvatar name="Bob" />
      </FlowAvatarGroup>,
    );
    const avatars = screen.getAllByRole("img");
    expect(avatars).toHaveLength(2);
  });

  it("does not show overflow indicator when max equals children count", () => {
    render(
      <FlowAvatarGroup max={2}>
        <FlowAvatar name="Alice" />
        <FlowAvatar name="Bob" />
      </FlowAvatarGroup>,
    );
    const avatars = screen.getAllByRole("img");
    expect(avatars).toHaveLength(2);
  });
});

// ─────────────────────────────────────────────
// Size propagation
// ─────────────────────────────────────────────

describe("FlowAvatarGroup — size", () => {
  it("passes size to the overflow avatar", () => {
    render(
      <FlowAvatarGroup max={1} size="lg">
        <FlowAvatar name="Alice" />
        <FlowAvatar name="Bob" />
      </FlowAvatarGroup>,
    );
    // The overflow avatar should have data-size="lg"
    const avatars = screen.getAllByRole("img");
    const overflowAvatar = avatars.find((a) => a.textContent === "+1");
    expect(overflowAvatar).toHaveAttribute("data-size", "lg");
  });
});

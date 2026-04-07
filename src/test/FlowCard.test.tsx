/**
 * FLOW — FlowCard Component Tests
 * ───────────────────────────────────
 * Tests rendering, accessibility, states, and interaction behavior.
 *
 * Requires: vitest + @testing-library/react + jsdom
 * Run: npx vitest run src/test/FlowCard.test.tsx
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { FlowCard } from "../app/components/display";

// ─────────────────────────────────────────────
// Rendering
// ─────────────────────────────────────────────

describe("FlowCard — rendering", () => {
  it("renders children content", () => {
    render(<FlowCard>Card body</FlowCard>);
    expect(screen.getByText("Card body")).toBeInTheDocument();
  });

  it("does not set role='button' when non-interactive", () => {
    render(<FlowCard>Static card</FlowCard>);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("renders as a native button when interactive", () => {
    render(<FlowCard interactive>Clickable card</FlowCard>);
    const card = screen.getByRole("button");
    expect(card).toBeInTheDocument();
    expect(card.tagName).toBe("BUTTON");
  });

  it("sets role='button' when onClick is provided (implicitly interactive)", () => {
    render(<FlowCard onClick={() => {}}>Clickable</FlowCard>);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("passes aria-label through to the element", () => {
    render(
      <FlowCard interactive aria-label="Project settings card">
        Content
      </FlowCard>,
    );
    expect(screen.getByRole("button")).toHaveAttribute("aria-label", "Project settings card");
  });
});

// ─────────────────────────────────────────────
// Selected state
// ─────────────────────────────────────────────

describe("FlowCard — selected state", () => {
  it("applies aria-pressed='true' when selected", () => {
    render(
      <FlowCard interactive selected>
        Selected card
      </FlowCard>,
    );
    const card = screen.getByRole("button");
    expect(card).toHaveAttribute("aria-pressed", "true");
  });
});

// ─────────────────────────────────────────────
// Interaction
// ─────────────────────────────────────────────

describe("FlowCard — interaction", () => {
  it("fires onClick when clicked", async () => {
    const onClick = vi.fn();
    render(<FlowCard onClick={onClick}>Click me</FlowCard>);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("fires onClick when activated by Enter key", async () => {
    const onClick = vi.fn();
    render(<FlowCard onClick={onClick}>Press enter</FlowCard>);
    const card = screen.getByRole("button");
    card.focus();
    await userEvent.keyboard("{Enter}");
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("fires onClick when activated by Space key", async () => {
    const onClick = vi.fn();
    render(<FlowCard onClick={onClick}>Press space</FlowCard>);
    const card = screen.getByRole("button");
    card.focus();
    await userEvent.keyboard(" ");
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

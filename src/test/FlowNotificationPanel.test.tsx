/**
 * FLOW — FlowNotificationPanel Component Tests
 * ──────────────────────────────────────────────
 * Tests rendering, interaction, states, and accessibility.
 *
 * Requires: vitest + @testing-library/react + jsdom
 * Run: npx vitest run src/test/FlowNotificationPanel.test.tsx
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";

import { FlowNotificationPanel } from "../app/components/patterns";
import type { NotificationItem } from "../app/components/patterns";

const notifications: NotificationItem[] = [
  { id: "1", title: "New message", message: "You have a new message", timestamp: "2m ago", read: false, variant: "info" as const },
  { id: "2", title: "Upload complete", timestamp: "1h ago", read: true, variant: "success" as const },
];

// ─────────────────────────────────────────────
// Rendering
// ─────────────────────────────────────────────

describe("FlowNotificationPanel — rendering", () => {
  it("renders with role='region'", () => {
    render(<FlowNotificationPanel notifications={notifications} />);
    expect(screen.getByRole("region")).toBeInTheDocument();
  });

  it("renders the default title", () => {
    render(<FlowNotificationPanel notifications={notifications} />);
    expect(screen.getByText("Notifications")).toBeInTheDocument();
  });

  it("renders notification titles", () => {
    render(<FlowNotificationPanel notifications={notifications} />);
    expect(screen.getByText("New message")).toBeInTheDocument();
    expect(screen.getByText("Upload complete")).toBeInTheDocument();
  });

  it("renders timestamps", () => {
    render(<FlowNotificationPanel notifications={notifications} />);
    expect(screen.getByText("2m ago")).toBeInTheDocument();
    expect(screen.getByText("1h ago")).toBeInTheDocument();
  });

  it("shows empty message when no notifications are provided", () => {
    render(<FlowNotificationPanel notifications={[]} />);
    expect(screen.getByText("No new notifications")).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// Interaction
// ─────────────────────────────────────────────

describe("FlowNotificationPanel — interaction", () => {
  it("calls onMarkRead when an unread notification is clicked", async () => {
    const user = userEvent.setup();
    const onMarkRead = vi.fn();
    render(
      <FlowNotificationPanel notifications={notifications} onMarkRead={onMarkRead} />,
    );
    await user.click(screen.getByText("New message"));
    expect(onMarkRead).toHaveBeenCalledWith("1");
  });

  it("calls onMarkAllRead when Mark all read button is clicked", async () => {
    const user = userEvent.setup();
    const onMarkAllRead = vi.fn();
    render(
      <FlowNotificationPanel notifications={notifications} onMarkAllRead={onMarkAllRead} />,
    );
    await user.click(screen.getByText("Mark all read"));
    expect(onMarkAllRead).toHaveBeenCalledTimes(1);
  });

  it("calls onDismiss when a dismiss button is clicked", async () => {
    const user = userEvent.setup();
    const onDismiss = vi.fn();
    render(
      <FlowNotificationPanel notifications={notifications} onDismiss={onDismiss} />,
    );
    const dismissBtns = screen.getAllByLabelText(/Dismiss/);
    await user.click(dismissBtns[0]);
    expect(onDismiss).toHaveBeenCalledWith("1");
  });
});

// ─────────────────────────────────────────────
// States
// ─────────────────────────────────────────────

describe("FlowNotificationPanel — states", () => {
  it("error prop sets data-state='error'", () => {
    render(<FlowNotificationPanel notifications={notifications} error />);
    expect(screen.getByRole("region")).toHaveAttribute("data-state", "error");
  });
});

// ─────────────────────────────────────────────
// Accessibility
// ─────────────────────────────────────────────

describe("FlowNotificationPanel — accessibility", () => {
  it("aria-label matches the title prop", () => {
    render(<FlowNotificationPanel notifications={notifications} title="Alerts" />);
    expect(screen.getByRole("region")).toHaveAttribute("aria-label", "Alerts");
  });

  it("notification list has role='list'", () => {
    render(<FlowNotificationPanel notifications={notifications} />);
    expect(screen.getByRole("list")).toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <FlowNotificationPanel notifications={notifications} />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

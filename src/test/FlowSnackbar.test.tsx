/**
 * FLOW — FlowSnackbar Component Tests
 * ──────────────────────────────────────────────
 * Tests the FlowSnackbarProvider + useSnackbar pattern.
 * The snackbar uses a Provider/Context approach with imperative `show()`.
 *
 * Requires: vitest + @testing-library/react + jsdom
 * Run: npx vitest run src/test/FlowSnackbar.test.tsx
 */
import { act, fireEvent, render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { afterEach, describe, expect, it, vi } from "vitest";

import { FlowSnackbarProvider, useSnackbar } from "../app/components/patterns";

// Stub IntersectionObserver for GrowthObserver used inside FlowSnackbarItem
const IntersectionObserverMock = vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  unobserve: vi.fn(),
  takeRecords: vi.fn(() => []),
}));
vi.stubGlobal("IntersectionObserver", IntersectionObserverMock);

/** Test harness that exposes `show()` via a button */
function SnackbarHarness({ message = "Test notification", variant = "info" as const, duration = 5000, actionLabel, actionFn }: {
  message?: string;
  variant?: "info" | "success" | "warning" | "error";
  duration?: number;
  actionLabel?: string;
  actionFn?: () => void;
}) {
  const { show } = useSnackbar();
  return (
    <button
      onClick={() =>
        show({
          message,
          variant,
          duration,
          action: actionLabel && actionFn ? { label: actionLabel, onClick: actionFn } : undefined,
        })
      }
    >
      Show snackbar
    </button>
  );
}

// ─────────────────────────────────────────────
// Rendering
// ─────────────────────────────────────────────

describe("FlowSnackbar — rendering", () => {
  it("renders children of the provider", () => {
    render(
      <FlowSnackbarProvider>
        <p>App content</p>
      </FlowSnackbarProvider>,
    );
    expect(screen.getByText("App content")).toBeInTheDocument();
  });

  it("renders a snackbar container with aria-live", () => {
    const { container } = render(
      <FlowSnackbarProvider>
        <p>App</p>
      </FlowSnackbarProvider>,
    );
    const liveRegion = container.querySelector("[aria-live='polite']");
    expect(liveRegion).toBeInTheDocument();
  });

  it("does not show any snackbar items initially", () => {
    render(
      <FlowSnackbarProvider>
        <p>App</p>
      </FlowSnackbarProvider>,
    );
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// Interaction
// ─────────────────────────────────────────────

describe("FlowSnackbar — interaction", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("shows a snackbar message when show() is called", () => {
    vi.useFakeTimers();
    render(
      <FlowSnackbarProvider>
        <SnackbarHarness message="File saved" />
      </FlowSnackbarProvider>,
    );
    fireEvent.click(screen.getByText("Show snackbar"));
    expect(screen.getByText("File saved")).toBeInTheDocument();
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("renders a dismiss button on the snackbar", () => {
    vi.useFakeTimers();
    render(
      <FlowSnackbarProvider>
        <SnackbarHarness message="Saved" />
      </FlowSnackbarProvider>,
    );
    fireEvent.click(screen.getByText("Show snackbar"));
    expect(screen.getByLabelText("Dismiss")).toBeInTheDocument();
  });

  it("dismisses the snackbar when the close button is clicked", () => {
    vi.useFakeTimers();
    render(
      <FlowSnackbarProvider>
        <SnackbarHarness message="Removed" />
      </FlowSnackbarProvider>,
    );
    fireEvent.click(screen.getByText("Show snackbar"));
    expect(screen.getByText("Removed")).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText("Dismiss"));
    // The dismiss triggers a 200ms exit animation
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(screen.queryByText("Removed")).not.toBeInTheDocument();
  });

  it("auto-dismisses after duration", () => {
    vi.useFakeTimers();
    render(
      <FlowSnackbarProvider>
        <SnackbarHarness message="Auto dismiss" duration={5000} />
      </FlowSnackbarProvider>,
    );
    fireEvent.click(screen.getByText("Show snackbar"));
    expect(screen.getByText("Auto dismiss")).toBeInTheDocument();

    // duration is 5000ms + 200ms exit animation
    act(() => {
      vi.advanceTimersByTime(5300);
    });
    expect(screen.queryByText("Auto dismiss")).not.toBeInTheDocument();
  });

  it("renders an action button when provided", () => {
    vi.useFakeTimers();
    const actionFn = vi.fn();
    render(
      <FlowSnackbarProvider>
        <SnackbarHarness message="Undo?" actionLabel="Undo" actionFn={actionFn} />
      </FlowSnackbarProvider>,
    );
    fireEvent.click(screen.getByText("Show snackbar"));
    expect(screen.getByText("Undo")).toBeInTheDocument();
  });

  it("calls the action handler and dismisses when action is clicked", () => {
    vi.useFakeTimers();
    const actionFn = vi.fn();
    render(
      <FlowSnackbarProvider>
        <SnackbarHarness message="Deleted" actionLabel="Undo" actionFn={actionFn} />
      </FlowSnackbarProvider>,
    );
    fireEvent.click(screen.getByText("Show snackbar"));
    fireEvent.click(screen.getByText("Undo"));
    expect(actionFn).toHaveBeenCalledTimes(1);

    // Wait for exit animation
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(screen.queryByText("Deleted")).not.toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// Accessibility
// ─────────────────────────────────────────────

describe("FlowSnackbar — accessibility", () => {
  it("has no axe violations", async () => {
    const { container } = render(
      <FlowSnackbarProvider>
        <p>App content</p>
      </FlowSnackbarProvider>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

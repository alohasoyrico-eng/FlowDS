/**
 * FLOW — FlowColumnConfigurator Component Tests
 * ──────────────────────────────────
 * Tests rendering, interaction, and accessibility.
 *
 * Requires: vitest + @testing-library/react + jsdom
 * Run: npx vitest run src/test/FlowColumnConfigurator.test.tsx
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";

import { FlowColumnConfigurator } from "@flow/patterns";

const sampleColumns = [
  { key: "name", label: "Name", visible: true },
  { key: "email", label: "Email", visible: true },
  { key: "role", label: "Role", visible: false },
];

// ─────────────────────────────────────────────
// Rendering
// ─────────────────────────────────────────────

describe("FlowColumnConfigurator — rendering", () => {
  it("renders the configure columns trigger button", () => {
    render(<FlowColumnConfigurator columns={sampleColumns} onColumnsChange={vi.fn()} />);
    expect(screen.getByRole("button", { name: "Configure columns" })).toBeInTheDocument();
  });

  it("does not show the column list when closed", () => {
    render(<FlowColumnConfigurator columns={sampleColumns} onColumnsChange={vi.fn()} />);
    expect(screen.queryByText("Name")).not.toBeInTheDocument();
    expect(screen.queryByText("Email")).not.toBeInTheDocument();
  });

  it("shows the column list when the trigger is clicked", async () => {
    render(<FlowColumnConfigurator columns={sampleColumns} onColumnsChange={vi.fn()} />);
    await userEvent.click(screen.getByRole("button", { name: "Configure columns" }));
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Role")).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// Interaction
// ─────────────────────────────────────────────

describe("FlowColumnConfigurator — interaction", () => {
  it("sets aria-expanded on the trigger button", async () => {
    render(<FlowColumnConfigurator columns={sampleColumns} onColumnsChange={vi.fn()} />);
    const trigger = screen.getByRole("button", { name: "Configure columns" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    await userEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });

  it("calls onColumnsChange when toggling column visibility", async () => {
    const onColumnsChange = vi.fn();
    render(<FlowColumnConfigurator columns={sampleColumns} onColumnsChange={onColumnsChange} />);
    await userEvent.click(screen.getByRole("button", { name: "Configure columns" }));

    // Click the checkbox for "Role" (visible: false -> true)
    const checkboxes = screen.getAllByRole("checkbox");
    await userEvent.click(checkboxes[2]);

    expect(onColumnsChange).toHaveBeenCalledTimes(1);
    const result = onColumnsChange.mock.calls[0][0];
    expect(result[2]).toEqual({ key: "role", label: "Role", visible: true });
  });

  it("calls onColumnsChange when moving a column up", async () => {
    const onColumnsChange = vi.fn();
    render(<FlowColumnConfigurator columns={sampleColumns} onColumnsChange={onColumnsChange} />);
    await userEvent.click(screen.getByRole("button", { name: "Configure columns" }));

    const moveUpBtn = screen.getByRole("button", { name: "Move Email up" });
    await userEvent.click(moveUpBtn);

    expect(onColumnsChange).toHaveBeenCalledTimes(1);
    const result = onColumnsChange.mock.calls[0][0];
    expect(result[0].key).toBe("email");
    expect(result[1].key).toBe("name");
  });

  it("calls onColumnsChange when moving a column down", async () => {
    const onColumnsChange = vi.fn();
    render(<FlowColumnConfigurator columns={sampleColumns} onColumnsChange={onColumnsChange} />);
    await userEvent.click(screen.getByRole("button", { name: "Configure columns" }));

    const moveDownBtn = screen.getByRole("button", { name: "Move Name down" });
    await userEvent.click(moveDownBtn);

    expect(onColumnsChange).toHaveBeenCalledTimes(1);
    const result = onColumnsChange.mock.calls[0][0];
    expect(result[0].key).toBe("email");
    expect(result[1].key).toBe("name");
  });
});

// ─────────────────────────────────────────────
// Accessibility
// ─────────────────────────────────────────────

describe("FlowColumnConfigurator — accessibility", () => {
  it("has no axe violations", async () => {
    const { container } = render(
      <FlowColumnConfigurator columns={sampleColumns} onColumnsChange={vi.fn()} />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

/**
 * FLOW — FlowSelect Component Tests
 * ───────────────────────────────────
 * Tests rendering, dropdown behavior, selection, keyboard interaction,
 * and accessibility attributes.
 *
 * Requires: vitest + @testing-library/react + jsdom
 * Run: npx vitest run src/test/FlowSelect.test.tsx
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";

import { FlowSelect } from "@flow/components";

// jsdom does not implement scrollIntoView — stub it to prevent runtime errors
Element.prototype.scrollIntoView = vi.fn();

const sampleOptions = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
];

// ─────────────────────────────────────────────
// Rendering
// ─────────────────────────────────────────────

describe("FlowSelect — rendering", () => {
  it("renders a combobox trigger", () => {
    render(<FlowSelect label="Fruit" options={sampleOptions} />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("shows the default placeholder when no value is selected", () => {
    render(<FlowSelect label="Fruit" options={sampleOptions} />);
    expect(screen.getByText("Select an option")).toBeInTheDocument();
  });

  it("shows a custom placeholder when provided", () => {
    render(<FlowSelect label="Fruit" options={sampleOptions} placeholder="Pick a fruit" />);
    expect(screen.getByText("Pick a fruit")).toBeInTheDocument();
  });

  it("shows the selected option label when value is set", () => {
    render(<FlowSelect label="Fruit" options={sampleOptions} value="banana" onChange={vi.fn()} />);
    expect(screen.getByText("Banana")).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// Dropdown open/close
// ─────────────────────────────────────────────

describe("FlowSelect — dropdown behavior", () => {
  it("opens the dropdown listbox on click", async () => {
    render(<FlowSelect label="Fruit" options={sampleOptions} />);
    await userEvent.click(screen.getByRole("combobox"));
    expect(screen.getByRole("listbox")).toBeInTheDocument();
  });

  it("sets aria-expanded='true' when open", async () => {
    render(<FlowSelect label="Fruit" options={sampleOptions} />);
    const trigger = screen.getByRole("combobox");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    await userEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });

  it("closes the dropdown when Escape is pressed", async () => {
    render(<FlowSelect label="Fruit" options={sampleOptions} />);
    const trigger = screen.getByRole("combobox");
    await userEvent.click(trigger);
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    await userEvent.keyboard("{Escape}");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// Selection
// ─────────────────────────────────────────────

describe("FlowSelect — selection", () => {
  it("calls onChange with the selected value when an option is clicked", async () => {
    const onChange = vi.fn();
    render(<FlowSelect label="Fruit" options={sampleOptions} onChange={onChange} />);
    await userEvent.click(screen.getByRole("combobox"));
    await userEvent.click(screen.getByText("Cherry"));
    expect(onChange).toHaveBeenCalledWith(
      "cherry",
      expect.objectContaining({ value: "cherry", label: "Cherry" }),
    );
  });

  it("closes the dropdown after selecting an option", async () => {
    render(<FlowSelect label="Fruit" options={sampleOptions} />);
    await userEvent.click(screen.getByRole("combobox"));
    await userEvent.click(screen.getByText("Apple"));
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// Disabled state
// ─────────────────────────────────────────────

describe("FlowSelect — disabled state", () => {
  it("disables the trigger button when disabled=true", () => {
    render(<FlowSelect label="Fruit" options={sampleOptions} disabled />);
    expect(screen.getByRole("combobox")).toBeDisabled();
  });

  it("does not open the dropdown when disabled", async () => {
    render(<FlowSelect label="Fruit" options={sampleOptions} disabled />);
    await userEvent.click(screen.getByRole("combobox"));
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// ARIA & accessibility
// ─────────────────────────────────────────────

describe("FlowSelect — accessibility", () => {
  it("has aria-haspopup='listbox' on the trigger", () => {
    render(<FlowSelect label="Fruit" options={sampleOptions} />);
    expect(screen.getByRole("combobox")).toHaveAttribute("aria-haspopup", "listbox");
  });

  it("options have role='option'", async () => {
    render(<FlowSelect label="Fruit" options={sampleOptions} />);
    await userEvent.click(screen.getByRole("combobox"));
    const opts = screen.getAllByRole("option");
    expect(opts).toHaveLength(3);
  });

  it("has no axe violations", async () => {
    const { container } = render(<FlowSelect label="Fruit" options={sampleOptions} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

/**
 * FLOW — FlowMultiSelect Component Tests
 * ───────────────────────────────────────
 * Tests rendering, dropdown behavior, multi-selection, chip display,
 * onSelect callback, disabled state, and accessibility attributes.
 *
 * Requires: vitest + @testing-library/react + jsdom
 * Run: npx vitest run src/test/FlowMultiSelect.test.tsx
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";

import { FlowMultiSelect } from "../app/components/patterns";

// jsdom does not implement scrollIntoView — stub it to prevent runtime errors
Element.prototype.scrollIntoView = vi.fn();

const sampleOptions = [
  { value: "red", label: "Red" },
  { value: "green", label: "Green" },
  { value: "blue", label: "Blue" },
  { value: "yellow", label: "Yellow" },
];

// ─────────────────────────────────────────────
// Rendering
// ─────────────────────────────────────────────

describe("FlowMultiSelect — rendering", () => {
  it("renders a combobox trigger", () => {
    render(<FlowMultiSelect label="Colors" options={sampleOptions} />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("shows the default placeholder when nothing is selected", () => {
    render(<FlowMultiSelect label="Colors" options={sampleOptions} />);
    expect(screen.getByText("Select options...")).toBeInTheDocument();
  });

  it("renders the label", () => {
    render(<FlowMultiSelect label="Colors" options={sampleOptions} />);
    expect(screen.getByText("Colors")).toBeInTheDocument();
  });

  it("displays chips for selected values", () => {
    render(
      <FlowMultiSelect label="Colors" options={sampleOptions} value={["red", "blue"]} onChange={vi.fn()} />,
    );
    expect(screen.getByText("Red")).toBeInTheDocument();
    expect(screen.getByText("Blue")).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// Interaction
// ─────────────────────────────────────────────

describe("FlowMultiSelect — interaction", () => {
  it("opens the dropdown listbox on click", async () => {
    render(<FlowMultiSelect label="Colors" options={sampleOptions} />);
    await userEvent.click(screen.getByRole("combobox"));
    expect(screen.getByRole("listbox")).toBeInTheDocument();
  });

  it("displays all options in the dropdown", async () => {
    render(<FlowMultiSelect label="Colors" options={sampleOptions} />);
    await userEvent.click(screen.getByRole("combobox"));
    const opts = screen.getAllByRole("option");
    expect(opts).toHaveLength(4);
  });

  it("calls onChange when an option is clicked", async () => {
    const onChange = vi.fn();
    render(<FlowMultiSelect label="Colors" options={sampleOptions} onChange={onChange} />);
    await userEvent.click(screen.getByRole("combobox"));
    await userEvent.click(screen.getByText("Green"));
    expect(onChange).toHaveBeenCalledWith(
      ["green"],
      expect.arrayContaining([expect.objectContaining({ value: "green" })]),
    );
  });

  it("shows selected count in the footer", async () => {
    render(
      <FlowMultiSelect label="Colors" options={sampleOptions} value={["red", "green"]} onChange={vi.fn()} />,
    );
    await userEvent.click(screen.getByRole("combobox"));
    expect(screen.getByText("2 of 4 selected")).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// Accessibility
// ─────────────────────────────────────────────

describe("FlowMultiSelect — accessibility", () => {
  it("has aria-expanded on the combobox", async () => {
    render(<FlowMultiSelect label="Colors" options={sampleOptions} />);
    const trigger = screen.getByRole("combobox");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    await userEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });

  it("listbox has aria-multiselectable='true'", async () => {
    render(<FlowMultiSelect label="Colors" options={sampleOptions} />);
    await userEvent.click(screen.getByRole("combobox"));
    expect(screen.getByRole("listbox")).toHaveAttribute("aria-multiselectable", "true");
  });

  it("renders with disabled trigger when disabled is true", () => {
    render(<FlowMultiSelect label="Colors" options={sampleOptions} disabled />);
    expect(screen.getByRole("combobox")).toHaveAttribute("tabindex", "-1");
  });

  it("options have aria-selected reflecting selection state", async () => {
    render(
      <FlowMultiSelect label="Colors" options={sampleOptions} value={["red"]} onChange={vi.fn()} />,
    );
    await userEvent.click(screen.getByRole("combobox"));
    const opts = screen.getAllByRole("option");
    const redOpt = opts.find((o) => o.textContent?.includes("Red"));
    expect(redOpt).toHaveAttribute("aria-selected", "true");
  });

  it("has no axe violations", async () => {
    const { container } = render(<FlowMultiSelect label="Colors" options={sampleOptions} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

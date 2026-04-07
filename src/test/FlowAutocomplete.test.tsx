/**
 * FLOW — FlowAutocomplete Component Tests
 * ─────────────────────────────────────────
 * Tests rendering, suggestion filtering, selection, keyboard navigation,
 * and accessibility attributes for the combobox pattern.
 *
 * Requires: vitest + @testing-library/react + jsdom
 * Run: npx vitest run src/test/FlowAutocomplete.test.tsx
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";

import { FlowAutocomplete } from "../app/components/patterns";

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

describe("FlowAutocomplete — rendering", () => {
  it("renders a combobox input", () => {
    render(<FlowAutocomplete options={sampleOptions} aria-label="Fruit" />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("shows the placeholder text", () => {
    render(<FlowAutocomplete options={sampleOptions} placeholder="Search fruits" aria-label="Fruit" />);
    expect(screen.getByPlaceholderText("Search fruits")).toBeInTheDocument();
  });

  it("renders a label when provided", () => {
    render(<FlowAutocomplete options={sampleOptions} label="Fruit" />);
    expect(screen.getByText("Fruit")).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// Interaction
// ─────────────────────────────────────────────

describe("FlowAutocomplete — interaction", () => {
  it("opens suggestions on focus", async () => {
    render(<FlowAutocomplete options={sampleOptions} aria-label="Fruit" />);
    await userEvent.click(screen.getByRole("combobox"));
    expect(screen.getByRole("listbox")).toBeInTheDocument();
  });

  it("filters suggestions when typing", async () => {
    render(<FlowAutocomplete options={sampleOptions} aria-label="Fruit" />);
    await userEvent.type(screen.getByRole("combobox"), "ban");
    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(1);
    expect(options[0].textContent).toContain("Banana");
  });

  it("selects an option on click and calls onChange", async () => {
    const onChange = vi.fn();
    render(<FlowAutocomplete options={sampleOptions} onChange={onChange} aria-label="Fruit" />);
    await userEvent.click(screen.getByRole("combobox"));
    await userEvent.click(screen.getByText("Cherry"));
    expect(onChange).toHaveBeenCalledWith("cherry");
  });

  it("shows the clear button when input has text and clears on click", async () => {
    const onChange = vi.fn();
    render(<FlowAutocomplete options={sampleOptions} onChange={onChange} aria-label="Fruit" />);
    await userEvent.click(screen.getByRole("combobox"));
    await userEvent.click(screen.getByText("Apple"));
    const clearBtn = screen.getByLabelText("Clear");
    await userEvent.click(clearBtn);
    expect(onChange).toHaveBeenLastCalledWith("");
  });

  it("shows empty text when no options match", async () => {
    render(<FlowAutocomplete options={sampleOptions} emptyText="Nothing here" aria-label="Fruit" />);
    await userEvent.type(screen.getByRole("combobox"), "zzz");
    expect(screen.getByText("Nothing here")).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// Accessibility
// ─────────────────────────────────────────────

describe("FlowAutocomplete — accessibility", () => {
  it("has aria-expanded attribute on the combobox", async () => {
    render(<FlowAutocomplete options={sampleOptions} aria-label="Fruit" />);
    const input = screen.getByRole("combobox");
    expect(input).toHaveAttribute("aria-expanded", "false");
    await userEvent.click(input);
    expect(input).toHaveAttribute("aria-expanded", "true");
  });

  it("has aria-autocomplete='list' on the input", () => {
    render(<FlowAutocomplete options={sampleOptions} aria-label="Fruit" />);
    expect(screen.getByRole("combobox")).toHaveAttribute("aria-autocomplete", "list");
  });

  it("disables the input when disabled is true", () => {
    render(<FlowAutocomplete options={sampleOptions} disabled aria-label="Fruit" />);
    expect(screen.getByRole("combobox")).toBeDisabled();
  });

  it("options have role='option' with aria-selected", async () => {
    render(<FlowAutocomplete options={sampleOptions} value="banana" aria-label="Fruit" />);
    await userEvent.click(screen.getByRole("combobox"));
    const opts = screen.getAllByRole("option");
    expect(opts.length).toBeGreaterThan(0);
    const bananaOpt = opts.find((o) => o.textContent?.includes("Banana"));
    expect(bananaOpt).toHaveAttribute("aria-selected", "true");
  });

  it("has no axe violations", async () => {
    const { container } = render(<FlowAutocomplete options={sampleOptions} aria-label="Fruit" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

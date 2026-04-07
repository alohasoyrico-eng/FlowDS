/**
 * FLOW — FlowCountrySelect Component Tests
 * ──────────────────────────────────────────────
 * Tests rendering, interaction, and accessibility.
 *
 * Requires: vitest + @testing-library/react + jsdom
 * Run: npx vitest run src/test/FlowCountrySelect.test.tsx
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";

import { FlowCountrySelect } from "../app/components/selection";

// jsdom does not implement scrollIntoView — stub it to prevent runtime errors
Element.prototype.scrollIntoView = vi.fn();

// ─────────────────────────────────────────────
// Rendering
// ─────────────────────────────────────────────

describe("FlowCountrySelect — rendering", () => {
  it("renders a text input field", () => {
    render(<FlowCountrySelect label="Country" />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("renders the label text", () => {
    render(<FlowCountrySelect label="Country" />);
    expect(screen.getByText("Country")).toBeInTheDocument();
  });

  it("displays the default country name (France) when no value is provided", () => {
    render(<FlowCountrySelect label="Country" />);
    expect(screen.getByRole("textbox")).toHaveValue("France");
  });

  it("shows hint text when hint prop is provided", () => {
    render(<FlowCountrySelect label="Country" hint="Select your home country" />);
    expect(screen.getByText("Select your home country")).toBeInTheDocument();
  });

  it("shows error message with alert role when error prop is set", () => {
    render(<FlowCountrySelect label="Country" error="Required field" />);
    expect(screen.getByText("Required field")).toBeInTheDocument();
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("disables the input when disabled prop is true", () => {
    render(<FlowCountrySelect label="Country" disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });
});

// ─────────────────────────────────────────────
// Interaction
// ─────────────────────────────────────────────

describe("FlowCountrySelect — interaction", () => {
  it("opens the dropdown panel on input focus", async () => {
    render(<FlowCountrySelect label="Country" />);
    const input = screen.getByRole("textbox");
    await userEvent.click(input);
    // When dropdown opens, a list of countries appears
    expect(screen.getByRole("listbox", { name: /select country/i })).toBeInTheDocument();
  });

  it("filters countries when the user types in the input", async () => {
    render(<FlowCountrySelect label="Country" />);
    const input = screen.getByRole("textbox");
    await userEvent.click(input);
    const allOptions = screen.getAllByRole("option");
    const totalBefore = allOptions.length;
    await userEvent.clear(input);
    await userEvent.type(input, "Ger");
    // Filtered list should be shorter than the full list
    const filtered = screen.getAllByRole("option");
    expect(filtered.length).toBeLessThan(totalBefore);
  });

  it("appends required marker when required prop is true", () => {
    render(<FlowCountrySelect label="Country" required />);
    expect(screen.getByText(/Country \*/)).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// Accessibility
// ─────────────────────────────────────────────

describe("FlowCountrySelect — accessibility", () => {
  it("sets aria-invalid when error is present", () => {
    render(<FlowCountrySelect label="Country" error="Required" />);
    expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
  });

  it("sets aria-required when required prop is true", () => {
    render(<FlowCountrySelect label="Country" required />);
    expect(screen.getByRole("textbox")).toHaveAttribute("aria-required", "true");
  });

  it("has no axe violations", async () => {
    const { container } = render(<FlowCountrySelect label="Country" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

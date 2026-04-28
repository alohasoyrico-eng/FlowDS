/**
 * FLOW — FlowRichTextEditor Component Tests
 * ──────────────────────────────────────────────
 * Tests rendering, interaction, and accessibility.
 * execCommand tests are skipped (jsdom limitation).
 *
 * Requires: vitest + @testing-library/react + jsdom
 * Run: npx vitest run src/test/FlowRichTextEditor.test.tsx
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { beforeAll, describe, expect, it, vi } from "vitest";

import { FlowRichTextEditor } from "@flow/patterns";

// Polyfill document.execCommand for jsdom (not implemented natively)
beforeAll(() => {
  document.execCommand = vi.fn(() => true);
});

// ─────────────────────────────────────────────
// Rendering
// ─────────────────────────────────────────────

describe("FlowRichTextEditor — rendering", () => {
  it("renders a toolbar with formatting buttons", () => {
    render(<FlowRichTextEditor />);
    expect(screen.getByRole("toolbar", { name: "Formatting" })).toBeInTheDocument();
  });

  it("renders Bold, Italic, Underline buttons in the toolbar", () => {
    render(<FlowRichTextEditor />);
    expect(screen.getByRole("button", { name: "Bold" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Italic" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Underline" })).toBeInTheDocument();
  });

  it("renders list formatting buttons", () => {
    render(<FlowRichTextEditor />);
    expect(screen.getByRole("button", { name: "Bullet list" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Numbered list" })).toBeInTheDocument();
  });

  it("renders heading buttons", () => {
    render(<FlowRichTextEditor />);
    expect(screen.getByRole("button", { name: "Heading 1" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Heading 2" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Heading 3" })).toBeInTheDocument();
  });

  it("renders a contentEditable textbox area", () => {
    render(<FlowRichTextEditor />);
    const textbox = screen.getByRole("textbox");
    expect(textbox).toBeInTheDocument();
    expect(textbox).toHaveAttribute("contenteditable", "true");
    expect(textbox).toHaveAttribute("aria-multiline", "true");
  });

  it("renders with default aria-label when no label prop", () => {
    render(<FlowRichTextEditor />);
    expect(screen.getByLabelText("Rich text editor")).toBeInTheDocument();
  });

  it("renders with custom label", () => {
    render(<FlowRichTextEditor label="Description" />);
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByLabelText("Description")).toBeInTheDocument();
  });

  it("sets placeholder via data attribute", () => {
    render(<FlowRichTextEditor placeholder="Write something..." />);
    const textbox = screen.getByRole("textbox");
    expect(textbox).toHaveAttribute("data-placeholder", "Write something...");
  });

  it("disables contentEditable when disabled", () => {
    render(<FlowRichTextEditor disabled />);
    const textbox = screen.getByRole("textbox");
    expect(textbox).toHaveAttribute("contenteditable", "false");
  });
});

// ─────────────────────────────────────────────
// Interaction
// ─────────────────────────────────────────────

describe("FlowRichTextEditor — interaction", () => {
  it("toolbar buttons are clickable without error", async () => {
    const user = userEvent.setup();
    render(<FlowRichTextEditor />);
    await user.click(screen.getByRole("button", { name: "Bold" }));
    await user.click(screen.getByRole("button", { name: "Italic" }));
    // If no error was thrown, the test passes
    expect(true).toBe(true);
  });
});

// ─────────────────────────────────────────────
// Accessibility
// ─────────────────────────────────────────────

describe("FlowRichTextEditor — accessibility", () => {
  it("has no axe violations", async () => {
    const { container } = render(<FlowRichTextEditor label="Notes" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

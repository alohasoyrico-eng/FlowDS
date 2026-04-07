/**
 * FLOW — FlowFileUpload Component Tests
 * ──────────────────────────────────────────────
 * Tests rendering, props, file selection, validation, and accessibility.
 *
 * Requires: vitest + @testing-library/react + jsdom
 * Run: npx vitest run src/test/FlowFileUpload.test.tsx
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";

import { FlowFileUpload } from "../app/components/patterns";

// ─────────────────────────────────────────────
// Rendering
// ─────────────────────────────────────────────

describe("FlowFileUpload — rendering", () => {
  it("renders a drop zone with role='button'", () => {
    render(<FlowFileUpload />);
    expect(screen.getByRole("button", { name: "Upload Files" })).toBeInTheDocument();
  });

  it("drop zone has aria-label matching the default label", () => {
    render(<FlowFileUpload />);
    expect(screen.getByRole("button", { name: "Upload Files" })).toHaveAttribute(
      "aria-label",
      "Upload Files",
    );
  });

  it("contains a hidden file input", () => {
    const { container } = render(<FlowFileUpload />);
    const input = container.querySelector('input[type="file"]') as HTMLInputElement;
    expect(input).not.toBeNull();
    expect(input.style.display).toBe("none");
  });
});

// ─────────────────────────────────────────────
// Props
// ─────────────────────────────────────────────

describe("FlowFileUpload — props", () => {
  it("custom label changes the aria-label of the drop zone", () => {
    render(<FlowFileUpload label="Upload images" />);
    expect(screen.getByRole("button", { name: "Upload images" })).toHaveAttribute(
      "aria-label",
      "Upload images",
    );
  });

  it("applies data-size attribute matching the size prop", () => {
    const { container } = render(<FlowFileUpload size="lg" />);
    const root = container.querySelector(".flow-file-upload");
    expect(root).toHaveAttribute("data-size", "lg");
  });

  it("disabled sets tabIndex to -1 on the drop zone", () => {
    render(<FlowFileUpload disabled />);
    const zone = screen.getByLabelText("Upload Files");
    expect(zone).toHaveAttribute("tabindex", "-1");
  });

  it("drop zone has tabIndex=0 when not disabled", () => {
    render(<FlowFileUpload />);
    const zone = screen.getByLabelText("Upload Files");
    expect(zone).toHaveAttribute("tabindex", "0");
  });
});

// ─────────────────────────────────────────────
// File selection
// ─────────────────────────────────────────────

describe("FlowFileUpload — file selection", () => {
  it("calls onFiles and shows file name when a file is selected", async () => {
    const onFiles = vi.fn();
    const { container } = render(<FlowFileUpload onFiles={onFiles} />);
    const file = new File(["hello"], "test.txt", { type: "text/plain" });
    const input = container.querySelector('input[type="file"]')!;
    await userEvent.upload(input as HTMLInputElement, file);
    expect(onFiles).toHaveBeenCalledWith([file]);
    expect(screen.getByText("test.txt")).toBeInTheDocument();
  });

  it("shows a remove button with correct aria-label after file upload", async () => {
    const { container } = render(<FlowFileUpload />);
    const file = new File(["hello"], "report.pdf", { type: "application/pdf" });
    const input = container.querySelector('input[type="file"]')!;
    await userEvent.upload(input as HTMLInputElement, file);
    expect(screen.getByLabelText("Remove report.pdf")).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// File size validation
// ─────────────────────────────────────────────

describe("FlowFileUpload — file size validation", () => {
  it("shows error message when file exceeds maxSizeMB", async () => {
    const { container } = render(<FlowFileUpload maxSizeMB={1} />);
    // Create a file that exceeds 1MB (1.5MB)
    const bigContent = new Uint8Array(1.5 * 1024 * 1024);
    const file = new File([bigContent], "large-file.zip", { type: "application/zip" });
    const input = container.querySelector('input[type="file"]')!;
    await userEvent.upload(input as HTMLInputElement, file);
    expect(screen.getByText("Exceeds 1MB limit")).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// Accessibility
// ─────────────────────────────────────────────

describe("FlowFileUpload — accessibility", () => {
  it("has no axe violations with default props", async () => {
    const { container } = render(<FlowFileUpload />);
    expect(
      await axe(container, { rules: { "nested-interactive": { enabled: false } } }),
    ).toHaveNoViolations();
  });
});

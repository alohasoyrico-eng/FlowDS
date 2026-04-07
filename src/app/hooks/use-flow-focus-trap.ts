/** FLOW — useFlowFocusTrap (Accessibility Hook) */
import { type RefObject, useEffect, useRef } from "react";

const FOCUSABLE_SELECTOR =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export interface FocusTrapOptions {
  /** When true, Tab/Shift+Tab closes the overlay instead of wrapping focus (WAI-ARIA menu pattern). Default: false */
  closeOnTab?: boolean;
  /** When false, Escape does NOT close the overlay. Default: true */
  closeOnEscape?: boolean;
}

/**
 * Traps keyboard focus within a container element while `open` is true.
 * - Focuses the first focusable child on open.
 * - Wraps Tab / Shift+Tab at container boundaries (or closes on Tab when `closeOnTab` is true).
 * - Closes on Escape via the provided `onClose` callback (unless `closeOnEscape` is false).
 * - Restores focus to the previously-focused element on close.
 */
export function useFlowFocusTrap(
  containerRef: RefObject<HTMLElement | null>,
  open: boolean,
  onClose: () => void,
  options?: FocusTrapOptions,
): void {
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const closeOnTab = options?.closeOnTab ?? false;
    const closeOnEscape = options?.closeOnEscape ?? true;

    previousFocusRef.current = document.activeElement as HTMLElement;

    // Focus first focusable element inside container
    requestAnimationFrame(() => {
      const focusable = containerRef.current?.querySelectorAll<HTMLElement>(
        FOCUSABLE_SELECTOR,
      );
      if (focusable && focusable.length > 0) {
        focusable[0].focus();
      }
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && closeOnEscape) {
        onClose();
        return;
      }

      if (e.key === "Tab" && containerRef.current) {
        if (closeOnTab) {
          // Menu pattern: Tab closes the overlay and lets focus move naturally
          onClose();
          return;
        }

        const focusable = containerRef.current.querySelectorAll<HTMLElement>(
          FOCUSABLE_SELECTOR,
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [open, onClose, containerRef, options?.closeOnTab, options?.closeOnEscape]);
}

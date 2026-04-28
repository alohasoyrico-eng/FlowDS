/** FLOW — FlowSearch (L3 Component) */
import "../css/Search.css";
import React, {
  type CSSProperties,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { FlowTextInput } from "@flow/components";
import { GrowthObserver, stateAttrs, useFlowDefaultSize } from "@flow/primitives";

type SearchSize = "sm" | "md" | "lg";

/** Props for FlowSearch — search input with optional keyboard shortcut, clear button, and loading state. */
export interface SearchProps {
  /** Current value (controlled) */
  value?: string;
  /** Default value (uncontrolled) */
  defaultValue?: string;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Size variant */
  size?: SearchSize;
  /** Show keyboard shortcut hint (e.g. "/" or "Ctrl+K") */
  shortcut?: string;
  /** Submit handler (Enter key) */
  onSubmit?: (value: string) => void;
  /** Show clear button */
  clearable?: boolean;
  /** Loading state (shows spinner for async search) */
  loading?: boolean;
  /** Error state */
  error?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Auto focus */
  autoFocus?: boolean;
  /** Accessible label */
  "aria-label"?: string;
  /** Additional CSS class names */
  className?: string;
  /** Custom inline styles */
  style?: CSSProperties;
}

// ── Utility ──
function isInputFocused(): boolean {
  const el = document.activeElement;
  if (!el) return false;
  const tag = el.tagName.toLowerCase();
  return tag === "input" || tag === "textarea" || (el as HTMLElement).isContentEditable;
}

export const FlowSearch = forwardRef<HTMLInputElement, SearchProps>(
  (
    {
      value: valueProp,
      defaultValue = "",
      onChange,
      placeholder = "Search...",
      size,
      shortcut,
      onSubmit,
      clearable = true,
      loading = false,
      error = false,
      disabled = false,
      autoFocus = false,
      "aria-label": ariaLabel = "Search",
      className = "",
      style,
      ...rest
    },
    ref,
  ) => {
    const resolvedSize = useFlowDefaultSize(size);
    const [internalValue, setInternalValue] = useState(defaultValue);
    const isControlled = valueProp !== undefined;
    const value = isControlled ? valueProp! : internalValue;
    const handleChange = (v: string) => {
      if (!isControlled) setInternalValue(v);
      onChange?.(v);
    };
    const innerRef = useRef<HTMLInputElement>(null);

    // Merge refs
    const setRefs = useCallback(
      (node: HTMLInputElement | null) => {
        (innerRef as React.MutableRefObject<HTMLInputElement | null>).current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
      },
      [ref],
    );

    // FlowTextInput doesn't expose aria-invalid on the inner <input>,
    // so we set it imperatively via the shared ref.
    useEffect(() => {
      const input = innerRef.current;
      if (!input) return;
      if (error) {
        input.setAttribute("aria-invalid", "true");
      } else {
        input.removeAttribute("aria-invalid");
      }
    }, [error]);

    // Register global shortcut
    useEffect(() => {
      if (!shortcut) return;
      const handler = (e: KeyboardEvent) => {
        // Simple "/" shortcut
        if (shortcut === "/" && e.key === "/" && !isInputFocused()) {
          e.preventDefault();
          innerRef.current?.focus();
        }
        // Ctrl+K / Cmd+K
        if (shortcut.toLowerCase() === "ctrl+k" || shortcut.toLowerCase() === "cmd+k") {
          if ((e.metaKey || e.ctrlKey) && e.key === "k") {
            e.preventDefault();
            innerRef.current?.focus();
          }
        }
      };
      document.addEventListener("keydown", handler);
      return () => document.removeEventListener("keydown", handler);
    }, [shortcut]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && onSubmit) {
        onSubmit(value ?? "");
      }
      if (e.key === "Escape") {
        innerRef.current?.blur();
      }
    };

    const showShortcut = shortcut && !value;

    return (
      <GrowthObserver event="flow.search.impression" properties={{ size: resolvedSize }} inline>
        <div
          className={`flow-search ${className}`}
          data-size={resolvedSize}
          role="search"
          aria-label={ariaLabel}
          style={style}
          {...rest}
          {...stateAttrs({ disabled, loading, error })}
          onKeyDown={handleKeyDown}
        >
          <FlowTextInput
            ref={setRefs}
            type="search"
            value={value}
            onChange={(v) => handleChange(v)}
            placeholder={placeholder}
            leadingIcon="search"
            clearable={clearable}
            size={resolvedSize}
            disabled={disabled}
            autoFocus={autoFocus}
            loading={loading}
            aria-label={ariaLabel}
          />
          {showShortcut && <span className="flow-search-shortcut">{shortcut}</span>}
        </div>
      </GrowthObserver>
    );
  },
);
FlowSearch.displayName = "FlowSearch";

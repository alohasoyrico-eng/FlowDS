/** FLOW — FlowInlineEditable (L4 Pattern) */
import "../css/InlineEditable.css";
import { type CSSProperties, forwardRef, useState } from "react";

import { GrowthObserver, stateAttrs } from "@flow/primitives";
import { FlowIconButton, FlowTextInput } from "@flow/components";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// INLINE EDITABLE — Click-to-edit text
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/** Props for FlowInlineEditable — click-to-edit text field that toggles between display and input modes. */
export interface InlineEditableProps {
  /** Current text value */
  value: string;
  /** Callback fired when the text is committed */
  onChange: (value: string) => void;
  /** Placeholder shown when value is empty */
  placeholder?: string;
  /** Whether editing is disabled */
  disabled?: boolean;
  /** Error state */
  error?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Custom inline styles */
  style?: CSSProperties;
}

export const FlowInlineEditable = forwardRef<HTMLSpanElement, InlineEditableProps>(
  function FlowInlineEditable(
    {
      value,
      onChange,
      placeholder = "Click to edit...",
      disabled,
      error,
      className = "",
      style,
      ...rest
    },
    ref,
  ) {
    const [editing, setEditing] = useState(false);
    const [draft, setDraft] = useState(value);

    const commit = () => {
      setEditing(false);
      onChange(draft);
    };

    const cancel = () => {
      setEditing(false);
      setDraft(value);
    };

    if (editing) {
      return (
        <GrowthObserver event="flow.inline-editable.impression" inline>
          <span
            role="group"
            className={`flow-inline-editable-edit ${className}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "var(--ref-frame-space-1)",
              ...style,
            }}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node)) commit();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") commit();
              if (e.key === "Escape") cancel();
            }}
          >
            <FlowTextInput
              value={draft}
              onChange={(val) => setDraft(val)}
              autoFocus
              size="sm"
              placeholder={placeholder}
            />
            <FlowIconButton
              icon="check"
              aria-label="Save"
              onClick={commit}
              size="sm"
              variant="ghost"
            />
            <FlowIconButton
              icon="x"
              aria-label="Cancel"
              onClick={cancel}
              size="sm"
              variant="ghost"
            />
          </span>
        </GrowthObserver>
      );
    }

    return (
      <GrowthObserver event="flow.inline-editable.impression" inline>
        <span
          ref={ref}
          {...rest}
          className={`flow-inline-editable flow-focusable ${className}`}
          {...stateAttrs({ disabled: !!disabled, error: !!error })}
          data-empty={!value || undefined}
          role="button"
          tabIndex={disabled ? -1 : 0}
          onClick={
            disabled
              ? undefined
              : () => {
                  setDraft(value);
                  setEditing(true);
                }
          }
          aria-label="Click to edit"
          onKeyDown={(e) => {
            if (!disabled && (e.key === "Enter" || e.key === " ")) {
              setDraft(value);
              setEditing(true);
            }
          }}
          style={style}
        >
          {value || placeholder}
        </span>
      </GrowthObserver>
    );
  },
);
FlowInlineEditable.displayName = "FlowInlineEditable";

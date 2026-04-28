/** FLOW — FlowFullscreenSheet (L4 Pattern) */
import "../css/FullscreenSheet.css";
import React, {
  type CSSProperties,
  forwardRef,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
} from "react";

import { FlowIconButton } from "@flow/components";
import { GrowthObserver, Inline, Text, useFlowFocusTrap } from "@flow/primitives";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FULLSCREEN SHEET — Mobile full-page overlay
// Slides up from bottom, covers entire screen.
// CSS: .flow-fullscreen-sheet
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/** Props for FlowFullscreenSheet — full-page mobile overlay that slides up from the bottom with a header and close/back controls. */
export interface FullscreenSheetProps {
  /** Whether the sheet is open */
  open: boolean;
  /** Close handler */
  onClose: () => void;
  /** Title shown in header */
  title?: ReactNode;
  /** Show back button (left arrow) instead of close (×) */
  showBack?: boolean;
  /** Back button handler (defaults to onClose) */
  onBack?: () => void;
  /** Header right actions */
  headerActions?: ReactNode;
  /** Sheet content */
  children: ReactNode;
  /** Close on escape */
  closeOnEscape?: boolean;
  /** Accessible label */
  "aria-label"?: string;
  className?: string;
  style?: CSSProperties;
}

export const FlowFullscreenSheet = forwardRef<HTMLDivElement, FullscreenSheetProps>(
  function FlowFullscreenSheet(
    {
      open,
      onClose,
      title,
      showBack = false,
      onBack,
      headerActions,
      children,
      closeOnEscape = true,
      "aria-label": ariaLabel,
      className = "",
      style,
      ...rest
    },
    ref,
  ) {
    const sheetRef = useRef<HTMLDivElement>(null);

    const setRootRef = useCallback(
      (node: HTMLDivElement | null) => {
        (sheetRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      },
      [ref],
    );

    // Focus trap + escape
    useFlowFocusTrap(sheetRef, open, onClose, { closeOnEscape });

    // Prevent body scroll
    useEffect(() => {
      if (open) {
        document.body.style.overflow = "hidden";
        return () => {
          document.body.style.overflow = "";
        };
      }
    }, [open]);

    if (!open) return null;

    return (
      <GrowthObserver event="flow.fullscreen-sheet.impression">
        <div
          ref={setRootRef}
          {...rest}
          className={`flow-fullscreen-sheet ${className}`}
          role="dialog"
          aria-modal="true"
          aria-label={ariaLabel || (typeof title === "string" ? title : undefined)}
          style={{
            position: "fixed",
            inset: 0,
            background: "var(--sys-energy-surface-primary)",
            zIndex: "var(--sys-depth-layer-modal)" as unknown as number,
            display: "flex",
            flexDirection: "column",
            animation:
              "flow-slide-up var(--sys-momentum-duration-normal) var(--sys-momentum-easing-enter)",
            ...style,
          }}
        >
          {/* Header */}
          <header
            className="flow-fullscreen-sheet-header"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--sys-frame-gap-component)",
              padding: "var(--sys-frame-padding-control)",
              borderBottom: "var(--sys-frame-border-thin) solid var(--sys-energy-border-default)",
              minHeight: "var(--comp-fullscreen-sheet-header-height)",
            }}
          >
            {/* Leading: back or close */}
            <FlowIconButton
              icon={showBack ? "arrow-left" : "x"}
              size="md"
              variant="ghost"
              className="flow-focusable"
              onClick={showBack ? onBack || onClose : onClose}
              aria-label={showBack ? "Go back" : "Close"}
            />

            {/* Title */}
            {title && (
              <Text
                variant="heading-m"
                style={{
                  flex: 1,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {title}
              </Text>
            )}

            {/* Right actions */}
            {headerActions && (
              <Inline gap="component" align="center">
                {headerActions}
              </Inline>
            )}
          </header>

          {/* Body */}
          <div
            className="flow-fullscreen-sheet-body"
            style={{
              flex: 1,
              overflow: "auto",
              padding: "var(--sys-frame-padding-control)",
            }}
          >
            {children}
          </div>
        </div>
      </GrowthObserver>
    );
  },
);
FlowFullscreenSheet.displayName = "FlowFullscreenSheet";

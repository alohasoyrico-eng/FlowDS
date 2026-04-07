/** FLOW — FlowQuickActions (L4 Pattern) */
import React, { forwardRef, useCallback, useEffect, useRef } from "react";

import { Divider, Surface, Text } from "../../primitives";
import { FlowButton } from "../controls/FlowButton";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// QUICK ACTIONS — Mobile action sheet
// iOS-style bottom action sheet with grouped actions
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface QuickAction {
  /** Unique action identifier */
  id: string;
  /** Action label text */
  label: string;
  /** Icon name */
  icon?: string;
  /** Visual variant (danger shows a destructive-styled action) */
  variant?: "default" | "danger";
  /** Whether the action is disabled */
  disabled?: boolean;
}

/** Props for FlowQuickActions — iOS-style bottom action sheet with grouped action buttons. */
export interface QuickActionsProps {
  /** Whether the action sheet is open */
  open: boolean;
  /** Close handler */
  onClose?: () => void;
  /** Alias for onClose — called with false when closing */
  onOpenChange?: (open: boolean) => void;
  /** Available actions */
  actions: QuickAction[];
  /** Callback fired when an action is selected */
  onAction: (id: string) => void;
  /** Optional title text */
  title?: string;
  /** Label for the cancel button */
  cancelLabel?: string;
  /** Disabled state — prevents all action interaction */
  disabled?: boolean;
  /** Loading state — shows indicator, prevents interaction */
  loading?: boolean;
  /** Additional CSS class names */
  className?: string;
}

export const FlowQuickActions = forwardRef<HTMLDivElement, QuickActionsProps>(
  function FlowQuickActions({
  open,
  onClose,
  onOpenChange,
  actions,
  onAction,
  title,
  cancelLabel = "Cancel",
  disabled = false,
  loading = false,
  className = "",
  ...rest
}, ref) {
  const handleClose = useCallback(() => {
    onClose?.();
    onOpenChange?.(false);
  }, [onClose, onOpenChange]);
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, handleClose]);

  // Focus first action when opened
  useEffect(() => {
    if (!open) return;
    requestAnimationFrame(() => {
      const firstBtn = sheetRef.current?.querySelector<HTMLButtonElement>("button:not(:disabled)");
      firstBtn?.focus();
    });
  }, [open]);

  // Prevent body scroll
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  if (!open) return null;

  return (
    <div
      ref={ref}
      {...rest}
      className={`flow-quick-actions-overlay ${className}`}
      onClick={onClose}
      onKeyDown={(e: React.KeyboardEvent) => {
        if (e.key === "Escape") onClose?.();
      }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: "var(--sys-depth-layer-overlay)" as unknown as number,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        background: "var(--sys-depth-scrim)",
        padding: "var(--sys-frame-padding-control)",
      }}
      role="presentation"
      aria-label={title || "Quick actions"}
      data-state={disabled ? "disabled" : loading ? "loading" : undefined}
      aria-busy={loading || undefined}
    >
      <div
        ref={sheetRef}
        role="presentation"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "var(--comp-quick-actions-max-width)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--ref-frame-space-2)",
          animation: "flow-slide-up var(--ref-momentum-duration-slide) var(--sys-momentum-easing-enter)",
        }}
      >
        {/* Actions group */}
        <Surface radius="container" padding={0} style={{ overflow: "hidden" }}>
          {title && (
            <div
              style={{
                padding: "var(--sys-frame-padding-control)",
                textAlign: "center",
                borderBottom: "var(--sys-frame-border-thin) solid var(--sys-energy-border-default)",
              }}
            >
              <Text role="caption" color="secondary">
                {title}
              </Text>
            </div>
          )}
          {actions.map((action, i) => (
            <React.Fragment key={action.id}>
              {i > 0 && <Divider spacing={0} />}
              <FlowButton
                variant={action.variant === "danger" ? "danger" : "ghost"}
                size="lg"
                fullWidth
                disabled={action.disabled || disabled || loading}
                className="flow-focusable"
                onClick={() => {
                  onAction(action.id);
                  handleClose();
                }}
                leadingIcon={action.icon}
              >
                {action.label}
              </FlowButton>
            </React.Fragment>
          ))}
        </Surface>

        {/* Cancel button */}
        <Surface radius="container" padding={0}>
          <FlowButton
            variant="ghost"
            size="lg"
            fullWidth
            className="flow-focusable"
            onClick={onClose}
          >
            {cancelLabel}
          </FlowButton>
        </Surface>
      </div>
    </div>
  );
});
FlowQuickActions.displayName = "FlowQuickActions";

/** FLOW — FlowConfirmationDialog (L4 Pattern) */
import "../css/ConfirmationDialog.css";
import React, { forwardRef, type ReactNode, useCallback, useEffect, useRef } from "react";

import { FlowButton } from "@flow/components";
import { GrowthObserver, Inline, Stack, Surface, Text, useFlowFocusTrap } from "@flow/primitives";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CONFIRMATION DIALOG — Purpose-built confirm action
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/** Props for FlowConfirmationDialog — modal dialog for confirming or canceling a potentially destructive action. */
export interface ConfirmationDialogProps {
  /** Whether the dialog is open */
  open: boolean;
  /** Callback fired when the user confirms */
  onConfirm: () => void;
  /** Callback fired when the user cancels */
  onCancel: () => void;
  /** Dialog heading text */
  title: string;
  /** Confirmation message body */
  message: string | ReactNode;
  /** Label for the confirm button */
  confirmLabel?: string;
  /** Label for the cancel button */
  cancelLabel?: string;
  /** Visual intent (danger shows a destructive-styled confirm button) */
  intent?: "default" | "danger";
  /** Whether a loading spinner replaces the confirm label */
  loading?: boolean;
  /** Additional CSS class names */
  className?: string;
}

export const FlowConfirmationDialog = forwardRef<HTMLDivElement, ConfirmationDialogProps>(
  function FlowConfirmationDialog(
    {
      open,
      onConfirm,
      onCancel,
      title,
      message,
      confirmLabel = "Confirm",
      cancelLabel = "Cancel",
      intent = "default",
      loading = false,
      className = "",
      ...rest
    },
    ref,
  ) {
    const dialogId = React.useId();
    const titleId = `${dialogId}-title`;
    const dialogRef = useRef<HTMLDivElement>(null);

    const setRootRef = useCallback(
      (node: HTMLDivElement | null) => {
        (dialogRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      },
      [ref],
    );

    useFlowFocusTrap(dialogRef, open, onCancel);

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
      <GrowthObserver event="flow.confirmation-dialog.impression">
        <div
          ref={setRootRef}
          {...rest}
          className={`flow-confirmation-dialog-overlay ${className}`}
          onClick={onCancel}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: "var(--sys-depth-layer-overlay)" as unknown as number,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "var(--sys-depth-scrim)",
          }}
          role="presentation"
        >
          {}
          <Surface
            radius="container"
            border
            padding="control"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            style={{ maxWidth: "var(--comp-confirmation-dialog-max-width)", width: "90vw" }}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
          >
            <Stack gap="component">
              <Stack gap={2}>
                <Text variant="heading-m" id={titleId}>
                  {title}
                </Text>
                {typeof message === "string" ? (
                  <Text variant="paragraph-s">{message}</Text>
                ) : (
                  message
                )}
              </Stack>
              <Inline gap={2} justify="end">
                <FlowButton variant="secondary" size="sm" onClick={onCancel}>
                  {cancelLabel}
                </FlowButton>
                <FlowButton
                  variant="primary"
                  intent={intent === "danger" ? "danger" : undefined}
                  size="sm"
                  onClick={onConfirm}
                  disabled={loading}
                >
                  {loading ? "..." : confirmLabel}
                </FlowButton>
              </Inline>
            </Stack>
          </Surface>
        </div>
      </GrowthObserver>
    );
  },
);
FlowConfirmationDialog.displayName = "FlowConfirmationDialog";

/** FLOW — FlowDialog (L3 Component) */
import "../../css/overlays/Dialog.css";
import { forwardRef, type MutableRefObject, type ReactNode, useEffect, useId, useRef } from "react";
import {
  GrowthObserver,
  Overlay,
  Surface,
  Text,
  type Tone,
  useFlowAnnounce,
  useFlowDefaultSize,
  useFlowFocusTrap,
  useFlowLocale,
} from "@flow/primitives";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// DIALOG — Modal dialog with overlay
// Uses Overlay primitive for dimming layer.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

type DialogVariant = "alert" | "form" | "default";
type DialogSize = "sm" | "md" | "lg" | "xl";

/** Props for FlowDialog — modal dialog with overlay, title, description, and action buttons. */
export interface DialogProps {
  /** Whether the dialog is open */
  open: boolean;
  /** Callback fired when the dialog requests to close */
  onClose: () => void;
  /** Dialog heading text */
  title?: string;
  /** Supplementary text below the title */
  description?: string;
  /** Dialog purpose variant (alert, form, or default) */
  variant?: DialogVariant;
  /** Dialog width size */
  size?: DialogSize;
  /** Action buttons rendered in the dialog footer */
  actions?: ReactNode;
  /** Dialog body content */
  children?: ReactNode;
  /** Color tone for the dialog surface */
  tone?: Tone;
  /** Additional CSS class names */
  className?: string;
}

export const FlowDialog = forwardRef<HTMLDivElement, DialogProps>(function FlowDialog(
  {
    open,
    onClose,
    title,
    description,
    variant: _variant = "default",
    size,
    actions,
    children,
    tone,
    className = "",
    ...rest
  },
  ref,
) {
  const resolvedSize = useFlowDefaultSize(size);
  const announce = useFlowAnnounce();
  const _t = useFlowLocale();

  const dialogRef = useRef<HTMLDivElement | null>(null);

  const setRefs = (node: HTMLDivElement | null) => {
    dialogRef.current = node;
    if (typeof ref === "function") ref(node);
    else if (ref) (ref as MutableRefObject<HTMLDivElement | null>).current = node;
  };

  const dialogId = useId();
  const titleId = `${dialogId}-title`;
  const descId = `${dialogId}-desc`;

  useFlowFocusTrap(dialogRef, open, onClose);

  // Announce dialog title to screen readers when opened
  useEffect(() => {
    if (open && title) {
      announce(title, "assertive");
    }
  }, [open, title, announce]);

  if (!open) return null;

  return (
    <GrowthObserver event="flow.dialog.impression" properties={{ size: resolvedSize }} inline>
      <Overlay visible={open} onDismiss={onClose}>
        <div
          className="flow-dialog-positioner"
          role="presentation"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <Surface
            ref={setRefs}
            {...rest}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? titleId : undefined}
            aria-describedby={description ? descId : undefined}
            className={`flow-dialog-panel ${className}`}
            data-size={resolvedSize}
            data-tone={tone}
            elevation={3}
            border={false}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            {(title || description) && (
              <div className="flow-dialog-header">
                {title && (
                  <Text as="h2" variant="heading-m" id={titleId} className="flow-dialog-title">
                    {title}
                  </Text>
                )}
                {description && (
                  <Text
                    as="p"
                    variant="paragraph-s"
                    color="secondary"
                    id={descId}
                    className="flow-dialog-description"
                  >
                    {description}
                  </Text>
                )}
              </div>
            )}

            {/* Content — for form variant */}
            {children}

            {/* Actions — inherit size from dialog's data-size cascade */}
            {actions && <div className="flow-dialog-actions">{actions}</div>}
          </Surface>
        </div>
      </Overlay>
    </GrowthObserver>
  );
});

/** FLOW — FlowBottomSheet (L3 Component) */
import React, {
  type CSSProperties,
  forwardRef,
  type MutableRefObject,
  type ReactNode,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import { useFlowFocusTrap } from "../../hooks/use-flow-focus-trap";
import { ActionSurface, FlowIcon, GrowthObserver, Overlay, Surface, Text } from "../../primitives";

/** Props for FlowBottomSheet — slide-up bottom sheet overlay with drag-to-dismiss and focus trapping. */
export interface BottomSheetProps {
  /** Whether the sheet is open */
  open?: boolean;
  /** Close handler */
  onClose: () => void;
  /** Snap points (decorative, not functionally used) */
  snapPoints?: string[];
  /** Optional title */
  title?: ReactNode;
  /** Sheet content */
  children: ReactNode;
  /** Show drag handle */
  showHandle?: boolean;
  /** Close on overlay click */
  closeOnOverlay?: boolean;
  /** Close on Escape */
  closeOnEscape?: boolean;
  /** Show close button in header */
  showClose?: boolean;
  /** Accessible label */
  "aria-label"?: string;
  className?: string;
  style?: CSSProperties;
}

export const FlowBottomSheet = forwardRef<HTMLDivElement, BottomSheetProps>(
  function FlowBottomSheet(
    {
      open = false,
      onClose,
      snapPoints: _snapPoints,
      title,
      children,
      showHandle = true,
      closeOnOverlay = true,
      closeOnEscape: _closeOnEscape = true,
      showClose = true,
      "aria-label": ariaLabel,
      className = "",
      style,
      ...rest
    },
    ref,
  ) {
    const sheetRef = useRef<HTMLDivElement>(null);
    const idPrefix = useId();
    const titleId = `${idPrefix}-title`;

    const setRefs = (node: HTMLDivElement | null) => {
      (sheetRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) (ref as MutableRefObject<HTMLDivElement | null>).current = node;
    };

    useFlowFocusTrap(sheetRef, open, onClose);

    // Trap body scroll when open
    useEffect(() => {
      if (open) {
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
          document.body.style.overflow = prev;
        };
      }
    }, [open]);

    // Drag-to-dismiss
    const [dragY, setDragY] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const startY = useRef(0);

    const onPointerDown = useCallback((e: React.PointerEvent) => {
      setIsDragging(true);
      startY.current = e.clientY;
      setDragY(0);
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    }, []);

    const onPointerMove = useCallback((e: React.PointerEvent) => {
      if (!isDragging) return;
      const dy = Math.max(0, e.clientY - startY.current);
      setDragY(dy);
    }, [isDragging]);

    const onPointerUp = useCallback(() => {
      setIsDragging(false);
      if (dragY > 120) {
        onClose();
      }
      setDragY(0);
    }, [dragY, onClose]);

    if (!open) return null;

    return (
      <GrowthObserver event="flow.bottom-sheet.impression" properties={{}} inline>
      <>
        <Overlay visible={true} onDismiss={closeOnOverlay ? onClose : undefined} dismissible={closeOnOverlay} />
        <Surface
          ref={setRefs}
          {...rest}
          className={`flow-bottom-sheet ${className}`}
          role="dialog"
          aria-modal="true"
          aria-label={ariaLabel || (typeof title === "string" ? title : undefined)}
          aria-labelledby={title ? titleId : undefined}
          elevation={3}
          border={false}
          style={{
            ...style,
            transform: dragY > 0 ? `translateY(${dragY}px)` : undefined,
            transition: isDragging ? "none" : undefined,
          }}
        >
          {showHandle && (
            <div
              className="flow-bottom-sheet-handle"
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              aria-hidden="true"
            />
          )}
          {(title || showClose) && (
            <div className="flow-bottom-sheet-header" id={titleId}>
              <Text role="label-l">{title}</Text>
              {showClose && (
                <ActionSurface
                  className="flow-bottom-sheet-close"
                  onPress={onClose}
                  aria-label="Close"
                >
                  <FlowIcon name="x" size="md" />
                </ActionSurface>
              )}
            </div>
          )}
          <div className="flow-bottom-sheet-body">{children}</div>
        </Surface>
      </>
      </GrowthObserver>
    );
  },
);

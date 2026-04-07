/** FLOW — FlowSnackbarProvider (L4 Pattern) */
import {
  createContext,
  forwardRef,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { useFlowDefaultSize } from "../../hooks/use-flow-default-size";
import { FlowIcon, GrowthObserver, type Tone } from "../../primitives";
import { FlowButton } from "../controls/FlowButton";
import { FlowIconButton } from "../controls/FlowIconButton";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SNACKBAR / TOAST — Stackable notification system
// Global toast provider + imperative API.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

type SnackbarVariant = "info" | "success" | "warning" | "error";

type SnackbarSize = "sm" | "md" | "lg" | "xl";

export interface SnackbarItem {
  /** Unique identifier for the snackbar */
  id: string;
  /** Message text displayed in the snackbar */
  message: string;
  /** Visual variant indicating severity */
  variant: SnackbarVariant;
  /** Optional action button with label and handler */
  action?: { label: string; onClick: () => void };
  /** Auto-dismiss duration in milliseconds */
  duration: number;
  /** Snackbar size variant */
  size?: SnackbarSize;
  /** Color tone */
  tone?: Tone;
}

export interface SnackbarContextType {
  show: (opts: {
    message: string;
    variant?: SnackbarVariant;
    action?: { label: string; onClick: () => void };
    duration?: number;
    /** Unified size — sm/md/lg/xl */
    size?: SnackbarSize;
    /** Tone variant */
    tone?: Tone;
  }) => void;
}

const SnackbarContext = createContext<SnackbarContextType>({
  show: () => {},
});

export function useSnackbar() {
  return useContext(SnackbarContext);
}

export const FlowSnackbarProvider = forwardRef<HTMLDivElement, { children: ReactNode }>(
  function FlowSnackbarProvider({ children, ...rest }, ref) {
  const [items, setItems] = useState<SnackbarItem[]>([]);

  const show = useCallback(
    ({
      message,
      variant = "info",
      action,
      duration = 4000,
      size,
      tone,
    }: {
      message: string;
      variant?: SnackbarVariant;
      action?: { label: string; onClick: () => void };
      duration?: number;
      size?: SnackbarSize;
      tone?: Tone;
    }) => {
      const id = `snack-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
      setItems((prev) => [...prev, { id, message, variant, action, duration, size, tone }]);
    },
    [],
  );

  const dismiss = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  return (
    <SnackbarContext.Provider value={{ show }}>
      {children}
      {/* Toast container */}
      <div className="flow-snackbar-container" aria-live="polite" aria-relevant="additions" ref={ref} {...rest}>
        {items.map((item) => (
          <FlowSnackbarItem key={item.id} item={item} onDismiss={dismiss} />
        ))}
      </div>
    </SnackbarContext.Provider>
  );
}
);
FlowSnackbarProvider.displayName = "FlowSnackbarProvider";

const snackbarIconMap: Record<SnackbarVariant, string> = {
  info: "info",
  success: "check",
  warning: "warning",
  error: "warning",
};

const FlowSnackbarItem = forwardRef<HTMLDivElement, {
  item: SnackbarItem;
  onDismiss: (id: string) => void;
}>(
  function FlowSnackbarItem({ item, onDismiss, ...rest }, ref) {
  const resolvedSize = useFlowDefaultSize(item.size);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setExiting(true);
      setTimeout(() => onDismiss(item.id), 200);
    }, item.duration);
    return () => clearTimeout(timer);
  }, [item.id, item.duration, onDismiss]);

  const handleDismiss = useCallback(() => {
    setExiting(true);
    setTimeout(() => onDismiss(item.id), 200);
  }, [item.id, onDismiss]);

  return (
    <GrowthObserver event="flow.snackbar.impression" properties={{ variant: item.variant }} inline>
    <div
      ref={ref}
      className="flow-snackbar"
      data-variant={item.variant}
      data-exiting={exiting || undefined}
      data-size={resolvedSize}
      data-tone={item.tone}
      role="status"
      {...rest}
    >
      <FlowIcon name={snackbarIconMap[item.variant]} size="sm" />
      <span className="flow-snackbar-message">{item.message}</span>
      {item.action && (
        <FlowButton
          variant="ghost"
          size="sm"
          className="flow-snackbar-action"
          onClick={() => {
            item.action!.onClick();
            handleDismiss();
          }}
        >
          {item.action.label}
        </FlowButton>
      )}
      <FlowIconButton icon="close" size="sm" variant="ghost" onClick={handleDismiss} aria-label="Dismiss" className="flow-snackbar-close" />
    </div>
    </GrowthObserver>
  );
}
);
FlowSnackbarItem.displayName = "FlowSnackbarItem";

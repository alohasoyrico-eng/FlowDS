/** FLOW — FlowMenu (L3 Component) */
import React, { forwardRef, type ReactNode, useCallback, useEffect, useId, useRef, useState } from "react";

import { useFlowFocusTrap } from "../../hooks/use-flow-focus-trap";
import { ActionSurface, Divider, FlowIcon, GrowthObserver, Surface, Text } from "../../primitives";

type MenuPlacement = "bottom-start" | "bottom-end" | "top-start" | "top-end";

export interface MenuItem {
  /** Unique key */
  key: string;
  /** Label */
  label: string;
  /** Optional icon name */
  icon?: string;
  /** Trailing text (e.g. shortcut) */
  trailing?: string;
  /** Checkable item — shows check mark when checked */
  checked?: boolean;
  /** Danger variant */
  danger?: boolean;
  /** Disabled */
  disabled?: boolean;
  /** Render a separator after this item */
  separator?: boolean;
}

/** Props for FlowMenu — dropdown menu triggered by a button with keyboard navigation and item selection. */
export interface MenuProps {
  /** Menu items */
  items: MenuItem[];
  /** Item click handler */
  onSelect: (key: string) => void;
  /** Trigger element */
  trigger: ReactNode;
  /** Placement */
  placement?: MenuPlacement;
  /** Optional group label */
  label?: string;
  /** Controlled open state */
  open?: boolean;
  /** Open change handler */
  onOpenChange?: (open: boolean) => void;
  /** Accessible label */
  "aria-label"?: string;
  className?: string;
}

export const FlowMenu = forwardRef<HTMLDivElement, MenuProps>(
  function FlowMenu(
    {
      items,
      onSelect,
      trigger,
      placement = "bottom-start",
      label,
      open: controlledOpen,
      onOpenChange,
      "aria-label": ariaLabel = "Menu",
      className = "",
      ...rest
    },
    ref,
  ) {
    const isControlled = controlledOpen !== undefined;
    const [internalOpen, setInternalOpen] = useState(false);
    const isOpen = isControlled ? controlledOpen : internalOpen;
    const [focusedIndex, setFocusedIndex] = useState(0);

    const triggerRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const idPrefix = useId();
    const menuId = `${idPrefix}-menu`;

    const setOpen = useCallback(
      (val: boolean) => {
        if (!isControlled) setInternalOpen(val);
        onOpenChange?.(val);
      },
      [isControlled, onOpenChange],
    );

    const toggle = useCallback(() => setOpen(!isOpen), [isOpen, setOpen]);
    const close = useCallback(() => setOpen(false), [setOpen]);

    useFlowFocusTrap(menuRef, isOpen, close, { closeOnTab: true });

    // Position
    const [pos, setPos] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

    const updatePosition = useCallback(() => {
      if (!triggerRef.current || !menuRef.current) return;
      const tRect = triggerRef.current.getBoundingClientRect();
      const mRect = menuRef.current.getBoundingClientRect();
      let top = 0;
      let left = 0;

      if (placement.startsWith("bottom")) {
        top = tRect.bottom + 4;
      } else {
        top = tRect.top - mRect.height - 4;
      }

      if (placement.endsWith("start")) {
        left = tRect.left;
      } else {
        left = tRect.right - mRect.width;
      }

      // Viewport clamping
      top = Math.max(8, Math.min(top, window.innerHeight - mRect.height - 8));
      left = Math.max(8, Math.min(left, window.innerWidth - mRect.width - 8));

      setPos({ top, left });
    }, [placement]);

    useEffect(() => {
      if (isOpen) {
        const frame = requestAnimationFrame(updatePosition);
        return () => cancelAnimationFrame(frame);
      }
    }, [isOpen, updatePosition]);

    // Close on outside click
    useEffect(() => {
      if (!isOpen) return;
      const handler = (e: MouseEvent) => {
        if (
          triggerRef.current?.contains(e.target as Node) ||
          menuRef.current?.contains(e.target as Node)
        )
          return;
        close();
      };
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }, [isOpen, close]);

    // Keyboard nav (roving tabindex)
    const enabledItems = items.filter((i) => !i.disabled);
    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
      const menu = menuRef.current;
      if (!menu) return;
      const btns = Array.from(
        menu.querySelectorAll<HTMLButtonElement>("button:not([data-state='disabled'])"),
      );

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setFocusedIndex((prev) => {
          const next = (prev + 1) % btns.length;
          btns[next]?.focus();
          return next;
        });
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setFocusedIndex((prev) => {
          const next = (prev - 1 + btns.length) % btns.length;
          btns[next]?.focus();
          return next;
        });
      } else if (e.key === "Home") {
        e.preventDefault();
        setFocusedIndex(0);
        btns[0]?.focus();
      } else if (e.key === "End") {
        e.preventDefault();
        const last = btns.length - 1;
        setFocusedIndex(last);
        btns[last]?.focus();
      }
    }, []);

    return (
      <GrowthObserver event="flow.menu.impression" properties={{ placement }} inline>
      <div ref={ref} {...rest}>
        { }
        <ActionSurface
          ref={triggerRef}
          className="flow-menu-trigger"
          onPress={toggle}
          aria-expanded={isOpen}
          aria-controls={isOpen ? menuId : undefined}
          aria-haspopup="menu"
        >
          {trigger}
        </ActionSurface>
        {isOpen && (
          <Surface
            ref={menuRef}
            id={menuId}
            className={`flow-menu ${className}`}
            role="menu"
            tabIndex={-1}
            aria-label={ariaLabel}
            border={false}
            style={{ top: pos.top, left: pos.left }}
            onKeyDown={handleKeyDown}
          >
            {label && <Text as="div" role="label-s" className="flow-menu-label">{label}</Text>}
            {items.map((item, index) => {
              const enabledIdx = enabledItems.indexOf(item);
              return (
              <React.Fragment key={item.key ?? `menu-${index}`}>
                <ActionSurface
                  className="flow-menu-item"
                  role="menuitem"
                  data-danger={item.danger || undefined}
                  data-checked={item.checked || undefined}
                  disabled={!!item.disabled}
                  selected={!!item.checked}
                  aria-current={item.checked ? "true" : undefined}
                  tabIndex={item.disabled ? -1 : enabledIdx === focusedIndex ? 0 : -1}
                  onPress={() => {
                    if (!item.disabled) {
                      onSelect(item.key);
                      close();
                    }
                  }}
                >
                  {item.checked !== undefined && (
                    <span className="flow-menu-item-check">
                      <FlowIcon name="check" size="sm" />
                    </span>
                  )}
                  {item.icon && (
                    <span className="flow-menu-item-icon">
                      <FlowIcon name={item.icon} size="sm" />
                    </span>
                  )}
                  <Text as="span" role="label-m" className="flow-menu-item-label">{item.label}</Text>
                  {item.trailing && <Text as="span" role="caption" color="secondary" className="flow-menu-item-trailing">{item.trailing}</Text>}
                </ActionSurface>
                {item.separator && <Divider spacing={2} />}
              </React.Fragment>
              );
            })}
          </Surface>
        )}
      </div>
      </GrowthObserver>
    );
  },
);

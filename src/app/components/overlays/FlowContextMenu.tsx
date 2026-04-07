/** FLOW — FlowContextMenu (L3 Component) */
import React, { forwardRef, type ReactNode, useCallback, useEffect, useRef, useState } from "react";

import { useFlowFocusTrap } from "../../hooks/use-flow-focus-trap";
import { ActionSurface, Divider, FlowIcon, GrowthObserver, Surface, Text } from "../../primitives";

export interface ContextMenuItem {
  /** Unique key */
  key?: string;
  /** Alias for key */
  action?: string;
  /** Divider type */
  type?: "divider";
  /** Label */
  label?: string;
  /** Optional icon name */
  icon?: string;
  /** Keyboard shortcut display */
  shortcut?: string;
  /** Danger variant */
  danger?: boolean;
  /** Alias for danger */
  variant?: "danger";
  /** Disabled */
  disabled?: boolean;
  /** Separator after this item */
  separator?: boolean;
}

/** Props for FlowContextMenu — right-click context menu with keyboard navigation and item actions. */
export interface ContextMenuProps {
  /** Menu items */
  items: ContextMenuItem[];
  /** Item click handler */
  onSelect?: (key: string) => void;
  /** Trigger area children — right-click activates menu */
  children?: ReactNode;
  /** Alternative trigger element */
  trigger?: ReactNode;
  /** Optional group label */
  label?: string;
  /** Accessible label */
  "aria-label"?: string;
  className?: string;
}

export const FlowContextMenu = forwardRef<HTMLDivElement, ContextMenuProps>(
  function FlowContextMenu(
    {
      items,
      onSelect,
      children: childrenProp,
      trigger,
      label,
      "aria-label": ariaLabel = "Context menu",
      className = "",
      ...rest
    },
    ref,
  ) {
    const children = trigger ?? childrenProp;
    const handleSelect = (key: string) => {
      onSelect?.(key);
    };
    const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    const handleKeyboardOpen = useCallback((e: React.KeyboardEvent) => {
      if (e.key === "ContextMenu" || (e.shiftKey && e.key === "F10")) {
        e.preventDefault();
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        setPos({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
      }
    }, []);

    const handleContextMenu = useCallback((e: React.MouseEvent) => {
      e.preventDefault();
      setPos({ x: e.clientX, y: e.clientY });
    }, []);

    const close = useCallback(() => setPos(null), []);
    const isOpen = pos !== null;

    useFlowFocusTrap(menuRef, isOpen, close, { closeOnTab: true });

    // Close on outside click
    useEffect(() => {
      if (!pos) return;
      const handler = (e: MouseEvent) => {
        if (menuRef.current?.contains(e.target as Node)) return;
        close();
      };
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }, [pos, close]);

    // Keyboard navigation
    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
      const menu = menuRef.current;
      if (!menu) return;
      const btns = Array.from(
        menu.querySelectorAll<HTMLButtonElement>("button:not([data-state='disabled'])"),
      );
      const idx = btns.indexOf(e.target as HTMLButtonElement);

      if (e.key === "ArrowDown") {
        e.preventDefault();
        btns[(idx + 1) % btns.length]?.focus();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        btns[(idx - 1 + btns.length) % btns.length]?.focus();
      } else if (e.key === "Home") {
        e.preventDefault();
        btns[0]?.focus();
      } else if (e.key === "End") {
        e.preventDefault();
        btns[btns.length - 1]?.focus();
      }
    }, []);

    // Guard: if no items, don't render menu functionality
    if (!items || items.length === 0) {
      return <div ref={ref} {...rest}>{children}</div>;
    }

    // Viewport clamp position
    const clampedPos = pos
      ? {
          top: Math.min(pos.y, (typeof window !== "undefined" ? window.innerHeight : 800) - 200),
          left: Math.min(pos.x, (typeof window !== "undefined" ? window.innerWidth : 600) - 220),
        }
      : { top: 0, left: 0 };

    return (
      <GrowthObserver event="flow.context-menu.impression" properties={{}} inline>
      <div ref={ref} {...rest}>
        { }
        <div role="presentation" onContextMenu={handleContextMenu} onKeyDown={handleKeyboardOpen} style={{ display: "contents" }}>
          {children}
        </div>
        {pos && (
          <Surface
            ref={menuRef}
            className={`flow-context-menu ${className}`}
            role="menu"
            tabIndex={-1}
            aria-label={ariaLabel}
            border={false}
            style={{ top: clampedPos.top, left: clampedPos.left }}
            onKeyDown={handleKeyDown}
          >
            {label && <Text as="div" role="label-s" className="flow-context-menu-label">{label}</Text>}
            {items.map((item, index) => {
              const itemKey = item.key ?? item.action ?? `ctx-${index}`;
              if (item.type === "divider") {
                return <Divider key={itemKey} spacing={2} />;
              }
              return (
                <React.Fragment key={itemKey}>
                  <ActionSurface
                    className="flow-context-menu-item"
                    role="menuitem"
                    data-danger={item.danger || item.variant === "danger" || undefined}
                    disabled={!!item.disabled}
                    tabIndex={item.disabled ? -1 : 0}
                    onPress={() => {
                      if (!item.disabled) {
                        handleSelect(itemKey);
                        close();
                      }
                    }}
                  >
                    {item.icon && (
                      <span className="flow-context-menu-item-icon">
                        <FlowIcon name={item.icon} size="sm" />
                      </span>
                    )}
                    <Text as="span" role="label-m" className="flow-context-menu-item-label">{item.label}</Text>
                    {item.shortcut && (
                      <Text as="span" role="caption" color="secondary" className="flow-context-menu-item-shortcut">{item.shortcut}</Text>
                    )}
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

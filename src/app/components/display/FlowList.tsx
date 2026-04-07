/** FLOW — FlowList, FlowListItem (L3 Component) */
import { Children, type CSSProperties, forwardRef, type ReactNode } from "react";

import { ActionSurface, Divider, GrowthObserver, stateAttrs, Text } from "../../primitives";

/** Props for FlowList — vertical list container with optional dividers between items. */
export interface ListProps {
  /** List item elements */
  children: ReactNode;
  /** Show dividers between items */
  dividers?: boolean;
  /** Enable listbox semantics for lists with selectable items */
  selectable?: boolean;
  /** Accessible label */
  "aria-label"?: string;
  /** Additional CSS class names */
  className?: string;
  /** Custom inline styles */
  style?: CSSProperties;
}

export const FlowList = forwardRef<HTMLUListElement, ListProps>(
  function FlowList({
    children,
    dividers = false,
    selectable = false,
    "aria-label": ariaLabel,
    className = "",
    style,
    ...rest
  }, ref) {
  const items = Children.toArray(children);

  return (
    <GrowthObserver event="flow.list.impression" properties={{ dividers }} inline>
    <ul
      ref={ref}
      {...rest}
      role={selectable ? "listbox" : undefined}
      className={`flow-list ${className}`}
      data-dividers={dividers || undefined}
      aria-label={ariaLabel}
      style={style}
    >
      {dividers
        ? items.flatMap((child, i) =>
            i > 0
              ? [
                  <li key={`divider-${i}`} role="none" className="flow-list-divider">
                    <Divider spacing={0} />
                  </li>,
                  <div key={`item-${i}`} style={{ display: "contents" }}>
                    {child}
                  </div>,
                ]
              : [
                  <div key={`item-${i}`} style={{ display: "contents" }}>
                    {child}
                  </div>,
                ],
          )
        : children}
    </ul>
    </GrowthObserver>
  );
}
);

/** Props for FlowListItem — individual list row with primary/secondary text, leading/trailing slots, and interactive states. */
export interface ListItemProps {
  /** Primary text */
  primary: ReactNode;
  /** Secondary text (second line) */
  secondary?: ReactNode;
  /** Tertiary text (third line) */
  tertiary?: ReactNode;
  /** Leading element — icon, avatar, checkbox, etc. */
  leading?: ReactNode;
  /** Trailing element — text, icon, switch, etc. */
  trailing?: ReactNode;
  /** Alias for trailing — action buttons/icons at the end of the list item */
  actions?: ReactNode;
  /** Visual variant — affects color/state styling */
  variant?: "default" | "error" | "warning" | "success";
  /** Interactive — enables hover/click */
  interactive?: boolean;
  /** Selected state */
  selected?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Additional CSS class names */
  className?: string;
  /** Custom inline styles */
  style?: CSSProperties;
}

export const FlowListItem = forwardRef<HTMLLIElement, ListItemProps>(
  function FlowListItem({
    primary,
    secondary,
    tertiary,
    leading,
    trailing,
    actions,
    interactive,
    selected,
    disabled,
    onClick,
    className = "",
    style,
    ...rest
  }, ref) {
  const isInteractive = interactive || !!onClick;

  const content = (
    <>
      {leading && <span className="flow-list-item-leading">{leading}</span>}
      <span className="flow-list-item-content">
        <Text as="span" role="label-m" className="flow-list-item-primary">{primary}</Text>
        {secondary && <Text as="span" role="paragraph-s" color="secondary" className="flow-list-item-secondary">{secondary}</Text>}
        {tertiary && <Text as="span" role="caption" color="tertiary" className="flow-list-item-tertiary">{tertiary}</Text>}
      </span>
      {(trailing ?? actions) && (
        <span className="flow-list-item-trailing">{trailing ?? actions}</span>
      )}
    </>
  );

  if (isInteractive) {
    return (
      <li ref={ref} role="presentation" style={{ display: "contents" }}>
        <ActionSurface
          {...rest}
          className={`flow-list-item ${className}`}
          role="option"
          onPress={disabled ? undefined : onClick}
          selected={!!selected}
          disabled={!!disabled}
          aria-disabled={disabled || undefined}
          aria-selected={selected || undefined}
          data-interactive={true}
          style={style}
        >
          {content}
        </ActionSurface>
      </li>
    );
  }

  return (
    <li
      ref={ref}
      {...rest}
      className={`flow-list-item ${className}`}
      {...stateAttrs({ selected: !!selected, disabled: !!disabled })}
      role={selected !== undefined ? "option" : undefined}
      aria-selected={selected !== undefined ? !!selected : undefined}
      aria-disabled={disabled !== undefined ? !!disabled : undefined}
      style={style}
    >
      {content}
    </li>
  );
}
);

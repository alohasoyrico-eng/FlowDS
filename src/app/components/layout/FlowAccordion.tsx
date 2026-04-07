/** FLOW — FlowAccordion (L3 Component) */
import { type CSSProperties, forwardRef, type ReactNode, useCallback, useId, useState } from "react";

import { useFlowDefaultSize } from "../../hooks/use-flow-default-size";
import { FlowIcon, stateAttrs, Text } from "../../primitives";

type AccordionSize = "sm" | "md" | "lg" | "xl";

export interface AccordionItem {
  /** Unique key */
  key: string;
  /** Header label */
  label: ReactNode;
  /** Optional subtitle shown after label */
  subtitle?: string;
  /** Optional leading icon */
  icon?: string;
  /** Expandable content */
  content: ReactNode;
  /** Disabled state */
  disabled?: boolean;
  /** Item status — error or complete indicator */
  status?: "error" | "complete";
}

/** Props for FlowAccordion — collapsible content panels that expand/collapse to reveal or hide sections. */
export interface AccordionProps {
  /** Accordion items (multi-item API) */
  items?: AccordionItem[];
  /** Allow multiple items open simultaneously */
  multiple?: boolean;
  /** Controlled expanded keys */
  expandedKeys?: string[];
  /** Default expanded keys (uncontrolled) */
  defaultExpandedKeys?: string[];
  /** Change handler (multi-item or single-item) */
  onChange?: ((expandedKeys: string[]) => void) | (() => void);
  /** Size variant */
  size?: AccordionSize;
  /** Show border around items */
  bordered?: boolean;
  /** Accessible label */
  "aria-label"?: string;
  /** Additional CSS class names */
  className?: string;
  /** Custom inline styles */
  style?: CSSProperties;
  // ── Single-item (panel) API ──
  /** Header label for single-item usage */
  title?: ReactNode;
  /** Content for single-item usage */
  children?: ReactNode;
  /** Controlled expanded state (single-item) */
  expanded?: boolean;
  /** Default expanded state (single-item, uncontrolled) */
  defaultExpanded?: boolean;
  /** Disabled state (single-item) */
  disabled?: boolean;
}

export const FlowAccordion = forwardRef<HTMLDivElement, AccordionProps>(
  function FlowAccordion(
    {
      items: itemsProp,
      multiple = false,
      expandedKeys: controlledKeys,
      defaultExpandedKeys,
      onChange,
      size = "md",
      bordered = true,
      "aria-label": ariaLabel = "Accordion",
      className = "",
      style,
      title,
      children,
      expanded: singleExpanded,
      defaultExpanded = false,
      disabled = false,
      ...rest
    },
    ref,
  ) {
    const resolvedSize = useFlowDefaultSize(size);

    // Normalise to items array
    const items: AccordionItem[] =
      itemsProp ??
      (title !== undefined ? [{ key: "__single__", label: title, content: children, disabled }] : []);
    const resolvedDefaultKeys: string[] = itemsProp
      ? (defaultExpandedKeys ?? [])
      : defaultExpanded
        ? ["__single__"]
        : [];
    const isControlled = itemsProp ? controlledKeys !== undefined : singleExpanded !== undefined;
    const resolvedControlledKeys = itemsProp
      ? controlledKeys
      : singleExpanded !== undefined
        ? singleExpanded
          ? ["__single__"]
          : []
        : undefined;
    const [internalKeys, setInternalKeys] = useState<string[]>(resolvedDefaultKeys);
    const expanded = isControlled ? resolvedControlledKeys! : internalKeys;
    const idPrefix = useId();

    const toggleItem = useCallback(
      (key: string) => {
        const isExpanded = expanded.includes(key);
        let next: string[];
        if (isExpanded) {
          next = expanded.filter((k) => k !== key);
        } else {
          next = multiple ? [...expanded, key] : [key];
        }
        if (!isControlled) setInternalKeys(next);
        if (typeof onChange === "function") {
          (onChange as ((keys: string[]) => void) | (() => void))(next as never);
        }
      },
      [expanded, multiple, isControlled, onChange],
    );

    // Guard: return null if items is undefined or empty
    if (!items || items.length === 0) {
      return null;
    }

    return (
      <div
        ref={ref}
        {...rest}
        className={`flow-accordion ${className}`}
        data-bordered={bordered || undefined}
        role="presentation"
        aria-label={ariaLabel}
        style={style}
      >
        {items.map((item) => {
          const isExpanded = expanded.includes(item.key);
          const triggerId = `${idPrefix}-trigger-${item.key}`;
          const panelId = `${idPrefix}-panel-${item.key}`;

          return (
            <div
              key={item.key}
              className="flow-accordion-item"
              data-expanded={isExpanded || undefined}
              data-status={item.status || undefined}
            >
              <button
                type="button"
                className="flow-accordion-trigger flow-focusable"
                id={triggerId}
                aria-expanded={isExpanded}
                aria-controls={panelId}
                data-size={resolvedSize}
                disabled={item.disabled}
                {...stateAttrs({ disabled: !!item.disabled, error: item.status === "error", success: item.status === "complete" })}
                onClick={() => !item.disabled && toggleItem(item.key)}
              >
                <span className="flow-accordion-trigger-content">
                  {item.icon && <FlowIcon name={item.icon} size="sm" />}
                  <Text as="span" role="label-m">{item.label}</Text>
                  {item.subtitle && (
                    <Text as="span" role="paragraph-s" color="secondary" className="flow-accordion-trigger-subtitle">{item.subtitle}</Text>
                  )}
                </span>
                <span
                  className="flow-accordion-icon"
                  data-expanded={isExpanded || undefined}
                  aria-hidden="true"
                >
                  <FlowIcon name="chevron-down" size="sm" />
                </span>
              </button>

              <div
                className="flow-accordion-content"
                id={panelId}
                role="region"
                aria-labelledby={triggerId}
                data-expanded={isExpanded}
              >
                <div className="flow-accordion-content-inner">{item.content}</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  },
);

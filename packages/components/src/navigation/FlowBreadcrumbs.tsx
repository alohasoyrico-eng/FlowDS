/** FLOW — FlowBreadcrumbs (L3 Component) */
import "../../css/navigation/Breadcrumbs.css";
import React, { type CSSProperties, forwardRef, type ReactNode, useState } from "react";

import { FlowIcon, GrowthObserver, Text } from "@flow/primitives";

export interface BreadcrumbItem {
  /** Unique key (falls back to index if omitted) */
  key?: string;
  /** Display label */
  label: ReactNode;
  /** Optional icon */
  icon?: string;
  /** Navigation href */
  href?: string;
  /** Click handler (alternative to href) */
  onClick?: () => void;
}

/** Props for FlowBreadcrumbs — breadcrumb trail navigation with collapsible overflow and icon-root variant. */
export interface BreadcrumbsProps {
  /** Breadcrumb items (last item is treated as current page) */
  items: BreadcrumbItem[];
  /** Display variant: "default" renders all items with labels;
   *  "icon-root" renders the first item as an icon-only button (defaults to "home") */
  variant?: "default" | "icon-root";
  /** Custom separator (default: chevron icon) */
  separator?: ReactNode;
  /** Max items before collapsing with ellipsis */
  maxItems?: number;
  /** Accessible label */
  "aria-label"?: string;
  /** Additional CSS class names */
  className?: string;
  /** Custom inline styles */
  style?: CSSProperties;
}

export const FlowBreadcrumbs = forwardRef<HTMLElement, BreadcrumbsProps>(function FlowBreadcrumbs(
  {
    items,
    variant = "default",
    separator,
    maxItems,
    "aria-label": ariaLabel = "Breadcrumb",
    className = "",
    style,
    ...rest
  },
  ref,
) {
  const [showAll, setShowAll] = useState(false);

  const defaultSeparator = <FlowIcon name="chevron-right" size="xs" />;
  const sep = separator ?? defaultSeparator;

  let visibleItems = items;
  const shouldCollapse = maxItems && maxItems > 2 && items.length > maxItems && !showAll;

  if (shouldCollapse) {
    // Show first item, ellipsis, then last (maxItems - 1) items
    const tail = items.slice(-(maxItems - 1));
    visibleItems = [items[0], ...tail];
  }

  return (
    <GrowthObserver event="flow.breadcrumbs.impression" properties={{ variant }} inline>
      <nav ref={ref} {...rest} aria-label={ariaLabel} className={className} style={style}>
        <ol className="flow-breadcrumbs" data-variant={variant}>
          {visibleItems.flatMap((item, idx) => {
            const isLast = idx === visibleItems.length - 1;
            const isFirst = idx === 0;
            const isIconRoot = variant === "icon-root" && isFirst && !isLast;
            const showEllipsis = shouldCollapse && isFirst;
            const itemKey = item.key ?? `bc-${idx}`;
            const elements: React.ReactNode[] = [];

            elements.push(
              <li key={itemKey} className="flow-breadcrumb-item">
                {isIconRoot ? (
                  item.href ? (
                    <a
                      className="flow-breadcrumb-icon-only"
                      href={item.href}
                      aria-label={typeof item.label === "string" ? item.label : undefined}
                      onClick={(e) => {
                        if (item.onClick) {
                          e.preventDefault();
                          item.onClick();
                        }
                      }}
                    >
                      <FlowIcon name={item.icon ?? "home"} size="xs" />
                    </a>
                  ) : (
                    <button
                      type="button"
                      className="flow-breadcrumb-icon-only"
                      aria-label={typeof item.label === "string" ? item.label : undefined}
                      onClick={item.onClick}
                    >
                      <FlowIcon name={item.icon ?? "home"} size="xs" />
                    </button>
                  )
                ) : isLast ? (
                  <span className="flow-breadcrumb-current" aria-current="page">
                    {item.icon && <FlowIcon name={item.icon} size="xs" />}
                    <Text as="span" variant="label-m">
                      {item.label}
                    </Text>
                  </span>
                ) : item.href ? (
                  <a
                    className="flow-breadcrumb-link"
                    href={item.href}
                    onClick={(e) => {
                      if (item.onClick) {
                        e.preventDefault();
                        item.onClick();
                      }
                    }}
                  >
                    {item.icon && <FlowIcon name={item.icon} size="xs" />}
                    {item.label}
                  </a>
                ) : (
                  <button type="button" className="flow-breadcrumb-link" onClick={item.onClick}>
                    {item.icon && <FlowIcon name={item.icon} size="xs" />}
                    {item.label}
                  </button>
                )}
              </li>,
            );

            if (showEllipsis) {
              elements.push(
                <li
                  key={`${itemKey}-sep-e`}
                  className="flow-breadcrumb-separator"
                  aria-hidden="true"
                >
                  {sep}
                </li>,
                <li key={`${itemKey}-ellipsis`} className="flow-breadcrumb-item">
                  <button
                    type="button"
                    className="flow-breadcrumb-link"
                    onClick={() => setShowAll(true)}
                  >
                    …
                  </button>
                </li>,
              );
            }

            if (!isLast) {
              elements.push(
                <li key={`${itemKey}-sep`} className="flow-breadcrumb-separator" aria-hidden="true">
                  {sep}
                </li>,
              );
            }

            return elements;
          })}
        </ol>
      </nav>
    </GrowthObserver>
  );
});

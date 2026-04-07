/** FLOW — FlowBottomNav (L3 Component) */
import { type CSSProperties, forwardRef } from "react";

import { FlowIcon, GrowthObserver, Text } from "../../primitives";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// BOTTOM NAV — Mobile bottom navigation bar
// Material Design 3 bottom navigation pattern.
// CSS: .flow-bottom-nav + .flow-bottom-nav-item
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface BottomNavItem {
  /** Unique key */
  key?: string;
  /** Alias for key */
  value?: string;
  /** Icon name */
  icon: string;
  /** Label text */
  label: string;
  /** Badge count (0 = dot, undefined = no badge) */
  badge?: number;
  /** Disabled state for this item */
  disabled?: boolean;
}

/** Props for FlowBottomNav — mobile bottom navigation bar with icon items and optional badge indicators. */
export interface BottomNavProps {
  /** Navigation items (max 5 recommended) */
  items: BottomNavItem[];
  /** Currently active item key */
  activeKey?: string;
  /** Selection change handler */
  onChange: (key: string) => void;
  /** Show labels */
  showLabels?: boolean;
  /** Accessible label */
  "aria-label"?: string;
  /** Additional CSS class names */
  className?: string;
  /** Custom inline styles */
  style?: CSSProperties;
}

export const FlowBottomNav = forwardRef<HTMLElement, BottomNavProps>(
  function FlowBottomNav({
    items = [],
    activeKey,
    onChange,
    showLabels = true,
    "aria-label": ariaLabel = "Bottom navigation",
    className = "",
    style,
    ...rest
  }, ref) {
  return (
    <GrowthObserver event="flow.bottom-nav.impression" properties={{}} inline>
    <nav ref={ref} {...rest} className={`flow-bottom-nav ${className}`} aria-label={ariaLabel} style={style}>
      {items.map((item, index) => {
        const itemKey = item.key ?? item.value ?? `nav-${index}`;
        const active = activeKey ?? "";
        const isActive = itemKey === active;
        return (
          <button
            key={itemKey}
            type="button"
            className="flow-bottom-nav-item flow-focusable"
            data-active={isActive || undefined}
            aria-current={isActive ? "page" : undefined}
            disabled={item.disabled || undefined}
            onClick={() => !item.disabled && onChange(itemKey)}
          >
            <span className="flow-bottom-nav-icon-wrap">
              <FlowIcon name={item.icon} size="md" className="flow-bottom-nav-icon" />
              {item.badge !== undefined && (
                <span className="flow-bottom-nav-badge" data-dot={item.badge === 0 || undefined}>
                  {item.badge > 0 ? (item.badge > 99 ? "99+" : item.badge) : null}
                </span>
              )}
            </span>
            {showLabels && <Text as="span" role="caption" className="flow-bottom-nav-label">{item.label}</Text>}
          </button>
        );
      })}
    </nav>
    </GrowthObserver>
  );
  }
);

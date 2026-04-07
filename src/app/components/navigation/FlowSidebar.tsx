/** FLOW — FlowSidebar (L3 Component) */
import { type CSSProperties, forwardRef, type ReactNode } from "react";

import { ActionSurface, FlowIcon, GrowthObserver, Text } from "../../primitives";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SIDEBAR — Desktop collapsible navigation
// Collapsible sidebar with items, groups, header, footer.
// CSS: .flow-sidebar
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface SidebarItem {
  /** Unique key */
  key: string;
  /** Label */
  label: string;
  /** Icon name */
  icon?: string;
  /** Active state */
  active?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Optional href for link items */
  href?: string;
  /** Click handler */
  onClick?: () => void;
}

export interface SidebarGroup {
  /** Group label (omit for unlabeled group) */
  label?: string;
  /** Group items */
  items: SidebarItem[];
}

/** Simplified item format (demos / quick API) */
export interface SimpleSidebarItem {
  /** Unique item identifier */
  id: string;
  /** Display label */
  label: string;
  /** Icon name */
  icon?: string;
}
/** Simplified section format (demos / quick API) */
export interface SimpleSidebarSection {
  /** Section heading */
  title: string;
  /** Items within this section */
  items: SimpleSidebarItem[];
}

/** Props for FlowSidebar — collapsible sidebar navigation with grouped items, header, and footer slots. */
export interface SidebarProps {
  /** Navigation groups (full API) */
  groups?: SidebarGroup[];
  /** Flat items list (alias API) */
  items?: SimpleSidebarItem[];
  /** Sections with titles (alias API) */
  sections?: SimpleSidebarSection[];
  /** Currently active item id/key */
  activeItem?: string;
  /** Click handler (alias for per-item onClick) */
  onItemClick?: (id: string) => void;
  /** Collapsed state */
  collapsed?: boolean;
  /** Collapse change handler */
  onCollapsedChange?: (collapsed: boolean) => void;
  /** Disabled state — all sidebar items non-interactive */
  disabled?: boolean;
  /** Loading state — shows indicator, prevents interaction */
  loading?: boolean;
  /** Header content (logo area) */
  header?: ReactNode;
  /** Footer content */
  footer?: ReactNode;
  /** Accessible label */
  "aria-label"?: string;
  /** Additional CSS class names */
  className?: string;
  /** Custom inline styles */
  style?: CSSProperties;
}

export const FlowSidebar = forwardRef<HTMLElement, SidebarProps>(
  function FlowSidebar({
    groups: groupsProp,
    items: itemsProp,
    sections: sectionsProp,
    activeItem,
    onItemClick,
    collapsed = false,
    onCollapsedChange,
    disabled = false,
    loading = false,
    header,
    footer,
    "aria-label": ariaLabel = "Sidebar navigation",
    className = "",
    style,
    ...rest
  }, ref) {
  // Resolve groups from whichever API is used
  const groups: SidebarGroup[] =
    groupsProp ??
    (sectionsProp
      ? sectionsProp.map((s) => ({
          label: s.title,
          items: s.items.map((it) => ({
            key: it.id,
            label: it.label,
            icon: it.icon,
            active: it.id === activeItem,
            onClick: onItemClick ? () => onItemClick(it.id) : undefined,
          })),
        }))
      : itemsProp
        ? [
            {
              items: itemsProp.map((it) => ({
                key: it.id,
                label: it.label,
                icon: it.icon,
                active: it.id === activeItem,
                onClick: onItemClick ? () => onItemClick(it.id) : undefined,
              })),
            },
          ]
        : []);
  return (
    <GrowthObserver event="flow.sidebar.impression" properties={{ collapsed }} inline>
    <nav
      ref={ref}
      {...rest}
      className={`flow-sidebar ${className}`}
      data-collapsed={collapsed}
      data-state={disabled ? "disabled" : loading ? "loading" : undefined}
      aria-label={ariaLabel}
      aria-busy={loading || undefined}
      style={style}
    >
      {/* Header */}
      <div className="flow-sidebar-header">
        <div className="flow-sidebar-header-logo">{header}</div>
        {onCollapsedChange && (
          <ActionSurface
            className="flow-sidebar-toggle"
            onPress={() => onCollapsedChange(!collapsed)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            disabled={disabled || undefined}
          >
            <FlowIcon name={collapsed ? "panel-left-open" : "panel-left-close"} size="sm" />
          </ActionSurface>
        )}
      </div>

      {/* Body */}
      <div className="flow-sidebar-body">
        {groups.map((group, gi) => (
          <div key={gi}>
            {group.label && !collapsed && (
              <Text as="div" role="label-s" color="secondary" className="flow-sidebar-group-label">{group.label}</Text>
            )}
            {group.items.map((item) => {
              const El = item.href ? "a" : "button";
              const elProps: Record<string, unknown> = {};
              if (item.href) elProps.href = item.href;
              if (!item.href) elProps.type = "button";
              const isItemDisabled = disabled || item.disabled || item.loading || loading;
              if (isItemDisabled) elProps["aria-disabled"] = true;
              if (item.loading) elProps["aria-busy"] = true;

              return (
                <El
                  key={item.key}
                  {...elProps}
                  className="flow-sidebar-item flow-focusable"
                  data-active={item.active || undefined}
                  data-state={item.disabled ? "disabled" : item.loading ? "loading" : undefined}
                  aria-current={item.active ? "page" : undefined}
                  disabled={isItemDisabled || undefined}
                  onClick={isItemDisabled ? undefined : item.onClick}
                  tabIndex={isItemDisabled ? -1 : undefined}
                  title={collapsed ? item.label : undefined}
                >
                  {item.icon && (
                    <span className="flow-sidebar-item-icon">
                      <FlowIcon name={item.icon} size="sm" />
                    </span>
                  )}
                  {!collapsed && <Text as="span" role="label-m" className="flow-sidebar-item-label">{item.label}</Text>}
                </El>
              );
            })}
          </div>
        ))}
      </div>

      {/* Footer */}
      {footer && <div className="flow-sidebar-footer">{footer}</div>}
    </nav>
    </GrowthObserver>
  );
  }
);

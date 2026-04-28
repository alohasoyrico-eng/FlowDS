/** FLOW — FlowTabs (L3 Component) */
import "../../css/navigation/Tabs.css";
import React, {
  type CSSProperties,
  forwardRef,
  type ReactNode,
  useCallback,
  useId,
  useRef,
  useState,
} from "react";
import { FlowIcon, GrowthObserver, Text, useFlowDefaultSize } from "@flow/primitives";

type TabsSize = "sm" | "md" | "lg" | "xl";
type TabsVariant = "line" | "filled";

/** Resolve canonical id from TabItem (id > key > value) */
function resolveTabId(tab: TabItem): string {
  return tab.id ?? tab.key ?? tab.value ?? "";
}

export interface TabItem {
  /** Unique identifier for the tab */
  id?: string;
  /** @deprecated Use `id` instead */
  key?: string;
  /** @deprecated Alias for `id` */
  value?: string;
  /** Tab label */
  label: ReactNode;
  /** Optional icon name */
  icon?: string;
  /** Tab content */
  content?: ReactNode;
  /** Disabled state */
  disabled?: boolean;
}

/** Props for FlowTabs — tabbed navigation with keyboard arrow-key support and optional tab panel content. */
export interface TabsProps {
  /** Tab definitions */
  tabs: TabItem[];
  /** Controlled active tab key */
  activeKey?: string;
  /** Default active tab key (uncontrolled) */
  defaultActiveKey?: string;
  /** Change handler */
  onChange?: (key: string) => void;
  /** Visual variant */
  variant?: TabsVariant;
  /** Size */
  size?: TabsSize;
  /** Accessible label for the tablist */
  "aria-label"?: string;
  /** Additional CSS class names */
  className?: string;
  /** Custom inline styles */
  style?: CSSProperties;
}

export const FlowTabs = forwardRef<HTMLDivElement, TabsProps>(function FlowTabs(
  {
    tabs,
    activeKey: controlledKey,
    defaultActiveKey,
    onChange,
    variant = "line",
    size = "md",
    "aria-label": ariaLabel = "Tabs",
    className = "",
    style,
    ...rest
  },
  ref,
) {
  const resolvedSize = useFlowDefaultSize(size);

  const isControlled = controlledKey !== undefined;
  const [internalKey, setInternalKey] = useState(
    defaultActiveKey || resolveTabId(tabs[0] ?? ({} as TabItem)),
  );
  const activeKey = isControlled ? controlledKey : internalKey;
  const tablistRef = useRef<HTMLDivElement>(null);
  const idPrefix = useId();

  const handleSelect = useCallback(
    (key: string) => {
      if (!isControlled) setInternalKey(key);
      onChange?.(key);
    },
    [isControlled, onChange],
  );

  // Keyboard navigation — arrow keys, Home, End
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const enabledTabs = tabs.filter((t) => !t.disabled);
      const currentIdx = enabledTabs.findIndex((t) => resolveTabId(t) === activeKey);
      let nextIdx = currentIdx;

      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
          e.preventDefault();
          nextIdx = (currentIdx + 1) % enabledTabs.length;
          break;
        case "ArrowLeft":
        case "ArrowUp":
          e.preventDefault();
          nextIdx = (currentIdx - 1 + enabledTabs.length) % enabledTabs.length;
          break;
        case "Home":
          e.preventDefault();
          nextIdx = 0;
          break;
        case "End":
          e.preventDefault();
          nextIdx = enabledTabs.length - 1;
          break;
        default:
          return;
      }

      const nextKey = resolveTabId(enabledTabs[nextIdx]);
      handleSelect(nextKey);

      // Focus the newly selected tab button
      const tabEl = tablistRef.current?.querySelector(
        `[data-tab-key="${nextKey}"]`,
      ) as HTMLElement | null;
      tabEl?.focus();
    },
    [tabs, activeKey, handleSelect],
  );

  const activeTab = tabs.find((t) => resolveTabId(t) === activeKey);

  return (
    <GrowthObserver
      event="flow.tabs.impression"
      properties={{ variant, size: resolvedSize }}
      inline
    >
      <div ref={ref} {...rest} className={`flow-tabs ${className}`} style={style}>
        <div
          ref={tablistRef}
          role="tablist"
          aria-label={ariaLabel}
          className="flow-tablist"
          data-variant={variant}
          data-size={resolvedSize}
          tabIndex={-1}
          onKeyDown={handleKeyDown}
        >
          {tabs.map((tab, index) => {
            const tabId = resolveTabId(tab);
            const isActive = tabId === activeKey;
            return (
              <button
                key={tabId || `tab-${index}`}
                role="tab"
                type="button"
                className="flow-tab flow-focusable"
                id={`${idPrefix}-tab-${tabId}`}
                aria-selected={isActive}
                aria-controls={
                  isActive && tab.content !== undefined ? `${idPrefix}-panel-${tabId}` : undefined
                }
                tabIndex={isActive ? 0 : -1}
                disabled={tab.disabled}
                data-tab-key={tabId}
                onClick={() => !tab.disabled && handleSelect(tabId)}
              >
                {tab.icon && <FlowIcon name={tab.icon} size="sm" />}
                <span className="flow-tab-label" data-text={tab.label}>
                  <Text as="span" variant="label-m">
                    {tab.label}
                  </Text>
                </span>
              </button>
            );
          })}
        </div>

        {activeTab?.content !== undefined && (
          <div
            role="tabpanel"
            className="flow-tabpanel flow-focusable"
            id={`${idPrefix}-panel-${resolveTabId(activeTab)}`}
            aria-labelledby={`${idPrefix}-tab-${resolveTabId(activeTab)}`}
            tabIndex={0}
          >
            {activeTab.content}
          </div>
        )}
      </div>
    </GrowthObserver>
  );
});

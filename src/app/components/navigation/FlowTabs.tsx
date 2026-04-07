/** FLOW — FlowTabs (L3 Component) */
import React, {
  type CSSProperties,
  forwardRef,
  type ReactNode,
  useCallback,
  useId,
  useRef,
  useState,
} from "react";

import { useFlowDefaultSize } from "../../hooks/use-flow-default-size";
import { FlowIcon, GrowthObserver, Text } from "../../primitives";

type TabsSize = "sm" | "md" | "lg" | "xl";
type TabsVariant = "line" | "filled";

export interface TabItem {
  /** Unique key for the tab */
  key?: string;
  /** Alias for key */
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

export const FlowTabs = forwardRef<HTMLDivElement, TabsProps>(
  function FlowTabs({
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
  }, ref) {
  const resolvedSize = useFlowDefaultSize(size);

  const isControlled = controlledKey !== undefined;
  const [internalKey, setInternalKey] = useState(defaultActiveKey || (tabs[0]?.key ?? ""));
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
      const currentIdx = enabledTabs.findIndex((t) => t.key === activeKey);
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

      const nextKey = enabledTabs[nextIdx].key ?? enabledTabs[nextIdx].value ?? "";
      handleSelect(nextKey);

      // Focus the newly selected tab button
      const tabEl = tablistRef.current?.querySelector(
        `[data-tab-key="${nextKey}"]`,
      ) as HTMLElement | null;
      tabEl?.focus();
    },
    [tabs, activeKey, handleSelect],
  );

  const activeTab = tabs.find((t) => t.key === activeKey);

  return (
    <GrowthObserver event="flow.tabs.impression" properties={{ variant, size: resolvedSize }} inline>
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
          const isActive = tab.key === activeKey;
          return (
            <button
              key={tab.key ?? `tab-${index}`}
              role="tab"
              type="button"
              className="flow-tab flow-focusable"
              id={`${idPrefix}-tab-${tab.key}`}
              aria-selected={isActive}
              aria-controls={`${idPrefix}-panel-${tab.key}`}
              tabIndex={isActive ? 0 : -1}
              disabled={tab.disabled}
              data-tab-key={tab.key}
              onClick={() => !tab.disabled && handleSelect(tab.key ?? tab.value ?? "")}
            >
              {tab.icon && <FlowIcon name={tab.icon} size="sm" />}
              <span className="flow-tab-label" data-text={tab.label}>
                <Text as="span" role="label-m">{tab.label}</Text>
              </span>
            </button>
          );
        })}
      </div>

      {activeTab?.content !== undefined && (
        <div
          role="tabpanel"
          className="flow-tabpanel flow-focusable"
          id={`${idPrefix}-panel-${activeTab.key}`}
          aria-labelledby={`${idPrefix}-tab-${activeTab.key}`}
          tabIndex={0}
        >
          {activeTab.content}
        </div>
      )}
    </div>
    </GrowthObserver>
  );
  }
);
